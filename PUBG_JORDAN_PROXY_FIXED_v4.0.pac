// ================= PUBG JORDAN PROXY - FIXED v4.0 =================
// إصلاح: بينغ منخفض + نطاقات IP صحيحة لكل مزود + أداء محسن
// Supports: Zain, Umniah, Orange Jordan
// =====================================================

// ================= PROXIES (أضف بروكسيات بديلة) =================
var MATCH_JO = "PROXY 46.185.131.218:20001";

// بروكسيات Lobby مع أولوية للأسسرع
var LOBBY_POOL = [
  "PROXY 212.35.66.45:8085",
  "PROXY 46.185.131.218:443",
  "PROXY 212.35.66.45:8181"
];

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ================= JORDAN ISP: ZAIN (نطاقات حقيقية) =================
var ZAIN_IPV4 = [
  ["82.212.64.0", "255.255.192.0"],   // Zain Jordan /18
  ["82.212.128.0", "255.255.128.0"],  // Zain Jordan /17
  ["94.249.0.0", "255.255.128.0"],    // Zain Mobile /17
  ["94.249.128.0", "255.255.128.0"],  // Zain Mobile Extended /17
  ["176.29.0.0", "255.255.0.0"]       // Zain Data /16
];

// ================= JORDAN ISP: UMNIAH (نطاقات حقيقية) =================
var UMNIAH_IPV4 = [
  ["94.142.32.0", "255.255.224.0"],   // Umniah /19
  ["94.142.64.0", "255.255.224.0"],   // Umniah /19
  ["94.142.96.0", "255.255.224.0"],   // Umniah /19
  ["188.123.128.0", "255.255.128.0"], // Umniah /17
  ["188.123.0.0", "255.255.0.0"]      // Umniah Extended /16
];

// ================= JORDAN ISP: ORANGE (نطاقات حقيقية) =================
var ORANGE_IPV4 = [
  ["176.28.128.0", "255.255.128.0"],  // Orange Jordan /17
  ["176.29.0.0", "255.255.0.0"],      // Orange Jordan /16
  ["188.70.0.0", "255.254.0.0"],      // Orange Jordan /15
  ["77.245.0.0", "255.255.0.0"],      // Orange Jordan /16
  ["81.26.0.0", "255.255.0.0"]        // Orange Jordan /16
];

// ================= JORDAN DATA CENTERS & OTHER =================
var JORDAN_OTHER_IPV4 = [
  ["46.185.128.0", "255.255.128.0"],  // Jordan IX /17
  ["213.6.0.0", "255.255.0.0"],       // Jordan DC /16
  ["82.102.192.0", "255.255.192.0"],  // Jordan Hosting /18
  ["77.95.0.0", "255.255.0.0"]        // Jordan Business /16
];

// ================= COMBINED JORDAN MATCH (ALL ISPs) =================
var JORDAN_MATCH_IPV4 = [].concat(
  ZAIN_IPV4,
  UMNIAH_IPV4,
  ORANGE_IPV4,
  JORDAN_OTHER_IPV4
);

// ================= JORDAN WIDE (Extended for Lobby) =================
var JORDAN_WIDE_IPV4 = [].concat(
  JORDAN_MATCH_IPV4,
  [
    ["176.28.0.0", "255.254.0.0"],     // Extended Jordan /15
    ["82.212.0.0", "255.255.0.0"],     // Extended Zain /16
    ["188.0.0.0", "255.192.0.0"]       // Extended Jordan Range /10
  ]
);

// ================= BLACKLIST: EGYPT (مخفض) =================
var EGYPT_BLACKLIST = [
  ["41.32.0.0", "255.224.0.0"],       // Egypt ADSL
  ["41.64.0.0", "255.192.0.0"],       // Egypt Mobile
  ["41.128.0.0", "255.128.0.0"],      // Egypt Telecom
  ["102.0.0.0", "255.0.0.0"],         // Egypt Africa
  ["154.128.0.0", "255.128.0.0"],     // Egypt Mobile
  ["197.32.0.0", "255.224.0.0"],      // Egypt Vodafone
  ["197.128.0.0", "255.128.0.0"],     // Egypt Wide
  ["105.32.0.0", "255.224.0.0"],      // Egypt Orange
  ["105.128.0.0", "255.128.0.0"]      // Egypt Mobile
];

// ================= BLACKLIST: SUSPICIOUS HOPS (مخفض جداً) =================
// فقط المراكز المشبوهة التي تسبب مشاكل حقيقية
var SUSPICIOUS_HOPS = [
  ["5.9.0.0", "255.255.0.0"],         // Hetzner Germany
  ["188.40.0.0", "255.255.0.0"],      // Hetzner Germany
  ["51.75.0.0", "255.255.0.0"],       // OVH France
  ["167.114.0.0", "255.255.0.0"],     // OVH Canada
  ["185.220.0.0", "255.255.0.0"]      // Tor Exit
];

// ================= COMBINED GEO BLACKLIST =================
var GEO_BLACKLIST = [].concat(
  EGYPT_BLACKLIST,
  SUSPICIOUS_HOPS
);

// ================= SESSION =================
var SESSION = {
  matchNet: null,
  matchHost: null,
  dnsCache: {},
  lobbyIndex: 0
};

// ================= HELPERS (محسنة) =================
function norm(h) {
  var i = h.indexOf(":");
  return i > -1 ? h.substring(0, i) : h;
}

function isInList(ip, list) {
  for (var i = 0; i < list.length; i++) {
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  }
  return false;
}

function resolvePinned(host) {
  // استخدام الـ cache أولاً
  if (SESSION.dnsCache[host]) return SESSION.dnsCache[host];
  
  try {
    var ip = dnsResolve(host);
    if (ip) {
      SESSION.dnsCache[host] = ip;
      return ip;
    }
  } catch(e) {
    return null;
  }
  return null;
}

function pickLobbyProxy(host) {
  // توزيع الحمل بشكل متساوي
  var idx = SESSION.lobbyIndex % LOBBY_POOL.length;
  SESSION.lobbyIndex++;
  return LOBBY_POOL[idx];
}

// ================= ISP DETECTION =================
function detectISP(ip) {
  if (isInList(ip, ZAIN_IPV4)) return "ZAIN";
  if (isInList(ip, UMNIAH_IPV4)) return "UMNIAH";
  if (isInList(ip, ORANGE_IPV4)) return "ORANGE";
  if (isInList(ip, JORDAN_OTHER_IPV4)) return "JORDAN_OTHER";
  return "UNKNOWN";
}

// ================= DETECTION (محسنة) =================
function isPUBG(h) {
  // قائمة محددة لخوادم PUBG الحقيقية
  return /pubg|tencent|krafton|lightspeed|levelinfinite|battlegrounds|playfab/i.test(h);
}

function isMatch(h) {
  return /match|battle|game|combat|realtime|room|playfab/i.test(h);
}

function isLobby(h) {
  return /lobby|matchmaking|queue|dispatch|gateway|region|join|recruit/i.test(h);
}

function isSocial(h) {
  return /friend|invite|squad|team|party|clan|chat|message/i.test(h);
}

function isCDN(h) {
  return /cdn|asset|patch|update|download|static/i.test(h);
}

function isAuth(h) {
  return /auth|login|token|oauth|session|account/i.test(h);
}

// ================= MAIN (محسن للأداء) =================
function FindProxyForURL(url, host) {
  
  // تنظيف الـ host
  host = norm(host.toLowerCase());

  // تخطي غير PUBG مباشرة
  if (!isPUBG(host)) return DIRECT;

  var ip = resolvePinned(host);

  // حجب IPv6 وغير المحلول
  if (!ip || ip.indexOf(":") > -1) return BLOCK;

  // حجب المناطق غير المرغوبة
  if (isInList(ip, GEO_BLACKLIST)) return BLOCK;

  // MATCH - فقط للأردن
  if (isMatch(host)) {
    // تحقق من IP أردني
    if (!isInList(ip, JORDAN_MATCH_IPV4)) return BLOCK;

    // تثبيت جلسة الماتش
    var net24 = ip.split('.').slice(0, 3).join('.');
    
    if (!SESSION.matchNet) {
      SESSION.matchNet = net24;
      SESSION.matchHost = host;
      return MATCH_JO;
    }
    
    // السماح بنفس الشبكة فقط
    if (host === SESSION.matchHost || net24 === SESSION.matchNet) {
      return MATCH_JO;
    }
    
    return BLOCK;
  }

  // LOBBY / SOCIAL / CDN / AUTH - أوسع للأردن
  if (isLobby(host) || isSocial(host) || isCDN(host) || isAuth(host)) {
    if (isInList(ip, JORDAN_WIDE_IPV4)) {
      return pickLobbyProxy(host);
    }
    return BLOCK;
  }

  // Default: استخدام Lobby proxy للأردن
  if (isInList(ip, JORDAN_WIDE_IPV4)) {
    return pickLobbyProxy(host);
  }

  // السماح بالاتصال المباشر لباقي خوادم PUBG (لتحسين الأداء)
  // بدلاً من الحجب الكامل
  if (isPUBG(host)) {
    return DIRECT;  // أو استخدم pickLobbyProxy(host) إذا أردت بروكسي
  }

  return BLOCK;
}

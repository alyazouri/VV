// ================= PUBG JORDAN PROXY - ULTRA OPTIMIZED v5.0 =================
// 🎯 ثبات + بنق منخفض + مستخدمين أردنيين أكثر
// Supports: Zain, Umniah, Orange Jordan
// =====================================================

/* ==============================
   🎯 إعدادات البروكسي
   ============================== */
var PROXY_MATCH = "PROXY 46.185.131.218:20001";  // بروكسي الماتش - ثابت

var PROXY_LOBBY = [
  "PROXY 46.185.131.218:20001",
  "PROXY 91.106.109.12:20001", 
  "PROXY 176.29.153.95:20001"
];

var BLOCK = "PROXY 127.0.0.1:1";
var DIRECT = "DIRECT";

/* ==============================
   ⚡ محرك الهاش المحسن
   ============================== */
function ultraHash(str) {
  var h = 2166136261;
  for (var i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return (h >>> 0);
}

/* ==============================
   🇯🇴 نطاقات IP الأردن - شاملة ومحدثة
   ============================== */
var JORDAN_IPV4 = [
  // Zain Jordan
  ["82.212.64.0", "255.255.192.0"],   // Zain /18
  ["82.212.128.0", "255.255.128.0"],  // Zain /17
  ["94.249.0.0", "255.255.128.0"],    // Zain Mobile /17
  ["94.249.128.0", "255.255.128.0"],  // Zain Mobile Extended
  
  // Umniah Jordan
  ["94.142.32.0", "255.255.224.0"],   // Umniah /19
  ["94.142.64.0", "255.255.224.0"],   // Umniah /19
  ["94.142.96.0", "255.255.224.0"],   // Umniah /19
  ["188.123.0.0", "255.255.0.0"],     // Umniah /16
  
  // Orange Jordan
  ["176.28.128.0", "255.255.128.0"],  // Orange /17
  ["176.29.0.0", "255.255.0.0"],      // Orange /16
  ["188.70.0.0", "255.254.0.0"],      // Orange /15
  ["77.245.0.0", "255.255.0.0"],      // Orange /16
  ["81.26.0.0", "255.255.0.0"],       // Orange /16
  ["31.44.0.0", "255.252.0.0"],       // Orange /14
  
  // Jordan Data Centers & Other
  ["46.185.128.0", "255.255.128.0"],  // Jordan IX /17
  ["213.6.0.0", "255.255.0.0"],       // Jordan DC /16
  ["37.17.0.0", "255.255.0.0"],       // Jordan ISP /16
  ["46.32.0.0", "255.248.0.0"],       // Jordan /13
  ["78.135.0.0", "255.255.0.0"],      // Jordan /16
  ["85.94.0.0", "255.254.0.0"],       // Jordan /15
  ["82.102.192.0", "255.255.192.0"],  // Jordan Hosting /18
  ["77.95.0.0", "255.255.0.0"]        // Jordan Business /16
];

/* ==============================
   🚫 قائمة الحظر - مصر وإيران وأفغانستان
   ============================== */
var BLOCKED_IPV4 = [
  // Egypt
  ["41.32.0.0", "255.224.0.0"],       // Egypt ADSL /12
  ["41.64.0.0", "255.192.0.0"],       // Egypt Mobile /11
  ["41.128.0.0", "255.128.0.0"],      // Egypt Telecom /10
  ["102.0.0.0", "255.0.0.0"],         // Egypt Africa /8
  ["154.128.0.0", "255.128.0.0"],     // Egypt Mobile /10
  ["197.32.0.0", "255.224.0.0"],      // Egypt Vodafone /12
  ["197.128.0.0", "255.128.0.0"],     // Egypt Wide /10
  ["105.32.0.0", "255.224.0.0"],      // Egypt Orange /12
  ["105.128.0.0", "255.128.0.0"],     // Egypt Mobile /10
  ["163.121.0.0", "255.255.0.0"],     // Egypt Universities /16
  
  // Iran
  ["2.144.0.0", "255.240.0.0"],       // Iran /13
  ["2.160.0.0", "255.224.0.0"],       // Iran /12
  ["5.22.0.0", "255.255.0.0"],        // Iran /16
  ["5.52.0.0", "255.254.0.0"],        // Iran /15
  ["5.54.0.0", "255.255.0.0"],        // Iran /16
  ["31.2.0.0", "255.255.0.0"],        // Iran /16
  ["31.7.0.0", "255.255.0.0"],        // Iran /16
  ["31.24.0.0", "255.255.0.0"],       // Iran /16
  ["37.8.0.0", "255.248.0.0"],        // Iran /14
  ["37.32.0.0", "255.252.0.0"],       // Iran /14
  ["46.32.0.0", "255.252.0.0"],       // Iran /14
  ["77.36.0.0", "255.252.0.0"],       // Iran /14
  ["78.38.0.0", "255.254.0.0"],       // Iran /15
  ["80.69.0.0", "255.255.255.0"],     // Iran /24
  ["81.12.0.0", "255.254.0.0"],       // Iran /15
  ["84.47.0.0", "255.255.0.0"],       // Iran /16
  ["85.9.0.0", "255.255.0.0"],        // Iran /16
  ["85.15.0.0", "255.255.0.0"],       // Iran /16
  ["86.55.0.0", "255.255.0.0"],       // Iran /16
  ["89.144.0.0", "255.255.0.0"],      // Iran /16
  ["91.98.0.0", "255.254.0.0"],       // Iran /15
  ["91.186.0.0", "255.255.0.0"],      // Iran /16
  ["92.42.0.0", "255.255.0.0"],       // Iran /16
  ["93.110.0.0", "255.255.0.0"],      // Iran /16
  ["94.101.0.0", "255.255.128.0"],    // Iran /18
  ["95.38.0.0", "255.254.0.0"],       // Iran /15
  ["109.72.0.0", "255.255.0.0"],      // Iran /16
  ["109.109.0.0", "255.255.0.0"],     // Iran /16
  ["109.125.0.0", "255.255.0.0"],     // Iran /16
  ["109.162.0.0", "255.255.0.0"],     // Iran /16
  ["109.203.0.0", "255.255.0.0"],     // Iran /16
  ["151.232.0.0", "255.255.0.0"],     // Iran /16
  ["151.233.0.0", "255.255.0.0"],     // Iran /16
  ["151.238.0.0", "255.254.0.0"],     // Iran /15
  ["151.240.0.0", "255.255.0.0"],     // Iran /16
  ["178.22.0.0", "255.255.0.0"],      // Iran /16
  ["178.131.0.0", "255.255.0.0"],     // Iran /16
  ["178.157.0.0", "255.255.0.0"],     // Iran /16
  ["185.2.0.0", "255.255.0.0"],       // Iran /16
  ["185.3.0.0", "255.255.0.0"],       // Iran /16
  ["185.4.0.0", "255.255.0.0"],       // Iran /16
  ["188.0.0.0", "255.252.0.0"],       // Iran /14
  ["188.34.0.0", "255.255.0.0"],      // Iran /16
  ["188.75.0.0", "255.255.0.0"],      // Iran /16
  ["188.118.0.0", "255.254.0.0"],     // Iran /15
  ["188.121.0.0", "255.255.0.0"],     // Iran /16
  ["188.122.0.0", "255.254.0.0"],     // Iran /15
  ["188.124.0.0", "255.254.0.0"],     // Iran /15
  ["188.136.0.0", "255.252.0.0"],     // Iran /14
  ["212.33.0.0", "255.255.0.0"],      // Iran /16
  ["212.50.0.0", "255.255.0.0"],      // Iran /16
  ["213.176.0.0", "255.255.0.0"],     // Iran /16
  ["213.195.0.0", "255.255.0.0"],     // Iran /16
  ["217.11.0.0", "255.255.0.0"],      // Iran /16
  ["217.25.0.0", "255.255.0.0"],      // Iran /16
  ["217.64.0.0", "255.255.192.0"],    // Iran /18
  ["217.146.0.0", "255.255.0.0"],     // Iran /16
  ["217.170.0.0", "255.255.0.0"],     // Iran /16
  ["217.218.0.0", "255.254.0.0"],     // Iran /15
  
  // Afghanistan
  ["27.116.0.0", "255.255.0.0"],      // Afghanistan /16
  ["43.224.0.0", "255.254.0.0"],      // Afghanistan /15
  ["58.147.0.0", "255.255.0.0"],      // Afghanistan /16
  ["103.5.172.0", "255.255.252.0"],   // Afghanistan /22
  ["103.12.0.0", "255.255.0.0"],      // Afghanistan /16
  ["103.24.0.0", "255.255.0.0"],      // Afghanistan /16
  ["111.118.0.0", "255.254.0.0"],     // Afghanistan /15
  ["117.55.0.0", "255.255.0.0"],      // Afghanistan /16
  ["119.59.0.0", "255.255.0.0"],      // Afghanistan /16
  ["121.100.0.0", "255.255.0.0"],     // Afghanistan /16
  ["125.62.128.0", "255.255.128.0"],  // Afghanistan /18
  [ "149.54.0.0", "255.255.0.0"],     // Afghanistan /16
  ["175.107.0.0", "255.255.0.0"],     // Afghanistan /16
  ["180.94.0.0", "255.254.0.0"],      // Afghanistan /15
  ["182.50.0.0", "255.255.0.0"],      // Afghanistan /16
  ["202.56.0.0", "255.255.0.0"],      // Afghanistan /16
  ["202.86.0.0", "255.255.0.0"],      // Afghanistan /16
  ["203.174.0.0", "255.255.0.0"],     // Afghanistan /16
  ["210.80.0.0", "255.255.0.0"]       // Afghanistan /16
];

/* ==============================
   🔍 دوال الفحص
   ============================== */
function isInList(ip, list) {
  for (var i = 0; i < list.length; i++) {
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  }
  return false;
}

function isJordanDomain(host) {
  var h = host.toLowerCase();
  
  if (shExpMatch(h, "*.jo") ||
      shExpMatch(h, "*.orange.jo") ||
      shExpMatch(h, "*.zain.jo") ||
      shExpMatch(h, "*.umniah.com") ||
      shExpMatch(h, "*.umniah.jo")) {
    return true;
  }
  
  if (/jordan|amman|zarqa|irbid|aqaba|mafraq|ajloun|jerash|madaba|karak|tafilah|maan/.test(h)) {
    return true;
  }
  
  return false;
}

function isJordanIP(ip) {
  if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip)) {
    return false;
  }
  return isInList(ip, JORDAN_IPV4);
}

function isBlockedIP(ip) {
  if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip)) {
    return false;
  }
  return isInList(ip, BLOCKED_IPV4);
}

function isBlockedDomain(host) {
  var h = host.toLowerCase();
  
  if (shExpMatch(h, "*.eg") || /egypt|cairo|alexandria|giza/.test(h)) return true;
  if (shExpMatch(h, "*.ir") || /iran|tehran|isfahan|mashhad|tabriz/.test(h)) return true;
  if (shExpMatch(h, "*.af") || /afghan|kabul|kandahar|herat/.test(h)) return true;
  if (shExpMatch(h, "*.sy") || /syria|damascus|aleppo/.test(h)) return true;

  return false;
}

/* ==============================
   🎮 كشف PUBG - محسن
   ============================== */
function isPUBG(host) {
  var h = host.toLowerCase();
  
  // PUBG Official
  if (/pubg|pubgm|krafton|proximabeta|lightspeed|levelinfinite|battlegrounds/.test(h)) return true;
  
  // Tencent
  if (/tencent|qcloud|myqcloud|tencentcs|tdm/.test(h)) return true;
  
  // PlayFab (PUBG Backend)
  if (/playfab|playfabapi/.test(h)) return true;
  
  // AWS Gaming
  if (/amazonaws/.test(h) && /gaming|match|session/.test(h)) return true;
  
  return false;
}

function isMatch(host) {
  var h = host.toLowerCase();
  return /match|battle|game|combat|realtime|session|room|playfab|allocation|dispatcher/.test(h);
}

function isLobby(host) {
  var h = host.toLowerCase();
  return /lobby|matchmaking|queue|dispatch|gateway|region|join|recruit|presence/.test(h);
}

function isCDN(host) {
  var h = host.toLowerCase();
  return /cdn|asset|patch|update|download|static|resource|media|content/.test(h);
}

function isAuth(host) {
  var h = host.toLowerCase();
  return /auth|login|token|oauth|account|user|profile|session/.test(h);
}

function isSocial(host) {
  var h = host.toLowerCase();
  return /friend|invite|squad|team|party|clan|chat|message|social/.test(h);
}

/* ==============================
   📦 DNS Cache
   ============================== */
var DNS_CACHE = {};

function resolveIP(host) {
  if (DNS_CACHE[host]) return DNS_CACHE[host];
  
  try {
    var ip = dnsResolve(host);
    if (ip) {
      DNS_CACHE[host] = ip;
      return ip;
    }
  } catch(e) {}
  
  return null;
}

/* ==============================
   🔐 نظام الجلسة الثابتة
   ============================== */
var SESSION = {
  matchProxy: null,
  matchHost: null,
  matchNet: null,
  lobbyIndex: 0
};

function pickLobbyProxy(host) {
  var idx = SESSION.lobbyIndex % PROXY_LOBBY.length;
  SESSION.lobbyIndex++;
  return PROXY_LOBBY[idx];
}

/* ==============================
   🚀 المحرك الرئيسي
   ============================== */
function FindProxyForURL(url, host) {
  var h = host.toLowerCase();

  // === المواقع المباشرة (Direct) ===
  if (dnsDomainIs(h, "github.com") ||
      shExpMatch(h, "*.github.com") ||
      dnsDomainIs(h, "githubusercontent.com") ||
      shExpMatch(h, "*.githubusercontent.com") ||
      dnsDomainIs(h, "githubassets.com") ||
      shExpMatch(h, "*.githubassets.com") ||
      dnsDomainIs(h, "github.dev") ||
      shExpMatch(h, "*.github.dev") ||
      dnsDomainIs(h, "api.github.com") ||
      dnsDomainIs(h, "youtube.com") ||
      shExpMatch(h, "*.youtube.com") ||
      shExpMatch(h, "*.googlevideo.com") ||
      dnsDomainIs(h, "google.com") ||
      shExpMatch(h, "*.google.com") ||
      dnsDomainIs(h, "gstatic.com") ||
      shExpMatch(h, "*.gstatic.com")) {
    return DIRECT;
  }

  // === حظر الدومينات المحجوبة ===
  if (isBlockedDomain(h)) {
    return BLOCK;
  }

  // === فحص الأردن (دومين) ===
  var isJoDomain = isJordanDomain(h);

  // === فحص PUBG ===
  if (isPUBG(h)) {
    var ip = resolveIP(h);
    
    // حظر IPv6 وغير المحلول
    if (!ip || ip.indexOf(":") > -1) {
      return BLOCK;
    }
    
    // حظر IP المحجوب
    if (isBlockedIP(ip)) {
      return BLOCK;
    }
    
    // === MATCH: تثبيت البروكسي للجلسة ===
    if (isMatch(h)) {
      // فقط الأردن للماتش
      if (!isJordanIP(ip) && !isJoDomain) {
        return BLOCK;
      }
      
      // تثبيت الجلسة
      var net24 = ip.split('.').slice(0, 3).join('.');
      
      if (!SESSION.matchNet) {
        SESSION.matchNet = net24;
        SESSION.matchHost = h;
        return PROXY_MATCH;
      }
      
      // السماح بنفس الشبكة أو نفس الـ host
      if (h === SESSION.matchHost || net24 === SESSION.matchNet) {
        return PROXY_MATCH;
      }
      
      // شبكة جديدة = بروكسي جديد (للماتشات المتعددة)
      SESSION.matchNet = net24;
      SESSION.matchHost = h;
      return PROXY_MATCH;
    }
    
    // === LOBBY / SOCIAL / AUTH: بروكسي متغير ===
    if (isLobby(h) || isSocial(h) || isAuth(h)) {
      if (isJordanIP(ip) || isJoDomain) {
        return pickLobbyProxy(h);
      }
      return BLOCK;
    }
    
    // === CDN: اتصال مباشر لبينغ أقل ===
    if (isCDN(h)) {
      return DIRECT;
    }
    
    // === باقي PUBG ===
    if (isJordanIP(ip) || isJoDomain) {
      return pickLobbyProxy(h);
    }
    
    // السماح بباقي خوادم PUBG (لتحسين الأداء)
    return pickLobbyProxy(h);
  }

  // === باقي المواقع ===
  // الأردن مباشرة
  if (isJoDomain) {
    return DIRECT;
  }
  
  var ip = resolveIP(h);
  if (ip) {
    if (isJordanIP(ip)) return DIRECT;
    if (isBlockedIP(ip)) return BLOCK;
  }

  // الافتراضي: اتصال مباشر
  return DIRECT;
}

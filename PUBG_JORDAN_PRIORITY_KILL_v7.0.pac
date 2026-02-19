// ================= PUBG JORDAN - PRIORITY KILL v7.0 =================
// 🎯 أولوية القتل + اتصال مثالي + حركة سلسة
// Low Ping + No Frame Drop + Hit Priority
// =====================================================

/* ==============================
   ⚡ البروكسيات - اختر الأسرع
   ============================== */
// 💡 استخدم البروكسي بأقل ping للحدث الأولوية
var PROXY_FASTEST = "PROXY 46.185.131.218:20001";  // غيره حسب أسرع بروكسي عندك

var PROXY_BACKUP = [
  "PROXY 91.106.109.12:20001",
  "PROXY 176.29.153.95:20001"
];

var BLOCK = "PROXY 127.0.0.1:1";
var DIRECT = "DIRECT";

/* ==============================
   🇯🇴 نطاقات الأردن
   ============================== */
var JORDAN_IPV4 = [
  ["82.212.0.0", "255.255.0.0"],
  ["94.249.0.0", "255.255.0.0"],
  ["94.142.0.0", "255.255.0.0"],
  ["188.123.0.0", "255.255.0.0"],
  ["176.28.0.0", "255.254.0.0"],
  ["176.29.0.0", "255.255.0.0"],
  ["188.70.0.0", "255.254.0.0"],
  ["77.245.0.0", "255.255.0.0"],
  ["81.26.0.0", "255.255.0.0"],
  ["31.44.0.0", "255.252.0.0"],
  ["46.185.0.0", "255.255.0.0"],
  ["46.32.0.0", "255.240.0.0"],
  ["37.16.0.0", "255.254.0.0"],
  ["78.135.0.0", "255.255.0.0"],
  ["85.94.0.0", "255.254.0.0"],
  ["82.102.0.0", "255.255.0.0"],
  ["77.95.0.0", "255.255.0.0"],
  ["213.6.0.0", "255.255.0.0"],
  ["185.75.0.0", "255.255.0.0"],
  ["185.105.0.0", "255.255.0.0"]
];

/* ==============================
   🚫 المحجوبين فقط
   ============================== */
var BLOCKED_IPV4 = [
  ["41.32.0.0", "255.224.0.0"],
  ["41.64.0.0", "255.192.0.0"],
  ["41.128.0.0", "255.128.0.0"],
  ["102.0.0.0", "255.0.0.0"],
  ["154.128.0.0", "255.128.0.0"],
  ["197.32.0.0", "255.224.0.0"],
  ["197.128.0.0", "255.128.0.0"],
  ["105.32.0.0", "255.224.0.0"],
  ["105.128.0.0", "255.128.0.0"],
  ["2.144.0.0", "255.240.0.0"],
  ["2.160.0.0", "255.224.0.0"],
  ["5.22.0.0", "255.255.0.0"],
  ["5.52.0.0", "255.254.0.0"],
  ["31.2.0.0", "255.255.0.0"],
  ["37.8.0.0", "255.248.0.0"],
  ["77.36.0.0", "255.252.0.0"],
  ["78.38.0.0", "255.254.0.0"],
  ["91.98.0.0", "255.254.0.0"],
  ["188.0.0.0", "255.252.0.0"],
  ["217.218.0.0", "255.254.0.0"],
  ["27.116.0.0", "255.255.0.0"],
  ["58.147.0.0", "255.255.0.0"],
  ["111.118.0.0", "255.254.0.0"],
  ["117.55.0.0", "255.255.0.0"]
];

/* ==============================
   🎮 خوادم PUBG الرئيسية
   ============================== */
var PUBG_MATCH_SERVERS = [
  // خوادم البحرين (الأقرب للأردن)
  ["15.185.0.0", "255.255.0.0"],       // AWS Bahrain
  ["16.50.0.0", "255.255.0.0"],        // AWS Bahrain
  ["52.60.0.0", "255.255.0.0"],        // AWS ME
  ["3.28.0.0", "255.255.0.0"],         // AWS ME-South
  
  // خوادم PlayFab
  ["20.0.0.0", "255.0.0.0"],           // Microsoft Azure
  ["40.64.0.0", "255.192.0.0"],        // Azure
  ["52.0.0.0", "255.0.0.0"],           // Azure
  ["104.0.0.0", "255.0.0.0"],          // Azure
  
  // Tencent Gaming
  ["43.128.0.0", "255.128.0.0"],       // Tencent
  ["106.0.0.0", "255.0.0.0"],          // Tencent
  ["119.0.0.0", "255.0.0.0"],          // Tencent
  ["120.0.0.0", "255.0.0.0"],          // Tencent
  ["129.0.0.0", "255.0.0.0"],          // Tencent
  ["150.0.0.0", "255.0.0.0"],          // Tencent
  ["162.0.0.0", "255.0.0.0"],          // Tencent
  ["170.0.0.0", "255.0.0.0"]           // Tencent
];

/* ==============================
   🔧 الإعدادات المتقدمة
   ============================== */

// 💡 الفكرة 1: أولوية القتل
// كل ما الـ ping أقل، كل ما عندك أولوية في الـ hit registration
var PRIORITY_MODE = "ULTRA_LOW_PING";  // وضع الأولوية

// 💡 الفكرة 2: منع Frame Drop
// تقليل عدد الـ requests المتزامنة
var USE_DIRECT_CDN = true;  // CDN مباشر = تحميل أسرع = لا frame drop

// 💡 الفكرة 3: حركة سلسة
// تثبيت البروكسي طوال الماتش
var STICKY_SESSION = true;

/* ==============================
   📦 الجلسة الثابتة
   ============================== */
var SESSION = {
  matchProxy: null,
  matchHost: null,
  matchIP: null,
  lastMatchTime: 0,
  requestCount: 0,
  lastRequestTime: 0
};

/* ==============================
   🔍 دوال الفحص
   ============================== */
function isInList(ip, list) {
  for (var i = 0; i < list.length; i++) {
    if (isInNet(ip, list[i][0], list[i][1])) return true;
  }
  return false;
}

function isJordanIP(ip) {
  if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip)) return false;
  return isInList(ip, JORDAN_IPV4);
}

function isBlockedIP(ip) {
  if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip)) return false;
  return isInList(ip, BLOCKED_IPV4);
}

function isPUBGServer(ip) {
  if (!/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(ip)) return false;
  return isInList(ip, PUBG_MATCH_SERVERS);
}

function isJordanDomain(host) {
  var h = host.toLowerCase();
  if (shExpMatch(h, "*.jo") || shExpMatch(h, "*.orange.jo") || 
      shExpMatch(h, "*.zain.jo") || shExpMatch(h, "*.umniah.jo")) return true;
  if (/jordan|amman|zarqa|irbid/.test(h)) return true;
  return false;
}

function isBlockedDomain(host) {
  var h = host.toLowerCase();
  if (shExpMatch(h, "*.eg") || /egypt|cairo/.test(h)) return true;
  if (shExpMatch(h, "*.ir") || /iran|tehran/.test(h)) return true;
  if (shExpMatch(h, "*.af") || /afghan|kabul/.test(h)) return true;
  return false;
}

/* ==============================
   🎮 كشف نوع الطلب
   ============================== */
function isPUBG(host) {
  var h = host.toLowerCase();
  return /pubg|pubgm|krafton|proximabeta|lightspeed|levelinfinite|battlegrounds|playfab|tencent|qcloud|myqcloud|tencentcs|tdm/.test(h);
}

function isMatch(host, url) {
  var combined = (host + " " + url).toLowerCase();
  return /match|battle|game|combat|realtime|session|room|playfab|allocation|dispatcher|udp|tick/.test(combined);
}

function isLobby(host) {
  var h = host.toLowerCase();
  return /lobby|matchmaking|queue|dispatch|gateway|region|join|recruit|presence/.test(h);
}

function isCDN(host, url) {
  var combined = (host + " " + url).toLowerCase();
  return /cdn|asset|patch|update|download|static|resource|media|content|texture|bundle/.test(combined);
}

function isAuth(host) {
  var h = host.toLowerCase();
  return /auth|login|token|oauth|account|user|profile/.test(h);
}

function isSocial(host) {
  var h = host.toLowerCase();
  return /friend|invite|squad|team|party|clan|chat|message|social/.test(h);
}

function isVOIP(host) {
  var h = host.toLowerCase();
  return /voice|voip|audio|speak|mic|voicechat/.test(h);
}

/* ==============================
   📦 DNS Cache - محسن
   ============================== */
var DNS_CACHE = {};
var CACHE_TIME = {};

function resolveIP(host) {
  var now = Date.now ? Date.now() : 0;
  
  // تحديث الـ cache كل 30 ثانية
  if (DNS_CACHE[host] && CACHE_TIME[host] && (now - CACHE_TIME[host] < 30000)) {
    return DNS_CACHE[host];
  }
  
  try {
    var ip = dnsResolve(host);
    if (ip) {
      DNS_CACHE[host] = ip;
      CACHE_TIME[host] = now;
      return ip;
    }
  } catch(e) {}
  
  return DNS_CACHE[host] || null;
}

/* ==============================
   ⚡ اختيار البروكسي الأسرع
   ============================== */
function getFastestProxy() {
  // 💡 لأولوية القتل: استخدم البروكسي الأسرع دائماً
  return PROXY_FASTEST;
}

function getBackupProxy(index) {
  return PROXY_BACKUP[index % PROXY_BACKUP.length];
}

/* ==============================
   🎯 تثبيت الجلسة للماتش
   ============================== */
function getMatchProxy(host, ip) {
  if (!STICKY_SESSION) return getFastestProxy();
  
  // إذا كانت نفس الجلسة، استخدم نفس البروكسي
  if (SESSION.matchProxy && SESSION.matchIP === ip) {
    return SESSION.matchProxy;
  }
  
  // جلسة جديدة
  SESSION.matchProxy = getFastestProxy();
  SESSION.matchHost = host;
  SESSION.matchIP = ip;
  
  return SESSION.matchProxy;
}

/* ==============================
   🚀 المحرك الرئيسي
   ============================== */
function FindProxyForURL(url, host) {
  var h = host.toLowerCase();

  // === مواقع مباشرة (للسرعة) ===
  if (dnsDomainIs(h, "github.com") || shExpMatch(h, "*.github.com") ||
      dnsDomainIs(h, "youtube.com") || shExpMatch(h, "*.youtube.com") ||
      shExpMatch(h, "*.googlevideo.com") || dnsDomainIs(h, "google.com") ||
      shExpMatch(h, "*.google.com") || dnsDomainIs(h, "gstatic.com") ||
      shExpMatch(h, "*.gstatic.com")) {
    return DIRECT;
  }

  // === حظر المحجوبين ===
  if (isBlockedDomain(h)) return BLOCK;

  // === PUBG ===
  if (isPUBG(h)) {
    var ip = resolveIP(h);
    
    // IPv6 أو غير محلول = BLOCK
    if (!ip || ip.indexOf(":") > -1) return BLOCK;
    
    // محجوب = BLOCK
    if (isBlockedIP(ip)) return BLOCK;

    // === 💡 الفكرة: MATCH - الأولوية القصوى ===
    if (isMatch(h, url)) {
      // السماح للأردن + خوادم PUBG
      if (!isJordanIP(ip) && !isPUBGServer(ip) && !isJordanDomain(h)) {
        // قد يكون خادم آخر، نسمح به للسرعة
      }
      
      // 💡 استخدام البروكسي الأسرع = أولوية القتل
      return getMatchProxy(h, ip);
    }

    // === 💡 الفكرة: VOIP - مباشر للصوت الواضح ===
    if (isVOIP(h)) {
      return DIRECT;  // صوت مباشر = لا تأخير
    }

    // === 💡 الفكرة: CDN - مباشر لمنع Frame Drop ===
    if (isCDN(h, url)) {
      if (USE_DIRECT_CDN) {
        return DIRECT;  // تحميل مباشر = لا frame drop
      }
      return getFastestProxy();
    }

    // === LOBBY / SOCIAL / AUTH ===
    if (isLobby(h) || isSocial(h) || isAuth(h)) {
      if (isJordanIP(ip) || isPUBGServer(ip) || isJordanDomain(h)) {
        return getFastestProxy();
      }
      // السماح بالاتصال للمستخدمين الآخرين
      return getFastestProxy();
    }

    // === باقي PUBG ===
    return getFastestProxy();
  }

  // === المواقع الأردنية ===
  if (isJordanDomain(h)) return DIRECT;
  
  var ip = resolveIP(h);
  if (ip) {
    if (isJordanIP(ip)) return DIRECT;
    if (isBlockedIP(ip)) return BLOCK;
  }

  // === الافتراضي: مباشر للسرعة ===
  return DIRECT;
}

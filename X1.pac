var MATCH_JO = "PROXY 46.185.131.218:20001";

// بروكسيات Lobby مع أولوية للأسسرع
var LOBBY_POOL = [
  "PROXY 212.35.66.45:8085",
  "PROXY 46.185.131.218:443",
  "PROXY 212.35.66.45:8181"
];

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

var ZAIN_IPV4 = [
  ["82.212.64.0", "255.255.192.0"],
  ["82.212.128.0", "255.255.128.0"],
  ["94.249.0.0", "255.255.128.0"],
  ["94.249.128.0", "255.255.128.0"],
  ["176.29.0.0", "255.255.0.0"]
];

var UMNIAH_IPV4 = [
  ["94.142.32.0", "255.255.224.0"],
  ["94.142.64.0", "255.255.224.0"],
  ["94.142.96.0", "255.255.224.0"],
  ["188.123.128.0", "255.255.128.0"],
  ["188.123.0.0", "255.255.0.0"]
];

var ORANGE_IPV4 = [
  ["176.28.128.0", "255.255.128.0"],
  ["176.29.0.0", "255.255.0.0"],
  ["188.70.0.0", "255.254.0.0"],
  ["77.245.0.0", "255.255.0.0"],
  ["81.26.0.0", "255.255.0.0"]
];

var JORDAN_OTHER_IPV4 = [
  ["46.185.128.0", "255.255.128.0"],
  ["213.6.0.0", "255.255.0.0"],
  ["82.102.192.0", "255.255.192.0"],
  ["77.95.0.0", "255.255.0.0"]
];

var JORDAN_MATCH_IPV4 = [].concat(
  ZAIN_IPV4,
  UMNIAH_IPV4,
  ORANGE_IPV4,
  JORDAN_OTHER_IPV4
);

var JORDAN_WIDE_IPV4 = [].concat(
  JORDAN_MATCH_IPV4,
  [
    ["176.28.0.0", "255.254.0.0"],
    ["82.212.0.0", "255.255.0.0"],
    ["188.0.0.0", "255.192.0.0"]
  ]
);

// ================= BLACKLIST =================
var EGYPT_BLACKLIST = [
  ["41.32.0.0", "255.224.0.0"],
  ["41.64.0.0", "255.192.0.0"],
  ["41.128.0.0", "255.128.0.0"],
  ["102.0.0.0", "255.0.0.0"],
  ["154.128.0.0", "255.128.0.0"],
  ["197.32.0.0", "255.224.0.0"],
  ["197.128.0.0", "255.128.0.0"],
  ["105.32.0.0", "255.224.0.0"],
  ["105.128.0.0", "255.128.0.0"]
];

var SUSPICIOUS_HOPS = [
  ["5.9.0.0", "255.255.0.0"],
  ["188.40.0.0", "255.255.0.0"],
  ["51.75.0.0", "255.255.0.0"],
  ["167.114.0.0", "255.255.0.0"],
  ["185.220.0.0", "255.255.0.0"]
];

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

// ================= HELPERS =================
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
  if (SESSION.dnsCache[host]) return SESSION.dnsCache[host];
  try {
    var ip = dnsResolve(host);
    if (ip) {
      SESSION.dnsCache[host] = ip;
      return ip;
    }
  } catch(e) {}
  return null;
}

function pickLobbyProxy(host) {
  var idx = SESSION.lobbyIndex % LOBBY_POOL.length;
  SESSION.lobbyIndex++;
  return LOBBY_POOL[idx];
}

function detectISP(ip) {
  if (isInList(ip, ZAIN_IPV4)) return "ZAIN";
  if (isInList(ip, UMNIAH_IPV4)) return "UMNIAH";
  if (isInList(ip, ORANGE_IPV4)) return "ORANGE";
  if (isInList(ip, JORDAN_OTHER_IPV4)) return "JORDAN_OTHER";
  return "UNKNOWN";
}

function isPUBG(h) {
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

// ================= MAIN =================
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());

  if (!isPUBG(host)) return DIRECT;

  var ip = resolvePinned(host);

  if (!ip || ip.indexOf(":") > -1) return BLOCK;

  if (isInList(ip, GEO_BLACKLIST)) return BLOCK;

  // ================= MATCH → DIRECT =================
  if (isMatch(host)) {

    if (!isInList(ip, JORDAN_MATCH_IPV4)) return BLOCK;

    var net24 = ip.split('.').slice(0, 3).join('.');
    
    if (!SESSION.matchNet) {
      SESSION.matchNet = net24;
      SESSION.matchHost = host;
      return DIRECT;   // 🔥 Direct داخل المباراة
    }
    
    if (host === SESSION.matchHost || net24 === SESSION.matchNet) {
      return DIRECT;   // 🔥 استمرار Direct
    }
    
    return BLOCK;
  }

  // ================= LOBBY / SOCIAL / CDN / AUTH =================
  if (isLobby(host) || isSocial(host) || isCDN(host) || isAuth(host)) {
    if (isInList(ip, JORDAN_WIDE_IPV4)) {
      return pickLobbyProxy(host);
    }
    return BLOCK;
  }

  if (isInList(ip, JORDAN_WIDE_IPV4)) {
    return pickLobbyProxy(host);
  }

  if (isPUBG(host)) {
    return DIRECT;
  }

  return BLOCK;
}

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
  ["82.212.64.0","255.255.192.0"],   // Zain core
  ["94.249.0.0","255.255.128.0"],    // Zain mobile
  ["176.29.0.0","255.255.0.0"]
];

var UMNIAH_IPV4 = [
  ["176.28.128.0","255.255.128.0"],  // Orange mobile
  ["46.185.128.0","255.255.128.0"],  // Jordan IX
  ["213.6.0.0","255.255.0.0"]        // DC core
];

var ORANGE_IPV4 = [
  ["176.28.128.0","255.255.128.0"],  // Orange mobile
  ["46.185.128.0","255.255.128.0"],  // Jordan IX
  ["213.6.0.0","255.255.0.0"]        // DC core
];

var JORDAN_OTHER_IPV4 = [
  ["46.185.128.0", "255.255.128.0"],
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
   ["46.4.0.0", "255.255.0.0"],        // Hetzner Germany
  ["49.12.0.0", "255.255.0.0"],       // Hetzner Finland
  ["78.46.0.0", "255.255.0.0"],       // Hetzner Germany
  ["88.99.0.0", "255.255.0.0"],       // Hetzner Germany
  ["116.202.0.0", "255.255.0.0"],     // Hetzner Germany
  ["128.140.0.0", "255.255.0.0"],     // Hetzner Germany
  ["136.243.0.0", "255.255.0.0"],     // Hetzner Germany
  ["138.201.0.0", "255.255.0.0"],     // Hetzner Germany
  ["142.132.0.0", "255.255.0.0"],     // Hetzner Germany
  ["159.69.0.0", "255.255.0.0"],      // Hetzner Germany
  ["162.55.0.0", "255.255.0.0"],      // Hetzner Germany
  ["167.86.0.0", "255.255.0.0"],      // Hetzner Germany
  ["168.119.0.0", "255.255.0.0"],     // Hetzner Germany
  ["176.9.0.0", "255.255.0.0"],       // Hetzner Germany
  ["188.40.0.0", "255.255.0.0"],      // Hetzner Germany
  ["195.201.0.0", "255.255.0.0"],     // Hetzner Germany
  ["213.239.0.0", "255.255.0.0"],     // Hetzner Germany
  
  // OVH Europe
  ["5.135.0.0", "255.255.0.0"],       // OVH France
  ["37.59.0.0", "255.255.0.0"],       // OVH France
  ["37.187.0.0", "255.255.0.0"],      // OVH France
  ["46.105.0.0", "255.255.0.0"],      // OVH France
  ["51.68.0.0", "255.255.0.0"],       // OVH France
  ["51.75.0.0", "255.255.0.0"],       // OVH France
  ["51.77.0.0", "255.255.0.0"],       // OVH France
  ["51.79.0.0", "255.255.0.0"],       // OVH France
  ["54.36.0.0", "255.255.0.0"],       // OVH France
  ["54.37.0.0", "255.255.0.0"],       // OVH France
  ["54.38.0.0", "255.255.0.0"],       // OVH France
  ["54.39.0.0", "255.255.0.0"],       // OVH France
  ["77.87.0.0", "255.255.0.0"],       // OVH France
  ["79.137.0.0", "255.255.0.0"],      // OVH France
  ["91.121.0.0", "255.255.0.0"],      // OVH France
  ["92.222.0.0", "255.255.0.0"],      // OVH France
  ["137.74.0.0", "255.255.0.0"],      // OVH France
  ["145.239.0.0", "255.255.0.0"],     // OVH France
  ["146.59.0.0", "255.255.0.0"],      // OVH France
  ["148.113.0.0", "255.255.0.0"],     // OVH France
  ["164.132.0.0", "255.255.0.0"],     // OVH France
  ["167.114.0.0", "255.255.0.0"],     // OVH Canada (EU routing)
  ["176.31.0.0", "255.255.0.0"],      // OVH France
  ["178.32.0.0", "255.255.0.0"],      // OVH France
  ["185.15.68.0", "255.255.255.0"],   // OVH France
  ["188.165.0.0", "255.255.0.0"],     // OVH France
  ["192.95.0.0", "255.255.0.0"],      // OVH Canada (EU routing)
  ["198.27.0.0", "255.255.0.0"],      // OVH Canada (EU routing)
  ["198.50.0.0", "255.255.0.0"],      // OVH Canada (EU routing)
  ["213.32.0.0", "255.255.0.0"],      // OVH France
  ["213.186.0.0", "255.255.0.0"],     // OVH France
  ["217.182.0.0", "255.255.0.0"],     // OVH France
  
  // DigitalOcean EU
  ["46.101.0.0", "255.255.0.0"],      // DigitalOcean EU
  ["139.59.0.0", "255.255.0.0"],      // DigitalOcean EU
  ["142.93.0.0", "255.255.0.0"],      // DigitalOcean EU
  ["157.230.0.0", "255.255.0.0"],     // DigitalOcean EU
  ["161.35.0.0", "255.255.0.0"],      // DigitalOcean EU
  ["164.90.0.0", "255.255.0.0"],      // DigitalOcean EU
  ["165.227.0.0", "255.255.0.0"],     // DigitalOcean EU
  ["167.71.0.0", "255.255.0.0"],      // DigitalOcean EU
  ["167.99.0.0", "255.255.0.0"],      // DigitalOcean EU
  ["178.128.0.0", "255.255.0.0"],     // DigitalOcean EU
  ["188.166.0.0", "255.255.0.0"],     // DigitalOcean EU
  
  // AWS EU
  ["35.156.0.0", "255.252.0.0"],      // AWS Frankfurt
  ["52.28.0.0", "255.252.0.0"],       // AWS Frankfurt
  ["52.58.0.0", "255.255.0.0"],       // AWS Frankfurt
  ["52.59.0.0", "255.255.0.0"],       // AWS Frankfurt
  ["54.93.0.0", "255.255.0.0"],       // AWS Frankfurt
  ["54.144.0.0", "255.254.0.0"],      // AWS EU
  ["54.216.0.0", "255.254.0.0"],      // AWS Ireland
  ["54.228.0.0", "255.255.0.0"],      // AWS Ireland
  ["54.246.0.0", "255.255.0.0"],      // AWS Ireland
  ["63.32.0.0", "255.255.0.0"],       // AWS Ireland
  ["63.34.0.0", "255.255.0.0"],       // AWS Ireland
  ["63.35.0.0", "255.255.0.0"],       // AWS Ireland
  ["79.125.0.0", "255.255.0.0"],      // AWS Ireland
  ["176.34.0.0", "255.255.0.0"],      // AWS Ireland
  
  // Google Cloud EU
  ["35.187.0.0", "255.255.0.0"],      // GCP EU
  ["35.195.0.0", "255.255.0.0"],      // GCP EU
  ["35.205.0.0", "255.255.0.0"],      // GCP EU
  ["35.214.0.0", "255.255.0.0"],      // GCP EU
  ["35.219.0.0", "255.255.0.0"],      // GCP EU
  ["104.155.0.0", "255.255.0.0"],     // GCP EU
  ["130.211.0.0", "255.255.0.0"],     // GCP EU
  
  // Azure EU
  ["40.74.0.0", "255.254.0.0"],       // Azure EU
  ["40.112.0.0", "255.254.0.0"],      // Azure EU
  ["51.105.0.0", "255.255.0.0"],      // Azure UK
  ["51.140.0.0", "255.255.0.0"],      // Azure UK
  ["51.141.0.0", "255.255.0.0"],      // Azure UK
  ["52.138.0.0", "255.254.0.0"],      // Azure EU
  ["52.232.0.0", "255.254.0.0"],      // Azure EU
  ["104.40.0.0", "255.255.0.0"],      // Azure EU
  ["104.41.0.0", "255.255.0.0"],      // Azure EU
  ["137.116.0.0", "255.255.0.0"],     // Azure EU
  ["168.61.0.0", "255.255.0.0"],      // Azure EU
  
  // EU Proxy/VPN Services
  ["45.33.0.0", "255.255.0.0"],       // Linode EU
  ["80.67.0.0", "255.255.0.0"],       // EU Hosting
  ["89.187.0.0", "255.255.0.0"],      // EU CDN
  ["104.248.0.0", "255.255.0.0"],     // DigitalOcean EU
  ["172.104.0.0", "255.255.0.0"],     // Linode EU
  ["185.125.0.0", "255.255.0.0"],     // EU Proxy
  ["185.220.0.0", "255.255.0.0"],     // EU Tor Exit
  ["193.218.0.0", "255.255.0.0"],     // EU Hosting
  ["194.163.0.0", "255.255.0.0"]      // EU Hosting
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

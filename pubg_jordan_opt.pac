// ================= PUBG JORDAN PROXY - OPTIMIZED v3.0 =================
// عرض أردنيين أكثر + بنق منخفض + تثبيت الاتصال
// Supports: Zain, Umniah, Orange Jordan (ALL Ranges)
// Blocks: Egypt, Suspicious EU Hops (narrowed)
// =====================================================

// ================= PROXIES =================
var MATCH_JO = "PROXY 46.185.131.218:20001";

var LOBBY_POOL = [
  "PROXY 212.35.66.45:8085",
  "PROXY 212.35.66.45:8181",
  "PROXY 46.185.131.218:443"
];

var BLOCK  = "PROXY 127.0.0.1:9";
var DIRECT = "DIRECT";

// ================= JORDAN ISP: ZAIN =================
var ZAIN_IPV4 = [
  // Orange Jordan (Mobile / CGNAT heavy)
  ["46.185.128.0","255.255.192.0"],   // /18
  ["86.108.0.0","255.255.192.0"],     // /18
  ["94.249.0.0","255.255.192.0"]     // /18

];

// ================= JORDAN ISP: UMNIAH =================
var UMNIAH_IPV4 = [
  // Zain Jordan (Mobile core)
  ["176.29.0.0","255.255.128.0"],     // /17 (mobile backbone)
  ["176.28.128.0","255.255.192.0"]   // /18

];

// ================= JORDAN ISP: ORANGE =================
var ORANGE_IPV4 = [
  // Umniah Mobile (very clean for matches)
  ["92.241.32.0","255.255.224.0"],    // /19
  ["95.172.192.0","255.255.224.0"],   // /19
  ["109.107.224.0","255.255.224.0"]   // /19

];

// ================= JORDAN OTHER ISPs =================
var JORDAN_OTHER_IPV4 = [
  // Other Jordan ISPs & Data Centers
   ["82.212.64.0","255.255.192.0"],   // Zain core
  ["94.249.0.0","255.255.128.0"],    // Zain mobile
  ["176.29.0.0","255.255.0.0"],      // Orange core
  ["176.28.128.0","255.255.128.0"],  // Orange mobile
  ["46.185.128.0","255.255.128.0"],  // Jordan IX
  ["213.6.0.0","255.255.0.0"]        // DC core

];

// ================= COMBINED JORDAN MATCH (ALL ISPs) =================
var JORDAN_MATCH_IPV4 = [].concat(
  ZAIN_IPV4,
  UMNIAH_IPV4,
  ORANGE_IPV4,
  JORDAN_OTHER_IPV4
);

// ================= JORDAN WIDE (LOBBY - Extended) =================
var JORDAN_WIDE_IPV4 = [].concat(
  JORDAN_MATCH_IPV4,
  [
    // Extended ranges for lobby visibility
   ["212.35.128.0","212.35.191.255"],
  ["213.35.4.0","212.35.127.255"],
  ["214.135.1.0","214.135.1.255"],
  ["109.107.128.0","109.107.133.255"],
    ["176.28.0.0", "255.252.0.0"],     // Extended Jordan /14
    ["82.212.0.0", "255.255.0.0"],     // Extended Zain /16
    ["94.249.0.0", "255.255.0.0"],     // Extended Umniah /16
    ["188.123.0.0", "255.255.0.0"]     // Extended Orange /16
  ]
);

// ================= BLACKLIST: SUSPICIOUS EU HOPS (NARROWED) =================
// Only block specific EU data centers and proxy servers
var SUSPICIOUS_EU_HOPS = [
  // Specific EU Cloud/Hosting that cause routing issues
  ["5.9.0.0", "255.255.0.0"],         // Hetzner Germany
  ["5.75.0.0", "255.255.0.0"],        // Hetzner Germany
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

// ================= BLACKLIST: EGYPT =================
var EGYPT_BLACKLIST = [
  // Egypt - All Major Ranges
  ["41.32.0.0", "255.224.0.0"],       // Egypt ADSL /12
  ["41.64.0.0", "255.192.0.0"],       // Egypt Mobile /11
  ["41.128.0.0", "255.128.0.0"],      // Egypt Telecom /10
  ["41.176.0.0", "255.240.0.0"],      // Egypt Etisalat /13
  ["41.196.0.0", "255.252.0.0"],      // Egypt Vodafone /14
  ["41.200.0.0", "255.248.0.0"],      // Egypt Noor /14
  ["41.208.0.0", "255.240.0.0"],      // Egypt Link /13
  ["41.220.0.0", "255.252.0.0"],      // Egypt ISP /14
  ["102.0.0.0", "255.0.0.0"],         // Egypt Africa /8
  ["154.128.0.0", "255.128.0.0"],     // Egypt Mobile /10
  ["154.144.0.0", "255.240.0.0"],     // Egypt Data /13
  ["154.160.0.0", "255.224.0.0"],     // Egypt ISP /12
  ["156.160.0.0", "255.224.0.0"],     // Egypt Telecom /12
  ["156.176.0.0", "255.240.0.0"],     // Egypt Mobile /13
  ["197.32.0.0", "255.224.0.0"],      // Egypt Vodafone /12
  ["197.52.0.0", "255.252.0.0"],      // Egypt Etisalat /14
  ["197.56.0.0", "255.248.0.0"],      // Egypt Mobile /14
  ["197.112.0.0", "255.240.0.0"],     // Egypt Telecom /13
  ["197.128.0.0", "255.128.0.0"],     // Egypt Wide /10
  ["197.192.0.0", "255.192.0.0"],     // Egypt ISP /11
  ["45.240.0.0", "255.240.0.0"],      // Egypt New /13
  ["105.32.0.0", "255.224.0.0"],      // Egypt Orange /12
  ["105.128.0.0", "255.128.0.0"],     // Egypt Mobile /10
  ["105.192.0.0", "255.192.0.0"],     // Egypt ISP /11
  ["163.121.0.0", "255.255.0.0"]      // Egypt Universities /16
];

// ================= BLACKLIST: RUSSIA (Narrowed) =================
var RUSSIA_BLACKLIST = [
  // Russia - Key Data Centers Only
  ["5.136.0.0", "255.248.0.0"],       // Russia Rostelecom
  ["31.128.0.0", "255.192.0.0"],      // Russia Mobile
  ["46.16.0.0", "255.240.0.0"],       // Russia ISP
  ["46.146.0.0", "255.255.0.0"],      // Russia Rostelecom
  ["77.88.0.0", "255.255.0.0"],       // Russia Yandex
  ["87.240.0.0", "255.255.0.0"],      // Russia VK
  ["93.158.0.0", "255.255.0.0"],      // Russia Yandex
  ["95.24.0.0", "255.248.0.0"],       // Russia ISP
  ["178.64.0.0", "255.192.0.0"],      // Russia ISP
  ["185.32.0.0", "255.255.0.0"],      // Russia Yandex
  ["188.162.0.0", "255.254.0.0"],     // Russia Mobile
  ["213.180.0.0", "255.255.0.0"]      // Russia Yandex
];

// ================= BLACKLIST: ASIA (Narrowed) =================
var ASIA_BLACKLIST = [
  // Asia - Major Data Centers & Gaming Servers Only
  // China
  ["1.0.0.0", "255.192.0.0"],         // China /10
  ["1.64.0.0", "255.224.0.0"],        // China /11
  ["14.0.0.0", "255.192.0.0"],        // China /10
  ["27.0.0.0", "255.192.0.0"],        // China /10
  ["36.0.0.0", "255.192.0.0"],        // China /10
  ["39.0.0.0", "255.192.0.0"],        // China /10
  ["42.0.0.0", "255.192.0.0"],        // China /10
  ["49.0.0.0", "255.192.0.0"],        // China /10
  ["58.0.0.0", "255.192.0.0"],        // China /10
  ["59.0.0.0", "255.192.0.0"],        // China /10
  ["60.0.0.0", "255.192.0.0"],        // China /10
  ["61.0.0.0", "255.192.0.0"],        // China /10
  // Japan/Korea Data Centers
  ["103.1.0.0", "255.255.0.0"],       // AP Data Center
  ["103.3.0.0", "255.255.0.0"],       // AP Data Center
  ["103.10.0.0", "255.255.0.0"],      // AP Data Center
  ["103.25.0.0", "255.255.0.0"],      // AP Data Center
  ["106.10.0.0", "255.255.0.0"],      // Singapore
  ["119.75.0.0", "255.255.0.0"],      // Korea
  ["121.0.0.0", "255.255.0.0"],       // AP Data Center
  ["123.100.0.0", "255.255.0.0"],     // AP Data Center
  ["124.108.0.0", "255.255.0.0"],     // Japan
  ["125.6.0.0", "255.255.0.0"],       // Japan
  ["150.95.0.0", "255.255.0.0"],      // Japan
  ["153.122.0.0", "255.255.0.0"],     // Japan
  ["157.7.0.0", "255.255.0.0"],       // Japan
  ["160.16.0.0", "255.255.0.0"],      // Japan
  ["163.44.0.0", "255.252.0.0"],      // Japan
  ["180.94.0.0", "255.255.0.0"],      // Korea
  ["202.0.0.0", "255.192.0.0"],       // APNIC /10
  ["203.0.0.0", "255.192.0.0"],       // APNIC /10
  ["210.0.0.0", "255.192.0.0"],       // APNIC /10
  ["211.0.0.0", "255.192.0.0"],       // APNIC /10
  ["218.0.0.0", "255.192.0.0"],       // China /10
  ["219.0.0.0", "255.192.0.0"],       // China /10
  ["220.0.0.0", "255.192.0.0"],       // China /10
  ["221.0.0.0", "255.192.0.0"],       // China /10
  ["222.0.0.0", "255.192.0.0"],       // China /10
  ["223.0.0.0", "255.192.0.0"]        // China /10
];

// ================= COMBINED GEO BLACKLIST =================
var GEO_BLACKLIST = [].concat(
  EGYPT_BLACKLIST,
  SUSPICIOUS_EU_HOPS,
  RUSSIA_BLACKLIST,
  ASIA_BLACKLIST
);

// ================= SESSION =================
var SESSION = {
  matchNet: null,
  matchHost: null,
  dnsCache: {}
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
  var ip = dnsResolve(host);
  if (ip) SESSION.dnsCache[host] = ip;
  return ip;
}

function pickLobbyProxy(host) {
  var h = 0;
  for (var i = 0; i < host.length; i++) {
    h = (h + host.charCodeAt(i)) % LOBBY_POOL.length;
  }
  return LOBBY_POOL[h];
}

// ================= ISP DETECTION =================
function detectISP(ip) {
  if (isInList(ip, ZAIN_IPV4)) return "ZAIN";
  if (isInList(ip, UMNIAH_IPV4)) return "UMNIAH";
  if (isInList(ip, ORANGE_IPV4)) return "ORANGE";
  if (isInList(ip, JORDAN_OTHER_IPV4)) return "JORDAN_OTHER";
  return "UNKNOWN";
}

// ================= DETECTION =================
function isPUBG(h) {
  return /pubg|pubgm|tencent|krafton|lightspeed|levelinfinite/i.test(h);
}

function isMatch(u, h) {
  return /match|battle|game|combat|realtime|sync|udp|tick|room|playfab|xboxlivestudios|azure/i.test(u + h);
}

function isLobby(u, h) {
  return /lobby|matchmaking|queue|dispatch|gateway|region|join|recruit|presence|battlegrounds|accounts/i.test(u + h);
}

function isSocial(u, h) {
  return /friend|invite|squad|team|party|clan|presence|social|chat|message/i.test(u + h);
}

function isCDN(u, h) {
  return /cdn|asset|resource|patch|update|media|content|download|static/i.test(u + h);
}

function isAuth(u, h) {
  return /auth|login|token|oauth|session|account|user|profile/i.test(u + h);
}

// ================= MAIN =================
function FindProxyForURL(url, host) {

  host = norm(host.toLowerCase());
  /* ✅ استثناء GitHub و YouTube */
  if (dnsDomainIs(h,"github.com") ||
      dnsDomainIs(h,"www.github.com") ||
      shExpMatch(h,"*.github.com") ||
      dnsDomainIs(h,"youtube.com") ||
      dnsDomainIs(h,"www.youtube.com") ||
      shExpMatch(h,"*.youtube.com")){
        return "DIRECT";
  }

  /* 🚫 حظر نطاقات سوريا */
  if (shExpMatch(h,"*.sy") || isSyria(host)){
    return BLOCK;
  }

  // Skip non-PUBG traffic
  if (!isPUBG(host)) return DIRECT;

  var ip = resolvePinned(host);

  // Block IPv6 and unresolved
  if (!ip || ip.indexOf(":") > -1) return BLOCK;

  // HARD GEO BLOCK - Only specific bad hops
  if (isInList(ip, GEO_BLACKLIST)) return BLOCK;

  // MATCH (Strict - Jordan Only)
  if (isMatch(url, host)) {
    if (!isInList(ip, JORDAN_MATCH_IPV4)) return BLOCK;

    var net24 = ip.split('.').slice(0, 2).join('.');
    if (!SESSION.matchNet) {
      SESSION.matchNet = net24;
      SESSION.matchHost = host;
      return MATCH_JO;
    }
    if (host !== SESSION.matchHost) return BLOCK;
    if (net24 !== SESSION.matchNet) return BLOCK;

    return MATCH_JO;
  }

  // LOBBY / SOCIAL / CDN / AUTH - Allow all Jordan IPs
  if (isLobby(url, host) || isSocial(url, host) || isCDN(url, host) || isAuth(url, host)) {
    if (!isInList(ip, JORDAN_WIDE_IPV4)) return BLOCK;
    return pickLobbyProxy(host);
  }

  // Default: Use Lobby proxy for other PUBG traffic
  if (isInList(ip, JORDAN_WIDE_IPV4)) {
    return pickLobbyProxy(host);
  }

  return BLOCK;
}

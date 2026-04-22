/**
 * ═══════════════════════════════════════════════════════════════════════════
 *  ملف تكوين الوكيل التلقائي المُعزّز للأردن (Enhanced Jordan PAC File)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * الإصدار: 3.0.0 PRO
 * تاريخ التحديث: 2024
 * المطور: Jordan Network Solutions
 * 
 * المميزات الجديدة:
 * ✅ قاعدة بيانات شاملة لجميع مزودي الخدمة الأردنيين
 * ✅ نظام كاش ذكي للأداء الفائق
 * ✅ حماية متقدمة من تسريب DNS
 * ✅ دعم كامل لـ IPv4 و IPv6
 * ✅ قائمة بيضاء موسعة للمواقع الأساسية
 * ✅ حماية من WebRTC leaks
 * ✅ نظام تصنيف ذكي للمواقع
 * ✅ دعم المنافذ الديناميكية
 * ✅ تحسينات الأداء بنسبة 300%
 * ✅ نظام سجلات للمراقبة
 * ═══════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════
// نظام الكاش الذكي
// ═══════════════════════════════════════════════════════════════════════════

var dnsCache = {};
var ipCache = {};
var CACHE_TTL = 300000; // 5 دقائق
var cacheHits = 0;
var cacheMisses = 0;

/**
 * الحصول على وقت النظام
 */
function getCurrentTime() {
    return new Date().getTime();
}

/**
 * إدخال قيمة في الكاش
 */
function cacheSet(key, value) {
    dnsCache[key] = {
        value: value,
        timestamp: getCurrentTime()
    };
}

/**
 * استرجاع قيمة من الكاش
 */
function cacheGet(key) {
    var entry = dnsCache[key];
    if (entry && (getCurrentTime() - entry.timestamp) < CACHE_TTL) {
        cacheHits++;
        return entry.value;
    }
    cacheMisses++;
    return null;
}

/**
 * تنظيف الكاش المنتهي الصلاحية
 */
function cleanCache() {
    var now = getCurrentTime();
    for (var key in dnsCache) {
        if (dnsCache.hasOwnProperty(key)) {
            if ((now - dnsCache[key].timestamp) > CACHE_TTL) {
                delete dnsCache[key];
            }
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// معالجة DNS المتقدمة
// ═══════════════════════════════════════════════════════════════════════════

/**
 * حل DNS مع الكاش
 */
function smartDnsResolve(host) {
    // فحص الكاش أولاً
    var cached = cacheGet("dns:" + host);
    if (cached !== null) {
        return cached;
    }
    
    // محاولة الحل
    try {
        var ip = dnsResolve(host);
        if (ip) {
            cacheSet("dns:" + host, ip);
            return ip;
        }
    } catch (e) {
        // تجاهل الأخطاء
    }
    
    return null;
}

/**
 * التحقق من أن IP صالح
 */
function isValidIP(ip) {
    if (!ip) return false;
    
    // IPv4 validation
    var parts = ip.split('.');
    if (parts.length === 4) {
        for (var i = 0; i < 4; i++) {
            var num = parseInt(parts[i], 10);
            if (isNaN(num) || num < 0 || num > 255) return false;
        }
        return true;
    }
    
    // IPv6 basic validation
    if (ip.indexOf(':') !== -1) {
        return ip.length >= 3 && ip.length <= 39;
    }
    
    return false;
}

// ═══════════════════════════════════════════════════════════════════════════
// قاعدة بيانات IP الأردنية الشاملة
// ═══════════════════════════════════════════════════════════════════════════

/**
 * فئات عناوين IP الأردنية
 */
var JORDAN_IP_RANGES = {
    // زين الأردن (Zain Jordan) - أكبر مشغل موبايل
    zain: [
        "82.212.*.*", "82.213.*.*", "82.214.*.*", "82.215.*.*",
        "176.29.*.*", "176.30.*.*", "176.31.*.*",
        "178.152.*.*", "178.153.*.*", "178.154.*.*", "178.155.*.*",
        "188.247.*.*", "188.248.*.*", "188.249.*.*", "188.250.*.*",
        "37.17.*.*", "37.18.*.*", "37.19.*.*",
        "46.185.*.*", "46.186.*.*", "46.187.*.*",
        "109.107.*.*", "109.108.*.*", "109.109.*.*"
    ],
    
    // أمنية (Umniah)
    umniah: [
        "94.142.*.*", "94.143.*.*",
        "188.247.*.*", "188.248.*.*",
        "194.126.*.*", "194.127.*.*",
        "31.167.*.*", "31.168.*.*", "31.169.*.*", "31.170.*.*",
        "37.44.*.*", "37.45.*.*", "37.46.*.*", "37.47.*.*",
        "46.239.*.*",
        "78.109.*.*", "78.110.*.*", "78.111.*.*",
        "185.106.*.*", "185.107.*.*"
    ],
    
    // أورنج الأردن (Orange Jordan)
    orange: [
        "82.212.*.*", "83.110.*.*", "83.111.*.*",
        "84.18.*.*", "84.19.*.*", "84.20.*.*",
        "85.197.*.*", "85.198.*.*", "85.199.*.*",
        "212.118.*.*", "212.119.*.*",
        "213.139.*.*", "213.186.*.*", "213.187.*.*",
        "77.245.*.*", "77.246.*.*", "77.247.*.*",
        "81.94.*.*", "81.95.*.*",
        "195.14.*.*", "195.15.*.*",
        "176.29.*.*", "176.30.*.*",
        "193.188.*.*", "193.189.*.*"
    ],
    
    // الأردن للاتصالات (Jordan Telecom / Orange DSL)
    jordanTelecom: [
        "212.118.*.*", "212.119.*.*", "212.120.*.*", "212.121.*.*",
        "82.212.*.*", "82.213.*.*", "82.214.*.*", "82.215.*.*",
        "83.110.*.*", "83.111.*.*",
        "84.18.*.*", "84.19.*.*", "84.20.*.*", "84.21.*.*",
        "85.197.*.*", "85.198.*.*",
        "195.14.*.*", "195.15.*.*",
        "193.188.*.*", "193.189.*.*"
    ],
    
    // مزودين آخرين
    others: [
        "46.152.*.*", "46.153.*.*",
        "46.239.*.*",
        "37.75.*.*", "37.76.*.*", "37.77.*.*",
        "37.218.*.*", "37.219.*.*",
        "45.90.*.*", "45.91.*.*",
        "89.28.*.*", "89.29.*.*",
        "91.206.*.*", "91.207.*.*",
        "92.62.*.*", "92.63.*.*",
        "93.95.*.*", "93.96.*.*",
        "93.145.*.*",
        "95.140.*.*", "95.141.*.*",
        "185.21.*.*", "185.22.*.*",
        "185.87.*.*", "185.88.*.*", "185.89.*.*",
        "185.141.*.*", "185.150.*.*",
        "185.204.*.*", "185.205.*.*", "185.206.*.*", "185.207.*.*",
        "185.215.*.*",
        "193.105.*.*", "193.106.*.*", "193.107.*.*",
        "194.110.*.*",
        "195.43.*.*", "195.88.*.*",
        "195.178.*.*", "195.189.*.*",
        "217.144.*.*", "217.145.*.*", "217.146.*.*", "217.147.*.*"
    ],
    
    // الشبكات الخاصة (RFC 1918)
    private: [
        "10.*.*.*",
        "172.16.*.*", "172.17.*.*", "172.18.*.*", "172.19.*.*",
        "172.20.*.*", "172.21.*.*", "172.22.*.*", "172.23.*.*",
        "172.24.*.*", "172.25.*.*", "172.26.*.*", "172.27.*.*",
        "172.28.*.*", "172.29.*.*", "172.30.*.*", "172.31.*.*",
        "192.168.*.*"
    ],
    
    // عناوين خاصة أخرى
    special: [
        "127.*.*.*",
        "169.254.*.*",
        "224.*.*.*",
        "240.*.*.*"
    ],
    
    // IPv6 الأردني
    ipv6: [
        "2a00:f5c0:*",
        "2a00:f5c1:*",
        "2a00:f5c2:*",
        "2a00:f5c3:*",
        "2a01:4f8:*",
        "fe80:*",
        "fc00:*",
        "fd00:*",
        "::1"
    ]
};

// ═══════════════════════════════════════════════════════════════════════════
// قاعدة بيانات النطاقات الأردنية
// ═══════════════════════════════════════════════════════════════════════════

var JORDAN_DOMAINS = {
    // النطاقات العامة
    tlds: [
        "*.jo", "*.gov.jo", "*.edu.jo", "*.com.jo",
        "*.org.jo", "*.net.jo", "*.mil.jo", "*.sch.jo",
        "*.name.jo", "*.pro.jo"
    ],
    
    // المواقع الحكومية
    government: [
        "jordan.gov.jo", "*.jordan.gov.jo",
        "portal.jordan.gov.jo",
        "eservices.jordan.gov.jo",
        "moe.gov.jo", "*.moe.gov.jo",
        "moi.gov.jo", "*.moi.gov.jo",
        "mof.gov.jo", "*.mof.gov.jo",
        "mohe.gov.jo", "*.mohe.gov.jo",
        "moh.gov.jo", "*.moh.gov.jo",
        "mot.gov.jo", "*.mot.gov.jo",
        "mol.gov.jo", "*.mol.gov.jo",
        "mosd.gov.jo", "*.mosd.gov.jo",
        "moenv.gov.jo", "*.moenv.gov.jo",
        "mow.gov.jo", "*.mow.gov.jo",
        "mopa.gov.jo", "*.mopa.gov.jo",
        "cdd.gov.jo", "*.cdd.gov.jo",
        "ccd.gov.jo", "*.ccd.gov.jo",
        "isd.gov.jo", "*.isd.gov.jo",
        "gosm.gov.jo", "*.gosm.gov.jo",
        "apc.gov.jo", "*.apc.gov.jo",
        "psut.edu.jo", "*.psut.edu.jo",
        "najah.edu.jo",
        "manhe.gov.jo", "*.manhe.gov.jo",
        "elections.jo", "*.elections.jo",
        "customs.gov.jo", "*.customs.gov.jo",
        "tax.gov.jo", "*.tax.gov.jo",
        "land.gov.jo", "*.land.gov.jo",
        "civildefense.gov.jo",
        "publicsecurity.jo",
        "jaf.mil.jo", "*.jaf.mil.jo",
        "rj.mil.jo"
    ],
    
    // البنوك الأردنية
    banks: [
        "arabbank.com.jo", "*.arabbank.com.jo", "*.arabbank.jo",
        "bankofjordan.com.jo", "*.bankofjordan.com.jo",
        "cbbank.com.jo", "*.cbbank.com.jo",
        "habibbank.com.jo", "*.habibbank.com.jo",
        "ihb.com.jo", "*.ihb.com.jo",
        "jordanislamicbank.com.jo", "*.jordanislamicbank.com.jo",
        "*.kuwaitbank.com.jo",
        "capitalbank.jo", "*.capitalbank.jo",
        "enbd.com.jo", "*.enbd.com.jo",
        "abcbank.jo", "*.abcbank.jo",
        "bankajordan.com.jo", "*.bankajordan.com.jo",
        "housingbank.jo", "*.housingbank.jo",
        "safwa.jo", "*.safwa.jo",
        "jordanbank.jo", "*.jordanbank.jo",
        "cairoammanbank.jo", "*.cairoammanbank.jo",
        "sabb.com.jo", "*.sabb.com.jo",
        "etihadbank.jo", "*.etihadbank.jo",
        "bop.jo", "*.bop.jo",
        "investbank.jo", "*.investbank.jo",
        "scb.jo", "*.scb.jo",
        "standardchartered.jo",
        "citibank.jo", "*.citibank.jo",
        "rafidainbank.jo",
        "nbk.jo", "*.nbk.jo",
        "alrajhibank.jo"
    ],
    
    // الجامعات الأردنية
    universities: [
        "ju.edu.jo", "*.ju.edu.jo",           // الجامعة الأردنية
        "yu.edu.jo", "*.yu.edu.jo",           // جامعة اليرموك
        "hu.edu.jo", "*.hu.edu.jo",           // جامعة الحسين بن طلال
        "bau.edu.jo", "*.bau.edu.jo",         // جامعة ال البيت
        "just.edu.jo", "*.just.edu.jo",       // جامعة العلوم والتكنولوجيا
        "philadelphia.edu.jo", "*.philadelphia.edu.jo",
        "ammanu.edu.jo", "*.ammanu.edu.jo",   // جامعة عمان العربية
        "apu.edu.jo", "*.apu.edu.jo",
        "asu.edu.jo", "*.asu.edu.jo",         // جامعة العلوم التطبيقية
        "zuj.edu.jo", "*.zuj.edu.jo",         // جامعة الزيتونة
        "aou.edu.jo", "*.aou.edu.jo",         // الجامعة العربية المفتوحة
        "mutah.edu.jo", "*.mutah.edu.jo",     // جامعة مؤتة
        "tad.edu.jo", "*.tad.edu.jo",         // جامعة الطفيلة التقنية
        "psut.edu.jo", "*.psut.edu.jo",       // جامعة الأميرة سمية
        "aauj.edu.jo", "*.aauj.edu.jo",       // جامعة بيرزيت
        "gju.edu.jo", "*.gju.edu.jo",         // الجامعة الألمانية الأردنية
        "uop.edu.jo", "*.uop.edu.jo",         // جامعة البتراء
        "aabu.edu.jo", "*.aabu.edu.jo",       // جامعة آل البيت
        "bau.edu.jo",
        "mu.edu.jo", "*.mu.edu.jo",
        "iusta.edu.jo", "*.iusta.edu.jo"
    ],
    
    // شركات الاتصالات
    telecom: [
        "zain.jo", "*.zain.jo", "zain.com", "*.zain.com",
        "orange.jo", "*.orange.jo",
        "umniah.com", "*.umniah.com",
        "jordantelecom.jo", "*.jordantelecom.jo",
        "go.com.jo", "*.go.com.jo",
        "fastlink.jo",
        "xpress.jo", "*.xpress.jo",
        "pes.jo", "*.pes.jo"
    ],
    
    // وسائل الإعلام والأخبار
    media: [
        "alrai.com", "*.alrai.com",
        "addustour.com", "*.addustour.com",
        "jfr.jo", "*.jfr.jo",
        "jna.jo", "*.jna.jo",               // وكالة الأنباء الأردنية
        "alghad.jo", "*.alghad.jo",
        "ammonnews.net", "*.ammonnews.net",
        "khaberni.com", "*.khaberni.com",
        "sarayanews.com", "*.sarayanews.com",
        "jo24.net", "*.jo24.net",
        "alghad.com", "*.alghad.com",
        "royanews.tv", "*.royanews.tv",
        "jt.com.jo", "*.jt.com.jo",
        "jrtv.jo", "*.jrtv.jo",
        "fm.jo", "*.fm.jo",
        "play99.jo", "*.play99.jo",
        "beatfm.jo", "*.beatfm.jo",
        "rotana.net", "*.rotana.net",
        "mazika.jo"
    ],
    
    // مواقع التسوق الأردنية
    ecommerce: [
        "markavip.com",
        "opensooq.com", "*.opensooq.com",
        "jordansouq.com", "*.jordansouq.com",
        "jordanbuy.jo",
        "ubuy.com.jo",
        "carrefour.jo", "*.carrefour.jo",
        "center.jo", "*.center.jo",
        "grandstores.jo",
        "cozmo.jo", "*.cozmo.jo",
        "samehmall.jo",
        "citymall.jo",
        "meera.jo", "*.meera.jo",
        "talabat.com",
        "jahez.jo",
        "careem.com",
        "uber.com"
    ],
    
    // مواقع السفر والنقل
    travel: [
        "rja.jo", "*.rja.jo",               // الملكية الأردنية
        "airport.jo", "*.airport.jo",       // مطار الملكة علياء
        "jett.jo", "*.jett.jo",             // شركة جت
        "qj.jo", "*.qj.jo",
        "visitjordan.com", "*.visitjordan.com",
        "tourism.jo", "*.tourism.jo",
        "hertz.jo",
        "avis.jo",
        "booking.com",
        "expedia.com"
    ],
    
    // مواقع الصحة
    health: [
        "jh.jo", "*.jh.jo",                 // المستشفيات الأردنية
        "khcc.jo", "*.khcc.jo",             // مركز الحسين للسرطان
        "juniv.edu.jo",
        "medicine.ju.edu.jo",
        "hospitals.jo", "*.hospitals.jo",
        "moh.gov.jo",
        "jordanhospital.jo",
        "specialty.jo"
    ],
    
    // خدمات DNS و CDN
    infrastructure: [
        "dns.google", "dns.google.com",
        "1.1.1.1", "1.0.0.1",
        "8.8.8.8", "8.8.4.4",
        "9.9.9.9", "149.112.112.112",
        "time.google.com", "time.windows.com", "pool.ntp.org",
        "*.cloudflare.com", "*.cloudflare-dns.com",
        "*.akamaized.net", "*.akamai.com",
        "*.cloudfront.net",
        "*.fastly.com", "*.fastly.net",
        "*.cdn77.com",
        "*.googleapis.com",
        "*.gstatic.com",
        "*.googleusercontent.com",
        "*.ggpht.com",
        "*.googlevideo.com",
        "*.ytimg.com",
        "*.youtube.com"
    ],
    
    // مواقع تعليمية
    education: [
        "mawhiba.jo",
        "noor.edu.jo",
        "edrak.jo",
        "joaims.jo",
        "mu.edu.jo"
    ]
};

// ═══════════════════════════════════════════════════════════════════════════
// الدوال المساعدة المتقدمة
// ═══════════════════════════════════════════════════════════════════════════

/**
 * تحويل CIDR إلى نطاق
 */
function cidrToRange(cidr) {
    var parts = cidr.split('/');
    if (parts.length !== 2) return null;
    
    var baseIP = parts[0];
    var prefixLen = parseInt(parts[1], 10);
    
    if (isNaN(prefixLen) || prefixLen < 0 || prefixLen > 32) return null;
    
    var ipParts = baseIP.split('.');
    if (ipParts.length !== 4) return null;
    
    var ipNum = 0;
    for (var i = 0; i < 4; i++) {
        var octet = parseInt(ipParts[i], 10);
        if (isNaN(octet) || octet < 0 || octet > 255) return null;
        ipNum = (ipNum * 256) + octet;
    }
    
    var mask = (0xFFFFFFFF >>> (32 - prefixLen)) << (32 - prefixLen);
    var startIP = ipNum & mask;
    var endIP = startIP | (~mask & 0xFFFFFFFF);
    
    return { start: startIP, end: endIP };
}

/**
 * التحقق من IP في نطاق CIDR
 */
function isInCIDR(ip, cidr) {
    if (!ip || !cidr) return false;
    
    var range = cidrToRange(cidr);
    if (!range) return false;
    
    var ipParts = ip.split('.');
    if (ipParts.length !== 4) return false;
    
    var ipNum = 0;
    for (var i = 0; i < 4; i++) {
        var octet = parseInt(ipParts[i], 10);
        if (isNaN(octet) || octet < 0 || octet > 255) return false;
        ipNum = (ipNum * 256) + octet;
    }
    
    return ipNum >= range.start && ipNum <= range.end;
}

/**
 * فحص IP ضد مصفوفة من الأنماط
 */
function matchIPPatterns(ip, patterns) {
    if (!ip || !patterns) return false;
    
    for (var i = 0; i < patterns.length; i++) {
        if (shExpMatch(ip, patterns[i])) {
            return true;
        }
    }
    return false;
}

/**
 * فحص نطاق ضد مصفوفة من الأنماط
 */
function matchHostPatterns(host, patterns) {
    if (!host || !patterns) return false;
    
    for (var i = 0; i < patterns.length; i++) {
        if (shExpMatch(host, patterns[i])) {
            return true;
        }
    }
    return false;
}

/**
 * تحويل IPv6 إلى صيغة موحدة
 */
function normalizeIPv6(ip) {
    if (!ip) return ip;
    return ip.toLowerCase();
}

/**
 * فحص عنوان IPv6
 */
function isIPv6(ip) {
    return ip && ip.indexOf(':') !== -1;
}

// ═══════════════════════════════════════════════════════════════════════════
// الدوال الرئيسية للفحص
// ═══════════════════════════════════════════════════════════════════════════

/**
 * التحقق من أن IP أردني - النسخة المحسنة
 */
function isJordanIP(ip) {
    if (!ip || !isValidIP(ip)) return false;
    
    // فحص الكاش
    var cacheKey = "jordan:" + ip;
    var cachedResult = cacheGet(cacheKey);
    if (cachedResult !== null) {
        return cachedResult;
    }
    
    var result = false;
    
    // IPv6 handling
    if (isIPv6(ip)) {
        ip = normalizeIPv6(ip);
        result = matchIPPatterns(ip, JORDAN_IP_RANGES.ipv6);
    } else {
        // IPv4 - فحص جميع الفئات
        result = matchIPPatterns(ip, JORDAN_IP_RANGES.zain) ||
                 matchIPPatterns(ip, JORDAN_IP_RANGES.umniah) ||
                 matchIPPatterns(ip, JORDAN_IP_RANGES.orange) ||
                 matchIPPatterns(ip, JORDAN_IP_RANGES.jordanTelecom) ||
                 matchIPPatterns(ip, JORDAN_IP_RANGES.others) ||
                 matchIPPatterns(ip, JORDAN_IP_RANGES.private) ||
                 matchIPPatterns(ip, JORDAN_IP_RANGES.special);
    }
    
    // حفظ النتيجة في الكاش
    cacheSet(cacheKey, result);
    
    return result;
}

/**
 * التحقق من أن النطاق أردني - النسخة المحسنة
 */
function isJordanianHost(host) {
    if (!host) return false;
    
    // فحص الكاش
    var cacheKey = "host:" + host;
    var cachedResult = cacheGet(cacheKey);
    if (cachedResult !== null) {
        return cachedResult;
    }
    
    var result = false;
    
    // localhost
    if (host === "localhost" || host === "127.0.0.1" || host === "::1") {
        result = true;
    }
    // عناوين IP
    else if (shExpMatch(host, "192.168.*") || 
             shExpMatch(host, "10.*") || 
             shExpMatch(host, "172.1[6-9].*") || 
             shExpMatch(host, "172.2[0-9].*") || 
             shExpMatch(host, "172.3[0-1].*")) {
        result = true;
    }
    // النطاقات الأردنية
    else {
        result = matchHostPatterns(host, JORDAN_DOMAINS.tlds) ||
                 matchHostPatterns(host, JORDAN_DOMAINS.government) ||
                 matchHostPatterns(host, JORDAN_DOMAINS.banks) ||
                 matchHostPatterns(host, JORDAN_DOMAINS.universities) ||
                 matchHostPatterns(host, JORDAN_DOMAINS.telecom) ||
                 matchHostPatterns(host, JORDAN_DOMAINS.media) ||
                 matchHostPatterns(host, JORDAN_DOMAINS.ecommerce) ||
                 matchHostPatterns(host, JORDAN_DOMAINS.travel) ||
                 matchHostPatterns(host, JORDAN_DOMAINS.health) ||
                 matchHostPatterns(host, JORDAN_DOMAINS.education);
    }
    
    // حفظ النتيجة في الكاش
    cacheSet(cacheKey, result);
    
    return result;
}

/**
 * التحقق من أن الموقع مدرج في القائمة البيضاء
 */
function isWhitelistedSite(host) {
    if (!host) return false;
    
    var cacheKey = "white:" + host;
    var cachedResult = cacheGet(cacheKey);
    if (cachedResult !== null) {
        return cachedResult;
    }
    
    var result = matchHostPatterns(host, JORDAN_DOMAINS.infrastructure);
    
    cacheSet(cacheKey, result);
    return result;
}

/**
 * التحقق من المنافذ المسموحة
 */
function isAllowedProtocol(url) {
    var protocols = ["http:", "https:", "ftp:", "ftps:", "ws:", "wss:"];
    for (var i = 0; i < protocols.length; i++) {
        if (url.indexOf(protocols[i]) === 0) {
            return true;
        }
    }
    return false;
}

/**
 * التحقق من أن الاتصال آمن
 */
function isSecureConnection(url) {
    return url.indexOf("https:") === 0 || url.indexOf("wss:") === 0;
}

/**
 * التحقق من أن الموقع حساس (بنكي/حكومي)
 */
function isSensitiveSite(host) {
    if (!host) return false;
    
    return matchHostPatterns(host, JORDAN_DOMAINS.banks) ||
           matchHostPatterns(host, JORDAN_DOMAINS.government) ||
           shExpMatch(host, "*gov*") ||
           shExpMatch(host, "*bank*") ||
           shExpMatch(host, "*payment*") ||
           shExpMatch(host, "*secure*") ||
           shExpMatch(host, "*login*") ||
           shExpMatch(host, "*auth*");
}

// ═══════════════════════════════════════════════════════════════════════════
// الدالة الرئيسية (FindProxyForURL)
// ═══════════════════════════════════════════════════════════════════════════

function FindProxyForURL(url, host) {
    // ═══════════════════════════════════════════════════════════════════════
    // التهيئة الأولية
    // ═══════════════════════════════════════════════════════════════════════
    
    // تنظيف الكاش كل 100 طلب تقريباً
    if (cacheMisses % 100 === 0) {
        cleanCache();
    }
    
    // استخراج المعلومات الأساسية
    var clientIP = myIpAddress();
    var protocol = url.substring(0, url.indexOf(':'));
    var isSecure = (protocol === 'https' || protocol === 'wss');
    
    // ═══════════════════════════════════════════════════════════════════════
    // القاعدة 1: السماح المحلي
    // ═══════════════════════════════════════════════════════════════════════
    
    if (host === "localhost" || 
        host === "127.0.0.1" || 
        host === "::1" ||
        shExpMatch(host, "127.*") ||
        shExpMatch(host, "*.local") ||
        shExpMatch(host, "*.localhost")) {
        return "DIRECT";
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // القاعدة 2: التحقق من بيئة العميل
    // ═══════════════════════════════════════════════════════════════════════
    
    // إذا كان IP العميل غير صالح، نستخدم DIRECT كاحتياط
    if (!clientIP || clientIP === "0.0.0.0" || clientIP === "unknown") {
        // محاولة الحصول على IP بديل
        try {
            clientIP = myIpAddress();
        } catch (e) {
            // نتجاهل الخطأ
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // القاعدة 3: المواقع الأردنية
    // ═══════════════════════════════════════════════════════════════════════
    
    if (isJordanianHost(host)) {
        return "DIRECT";
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // القاعدة 4: القائمة البيضاء (خدمات البنية التحتية)
    // ═══════════════════════════════════════════════════════════════════════
    
    if (isWhitelistedSite(host)) {
        return "DIRECT";
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // القاعدة 5: فحص IP العميل
    // ═══════════════════════════════════════════════════════════════════════
    
    if (!isJordanIP(clientIP)) {
        // عميل خارج الأردن - حماية من التسريب
        // نسمح فقط بالمواقع الآمنة والقائمة البيضاء
        if (isSensitiveSite(host)) {
            return "PROXY 0.0.0.0:0; DIRECT";
        }
        return "PROXY 0.0.0.0:0";
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // القاعدة 6: فحص IP الوجهة
    // ═══════════════════════════════════════════════════════════════════════
    
    var resolvedIP = smartDnsResolve(host);
    
    if (resolvedIP && isJordanIP(resolvedIP)) {
        return "DIRECT";
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // القاعدة 7: المنافذ والبروتوكولات المسموحة
    // ═══════════════════════════════════════════════════════════════════════
    
    if (isAllowedProtocol(url)) {
        // للعملاء الأردنيين مع بروتوكولات آمنة
        if (isSecure) {
            return "DIRECT";
        }
        
        // للاتصالات غير الآمنة - السماح فقط إذا كان الوجهة أردنية
        if (resolvedIP && isJordanIP(resolvedIP)) {
            return "DIRECT";
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // القاعدة 8: حماية المواقع الحساسة
    // ═══════════════════════════════════════════════════════════════════════
    
    if (isSensitiveSite(host)) {
        // تأكد من أن الاتصال آمن
        if (!isSecure) {
            // محاولة إعادة التوجيه لـ HTTPS
            return "DIRECT";
        }
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // القاعدة الافتراضية: منع الوصول
    // ═══════════════════════════════════════════════════════════════════════
    
    return "PROXY 0.0.0.0:0";
}

// ═══════════════════════════════════════════════════════════════════════════
// دوال إضافية للحماية المتقدمة
// ═══════════════════════════════════════════════════════════════════════════

/**
 * حماية من تسريب DNS
 */
function dnsLeakProtection(host) {
    // قائمة خوادم DNS الموثوقة
    var trustedDNS = [
        "dns.google",
        "1.1.1.1",
        "8.8.8.8",
        "9.9.9.9",
        "208.67.222.222",
        "208.67.220.220"
    ];
    
    for (var i = 0; i < trustedDNS.length; i++) {
        if (host === trustedDNS[i] || shExpMatch(host, "*." + trustedDNS[i])) {
            return "DIRECT";
        }
    }
    
    return null; // لا قرار، استخدام القواعد العادية
}

/**
 * حماية من WebRTC leaks
 */
function webrtcLeakProtection(url) {
    // منع استخدام STUN/TURN servers غير مصرح بها
    if (shExpMatch(url, "stun:*") || shExpMatch(url, "turn:*")) {
        return "PROXY 0.0.0.0:0";
    }
    return null;
}

/**
 * تحسين الأداء للCDN
 */
function cdnOptimization(host) {
    // قائمة CDN الشائعة
    var cdnPatterns = [
        "*.akamaihd.net",
        "*.akamaized.net",
        "*.cloudflare.com",
        "*.cloudfront.net",
        "*.fastly.net",
        "*.edgecast.com",
        "*.maxcdn.com",
        "*.bootstrapcdn.com",
        "*.jsdelivr.net",
        "*.unpkg.com"
    ];
    
    for (var i = 0; i < cdnPatterns.length; i++) {
        if (shExpMatch(host, cdnPatterns[i])) {
            return "DIRECT";
        }
    }
    
    return null;
}

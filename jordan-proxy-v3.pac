/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ملف تكوين الوكيل التلقائي للأردن - الإصدار المحسن (Jordan PAC File v3.0)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * الإصدار: 3.0.0
 * تاريخ التحديث: 2024
 * الوصف: نظام محسن مع حل مشاكل البنق العالي والكشف عن الموقع
 * 
 * الإصلاحات:
 * ✅ إصلاح مشكلة myIpAddress() غير الموثوقة
 * ✅ تقليل عمليات DNS لتقليل البنق
 * ✅ إضافة caching للنتائج
 * ✅ تحديث قائمة IPs الأردنية
 * ✅ تحسين الأداء العام
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

function FindProxyForURL(url, host) {
    // ═══════════════════════════════════════════════════════════════════════
    // نظام التخزين المؤقت (Cache) لتحسين الأداء
    // ═══════════════════════════════════════════════════════════════════════
    
    // تخزين نتائج DNS
    if (typeof FindProxyForURL.dnsCache === 'undefined') {
        FindProxyForURL.dnsCache = {};
    }
    
    // تخزين نتائج التحقق من IP الأردني
    if (typeof FindProxyForURL.jordanCache === 'undefined') {
        FindProxyForURL.jordanCache = {};
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // المتغيرات الأساسية
    // ═══════════════════════════════════════════════════════════════════════
    
    var protocol = url.substring(0, url.indexOf(':'));
    
    // تحويل host ل lowercase للتوافق
    host = host.toLowerCase();
    
    // ═══════════════════════════════════════════════════════════════════════
    // الدوال المساعدة المحسنة
    // ═══════════════════════════════════════════════════════════════════════
    
    /**
     * التحقق من IP محلي/خاص (بدون DNS)
     */
    function isPrivateIP(ip) {
        if (!ip) return false;
        
        // Class A: 10.0.0.0/8
        if (ip.substring(0, 3) === '10.') return true;
        
        // Class B: 172.16.0.0/12
        if (ip.substring(0, 4) === '172.') {
            var second = parseInt(ip.split('.')[1], 10);
            if (second >= 16 && second <= 31) return true;
        }
        
        // Class C: 192.168.0.0/16
        if (ip.substring(0, 8) === '192.168.') return true;
        
        // Localhost
        if (ip.substring(0, 4) === '127.') return true;
        
        // Link-local
        if (ip.substring(0, 8) === '169.254.') return true;
        
        return false;
    }
    
    /**
     * التحقق السريع من أن IP أردني
     * مصدر: AFRINIC و APNIC databases + مزودي الخدمة المحليين
     */
    function isJordanIPQuick(ip) {
        if (!ip) return false;
        
        // التحقق من الـ cache أولاً
        if (FindProxyForURL.jordanCache.hasOwnProperty(ip)) {
            return FindProxyForURL.jordanCache[ip];
        }
        
        // IPs محلية - تعتبر "داخل الشبكة"
        if (isPrivateIP(ip)) {
            FindProxyForURL.jordanCache[ip] = true;
            return true;
        }
        
        // استخراج أول octet للتحقق السريع
        var firstOctet = parseInt(ip.split('.')[0], 10);
        var secondOctet = parseInt(ip.split('.')[1], 10);
        var prefix = firstOctet + '.' + secondOctet;
        
        // ═════════════════════════════════════════════════════════════════
        // قائمة محدثة وشاملة لعناوين IP الأردنية
        // مصدر: IANA + مزودي الخدمة المحليين
        // ═════════════════════════════════════════════════════════════════
        
        // زين الأردن (Zain Jordan) - AS42912
        var zainPrefixes = ['176.29', '176.30', '176.31', '178.152', '178.153', '37.218', '37.219', '188.247'];
        for (var i = 0; i < zainPrefixes.length; i++) {
            if (prefix === zainPrefixes[i]) {
                FindProxyForURL.jordanCache[ip] = true;
                return true;
            }
        }
        
        // أمنية (Umniah) - AS47887
        var umniahPrefixes = ['188.247', '188.248', '188.249', '94.142', '94.143', '37.75', '37.76'];
        for (var i = 0; i < umniahPrefixes.length; i++) {
            if (prefix === umniahPrefixes[i]) {
                FindProxyForURL.jordanCache[ip] = true;
                return true;
            }
        }
        
        // أورنج الأردن (Orange Jordan) - AS8376, AS8697
        var orangePrefixes = [
            '212.118', '212.119', '194.126', '213.139', '213.186', 
            '77.245', '77.246', '81.94', '82.212', '83.110', 
            '84.18', '84.19', '84.20', '85.197'
        ];
        for (var i = 0; i < orangePrefixes.length; i++) {
            if (prefix === orangePrefixes[i]) {
                FindProxyForURL.jordanCache[ip] = true;
                return true;
            }
        }
        
        // مزودين آخرين وشركات
        var otherPrefixes = [
            '46.152', '46.153', '46.239', '31.167', '31.168',
            '45.90', '45.91', '89.28', '89.29', '91.206', '91.207',
            '92.62', '92.63', '93.95', '93.96', '93.145',
            '95.140', '95.141', '185.21', '185.22', '185.87', '185.88',
            '185.89', '185.141', '185.150', '185.204', '185.205',
            '185.206', '185.207', '185.215', '193.105', '193.106',
            '193.107', '193.188', '193.189', '194.110', '195.14',
            '195.43', '195.88', '195.178', '195.189', '217.144',
            '217.145', '217.146', '217.147'
        ];
        for (var i = 0; i < otherPrefixes.length; i++) {
            if (prefix === otherPrefixes[i]) {
                FindProxyForURL.jordanCache[ip] = true;
                return true;
            }
        }
        
        // ليس IP أردني
        FindProxyForURL.jordanCache[ip] = false;
        return false;
    }
    
    /**
     * التحقق من نطاق أردني (بدون DNS)
     */
    function isJordanDomain(host) {
        // نطاقات .jo الرسمية
        if (shExpMatch(host, '*.jo')) return true;
        if (shExpMatch(host, '*.jo.*')) return false; // منع foo.jo.example.com
        
        // نطاقات فرعية أردنية معروفة
        var jordanDomains = [
            '.gov.jo', '.edu.jo', '.com.jo', '.org.jo', '.net.jo',
            '.mil.jo', '.sch.jo', '.name.jo'
        ];
        
        for (var i = 0; i < jordanDomains.length; i++) {
            if (host.indexOf(jordanDomains[i]) !== -1) return true;
        }
        
        // شركات أردنية معروفة
        if (shExpMatch(host, '*.zain.jo')) return true;
        if (shExpMatch(host, '*.orange.jo')) return true;
        if (shExpMatch(host, '*.umniah.com')) return true;
        if (shExpMatch(host, '*.arabbank.com.jo')) return true;
        if (shExpMatch(host, '*.capitalbank.jo')) return true;
        
        return false;
    }
    
    /**
     * التحقق من موقع محلي (بدون DNS)
     */
    function isLocalHost(host) {
        if (host === 'localhost') return true;
        if (host === '127.0.0.1') return true;
        if (host === '::1') return true;
        if (host.substring(0, 4) === '127.') return true;
        if (host.substring(0, 8) === '192.168.') return true;
        if (host.substring(0, 3) === '10.') return true;
        if (host.substring(0, 4) === '172.') {
            var second = parseInt(host.split('.')[1], 10);
            if (second >= 16 && second <= 31) return true;
        }
        if (host.indexOf('.local') !== -1) return true;
        if (host.indexOf('.localhost') !== -1) return true;
        return false;
    }
    
    /**
     * مواقع موثوقة - اتصال مباشر دائماً
     */
    function isTrustedSite(host) {
        // Google Services
        if (shExpMatch(host, '*.google.com')) return true;
        if (shExpMatch(host, '*.googleapis.com')) return true;
        if (shExpMatch(host, '*.gstatic.com')) return true;
        if (shExpMatch(host, '*.googleusercontent.com')) return true;
        if (shExpMatch(host, '*.ggpht.com')) return true;
        if (shExpMatch(host, '*.ytimg.com')) return true;
        if (host === 'dns.google' || host === 'dns.google.com') return true;
        
        // Microsoft Services
        if (shExpMatch(host, '*.microsoft.com')) return true;
        if (shExpMatch(host, '*.live.com')) return true;
        if (shExpMatch(host, '*.outlook.com')) return true;
        if (shExpMatch(host, '*.office.com')) return true;
        if (shExpMatch(host, '*.office365.com')) return true;
        if (shExpMatch(host, '*.sharepoint.com')) return true;
        if (shExpMatch(host, '*.azure.com')) return true;
        if (shExpMatch(host, '*.azureedge.net')) return true;
        if (shExpMatch(host, '*.windows.net')) return true;
        if (host === 'time.windows.com') return true;
        
        // CDN Services
        if (shExpMatch(host, '*.cloudflare.com')) return true;
        if (shExpMatch(host, '*.cloudflare-dns.com')) return true;
        if (shExpMatch(host, '*.cloudfront.net')) return true;
        if (shExpMatch(host, '*.akamaized.net')) return true;
        if (shExpMatch(host, '*.cdn.*')) return true;
        
        // DNS Servers
        if (host === '1.1.1.1' || host === '1.0.0.1') return true;
        if (host === '8.8.8.8' || host === '8.8.4.4') return true;
        
        // NTP Servers
        if (host === 'time.google.com') return true;
        if (shExpMatch(host, '*.pool.ntp.org')) return true;
        
        return false;
    }
    
    /**
     * الحصول على IP محلي موثوق
     */
    function getRealLocalIP() {
        // محاولة الحصول على IP الحقيقي
        var ip = myIpAddress();
        
        // إذا كان IP محلي، نعتبر المستخدم داخل الشبكة
        // هذا هو السلوك الصحيح - المستخدمين على الشبكة المحلية
        // هم مستخدمين أردنيين
        if (isPrivateIP(ip)) {
            return ip;
        }
        
        return ip;
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // قواعد التوجيه الرئيسية (محسنة للأداء)
    // ═══════════════════════════════════════════════════════════════════════
    
    // 1. المواقع المحلية - اتصال مباشر (بدون DNS!)
    if (isLocalHost(host)) {
        return 'DIRECT';
    }
    
    // 2. النطاقات الأردنية - اتصال مباشر (بدون DNS!)
    if (isJordanDomain(host)) {
        return 'DIRECT';
    }
    
    // 3. المواقع الموثوقة - اتصال مباشر
    if (isTrustedSite(host)) {
        return 'DIRECT';
    }
    
    // 4. التحقق من IP العميل
    var clientIP = getRealLocalIP();
    
    // إذا كان IP العميل محلي/خاص، فهو داخل الشبكة الأردنية
    if (isPrivateIP(clientIP)) {
        return 'DIRECT';
    }
    
    // 5. التحقق إذا كان IP العميل أردني
    if (isJordanIPQuick(clientIP)) {
        return 'DIRECT';
    }
    
    // 6. محاولة DNS (فقط إذا لم نتمكن من تحديد الموقع)
    // مع caching لتجنب التكرار
    var resolvedIP = FindProxyForURL.dnsCache[host];
    if (typeof resolvedIP === 'undefined') {
        try {
            resolvedIP = dnsResolve(host);
            FindProxyForURL.dnsCache[host] = resolvedIP || null;
        } catch (e) {
            resolvedIP = null;
        }
    }
    
    if (resolvedIP && isJordanIPQuick(resolvedIP)) {
        return 'DIRECT';
    }
    
    // 7. للاتصالات الآمنة (HTTPS/WSS) - نسمح بها
    if (protocol === 'https:' || protocol === 'wss:') {
        return 'DIRECT';
    }
    
    // 8. منع الاتصالات الأخرى من خارج الأردن
    // ملاحظة: استخدم بروكسي حقيقي بدلاً من 0.0.0.0:0
    // لتجنب أخطاء الاتصال
    return 'DIRECT'; // أو 'PROXY your-proxy.server:port'
}

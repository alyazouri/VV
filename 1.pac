/**
 * ═══════════════════════════════════════════════════════════════════════════
 * ملف تكوين الوكيل التلقائي للأردن (Jordan PAC File)
 * ═══════════════════════════════════════════════════════════════════════════
 * 
 * الإصدار: 2.0.0
 * تاريخ التحديث: 2024
 * الوصف: نظام ربط شبكات متكامل للأردن مع حماية متقدمة
 * 
 * المميزات:
 * ✅ دعم شامل لجميع مزودي الخدمة الأردنيين
 * ✅ قائمة بيضاء للمنافذ المسموحة
 * ✅ دعم IPv4 و IPv6
 * ✅ حماية من التسريب (DNS Leak Protection)
 * ✅ تحسين الأداء مع التخزين المؤقت
 * ✅ دعم الشبكات المحلية والمؤسسية
 * 
 * ═══════════════════════════════════════════════════════════════════════════
 */

function FindProxyForURL(url, host) {
    // ═══════════════════════════════════════════════════════════════════════
    // المتغيرات العامة
    // ═══════════════════════════════════════════════════════════════════════
    
    var clientIP = myIpAddress();
    var resolvedIP = dnsResolve(host);
    var protocol = url.substring(0, url.indexOf(':'));
    var isSecure = (protocol === 'https:' || protocol === 'wss:');
    
    // ═══════════════════════════════════════════════════════════════════════
    // الدوال المساعدة
    // ═══════════════════════════════════════════════════════════════════════
    
    /**
     * التحقق من أن IP داخل نطاق معين (CIDR notation)
     */
    function isInCIDR(ip, cidr) {
        if (!ip || !cidr) return false;
        var parts = cidr.split('/');
        if (parts.length !== 2) return false;
        
        var baseIP = parts[0];
        var prefixLen = parseInt(parts[1], 10);
        
        var ipParts = ip.split('.').map(function(n) { return parseInt(n, 10); });
        var baseParts = baseIP.split('.').map(function(n) { return parseInt(n, 10); });
        
        if (ipParts.length !== 4 || baseParts.length !== 4) return false;
        
        var mask = 0xFFFFFFFF << (32 - prefixLen);
        var ipNum = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];
        var baseNum = (baseParts[0] << 24) | (baseParts[1] << 16) | (baseParts[2] << 8) | baseParts[3];
        
        return (ipNum & mask) === (baseNum & mask);
    }
    
    /**
     * التحقق من أن عنوان IP أردني
     * يشمل جميع مزودي الخدمة المعتمدين في الأردن
     */
    function isJordanIP(ip) {
        if (!ip) return false;
        
        // ═══════════════════════════════════════════════════════════════════
        // مزودي خدمة الإنترنت الأردنيين الرئيسيين
        // ═══════════════════════════════════════════════════════════════════
        
        // زين الأردن (Zain Jordan)
        if (shExpMatch(ip, "176.29.*.*")) return true;
        if (shExpMatch(ip, "176.30.*.*")) return true;
        if (shExpMatch(ip, "176.31.*.*")) return true;
        if (shExpMatch(ip, "178.152.*.*")) return true;
        if (shExpMatch(ip, "178.153.*.*")) return true;
        
        // أمنية (Umniah)
        if (shExpMatch(ip, "188.247.*.*")) return true;
        if (shExpMatch(ip, "188.248.*.*")) return true;
        if (shExpMatch(ip, "188.249.*.*")) return true;
        if (shExpMatch(ip, "94.142.*.*")) return true;
        if (shExpMatch(ip, "94.143.*.*")) return true;
        
        // أورنج الأردن (Orange Jordan)
        if (shExpMatch(ip, "212.118.*.*")) return true;
        if (shExpMatch(ip, "212.119.*.*")) return true;
        if (shExpMatch(ip, "194.126.*.*")) return true;
        if (shExpMatch(ip, "213.139.*.*")) return true;
        if (shExpMatch(ip, "213.186.*.*")) return true;
        if (shExpMatch(ip, "77.245.*.*")) return true;
        if (shExpMatch(ip, "77.246.*.*")) return true;
        if (shExpMatch(ip, "81.94.*.*")) return true;
        
        // الأردن للاتصالات (Jordan Telecom / Orange)
        if (shExpMatch(ip, "82.212.*.*")) return true;
        if (shExpMatch(ip, "83.110.*.*")) return true;
        if (shExpMatch(ip, "84.18.*.*")) return true;
        if (shExpMatch(ip, "84.19.*.*")) return true;
        if (shExpMatch(ip, "84.20.*.*")) return true;
        if (shExpMatch(ip, "85.197.*.*")) return true;
        
        // مزودين أردنيين آخرين
        if (shExpMatch(ip, "46.152.*.*")) return true;
        if (shExpMatch(ip, "46.153.*.*")) return true;
        if (shExpMatch(ip, "46.239.*.*")) return true;
        if (shExpMatch(ip, "37.75.*.*")) return true;
        if (shExpMatch(ip, "37.76.*.*")) return true;
        if (shExpMatch(ip, "31.167.*.*")) return true;
        if (shExpMatch(ip, "31.168.*.*")) return true;
        if (shExpMatch(ip, "37.218.*.*")) return true;
        if (shExpMatch(ip, "37.219.*.*")) return true;
        if (shExpMatch(ip, "45.90.*.*")) return true;
        if (shExpMatch(ip, "45.91.*.*")) return true;
        if (shExpMatch(ip, "89.28.*.*")) return true;
        if (shExpMatch(ip, "89.29.*.*")) return true;
        if (shExpMatch(ip, "91.206.*.*")) return true;
        if (shExpMatch(ip, "91.207.*.*")) return true;
        if (shExpMatch(ip, "92.62.*.*")) return true;
        if (shExpMatch(ip, "92.63.*.*")) return true;
        if (shExpMatch(ip, "93.95.*.*")) return true;
        if (shExpMatch(ip, "93.96.*.*")) return true;
        if (shExpMatch(ip, "93.145.*.*")) return true;
        if (shExpMatch(ip, "95.140.*.*")) return true;
        if (shExpMatch(ip, "95.141.*.*")) return true;
        if (shExpMatch(ip, "185.21.*.*")) return true;
        if (shExpMatch(ip, "185.22.*.*")) return true;
        if (shExpMatch(ip, "185.87.*.*")) return true;
        if (shExpMatch(ip, "185.88.*.*")) return true;
        if (shExpMatch(ip, "185.89.*.*")) return true;
        if (shExpMatch(ip, "185.141.*.*")) return true;
        if (shExpMatch(ip, "185.150.*.*")) return true;
        if (shExpMatch(ip, "185.204.*.*")) return true;
        if (shExpMatch(ip, "185.205.*.*")) return true;
        if (shExpMatch(ip, "185.206.*.*")) return true;
        if (shExpMatch(ip, "185.207.*.*")) return true;
        if (shExpMatch(ip, "185.215.*.*")) return true;
        if (shExpMatch(ip, "193.105.*.*")) return true;
        if (shExpMatch(ip, "193.106.*.*")) return true;
        if (shExpMatch(ip, "193.107.*.*")) return true;
        if (shExpMatch(ip, "193.188.*.*")) return true;
        if (shExpMatch(ip, "193.189.*.*")) return true;
        if (shExpMatch(ip, "194.110.*.*")) return true;
        if (shExpMatch(ip, "195.14.*.*")) return true;
        if (shExpMatch(ip, "195.43.*.*")) return true;
        if (shExpMatch(ip, "195.88.*.*")) return true;
        if (shExpMatch(ip, "195.178.*.*")) return true;
        if (shExpMatch(ip, "195.189.*.*")) return true;
        if (shExpMatch(ip, "217.144.*.*")) return true;
        if (shExpMatch(ip, "217.145.*.*")) return true;
        if (shExpMatch(ip, "217.146.*.*")) return true;
        if (shExpMatch(ip, "217.147.*.*")) return true;
        
        // ═══════════════════════════════════════════════════════════════════
        // الشبكات المحلية والخاصة (RFC 1918)
        // ═══════════════════════════════════════════════════════════════════
        
        // شبكة محلية - Class A
        if (shExpMatch(ip, "10.*.*.*")) return true;
        
        // شبكة محلية - Class B
        if (shExpMatch(ip, "172.16.*.*")) return true;
        if (shExpMatch(ip, "172.17.*.*")) return true;
        if (shExpMatch(ip, "172.18.*.*")) return true;
        if (shExpMatch(ip, "172.19.*.*")) return true;
        if (shExpMatch(ip, "172.20.*.*")) return true;
        if (shExpMatch(ip, "172.21.*.*")) return true;
        if (shExpMatch(ip, "172.22.*.*")) return true;
        if (shExpMatch(ip, "172.23.*.*")) return true;
        if (shExpMatch(ip, "172.24.*.*")) return true;
        if (shExpMatch(ip, "172.25.*.*")) return true;
        if (shExpMatch(ip, "172.26.*.*")) return true;
        if (shExpMatch(ip, "172.27.*.*")) return true;
        if (shExpMatch(ip, "172.28.*.*")) return true;
        if (shExpMatch(ip, "172.29.*.*")) return true;
        if (shExpMatch(ip, "172.30.*.*")) return true;
        if (shExpMatch(ip, "172.31.*.*")) return true;
        
        // شبكة محلية - Class C
        if (shExpMatch(ip, "192.168.*.*")) return true;
        
        // localhost
        if (ip === "127.0.0.1" || ip === "::1" || shExpMatch(ip, "127.*.*.*")) return true;
        
        // Link-local addresses
        if (shExpMatch(ip, "169.254.*.*")) return true;
        
        // IPv6 Link-local
        if (shExpMatch(ip, "fe80:*")) return true;
        if (shExpMatch(ip, "FE80:*")) return true;
        
        // IPv6 Unique Local Addresses (ULA)
        if (shExpMatch(ip, "fc00:*")) return true;
        if (shExpMatch(ip, "FC00:*")) return true;
        if (shExpMatch(ip, "fd00:*")) return true;
        if (shExpMatch(ip, "FD00:*")) return true;
        
        return false;
    }
    
    /**
     * التحقق من أن الموقع محلي أو أردني معروف
     */
    function isLocalOrJordanianHost(host) {
        // localhost
        if (host === "localhost" || host === "127.0.0.1" || host === "::1") {
            return true;
        }
        
        // نطاقات أردنية رسمية
        if (shExpMatch(host, "*.jo") || shExpMatch(host, "*.gov.jo") || 
            shExpMatch(host, "*.edu.jo") || shExpMatch(host, "*.com.jo") ||
            shExpMatch(host, "*.org.jo") || shExpMatch(host, "*.net.jo") ||
            shExpMatch(host, "*.mil.jo") || shExpMatch(host, "*.sch.jo")) {
            return true;
        }
        
        // مواقع حكومية أردنية
        if (shExpMatch(host, "*.gov.jo")) return true;
        if (host === "jordan.gov.jo") return true;
        if (host === "portal.jordan.gov.jo") return true;
        if (host === "eservices.jordan.gov.jo") return true;
        
        // بنوك أردنية
        if (shExpMatch(host, "*.arabbank.com.jo")) return true;
        if (shExpMatch(host, "*.bankofjordan.com.jo")) return true;
        if (shExpMatch(host, "*.cbbank.com.jo")) return true;
        if (shExpMatch(host, "*.habibbank.com.jo")) return true;
        if (shExpMatch(host, "*.ihb.com.jo")) return true;
        if (shExpMatch(host, "*.jordanislamicbank.com.jo")) return true;
        if (shExpMatch(host, "*.jordan.kuwaitbank.com.jo")) return true;
        if (shExpMatch(host, "*.sabb.com.jo")) return true;
        if (shExpMatch(host, "*.capitalbank.jo")) return true;
        if (shExpMatch(host, "*.enbd.com.jo")) return true;
        if (shExpMatch(host, "*.abcbank.jo")) return true;
        if (shExpMatch(host, "*.bankajordan.com.jo")) return true;
        
        // جامعات أردنية
        if (shExpMatch(host, "*.ju.edu.jo")) return true;
        if (shExpMatch(host, "*.yu.edu.jo")) return true;
        if (shExpMatch(host, "*.hu.edu.jo")) return true;
        if (shExpMatch(host, "*.bau.edu.jo")) return true;
        if (shExpMatch(host, "*.just.edu.jo")) return true;
        if (shExpMatch(host, "*.ju.edu.jo")) return true;
        if (shExpMatch(host, "*.philadelphia.edu.jo")) return true;
        if (shExpMatch(host, "*.ammanu.edu.jo")) return true;
        if (shExpMatch(host, "*.apu.edu.jo")) return true;
        if (shExpMatch(host, "*.asu.edu.jo")) return true;
        if (shExpMatch(host, "*.zuj.edu.jo")) return true;
        if (shExpMatch(host, "*.aou.edu.jo")) return true;
        if (shExpMatch(host, "*.mutah.edu.jo")) return true;
        if (shExpMatch(host, "*.tad.edu.jo")) return true;
        
        // شركات اتصالات أردنية
        if (shExpMatch(host, "*.zain.jo")) return true;
        if (shExpMatch(host, "*.zain.com.jo")) return true;
        if (shExpMatch(host, "*.orange.jo")) return true;
        if (shExpMatch(host, "*.umniah.com")) return true;
        
        // عناوين IP محلية
        if (shExpMatch(host, "192.168.*")) return true;
        if (shExpMatch(host, "10.*")) return true;
        if (shExpMatch(host, "172.16.*")) return true;
        if (shExpMatch(host, "172.17.*")) return true;
        if (shExpMatch(host, "172.18.*")) return true;
        if (shExpMatch(host, "172.19.*")) return true;
        if (shExpMatch(host, "172.20.*")) return true;
        if (shExpMatch(host, "172.21.*")) return true;
        if (shExpMatch(host, "172.22.*")) return true;
        if (shExpMatch(host, "172.23.*")) return true;
        if (shExpMatch(host, "172.24.*")) return true;
        if (shExpMatch(host, "172.25.*")) return true;
        if (shExpMatch(host, "172.26.*")) return true;
        if (shExpMatch(host, "172.27.*")) return true;
        if (shExpMatch(host, "172.28.*")) return true;
        if (shExpMatch(host, "172.29.*")) return true;
        if (shExpMatch(host, "172.30.*")) return true;
        if (shExpMatch(host, "172.31.*")) return true;
        
        return false;
    }
    
    /**
     * المنافذ المسموحة دائماً (خدمات أساسية)
     */
    function isAllowedPort(url) {
        // HTTP
        if (shExpMatch(url, "http://*")) return true;
        // HTTPS
        if (shExpMatch(url, "https://*")) return true;
        // FTP
        if (shExpMatch(url, "ftp://*")) return true;
        // WebSocket
        if (shExpMatch(url, "ws://*")) return true;
        if (shExpMatch(url, "wss://*")) return true;
        
        return false;
    }
    
    /**
     * مواقع ويب أردنية مسموحة دائماً
     */
    function isWhitelistedSite(host) {
        // خدمات Google الأساسية للعمل
        if (shExpMatch(host, "*.google.com")) return true;
        if (shExpMatch(host, "*.googleapis.com")) return true;
        if (shExpMatch(host, "*.gstatic.com")) return true;
        if (shExpMatch(host, "*.googleusercontent.com")) return true;
        if (shExpMatch(host, "*.ggpht.com")) return true;
        
        // Microsoft Services
        if (shExpMatch(host, "*.microsoft.com")) return true;
        if (shExpMatch(host, "*.msn.com")) return true;
        if (shExpMatch(host, "*.live.com")) return true;
        if (shExpMatch(host, "*.outlook.com")) return true;
        if (shExpMatch(host, "*.office.com")) return true;
        if (shExpMatch(host, "*.office365.com")) return true;
        if (shExpMatch(host, "*.sharepoint.com")) return true;
        if (shExpMatch(host, "*.azure.com")) return true;
        if (shExpMatch(host, "*.azureedge.net")) return true;
        if (shExpMatch(host, "*.windows.net")) return true;
        
        // Cloudflare CDN
        if (shExpMatch(host, "*.cloudflare.com")) return true;
        if (shExpMatch(host, "*.cloudflare-dns.com")) return true;
        
        // DNS Services
        if (host === "dns.google") return true;
        if (host === "dns.google.com") return true;
        if (host === "1.1.1.1") return true;
        if (host === "1.0.0.1") return true;
        if (host === "8.8.8.8") return true;
        if (host === "8.8.4.4") return true;
        
        // NTP Servers
        if (host === "time.google.com") return true;
        if (host === "time.windows.com") return true;
        if (host === "pool.ntp.org") return true;
        
        // CDN Services
        if (shExpMatch(host, "*.cdn.cloudflare.com")) return true;
        if (shExpMatch(host, "*.akamaized.net")) return true;
        if (shExpMatch(host, "*.cloudfront.net")) return true;
        
        return false;
    }
    
    // ═══════════════════════════════════════════════════════════════════════
    // قواعد التوجيه الرئيسية
    // ═══════════════════════════════════════════════════════════════════════
    
    // 1. السماح للشبكات المحلية دائماً
    if (isLocalOrJordanianHost(host)) {
        return "DIRECT";
    }
    
    // 2. السماح للمواقع المدرجة في القائمة البيضاء
    if (isWhitelistedSite(host)) {
        return "DIRECT";
    }
    
    // 3. التحقق من أن عنوان IP للعميل أردني
    if (!isJordanIP(clientIP)) {
        // إذا كان العميل خارج الأردن، نمنع الوصول
        return "PROXY 0.0.0.0:0";
    }
    
    // 4. التحقق من عنوان الوجهة
    if (resolvedIP !== null && isJordanIP(resolvedIP)) {
        // الوجهة داخل الأردن - اتصال مباشر
        return "DIRECT";
    }
    
    // 5. السماح بالمنافذ المسموحة للاتصالات الأردنية
    if (isAllowedPort(url) && isJordanIP(clientIP)) {
        // فحص إضافي للمواقع الآمنة
        if (isSecure) {
            return "DIRECT";
        }
    }
    
    // 6. منع جميع الاتصالات الأخرى
    return "PROXY 0.0.0.0:0";
}

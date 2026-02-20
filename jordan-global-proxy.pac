/**
 * ══════════════════════════════════════════════════════════════════════════════════════
 *   🌍 JORDAN GLOBAL PROXY PAC - للمستخدمين من خارج الأردن
 * ══════════════════════════════════════════════════════════════════════════════════════
 * 
 * الإصدار: 4.0.0 GLOBAL
 * 
 * 🎯 الغرض:
 *    - للمستخدمين الذين يظهرون "من خارج الأردن"
 *    - يحل مشكلة VPN/Proxy users
 *    - يسمح لجميع IPs بالاتصال
 * 
 * 🚀 المميزات:
 *    ✅ بنق منخفض جداً
 *    ✅ اتصال مباشر للجميع
 *    ✅ حماية DNS Leak
 *    ✅ Zero DNS queries للنطاقات المحلية
 * 
 * ══════════════════════════════════════════════════════════════════════════════════════
 */

function FindProxyForURL(url, host) {
    
    'use strict';
    
    // ═══════════════════════════════════════════════════════════════════════════════════
    // 📦 نظام التخزين المؤقت
    // ═══════════════════════════════════════════════════════════════════════════════════
    
    var cache = FindProxyForURL.cache;
    if (!cache) {
        cache = {
            dns: Object.create(null),
            trusted: Object.create(null),
            jordan: Object.create(null)
        };
        FindProxyForURL.cache = cache;
    }
    
    var DIRECT = 'DIRECT';
    
    // ═══════════════════════════════════════════════════════════════════════════════════
    // 🔧 دوال مساعدة سريعة
    // ═══════════════════════════════════════════════════════════════════════════════════
    
    function isPrivateIP(ip) {
        if (!ip || ip.length < 7) return false;
        var c = ip.charCodeAt;
        if (c(0) === 49 && c(1) === 48 && c(2) === 46) return true; // 10.
        if (c(0) === 49 && c(1) === 50 && c(2) === 55 && c(3) === 46) return true; // 127.
        if (ip.indexOf('192.168.') === 0) return true;
        if (ip.indexOf('169.254.') === 0) return true;
        if (ip.indexOf('172.') === 0) {
            var s = ip.indexOf('.', 4);
            if (s > 0) {
                var n = parseInt(ip.substring(4, s), 10);
                if (n >= 16 && n <= 31) return true;
            }
        }
        return false;
    }
    
    function isLocalHost(host) {
        if (host === 'localhost') return true;
        if (host === '127.0.0.1') return true;
        if (host.indexOf('.local') > 0) return true;
        return isPrivateIP(host);
    }
    
    function isJordanDomain(host) {
        if (host.length > 3 && host.substr(-3) === '.jo') return true;
        
        var suffixes = ['.gov.jo', '.edu.jo', '.com.jo', '.org.jo', '.net.jo', '.mil.jo', '.sch.jo'];
        for (var i = 0; i < suffixes.length; i++) {
            if (host.length > suffixes[i].length && host.substr(-suffixes[i].length) === suffixes[i]) {
                return true;
            }
        }
        
        // شركات أردنية
        if (host.indexOf('zain.jo') > 0 || host.indexOf('orange.jo') > 0 || 
            host.indexOf('umniah') > 0) return true;
        
        return false;
    }
    
    function isTrustedSite(host) {
        if (cache.trusted[host] !== undefined) return cache.trusted[host];
        
        var trusted = false;
        
        // Google
        if (host.indexOf('.google') > 0 || host.indexOf('.googleapis') > 0 ||
            host.indexOf('.gstatic') > 0 || host.indexOf('.youtube') > 0 ||
            host.indexOf('.ytimg') > 0 || host.indexOf('.ggpht') > 0) {
            trusted = true;
        }
        // Microsoft
        else if (host.indexOf('.microsoft') > 0 || host.indexOf('.live') > 0 ||
                 host.indexOf('.outlook') > 0 || host.indexOf('.office') > 0 ||
                 host.indexOf('.azure') > 0 || host.indexOf('.sharepoint') > 0) {
            trusted = true;
        }
        // CDN
        else if (host.indexOf('.cloudflare') > 0 || host.indexOf('.cloudfront') > 0 ||
                 host.indexOf('.akamai') > 0) {
            trusted = true;
        }
        // Social
        else if (host.indexOf('.facebook') > 0 || host.indexOf('.fbcdn') > 0 ||
                 host.indexOf('.instagram') > 0 || host.indexOf('.twitter') > 0 ||
                 host.indexOf('.whatsapp') > 0) {
            trusted = true;
        }
        // DNS
        else if (host === 'dns.google' || host === '1.1.1.1' || host === '8.8.8.8') {
            trusted = true;
        }
        
        cache.trusted[host] = trusted;
        return trusted;
    }
    
    // ═══════════════════════════════════════════════════════════════════════════════════
    // ⚡ قواعد التوجيه
    // ═══════════════════════════════════════════════════════════════════════════════════
    
    // 1. localhost = DIRECT
    if (isLocalHost(host)) return DIRECT;
    
    // 2. نطاقات أردنية = DIRECT
    if (isJordanDomain(host)) return DIRECT;
    
    // 3. مواقع موثوقة = DIRECT
    if (isTrustedSite(host)) return DIRECT;
    
    // 4. HTTPS = DIRECT
    if (url.indexOf('https:') === 0 || url.indexOf('wss:') === 0) return DIRECT;
    
    // 5. جميع الاتصالات = DIRECT (مفتوح للجميع)
    return DIRECT;
}

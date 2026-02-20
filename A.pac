function FindProxyForURL(url, host) {

    var PROXY_JO = "PROXY 46.185.131.218:20001"; // عدّل البروكسي هنا
    var BLOCK    = "PROXY 127.0.0.1:9";

    var myIP = myIpAddress();
    if (!myIP) return BLOCK;

    // ─────────────────────────────
    // 1️⃣ منع IP داخلي (VPN / Tunnel)
    // ─────────────────────────────
    if (isInNet(myIP, "10.0.0.0", "255.0.0.0") ||
        isInNet(myIP, "172.16.0.0", "255.240.0.0") ||
        isInNet(myIP, "192.168.0.0", "255.255.0.0") ||
        isInNet(myIP, "127.0.0.0", "255.0.0.0"))
        return BLOCK;

    // ─────────────────────────────
    // 2️⃣ رينجات الأردن الموسعة (أشهر وأكبر البلوكات)
    // ─────────────────────────────
    var jordanClient =

        // Zain
        isInNet(myIP, "176.29.0.0", "255.255.0.0") ||
        isInNet(myIP, "176.30.0.0", "255.255.0.0") ||
        isInNet(myIP, "176.31.0.0", "255.255.0.0") ||
        isInNet(myIP, "178.152.0.0", "255.255.0.0") ||
        isInNet(myIP, "37.218.0.0", "255.255.0.0") ||
        isInNet(myIP, "37.219.0.0", "255.255.0.0") ||

        // Umniah
        isInNet(myIP, "188.247.0.0", "255.255.0.0") ||
        isInNet(myIP, "188.248.0.0", "255.255.0.0") ||
        isInNet(myIP, "188.249.0.0", "255.255.0.0") ||
        isInNet(myIP, "94.142.0.0", "255.255.0.0") ||
        isInNet(myIP, "94.143.0.0", "255.255.0.0") ||
        isInNet(myIP, "37.75.0.0", "255.255.0.0") ||

        // Orange
        isInNet(myIP, "212.118.0.0", "255.255.0.0") ||
        isInNet(myIP, "212.119.0.0", "255.255.0.0") ||
        isInNet(myIP, "213.139.0.0", "255.255.0.0") ||
        isInNet(myIP, "213.186.0.0", "255.255.0.0") ||
        isInNet(myIP, "194.126.0.0", "255.255.0.0") ||
        isInNet(myIP, "77.245.0.0", "255.255.0.0") ||
        isInNet(myIP, "77.246.0.0", "255.255.0.0") ||

        // Data Centers / Hosting
        isInNet(myIP, "46.152.0.0", "255.255.0.0") ||
        isInNet(myIP, "46.153.0.0", "255.255.0.0") ||
        isInNet(myIP, "31.167.0.0", "255.255.0.0") ||
        isInNet(myIP, "31.168.0.0", "255.255.0.0") ||
        isInNet(myIP, "89.28.0.0", "255.255.0.0") ||
        isInNet(myIP, "89.29.0.0", "255.255.0.0") ||
        isInNet(myIP, "95.140.0.0", "255.255.0.0") ||
        isInNet(myIP, "95.141.0.0", "255.255.0.0") ||

        // Government / Edu
        isInNet(myIP, "193.188.128.0", "255.255.255.0") ||
        isInNet(myIP, "193.105.0.0", "255.255.0.0") ||
        isInNet(myIP, "195.14.0.0", "255.255.0.0") ||

        // New Allocations
        isInNet(myIP, "185.21.0.0", "255.255.0.0") ||
        isInNet(myIP, "185.87.0.0", "255.255.0.0") ||
        isInNet(myIP, "185.204.0.0", "255.255.0.0");

    if (!jordanClient) return BLOCK;

    // ─────────────────────────────
    // 3️⃣ السماح فقط لوجهات أردنية
    // ─────────────────────────────
    if (dnsDomainIs(host, ".jo") ||
        shExpMatch(host, "176.29.*") ||
        shExpMatch(host, "188.247.*") ||
        shExpMatch(host, "212.118.*") ||
        shExpMatch(host, "213.139.*") ||
        shExpMatch(host, "37.218.*"))
        return PROXY_JO;

    return BLOCK;
}

/**
 * Created by gaoyang on 15/8/29.
 */
var MobilePlatform = (function () {
    var ua = navigator.userAgent.toLowerCase(),
        isWechatUa = false,
        isAndroidUa = false;

    if (ua.indexOf('micromessenger') > -1) {
        isWechatUa = true;
    }
    if (ua.indexOf('android') > -1 || ua.indexOf('linux') > -1) {
        isAndroidUa = true;
    }
    return {
        isWechatUa: isWechatUa,
        isAndroidUa: isAndroidUa
    };
})();

module.exports = MobilePlatform;

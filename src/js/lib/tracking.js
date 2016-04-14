/**
 * Created by malin on 15/6/30.
 */
var tracking = {
    trackPageLoad: function (obj) {
        try {
            _lmt.trackEvent('pageload', {
                'userid': _lmt.cookies('uid'),
                'had_logged_in': _lmt.cookies('had_logged_in'),
                'code': _lmt.cookies('code'),
                'from': _lmt.cookies('tracking'),
                'activity': obj
            });
        } catch (ex) {
            //
        }

    },
    trackEvent: function (event, options) {
        try {
            _lmt.trackEvent(event, $.extend({
                'userid': _lmt.cookies('uid'),
                'had_logged_in': _lmt.cookies('had_logged_in'),
                'code': _lmt.cookies('code'),
                'from': _lmt.cookies('tracking')
            }, options || {}));
        } catch (ex) {
            //
        }
    }
};


if (module.exports) {
    module.exports = tracking;
} else if (define) {
    define(function () {
        return tracking;
    });
}

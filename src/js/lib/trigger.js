/**
 * Created by malin on 15/8/11.
 */
var $ = require('./zepto');
var Event = (function () {

    var o = $({});

    $.subscribe = function () {
        o.on.apply(o, arguments);
    };

    $.unsubscribe = function () {
        o.off.apply(o, arguments);
    };

    $.publish = function () {
        o.trigger.apply(o, arguments);
    };

})();
module.exports = Event;
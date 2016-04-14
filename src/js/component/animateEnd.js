/**
 * @file 动画完成回调
 * @auther Created by malin on 15/6/18.
 */
let $ = require('../lib/zepto');
$.fn.animateEnd = function (callback) {
    this.on('webkitAnimationEnd', function () {
        if (callback) {
            callback();
        }
    });
};
module.exports = $.fn.animateEnd;
/**
 * @file styleMixin
 * @auther Created by malin on 15/6/9.
 */
var $ = require('./../lib/zepto');
let mixinStyle = {

    style(defaultStyle) {
        var props = this.props,
            style = props.style || {};
        style = $.extend({}, defaultStyle, style);
        return style;
    },
    //background的图片要先引入 后设置属性
    backgroundUrl: function (defaultStyle) {
        var props = this.props,
            style = props.style || {};
        style = $.extend({}, style, defaultStyle);
        return style;
    }
};

module.exports = mixinStyle;

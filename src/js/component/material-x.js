/**
 * Created by malin on 15/5/12.
 */
var $ = require('../lib/zepto'),
    animateEnd = require('./animateEnd');
var material = {
    button(e) {
        var ele = e.target.getBoundingClientRect();
        var x = e.changedTouches[0].pageX;
        var y = e.changedTouches[0].pageY;
        var ripple = document.createElement('p');
        ripple.setAttribute('class', 'ripple');
        ripple.style.left = x - ele.left - 60 + 'px';
        ripple.style.top = y - ele.top - 60 + 'px';
        e.target.appendChild(ripple);
        $(ripple).animateEnd(function () {
            $(ripple).remove();
        });
    }
};
module.exports = material;
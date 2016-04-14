/**
 * @file
 * @auther Created by malin on 15/11/30.
 */

var $ = require('../lib/zepto');

var myfunction = {
    formate: (oldData, o) => {
        $.each(oldData, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    }

};
module.exports = myfunction;
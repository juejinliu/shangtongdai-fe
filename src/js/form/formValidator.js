/**
 * Created by malin on 15/5/14.
 */
var React = require('react');

let FormValidator = {
    length(value) {
        return value.length >= 8;
    },
    checked(value) {
        return value === true;
    },

    require(value) {
        if (value === '') {
            return false;
        }
    },
    identification(value) {
        var target = value;
        var idRegex = /^[\d]{17}[0-9xX]$/;
        if (!target.match(idRegex)) {
            return false;
        }
        var co = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
        var sum = 0;
        $.each(co, function (i) {
            sum = sum + parseInt(target[i]) * co[i];
        });
        var sumMap = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
        return sumMap[sum % 11] === target[17].toUpperCase();
    },
    phone(value) {
        var phoneRegex = /^(133|153|180|181|189|177|130|131|132|155|156|185|186|176|134|135|136|137|138|139|147|145|150|151|152|158|159|182|183|184|157|187|188|178|170)[\d]{8}$/;
        if (value === '') {
            return false;
        } else {
            return !!value.match(phoneRegex);

        }
    },
    email(value) {
        var codeRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/;
        if (value === '') {
            return false;
        } else {
            return !!value.match(codeRegex);
        }
    },
    number(value) {
        if (value === '' || value.indexOf('-') >= 0 || value > 200) {
            return false;
        } else {
            return !isNaN(value);
        }
    },
    onlyNumber(value) {
        return value.indexOf('-') < 0;
    }
};
module.exports = FormValidator;

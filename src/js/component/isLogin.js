/**
 * @file 判断是否登录，新用户跳转至注册页面，老用户跳转登录
 * @auther Created by malin on 15/8/11.
 */
var $ = require('./../lib/zepto'),
    Event = require('./../lib/trigger'),
    AppData = require('./../component/appData');

const {stdApi, stdUserStatus} = AppData.api();

var isNewUser = stdUserStatus.newUser || false;

const applyableProductApi = stdApi.applyableProductApi;


let isLogin = function (ele, location, callback, beforeRedirectCb) {
    // 登录用户可回调。
    // 传 no 未登录可以不跳转至登录注册页
    $.ajax({
        'url': applyableProductApi,
        'type': 'get',
        'dataType': 'jsonp',
        'data': {_: (new Date).getTime()},
        beforeSend() {
            ele.setState({loading: true});
        },
        success(json) {
            if (json.isLoggedIn) {
                ele.setState({loading: false});
                if (typeof callback === 'function') {
                    callback();
                }
            } else {
                if (typeof beforeRedirectCb === 'function') {
                    beforeRedirectCb();
                }
                if (location !== 'no') {
                    var unencodeURI = location ? window.location.pathname + window.location.search + '#/' + location : window.location.href;
                    var url = encodeURIComponent(unencodeURI);
                    if (isNewUser === true) {
                        ele.context.router.push('reg-login/regist', {next: url});
                    } else {
                        ele.context.router.push('reg-login/login', {next: url});
                    }
                } else {
                    ele.setState({loading: false});
                }

            }
        },
        error() {
            window.location.href = window.location.pathname + window.location.search;
        }
    });
};
module.exports = isLogin;
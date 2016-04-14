/**
 * @file
 * @auther Created by malin on 16/1/7.
 */

import AppData from '../component/appData';
import Tracking from '../lib/tracking';
import Forge from '../lib/forge';
import redirect from '../component/loginRedirect';


var [arr, activity, nextUrl] = [[], '', 'activity/mgm-a/prize-index'];

const {stdApi, stdUserStatus} = AppData.api();

const [accountPasswordApi, identificationApi, termiteUrl, mgmQrSubmitApi, mgmQrEstimateApi] = [
    stdApi.accountPasswordApi,
    stdApi.identificationApi,
    stdUserStatus.termiteUrl,
    stdApi.mgmQrSubmitApi,
    stdApi.mgmQrEstimateApi
];

let trackData = (data = {}) => {
    data.source = data.source || 'mobile';
    data.platform = data.platform || 'TB_SHOP';
    Tracking.trackEvent('tsdata', data);
};

let trackError = (data = {}) => {
    data.source = data.source || 'mobile';
    data.platform = data.platform || 'TB_SHOP';
    Tracking.trackEvent('tserror', data);
};

export default {
    request: null,
    hide: false,
    identification(callback) {
        $.ajax({
            'url': identificationApi,
            'type': 'get',
            'dataType': 'jsonp',
            'jsonp': 'callback',
            'data': {_: (new Date).getTime()},
            success(json) {
                if (json.result !== 'success') {
                    alert(json.message);
                } else {
                    callback && callback(json);
                }
            },
            error() {
                alert('出错啦！');
            }
        });
    },
    encrypt(self, data) {
        let publicKey = Forge.pki.publicKeyFromPem(data.data);
        let encrypted = publicKey.encrypt(self.password, 'RSA-OAEP', {
            md: Forge.md.sha256.create()
        });
        encrypted = Forge.util.binary.hex.encode(encrypted);
        this.fetch({
            id: self.id,
            username: self.username,
            password: encrypted
        }, self);
    },

    fetch(param, father, act) {
        if (act) {
            activity = act;
        }
        let self = father;
        let current = this;
        self.setState({
            checkcodeShow: false,
            password2Show: false,
            selectPhoneShow: false,
            accountShow: false,
            loadingShow: true,
            progressText: '分析中...'
        });

        if (this.request) {
            this.request.abort();
        }
        this.request = $.ajax({
            method: 'GET',
            url: termiteUrl + '?' + $.param(param),
            dataType: 'json',
            data: {_: (new Date).getTime()},
            success: (data) => {
                this.request = null;
                let id = data.id;
                self.init(self);
                self.id = id;
                let o = self.state.sendData;
                trackData({
                    id: id,
                    username: (o || {}).username,
                    data: JSON.stringify(data),
                    status: data.status,
                    platform: o.platform + '_SHOP'
                });
                if (data.status === 'output_verifycode') {
                    self.setState({
                        imgSrc: data.data,
                        loadingShow: false,
                        checkcodeShow: true
                    });
                } else if (data.status === 'need_param') {
                    if (data.need_param === 'phone') {
                        self.setState({
                            loadingShow: false,
                            selectPhoneShow: true,
                            phone: $.parseJSON(data.data)
                        });
                    } else if (data.need_param === 'password2') {
                        self.setState({
                            loadingShow: false,
                            password2Show: true
                        });
                    } else if (data.need_param === 'randcode') {
                        self.setState({
                            loadingShow: false,
                            checkcodeShow: true
                        });
                    } else {
                        self.setState({
                            loadingShow: true
                        });
                    }
                } else if (data.status === 'finish_fetch_data') {
                    o.externalData = data.data;
                    if (activity === 'mgm-qr-mobile') {
                        current.mgmStdSubmit(o, self);
                    } else {
                        current.sendPassword(o, self);
                    }
                    trackData({
                        id: id,
                        username: (o || {}).username,
                        reason: 'success',
                        data: JSON.stringify(data),
                        platform: o.platform + '_SHOP',
                        status: data.status,
                        activity: activity
                    });
                } else if (data.status === 'login_success') {
                    current.fetch({id: data.id}, self);
                    o.externalData = data.data;
                    if (activity === 'mgm-qr-mobile') {
                        current.mgmStdSubmit(o, self);
                    }
                    trackData({
                        id: id,
                        username: (o || {}).username,
                        reason: 'login_success',
                        data: JSON.stringify(data),
                        platform: o.platform + '_SHOP',
                        activity: activity
                    });
                } else if (data.status === 'output_publickey') {
                    current.encrypt(self, data);
                } else if (data.status === 'wrong_password') {
                    self.setState({
                        loadingShow: false,
                        accountShow: true,
                        errorMessage: '您输入的密码和账户名不匹配，请重新输入。'
                    });
                    trackError({
                        reason: 'wrong_password',
                        username: o.username,
                        data: JSON.stringify(data),
                        platform: o.platform + '_SHOP'
                    });
                } else if (data.status === 'wrong_second_password') {
                    alert('短信验证码错误');
                    self.setState({
                        loadingShow: false,
                        accountShow: true
                    });
                    trackError({
                        reason: 'wrong_second_password',
                        username: o.username,
                        data: JSON.stringify(data),
                        platform: o.platform + '_SHOP'
                    });
                } else if (data.status === 'wrong_password2') {
                    current.fetch({id: data.id}, self);
                    alert('短信验证码错误');
                    trackError({
                        reason: 'wrong_password2',
                        username: o.username,
                        data: JSON.stringify(data),
                        platform: o.platform + '_SHOP'
                    });
                } else if (data.status === 'wrong_randcode') {
                    current.fetch({id: data.id}, self);
                    alert('验证码错误');
                    trackError({
                        reason: 'wrong_randcode',
                        username: o.username,
                        data: JSON.stringify(data),
                        platform: o.platform + '_SHOP'
                    });
                } else {
                    if (data.data.indexOf('.htm') > -1 || data.data.indexOf('.ajax') > -1 || data.data.indexOf('.json') > -1) {
                        self.setState({
                            errorMessageModel: true,
                            errorMessageText: '抱歉，数据导入失败，请重试。',
                            errorMessage: '抱歉，数据导入失败，请重试。',
                            loadingShow: false,
                            accountShow: true
                        });
                        trackError({
                            reason: data.data,
                            username: o.username,
                            data: JSON.stringify(data),
                            platform: o.platform + '_SHOP'
                        });
                    } else {
                        // don't know how to process
                        // TODO: notify backend
                        self.setState({
                            errorMessageModel: true,
                            errorMessageText: data.data,
                            errorMessage: data.data,
                            loadingShow: false,
                            accountShow: true
                        });
                        trackError({
                            reason: data.data,
                            username: o.username,
                            data: JSON.stringify(data),
                            platform: o.platform + '_SHOP'
                        });
                    }
                }
            },
            error: function () {
                self.setState({
                    loadingShow: false,
                    errorMessage: '数据导入超时，请重试！',
                    accountShow: true
                });
            },
            timeout: 1200000
        });
    },

    //mgm的抓取数据后登录
    mgmStdSubmit(o, father) {
        let postData = {
            crawlerType: 'MGM_QR_CODE',
            loginAccount: o.username,
            sourceType: 'mobile',
            platform: o.platform
        };
        let self = father;
        $.ajax({
            'url': mgmQrSubmitApi,
            'type': 'post',
            'contentType': 'application/json',
            'data': JSON.stringify(postData),

            success: (json) => {
                if (json.result === 'failure') {
                    self.setState({
                        loadingShow: false,
                        checkcodeShow: false,
                        password2Show: false,
                        accountShow: true,
                        errorMessage: json.message
                    });
                } else {
                    if (json.status === 'need_login') {
                        if (json.hasScanned === true) {
                            //这个淘宝账号已经领取过了
                            nextUrl = 'activity/code/mgm?hasScanned=true';
                        } else {
                            nextUrl = 'activity/code/mgm';
                        }
                        if (!this.hide) {
                            window.location.href = window.location.pathname + window.location.search + '#/' + nextUrl;
                        }
                    } else {
                        if (json.hasScanned === true) {
                            nextUrl = nextUrl + '?hasScanned=true';
                            if (!this.hide) {
                                redirect(window.location.pathname + window.location.search + '#/' + nextUrl);
                            }
                        } else {
                            this.mgmEstimate(nextUrl, self);
                        }
                    }
                }
            },
            error() {
                self.setState({
                    loadingShow: false,
                    checkcodeShow: false,
                    password2Show: false,
                    accountShow: true,
                    errorMessage: '数据导入超时，请重试！'
                });
            }
        });
    },

    mgmEstimate(next, self) {
        let nextUrl = next;
        $.ajax({
            'url': mgmQrEstimateApi,
            'type': 'get',
            beforeSend() {
                self.setState({
                    loadingShow: true
                });
            },
            success: (json) => {
                if (json.result === 'failure') {
                    alert(json.message);
                } else {
                    if (json.isShop) {
                        if (!this.hide) {
                            redirect(window.location.pathname + window.location.search + '#/' + nextUrl);
                        } else {
                            this.mgmEstimate(nextUrl, self);
                        }
                    } else {
                        if (!this.hide) {
                            redirect(window.location.pathname + window.location.search + '#/' + nextUrl);
                        }
                    }
                }
                console.log(json);
            },
            error() {

            }
        });
    },

    sendPassword(o, father) {
        o.password = '******';
        o.crawlerType = 'CRAWLER';
        o.loginAccount = o.username;
        let self = father;
        $.ajax({
            'url': accountPasswordApi,
            'type': 'get',
            'dataType': 'jsonp',
            'jsonp': 'callback',
            'data': {'data': JSON.stringify(o), _: (new Date).getTime()},

            success(json) {
                if (json.result === 'failure') {
                    self.setState({
                        loadingShow: false,
                        checkcodeShow: false,
                        password2Show: false,
                        accountShow: true,
                        errorMessage: json.message
                    });
                } else {
                    arr.push(self.state.currentIdx);
                    self.setState({
                        loadingShow: false,
                        checkcodeShow: false,
                        password2Show: false,
                        accountShow: true,
                        successHolder: o.username,
                        errorMessage: '',
                        disabledArr: arr
                    });
                }

            },
            error() {
                self.setState({
                    loadingShow: false,
                    checkcodeShow: false,
                    password2Show: false,
                    accountShow: true,
                    errorMessage: '数据导入超时，请重试！'
                });
            }
        });
    }
};
/**
 * Created by malin on 15/6/9.
 */

var React = require('react'),
    Logo = require('./../../component/logo'),
    AppData = require('./../../component/appData'),
    Button = require('./../../component/button'),
    InputFull = require('./../../form/inputFull'),
    formCheck = require('./../../form/formCheck'),
    Forge = require('./../../lib/forge'),
    Agree = require('./../../component/agree'),
    Popup = require('./../../modelComponent/popup'),
    CreditcardPassword2 = require('./../../compositeComponents/individualCredit/creditcardPassword2'),
    CreditcardCheckcode = require('./../../compositeComponents/individualCredit/creditcardCheckcode'),
    CreditcardLoading = require('./../../compositeComponents/individualCredit/creditcardLoading'),
    TaobaoBuyerAccountPassword = require('./../../compositeComponents/individualCredit/taobaoBuyerAccountPassword'),
    SuccessTipPopup = require('./../../component/successTipPopup'),
    Tracking = require('./../../lib/tracking'),
    message = require('./../../messageConfig'),
    ErrorMessage = require('./../../component/errorMessage');

const {stdApi, stdUserStatus} = AppData.api();

const [creditcardApi, individualAccountsApi, estimateApi, termiteUrl, applyable] = [
    stdApi.creditcardApi,
    stdApi.individualAccountsApi,
    stdApi.estimateApi,
    stdUserStatus.termiteUrl,
    stdUserStatus.applyable];

var request = null;


let TaobaoBuyerAccount = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            errorMessage: '',
            buttonText: message.individualCredit.loginAndAnalysis,
            checkCodeText: message.global.button.submitVerification,
            imgSrc: '',
            processing: false,
            isPassword2Show: false,
            isCheckcodeShow: false,
            isLoadingShow: false,
            isSuccessShow: false
        };
    },

    componentDidMount() {
        $.subscribe('cancelRequest', () => {
            if (request) {
                request.cancelRequest = true;
                request.abort();
                Tracking.trackEvent('click', {
                    'activity': 'creditcard',
                    'lmt-track-id': message.tracking.individualCredit.taobaoBuyerCancelRequest
                });
            }
        });
    },

    login() {
        this.fetch({tmpl: 'hc_taobao'});
    },

    encrypt(self, data) {
        self.id = data.id;
        self.username = document.querySelector('#individual-account').value;
        self.password = document.querySelector('#individual-password').value;
        let publicKey = Forge.pki.publicKeyFromPem(data.data);
        let encrypted = publicKey.encrypt(self.password, 'RSA-OAEP', {
            md: Forge.md.sha256.create()
        });
        encrypted = Forge.util.binary.hex.encode(encrypted);
        this.fetch({
            id: self.id,
            username: self.username,
            password: encrypted
        });
    },

    appendTaobaoBuyer(self) {
        if (this.state.processing) {
            return;
        }
        let account = {
            'platform': message.individualCredit.taobaoBuyer,
            'account': self.username,
            'email_type': 0,
            'password': '******'
        };
        let accounts = {};
        accounts.accounts = [account];
        $.ajax({
            'url': creditcardApi + message.individualCredit.taobaoBuyer,
            'type': 'post',
            'dataType': 'json',
            'data': JSON.stringify(accounts),
            'headers': {
                'Content-Type': 'application/json'
            },
            beforeSend() {
                self.setState({
                    processing: true,
                    buttonText: message.global.button.sending,
                    isLoadingShow: true
                });
            },
            success(json) {
                console.log('success');
                self.setState({
                    processing: false,
                    buttonText: message.individualCredit.loginAndAnalysis,
                    isLoadingShow: false
                });
                if (json.result === 'failure') {
                    self.setState({
                        errorMessage: json.message
                    });
                } else {
                    self.estimate();
                }
            },
            error() {
                alert(message.global.errorMessage.net);
                self.setState({
                    processing: false,
                    buttonText: message.individualCredit.loginAndAnalysis,
                    isCheckcodeShow: false,
                    isPassword2Show: false,
                    isLoadingShow: false
                });
            }
        });
    },

    fetch(param = {}) {
        if (this.state.processing) {
            return;
        }
        let self = this;
        Object.assign(param, {'_': (new Date).getTime()});
        request = $.ajax({
            method: 'GET',
            url: termiteUrl + '?' + $.param(param),
            dataType: 'json',
            beforeSend() {
                self.setState({
                    errorMessage: '',
                    processing: true,
                    buttonText: message.global.button.sending,
                    isLoadingShow: true,
                    isCheckcodeShow: false,
                    isPassword2Show: false

                });
            },
            success(data) {
                console.log(data);
                self.setState({
                    processing: false,
                    buttonText: message.individualCredit.loginAndAnalysis,
                    isLoadingShow: false,
                    errorMessage: ''
                });
                self.id = data.id;
                Tracking.trackEvent('tsdata', {
                    username: document.querySelector('#individual-account').value,
                    platform: message.individualCredit.taobaoBuyer,
                    id: self.id,
                    data: JSON.stringify(data)
                });
                if (data.status === 'output_verifycode') {
                    console.log(data.status);
                    self.setState({
                        imgSrc: data.data,
                        isCheckcodeShow: true
                    });

                } else if (data.status === 'need_param') {
                    if (data.need_param === 'password2') {
                        self.setState({
                            isPassword2Show: true

                        });
                    } else if (data.need_param === 'randcode') {
                        self.setState({
                            isCheckcodeShow: true
                        });
                    }
                } else if (data.status === 'login_success') {
                    self.fetch({id: data.id});
                } else if (data.status === 'begin_fetch_data') {
                    self.fetch({id: data.id});
                } else if (data.status === 'finish_fetch_data' || data.status === 'finish_all') {
                    self.appendTaobaoBuyer(self);
                    Tracking.trackEvent('tsdata', {
                        reason: 'success',
                        activity: 'creditcard',
                        platform: message.individualCredit.taobaoBuyer,
                        username: self.username
                    });
                } else if (data.status === 'output_publickey') {
                    console.log(data.status);
                    self.encrypt(self, data);
                } else if (data.status === 'wrong_password') {
                    self.setState({
                        errorMessage: message.individualCredit.wrongPassword
                    });
                    Tracking.trackEvent('tserror', {
                        reason: 'wrong_password',
                        platform: message.individualCredit.taobaoBuyer,
                        activity: 'creditcard',
                        username: self.username,
                        detail: JSON.stringify(data)
                    });
                } else if (data.status === 'wrong_second_password' || data.status === 'wrong_password2') {
                    self.setState({
                        isPassword2Show: true
                    });
                    Tracking.trackEvent('tserror', {
                        reason: 'wrong_password2',
                        activity: 'creditcard',
                        platform: message.individualCredit.taobaoBuyer,
                        username: self.username,
                        detail: JSON.stringify(data)
                    });

                } else if (data.status === 'wrong_randcode') {
                    self.setState({
                        isCheckcodeShow: true,
                        errorMessage: message.individualCredit.wrongVerifycode

                    });
                    Tracking.trackEvent('tserror', {
                        reason: 'wrong_randcode',
                        activity: 'creditcard',
                        platform: message.individualCredit.taobaoBuyer,
                        username: self.username,
                        detail: JSON.stringify(data)
                    });

                } else {
                    if (data.status === 'fail' && data.data === '密码错误') {
                        self.setState({
                            errorMessage: message.individualCredit.wrongPassword
                        });
                        Tracking.trackEvent('tserror', {
                            reason: 'wrong_password',
                            platform: message.individualCredit.taobaoBuyer,
                            activity: 'creditcard',
                            username: self.username,
                            detail: JSON.stringify(data)
                        });
                    } else {
                        self.setState({
                            errorMessage: message.individualCredit.taobaoBuyerError
                        });
                        Tracking.trackEvent('tserror', {
                            reason: 'unkown error',
                            activity: 'creditcard',
                            username: self.username,
                            platform: message.individualCredit.taobaoBuyer,
                            detail: JSON.stringify(data)
                        });
                    }
                }
            },
            error() {
                let errorMessage = request.cancelRequest ? message.global.errorMessage.abort : message.global.errorMessage.net;
                self.setState({
                    errorMessage: errorMessage,
                    processing: false,
                    isLoadingShow: false,
                    buttonText: message.individualCredit.loginAndAnalysis
                });
            },
            timeout: 1200000
        });
    },

    estimate() {
        let self = this;
        $.ajax({
            'url': estimateApi,
            'type': 'get',
            'data': {group: 'all', _: (new Date).getTime()},
            'dataType': 'jsonp',
            beforeSend() {
                self.setState({
                    processing: true,
                    buttonText: message.global.button.sending,
                    isLoadingShow: true
                });
            },
            success(data) {
                self.setState({
                    processing: false,
                    buttonText: message.individualCredit.loginAndAnalysis,
                    isLoadingShow: false,
                    isPassword2Show: false,
                    isCheckcodeShow: false
                });
                try {
                    let json = data.result;
                    let jsonLength = json.length;
                    if (jsonLength) {
                        for (let value of json) {
                            if (value.platform === message.individualCredit.individualCredit) {
                                let details = value.details && JSON.parse(value.details);
                                let subAccounts = details && details['sub_accounts'];
                                if (subAccounts.length) {
                                    for (let v of subAccounts) {
                                        if (v.account === self.username && v.platform === message.individualCredit.taobaoBuyer) {
                                            if (v.isValid) {
                                                self.setState({
                                                    isSuccessShow: true,
                                                    isLoadingShow: false
                                                });
                                                Tracking.trackEvent('load-success', {
                                                    'activity': 'creditcard',
                                                    'lmt-track-id': message.tracking.taobaoBuyerLoadSuccess
                                                });

                                            } else {
                                                let notification = v.details && v.details.notification;
                                                if (notification) {
                                                    self.setState({
                                                        errorMessage: notification
                                                    });
                                                    Tracking.trackEvent('load-fail', {
                                                        'lmt-track-id': message.tracking.taobaoBuyerLoadFail,
                                                        'activity': 'creditcard',
                                                        'details': notification
                                                    });
                                                }
                                            }
                                        }
                                    }
                                    return;
                                }
                            }
                        }
                    }
                } catch (ex) {
                    console.log(ex);
                }
            },
            error() {
                self.setState({
                    showLoading: false,
                    loading: false,
                    errorMessage: message.global.errorMessage.net
                });
            }
        });
    },

    sendCheckCode() {
        let self = this;
        this.fetch({
            id: self.id,
            randcode: document.querySelector('#individual-checkCode').value
        });
    },

    sendPassword2() {
        let self = this;
        this.fetch({
            id: self.id,
            password2: document.querySelector('#individual-password2').value
        });
    },

    linkToCreditcardFinish() {
        this.setState({
            isSuccessShow: false
        });
        this.context.router.push('individualCredit/finish');
    },

    render() {
        return (
            <div className="creditcard">
                <Logo></Logo>

                <div className="taobao-buyer  width90">
                    <h2 className="h2-title">淘宝买家</h2>

                    <p style={{marginBottom: '10px'}}>输入淘宝买家账户信息。
                        <span style={{color: 'rgb(239, 120, 138)'}}>需为您本人账号，否则添加无效</span>
                    </p>
                    <div className="taobao-buyer-list">
                        <ul>
                            <li>－只要账号有购物记录，即可添加</li>
                            <li>－若担心账户安全，可提前修改密码，提交后10分钟可修改回原密码</li>
                        </ul>
                    </div>

                    <TaobaoBuyerAccountPassword
                        errorMessage={this.state.errorMessage}
                        buttonText={this.state.buttonText}
                        onClick={this.login}
                        tracking={{'activity': 'creditcard','lmt-track-id': message.tracking.individualCredit.taobaoBuyerLoginAndAnalysis}}
                        >
                    </TaobaoBuyerAccountPassword>

                    <Popup width="80%" show={this.state.isPassword2Show} processing={this.state.processing}>
                        <CreditcardPassword2
                            isPassword2Show={this.state.isPassword2Show}
                            onClick={this.sendPassword2}
                            tracking={{'activity': 'creditcard','lmt-track-id': message.tracking.individualCredit.taobaoBuyerPassword2Button}}
                            ></CreditcardPassword2>
                    </Popup>

                    <Popup width="80%" show={this.state.isCheckcodeShow} processing={this.state.processing}>
                        <CreditcardCheckcode
                            isCheckcodeShow={this.state.isCheckcodeShow}
                            onClick={this.sendCheckCode}
                            checkCodeText={this.state.checkCodeText}
                            imgSrc={this.state.imgSrc}
                            tracking={{'activity': 'creditcard','lmt-track-id': message.tracking.individualCredit.taobaoBuyerCheckcodeButton}}
                            ></CreditcardCheckcode>
                    </Popup>

                    <Popup width="80%" show={this.state.isLoadingShow} processing={this.state.processing}>
                        <CreditcardLoading
                            isLoadingShow={this.state.isLoadingShow}
                            ></CreditcardLoading>
                    </Popup>

                    <Popup width="80%" show={this.state.isSuccessShow}>
                        <SuccessTipPopup
                            isSuccessShow={this.state.isSuccessShow}
                            callback={this.linkToCreditcardFinish}
                            ></SuccessTipPopup>
                    </Popup>

                </div>
            </div>
        );
    }
});
module.exports = TaobaoBuyerAccount;

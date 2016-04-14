/**
 * Created by malin on 15/6/9.
 */

var React = require('react'),
    Logo = require('./../../component/logo'),
    Button = require('./../../component/button'),
    InputFull = require('./../../form/inputFull'),
    AppData = require('./../../component/appData'),
    Forge = require('./../../lib/forge'),
    formCheck = require('./../../form/formCheck'),
    CreditcardPassword2 = require('./../../compositeComponents/individualCredit/creditcardPassword2'),
    CreditcardCheckcode = require('./../../compositeComponents/individualCredit/creditcardCheckcode'),
    CreditcardLoading = require('./../../compositeComponents/individualCredit/creditcardLoading'),
    Popup = require('./../../modelComponent/popup'),
    message = require('./../../messageConfig'),
    Tracking = require('./../../lib/tracking'),
    ErrorMessage = require('./../../component/errorMessage');


const {stdApi, stdUserStatus} = AppData.api();

const [creditcardApi, individualAccountsApi, estimateApi, termiteUrl, applyable] = [
    stdApi.creditcardApi,
    stdApi.individualAccountsApi,
    stdApi.estimateApi,
    stdUserStatus.termiteUrl,
    stdUserStatus.applyable];

var request = null;

let Report = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            errorMessage: '',
            buttonText: message.global.button.sure,
            checkCodeText: message.global.button.submitVerification,
            imgSrc: '',
            processing: false,
            isPassword2Show: false,
            isCheckcodeShow: false,
            isLoadingShow: false,
            passwordMD5: '',
            id: ''
        };
    },

    componentDidMount() {
        $.subscribe('cancelRequest', () => {
            if (request) {
                request.cancelRequest = true;
                request.abort();
                Tracking.trackEvent('click', {
                    'activity': 'creditcard',
                    'lmt-track-id': message.tracking.individualCredit.reportCancelRequest
                });
            }
        });
    },

    submit(e) {
        e.preventDefault();
        $('input').blur();
        let self = this;
        if (!formCheck(self)) {
            return;
        }
        this.login();
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
                    buttonText: message.global.button.sure,
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
                                        if (v.account === self.username) {
                                            let notification = v.details && v.details.notification;
                                            if (notification) {
                                                self.setState({
                                                    errorMessage: notification
                                                });
                                                Tracking.trackEvent('load-fail', {
                                                    'activity': 'creditcard',
                                                    'lmt-track-id': message.tracking.reportLoadFail,
                                                    'details': notification
                                                });
                                            } else {
                                                self.context.router.push('estimate');
                                                Tracking.trackEvent('load-success', {
                                                    'activity': 'creditcard',
                                                    'lmt-track-id': message.tracking.reportLoadSuccess
                                                });
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

    login() {
        this.fetch({tmpl: 'hc_ccrc'});
    },

    encrypt(self, data) {
        self.id = data.id;
        self.username = document.querySelector('#individual-account').value;
        self.password = document.querySelector('#individual-password').value;
        self.password2 = document.querySelector('#individual-password2').value;
        let publicKey = Forge.pki.publicKeyFromPem(data.data);
        let encrypted = publicKey.encrypt(self.password, 'RSA-OAEP', {
            md: Forge.md.sha256.create()
        });
        encrypted = Forge.util.binary.hex.encode(encrypted);
        this.setState({
            passwordMD5: encrypted,
            id: self.id
        });
        this.fetch({
            id: self.id,
            username: self.username,
            password: encrypted
        });
    },

    appendReport(self) {
        if (this.state.processing) {
            return;
        }
        let account = {
            'platform': message.individualCredit.report,
            'account': self.username,
            'email_type': 0,
            'password': '******'
        };
        let accounts = {};
        accounts.accounts = [account];
        $.ajax({
            'url': creditcardApi + message.individualCredit.report,
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
                    buttonText: message.global.button.sure,
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
                self.setState({
                    processing: false,
                    buttonText: message.global.button.sure,
                    isCheckcodeShow: false,
                    isPassword2Show: false,
                    isLoadingShow: false,
                    errorMessage: message.global.errorMessage.net
                });
            }
        });
    },

    sendCheckCode() {
        let self = this;
        this.fetch({
            id: self.state.id,
            randcode: document.querySelector('#individual-checkCode').value,
            username: self.username,
            password: self.state.passwordMD5,
            password2: self.password2
        });
    },

    sendPassword2() {
        let self = this;
        this.fetch({
            id: self.state.id,
            password2: document.querySelector('#individual-password2').value
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
                    buttonText: message.global.button.sure,
                    isLoadingShow: false,
                    errorMessage: '',
                    id: data.id
                });
                Tracking.trackEvent('tsdata', {
                    activity: 'creditcard',
                    username: document.querySelector('#individual-account').value,
                    platform: message.individualCredit.report,
                    id: data.id,
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
                    self.appendReport(self);
                    Tracking.trackEvent('tsdata', {
                        reason: 'success',
                        activity: 'creditcard',
                        platform: message.individualCredit.report,
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
                        activity: 'creditcard',
                        platform: message.individualCredit.report,
                        username: self.username,
                        detail: JSON.stringify(data)
                    });

                } else if (data.status === 'wrong_second_password' || data.status === 'wrong_password2') {
                    self.setState({
                        isPassword2Show: true,
                        errorMessage: message.individualCredit.wrongVerifycode
                    });
                    Tracking.trackEvent('tserror', {
                        reason: 'wrong_password2',
                        activity: 'creditcard',
                        platform: message.individualCredit.report,
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
                        platform: message.individualCredit.report,
                        username: self.username,
                        detail: JSON.stringify(data)
                    });

                } else {
                    console.log('unkown error');
                    self.setState({
                        errorMessage: message.individualCredit.reportError
                    });
                    self.estimate();
                    Tracking.trackEvent('tserror', {
                        reason: 'unkown error',
                        activity: 'creditcard',
                        username: self.username,
                        platform: message.individualCredit.report,
                        detail: JSON.stringify(data)
                    });

                }
            },
            error() {
                let errorMessage = request.cancelRequest ? message.global.errorMessage.abort : message.global.errorMessage.net;
                self.setState({
                    errorMessage: errorMessage,
                    processing: false,
                    isLoadingShow: false,
                    buttonText: message.global.button.sure
                });
            },
            timeout: 1200000
        });
    },

    render() {
        return (
            <div className="creditcard">
                <Logo></Logo>

                <div className="report-introduce">
                    <h2 className="h2-title">{message.individualCredit.titleReport}</h2>

                    <InputFull
                        text=""
                        type="text"
                        width="100%"
                        name="account"
                        className="input-account"
                        id="individual-account"
                        ref="account"
                        data-name="account"
                        placeholder={message.global.input.account}
                        validate={{require: message.global.errorMessage.account}}>
                    </InputFull>

                    <InputFull
                        text=""
                        type="password"
                        width="100%"
                        name="account"
                        className="input-password"
                        id="individual-password"
                        ref="password"
                        data-name="password"
                        placeholder={message.global.input.password}
                        validate={{require: message.global.errorMessage.requirePassword}}>
                    </InputFull>

                    <InputFull
                        text=""
                        type="text"
                        width="100%"
                        name="account"
                        className="input-yan"
                        id="individual-password2"
                        ref="password2"
                        data-name="password2"
                        placeholder={message.global.input.verification}
                        validate={{require: message.global.errorMessage.verification}}>
                    </InputFull>
                    <ErrorMessage>{this.state.errorMessage}</ErrorMessage>

                    <div className="button-link-big" onClick={this.submit}>
                        <Button
                            material-button
                            tracking={{'activity': 'creditcard','lmt-track-id': message.tracking.individualCredit.reportSubmitButton}}
                            text={this.state.buttonText}>
                        </Button>
                    </div>
                </div>

                <Popup width="90%" show={this.state.isPassword2Show} processing={this.state.processing}>
                    <CreditcardPassword2
                        isPassword2Show={this.state.isPassword2Show}
                        onClick={this.sendPassword2}
                        checkCodeText={this.state.checkCodeText}
                        tracking={{'activity': 'creditcard','lmt-track-id': message.tracking.individualCredit.reportPassword2Button}}
                        ></CreditcardPassword2>
                </Popup>

                <Popup width="90%" show={this.state.isCheckcodeShow} processing={this.state.processing}>
                    <CreditcardCheckcode
                        isCheckcodeShow={this.state.isCheckcodeShow}
                        onClick={this.sendCheckCode}
                        checkCodeText={this.state.checkCodeText}
                        imgSrc={this.state.imgSrc}
                        tracking={{'activity': 'creditcard','lmt-track-id': message.tracking.individualCredit.reportCheckcodeButton}}
                        ></CreditcardCheckcode>
                </Popup>

                <Popup width="90%" show={this.state.isLoadingShow} processing={this.state.processing}>
                    <CreditcardLoading
                        isLoadingShow={this.state.isLoadingShow}
                        ></CreditcardLoading>
                </Popup>
            </div>
        );
    }
});
module.exports = Report;

/**
 * Created by malin on 15/6/9.
 */

var React = require('react'),
    {Link} = require('react-router'),
    Logo = require('./../../component/logo'),
    AppData = require('./../../component/appData'),
    Button = require('./../../component/button'),
    Forge = require('./../../lib/forge'),
    Cookie = require('react-cookie'),
    CreditcardPassword2 = require('./../../compositeComponents/individualCredit/creditcardPassword2'),
    CreditcardCheckcode = require('./../../compositeComponents/individualCredit/creditcardCheckcode'),
    CreditcardLoading = require('./../../compositeComponents/individualCredit/creditcardLoading'),
    CreditcardAccountPassword = require('./../../compositeComponents/individualCredit/creditcardAccountPassword'),
    SuccessTipPopup = require('./../../component/successTipPopup'),
    Tracking = require('./../../lib/tracking'),
    Popup = require('./../../modelComponent/popup'),
    message = require('./../../messageConfig');


const {stdApi, stdUserStatus} = AppData.api();

const [creditcardApi, individualAccountsApi, estimateApi, termiteUrl] = [
    stdApi.creditcardApi,
    stdApi.individualAccountsApi,
    stdApi.estimateApi,
    stdUserStatus.termiteUrl];

var request = null;

let Creditcard = React.createClass({
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
            isSuccessShow: false,
            hasSetQQCenter: Cookie.load('hasSetQQCenter')
        };
    },


    componentDidMount() {
        this.appendIndividualCredit();
        $.subscribe('cancelRequest', () => {
            if (request) {
                request.cancelRequest = true;
                request.abort();
                Tracking.trackEvent('click', {
                    'activity': 'creditcard',
                    'lmt-track-id': message.tracking.individualCredit.creditcardCancelRequest
                });
            }
        });
    },

    setCookieQQ() {
        setTimeout(() => {
            Cookie.save('hasSetQQCenter', true);
            this.setState({
                hasSetQQCenter: true
            });
        }, 75000);
    },

    toCreditcardFQ(e) {                     //点击错误提示中的链接跳转至信用卡常见问题，通过参数定位问题显示的位置
        let location = e.target.dataset.to;
        if (location === 'yesqq') {
            this.setCookieQQ();
        }
        this.context.router.push('individualCredit/creditcard-fq', {location: location});
    },

    appendIndividualCredit() {
        let account = {
            platform: message.individualCredit.individualCredit,
            account: '个人消费',
            password: '******'
        };
        let accounts = {};
        accounts.accounts = [account];
        $.ajax({
            'url': creditcardApi + message.individualCredit.individualCredit,
            'type': 'post',
            'dataType': 'json',
            'data': JSON.stringify(accounts),
            'headers': {
                'Content-Type': 'application/json'
            },
            success(json) {
            }
        });
    },

    login() {
        this.fetch();
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

    individualAccounts() {
        let self = this;
        request = $.ajax({
            'url': individualAccountsApi,
            'type': 'post',
            'dataType': 'json',
            'data': {_: (new Date).getTime()},
            beforeSend() {
                self.setState({
                    processing: true,
                    buttonText: message.global.button.sending,
                    isLoadingShow: true,
                    isCheckcodeShow: false,
                    isPassword2Show: false
                });
            },
            success(data) {
                let num = 0;
                let l = data.result && data.result.length;
                $.each(data.result, function (index, item) {
                    if (item.progress === 100) {
                        num += 1;
                    }
                });
                if (num === l) {
                    self.setState({
                        processing: false,
                        buttonText: message.individualCredit.loginAndAnalysis,
                        isLoadingShow: false
                    });
                    self.estimate();
                } else {
                    self.individualAccounts();
                }
            },
            error() {
                //当出现错误的时候判断是否是用户自己取消
                let errorMessage = request.cancelRequest ? message.global.errorMessage.abort : message.global.errorMessage.net;
                self.setState({
                    processing: false,
                    buttonText: message.individualCredit.loginAndAnalysis,
                    isLoadingShow: false,
                    errorMessage: errorMessage
                });
            }
        });
    },

    appendCreditcard(self) {
        if (this.state.processing) {
            return;
        }
        let account = {
            platform: message.individualCredit.creditcard,
            account: self.username,
            password: '******'
        };
        let accounts = {};
        accounts.accounts = [account];
        request = $.ajax({
            'url': creditcardApi + message.individualCredit.creditcard,
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
                    isLoadingShow: true,
                    isCheckcodeShow: false,
                    isPassword2Show: false
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
                    self.individualAccounts();
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
                Tracking.trackEvent('ccdata', {
                    activity: 'creditcard',
                    username: document.querySelector('#individual-account').value,
                    platform: message.individualCredit.creditcard,
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
                    self.appendCreditcard(self);
                    Tracking.trackEvent('ccdata', {
                        reason: 'success',
                        activity: 'creditcard',
                        platform: message.individualCredit.creditcard,
                        username: self.username
                    });
                } else if (data.status === 'output_publickey') {
                    self.encrypt(self, data);
                } else if (data.status === 'wrong_password') {
                    self.setState({
                        errorMessage: message.individualCredit.wrongPassword
                    });
                    Tracking.trackEvent('ccerror', {
                        reason: 'wrong_password',
                        activity: 'creditcard',
                        platform: message.individualCredit.creditcard,
                        username: self.username,
                        detail: JSON.stringify(data)
                    });
                } else if (data.status === 'wrong_second_password' || data.status === 'wrong_password2') {
                    self.setState({
                        isPassword2Show: true,
                        errorMessage: data.data
                    });
                    Tracking.trackEvent('ccerror', {
                        activity: 'creditcard',
                        reason: 'wrong_password2',
                        platform: message.individualCredit.creditcard,
                        username: self.username,
                        detail: JSON.stringify(data)
                    });
                } else if (data.status === 'wrong_randcode') {
                    self.setState({
                        isCheckcodeShow: true,
                        errorMessage: data.data
                    });
                    Tracking.trackEvent('ccerror', {
                        activity: 'creditcard',
                        reason: 'wrong_randcode',
                        platform: message.individualCredit.creditcard,
                        username: self.username,
                        detail: JSON.stringify(data)
                    });
                } else {
                    if (data.data.indexOf('.htm') > -1 || data.data.indexOf('.ajax') > -1) {
                        self.setState({
                            errorMessage: '您的店铺信息不完整，请确认账号信息'
                        });
                        Tracking.trackEvent('ccerror', {
                            reason: 'miss some page',
                            activity: 'creditcard',
                            username: self.username,
                            platform: message.individualCredit.creditcard,
                            detail: JSON.stringify(data)
                        });
                    } else {
                        let errorTip = message.individualCredit.unknowError;
                        if (data.data === '用户名或密码错误') {
                            self.setState({
                                errorMessage: '您输入的密码和账户名不匹配，请重新输入。'
                            });
                        } else if (data.data === '请解绑QQ安全中心后再尝试登陆') {
                            if (self.state.hasSetQQCenter) {
                                // 客户已经尝试过QQ安全中心提示里面的方法了
                                errorTip = <div>
                                    <p>
                                        由于您的邮箱未开启POP3功能，导致分析失败。
                                        <span onClick={self.toCreditcardFQ} data-toto="pop3"
                                              style={{color: '#2484DF'}}>
                                            点击查看设置方法
                                        </span>
                                        设置完成后，请致电4008-1818-68，联系客服进行后续操作。
                                    </p>
                                </div>;
                            } else {
                                // 优先提醒客户是否使用过QQ安全中心
                                errorTip = <div>
                                    <p>
                                        抱歉，分析未完成。您是否使用过手机版的QQ安全中心app？
                                        <span onClick={self.toCreditcardFQ} data-toto="yesqq"
                                              style={{color: '#2484DF'}}
                                            >
                                            是
                                        </span>
                                        ,如果您没有设置过QQ安全中心请点击
                                        <span onClick={self.toCreditcardFQ} data-toto="noqq"
                                              style={{color: '#2484DF'}}>
                                            否
                                        </span>
                                    </p>
                                </div>;
                            }
                        } else if (data.data === '账号被锁定，请去qq安全中心解锁') {
                            errorTip = <div>
                                <p>
                                    分析数据前，请先到QQ安全中心解除保护模式，再回来重试。
                                    <a to="http://aq.qq.com/007"
                                       style={{color: '#2484DF'}}>
                                        点此前往
                                    </a>
                                    ,
                                    若您QQ突然下线或收到账号被盗风险提醒，无需慌张，属正常情况。
                                </p>
                            </div>;
                        }
                        self.setState({
                            errorMessage: errorTip
                        });
                        let reason = data.status;
                        // status为空或者fail时，需要提取具体的原因信息
                        if (reason === '' || reason === 'fail') {
                            reason = reason + '(' + data.data + ')';
                        }
                        Tracking.trackEvent('ccerror', {
                            activity: 'creditcard',
                            reason: reason,
                            username: self.username,
                            platform: message.individualCredit.creditcard,
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

    //调用所有账号信息，获取信用卡错误提示
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
                    isLoadingShow: false
                });
                try {
                    let json = data.result;
                    let jsonLength = json.length;
                    if (jsonLength) {
                        for (let value of json) {
                            //找到个人消费总账号
                            if (value.platform === message.individualCredit.individualCredit) {
                                //找到个人消费子账号
                                let details = value.details && JSON.parse(value.details);
                                let subAccounts = details && details['sub_accounts'];
                                if (subAccounts.length) {
                                    for (let v of subAccounts) {
                                        //子账号中account 如果跟当前input中子账号一直，即当前添加的信用卡。
                                        //获取当前信用卡错误提示，如果没错误说明添加成功跳转至添加淘宝买家页面
                                        if (v.account === self.username && v.platform === message.individualCredit.creditcard) {
                                            if (v.isValid) {
                                                self.setState({
                                                    isSuccessShow: true,
                                                    isLoadingShow: false
                                                });
                                                Tracking.trackEvent('load-success', {
                                                    'activity': 'creditcard',
                                                    'lmt-track-id': message.tracking.creditcardLoadSuccess
                                                });
                                            } else {
                                                let notification = v.details && v.details.notification;
                                                if (notification) {
                                                    self.setState({
                                                        errorMessage: notification
                                                    });
                                                    Tracking.trackEvent('load-fail', {
                                                        'activity': 'creditcard',
                                                        'lmt-track-id': message.tracking.creditcardLoadFail,
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

    linkToTaobaoBuyer() {
        this.setState({
            isSuccessShow: false
        });
        this.context.router.push('individualCredit/taobao');
    },

    render() {
        return (
            <div className="creditcard">
                <Logo></Logo>

                <div className="account fullpageHeight width90">
                    <h2 className="h2-title">信用卡账单</h2>

                    <p style={{marginBottom: '30px'}}>添加您用来接收信用卡账单的邮箱地址，我们可以分析您的账单数据，以此作为提款依据。
                        <span style={{color: 'rgb(239, 120, 138)'}}>持卡人需为您本人</span>
                    </p>

                    <p style={{marginBottom: '20px'}}>
                        目前已支持银行：招商银行
                        <Link to={{pathname: 'individualCredit/creditcard-fq', query: {location: 'must'}}}
                              style={{color: '#2484DF'}}>
                            （必看提示）
                        </Link>
                        、工行、建行、农行、中行及
                        <Link to={{pathname: 'individualCredit/creditcard-fq', query: {location: 'bank'}}}
                              style={{color: '#2484DF'}}>
                            其他8家银行
                        </Link>
                    </p>

                    <CreditcardAccountPassword
                        errorMessage={this.state.errorMessage}
                        buttonText={this.state.buttonText}
                        onClick={this.login}
                        tracking={{'activity': 'creditcard','lmt-track-id': message.tracking.individualCredit.creditcardLoginAndAnalysis}}
                        >
                    </CreditcardAccountPassword>

                    <Popup width="80%" show={this.state.isPassword2Show} processing={this.state.processing}>
                        <CreditcardPassword2
                            isPassword2Show={this.state.isPassword2Show}
                            onClick={this.sendPassword2}
                            tracking={{'activity': 'creditcard','lmt-track-id': message.tracking.individualCredit.creditcardPassword2Button}}
                            ></CreditcardPassword2>
                    </Popup>

                    <Popup width="80%" show={this.state.isCheckcodeShow} processing={this.state.processing}>
                        <CreditcardCheckcode
                            isCheckcodeShow={this.state.isCheckcodeShow}
                            onClick={this.sendCheckCode}
                            checkCodeText={this.state.checkCodeText}
                            imgSrc={this.state.imgSrc}
                            tracking={{'activity': 'creditcard', 'lmt-track-id': message.tracking.individualCredit.creditcardPassword2Button}}
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
                            callback={this.linkToTaobaoBuyer}
                            ></SuccessTipPopup>
                    </Popup>
                </div>
                <Link className="bottom" to={{pathname: 'individualCredit/creditcard-fq'}}>
                    <Button text={message.individualCredit.question}
                            tracking={{'activity': 'creditcard','lmt-track-id': message.tracking.individualCredit.creditcardQuest}}>
                        ></Button>
                </Link>
            </div>
        );
    }
});
module.exports = Creditcard;

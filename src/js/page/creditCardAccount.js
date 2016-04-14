/**
 * Created by qijiao on 15-6-1.
 */
var React = require('react'),
    AppData = require('./../component/appData'),
    Button = require('./../component/button'),
    Logo = require('./../component/logo'),
    InputFull = require('./../form/inputFull'),
    Select = require('./../form/select'),
    Agree = require('./../component/agree'),
    Customer = require('./../component/customer'),
    Forge = require('./../lib/forge'),
    ErrorMessage = require('./../component/errorMessage');

const {stdApi, stdUserStatus} = AppData.api();

const [creditCardApi, termiteUrl, applyable] = [
    stdApi.platformApi,
    stdUserStatus.termiteUrl,
    stdUserStatus.applyable];

var request = null;

let CreditCardAccount = React.createClass({
    getInitialState() {
        return {
            processing: !applyable,
            accountText: '导入',
            checkCodeText: '提交验证码',
            password2Text: '提交独立密码',
            progressText: '分析中...',
            imgSrc: '',
            AccountShow: true,
            LoadingShow: false,
            CheckcodeShow: false,
            Password2Show: false,
            errorMessage: ''
        };
    },

    validateForm() {
        if (this.state.processing) {
            return false;
        }
        let hasError = 0;
        let ref = this.refs;
        for (let i of Object.keys(ref)) {
            if (ref[i].refs.validate) {
                if (ref[i].refs.validate.refs.validate) {
                    hasError += ref[i].refs.validate.refs.validate.props.toValidate(
                        ref[i].refs.validate.refs.validate.value,
                        ref[i].props.validate
                    );
                }
            }
        }

        if (this.refs.agree) {
            hasError += this.refs.agree.refs.validate.props.toValidate(
                this.refs.agree.refs.validate.checked,
                this.refs.agree.props.validate
            );
        }
        return hasError;
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
        });
    },

    init(self) {
        self.id = '';
        self.setState({
            imgSrc: '',
            CheckcodeShow: false,
            Password2Show: false,
            AccountShow: false,
            LoadingShow: true
        });
        self.progressText = '';
    },

    fetch(param) {
        let self = this;
        self.setState({
            CheckcodeShow: false,
            Password2Show: false,
            AccountShow: false,
            LoadingShow: true
        });
        self.state.progressText = '分析中...';
        if (request) {
            request.abort();
        }
        request = $.ajax({
            method: 'GET',
            url: termiteUrl + '?' + $.param(param),
            dataType: 'json',
            success: function (data) {
                request = null;
                let id = data.id;
                self.init(self);
                self.id = id;
                console.log(data);
                if (data.status === 'output_verifycode') {
                    self.setState({
                        imgSrc: data.data,
                        LoadingShow: false,
                        CheckcodeShow: true
                    });
                } else if (data.status === 'need_param') {
                    if (data.need_param === 'password2') {
                        self.setState({
                            LoadingShow: false,
                            Password2Show: true
                        });
                    } else if (data.need_param === 'randcode') {
                        self.setState({
                            LoadingShow: false,
                            CheckcodeShow: true
                        });
                    } else {
                        self.setState({
                            LoadingShow: true
                        });
                    }
                } else if (data.status === 'login_success') {
                    self.fetch({id: data.id});
                } else if (data.status === 'begin_fetch_data') {
                    self.fetch({id: data.id});
                } else if (data.status === 'finish_fetch_data' || data.status === 'finish_all') {
                    let arr = [];
                    let o = {};
                    let subObject = {};
                    subObject.account = self.username;
                    subObject['email_type'] = self.emailType;
                    subObject.password = '******';
                    arr.push(subObject);
                    o.accounts = arr;
                    // success
                    $.ajax({
                        'url': creditCardApi,
                        'type': 'get',
                        'dataType': 'jsonp',
                        'jsonp': 'callback',
                        'data': {'data': JSON.stringify(o), 'platform': 'creditcard', _: (new Date).getTime()},
                        beforeSend: function () {
                            self.setState({processing: true, text: '提交中'});
                        },
                        success: function (json) {
                            if (json.result === 'failure') {
                                self.setState({
                                    LoadingShow: false,
                                    CheckcodeShow: false,
                                    Password2Show: false,
                                    AccountShow: true,
                                    errorMessage: json.message
                                });
                            } else {
                                //window.std.stdUserStatus.applyable = false;
                                window.location.href = window.location.pathname + window.location.search + '#estimate/domestic';
                            }
                        },
                        error: function () {
                            self.setState({
                                LoadingShow: false,
                                CheckcodeShow: false,
                                Password2Show: false,
                                AccountShow: true,
                                errorMessage: json.message
                            });
                        }
                    });
                } else if (data.status === 'output_publickey') {
                    self.encrypt(self, data);
                } else if (data.status === 'wrong_password') {
                    self.setState({
                        LoadingShow: false,
                        AccountShow: true,
                        errorMessage: '密码错误'
                    });
                    //trackError({reason: 'wrong_password', username: self.username(), detail: JSON.stringify(data)});
                } else if (data.status === 'wrong_second_password') {
                    alert('独立密码错误');
                    self.setState({
                        LoadingShow: false,
                        AccountShow: true
                    });
                } else if (data.status === 'wrong_password2') {
                    self.fetch({id: data.id});
                    alert('独立密码错误');
                    //trackError({reason: 'wrong_password2', username: self.username(), detail: JSON.stringify(data)});
                } else if (data.status === 'wrong_randcode') {
                    self.fetch({id: data.id});
                    alert('验证码错误');
                    //trackError({reason: 'wrong_randcode', username: self.username(), detail: JSON.stringify(data)});
                } else {
                    // don't know how to process
                    // TODO: notify backend
                    console.log('unkown error');
                    self.setState({
                        LoadingShow: false,
                        errorMessage: '信用卡账单提取出错，请重试！',
                        AccountShow: true
                    });
                    //trackError({reason: 'unknown', username: self.username(), detail: JSON.stringify(data)});
                }
            },
            error: function () {
                console.log('timeout');
                self.setState({
                    LoadingShow: false,
                    errorMessage: '信用卡账单提取出错，请重试！',
                    AccountShow: true
                });
                //trackError({reason: 'timeout', username: self.username()});
            },
            timeout: 1200000
        });
    },

    login(e) {
        let hasError = this.validateForm();
        if (hasError) {
            return false;
        }

        let submit = $('form').serializeArray().slice(0, 3);
        let email = std.stdUserStatus.emailTypes.filter(t => t.id === Number(submit[1].value))[0].message;
        this.username = submit[0].value + '@' + email;
        this.password = submit[2].value;
        this.emailType = submit[1].value;
        let array = email.split('\\.').reverse();
        let tmpl = [].concat('mail', array).join('.');
        this.init(this);
        this.fetch({
            tmpl: tmpl
        });
    },

    sendCheckCode() {
        let hasError = this.validateForm();
        if (hasError === 0) {

        } else {
            return false;
        }
        this.fetch({
            id: this.id,
            randcode: $('form').serializeArray()[0].value
        });
        return false;
    },

    sendPassword2() {
        let hasError = this.validateForm();
        if (hasError === 0) {

        } else {
            return false;
        }
        this.fetch({
            id: this.id,
            password2: $('form').serializeArray()[0].value
        });
        return false;
    },

    renderAccountPassword() {
        let styleAccount = {
            width: '80%',
            margin: 'auto',
            display: 'block'
        };
        let styleEmail = {
            position: 'absolute',
            top: '8px',
            left: '55%',
            fontSize: '20px'
        };
        let styleAbsolute = {
            position: 'absolute',
            top: '0',
            left: '67%',
            height: '34px'
        };
        return <div className="creditCardAccount" ref="tb" style={styleAccount}>
            <div className="relative">
                <InputFull
                    text=""
                    type="text"
                    width="50%"
                    name="account"
                    className="input-account"
                    ref="account"
                    data-name="account"
                    placeholder="信用卡账单邮箱"
                    validate={{require: '请输入邮箱'}}>
                </InputFull>

                <p style={styleEmail}>@</p>

                <div style={styleAbsolute}>
                    <Select
                        className="email"
                        name='emailType'
                        options={window.std.stdUserStatus.emailTypes}
                        ></Select>
                </div>
            </div>
            <InputFull
                type="password"
                text=""
                name="password"
                className="input-password"
                width="100%"
                ref="password"
                data-name="password"
                placeholder="邮箱登录密码"
                validate={{require: '请输入邮箱登录密码'}}>
            </InputFull>

            <div className="section-two">
                <div className="agreeDiv">
                    <Agree
                        validate={{checked: '请勾选协议'}}
                        ref="agree"
                        data-name="agree"
                        text="《信用卡电子账单等数据信息收集使用协议》"
                        value={std.allData.agree}>
                    </Agree>
                </div>
            </div>
            <ErrorMessage>{this.state.errorMessage}</ErrorMessage>

            <div className="button-link-full" onClick={this.login}>
                <Button text={this.state.accountText} style={{background: '#2484DF'}}></Button>
            </div>
        </div>;
    },

    renderPassword2() {

        let stylePassword2 = {
            width: '80%',
            margin: 'auto',
            display: 'block'
        };
        return <div className="password2" ref="tb" style={stylePassword2}>
            <div className="relative">
                <InputFull
                    text=""
                    type="password"
                    width="100%"
                    name="account"
                    className="input-password"

                    id="password2"
                    ref="password2"
                    data-name="password2"
                    placeholder="独立密码"
                    validate={{require: '请输入独立密码'}}>
                </InputFull>
            </div>
            <div className="button-link-full" onClick={this.sendPassword2}>
                <Button text={this.state.password2Text}></Button>
            </div>
        </div>;


    },

    renderVerifyCode() {
        let styleCheckcode = {
            width: '80%',
            margin: 'auto',
            display: 'block'
        };
        let styleImage = {
            display: 'block',
            margin: '0 auto',
            marginBottom: '20px'
        };
        return <div className="checkCode" ref="cb" style={styleCheckcode}>
            <div className="relative">
                <img id="random-code-image" src={this.state.imgSrc} style={styleImage}/>
                <InputFull
                    text=""
                    type="text"
                    width="100%"
                    name="checkCode"
                    className="input-yan"
                    ref="checkCode"
                    data-name="checkCode"
                    placeholder="请输入您的验证码"
                    id="checkCode"
                    validate={{require: '请输入验证码'}}>
                </InputFull>
            </div>
            <div className="button-link-full" onClick={this.sendCheckCode}>
                <Button text={this.state.checkCodeText} style={{background: '#2484DF'}}></Button>
            </div>
        </div>;
    },

    renderLoading() {
        let styleLoading = {
            width: '80%',
            margin: '10%',
            display: 'block'
        };
        let styleProgress = {
            textAlign: 'center'
        };
        let styleImage = {
            display: 'block',
            margin: '0 auto',
            marginBottom: '20px'
        };
        return <div style={styleLoading}>
            <img src="https://shangdai.yixin.com/imgs/estimate-loading.gif" style={styleImage}/>
            <br />
            <br />

            <div style={styleProgress}>{this.state.progressText}</div>
            <br />
            <br />
        </div>;
    },

    render() {
        let styleH2 = {
            fontSize: '30px',
            fontWeight: 'normal',
            textAlign: 'center',
            margin: '20px auto'
        };

        return (
            <div>
                <Logo></Logo>

                <h2 style={styleH2}>添加信用卡账单</h2>

                <div className="width80">
                    <p className="form-notice">添加您用来接受信用卡电子账单的邮箱地址，我们可以分析您的账单数据，以此作为提额依据</p>

                    <p className="form-notice form-notice-add">(暂不支持招商银行信用卡账单导入)</p>
                </div>

                { this.state.AccountShow ? this.renderAccountPassword() : <div></div> }
                { this.state.Password2Show ? this.renderPassword2() : <div></div> }
                { this.state.CheckcodeShow ? this.renderVerifyCode() : <div></div> }
                { this.state.LoadingShow ? this.renderLoading() : <div></div> }


                <Customer></Customer>
            </div>
        );
    }
});
module.exports = CreditCardAccount;

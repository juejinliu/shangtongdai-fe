/**
 * Created by malin on 15/5/28.
 */
var React = require('react'),
    {Link} = require('react-router'),
    Button = require('./../component/button'),
    message = require('../messageConfig'),
    AppData = require('./../component/appData'),
    {formate} = require('./../component/myfunction'),
    formCheck = require('./../form/formCheck'),
    mobileCheck = require('./../form/mobileCheck'),
    InputFull = require('./../form/inputFull'),
    redirect = require('./../component/loginRedirect'),
    ErrorMessage = require('./../component/errorMessage'),
    Cookie = require('react-cookie'),
    InputFullCode = require('./../form/inputFullCode'),
    InputFullAuthImage = require('./../form/inputFullAuthImage');

const {stdApi} = AppData.api();

const loginApi = stdApi.loginApi,
    loginCodeApi = stdApi.loginCodeApi,
    authImageApi = stdApi.authImageApi;

let Login = React.createClass({
    getDefaultProps() {
        return {
            width: 100,
            height: 40
        };
    },
    updateImageAuthUrl(skipUpdate) {
        this.setState({
            needAuthImage: true
        });
        if (!(skipUpdate === true && this.state.imageAuthCodeUrl)) {
            this.setState({
                imageAuthCodeUrl: authImageApi + '?_=' + (new Date()).getTime() +
                '&width=' + this.props.width +
                '&height=' + this.props.height
            });
        }
    },
    getInitialState() {
        return {
            processingButton: false,
            buttonText: message.global.button.login,
            errorMessage: '',
            isNormalLogin: true,
            processingCode: false,
            needAuthImage: false,
            imageAuthCodeUrl: ''
        };
    },
    componentWillMount() {
        let hasImgCodeCookie = Cookie.load('img_code');
        if (hasImgCodeCookie) {
            this.updateImageAuthUrl(false);
        }
    },

    _toForm() {
        let self = this;
        if (this.state.processingButton) {
            return false;
        }
        if (!formCheck(self)) {
            return false;
        }
        let o = {};
        formate($('.form').serializeArray(), o);

        let api = loginApi + '?_=' + (new Date).getTime();
        let loginType = 'normal';
        if (!self.state.isNormalLogin) {
            loginType = 'authCode';
        }
        $.ajax({
            'url': api,
            'type': 'post',
            'data': JSON.stringify({'data': o, 'loginType': loginType}),
            'dataType': 'json',
            'headers': {
                'Content-Type': 'application/json'
            },
            beforeSend() {
                self.setState({processingButton: true, buttonText: message.global.button.sending, errorMessage: ''});
            },
            success(json) {
                if (json.result !== 'success') {
                    self.setState({
                        processingButton: false,
                        buttonText: message.global.button.login,
                        errorMessage: json.message
                    });
                } else {
                    redirect(self.props.next);
                }
            },
            error() {
                self.setState({
                    processingButton: false,
                    buttonText: message.global.button.login,
                    errorMessage: message.global.errorMessage.net
                });
            }
        });

    },

    changeLoginMode() {
        let isNormalLogin = this.state.isNormalLogin;
        this.setState({
            isNormalLogin: !isNormalLogin,
            errorMessage: ''
        });
    },

    getCode() {
        let self = this,
            codeInterval = null;
        if (this.state.processingCode) {
            return false;
        }
        let mobileRef = self.refs.mobile.refs.validate;
        let mobileErrors = 0;
        if (mobileRef) {
            mobileErrors = mobileRef.toValidate(
                mobileRef.refs.validate.value,
                self.refs.mobile.props.validate);
        }

        if (mobileErrors > 0) {
            return false;
        }

        let data = { mobile: $('#mobile').val() };
        if (this.state.needAuthImage) {
            let imageAuthCodeRef = self.refs.imageAuthCode.refs.validate;
            let imageAuthCodeErrors = 0;
            if (imageAuthCodeRef) {
                imageAuthCodeErrors = imageAuthCodeRef.toValidate(
                    imageAuthCodeRef.refs.validate.value,
                    self.refs.imageAuthCode.props.validate);
            }
            if (imageAuthCodeErrors > 0) {
                return false;
            }
            data['authImageCode'] = $('#imageAuthCode').val();
        }

        $.ajax({
            'url': loginCodeApi,
            'type': 'get',
            'dataType': 'jsonp',
            'jsonp': 'callback',
            'data': {'data': JSON.stringify(data), '_': (new Date).getTime()},
            beforeSend: function () {
                self.setState({errorMessage: ''});
            },
            success: function (json) {
                if (json.result !== 'success') {
                    if (json.needAuthImageCode) {
                        self.updateImageAuthUrl(true);
                    }
                    if (codeInterval) {
                        clearInterval(codeInterval);
                        self.setState({num: '', processingCode: false});
                    }
                    $('#authCode').next().html(json.message);
                } else {
                    $('#authCode').next().html(message.global.errorMessage.sendOK);
                }
            },
            error: function () {
                self.setState({
                    errorMessage: message.global.errorMessage.net
                });
            }
        });
        this.setState({num: 60, processingCode: true});

        let timer = function () {
            self.setState({num: self.state.num - 1});
            if (self.state.num === 0) {
                clearInterval(codeInterval);
                codeInterval = null;
                self.setState({num: '', processingCode: false});
            }
        };
        codeInterval = setInterval(timer, 1000);
    },

    renderNormal() {
        return (
            <div>
                <InputFull
                    text=""
                    type="text"
                    width="100%"
                    name="account"
                    className="input-account"
                    ref="account"
                    data-name="account"
                    placeholder={message.global.input.phoneEmail}
                    validate={{require: message.global.errorMessage.require}}
                    ></InputFull>
                <InputFull
                    text=""
                    type="password"
                    width="100%"
                    id="code"
                    className="input-password"
                    name="password"
                    ref="password"
                    data-name="password"
                    placeholder={message.global.input.password}
                    validate={{require: message.global.errorMessage.require, length: message.global.errorMessage.password}}
                    ></InputFull>
            </div>
        );
    },

    renderAuthCode() {
        return (
            <div>
                <InputFull
                    id="mobile"
                    text=""
                    type="text"
                    width="100%"
                    name="mobile"
                    className="input-mobile"
                    ref="mobile"
                    data-name="mobile"
                    placeholder={message.global.input.phone}
                    validate={{require: message.global.errorMessage.require, phone: message.global.errorMessage.phone}}
                    ></InputFull>
                {
                    this.state.needAuthImage ?
                        <InputFullAuthImage
                            text=""
                            type="text"
                            className="input-image-auth-code input-yan"
                            name="imageAuthCode"
                            ref="imageAuthCode"
                            data-name="imageAuthCode"
                            id="imageAuthCode"
                            placeholder={message.global.input.imageAuthCode}
                            validate={{require: message.global.errorMessage.require}}
                            imageAuthCodeUrl={this.state.imageAuthCodeUrl}
                            onImageCodeTouchEnd={this.updateImageAuthUrl}
                        ></InputFullAuthImage> :
                        null
                }
                <InputFullCode
                    text=""
                    type="text"
                    width="60%"
                    className="input-yan"
                    name="authCode"
                    ref="authCode"
                    data-name="authCode"
                    id="authCode"
                    placeholder={message.global.input.verification}
                    onClick={this.getCode}
                    num={this.state.num}
                    validate={{require: message.global.errorMessage.require}}
                    ></InputFullCode>
            </div>
        );
    },

    render() {
        return (
            <div className="fullpageHeight">
                <ul className="login-type-list">
                    <li className={this.state.isNormalLogin ? 'active login-type' : 'login-type'}
                        onClick={this.changeLoginMode}>{message.registLogin.normalLogin}</li>
                    <li className={!this.state.isNormalLogin ? 'active login-type' : 'login-type'}
                        onClick={this.changeLoginMode}>{message.registLogin.verificationLogin}</li>
                </ul>
                <div className="regist">
                    {
                        this.state.isNormalLogin ? this.renderNormal() : this.renderAuthCode()
                    }
                    <ErrorMessage>{this.state.errorMessage}</ErrorMessage>

                    <div onClick={this._toForm} className="button-link-full">
                        <Button
                            text={this.state.buttonText}
                            material-button
                            tracking
                        ></Button>
                    </div>
                    <Link to={{pathname: 'reg-login/getPassword', query: {next: this.props.next}}}
                          className="regist-foget">
                        <span>
                            <Button
                                text={message.global.button.fogotPassword}
                                material-button
                                tracking
                                ></Button>
                        </span>
                    </Link>
                </div>
            </div>
        );
    }
});


module.exports = Login;

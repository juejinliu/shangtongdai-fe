/**
 * Created by malin on 15/5/28.
 */
var React = require('react'),
    Button = require('./../component/button'),
    message = require('../messageConfig'),
    AppData = require('./../component/appData'),
    InputFull = require('./../form/inputFull'),
    {formate} = require('./../component/myfunction'),
    formCheck = require('./../form/formCheck'),
    mobileCheck = require('./../form/mobileCheck'),
    redirect = require('./../component/loginRedirect'),
    ErrorMessage = require('./../component/errorMessage'),
    Cookie = require('react-cookie'),
    InputFullCode = require('./../form/inputFullCode'),
    InputFullAuthImage = require('./../form/inputFullAuthImage');

var codeInterval = 0;

const {stdApi, stdUserStatus} = AppData.api();

const [codeApi, signupApi, code, authImageApi] = 
    [stdApi.codeApi, stdApi.signupApi, stdUserStatus.code, stdApi.authImageApi];
let Regist = React.createClass({
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
            num: '',
            processingCode: false,
            processingButton: false,
            buttonText: message.global.button.regist,
            errorMessage: '',
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
    getCode() {
        let self = this;
        if (this.state.processingCode) {
            return false;
        }
        if (!mobileCheck(self, 'mobile')) {
            return;
        }
        let data = { mobile: $('#mobile').val() };
        if (this.state.needAuthImage) {
            if (!mobileCheck(self, 'imageAuthCode')) {
                return;
            }
            data['authImageCode'] = $('#imageAuthCode').val();
        }
        $.ajax({
            'url': codeApi,
            'type': 'get',
            'dataType': 'jsonp',
            'jsonp': 'callback',
            'data': {'data': JSON.stringify(data), _: (new Date).getTime()},
            beforeSend() {
                self.setState({errorMessage: ''});
            },
            success(json) {
                if (json.result !== 'success') {
                    if (json.needAuthImageCode) {
                        self.updateImageAuthUrl(true);
                    }
                    if (codeInterval) {
                        clearInterval(codeInterval);
                        codeInterval = null;
                        self.setState({num: '', processingCode: false});
                    }
                    $('#authCode').next().html(json.message);
                } else {
                    $('#authCode').next().html(message.global.errorMessage.sendOK);
                }
            },
            error() {
                self.setState({
                    errorMessage: message.global.errorMessage.net
                });
            }
        });
        this.setState({num: 60, processingCode: true});
        let timer = () => {
            this.setState({num: self.state.num - 1});
            if (this.state.num === 0) {
                clearInterval(codeInterval);
                codeInterval = null;
                this.setState({num: '', processingCode: false});
            }
        };
        codeInterval = setInterval(timer, 1000);

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
        o['agree-tou'] = true;
        $.ajax({
            'url': signupApi,
            'type': 'get',
            'dataType': 'jsonp',
            'jsonp': 'callback',
            'data': {'data': JSON.stringify(o), _: (new Date).getTime()},
            beforeSend() {
                self.setState({processingButton: true, buttonText: message.global.button.sending, errorMessage: ''});
            },
            success(json) {
                if (json.result === 'failure') {
                    $('#code').next().html(json.message);
                    self.setState({processingButton: false, buttonText: message.global.button.regist});
                } else {
                    redirect(self.props.next);
                }
            },
            error() {
                self.setState({
                    processingButton: false,
                    buttonText: message.global.button.regist,
                    errorMessage: message.global.errorMessage.net
                });
            }
        });

    },
    render() {
        return (
            <div className="regist fullpageHeight">
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
                        ''
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
                    num = {this.state.num}
                    validate={{require: message.global.errorMessage.require}}
                ></InputFullCode>
                <InputFull
                    text=""
                    type="password"
                    width="100%"
                    name="password"
                    className="input-password"
                    ref="password"
                    data-name="password"
                    placeholder={message.global.input.setPassword}
                    validate={{require: message.global.errorMessage.require, length: message.global.errorMessage.setPassword}}
                ></InputFull>
                <InputFull
                    text=""
                    type="text"
                    className="input-yaoqing"
                    width="100%"
                    name="code"
                    ref="code"
                    id="code"
                    data-name="code"
                    unchangeableValue={code}
                    placeholder={message.global.input.invitation}
                ></InputFull>
                <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
                <div onClick={this._toForm} className="button-link-full">
                    <Button
                        text={this.state.buttonText}
                        material-button
                        tracking
                    ></Button>
                </div>
            </div>
        );
    }
});


module.exports = Regist;

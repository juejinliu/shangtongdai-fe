/**
 * Created by malin on 15/5/28.
 */

var React = require('react'),
    message = require('../messageConfig'),
    Button = require('../component/button'),
    AppData = require('./../component/appData'),
    {formate} = require('./../component/myfunction'),
    formCheck = require('./../form/formCheck'),
    mobileCheck = require('./../form/mobileCheck'),
    InputFullCode = require('../form/inputFullCode'),
    Logo = require('./../component/logo'),
    Customer = require('./../component/customer'),
    redirect = require('./../component/loginRedirect'),
    ErrorMessage = require('./../component/errorMessage'),
    InputFull = require('../form/inputFull');

var codeInterval = 0;

const {stdApi, stdUserStatus} = AppData.api();

const [retrievePasswordCodeApi, retrievePasswordApi, code] = [
    stdApi.retrievePasswordCodeApi,
    stdApi.retrievePasswordApi,
    stdUserStatus.code];

let GetPasswordPersonal = React.createClass({

    getInitialState() {
        return {
            num: '',
            processingCode: false,
            processingButton: false,
            buttonText: message.global.button.resetPassword
        };
    },

    getCode() {
        let self = this;
        if (this.state.processingCode) {
            return false;
        }
        if (!mobileCheck(self, 'mobile')) {
            return;
        }
        $.ajax({
            'url': retrievePasswordCodeApi,
            'type': 'get',
            'dataType': 'jsonp',
            'jsonp': 'callback',
            'data': {'data': JSON.stringify({mobile: $('#mobile').val()}), _: (new Date).getTime()},
            beforeSend() {
                self.setState({errorMessage: ''});
            },
            success(json) {
                if (json.result !== 'success') {
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
    _toForm: function () {
        let self = this;
        if (this.state.processingButton) {
            return false;
        }
        if (!formCheck(self)) {
            return false;
        }
        let o = {};
        formate($('.form').serializeArray(), o);
        Object.assign(o, {'agree-tou': 'true'});
        $.ajax({
            'url': retrievePasswordApi,
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
                    self.setState({processingButton: false, buttonText: message.global.button.resetPassword});
                } else {
                    redirect(self.props.location.query.next);
                }
            },
            error() {
                self.setState({
                    processingButton: false,
                    buttonText: message.global.button.resetPassword,
                    errorMessage: message.global.errorMessage.net
                });
            }
        });

    },
    render() {
        return (
            <div>
                <Logo></Logo>
                <h2 style={{
                    fontSize: '30px',
                    textAlign: 'center',
                    fontWeight: 'normal',
                    margin: '20px auto'
                }}>密码修改</h2>
                <div style={{height: '20px', background: '#E2E2DF'}}></div>
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
                    <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
                    <div onClick={this._toForm} className="button-link-full">
                        <Button
                            text={this.state.buttonText}
                            material-button
                            tracking
                        ></Button>
                    </div>
                </div>
                <Customer></Customer>
            </div>
        );
    }
});


module.exports = GetPasswordPersonal;

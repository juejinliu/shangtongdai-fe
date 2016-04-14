/**
 * @file 信用卡与淘宝买家短信验证弹窗
 * @auther Created by malin on 15/6/9.
 */
var React = require('react'),
    Button = require('./../../component/button'),
    formCheck = require('./../../form/formCheck'),
    InputFull = require('./../../form/inputFull'),
    message = require('./../../messageConfig');

let CreditcardPassword2 = React.createClass({
    getDefaultProps() {
        return {
            onClick: message.global.errorMessage.errorFunction,
            checkCodeText: message.global.errorMessage.errorButton,
            isPassword2Show: false,
            tracking: message.global.errorMessage.errorTracking
        };
    },

    _touchEnd(e) {
        e.preventDefault();
        $('input').blur();
        let self = this;
        if (!formCheck(self)) {
            return;
        }
        this.props.onClick();
    },

    render() {
        let placeholder = '';
        let validateMessage = '';
        let buttonText = '';
        //信用卡账单password2为独立密码
        if (window.location.href.indexOf('individualCredit/creditcard') > -1) {
            placeholder = message.global.input.password2;
            validateMessage = message.global.errorMessage.password2;
            buttonText = message.global.button.submitPassword2;
        } else {
            placeholder = message.global.input.verification;
            validateMessage = message.global.errorMessage.verification;
            buttonText = message.global.button.submitVerification;

        }
        return (
            this.props.isPassword2Show ?
                <div>
                    <p className="center-text" style={{margin: '0 0 10px 5%'}}>{placeholder}</p>

                    <div className="creditcard-popup-input">
                        <InputFull
                            text=""
                            type="password"
                            width="100%"
                            name="account"
                            className="input-password"
                            id="individual-password2"
                            ref="password2"
                            data-name="password2"
                            placeholder={placeholder}
                            validate={{require: validateMessage}}>
                        </InputFull>
                    </div>

                    <div className="button-link-big" onClick={this._touchEnd}>
                        <Button material-button
                                tracking={this.props.tracking}
                                text={buttonText}>
                        </Button>
                    </div>
                </div> : null
        );
    }
});
module.exports = CreditcardPassword2;
/**
 * @file 信用卡与淘宝买家图片验证码弹窗
 * @auther Created by malin on 15/6/9.
 */
var React = require('react'),
    Button = require('./../../component/button'),
    InputFull = require('./../../form/inputFull'),
    formCheck = require('./../../form/formCheck'),
    message = require('./../../messageConfig'),
    ErrorMessage = require('./../../component/errorMessage');

let TaobaoBuyerAccountPassword = React.createClass({
    getDefaultProps() {
        return {
            onClick: message.global.errorMessage.errorFunction,
            buttonText: message.global.errorMessage.errorButton,
            tracking: message.global.errorMessage.errorTracking,
            errorMessage: ''
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
        return (
            <div>
                <InputFull
                    text=""
                    type="email"
                    width="100%"
                    name="account"
                    className="input-account"
                    id="individual-account"
                    ref="account"
                    data-name="account"
                    placeholder={message.global.input.taobaoBuyerAccount}
                    validate={{require: message.global.errorMessage.require}}>
                </InputFull>
                <InputFull
                    type="password"
                    text=""
                    name="password"
                    className="input-password"
                    id="individual-password"
                    width="100%"
                    ref="password"
                    data-name="password"
                    placeholder={message.global.input.password}
                    validate={{require: message.global.errorMessage.require}}>
                </InputFull>
                <ErrorMessage>{this.props.errorMessage}</ErrorMessage>

                <div className="button-link-big" onClick={this._touchEnd}>
                    <Button
                        material-button
                        tracking={this.props.tracking}
                        text={this.props.buttonText}>
                    </Button>
                </div>
            </div>
        );
    }
});
module.exports = TaobaoBuyerAccountPassword;
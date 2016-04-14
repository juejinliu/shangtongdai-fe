/**
 * @file 信用卡与淘宝买家图片验证码弹窗
 * @auther Created by malin on 15/6/9.
 */
var React = require('react'),
    Button = require('./../../component/button'),
    formCheck = require('./../../form/formCheck'),
    InputFull = require('./../../form/inputFull'),
    message = require('./../../messageConfig');

let CreditcardCheckcode = React.createClass({
    getDefaultProps() {
        return {
            onClick: message.global.errorMessage.errorFunction,
            checkCodeText: message.global.errorMessage.errorButton,
            isCheckcodeShow: false,
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
        return (
            this.props.isCheckcodeShow ?
                <div>
                    <div className="center-text">
                        <img height='40' src={this.props.imgSrc}/>
                    </div>
                    <div className="creditcard-popup-input">
                        <InputFull
                            text=""
                            type="text"
                            width="100%"
                            name="checkCode"
                            className="input-yan"
                            ref="checkCode"
                            data-name="checkCode"
                            placeholder={message.global.input.verification}
                            id="individual-checkCode"
                            validate={{require: message.global.errorMessage.verification}}>
                        </InputFull>
                    </div>

                    <div className="button-link-big" onClick={this._touchEnd}>
                        <Button
                            material-button
                            tracking={this.props.tracking}
                            text={this.props.checkCodeText}
                            style={{background: '#2484DF'}}></Button>
                    </div>
                </div> : null
        );
    }
});
module.exports = CreditcardCheckcode;
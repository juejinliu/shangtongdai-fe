/**
 * @file 信用卡与淘宝买家短信验证弹窗
 * @auther Created by malin on 15/6/9.
 */
var React = require('react'),
    message = require('./../messageConfig');

var successTipTimeOutValue = 0;

let SuccessTipPopup = React.createClass({
    getDefaultProps() {
        return {
            isSuccessShow: false,
            callback: ''
        };
    },

    componentWillReceiveProps(next) {
        this.setState({
            isSuccessShow: next.isSuccessShow
        });
    },

    getInitialState() {
        return {
            isSuccessShow: this.props.isSuccessShow
        };
    },


    componentWillUnmount() {
        if (successTipTimeOutValue) {
            clearTimeout(successTipTimeOutValue);
        }
    },

    componentDidUpdate() {
        if (this.state.isSuccessShow) {
            successTipTimeOutValue = setTimeout(() => {
                this.props.callback && this.props.callback();
            }, 1000);
        }
    },

    render() {
        let styleLoading = {
            width: '80%',
            margin: '10%',
            display: 'block'
        };
        let styleProgress = {
            textAlign: 'center',
            marginTop: '20px',
            fontSize: '20px'
        };

        return (
            this.state.isSuccessShow ?
                <div style={styleLoading}>

                    <div className="success-tip-pic"></div>
                    <br />

                    <div style={styleProgress}>{message.global.popup.success}</div>
                    <br />
                </div> : null
        );
    }
});
module.exports = SuccessTipPopup;
/**
 * @file 信用卡与淘宝买家短信验证弹窗
 * @auther Created by malin on 15/6/9.
 */
var React = require('react'),
    message = require('./../../messageConfig');

let CreditcardLoading = React.createClass({
    getDefaultProps() {
        return {
            isLoadingShow: false
        };
    },

    render() {
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
        return (
            this.props.isLoadingShow ?
                <div style={styleLoading}>
                    <img height="99" src={message.individualCredit.loadingImgLink} style={styleImage}/>
                    <br />

                    <div style={styleProgress}>{message.individualCredit.loadingText}</div>
                    <br />
                </div> : null
        );
    }
});
module.exports = CreditcardLoading;
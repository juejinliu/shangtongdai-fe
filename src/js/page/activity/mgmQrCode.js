/**
 * Created by qijiao on 15/12/16.
 */

var React = require('react');
var MgmQRCode = React.createClass({
    render() {
        return (
            <div className="qr-page">
                <div className="banner-div">
                    <div className="banner-1"></div>
                </div>
                <div className="box">
                    <p className="title-1">暂不支持手机参加哟</p>
                    <p className="title-2">请在电脑上打开链接进行抽奖</p>
                </div>
                <div className="last-div">
                    <div className="banner-2"></div>
                </div>
            </div>
        );
    }
});

module.exports = MgmQRCode;

/**
 * Created by malin on 15/6/9.
 */

var React = require('react'),
    {Link} = require('react-router'),
    AppData = require('./../component/appData'),
    Logo = require('../component/logo'),
    Customer = require('./../component/customer'),
    Banner = require('../component/banner');

const stdApi = AppData.api();

const invCodeApi = stdApi.invCodeApi;
let BonusMy = React.createClass({
    getInitialState() {
        return {
            name: 'machenlin',
            url: ''
        };
    },
    componentDidMount() {
        let self = this;
        $.ajax({
            'url': invCodeApi,
            'type': 'get',
            'dataType': 'jsonp',
            'jsonp': 'callback',
            'data': {_: (new Date).getTime()},
            success: function (json) {
                try {
                    self.setState(
                        {
                            name: json.code,
                            url: json.qrcode
                        });

                } catch (ex) {
                    alert('请检查您的网络或稍后再试。');
                }

            },
            error: function () {
                alert('请检查您的网络或稍后再试。');
            }
        });
    },
    render() {
        return (
            <div className="bonus-my">
                <Logo></Logo>
                <Link to={{pathname: 'bonus-package'}}>
                    <Banner
                        style={{background: 'url(' + 'http://static.qiangxianhua.com/file/T1St_TBvWT1RCvBVdKxCtF.png)'}}></Banner>
                </Link>

                <div className="width85">
                    <h4>方式一：</h4>

                    <p>让您的好友打开微信，扫描下方二维码，即可成功邀请。</p>

                    <h4>方式二：</h4>

                    <div className="erweima">
                        <img src={this.state.url} width="100%" height="100%"/>
                    </div>
                    <p>点击图片，发送给好友，好友长按二维码注册，即可成功邀请。</p>

                    <h4>方式三：</h4>

                    <p>您的专属邀请码：
                        <span className="name">{this.state.name}</span>
                    </p>

                    <p>分享您的专属邀请码给好友，好友注册商通贷账号</p>

                </div>
                <Customer></Customer>
            </div>
        );
    }
});
module.exports = BonusMy;
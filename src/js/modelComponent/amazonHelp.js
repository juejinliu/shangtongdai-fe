/**
 * Created by malin on 15/5/15.
 */
var React = require('react');

var AmazonHelp = React.createClass({
    getInitialState: function () {
        return {
            url: 'https://developer.amazonservices.com'
        };
    },

    getUrl() {
        this.setState({
            url: event.target.value
        });
    },

    render() {
        let styleIsShow = {
            display: 'none'
        };
        if (this.props.isShow) {
            styleIsShow = {
                display: 'block'
            };
        }
        return (
            <div style={styleIsShow} className="model">
                <h2 className="text-center">添加亚马逊账号教程</h2>
                <div className="scroll">
                    <p>以下操作不会造成Amazon账户账户关联，请放心添加。</p>
                    <p className="blue-title">第一步：确认语言为英文</p>
                    <p>非美国账户的用户，在卖家中心-&gt;</p>
                    <p>   setting - accout info-&gt; Feed Processing Report Language中,</p>
                    <p>确认语言为English(us)，若不是，点击edit，</p>
                    <p>在新页面中选择English(US)并提交。</p>
                    <p className="blue-title">第二步：登录Amazon账户，找到对应信息</p>
                    <p>1.登录Amazon MWS，点击右侧Sign up for MWS按钮；</p>
                    <p>2.输入您的Amazon账户信息;</p>
                    <p>3.选择第一个选项"I want to access my own Amazon seller accout with MWS"，
                        点击Next按钮;</p>
                    <p>4，同意协议，下一步即可看到对应的信息。</p>
                    <p className="blue-title">第三步：填写信息</p>
                    <p>将Seller ID  AWS Access key ID Secret Key 三个信息黏贴到对应窗口，点击添加即可。</p>
                    <p className="text-center">立即获取Amazon信息</p>
                    <div className="text-center amazon-select">
                        <select onChange={this.getUrl}>
                            <option value="https://developer.amazonservices.com">美国账号</option>
                            <option value="https://developer.amazonservices.co.uk">英国账号</option>
                            <option value="https://developer.amazonservices.de">德国账号</option>
                            <option value="https://developer.amazonservices.fr">法国账号</option>
                            <option value="https://developer.amazonservices.jp">日本账号</option>
                            <option value="https://developer.amazonservices.com.cn">中国账号</option>
                            <option value="https://developer.amazonservices.ca">加拿大账号</option>
                            <option value="https://developer.amazonservices.it">意大利账号</option>
                        </select>
                        <a href={this.state.url} target="_blank">
                            点击获取
                        </a>
                    </div>

                </div>
                <div onClick={this.props.closePage} className="closePage">关闭</div>
            </div>
        );
    }
});
module.exports = AmazonHelp;

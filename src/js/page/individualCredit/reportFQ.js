/**
 * Created by malin on 15/6/9.
 */

var React = require('react'),
    Logo = require('./../../component/logo'),
    Button = require('./../../component/button'),
    Customer = require('./../../component/customer'),
    message = require('./../../messageConfig');


let ReportFQ = React.createClass({

    render() {
        return (
            <div className="creditcard">
                <Logo></Logo>

                <div className="bonus-fq">
                    <h2 className="bonus-fq-h2">常见问题</h2>

                    <div className="bonus-fq-list">
                        <h3 className="bonus-fq-h3">1. 什么是个人信用报告？</h3>

                        <p className="bonus-fq-p">个人信用报告记录了客户与银行之间发生的信贷交易的历史信息，只要客户在银行办理过信用卡、贷款、
                            为他人贷款担保等信贷业务，他在银行登记过的基本信息和账户信息就会进入个人征信系统，形成客户的信用报告。</p>
                    </div>
                    <div className="bonus-fq-list">
                        <h3 className="bonus-fq-h3">2. 如何查询个人信用信息？</h3>

                        <p className="bonus-fq-p">
                            用户注册或登录人行征信中心，并进行身份验证。若通过验证（一般在提交的第2天），平台会向用户发送含有身份验证码的短信。用户可在收到身份验证码的7天内，登录平台使用身份验证码查看查询结果。</p>
                    </div>
                    <div className="bonus-fq-list">
                        <h3 className="bonus-fq-h3">3. 使用个人信用信息服务平台的查询服务需要付费吗？</h3>

                        <p className="bonus-fq-p">目前通过征信中心网络查询是免费的。如果直接去人民银行柜台查询，则个人前2次免费，第3次开始收取25元/次。</p>
                    </div>
                    <div className="bonus-fq-list">
                        <h3 className="bonus-fq-h3">4. 注册时填写的手机号码错误、更换或遗忘怎么办？</h3>

                        <p className="bonus-fq-p">您可以登录人民银行征信中心官网使用“用户管理”－“手机号码修改”功能进行更改。</p>
                    </div>
                </div>
                <Customer></Customer>
            </div>
        );
    }
});
module.exports = ReportFQ;

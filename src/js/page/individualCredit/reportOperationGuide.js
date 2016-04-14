/**
 * Created by malin on 15/6/9.
 */

var React = require('react'),
    {Link} = require('react-router'),
    Logo = require('./../../component/logo'),
    Button = require('./../../component/button'),
    message = require('./../../messageConfig');


let ReportOperationGuide = React.createClass({

    getInitialState() {
        return {
            questionClass: ''
        };
    },

    componentDidMount() {
        this.setState({
            questionClass: $(document).height() > $(window).height() ? 'question' : 'bottom'
        });
    },

    render() {
        return (
            <div className="creditcard">
                <Logo></Logo>

                <div className="report-operation width90">
                    <h2 className="h2-title">
                        {message.individualCredit.titleReportOperationGuideButton}
                        <p className="report-operation-title-small">以下操作请在电脑上完成</p>
                    </h2>
                    <div className="report-operation-main">
                        <div className="report-operation-h3">
                            <div className="report-operation-aside-num">
                                1
                            </div>
                            <h3>注册</h3>
                        </div>
                        <div className="report-operation-line">

                            <p>-百度搜索：中国人民银行征信中心官网<span style={{opacity: '0.6'}}>(http://www.pbccrc.org.cn/)</span>
                            </p>

                            <p>-点击[核心业务-互联网个人信用信息服务平台]</p>

                            <p>-注册账号</p>
                        </div>
                        <div className="report-operation-h3">
                            <div className="report-operation-aside-num">
                                2
                            </div>
                            <h3>查询</h3>
                        </div>
                        <div className="report-operation-line">

                            <p>-登录征信中心</p>

                            <p>-点击左侧“信息服务-申请信用信息”</p>

                            <p>-选择验证方式(建议选择“数字证书”或“银行卡验证”)</p>

                            <p>-勾选第三项“个人信用报告”</p>
                        </div>

                        <div className="report-operation-h3">
                            <div className="report-operation-aside-num">
                                3
                            </div>
                            <h3>等待短信验证码</h3>
                        </div>
                        <div className="report-operation-line" style={{border: 'none'}}>

                            <p style={{color: 'rgb(239, 120, 138)'}}>-若验证成功，24小时后您将收到身份验证码短信</p>

                            <p style={{color: 'rgb(239, 120, 138)'}}>
                                <Link to={{pathname: 'individualCredit/creditcard-fq', query: {location: 'message'}}}
                                      style={{color: '#2484df'}}>(未收到短信？)</Link>，请于7日内再次回到本页面填写验证码。
                            </p>

                            <p>-若验证失败<Link to={{pathname: 'individualCredit/creditcard-fq', query: {location: 'solve'}}}
                                           style={{color: '#2484df'}}>（查看解决方法）</Link>，请尽快按上述步骤重新申请。
                            </p>
                        </div>
                        <div className={this.state.questionClass}>
                            <Link to={{pathname: 'individualCredit/report-fq'}} style={{color: '#2484df'}}>
                                <Button text={message.individualCredit.question}
                                        tracking={{'activity': 'creditcard','lmt-track-id': message.tracking.individualCredit.reportQuest}}>
                                    ></Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = ReportOperationGuide;

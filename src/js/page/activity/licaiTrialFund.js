/**
 * Created by qijiao on 15/11/06.
 */
var React = require('react'),
    Logo = require('./../../component/logo');

let LicaiTrialFund = React.createClass({

    render() {
        return (
            <div className="licai">
                <div className="trial2-content">
                    {
                        <Logo></Logo>

                    }

                    <div className="trial2-banner"></div>
                    <div className="dashed-border">
                        <p className="info-title">如何参与？</p>
                        活动期间，只要通过电脑在商通贷理财的官网购买理财产品就可以获得体验金。请通过电脑登录商通贷理财的官方网站<span className="red">https://shangdai.yixin.com/licai</span>，进入活动页阅读详细规则。
                    </div>
                    <div className="trial2-desc">
                        <p className="step info-title">体验金是什么？</p>
                        体验金是您通过本次活动获得的虚拟资金，您可以通过购买理财产品获得体验金，并兑换专属理财产品<span className="red">“吉祥如意”</span>，享受年化<span className="red">6.5%收益率</span>。您的体验金理财收益可提现，提现后体验金将自动失效。
                        <div className="trial-step"></div>
                    </div>
                    <div className="rule-container">
                        <div className="text-center">
                            <div className="rule-title info-title">活动规则</div>
                        </div>
                        <p className="rule rule-1">本次活动时间：2015年11月24日开始；</p>

                        <p className="rule rule-2">本次活动对象：所有的商通贷注册用户；</p>

                        <p className="rule rule-3">活动期间，购买“三阳开泰”、“六六大顺”和“年年有余”产品，送购买金额10倍的体验金；购买“开门大吉”产品，买多少，送多少体验金。例如：购买1万元“三阳开泰”产品（或“六六大顺”、“年年有余”），可获得10万元体验金；购买1万元“开门大吉”产品，可获得1万元体验金；</p>

                        <p className="rule rule-4">体验金可以兑换专属理财产品“吉祥如意”（6.5%，1天）。“吉祥如意”产品到期后，所产生的收益将会在2个工作日内达到您绑定的银行卡上。未兑换“吉祥如意”产品的体验金，在活动结束后，将自动收回；</p>

                        <p className="rule rule-5">活动期间，每个手机号、每个身份证号最多兑换1次。</p>
                    </div>
                    <div className="trial2-footer"></div>
                </div>
            </div>
        );
    }
});

module.exports = LicaiTrialFund;

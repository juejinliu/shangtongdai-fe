/**
 * Created by malin on 15/6/9.
 */

var React = require('react'),
    Logo = require('./../../component/logo'),
    Tracking = require('./../../lib/tracking'),
    Customer = require('./../../component/customer');

var BonusRuleWx = React.createClass({

    render() {

        return (
            <div className="share-rule">
                <Logo></Logo>

                <div className="share-rule-main mgm-special">
                    <h2 className="share-rule-h2">活动规则</h2>

                    <div className="share-rule-text">
                        <div className="share-rule-list">
                            <h3 className="share-rule-h3 l">谁是荐客：</h3>

                            <p className="share-rule-p">商通贷新老用户</p>
                        </div>

                        <div className="share-rule-list">

                            <h3 className="share-rule-h3 l">悬赏方式：</h3>

                            <p className="share-rule-p">分享您的专属邀请方式，被邀请人通过您的邀请完成有效申请，您即可获得赏金。</p>
                        </div>

                        <div className="share-rule-list">

                            <h3 className="share-rule-h3 l">赏金细则：</h3>

                            <p className="share-rule-p">被邀请人在悬赏期限内完成有效申请*，您即可获得对应赏金，赏金金额<b
                                className="share-rule-b">如下图。</b>
                            </p>
                        </div>
                        <div className="share-rule-money-table"></div>
                        <div className="share-rule-list">

                            <h3 className="share-rule-h3 l">领赏方式：</h3>

                            <p className="share-rule-p">
                                1.被邀请人在商通贷完成有效申请后的2个工作日内，我们会将您的赏金发放到您的账号中，您可以在“我的赏金”中查看。</p>

                            <p className="share-rule-p">2.赏金每满200元即可提现，提现后赏金会在2个工作日内到达您添加的银行卡中。</p>

                            <p className="share-rule-p">3.单月提现金额累积超过800元的部分需依照国家规定缴纳个人所得税，提款时我们会为您自动扣除。</p>
                        </div>
                        <p className="share-rule-red">*有效申请是指：用户完成全部商通贷申请流程（包括提交真实的店铺数据）且符合商通贷基本申请条件。</p>

                    </div>
                </div>
                <Customer></Customer>
            </div>
        );
    }
});
module.exports = BonusRuleWx;

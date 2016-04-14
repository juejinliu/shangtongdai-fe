/**
 * Created by malin on 15/6/9.
 */

var React = require('react'),
    Logo = require('../component/logo'),
    BonusNav = require('../component/bonus-nav'),
    AppData = require('../component/appData');
const {stdUserStatus} = AppData.api();
const {withdrawLimit=200} = stdUserStatus && stdUserStatus.mgmInfo;

let BonusFQ = React.createClass({
    render() {
        return (
            <div>
                <Logo></Logo>

                <div className="bonus-fq">
                    <h2 className="bonus-fq-h2">常见问题</h2>

                    <div className="bonus-fq-list">
                        <h3 className="bonus-fq-h3">如何获得佣金？</h3>

                        <p className="bonus-fq-p">在“邀请”栏目中任选一种或多种邀请方式分享给被邀请人，只要被邀请人通过您的邀请成功借款，您即可获得相应赏金。</p>
                    </div>
                    <div className="bonus-fq-list">
                        <h3 className="bonus-fq-h3">被邀请人需要满足什么条件我才可以获得佣金？</h3>

                        <p className="bonus-fq-p">
                            1.被邀请人未注册过商通贷账号；2.符合商通贷基本申请条件；3.完成商通贷的申请流程并提交相应店铺数据</p>
                    </div>
                    <div className="bonus-fq-list">
                        <h3 className="bonus-fq-h3">如何查看我的赏金？</h3>

                        <p className="bonus-fq-p">进入“钱包”即可看到您本月获得的赏金及提款账户余额。</p>
                    </div>
                    <div className="bonus-fq-list">
                        <h3 className="bonus-fq-h3">赏金能否提现？</h3>

                        <p className="bonus-fq-p">赏金每满{withdrawLimit}元即可提现。</p>
                    </div>
                    <div className="bonus-fq-list">
                        <h3 className="bonus-fq-h3">如何提现？</h3>

                        <p className="bonus-fq-p">
                            在“钱包”中，点击账户余额下方的“提现”按钮，并填写您要提现的金额以及银行需要的支付信息（真实姓名、身份证号、银行卡号等）即可。</p>
                    </div>
                    <div className="bonus-fq-list">
                        <h3 className="bonus-fq-h3">如果有多人邀请同一用户，赏金付给谁？</h3>

                        <p className="bonus-fq-p">以被邀请人点击注册商通贷账号的链接为准。</p>
                    </div>
                </div>
                <BonusNav index="3"></BonusNav>
            </div>
        );
    }
});
module.exports = BonusFQ;

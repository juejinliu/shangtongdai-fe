/**
 * Created by malin on 15/6/9.
 */

var React = require('react'),
    Logo = require('../component/logo'),
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
                        <h3 className="bonus-fq-h3">如何获得返现？</h3>

                        <p className="bonus-fq-p">点击[6秒赚钱]，生存专属海报，分享给电商好友，只要电商好友识别您海报中的二维码成功申请，您即可获得相应返现。</p>
                    </div>
                    <div className="bonus-fq-list">
                        <h3 className="bonus-fq-h3">被邀请人需要满足什么条件我才可以获返现？</h3>

                        <p className="bonus-fq-p">
                            1.被邀请人未注册过商通贷账号；2.符合商通贷基本申请条件；3.完成商通贷的申请流程并提交相应店铺数据</p>
                    </div>
                    <div className="bonus-fq-list">
                        <h3 className="bonus-fq-h3">如何查看我的返现？</h3>

                        <p className="bonus-fq-p">进入[我的钱包]即可看到您本月获得的返现及账户余额。</p>
                    </div>
                    <div className="bonus-fq-list">
                        <h3 className="bonus-fq-h3">返现能否提现？</h3>

                        <p className="bonus-fq-p">返现每满{withdrawLimit}元即可提现。</p>
                    </div>
                    <div className="bonus-fq-list">
                        <h3 className="bonus-fq-h3">如何提现？</h3>

                        <p className="bonus-fq-p">
                            在[我的钱包]中，点击账户余额下方的“提现”按钮，并填写您要提现的金额以及银行需要的支付信息（真实姓名、身份证号、银行卡号等）即可。</p>
                    </div>
                    <div className="bonus-fq-list">
                        <h3 className="bonus-fq-h3">如果有多人邀请同一用户，赏金付给谁？</h3>

                        <p className="bonus-fq-p">以被邀请人点击注册商通贷账号的链接为准。</p>
                    </div>
                </div>

            </div>
        );
    }
});
module.exports = BonusFQ;

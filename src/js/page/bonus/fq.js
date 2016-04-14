/**
 * Created by malin on 15/6/9.
 */

var React = require('react'),
    Logo = require('../../component/logo'),
    BonusNav = require('./../../component/bonus-nav'),
    Customer = require('./../../component/customer');

var BonusFQWx = React.createClass({
    render() {
        return (
            <div>
                <Logo></Logo>

                <div className="bonus-fq mgm-special">
                    <h2 className="bonus-fq-h2">红包使用规则</h2>

                    <div className="bonus-fq-list">
                        <h3 className="bonus-fq-h3">什么是红包?</h3>

                        <p className="bonus-fq-p">红包是商通贷给新老客户的福利，还款时可以抵扣息费。</p>
                    </div>
                    <div className="bonus-fq-list">
                        <h3 className="bonus-fq-h3">我可以多次领取红包吗？</h3>

                        <p className="bonus-fq-p">
                            一个账号只能领取一个红包，不能重复领取。</p>
                    </div>
                    <div className="bonus-fq-list">
                        <h3 className="bonus-fq-h3">如何查看红包？</h3>

                        <p className="bonus-fq-p">在微信菜单中，选择“我的商通贷”－“我的红包”，即可查看您获得的红包。</p>
                    </div>
                    <div className="bonus-fq-list">
                        <h3 className="bonus-fq-h3">如何使用红包？</h3>

                        <p className="bonus-fq-p">使用领取红包时所填写的手机号申请贷款。还款时勾选“使用红包”，在红包列表中选择您要使用的红包即可。</p>
                    </div>
                    <div className="bonus-fq-list">
                        <h3 className="bonus-fq-h3">红包使用有限制吗？</h3>

                        <p className="bonus-fq-p">
                            可以抵扣息费，不可叠加使用，逾期还款不可使用。</p>
                    </div>
                    <div className="bonus-fq-list">
                        <h3 className="bonus-fq-h3">红包有效期多久？</h3>

                        <p className="bonus-fq-p">自获得红包开始，有效期2个月。</p>

                        <p className="bonus-fq-p r" style={{fontSize: '12px'}}>最终解释权归商通贷所有</p>
                    </div>
                </div>
                <Customer></Customer>
            </div>
        );
    }
});
module.exports = BonusFQWx;

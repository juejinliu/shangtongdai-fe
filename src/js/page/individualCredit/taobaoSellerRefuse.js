/**
 * Created by malin on 15/6/9.
 */

var React = require('react'),
    {Link} = require('react-router'),
    Logo = require('./../../component/logo'),
    Button = require('./../../component/button'),
    message = require('./../../messageConfig');

let TaobaoSellerRefuse = React.createClass({

    render() {
        return (
            <div className="creditcard">
                <Logo></Logo>

                <div className="width90 refuse">
                    <h2 className="h2-title">{message.individualCredit.titleTaobaoSellerRefuse}</h2>

                    <p>由于您账号的主要经营指标不符合要求，建议您返回继续添加其他商家账号。或者通过补充个人消费，证明您的个人消费能力及信用状况。</p>

                    <p className="small-text-p">
                        -个人消费，为店铺数据未达要求的卖家，提供了一个平等的借款渠道。
                    </p>

                    <p className="small-text-p">
                        -您只需提交信用卡账单、淘宝买家数据，即有机会获得贷款。
                    </p>

                    <Link to={{pathname: 'individualCredit/choose'}} className="button-link-big">
                        <Button
                            material-button
                            text={message.individualCredit.jumpIndividualCreditButton}
                            tracking={{'activity': 'creditcard','lmt-track-id': message.tracking.individualCredit.toChoose}}
                        ></Button>
                    </Link>
                </div>
                <Link to={{pathname: 'loan', query: {'taobaoRefuse': true}}} className="bottom">
                    <Button
                        tracking={{'activity': 'creditcard', 'lmt-track-id': message.tracking.individualCredit.toLoan}}
                    >{message.individualCredit.toLoan}</Button>
                </Link>
            </div>
        );
    }
});
module.exports = TaobaoSellerRefuse;

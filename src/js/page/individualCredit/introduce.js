/**
 * Created by malin on 15/6/9.
 */

var React = require('react'),
    {Link} = require('react-router'),
    Logo = require('./../../component/logo'),
    Button = require('./../../component/button'),
    message = require('./../../messageConfig');

let OthersIntroduce = React.createClass({

    render() {
        let unixTime = Math.round(new Date().getTime() / 1000);

        return (
            <div className="creditcard">
                <Logo></Logo>

                <div className="introduce width90">
                    <h2 className="h2-title">{message.individualCredit.titleIntroduce}</h2>
                    {
                        //15-12-01-20-00-00     15-12-01-22-05-00
                        (1448971200 < unixTime && unixTime < 1448980500) ?
                            <p style={{color: 'rgb(239, 120, 138)', margin: '20px 0'}}>
                                12月1日晚8点30起，系统将进行更新维护，预计持续2小时。期间将无法添加其他平台账户，敬请留意</p>
                            : null
                    }
                    <p>即使您经营的平台尚未被商通贷所支持（如蘑菇街、美丽说、1号店等），同样可以通过提交个人消费信用数据，享受商通贷的极速借款服务。</p>
                    <br/>

                    <div className="introduce-list">
                        <p>流程：</p>
                        <ul>
                            <li>1. 验证店铺</li>
                            <li>2. 添加信用卡账单 > 添加淘宝买家数据 > 人行征信报告(可选)</li>
                            <li>3. 成功</li>
                        </ul>
                    </div>
                    <Link to={{pathname: 'individualCredit/verify-shop'}} className="button-link-big">
                        <Button
                            material-button
                            text={message.global.button.next}
                            tracking>
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
});
module.exports = OthersIntroduce;

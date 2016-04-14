/**
 * Created by malin on 15/6/9.
 */

var React = require('react'),
    {Link} = require('react-router'),
    Logo = require('./../../component/logo'),
    Button = require('./../../component/button'),
    message = require('./../../messageConfig');


let ReportIntroduce = React.createClass({

    render() {
        return (
            <div className="creditcard">
                <Logo></Logo>

                <div className="report-introduce width90">
                    <h2 className="h2-title">{message.individualCredit.titleReport}</h2>

                    <p >
                        个人信用报告是征信机构出具的记录您过去信用信息的文件，展示您的个人信用的基本情况，包括信贷记录、部分公共信息和查询记录的明细信息。
                    </p>

                    <div className="introduce-list">
                        <ul>
                            <li>-目前查询免费</li>
                            <li>-过往数据显示，提交信用报告后借款额度平均有40%－60%的涨幅</li>
                        </ul>
                    </div>
                    <Link to={{pathname: 'individualCredit/report-guide'}} className="button-link-big">
                        <Button
                            material-button
                            text={message.individualCredit.viewOperationGuideButton}
                            tracking
                            ></Button>
                    </Link>
                    <Link to={{pathname: 'individualCredit/report'}} className="button-link-big">
                        <Button style={{background: 'transparent', border: '1px solid #2484DF', color: '#2484DF'}}
                                text={message.individualCredit.hasGotCodeButton}
                                material-button
                                tracking
                            ></Button>
                    </Link>

                </div>
            </div>
        );
    }
});
module.exports = ReportIntroduce;

/**
 * Created by malin on 15/6/9.
 */

var React = require('react'),
    {Link} = require('react-router'),
    AppData = require('./../../component/appData'),
    Logo = require('./../../component/logo'),
    Button = require('./../../component/button'),
    message = require('./../../messageConfig');

const {stdApi} = AppData.api();

const [estimateApi] = [stdApi.estimateApi];

let CreditcardChoose = React.createClass({
    getInitialState() {
        return {
            creditcard: [],
            taobaoBuyer: [],
            report: []
        };
    },

    componentDidMount() {
        this.subAccount();          //获取所有可用个人征信子账号，获取后再分出信用卡，淘宝，报告 rebuildArr
    },

    subAccount() {
        let self = this;
        $.ajax({
            'url': estimateApi,
            'type': 'get',
            'dataType': 'jsonp',
            'data': {group: 'all', _: (new Date).getTime()},
            success(data) {
                try {
                    let json = data.result;
                    for (let v of json) {
                        if (v.platform === 'INDIVIDUALCREDIT') {
                            let details = JSON.parse(v.details);
                            let subAccount = details && details['sub_accounts'];
                            self.rebuildArr(subAccount);
                        }
                    }
                } catch (ex) {
                    console.log(ex);
                }
            }
        });
    },

    rebuildArr(sub = []) {
        let subAccount = sub;
        let creditcard = [];
        let taobaoBuyer = [];
        let report = [];
        if (subAccount) {
            for (let v of subAccount) {
                if (v.isValid) {
                    if (v.platform === message.individualCredit.creditcard) {
                        creditcard.push(v);
                    } else if (v.platform === message.individualCredit.taobaoBuyer) {
                        taobaoBuyer.push(v);
                    } else {
                        report.push(v);
                    }
                }
            }
        }
        this.setState({
            creditcard: creditcard,
            taobaoBuyer: taobaoBuyer,
            report: report
        });
    },

    render() {
        let {creditcard, taobaoBuyer, report} = this.state;
        let getEle = (arr) => {
            if (arr.length) {
                return arr.map((v, i) => {
                    return <span key={i}>{v.account}</span>;
                });
            }
        };
        let creditcardEle = getEle(creditcard);
        let taobaoBuyerEle = getEle(taobaoBuyer);
        //let reportEle = getEle(report);

        let unixTime = Math.round(new Date().getTime() / 1000);

        return (
            <div className="creditcard">
                <Logo></Logo>
                {
                    //15-12-01-20-00-00     15-12-01-22-05-00
                    (1448971200 < unixTime && unixTime < 1448980500) ?
                        <p style={{color: 'rgb(239, 120, 138)', margin: '20px 5%'}}>
                            12月1日晚8点30起，系统将进行更新维护，预计持续2小时。期间将无法添加其他平台账户，敬请留意</p>
                        : null
                }
                <div style={{height: '10px', background: '#ffffff'}}></div>
                <div className="choose">
                    <ul className="choose-ul">
                        <li className="choose-li">
                            <Link to={{pathname: 'individualCredit/creditcard'}}>
                                <Button
                                    tracking={{'activity': 'creditcard','lmt-track-id': message.tracking.individualCredit.creditcardBtnChoose}}>
                                    <div style={{display: 'table', width: '100%'}}>
                                        <div className="choose-div">
                                            <h5>信用卡账单</h5>
                                            {
                                                creditcard.length ?
                                                    <div>
                                                        <p>已添加账户</p>
                                                        {creditcardEle}
                                                    </div>
                                                    :
                                                    <span>暂未添加</span>
                                            }
                                        </div>
                                        <div className="choose-add-outer">
                                            <div className="choose-add"></div>
                                            {
                                                creditcard.length ?
                                                    <p>继续添加</p>
                                                    :
                                                    <p>去添加</p>
                                            }
                                        </div>
                                    </div>
                                </Button>
                            </Link>
                        </li>
                        <li style={{height: '4px', marginLeft: '-5%', width: '110%', background: '#ffffff'}}></li>
                        <li className="choose-li">
                            {
                                creditcard.length ?
                                    <Link to={{pathname: 'individualCredit/taobao'}}>
                                        <Button
                                            tracking={{'activity': 'creditcard','lmt-track-id': message.tracking.individualCredit.taobaoBuyerBtnChoose}}>
                                            <div style={{display: 'table', width: '100%'}}>

                                                <div className="choose-div">
                                                    <h5>淘宝买家</h5>
                                                    {
                                                        taobaoBuyer.length ?
                                                            <div>
                                                                <p>已添加账户</p>
                                                                {taobaoBuyerEle}
                                                            </div>
                                                            :
                                                            <span>暂未添加</span>
                                                    }
                                                </div>
                                                <div className="choose-add-outer">
                                                    <div className="choose-add"></div>
                                                    {
                                                        taobaoBuyer.length ?
                                                            <p>继续添加</p>
                                                            :
                                                            <p>去添加</p>
                                                    }
                                                </div>

                                            </div>
                                        </Button>
                                    </Link> :
                                    <div style={{display: 'table', width: '100%', opacity: '0.3'}}>
                                        <div className="choose-div">
                                            <h5>淘宝买家</h5>
                                            <span>暂未添加</span>
                                        </div>
                                        <div className="choose-add-outer">
                                            <div to="taobaoBuyer" className="choose-add"></div>
                                            <p>去添加</p>
                                        </div>
                                    </div>

                            }

                        </li>
                        <li style={{height: '4px', marginLeft: '-5%', width: '110%', background: '#ffffff'}}></li>
                        <li className="choose-li">
                            {
                                taobaoBuyer.length ?
                                    <Link to={{pathname: 'individualCredit/report-introduce'}}>
                                        <Button
                                            tracking={{'activity': 'creditcard','lmt-track-id': message.tracking.individualCredit.reportBtnChoose}}>
                                            <div style={{display: 'table', width: '100%'}}>
                                                <div className="choose-div">
                                                    <h5>个人信用报告</h5>
                                                    {
                                                        report.length ?
                                                            <span>已添加</span> :
                                                            <span>暂未添加</span>
                                                    }
                                                </div>
                                                <div className="choose-add-outer">
                                                    <div className="choose-add"></div>
                                                    <p>去添加</p>
                                                </div>
                                            </div>
                                        </Button>
                                    </Link> :
                                    <div style={{display: 'table', width: '100%', opacity: '0.3'}}>
                                        <div className="choose-div">
                                            <h5>个人信用报告</h5>
                                            <span>暂未添加</span>
                                        </div>
                                        <div className="choose-add-outer">
                                            <div className="choose-add"></div>
                                            <p>去添加</p>
                                        </div>
                                    </div>
                            }
                        </li>
                        <li style={{height: '4px', marginLeft: '-5%', width: '110%', background: '#ffffff'}}></li>
                    </ul>
                </div>
            </div>
        );
    }
});
module.exports = CreditcardChoose;

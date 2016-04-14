/**
 * @file 信用卡与淘宝买家短信验证弹窗
 * @auther Created by malin on 15/6/9.
 */
var React = require('react'),
    {Link} = require('react-router'),
    message = require('./../../messageConfig');

let IndividualSubAccountList = React.createClass({

    getDefaultProps() {
        return {
            subAccount: {},
            isSubAccountShow: true
        };
    },

    rebuildArr() {
        let subAccount = this.props.subAccount['sub_accounts'];
        let accountList = [];
        let creditcard = [];
        let taobaoBuyer = [];
        let report = [];
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
        if (!creditcard.length) {
            creditcard[0] = {
                account: '',
                platform: message.individualCredit.creditcard,
                text: '未添加',
                color: '#2484DF'
            };
        }
        if (!taobaoBuyer.length) {
            taobaoBuyer[0] = {
                account: '',
                platform: message.individualCredit.taobaoBuyer,
                text: '未添加',
                color: '#2484DF'
            };
        }

        accountList = [].concat(creditcard, taobaoBuyer, report);
        // HACK 无法获取到高度
        setTimeout(() => {
            let father = $('.sub-account').parents('.del-list');
            if (this.props.isSubAccountShow) {
                father.height(50 * (accountList.length + 1) + 'px');
            } else {
                father.height('50px');
            }
        }, 10);
        console.log(accountList);
        return accountList;
    },

    render() {
        let accountList = this.rebuildArr();
        let isAddedAccount = false;
        let divs = accountList.map((value, index) => {
            let subAccountName = '';
            if (value.platform === message.individualCredit.creditcard) {
                if (value.account) {
                    subAccountName = message.individualCredit.estimateCreditcardOK;
                } else {
                    subAccountName = message.individualCredit.estimateCreditcard;
                    isAddedAccount = true;
                }
            } else if (value.platform === message.individualCredit.taobaoBuyer) {
                if (value.account) {
                    subAccountName = message.individualCredit.estimateTaobaoBuyerOK;
                } else {
                    subAccountName = message.individualCredit.estimateTaobaoBuyer;
                    isAddedAccount = true;
                }
            } else {
                if (value.account) {
                    subAccountName = message.individualCredit.estimateReportOK;
                } else {
                    subAccountName = message.individualCredit.estimateReport;
                    isAddedAccount = true;
                }
            }
            let listEle = <div className="li sub-account" style={{top: 100 * (index + 1) + '%'}} key={index}>
                {isAddedAccount ?
                    <p className="sub-account-name">
                        {subAccountName}
                    </p> :
                    <p className="sub-account-name" style={{color: '#8c8c8c'}}>
                        {subAccountName}
                    </p>
                }

                <div className="accountDiv">
                    <p className="money">
                        {value.text || '添加成功'}
                    </p>

                    <p className="account" style={{color: value.color}}>{value.account}</p>
                </div>
            </div>;
            return (
                isAddedAccount ?
                    <Link to={{pathname: 'individualCredit/choose'}} key={index}>
                        {listEle}
                    </Link> :
                    <div key={index}>
                        {listEle}
                    </div>
            );
        });
        return (
            <div>
                {divs}
            </div>
        );
    }
});
module.exports = IndividualSubAccountList;
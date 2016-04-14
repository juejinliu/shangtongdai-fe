/**
 * Created by malin on 15/5/7.
 */
var React = require('react'),
    Customer = require('./../component/customer'),
    $ = require('../lib/zepto'),
    Logo = require('./../component/logo');
let LoanFail = React.createClass({
    render() {
        return (
            <div className="loan-fail">
                <Logo></Logo>
                <p style={{margin: '30px auto 20px'}}>当前审核进度</p>
                <h2 style={{margin: '0 auto 35px'}}>审核未通过</h2>
                <p>商通贷很抱歉的通知您，您的综合评分未</p>
                <p>达到审批标准，请一个月后再进行尝试。</p>
                <Customer></Customer>
            </div>
        );
    }
});
module.exports = LoanFail;




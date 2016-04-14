/**
 * Created by malin on 15/5/7.
 */
var React = require('react'),
    {Link} = require('react-router'),
    Customer = require('./../component/customer'),
    $ = require('../lib/zepto'),
    Logo = require('./../component/logo');
let LoanArmored = React.createClass({
    render() {
        return (
            <div className="loan-armored">
                <Logo></Logo>
                <div className="car"></div>
                <h2>运钞车正在路上</h2>
                <h2>请静候佳音</h2>
                <p className="notice">我们会通过短信和微信通知您放款结果</p>
                <Link to={{pathname: 'loanPlan'}} className="link" children="查看我的贷款 》"/>
                <Customer></Customer>
            </div>
        );
    }
});
module.exports = LoanArmored;




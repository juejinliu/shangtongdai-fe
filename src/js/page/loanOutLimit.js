/**
 * Created by malin on 15/5/7.
 */
var React = require('react'),
    {Link} = require('react-router'),
    Customer = require('./../component/customer'),
    $ = require('../lib/zepto'),
    Logo = require('./../component/logo');
let LoanOutLimit = React.createClass({
    render() {
        return (
            <div className="loan-fail">
                <Logo></Logo>
                <p style={{margin: '30px auto 20px'}}>当前审核进度</p>
                <h2 style={{margin: '0 auto 35px'}}>您的授信额度已用完</h2>
                <p>点击
                    <Link to={{pathname: 'estimate'}} style={{color: '#4C4CCE'}}>这里</Link>
                    增长额度</p>
                <p>添加多个账号，您的额度会更高</p>
                <Customer></Customer>
            </div>
        );
    }
});
module.exports = LoanOutLimit;




/**
 * Created by malin on 15/5/7.
 */
var React = require('react'),
    {Link} = require('react-router'),
    AppData = require('./../component/appData'),
    Customer = require('./../component/customer'),
    Status = require('./status'),
    Logo = require('./../component/logo');

let SuccessPage = React.createClass({
    render() {
            return (
                <div className="loan-over loan-page">
                    <Logo></Logo>
                    <Status text="恭喜您，审核已通过"></Status>
                    <div className="after">

                        <h5>后续操作</h5>
                        <div className="after-one">

                            <p>确认收款金额和借款期限</p>
                            <p>填写收款卡信息，等待收款</p>
                            <Link to={{pathname: 'loanConfirm'}} style={{color: '#4C4CCE'}}>现在就去确认金额</Link>
                        </div>
                    </div>
                    <Customer></Customer>
                </div>
            );
        }
});
module.exports = SuccessPage;

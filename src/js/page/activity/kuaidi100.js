/**
 * Created by gaoyang on 15/9/11.
 */
var React = require('react'),
    {Link} = require('react-router'),
    Tracking = require('./../../lib/tracking');

var Loan99 = React.createClass({
    toApply: function () {
        Tracking.trackEvent('click', {
            'activity': 'kuaidi100',
            'lmt-track-id': 'kuaidi100-apply-btn'
        });
    },

    toApplyByTel: function () {
        Tracking.trackEvent('click', {
            'activity': 'kuaidi100',
            'lmt-track-id': 'kuaidi100-tel-btn'
        });
    },

    render: function () {
        return (
            <div className="activity-partner kuaidi100">
                <div className="logo">
                </div>
                <div className="banner">
                </div>
                <a href="tel:4008181868" onClick={this.toApplyByTel} className="tel-btn">电话申请：4008-1818-68</a>

                <div className="large text-center">
                    不方便通话？
                </div>
                <div className="text-center">
                    添加电商平台账号，即可申请贷款
                </div>
                <Link to={{pathname: 'estimate'}} onClick={this.toApply} className="apply-btn text-center">
                    立即申请
                </Link>

                <div className="info">
                </div>
            </div>
        );
    }
});
module.exports = Loan99;

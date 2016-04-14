/**
 * Created by malin on 15/7/11.
 */
var React = require('react'),
    {Link} = require('react-router'),
    Tracking = require('./../../lib/tracking'),
    Button = require('./../../component/button'),
    isLogin = require('./../../component/isLogin');

var AdMgm = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState: function () {
        return {
            adLink: 'bonus-rule'
        };
    },

    componentWillMount() {
        var self = this;
        isLogin(self, 'no', function () {
            self.setState({
                adLink: 'bonus-share',
                loading: false
            });
        });
    },

    jumpTop() {
        Tracking.trackEvent('click', {
            'activity': 'mgm',
            'status': 'active-button',
            'lmt-track-id': 'share-page-top'
        });
    },

    jumpBottom() {
        Tracking.trackEvent('click', {
            'activity': 'mgm',
            'status': 'active-button',
            'lmt-track-id': 'share-page-bottom'
        });
    },

    render: function () {
        return (
            <div className="ad-mgm">
                <div className="ad-mgm-banner"></div>
                <div className="ad-mgm-btn">

                    <Link to={{pathname: 'estimate'}}>
                        <Button
                            material-button
                            tracking={{
                                'activity': 'mgm',
                                'status': 'active-button',
                                'lmt-track-id': 'share-page-top'
                                }}
                            text="立即申请"
                            >
                        </Button>
                    </Link>
                </div>
                <div className="ad-mgm-section-1"></div>
                <div className="ad-mgm-section-2-outer">
                    <h2 className="ad-mgm-section-h2">商通贷，只想给您更多......</h2>

                    <div className="ad-mgm-section-2"></div>
                </div>
                <div className="ad-mgm-section-3-outer">
                    <h2 className="ad-mgm-section-h2">商通贷，只想给您更省......</h2>

                    <div className="ad-mgm-section-3"></div>
                </div>
                <div className="ad-mgm-section-4-outer">
                    <h2 className="ad-mgm-section-h2">商通贷，只想给您更遍利......</h2>

                    <div className="ad-mgm-section-4"></div>
                    <ul className="ad-mgm-section-ul">
                        <li className="ad-mgm-section-li">
                            <p>预估</p>

                            <p>信用额度</p>
                        </li>
                        <li className="ad-mgm-section-li">
                            <p>注册</p>

                            <p>并填写申请表</p>
                        </li>
                        <li className="ad-mgm-section-li">
                            <p>审核通过后</p>

                            <p>选择借款方案</p>
                        </li>
                        <li className="ad-mgm-section-li">
                            <p>填银行卡信息</p>

                            <p>坐等资金到账</p>
                        </li>
                    </ul>
                    <div className="ad-mgm-btn ad-mgm-btn-bottom">
                        <Link to={{pathname: 'estimate'}}>
                            <Button
                                material-button
                                tracking={{
                                'activity': 'mgm',
                                'status': 'active-button',
                                'lmt-track-id': 'share-page-bottom'
                                }}
                                text="立即申请"
                                >
                            </Button>
                        </Link>
                    </div>
                </div>
                <div className="ad-mgm-section-5-outer">
                    <div className="ad-mgm-section-5"></div>
                </div>
                <div className="ad-mgm-section-6">
                    <Link to={{pathname: 'bonus-rule'}}>
                        <Button
                            material-button
                            tracking={{
                                'activity': 'mgm',
                                'status': 'active-button',
                                'lmt-track-id': 'share-page-banner-bottom'
                                }}
                            >
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }
});
module.exports = AdMgm;

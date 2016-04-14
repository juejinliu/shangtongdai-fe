/**
 * Created by gaoyang on 16/01/12.
 */

var React = require('react'),
    {Link} = require('react-router'),
    Tracking = require('./../../lib/tracking'),
    Button = require('./../../component/button'),
    isLogin = require('./../../component/isLogin'),
    AppData = require('./../../component/appData'),
    Css3Loading = require('./../../modelComponent/css3loading'),
    Popup = require('../../modelComponent/popup');

const {stdApi} = AppData.api();
const nianGuanBonusApi = stdApi.nianGuanBonusApi;
const activityType = 'nian-guan-mobile';
const msg = '您已经领取过红包';

let NianGuan = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            loading: true,
            isShowModal: false,
            ess: '',
            isSuccess: false
        };
    },

    componentDidMount() {
      this.setState({
          loading: false
      });
    },

    loginTracking() {
        Tracking.trackEvent('click', {'activity': activityType, 'lmt-track-id': 'need-login'});
    },

    tryTouchBonus() {
        var self = this;
        isLogin(self, '', function() {
           self.touchBonus();
        }, self.loginTracking);
    },

    touchBonus() {
        var self = this;
        $.ajax({
            'url': nianGuanBonusApi,
            'type': 'get',
            'data': {_: (new Date).getTime()},
            beforeSend() {
                self.setState({
                    loading: true
                });
            },
            success(res) {
                let json = JSON.parse(res);
                if (json.result == 'success') {
                    self.setState({
                        isSuccess: true,
                        isShowModal: true,
                        loading: false
                    });
                    Tracking.trackEvent('click', {'activity': activityType, 'lmt-track-id': 'show-modal-join-success'});
                } else {
                    var message = json.message;
                    if (message == '您已经参加过活动') {
                        message = msg;
                    }
                    self.setState({
                        ess: message,
                        isSuccess: false,
                        isShowModal: true,
                        loading: false
                    });
                    Tracking.trackEvent('click', {'activity': activityType, 'lmt-track-id': 'show-modal-join-fail'});
                }
            }
        });
    },

    render() {
        if (this.state.loading) {
            return <Css3Loading loading={this.state.loading}></Css3Loading>;
        }
        return (
            <div className="nianguan">
                <div className="banner"></div>
                <Button
                    material-button
                    tracking={{
                            'activity': activityType,
                            'status': 'active-button',
                            'lmt-track-id': 'button-top'
                        }}>
                    <span className="btn" onClick={this.tryTouchBonus}></span>
                </Button>
                <div className="flow"></div>
                <div className="bg-gray">
                    <div className="rule-title"></div>
                    <div className="rule-content">
                        <div className="rule rule1">
                            <span className="bold">本次活动时间：</span>
                            2016-1-14至2016-1-31。
                        </div>
                        <div className="rule rule2">
                            活动期间，所有商通贷注册用户均可领取666元抵息红包，可用于首期还款使用，即：新客户可用于首次贷款首期还款使用；
                            老客户可用于再次贷款首期还款使用。
                            <div className="example">举个例子，假如您是淘宝卖家，借5万元12期等额本息产品，月利率为0.72%，首月需还息费584.23元。参与本次活动，您首月息费全免！</div>
                        </div>
                        <div className="rule rule3">
                            <div className="bold">如何查看红包：</div>
                            进入“我的商通贷” —— “我的红包”，即可查看。
                        </div>
                        <div className="rule rule4">
                            <div className="bold">如何使用红包：</div>
                            还款时勾选“使用红包”，选中“666红包”，即可享受优惠。
                        </div>
                        <div className="rule rule5">
                            该红包不可与其他红包同时使用。
                        </div>
                        <div className="star-content">
                            *本次活动解释权归宜信商通贷所有
                        </div>
                    </div>
                </div>
                <Button
                    material-button
                    tracking={{
                            'activity': activityType,
                            'status': 'active-button',
                            'lmt-track-id': 'button-bottom'
                        }}>
                    <span className="btn" onClick={this.tryTouchBonus}></span>
                </Button>
                <Popup name="joinResult" width="90%" self={this} close show={this.state.isShowModal}
                       tracking={{
                            'activity': activityType,
                            'lmt-track-id': this.state.isSuccess ? 'close-modal-success' : 'close-modal-fail'
                       }}
                >
                    <div className="popup-body">
                        <div className="result-content">
                            <div className="success" style={{display: this.state.isSuccess ? 'block' : 'none'}}>
                                 <div className="content">恭喜您</div>
                                 <div className="content">获得<span className="red">666元</span>息费红包</div>
                                <Link className="apply-btn" to="estimate" params={{platformGroup: 'domestic'}}>
                                    <Button
                                        material-button
                                        tracking={{
                                            'activity': activityType,
                                            'status': 'active-button',
                                            'lmt-track-id': 'nian-guan-mobie-apply-success'
                                        }}
                                        text="立即使用"
                                        >
                                    </Button>
                                </Link>
                                 <div className="tip">（完成预估申请，还款时即可使用。）</div>
                            </div>
                            <div className="fail" style={{display: !this.state.isSuccess ? 'block' : 'none'}}>
                                <div className="content">抱歉！</div>
                                <div className="content">{this.state.ess}</div>
                                <Link className="apply-btn" to="estimate" params={{platformGroup: 'domestic'}}>
                                    <Button
                                        material-button
                                        tracking={{
                                            'activity': activityType,
                                            'status': 'active-button',
                                            'lmt-track-id': 'nian-guan-mobie-apply-fail'
                                        }}
                                        text={this.state.ess == msg ? '立即使用' : '立即申请'}
                                        >
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Popup>
            </div>
        );
    }

});

module.exports = NianGuan;

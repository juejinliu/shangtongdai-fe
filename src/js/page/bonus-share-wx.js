/**
 * Created by malin on 15/6/11.
 */
var React = require('react'),
    AppData = require('./../component/appData'),
    MomentModel = require('../modelComponent/moments-model'),
    Logo = require('./../component/logo'),
    Css3Loading = require('./../modelComponent/css3loading'),
    MobilePlatform = require('./../lib/mobilePlatform');

const {stdApi} = AppData.api();

const [applyableProductApi, newPeopleUrl, {isWechatUa}] = [
    stdApi.applyableProductApi,
    'https://shangdai.yixin.com/m/activity/rebate818?lmt-track-id=ad-augustRebate-bonus-share-wx',
    MobilePlatform
];

let isBined = '';
let Share = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            show: false,
            href: '',
            loading: true
        };
    },

    componentWillMount() {
        if (!isWechatUa) {
            this.context.router.push('bonus-share');
        } else {
            let self = this;
            $.ajax({
                'url': applyableProductApi,
                'type': 'get',
                'dataType': 'jsonp',
                'data': {_: (new Date).getTime()},
                success: function (json) {
                    isBined = json.isLoggedIn;
                    self.setState({
                        loading: false
                    });
                },
                error: function () {
                    isBined = true;
                    self.setState({
                        loading: false
                    });
                }
            });
        }
    },

    componentDidMount() {
        let url = encodeURIComponent(window.location.href);
        this.setState({
            href: 'https://shangdai.yixin.com/m#/reg-login/login?next=' + url
        });
        if (this.props.location.query.showModel) {
            this.showModel();
        }
    },

    showModel(e) {
        this.setState({
            show: true
        });
        if (e) {
            e.preventDefault();
        } else {
            return false;
        }
    },

    hideModel(e) {
        this.setState({
            show: false
        });
        if (e) {
            e.preventDefault();
        } else {
            return false;
        }
    },

    render() {
        if (this.state.loading) {
            return <Css3Loading loading={this.state.loading}></Css3Loading>;
        }
        return (
            <div className="bonus-share-wx">
                <Logo></Logo>

                <div className="bonus-header-pic">
                    {
                        isBined ?
                            <div className="bonus-share-btn" onClick={this.showModel}></div>
                            :
                            <a href={this.state.href} className="bonus-share-btn"></a>
                    }
                </div>
                <p className="bonus-header-info">
                    推荐好友成功借款后，即送100-200元不等红包
                </p>

                <p className="bonus-header-info">
                    多推多送，上不封顶
                </p>

                <div className="content-container">
                    <div className="border-top"></div>
                    <div className="recommend">
                        <div className="recommend-title title1"></div>
                        <div className="outter">
                            <div className="step step1">点击<span>“立即分享”</span>，分享专属链接</div>
                        </div>
                        <div className="arrow"></div>
                        <div className="outter">
                            <div className="step step2">好友点击<span>“专属链接”</span>，注册后申请借款</div>
                        </div>
                        <div className="arrow"></div>
                        <div className="outter">
                            <div className="step step3 people1">放款成功，推荐双方<span>获得红包</span></div>
                        </div>
                        <div className="recommend-title title2"></div>
                        <div className="outter">
                            <div className="step step1">点击<span>“我的邀请码”</span>，找到自己的专属邀请码</div>
                        </div>
                        <div className="arrow"></div>
                        <div className="outter">
                            <div className="step step2">好友注册商通贷，推荐人信息中<span>填写您的邀请码</span></div>
                        </div>
                        <div className="arrow"></div>
                        <div className="outter">
                            <div className="step step3">成功申请商通贷并放款，推荐双方<span>获红包</span></div>
                        </div>
                    </div>
                    <div className="border-bottom"></div>
                    <div className="bonus-info">
                        <div className="bonus-outter">
                            <h2 className="info-title">红包可以用来干什么？</h2>

                            <p className="info-detail">
                                红包可用来抵扣利息，邀请好友越多，利息减的越多。假设您是eBay卖家，借10万的12期等额本息产品，每月需还利息830元，只要成功邀请5名小伙伴，本月利息全免！</p>

                            <h2 className="info-title num2">红包的奖励规则？</h2>

                            <p className="info-detail">
                                只要被推荐人在商通贷申请借款，并成功放款，推荐人和被推荐人双方各获得100元红包奖励。如果被推荐人最终放款金额高于20万元，双方红包翻倍，即各获得200元红包奖励！</p>

                            <h2 className="info-title num3">除了红包，被推荐人还有什么好处？</h2>

                            <p className="info-detail">8月18日-8月24日，被邀请的新用户注册后可获”818返利节“活动资格，享受首期利息5折优惠，最高利息直降818元！如果被邀请人
                                不符合”818返利节“活动资格，则可获得和邀请人相同的友情红包，两种优惠不可同享。此外，被邀请人还可以获得好友特权，借款申请可
                                享受优先审批和专属额度提升。
                                <a href={newPeopleUrl} className="bonus-share-link"
                                   style={{display: isBined ? 'none' : 'block'}}>了解"818返利节"活动&gt;&gt;</a>
                            </p>

                            <h2 className="info-title num4">红包奖励有上限吗？</h2>

                            <p className="info-detail">多推多送，上不封顶。</p>

                            <h2 className="info-title num5">红包使用上限吗？</h2>

                            <p className="info-detail">有多少用多少，可叠加使用。</p>

                            <h2 className="info-title num6">红包有效期多久？</h2>

                            <p className="info-detail">自获得红包开始，有效期半年。</p>

                            <div className="bonus-title"></div>
                            <div className="moto"></div>
                        </div>
                    </div>
                    {
                        isBined ?
                            <div className="bonus-share-btn-bottom" onClick={this.showModel}></div>
                            :
                            <a href={this.state.href} className="bonus-share-btn-bottom"></a>
                    }
                    <p className="tail-info">本活动最终解释权归商通贷所有</p>
                </div>
                <MomentModel _onClick={this.hideModel} show={this.state.show}></MomentModel>
            </div>
        );
    }
});
module.exports = Share;
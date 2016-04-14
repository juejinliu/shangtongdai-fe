/**
 * Created by malin on 15/7/11.
 */
var React = require('react'),
    {Link} = require('react-router'),
    Cookie = require('react-cookie'),
    Button = require('./../../component/button'),
    isLogin = require('./../../component/isLogin'),
    AppData = require('./../../component/appData'),
    InputFull = require('./../../form/inputFull'),
    formCheck = require('./../../form/formCheck'),
    MomentModel = require('./../../modelComponent/moments-model'),
    Css3Loading = require('./../../modelComponent/css3loading'),
    FormValidator = require('./../../form/formValidator'),
    WxShareConfig = require('./../../wxShareConfig');

const {stdApi, stdUserStatus} = AppData.api();

var mgmOwnWechatAccount = stdUserStatus.mgmInfo ?
    (stdUserStatus.mgmInfo.ownWechatAccount || stdUserStatus.mgmInfo.account || '') :
    '';
var isHasMobile = stdUserStatus.mgmInfo && stdUserStatus.mgmInfo.account;
var mgmSendBonusApi = stdApi.mgmSendBonusApi;

if (FormValidator.phone(mgmOwnWechatAccount)) {
    let arr = mgmOwnWechatAccount.split('');
    mgmOwnWechatAccount = arr.slice(0, 3).concat('****', arr.slice(7, arr.length)).join('');
}

let MgmNew = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            loading: true,
            show: false,
            wxName: mgmOwnWechatAccount,
            step: 'one',
            code: '',
            qrcode: '',
            path: 'bonus/getCheckCode'
        };
    },

    componentWillMount() {
        if (AppData.mgm.phone) {
            isHasMobile = AppData.mgm.phone;
        }
        this.getUserStatus();
        //是否访问过我的赏金，如果访问过就略过验证码
        //var reFinancing = Cookie.load('reFinancing');
        let self = this;
        isLogin(self, 'no', function () {
            self.setState({
                path: 'bonus/financing'
            });
        });
    },


    getUserStatus() {
        if (!isHasMobile) {
            this.setState({
                step: 'one',
                loading: false
            });
        } else {
            let self = this;
            $.ajax({
                'url': mgmSendBonusApi,
                'type': 'get',
                'data': {_: (new Date).getTime()},
                beforeSend() {
                    self.setState({
                        loading: true
                    });
                },
                success(data) {
                    let json = JSON.parse(data);
                    try {
                        self.setState({
                            qrcode: json.qrcode,
                            code: json.code,
                            step: 'two',
                            loading: false
                        });
                        var currentHandler = 'MgmNew';
                        stdUserStatus.shareCode = window.code = json.code;
                        var defaultOption = WxShareConfig['defaultOption'],
                            momentsOption = defaultOption;
                        if (WxShareConfig[currentHandler]) {
                            $.extend(WxShareConfig['defaultOption'], WxShareConfig[currentHandler]);
                            var search = window.location.search.replace(/code=[^&]*&?/, '');
                            WxShareConfig['defaultOption'].link = window.location.protocol + '//' + window.location.host + window.location.pathname + '?code=' + json.code + search.replace('?', '&') + '#mgmNew-recive';
                            WxShareConfig['defaultOption'].complete = function () {
                                safely(function () {
                                    self.hideModel();
                                });
                            };
                            momentsOption = defaultOption = WxShareConfig['defaultOption'];
                        }
                        wx.ready(function () {
                            prepareShare(defaultOption, momentsOption);
                        });

                        //var search = window.location.search.replace(/code=[^&]*&?/, "");
                        //window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + '?code=' + json.code + search.replace('?', '&') + window.location.hash;
                    } catch (err) {
                        console.log(err);
                    }
                },
                error() {
                    //alert('请检查您的网络')
                }
            });
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

    _toForm() {
        let self = this;
        return formCheck(self);
    },

    getCode(e) {
        if (this._toForm()) {
            var self = this;
            var phoneValue = $('#phone').val();
            $.ajax({
                'url': mgmSendBonusApi,
                'type': 'get',
                'data': {phone: phoneValue || '', _: (new Date).getTime()},
                beforeSend() {
                    self.setState({
                        loading: true
                    });
                },
                success(data) {
                    let json = JSON.parse(data);
                    try {

                        if (!mgmOwnWechatAccount) {
                            mgmOwnWechatAccount = phoneValue;
                            var arr = mgmOwnWechatAccount.split('');
                            mgmOwnWechatAccount = arr.slice(0, 3).concat('****', arr.slice(7, arr.length)).join('');
                        }
                        self.setState({
                            qrcode: json.qrcode,
                            code: json.code,
                            step: 'two',
                            loading: false,
                            wxName: mgmOwnWechatAccount
                        });
                        var currentHandler = 'MgmNew';
                        window.std.stdUserStatus.shareCode = window.code = json.code;
                        var defaultOption = WxShareConfig['defaultOption'],
                            momentsOption = defaultOption;
                        if (WxShareConfig[currentHandler]) {
                            $.extend(WxShareConfig['defaultOption'], WxShareConfig[currentHandler]);
                            var search = window.location.search.replace(/code=[^&]*&?/, '');
                            WxShareConfig['defaultOption'].link = window.location.protocol + '//' + window.location.host + window.location.pathname + '?code=' + json.code + search.replace('?', '&') + '#mgmNew-recive';
                            WxShareConfig['defaultOption'].complete = function () {
                                safely(function () {
                                    self.hideModel()
                                });
                            };
                            momentsOption = defaultOption = WxShareConfig['defaultOption'];
                        }
                        wx.ready(function () {
                            prepareShare(defaultOption, momentsOption);
                        });
                        //var search = window.location.search.replace(/code=[^&]*&?/, "");
                        //window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + '?code=' + json.code + search.replace('?', '&') + window.location.hash;
                    } catch (err) {
                        console.log(err);
                    }
                },
                error() {
                    self.setState({
                        loading: false,
                        step: 'one'
                    });
                    alert('请检查您的网络或稍后再试！');
                }
            });

        }
        e.preventDefault();
    },

    sendBonusOneView() {
        return <div className="mgmNew-phone">
            <div className="mgmNew-phone-bg1"></div>
            <div className="mgmNew-phone-bg2">
                <div className="mgm-phone-input">
                    <InputFull
                        type="tel"
                        text="手机号"
                        validate={{phone: '请填写正确的手机号'}}
                        ref="phone-send"
                        name="phone"
                        className="input-no-icon"
                        data-name="phone-send"
                        defaultValue={AppData.mgm && AppData.mgm.phone}
                        id="phone"
                        placeholder="请输入您的手机号"
                        ></InputFull>
                </div>
                <div className="width85 mgmNew-red-button" onClick={this.getCode}>
                    <Button
                        material-button
                        tracking={{
                                'activity': 'mgmNew',
                                'status': 'active-button',
                                'lmt-track-id': 'mgmNew-stepOne-button'
                                }}
                        text="获取红包分享码"
                        >
                    </Button>
                </div>
                <div className="mgm-phone-bottom-pic">
                    <h1 className="mgm-phone-h1">
                        如何赚赏金？
                    </h1>

                    <div className="mgm-phone-howto"></div>
                    <div className="mgm-phone-table">
                        <p>步骤1:卖家领取红包</p>
                        <hr/>
                        <p>步骤2:卖家成功申请借款，您即可获得现金奖励</p>
                    </div>
                    <h1 className="mgm-phone-h1">
                        赏金金额？
                    </h1>

                    <div className="mgm-phone-table-1">
                        <span className="mgm-phone-table-1-line"></span>

                        <div>
                            <p className="l">本月邀请好友的数量</p>

                            <p className="l">单笔佣金收入</p>
                        </div>
                        <div>
                            <p className="l">1－20人</p>

                            <p className="l">50元</p>
                        </div>
                        <div>
                            <p className="l">21-100人</p>

                            <p className="l">100元</p>
                        </div>
                        <div>
                            <p className="l">超过100人</p>

                            <p className="l">200元</p>
                        </div>
                    </div>
                </div>

            </div>

        </div>;
    },

    sendBonusTwoView() {

        return <div className="mgmNew-money">
            <div className="mgmNew-money-header">
                <div className="mgmNew-money-header-name l">
                    <div className="mgmNew-money-header-name-icon"></div>
                    {this.state.wxName}
                </div>
                <Link className="mgmNew-money-header-package r" to={this.state.path}>
                    <Button
                        material-button
                        tracking={{
                                'activity': 'mgmNew',
                                'status': 'active-button',
                                'lmt-track-id': 'mgmNew-my-financing'
                                }}
                        >
                        <div className="mgmNew-money-header-money-icon"></div>
                        我的赏金
                    </Button>
                </Link>
            </div>
            <div className="mgmNew-money-main">
                <h2 className="mgmNew-money-main-h2">
                    ①&nbsp;微信送红包
                </h2>

                <div className="mgmNew-money-main-package">
                    <div className="mgmNew-money-main-package-pic">
                        <p className="mgmNew-money-main-name">{this.state.wxName}的红包</p>

                        <p className="mgmNew-money-main-money">随机红包</p>

                        <p className="mgmNew-money-main-money">最高2000元</p>
                    </div>

                    <h3 className="mgmNew-money-main-tips">
                        用户成功领取您的红包即视为您的推荐
                        <p style={{color: '#ff0000'}}>发出越多，收益越高</p>
                    </h3>


                </div>
                <div className="width85 mgmNew-red-button" onClick={this.showModel}>
                    <Button
                        material-button
                        tracking={{
                                'activity': 'mgmNew',
                                'status': 'active-button',
                                'lmt-track-id': 'mgmNew-share-button'
                                }}
                        text="做土豪发红包"
                        >
                    </Button>
                </div>
                <div className="mgmNew-money-main-notice">
                    <b>获得赏金后我们会第一时间通知您</b>
                </div>
                <h2 className="mgmNew-money-main-h2">
                    ②&nbsp;当面送红包
                </h2>

                <div className="mgmNew-erweima">
                    <img src={this.state.qrcode} alt="二维码无法显示"/>
                </div>
                <p className="center-text">用户扫描二维码</p>

                <p className="center-text">立即领取红包</p>

                <h2 className="mgmNew-money-main-h2">
                    ③&nbsp;大家一起来赚钱
                </h2>

                <p className="center-text mgmNew-step3-text">邀请好友一起成为推荐人，一起赚钱吧</p>

                <Link className="width85 mgmNew-red-button" to="mgmNew-peer">
                    <Button
                        material-button
                        tracking={{
                                'activity': 'mgmNew',
                                'status': 'active-button',
                                'lmt-track-id': 'mgmNew-toPeer-button'
                                }}
                        text="喊好友来赚钱"
                        >
                    </Button>
                </Link>

                <Link to={{pathname: 'rule'}} className="mgmNew-money-rule-button center-text">
                    <Button
                        material-button
                        tracking={{
                                'activity': 'mgmNew',
                                'status': 'active-button',
                                'lmt-track-id': 'mgmNew-stepTwo-rule'
                                }}
                        text="活动规则？"
                        >
                    </Button>
                </Link>

                <p className="center-text" style={{marginBottom: '10px'}}>
                    <Link to={{pathname: 'mgm'}} style={{color: 'rgb(82, 82, 245)'}}>
                        商通贷是什么？
                    </Link>
                </p>

            </div>

        </div>;
    },

    render() {
        if (this.state.loading) {
            return <Css3Loading loading={this.state.loading}></Css3Loading>;
        }
        var step = this.state.step,
            ele = '';
        if (step === 'one') {
            ele = this.sendBonusOneView();
        } else {
            ele = this.sendBonusTwoView();
        }
        return (
            <div className="mgmNew">
                {ele}
                <MomentModel _onClick={this.hideModel} show={this.state.show}></MomentModel>
            </div>
        );
    }
});
module.exports = MgmNew;

/**
 * Created by malin on 15/7/11.
 */
var React = require('react'),
    {Link} = require('react-router'),
    Button = require('./../../component/button'),
    InputFull = require('./../../form/inputFull'),
    AppData = require('./../../component/appData'),
    formCheck = require('./../../form/formCheck'),
    Css3Loading = require('./../../modelComponent/css3loading'),
    WxShareConfig = require('./../../wxShareConfig');

const {stdApi, stdUserStatus} = AppData.api();

const shareWechatHeadImg = stdUserStatus.mgmInfo.shareWechatHeadImg || 'http://static.yixin.com/file/T19NdTBgZv1RCvBVdKjKEG.png';
const shareWechatNickname = stdUserStatus.mgmInfo && (stdUserStatus.mgmInfo.shareWechatNickname || stdUserStatus.mgmInfo.shareMobile);
var mgmHasGotBonus = stdUserStatus.mgmInfo && stdUserStatus.mgmInfo.hasGotBonus;
const account = stdUserStatus.mgmInfo && stdUserStatus.mgmInfo.account;
const mgmOpenBonusApi = stdApi.mgmOpenBonusApi;
const isCodeValid = stdUserStatus.mgmInfo && stdUserStatus.mgmInfo.isCodeValid;

let MgmNewRecive = React.createClass({

    getInitialState() {
        return {
            loading: true,
            bonusMoney: 0,
            step: 'one',
            sendName: shareWechatNickname,
            say: '亲，商通贷最近在做活动，狂送息费红包，我帮你抢了个，拿好不谢！',
            bottomButtonShow: false
        };
    },

    componentWillMount() {
        var search = window.location.search.split('&')[0];
        if (!isCodeValid || search.indexOf('code=') === -1) {
            window.location.href = window.location.protocol + '//' + window.location.host + window.location.pathname;
        }
    },
    componentDidMount() {
        if ((AppData.historyUrl[2] === (window.location.href + 'mgm-recive-step2')) || mgmHasGotBonus) {
            this._getbonusMoney();
        } else {
            this.setState({
                loading: false
            });
        }
    },


    _toForm() {
        var self = this;
        return formCheck(self);
    },

    touchBonus(e) {
        if ($('#phone').length) {
            if (this._toForm()) {
                this._getbonusMoney();
            }
        } else {
            this._getbonusMoney();
        }

        e.preventDefault();
    },

    _getbonusMoney() {
        var self = this;
        var search = window.location.search.split('&')[0];
        var phoneEle = $('#phone');
        if (!AppData.mgm.phone) {
            AppData.mgm.phone = phoneEle.val() || account;
        }
        $.ajax({
            'url': mgmOpenBonusApi + search,
            'type': 'get',
            'data': {phone: AppData.mgm.phone, _: (new Date).getTime()},
            beforeSend() {
                self.setState({
                    loading: true
                })
            },
            success(data) {
                var json = JSON.parse(data);
                try {
                    AppData.historyUrl[0] = window.location.href + 'mgm-recive-step2';
                    self.setState({
                        bonusMoney: json.amountCents / 100,
                        step: 'two',
                        loading: false,
                        bottomButtonShow: true
                    });
                    mgmHasGotBonus = true;
                    var currentHandler = 'MgmNewRecive';
                    stdUserStatus.shareCode = window.code = json.code;
                    var defaultOption = WxShareConfig['defaultOption'],
                        momentsOption = defaultOption;
                    if (WxShareConfig[currentHandler]) {
                        $.extend(WxShareConfig['defaultOption'], WxShareConfig[currentHandler]);
                        var amount = json.amountCents / 100;
                        WxShareConfig['defaultOption'].title = '我在商通贷领到了' + amount + '元超值红包，有福同享，你们也来领一个吧！';
                        WxShareConfig['defaultOption'].desc = '最高2000元，金额随机，快来试试手气吧';
                        momentsOption = defaultOption = WxShareConfig['defaultOption'];
                    }
                    prepareShare(defaultOption, momentsOption);

                } catch (err) {
                    console.log(err)
                }
            },
            error() {
                alert('请使用正确的网址');
                window.location.href = window.location.protocol + '//' + window.location.host + window.location.pathname;
            }
        });
    },


    getBonusOneView() {
        return <div className="mgmNew-recive-phone">
            {
                !account ?
                    <div className="mgm-recive-input">
                        <p className="mgm-recive-input-text">输入手机号码，将红包放入您的账户中</p>
                        <InputFull
                            type="tel"
                            text="手机号"
                            validate={{phone: '请填写正确的手机号'}}
                            ref="phone-recive"
                            name="phone"
                            className="input-no-icon"
                            data-name="phone-recive"
                            defaultValue={null}
                            id="phone"
                            placeholder="| 请输入您的手机号码"
                            ></InputFull>
                    </div> :
                    null
            }
            <h2 className="mgmNew-recive-phone-sendName">
                {this.state.sendName}的红包
            </h2>

            <div onClick={this.touchBonus} className="mgmNew-recive-phone-package">
                <Button
                    material-button
                    tracking={{
                                'activity': 'mgmNew',
                                'status': 'active-button',
                                'lmt-track-id': 'mgmNew-recive-redpackage-button'
                                }}
                    >
                    <p className="mgmNew-recive-phone-package-title">拆红包</p>

                    <p className="mgmNew-recive-phone-package-bottom">商通贷息费红包</p>
                </Button>
            </div>


        </div>;
    },

    getBonusTwoView() {
        return <div className="mgmNew-recive-package">
            <div className="mgmNew-recive-package-open">
                <p className="mgmNew-recive-package-open-title">商通贷红包</p>

                <p className="mgmNew-recive-package-open-twice" style={{display: mgmHasGotBonus? 'block': 'none'}}>
                    已抢过啦</p>

                <p className="mgmNew-recive-package-open-money"
                   style={{top: mgmHasGotBonus? '3rem': '2.8rem'}}>{this.state.bonusMoney}元</p>

                <p className="mgmNew-recive-phone-package-bottom">商通贷息费红包</p>

            </div>
            <Link to={{pathname: 'bonus-fq'}} className="mgmNew-recive-toRule">
                <Button
                    material-button
                    tracking={{
                                'activity': 'mgmNew',
                                'status': 'active-button',
                                'lmt-track-id': 'mgmNew-recive-rule'
                                }}
                    text="红包使用规则>>"
                    >
                </Button>
            </Link>
            <Link className="width90 mgmNew-red-button" to="estimate" params={{platformGroup: 'domestic'}}>
                <Button
                    material-button
                    tracking={{
                                'activity': 'mgmNew',
                                'status': 'active-button',
                                'lmt-track-id': 'mgmNew-recive-use-button'
                                }}
                    text="立即使用"
                    >
                </Button>
            </Link>
            <Link to={{pathname: 'mgmNew'}} className="width90 mgmNew-grey-button">
                <Button
                    material-button
                    tracking={{
                                'activity': 'mgmNew',
                                'status': 'active-button',
                                'lmt-track-id': 'mgmNew-recive-send-button'
                                }}
                    text="我也想发红包"
                    >
                </Button>
            </Link>
        </div>;
    }
    ,

    render() {
        if (this.state.loading) {
            return <Css3Loading loading={this.state.loading}></Css3Loading>;
        }
        var step = this.state.step,
            ele = '';
        if (step === 'one') {
            ele = this.getBonusOneView();
        } else {
            ele = this.getBonusTwoView();
        }
        var buttonDisplay = this.state.bottomButtonShow ? 'block' : 'none';

        return (
            <div className="mgmNew">
                <div className="mgmNew-recive">
                    <div className="mgmNew-recive-message">
                        <div className="mgmNew-recive-message-head l">
                            <img style={{width: '100%', height: '100%'}} src={shareWechatHeadImg} alt=""/>
                        </div>
                        <div className="mgmNew-recive-message-text l">
                            <p className="mgmNew-recive-message-name">{this.state.sendName}</p>

                            <p className="mgmNew-recive-message-say">
                                {this.state.say}
                                <span className="mgm-triangle-left"></span>
                            </p>
                        </div>
                    </div>
                    <div className="mgmNew-recive-main">{ele}</div>
                    <div className="ad-mgm">
                        <h1 className="ad-mgm-h1">商通贷是什么？</h1>

                        <p className="ad-mgm-h1-bottom-text">商通贷是专为中小电商解决资金问题的贷款平台</p>

                        <p className="ad-mgm-h1-bottom-text">只需要电商账号即可</p>

                        <h1 className="ad-mgm-h1">为什么要选商通贷？</h1>

                        <div className="ad-mgm-section-1"></div>

                        <div className="ad-mgm-section-3-outer">
                            <h2 className="ad-mgm-section-h2">算算更安心</h2>

                            <div className="ad-mgm-section-3"></div>
                        </div>
                        <div className="ad-mgm-section-4-outer">
                            <h2 className="ad-mgm-section-h2">全线上无抵押，更便利</h2>

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
                            <Link className="width90 mgmNew-red-button"
                                  style={{marginTop: '0.3rem', display: buttonDisplay}} to="estimate"
                                  params={{platformGroup: 'domestic'}}>
                                <Button
                                    material-button
                                    tracking={{
                                'activity': 'mgmNew',
                                'status': 'active-button',
                                'lmt-track-id': 'mgmNew-recive-use-bottom-button'
                                }}
                                    text="使用红包"
                                    >
                                </Button>
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
});

module.exports = MgmNewRecive;

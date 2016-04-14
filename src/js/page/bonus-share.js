/**
 * Created by malin on 15/6/11.
 */
var React = require('react'),
    AppData = require('./../component/appData'),
    MobilePlatform = require('./../lib/mobilePlatform'),
    Logo = require('./../component/logo'),
    BonusNav = require('./../component/bonus-nav'),
    MomentModel = require('../modelComponent/moments-model'),
    Popup = require('./../modelComponent/popup'),
    Css3Loading = require('./../modelComponent/css3loading'),
    isLogin = require('./../component/isLogin'),
    Tracking = require('./../lib/tracking');

const {stdApi} = AppData.api();

const [{bonusCodeApi}, {isWechatUa}] = [stdApi, MobilePlatform];

var jiathis = window.jiathis || {
        jiathisUrl: 'http://www.jiathis.com/send/',
        uid: '2059915'
    };
var url = window.location.host + '/m';
window.code = '';

let Share = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            loading: true,
            show: false,
            href: '',
            url: '',
            erweima: '',
            yaoqingma: '',
            shortUrlL: '',
            erweimaShow: false,
            yaoqingmaShow: false,
            shortUrlShow: false,
            shareConfig: {}
        };
    },
    getShareUrl() {
        this.setState({
            shareConfig: {
                cqq: jiathis.jiathisUrl + '?uid=' + jiathis.uid + '&webid=cqq&url=' + encodeURIComponent(this.state.url + '&lmt-track-id=mgm-mobile-cqq&share-from=cqq') + '&title=备战旺季资金急？推荐一个靠谱的电商借款网站帮帮你！【商通贷】专为中小电商解决资金难题，额度高达200万，最快8分钟即可放款。另外，申请时别忘输入神奇的口令：' + code + ' 会有惊喜哦！',
                tsina: jiathis.jiathisUrl + '?uid=' + jiathis.uid + '&webid=tsina&url=' + encodeURIComponent(this.state.url + '&lmt-track-id=mgm-mobile-tsina&share-from=tsina') + '&title=你用1分钟，看了1条无聊的长微博，1个乏味的视频广告，以及1段无病呻吟的鸡汤，而我用1分钟，可以获得200万。',
                qzone: jiathis.jiathisUrl + '?uid=' + jiathis.uid + '&webid=qzone&url=' + encodeURIComponent(this.state.url + '&lmt-track-id=mgm-mobile-qzone&share-from=qzone') + '&title=我来助你迎战旺季，200万备货金送给你！&summary=旺季备货缺钱吗？推荐一个靠谱的借款平台:商通贷!额度高达200万；月费率低至0.72%；无需抵押担保，仅凭一个卖家账号即可申请；1分钟完成预估，最快8分钟放款！',
                tqq: jiathis.jiathisUrl + '?uid=' + jiathis.uid + '&webid=tqq&url=' + encodeURIComponent(this.state.url + '&lmt-track-id=mgm-mobile-tqq&share-from=tqq') + '&title=你用1分钟，看了1条无聊的长微博，1个乏味的视频广告，以及1段无病呻吟的鸡汤，而我用1分钟，可以获得200万。',
                email: jiathis.jiathisUrl + '?uid=' + jiathis.uid + '&webid=email&url=' + encodeURIComponent(this.state.url + '&lmt-track-id=mgm-mobile-email&share-from=email') + '&title=亲爱的朋友，送你200万备货金，请注意查收！',
                alibaba: jiathis.jiathisUrl + '?uid=' + jiathis.uid + '&webid=alibaba&url=' + encodeURIComponent(this.state.url + '&lmt-track-id=mgm-mobile-alibaba&share-from=alibaba') + '&title=备战旺季资金急？推荐一个靠谱的电商借款网站帮帮你！【商通贷】专为中小电商解决资金难题，额度高达200万，最快8分钟即可放款。另外，申请时别忘输入神奇的口令：' + code + ' 会有惊喜哦！'
            }
        });
    },

    componentWillMount() {
        this.isApplyableShowPage();
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
    isApplyableShowPage() {
        var self = this;
        isLogin(self, '', function () {
            self.getBonusCode();

        });
    },
    showModel(e) {
        Tracking.trackEvent('click', {
            'activity': 'mgm',
            'lmt-track-id': 'mgm-mobile-weixin'
        });
        this.setState({
            show: true,
            erweimaShow: false,
            yaoqingmaShow: false,
            shortUrlShow: false
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
    getBonusCode() {
        var self = this;
        $.ajax({
            'url': bonusCodeApi,
            'type': 'get',
            'data': {_: (new Date).getTime()},
            beforeSend: function () {
            },
            success(data) {
                var json = JSON.parse(data);
                console.log(json);
                try {
                    self.setState({
                        url: json.url,
                        shortUrl: json.shortUrl,
                        erweima: json.qrcode,
                        yaoqingma: json.code,
                        loading: false

                    });
                    code = json.code;
                    self.getShareUrl();
                } catch (e) {

                }

            }
        });
    },

    showPopupShortUrl() {
        this.setState({
            shortUrlShow: true,
            erweimaShow: false,
            yaoqingmaShow: false

        });
        Tracking.trackEvent('click', {
            'activity': 'mgm',
            'lmt-track-id': 'mgm-mobile-shortUrl'
        });
    },
    showPopupErweima() {
        this.setState({
            erweimaShow: true,
            shortUrlShow: false,
            yaoqingmaShow: false
        });
        Tracking.trackEvent('click', {
            'activity': 'mgm',
            'lmt-track-id': 'mgm-mobile-erweima'
        });
    },
    showPopupYaoqingma() {
        this.setState({
            yaoqingmaShow: true,
            shortUrlShow: false,
            erweimaShow: false
        });
        Tracking.trackEvent('click', {
            'activity': 'mgm',
            'lmt-track-id': 'mgm-mobile-yaoqingma'
        });
    },

    render() {
        if (this.state.loading) {
            return <Css3Loading loading={this.state.loading}></Css3Loading>;
        }
        return (
            <div className="bonus-share">
                <Logo></Logo>

                <div className="bonus-share-banner"></div>
                <div className="bonus-share-container">
                    <div className="bonus-share-text">
                        <h2>通过以下渠道分享，用户点击您的链接</h2>

                        <h2>成功申请，即视为您的推荐</h2>
                        <i className="bonus-share-tips">＊温馨提示：多渠道推荐可提高成功率</i>
                    </div>
                    <div className="bonus-jiathis">
                        <div className="jiathis_style_32x32">
                            <div className="bonus-share-list">

                                {
                                    isWechatUa ?
                                        <a id="share_weixin" onClick={this.showModel}>
                                            <span className="jtico_weixin">微信</span>
                                        </a> :
                                        <a id="share_weixin" onClick={this.showPopupErweima}>
                                            <span className="jtico_weixin">微信</span>
                                        </a>
                                }
                                <a id="share_tsina" href={this.state.shareConfig.tsina}>
                                    <span className="jtico_tsina">新浪微博</span>
                                </a>
                                <a id="share_qzone" href={this.state.shareConfig.qzone}>
                                    <span className="jtico_qzone">QQ空间</span>
                                </a>
                                <a id="share_tqq" href={this.state.shareConfig.tqq}>
                                    <span className="jtico_tqq">腾讯微博</span>
                                </a>
                                <a id="share_link" onClick={this.showPopupShortUrl}>
                                    <span className="jtico_link">链接</span>
                                </a>
                                <a id="share_email" href={this.state.shareConfig.email}>
                                    <span className="jtico_email">邮件</span>
                                </a>
                                <a id="share_erweima" onClick={this.showPopupErweima}>
                                    <span className="jtico_erweima">二维码</span>
                                </a>
                                <a id="share_yaoqingma" onClick={this.showPopupYaoqingma}>
                                    <span className="jtico_yaoqingma">邀请码</span>
                                </a>


                                {
                                    //<a id="share_cqq" href={this.state.shareConfig.cqq}>
                                    //    <span className="jtico_cqq">QQ好友</span>
                                    //</a>
                                    //<a id="share_alibaba" href={this.state.shareConfig.alibaba}>
                                    //    <span className="jtico_alibaba">阿里巴巴</span>
                                    //</a>
                                    //<a id="share_tieba"></a>
                                    //<a id="share_taobao"></a>
                                    //<a id="share_tianya"></a>
                                    //<a id="share_mogujie"></a>
                                    //<a id="share_meilishuo"></a>
                                }

                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>
                </div>
                <div className="qr-code">
                </div>
                <BonusNav index="0"></BonusNav>
                <Popup ref="shortUrlShow" width="90%" show={this.state.shortUrlShow}>
                    <div className="popup-body">
                        <div className="shortUrl-body">
                            <p className="l">短链接：</p>

                            <p className="shortUrl-body-p l">{this.state.shortUrl}</p>

                            <p className="l">长链接：</p>

                            <p className="shortUrl-body-p l">{this.state.url}</p>

                            <div className="likeButton">请长按链接复制</div>
                        </div>
                    </div>
                </Popup>
                <Popup name="erweimaShow" width="70%" self={this} show={this.state.erweimaShow}>
                    <div className="popup-body">
                        <div className="erweima-body">
                            <img src={this.state.erweima} style={{width: '90%', 'marginBottom': '10px'}} alt=""/>

                            <p style={{marginBottom: '10px'}}>用户扫描二维码，注册后即为您的推荐</p>
                        </div>
                    </div>
                </Popup>
                <Popup name="yaoqingmaShow" width="90%" self={this} show={this.state.yaoqingmaShow}>
                    <div className="popup-body">
                        <div className="yaoqingma-body">
                            <p className="l">邀请码：</p>

                            <p className="shortUrl-body-p l">{this.state.yaoqingma}</p>

                            <div className="likeButton">请长按邀请码复制</div>
                        </div>
                    </div>
                </Popup>
                <MomentModel _onClick={this.hideModel} show={this.state.show}></MomentModel>

            </div>
        );
    }
});
module.exports = Share;

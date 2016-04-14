/**
 * Created by malin on 15/7/11.
 */
var React = require('react'),
    {Link} = require('react-router'),
    AppData = require('./../../component/appData'),
    Cookie = require('react-cookie'),
    Button = require('./../../component/button'),
    isLogin = require('./../../component/isLogin'),
    formCheck = require('./../../form/formCheck'),
    MomentModel = require('./../../modelComponent/moments-model'),
    Css3Loading = require('./../../modelComponent/css3loading'),
    FormValidator = require('./../../form/formValidator'),
    WxShareConfig = require('./../../wxShareConfig');

const {stdApi, stdUserStatus} = AppData.api();

const mgmInviteSendApi = stdApi.mgmInviteSendApi;

var mgmOwnWechatAccount = stdUserStatus.mgmInfo ?
    (stdUserStatus.mgmInfo.ownWechatAccount || stdUserStatus.mgmInfo.account || '') :
    '';

if (FormValidator.phone(mgmOwnWechatAccount)) {
    let arr = mgmOwnWechatAccount.split('');
    mgmOwnWechatAccount = arr.slice(0, 3).concat('****', arr.slice(7, arr.length)).join('');
}

let MgmNewPeer = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            loading: true,
            show: false,
            code: '',
            qrcode: '',
            wxName: mgmOwnWechatAccount,
            path: 'bonus/getCheckCode'
        };
    },

    componentWillMount() {
        //是否访问过我的赏金，如果访问过就略过验证码
        let reFinancing = Cookie.load('reFinancing');
        let self = this;
        isLogin(self, 'no', function () {
            //if (reFinancing) {
            self.setState({
                path: 'bonus/financing',
                loading: false
            });
            //}
        });
    },

    componentDidMount() {
        let self = this;
        $.ajax({
            'url': mgmInviteSendApi,
            'type': 'get',
            'data': {_: (new Date).getTime()},
            success(data) {
                let json = JSON.parse(data);
                try {
                    let currentHandler = 'MgmNewPeer';
                    stdUserStatus.shareCode = window.code = json.code;
                    let defaultOption = WxShareConfig['defaultOption'],
                        momentsOption = defaultOption;
                    if (WxShareConfig[currentHandler]) {
                        $.extend(WxShareConfig['defaultOption'], WxShareConfig[currentHandler]);
                        let search = window.location.search.replace(/code=[^&]*&?/, '');
                        WxShareConfig['defaultOption'].link = window.location.protocol + '//' + window.location.host + window.location.pathname + '?code=' + json.code + search.replace('?', '&') + '#mgmNew';
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
                    self.setState({
                        qrcode: json.qrcode,
                        code: json.code,
                        loading: false
                    });

                    //let search = window.location.search.replace(/code=[^&]*&?/, "");
                    //window.location.href = window.location.protocol + "//" + window.location.host + window.location.pathname + '?code=' + json.code + search.replace('?', '&') + window.location.hash;
                } catch (err) {
                    console.log(err);
                }
            },
            error() {
                self.setState({
                    loading: false
                });
                alert('请检查网络或稍后再试！');
            }
        });
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
            <div className="mgmNew" style={{minHeight: '100%', backgroundColor: '#fdfec2 '}}>
                <div className="mgmNew-money">
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
                                'lmt-track-id': 'mgmNew-my-financing-peer'
                                }}
                                >
                                <div className="mgmNew-money-header-money-icon"></div>
                                我的赏金
                            </Button>
                        </Link>
                    </div>
                    <div className="mgmNew-money-main">
                        <h2 className="mgmNew-money-main-h2">
                            ①&nbsp;好友不在身边？
                        </h2>

                        <p className="center-text mgmNew-step3-text">喊好友来赚钱</p>

                        <p className="center-text mgmNew-step3-text">点击右上角分享按钮，邀请好友一起成为推荐人</p>

                        <div className="width85 mgmNew-red-button" onClick={this.showModel}
                             style={{marginBottom: '1rem'}}>
                            <Button
                                material-button
                                tracking={{
                                'activity': 'mgmNew',
                                'status': 'active-button',
                                'lmt-track-id': 'mgmNew-share-button-peer'
                                }}
                                text="喊好友来赚钱"
                                >
                            </Button>
                        </div>

                        <h2 className="mgmNew-money-main-h2">
                            ②&nbsp;好友在身边？
                        </h2>

                        <p className="center-text mgmNew-step3-text">让朋友扫个二维码</p>

                        <p className="center-text mgmNew-step3-text">一起成为推荐人，赚现金</p>

                        <div className="mgmNew-erweima" style={{width: '4rem', height: '4rem', lineHeight: '4rem'}}>
                            <img src={this.state.qrcode} alt="二维码无法显示"/>
                        </div>
                    </div>

                </div>
                <MomentModel _onClick={this.hideModel} show={this.state.show}></MomentModel>
            </div>
        );
    }
});
module.exports = MgmNewPeer;

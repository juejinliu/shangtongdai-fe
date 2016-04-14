/**
 * Created by malin on 15/8/26.
 * @return {string}
 */
import AppData from './component/appData';
import Popup from './modelComponent/popup';
import redirect from './component/loginRedirect';
import Cookie from 'react-cookie';
import Tracking from './lib/tracking';
//import Forge from '../lib/forge';
const {stdApi} = AppData.api();

const {
    mgmQrAuthcodeApi,
    mgmQrLoginApi,
    mgmQrEstimateApi,
    sendZhiwangLoginAuthCodeApi,
    zhiwangLoginApi,
    sendWomenDayLoginAuthCodeApi,
    womenDayLoginApi,
    isReceivedCouponApi
    } = stdApi;


export default {
    default: {
        authCodeApi: mgmQrAuthcodeApi,
        loginApi: mgmQrLoginApi,
        buttonText: '确定',
        authCodeText: '获取验证码',
        placeholder1: '请输入您的手机号码',
        placeholder2: '短信验证码',
        callback: () => {

        }
    },
    mgm: {
        displayName: 'PrizeMgm',
        activity: 'mgm-qr-mobile',
        track: 'activity-std-submit',       //登录按钮trackid
        authCodeApi: mgmQrAuthcodeApi,      //获取短信
        loginApi: mgmQrLoginApi,            //登录
        buttonText: '确定',
        tips: '温馨提示: 中奖信息将以短信的形式通知您',
        callback: (father) => {
            let next = window.location.protocol + '//' +
                window.location.host + window.location.pathname +
                window.location.search + '#/activity/mgm-a/prize-index';
            if (window.location.href.indexOf('hasScanned=true') > -1) {
                next += '?hasScanned=true';
                redirect(next);
            } else {
                $.ajax({
                    'url': mgmQrEstimateApi,
                    'type': 'get',
                    beforeSend() {
                        father.setState({
                            loadingShow: true
                        });
                    },
                    success(json) {
                        if (json.result === 'failure') {
                            if (json.code === '500') {
                                alert('请返回至活动首页,重新操作');
                                window.location.href = window.location.pathname + window.location.search + '#/activity/mgm-a/prize-index';

                            } else {
                                alert(json.message);
                            }
                            father.setState({
                                loadingShow: false
                            });
                        } else {
                            redirect(next);
                        }
                        console.log(json);
                    },
                    error() {
                        father.setState({
                            loadingShow: false,
                            buttonText: '确定'
                        });
                        alert('请返回至活动首页,重新操作');
                        window.location.href = window.location.pathname + window.location.search + '#/activity/mgm-a/prize-index';

                    }
                });
            }

        }
    },
    zhiwang: {
        displayName: 'ZhiwangJanuary',
        activity: 'zhiwang-january',
        buttonText: '领取免息卡',
        track: 'activity-std-submit',       //登录按钮trackid
        authCodeApi: sendZhiwangLoginAuthCodeApi,      //获取短信
        loginApi: zhiwangLoginApi,            //登录
        section1: `
                    <div class="title"><p>您的店铺潜力价值为<b id="ydwy"></b>万元</p><span>属高潜力值店铺,特送您专属店铺升级锦囊</span></div>
                `,
        section4: `
            <div class="rule">
                <div><p>活动日期:</p><span>2016-1-25至2016-1-31</span></div>
                <div><p>活动对象:</p><span>指旺注册用户</span></div>
                <div><p>活动规则:</p><span>活动期间,
                客户输入手机号即可领取免息卡,选择12期及以上产品享受此优惠--首期
                利息全免,上不封顶.免息卡有效期3个月.</span></div>
                <div><p>如何查看:</p><span>进入"我的商通贷"--"我的红包"即可查看.</span></div>
                <div><p>如何使用:</p><span>还款时勾选"使用红包",选中"免息卡",即可享受首贷首期免息优惠</span></div>
                <i>本次活动解释权归商通贷所有</i>
            </div>
        `,
        callback: (father) => {
            father.setState({
                loadingShow: true,
                num: '',
                popupText: '恭喜您,领取成功'
            });
            Tracking.trackEvent('click', {
                'activity': 'zhiwang-january',
                'lmt-track-id': 'get-success'
            });
        },
        errCallback: (father, json) => {
            if (json.result === 'fail') {
                father.setState({
                    loadingShow: true,
                    popupText: '您已经领取过了'
                });
                Tracking.trackEvent('click', {
                    'activity': 'zhiwang-january',
                    'lmt-track-id': 'get-success-again'
                });
            } else if (json.result === 'failure') {
                father.setState({
                    buttonText: '领取免息卡',
                    errorMessage: '短信验证码错误'
                });
                Tracking.trackEvent('click', {
                    'activity': 'zhiwang-january',
                    'lmt-track-id': 'code-error'
                });
            }

        }
    },

    womenDay: {
        displayName: 'WomenDay',
        activity: 'women-day',
        track: 'activity-std-submit',       //登录按钮trackid
        authCodeApi: sendWomenDayLoginAuthCodeApi,      //获取短信
        loginApi: womenDayLoginApi,            //登录
        isReceivedCouponApi: isReceivedCouponApi,
        buttonText: '领红酒',
        section4: `
            <div class="rule-container">
                <div class="rule-title"></div>
                <p>2016年3月7日—3月9日，在该页面注册成为商通贷用户，即可获得价值138元的红酒兑换券。</p>
                <p>每个手机号限领一张，不可重复领取。</p>
                <p>兑换券每日数量有限，发完为止。</p>
                <p>活动期间女性用户完成首次借款申请，还可享受首期息费全免优惠。</p>
                <p class="red">活动最终解释权归宜信商通贷所有</p>
                <div class="flower1"></div>
                <div class="flower2"></div>
                <div class="shadow"></div>
                <div class="footer"></div>
            </div>
        `,
        init: (father) => {
            $.ajax({
                'url': isReceivedCouponApi + '?_=' + (new Date).getTime(),
                'type': 'get',
                success(json) {
                    if (typeof json === 'string') {
                        json = JSON.parse(json);
                    }
                    if (json.result === 'failure') {

                    } else if (json.couponNum != ''){
                        let next = window.location.protocol + '//' +
                            window.location.host + window.location.pathname +
                            window.location.search + '#/activity/womenDay/success';
                        window.location.href = next;
                    } else {
                        let next = window.location.protocol + '//' +
                            window.location.host + window.location.pathname +
                            window.location.search + '#/activity/womenDay/fail';
                        window.location.href = next;
                    }
                }
            });
        },
        callback: (father) => {
            father.setState({
                buttonText: '领红酒'
            });
            let next = window.location.protocol + '//' +
                window.location.host + window.location.pathname +
                window.location.search + '#/activity/womenDay/success';
            window.location.href = next
        },
        errCallback: (father, json) => {
            if (json.result === 'failure') {
                $('#authCode').next().html('验证码错误');
                father.setState({
                    buttonText: '领红酒'
                });
            } else {
                let next = window.location.protocol + '//' +
                    window.location.host + window.location.pathname +
                    window.location.search + '#/activity/womenDay/fail';
                window.location.href = next
            }
        }
    }


}
;
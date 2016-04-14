/**
 * Created by malin on 15/5/26.
 */
import p from 'babel-polyfill';
var React = require('react'),
    ReactDOM = require('react-dom'),
    {Router, Route, IndexRoute,  hashHistory} = require('react-router'),
    {createHashHistory} = require('history'),
    myfunction = require('./component/myfunction'),
    $ = require('./lib/zepto'),
    WxShareConfig = require('./wxShareConfig'),
    TrackingConfig = require('./trackingConfig'),
    Nav = require('./page/nav'),
    UserStatusRouter = require('./page/userStatusRouter'),
    Personal = require('./page/personal'),
    PersonalInfo = require('./page/personal-info'),
    beforeLoad = require('./lib/beforeLoad'),
    Platform = require('./page/platform'),
    TaobaoAccount = require('./page/taobaoAccount'),
    CreditCardAccount = require('./page/creditCardAccount'),
    AmazonAccount = require('./page/amazonAccount'),
    Estimate = require('./page/estimate'),
    Reglogin = require('./page/regist-login'),
    GetPasswordPersonal = require('./page/getPasswordPersonal'),
    Authorize = require('./page/authorize'),
    loan = require('./page/loan'),
    loanSecond = require('./page/loanSecond'),
    loanProgram = require('./page/loanProgram'),
    successPage = require('./page/successPage'),
    loanOver = require('./page/loanOver'),
    loanFail = require('./page/loanFail'),
    loanNo = require('./page/loanNo'),
    loanAddInfo = require('./page/loanAddInfo'),
    loanOutLimit = require('./page/loanOutLimit'),
    loanOutLimitTime = require('./page/loanOutLimitTime'),
    loanArmored = require('./page/loanArmored'),
    loanPlan = require('./page/loanPlan'),
    loanConfirm = require('./page/loanConfirm'),
    Welcome = require('./page/welcome'),
    Event = require('./lib/trigger'),
    AppData = require('./component/appData'),
    OthersIntroduce = require('./page/individualCredit/introduce'),
    CreditcardVerifyShop = require('./page/individualCredit/verifyShop'),
    Creditcard = require('./page/individualCredit/creditcard'),
    CreditcardChoose = require('./page/individualCredit/choose'),
    CreditcardFQ = require('./page/individualCredit/creditcardFQ'),
    TaobaoBuyer = require('./page/individualCredit/taobaoBuyer'),
    CreditcardFinish = require('./page/individualCredit/creditcardFinish'),
    ReportIntroduce = require('./page/individualCredit/reportIntroduce'),
    ReportOperationGuide = require('./page/individualCredit/reportOperationGuide'),
    Report = require('./page/individualCredit/report'),
    ReportFQ = require('./page/individualCredit/reportFQ'),
    TaobaoSellerRefuse = require('./page/individualCredit/taobaoSellerRefuse'),

    ShareWx = require('./page/bonus-share-wx'),
    Share = require('./page/bonus-share'),
    SharePackage = require('./page/share-package'),
    Moments = require('./page/bonus-moments'),
    BonusMy = require('./page/bonus-my'),
    BonusList = require('./page/bonus-list'),
    BonusRule = require('./page/bonus-rule'),
    BonusFQ = require('./page/bonus-fq'),
    BonusPosterFQ = require('./page/bonus-poster-fq'),
    CashOut = require('./page/cashOut'),
    Financing = require('./page/bonus/financing'),
    BonusRuleWx = require('./page/bonus/rule'),
    BonusFQWx = require('./page/bonus/fq'),
    GetCheckCode = require('./page/bonus/getCheckCode'),
    MgmPosterRule = require('./page/bonus/mgmPosterRule.js'),

    Mgm = require('./page/activity/adMgm'),
    Loan99 = require('./page/activity/loan99'),
    Kuaidi100 = require('./page/activity/kuaidi100'),
    MgmNew = require('./page/activity/mgmNew'),
    MgmNewRecive = require('./page/activity/mgmNew-recive'),
    MgmNewPeer = require('./page/activity/mgmNew-peer'),
    Licai = require('./page/activity/licai'),
    LicaiTrialFund = require('./page/activity/licaiTrialFund'),
    LicaiWarmup = require('./page/activity/licaiWarmup'),
    MgmQRCode = require('./page/activity/mgmQrCode'),
    Double12Index = require('./page/activity/double12'),
    NianGuan = require('./page/activity/nianGuan'),
    Tracking = require('./lib/tracking');
import LoginWithMobile from './page/activity/loginWithMobile.js';
import NoDataTaobao from './termite/noData-taobao.js';
import ZhiwIndex from './page/activity/zhiw-1/zhiw-index.js';
import ReceiveCouponSuccess from './page/activity/womenDay/receiveCouponSuccess.js';
import ReceiveCouponFail from './page/activity/womenDay/receiveCouponFail.js';
import Swiper from './lib/swiper.js';
import Dragon from './page/activity/dragon/dragon-index.js';


require('../less/std-app.less');
beforeLoad();
$('#spinner').fadeOut();      //载入app的loading
$.subscribe('reloadpage', function () {
    setTimeout(function () {
        location.reload(true);
    }, 200);
});
let history = createHashHistory();
var App = React.createClass({
    render: function () {
        return (
            <div>
                <form className="form">
                    {this.props.children}
                </form>
            </div>
        );

    }
});
var routes = (
    <Route path="/" component={App}>
        <Route path="nav" component={Nav}/>
        <Route path="personal" component={Personal}/>
        <Route path="platform" component={Platform}/>
        <Route path="platform-account/:platform" component={TaobaoAccount}/>
        <Route path="estimate" component={Estimate}/>
        <Route path="userStatusRouter" component={UserStatusRouter}/>
        <Route path="personal-info" component={PersonalInfo}/>
        <Route path="creditCardAccount" component={CreditCardAccount}/>
        <Route path="amazonAccount" component={AmazonAccount}/>
        <Route path="reg-login/:tab" component={Reglogin}/>
        <Route path="getPasswordPersonal" component={GetPasswordPersonal}/>
        <Route path="authorize" component={Authorize}/>
        <Route path="loan" component={loan}/>
        <Route path="loanSecond" component={loanSecond}/>
        <Route path="loanOver" component={loanOver}/>
        <Route path="loanFail" component={loanFail}/>
        <Route path="loanNo" component={loanNo}/>
        <Route path="loanAddInfo" component={loanAddInfo}/>
        <Route path="loanOutLimit" component={loanOutLimit}/>
        <Route path="loanOutLimitTime" component={loanOutLimitTime}/>
        <Route path="loanArmored" component={loanArmored}/>
        <Route path="loanPlan" component={loanPlan}/>
        <Route path="loanConfirm" component={loanConfirm}/>
        <Route path="successPage" component={successPage}/>
        <Route path="individualCredit/introduce" component={OthersIntroduce}/>
        <Route path="individualCredit/verify-shop" component={CreditcardVerifyShop}/>
        <Route path="individualCredit/creditcard" component={Creditcard}/>
        <Route path="individualCredit/choose" component={CreditcardChoose}/>
        <Route path="individualCredit/creditcard-fq" component={CreditcardFQ}/>
        <Route path="individualCredit/taobao" component={TaobaoBuyer}/>
        <Route path="individualCredit/finish" component={CreditcardFinish}/>
        <Route path="individualCredit/report-introduce" component={ReportIntroduce}/>
        <Route path="individualCredit/report-guide" component={ReportOperationGuide}/>
        <Route path="individualCredit/report" component={Report}/>
        <Route path="individualCredit/report-fq" component={ReportFQ}/>
        <Route path="individualCredit/taobao-refuse" component={TaobaoSellerRefuse}/>
        //红包页面
        <Route path="bonus-my" component={BonusMy}/>
        <Route path="bonus-list/:status" component={BonusList}/>
        <Route path="bonus-rule" component={BonusRule}/>
        <Route path="bonus-fq" component={BonusFQ}/>
        <Route path="bonus-poster-fq" component={BonusPosterFQ}/>
        <Route path="bonus-share-wx" component={ShareWx}/>
        <Route path="bonus-share" component={Share}/>
        <Route path="moments" component={Moments}/>
        <Route path="cashOut" component={CashOut}/>
        <Route path="bonus-package" component={SharePackage}/>
        <Route path="mgmNew" component={MgmNew}/>
        <Route path="mgmNew-recive" component={MgmNewRecive}/>
        <Route path="mgmNew-peer" component={MgmNewPeer}/>
        <Route path="bonus/financing" component={Financing}/>
        <Route path="bonus/rule" component={BonusRuleWx}/>
        <Route path="bonus/fq" component={BonusFQWx}/>
        <Route path="bonus/getCheckCode" component={GetCheckCode}/>
        <Route path="bonus/mgmPosterRule" component={MgmPosterRule}/>
        //活动
        <Route path="mgm" component={Mgm}/>
        <Route path="loan99" component={Loan99}/>
        <Route path="kuaidi100" component={Kuaidi100}/>
        <Route path="licai" component={Licai}/>
        <Route path="activity/licaiTrialFund" component={LicaiTrialFund}/>
        <Route path="activity/licaiWarmup" component={LicaiWarmup}/>
        <Route path="activity/mgmQrCode" component={MgmQRCode}/>
        <Route path="double12" component={Double12Index}/>
        <Route path="nianGuan" component={NianGuan}/>
        <Route path="activity/zhiw-1/index" component={ZhiwIndex}/>
        <Route path="activity/code/:path" component={LoginWithMobile}/>
        <Route name="activity/womenDay/success" path="activity/womenDay/success" component={ReceiveCouponSuccess}/>
        <Route name="activity/womenDay/fail" path="activity/womenDay/fail" component={ReceiveCouponFail}/>
        <Route path="activity/dragon/:path" component={Dragon}/>
        <Route path="*" component={Welcome}/>
        <IndexRoute component={Welcome}/>
    </Route>
);

history.listen(function (location) {
    console.time(`${location.pathname}.render`);
    let routerState = ReactDOM.render(<Router history={hashHistory}
                                              routes={routes}/>, document.querySelector('#shangtongdai-h5') ? document.querySelector('#shangtongdai-h5') : document.body);
    console.timeEnd(`${location.pathname}.render`);

    (function (routerState) {
        let handler = routerState.state.routes[1].handler || routerState.state.routes[1].component;
        let displayName = handler.displayName || handler.name;
        let trackingActivity = TrackingConfig[displayName];
        Tracking.trackPageLoad(trackingActivity);
        AppData.historyUrl.unshift(window.location.href);
        if (typeof wx !== 'undefined') {
            var currentHandler = displayName;
            var defaultOption = WxShareConfig['defaultOption'],
                momentsOption = defaultOption;
            if (WxShareConfig[currentHandler]) {
                momentsOption = defaultOption = $.extend(WxShareConfig['defaultOption'], WxShareConfig[currentHandler]);
            }
            wx.ready(() => {
                prepareShare(defaultOption, momentsOption, trackingActivity);
            });
        }
    })(routerState);
});


/**
 * Created by malin on 15/8/26.
 * @return {string}
 */
let WxShareGetUrl = function (routerHash) {
    let hash = (routerHash || window.location.hash || '');
    let shareCode = (window.std.stdUserStatus && window.std.stdUserStatus.shareCode) || window.code;
    if (shareCode) {
        let search = window.location.search.replace(/code=[^&]*&?/, '');
        return window.location.protocol + '//' + window.location.host + window.location.pathname + '?code=' + shareCode + search.replace('?', '&') + hash;
    } else {
        return window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search + hash;
    }
};

let WxShareConfig = {
    defaultOption: {
        title: '【商通贷】给你200万，做电商再也不差钱！',
        desc: '【商通贷】给你200万，做电商再也不差钱！',
        link: WxShareGetUrl(),
        imgUrl: 'http://static.yixin.com/file/T1_RWTBTJT1RCvBVdK7rJv.png'
    },
    Share: {
        title: '送你200万，任性做电商',
        desc: '送你200万，任性做电商',
        link: WxShareGetUrl('#mgm'),
        imgUrl: 'http://static.yixin.com/file/T1JaWTBgKT1RCvBVdKV1X2.jpg'
    },
    BonusRule: {
        title: '送你200万，任性做电商',
        desc: '送你200万，任性做电商',
        link: WxShareGetUrl('#mgm'),
        imgUrl: 'http://static.yixin.com/file/T1JaWTBgKT1RCvBVdKV1X2.jpg'
    },
    BonusFQ: {
        title: '送你200万，任性做电商',
        desc: '送你200万，任性做电商',
        link: WxShareGetUrl('#mgm'),
        imgUrl: 'http://static.yixin.com/file/T1JaWTBgKT1RCvBVdKV1X2.jpg'
    },
    SharePackage: {
        title: '送你200万，任性做电商',
        desc: '送你200万，任性做电商',
        link: WxShareGetUrl('#mgm'),
        imgUrl: 'http://static.yixin.com/file/T1JaWTBgKT1RCvBVdKV1X2.jpg'
    },
    AdMgm: {
        title: '送你200万，任性做电商',
        desc: '送你200万，任性做电商',
        link: WxShareGetUrl('#mgm'),
        imgUrl: 'http://static.yixin.com/file/T1JaWTBgKT1RCvBVdKV1X2.jpg'
    },
    MgmNew: {
        title: '我帮你抢了一个商通贷随机红包，最高2000元！手慢无！',
        desc: '动动手指，200元到手，要不要一起来！',
        link: WxShareGetUrl(),
        imgUrl: 'http://static.yixin.com/file/T15tWTBXW_1RCvBVdKayNO'

    },
    MgmNewRecive: {
        title: '独乐乐不如众乐乐，快来跟我一起领红包吧！',
        desc: '红包领到手软，根本停不下来！',
        link: WxShareGetUrl(),
        imgUrl: 'http://static.yixin.com/file/T15tWTBXW_1RCvBVdKayNO'
    },
    MgmNewPeer: {
        title: '我在商通贷轻松赚钱，你要不要一起来',
        desc: '有福同享，有钱同赚',
        link: WxShareGetUrl('#mgmNew'),
        imgUrl: 'http://static.yixin.com/file/T15tWTBXW_1RCvBVdKayNO'
    },
    Licai: {
        title: '18888元理财体验金，免费领取！',
        desc: '10%超高收益！利息全部属于您！',
        link: WxShareGetUrl('#licai'),
        imgUrl: 'http://static.yixin.com/file/T1dFDTB4b_1RCvBVdKdRnp.jpg'
    },
    MgmPosterRule: {
        title: '赚钱小贴士，偷偷告诉你',
        desc: '要想赚钱多，贴士莫错过！秒懂赚钱秘籍',
        link: WxShareGetUrl(),
        imgUrl: 'http://static.yixin.com/file/T16FYTB_D_1RCvBVdKt9zC.jpg'
    },
    Financing: {
        title: '想知道我在商通贷赚了多少钱吗？',
        desc: '1人赚不如2人赚，跟我一起捞钱钱',
        link: WxShareGetUrl(),
        imgUrl: 'http://static.yixin.com/file/T19zYTBTxv1RCvBVdKyxUU.jpg'
    },
    LicaiTrialFund: {
        title: '10倍体验金免费送！买1千送1万！买1万送10万！',
        desc: '10倍体验金免费送！买1千送1万！买1万送10万！',
        link: WxShareGetUrl('#activity/licaiTrialFund'),
        imgUrl: 'http://static.yixin.com/file/T1ANdTBKK41RCvBVdKlMl_.jpg'
    },
    LicaiWarmup: {
        title: '10倍体验金免费送！买1千送1万！买1万送10万！',
        desc: '10倍体验金免费送！买1千送1万！买1万送10万！',
        link: WxShareGetUrl('#activity/licaiWarmup'),
        imgUrl: 'http://static.yixin.com/file/T1ANdTBKK41RCvBVdKlMl_.jpg'
    },
    Double12Index: {
        title: '彩蛋来啦！给1212加点猛料！',
        desc: '神秘彩蛋+乐视VIP+最新影票，给你的1212加点料！',
        link: 'http://mp.weixin.qq.com/s?__biz=MzAxMjIyNDY5MQ==&mid=402868349&idx=1&sn=bb740dc570bf7cf119eb18148d3a5f7b#rd',
        imgUrl: 'http://static.yixin.com/file/T1DFbTB5JK1RCvBVdKKV7B.jpg'
    },
    NianGuan: {
        title: '您有1个666元红包待拆开',
        desc: '闯年关，过好年，红包助您顺一年!',
        link: WxShareGetUrl('#nianGuan'),
        imgUrl: 'https://static.yixin.com/file/T1mNATBChn1RCvBVdK9hV_.png'
    },
    PrizeIndex: {
        title: '年关送好运，商通贷喊你来抽奖啦！',
        desc: '年关送好运，商通贷喊你来抽奖啦！',
        link: WxShareGetUrl('#activity/mgm-a/prize-index'),
        imgUrl: 'http://static.yixin.com/file/T16FWTBC9b1RCvBVdKVZKM.png'
    },
    PrizeTaobao: {
        title: '年关送好运，商通贷喊你来抽奖啦！',
        desc: '年关送好运，商通贷喊你来抽奖啦！',
        link: WxShareGetUrl('#activity/mgm-a/prize-index'),
        imgUrl: 'http://static.yixin.com/file/T16FWTBC9b1RCvBVdKVZKM.png'
    },
    PrizeRecive: {
        title: '年关送好运，商通贷喊你来抽奖啦！',
        desc: '年关送好运，商通贷喊你来抽奖啦！',
        link: WxShareGetUrl('#activity/mgm-a/prize-index'),
        imgUrl: 'http://static.yixin.com/file/T16FWTBC9b1RCvBVdKVZKM.png'
    },
    PrizeMgm: {
        title: '年关送好运，商通贷喊你来抽奖啦！',
        desc: '年关送好运，商通贷喊你来抽奖啦！',
        link: WxShareGetUrl('#activity/mgm-a/prize-index'),
        imgUrl: 'http://static.yixin.com/file/T16FWTBC9b1RCvBVdKVZKM.png'
    },
    PrizeRecommend: {
        title: '年关送好运，商通贷喊你来抽奖啦！',
        desc: '年关送好运，商通贷喊你来抽奖啦！',
        link: WxShareGetUrl('#activity/mgm-a/prize-index'),
        imgUrl: 'http://static.yixin.com/file/T16FWTBC9b1RCvBVdKVZKM.png'
    },
    WomenDay: {
        title: '女王的红酒，注册即可得',
        desc: '以西班牙尊贵之礼，向所有女王致敬',
        link: WxShareGetUrl('#activity/code/womenDay'),
        imgUrl: 'http://static.yixin.com/file/T1QphTBgET1RCvBVdK9apO.png'
    },
    ReceiveCouponFail: {
        title: '女王的红酒，注册即可得',
        desc: '以西班牙尊贵之礼，向所有女王致敬',
        link: WxShareGetUrl('#activity/code/womenDay'),
        imgUrl: 'http://static.yixin.com/file/T1QphTBgET1RCvBVdK9apO.png'
    },
    ReceiveCouponSuccess: {
        title: '女王的红酒，注册即可得',
        desc: '以西班牙尊贵之礼，向所有女王致敬',
        link: WxShareGetUrl('#activity/code/womenDay'),
        imgUrl: 'http://static.yixin.com/file/T1QphTBgET1RCvBVdK9apO.png'
    }

};
module.exports = WxShareConfig;

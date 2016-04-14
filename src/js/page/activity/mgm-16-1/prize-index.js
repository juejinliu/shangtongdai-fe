/**
 * 抽奖页面
 * @file
 * @auther Created by malin on 16/1/5.
 */
import React from 'react';
import {Link} from 'react-router';
import AppData from '../../../component/appData';
import Popup from '../../../modelComponent/popup';
import Logo from '../../../component/logo';
import Button from '../../../component/button';
import Tracking from '../../../lib/tracking';
import message from '../../../messageConfig';
import Css3Loading from '../../../modelComponent/css3loading';
import MomentModel from '../../../modelComponent/moments-model';
import Sudoku from '../../../component/sudoku';

const {stdApi, stdUserStatus} = AppData.api();
var {qrStatus} = stdUserStatus && stdUserStatus.mgmInfo;
const {mgmQrBonusTimesApi, mgmQrOpenBonusApi, mgmQrBonusesApi, mgmQrMyBonusApi} = stdApi;

let sudoku = new Sudoku();
var mgminterval = 0;
class PrizeIndex extends React.Component {

    state = {
        loading: true,
        isPopupShow: false,         //领取红包弹窗
        isAlreadyShow: false,       //今日已经领取过红包弹窗
        isScannedShow: false,       //账号已经被使用
        isAmountShow: false,
        isBeforeTaobaoShow: false,
        second: 3,
        amount: 0,
        bonusType: 'CASH',
        remainTimes: 0,
        allTimes: 0,
        processing: true,
        isShareBtn: false,
        showMask: false,
        list: [],
        rankList: [],
        myBonusList: []
    };

    componentDidMount() {

        Tracking.trackEvent('pageload', {activity: 'mgm-qr-mobile', page: '/m#/activity/mgm-a/prize-index-m'});
        //请求剩余抽奖次数
        this.getTimes();
        //如果该账号被其他人使用过,直接弹窗提示
        if (this.props.location.query.hasScanned) {
            this.setState({
                isScannedShow: true
            });
        }
    };

    componentDidUpdate() {
        this.state.isShareBtn && $('#prize-start-btn').addClass('_mgm-prize-share-btn');
    };

    componentWillUnmount() {
        this.setState({
            isBeforeTaobaoShow: false,
            start: false
        });
    };

    //我的红包历史 ---> 控制我的奖品按钮显示
    getMyBonus() {
        $.ajax({
            'url': mgmQrMyBonusApi,
            'type': 'get',
            success: (json) => {
                let myBonusList = [];
                if (json.length) {
                    for (let v of json) {
                        if (v.bonusDesc !== '无') {
                            myBonusList.push(v);
                        }
                    }
                }
                this.setState({
                    myBonusList: myBonusList
                });
            },
            error: () => {
                alert(message.global.errorMessage.net);
            }
        });
    };

    //显示弹窗
    showMaskModel = (e) => {
        this.setState({
            showMask: true,
            isPopupShow: false,
            isAlreadyShow: false,
            isScannedShow: false,
            isAmountShow: false
        });
        e.preventDefault();
    };

    //隐藏弹窗
    hideMaskModel = (e) => {
        this.setState({
            showMask: false
        });
        e.preventDefault();
    };

    //滚动轮播,获奖情况
    getSwiper = () => {
        if (!this.state.list.length) {
            $.ajax({
                'url': mgmQrBonusesApi,
                'type': 'get',
                success: (json) => {
                    this.setState({
                        list: json
                    }, () => {
                        new Swiper('.swiper-container', {
                            loop: true,
                            direction: 'vertical',
                            autoplay: 3000
                        });
                    });
                },
                error: () => {
                    alert(message.global.errorMessage.net);
                }
            });
        }
    };

    //抽奖事件
    getBonus = () => {
        $.ajax({
            'url': mgmQrOpenBonusApi,
            'type': 'get',
            beforeSend: () => {
                this.setState({
                    showMask: false,
                    isPopupShow: false,
                    isAlreadyShow: false,
                    isScannedShow: false,
                    isAmountShow: false
                });
                //disable按钮
                $('#prize-start-btn').addClass('disable');
                sudoku.lightChange(
                    $('._mgm-prize-p'),
                    'active',
                    [0, 1, 2, 4, 7, 6, 5, 3]
                );
                //边框变幻
                let paomadeng = $('._mgm-prize-main');
                mgminterval = setInterval(() => {
                    if (paomadeng.hasClass('active')) {
                        paomadeng.removeClass('active');
                    } else {
                        paomadeng.addClass('active');
                    }
                }, 300);
            },
            success: (json) => {
                let state = json.result;
                let bonusType = json.bonusType;
                let prizeNum = 3;
                if (state) {
                    if (bonusType === 'CASH') {
                        prizeNum = Math.random() > 0.5 ? 3 : 7;
                    } else {
                        prizeNum = Math.random() > 0.5 ? 1 : 5;
                    }
                }
                //返回结果后2秒传入需要停止的位置,再过3秒后显示弹窗
                setTimeout(() => {
                    sudoku.stop(prizeNum, this);
                    setTimeout(() => {
                        $('#prize-start-btn').removeClass('disable');
                        this.setState({
                            amount: json.amountCents / 100,
                            bonusType: bonusType,
                            isAmountShow: true
                        });
                        this.getTimes();
                        clearInterval(mgminterval);
                        mgminterval = 0;
                    }, 3000);
                }, 2000);
            },
            error: () => {
                alert(message.global.errorMessage.net);
            }
        });
    };


    //获取抽奖次数
    getTimes = () => {
        $.ajax({
            'url': mgmQrBonusTimesApi,
            'type': 'get',
            success: (json) => {
                if (json.result !== 'failure') {
                    if (json.remainTimes === 0) {
                        if (json.allTimes) {
                            this.setState({processing: false, isShareBtn: true, allTimes: json.allTimes});
                            qrStatus = 'toShare';
                        } else {
                            if (this.props.location.query.hasScanned) {
                                this.setState({
                                    isShareBtn: true,
                                    allTimes: json.allTimes
                                });
                                qrStatus = 'toShare';
                            }
                            this.setState({processing: false});
                        }
                    } else {
                        if (json.todayTimes !== 0) {
                            qrStatus = 'already';
                        }
                        this.setState({processing: false, remainTimes: json.remainTimes, allTimes: json.allTimes});
                    }
                    this.getMyBonus();
                }
                this.setState({
                    loading: false
                });
                this.getSwiper();
            },
            error: () => {
                this.setState({
                    loading: false
                });
                alert(message.global.errorMessage.net);
            }
        });
    };

    showBeforeTaobao = (e) => {
        this.setState({
            isBeforeTaobaoShow: true
        });
        let secondInterval = setInterval(() => {
            this.setState({
                second: this.state.second - 1
            });
            if (this.state.second === 0) {
                clearInterval(secondInterval);
                this.context.router.push('activity/mgm-a/prize-taobao');
            }
        }, 1000);
        e.preventDefault();
    };

    //抽奖按钮的点击
    clickBtnEvent = (e) => {
        Tracking.trackEvent('click', {
            'activity': 'mgm-qr-mobile',
            'lmt-track-id': qrStatus
        });
        if (qrStatus === 'need_login') {
            //已抓取未登录
            this.context.router.push('activity/code/mgm');
        } else if (qrStatus === undefined) {
            //去抓取
            this.showBeforeTaobao(e);
        } else if (qrStatus === 'wait_bonus') {
            //抽奖
            if (this.state.processing) {
                return;
            }
            this.setState({
                processing: true,
                remainTimes: this.state.remainTimes - 1
            });
            this.getBonus();
        } else if (qrStatus === 'toShare') {
            this.showMaskModel(e);
        } else if (qrStatus === 'already') {
            //已经抽取过了
            this.setState({
                isAlreadyShow: true
            });
        }
    };

    render() {
        if (this.state.loading) {
            return <Css3Loading loading={this.state.loading}></Css3Loading>;
        }
        return (
            <div className="_mgm">
                {
                    qrStatus !== 'need_login' && qrStatus !== undefined ?
                        <Logo></Logo> : null
                }
                <div className="_mgm-article">
                    <div className="_mgm-prize-header">
                        {
                            this.state.allTimes ?
                                <div className="_mgm-prize-header-times">
                                    剩余抽奖次数
                                    <span className="_mgm-prize-header-num">
                                        {this.state.remainTimes}
                                    </span>
                                    次&nbsp;
                                </div> :
                                <div className="_mgm-prize-header-text">5款好礼等你拿</div>
                        }
                    </div>
                    <div className="_mgm-prize-main">
                        <div className="_mgm-prize-main-border"></div>
                        <ul className="_mgm-prize-main-list-ul">
                            <li className="_mgm-prize-main-list-li-opacity"
                                style={{display: this.state.isShareBtn? 'block': 'none'}}></li>
                            <li className="_mgm-prize-main-list-ul-li">
                                <div id="gift-1" className="gift-1 _mgm-prize-main-list-ul-li-g _mgm-prize-p">
                                    <div className="_mgm-prize-main-list-g-bottom">
                                        iPhone6s
                                    </div>
                                </div>

                                <div id="gift-2" className="gift-2 _mgm-prize-main-list-ul-li-g _mgm-prize-p">
                                    <div className="_mgm-prize-main-list-g-bottom">
                                        息费红包
                                    </div>
                                </div>
                                <div id="gift-3" className="gift-3 _mgm-prize-main-list-ul-li-g _mgm-prize-p">
                                    <div className="_mgm-prize-main-list-g-bottom">
                                        家庭投影仪
                                    </div>
                                </div>
                            </li>
                            <li className="_mgm-prize-main-list-ul-li">
                                <div id="gift-8" className="gift-8 _mgm-prize-main-list-ul-li-g _mgm-prize-p">
                                    <div className="_mgm-prize-main-list-g-bottom">
                                        现金5-15元
                                    </div>
                                </div>
                                <div className="_mgm-prize-main-button-get _mgm-prize-main-list-ul-li-g"
                                     id="prize-start-btn" onClick={this.clickBtnEvent}
                                     style={{cursor: 'pointer'}}></div>
                                <div id="gift-4" className="gift-4 _mgm-prize-main-list-ul-li-g _mgm-prize-p">
                                    <div className="_mgm-prize-main-list-g-bottom">
                                        现金5-15元
                                    </div>
                                </div>
                            </li>
                            <li className="_mgm-prize-main-list-ul-li">
                                <div id="gift-7" className="gift-7 _mgm-prize-main-list-ul-li-g _mgm-prize-p">
                                    <div className="_mgm-prize-main-list-g-bottom">
                                        智能手环
                                    </div>
                                </div>
                                <div id="gift-6" className="gift-6 _mgm-prize-main-list-ul-li-g _mgm-prize-p">
                                    <div className="_mgm-prize-main-list-g-bottom">
                                        息费红包
                                    </div>
                                </div>
                                <div id="gift-5" className="gift-5 _mgm-prize-main-list-ul-li-g _mgm-prize-p">
                                    <div className="_mgm-prize-main-list-g-bottom">
                                        智能手环
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="_mgm-scroll">
                        <div className="swiper-container">
                            <div className="swiper-wrapper">
                                {
                                    this.state.list.map((v, i) => {
                                        return (
                                            <div key={i}
                                                 className="swiper-slide _mgm-scroll-list">{v.account}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{v.bonus}</div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    {
                        this.state.myBonusList.length ?
                            <Link to={{pathname: 'activity/mgm-a/prize-recive'}} className="_mgm-see-gift-btn">
                                <Button text="查看奖品"
                                        material-button
                                        tracking={{
                                            'activity': 'mgm-qr-mobile',
                                            'lmt-track-id': 'index-see-prize'
                                        }}>
                                </Button>
                            </Link> : null
                    }
                </div>
                {
                    this.state.allTimes || this.props.location.query.hasScanned ?
                        <div className="_mgm-more-gift">
                            <h3>想获得更多奖品?</h3>
                            <div className="_mgm-more-gift-list">
                                <div className="l more-one"></div>
                                <div className="r">
                                    <div className="table-c">
                                        <h4>[ 共同中奖 ]</h4>
                                        <p>邀请好友参与抽奖</p>
                                        <p>Ta中iPhone6s你也中</p>
                                    </div>
                                </div>
                            </div>
                            <div className="_mgm-more-gift-list">
                                <div className="l more-two"></div>
                                <div className="r">
                                    <div className="table-c">
                                        <h4>[ 现金奖励 ]</h4>
                                        <p>邀请卖家好友参与抽奖</p>
                                        <p>返现奖励最高200元/人</p>
                                    </div>
                                </div>
                            </div>
                            <div className="activity-button width85" onClick={this.showMaskModel}>
                                <Button
                                    material-button
                                    tracking={{
                                            'activity': 'mgm-qr-mobile',
                                            'lmt-track-id': 'toShare-bottom'
                                        }}>
                                </Button>
                            </div>
                        </div> : null
                }

                <h2 className="_mgm-h2">［活动规则］</h2>

                <div className="_mgm-aside">
                    <div className="_mgm-aside-text">
                        <i className="_mgm-aside-text-ic">1</i>
                        <span className="_mgm-aside-text-span">使用淘宝账户验证，并登录（注册）商通贷账号即可获得2次抽奖机会。<br/>
                            温馨提示：每个淘宝账号最多可获得2次抽奖机会，抽奖每日可参与1次，若您当日未参与抽奖，系统将于23:59为您自动开奖，敬请留意。</span>
                    </div>
                    <div className="_mgm-aside-text">
                        <i className="_mgm-aside-text-ic">2</i>
                        <span className="_mgm-aside-text-span">邀请好友参与抽奖，若好友抽中iPhone6s，您也可以获得一台iPhone6s。</span>
                    </div>
                    <div className="_mgm-aside-text">
                        <i className="_mgm-aside-text-ic">3</i>
                        <span
                            className="_mgm-aside-text-span">若您邀请的好友是淘宝卖家，您还有机会获得最高200元/人的现金奖励。奖励满30元即可提现。</span>
                    </div>
                    <div className="_mgm-aside-text">
                        <i className="_mgm-aside-text-ic">4</i>
                        <span
                            className="_mgm-aside-text-span">抽中的现金红包及息费红包将直接放入您的商通贷账户，请您注意查收。</span>
                    </div>
                    <div className="_mgm-aside-text">
                        <i className="_mgm-aside-text-ic">5</i>
                        <span className="_mgm-aside-text-span">实物奖品将在您确认收货地址后7个工作日内寄出，请保持手机畅通。</span>
                    </div>
                    <div className="_mgm-aside-text">
                        *本活动将于2月20日结束，请亲们抓住最后机会呦！
                    </div>
                </div>
                <Popup class="_mgm-pop" width="80%" close show={this.state.isAmountShow}>
                    {
                        this.state.bonusType === 'CASH' ?
                            <div className="_mgm-cash-gift-main">
                                <h3>恭喜您中奖了!</h3>
                                <p>{this.state.amount}元现金</p>
                                <div className="button-link-middle">
                                    <Link to={{pathname: 'activity/mgm-a/prize-recive'}}>
                                        <Button text="查看奖品"
                                                material-button
                                                tracking={{
                                                    'activity': 'mgm-qr-mobile',
                                                    'lmt-track-id': 'pop-see-prize'
                                                }}>
                                        </Button>
                                    </Link>
                                </div>
                            </div> :
                            <div className="_mgm-interest-gift-main">
                                <h3>恭喜您中奖了!</h3>
                                <p className="_mgm-interest-gift-p">{this.state.amount}元</p>
                                <p>息费红包</p>
                                <div className="button-link-middle">
                                    <Link to={{pathname: 'activity/mgm-a/prize-recive'}}>
                                        <Button text="查看奖品"
                                                material-button
                                                tracking={{
                                                    'activity': 'mgm-qr-mobile',
                                                    'lmt-track-id': 'pop-see-prize'
                                                }}>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                    }
                </Popup>
                <Popup class="_mgm-already-pop" width="80%" close show={this.state.isAlreadyShow}>
                    <div className="_mgm-sorry-main">
                        <h3>明天再来试试手气吧~</h3>
                        <p>您今天的抽奖机会已用完</p>
                        <div className="button-link-middle" onClick={this.showMaskModel}>
                            <Button text="邀请好友,共赢iPhone6s"
                                    material-button
                                    tracking={{
                                        'activity': 'mgm-qr-mobile',
                                        'lmt-track-id': 'tomorrow-share'
                                    }}>
                            </Button>
                        </div>
                    </div>
                </Popup>
                <Popup class="_mgm-already-pop" width="80%" close show={this.state.isScannedShow}>
                    <div className="_mgm-sorry-main">
                        <h3 className="_mgm-sorry-h3-grey">该淘宝账号抽奖机会已用完</h3>
                        <div className="button-link-middle _mgm-sorry-first-button">
                            <Link to={{pathname: 'activity/mgm-a/prize-taobao'}}>
                                <Button text="我还有其他账号"
                                        material-button
                                        tracking={{
                                            'activity': 'mgm-qr-mobile',
                                            'lmt-track-id': 'another-account'
                                        }}>
                                </Button>
                            </Link>

                        </div>
                        <div className="button-link-middle" onClick={this.showMaskModel}>
                            <Button text="邀请好友,共赢iPhone6s"
                                    material-button
                                    tracking={{
                                            'activity': 'mgm-qr-mobile',
                                            'lmt-track-id': 'isScanned-share'
                                        }}>
                            </Button>
                        </div>
                    </div>
                </Popup>
                <Popup class="_mgm-already-pop" width="80%" show={this.state.isBeforeTaobaoShow}>
                    <div className="_mgm-sorry-main">
                        <h3 className="_mgm-sorry-h3-red">完成淘宝账号验证 <br/>即可参与抽奖
                            <span className="_mgm-sorry-h3-grey">{this.state.second} 秒后为您自动跳转</span>
                        </h3>

                    </div>
                </Popup>
                <MomentModel _onClick={this.hideMaskModel} show={this.state.showMask}></MomentModel>
                <div className="_mgm-h2-footer">
                    活动最终解释权归宜信商通贷所有
                </div>
            </div>
        );
    }
}
PrizeIndex.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export default PrizeIndex;

/**
 * 红包历史
 * @file
 * @auther Created by malin on 16/1/5.
 */
import React from 'react';
import AppData from '../../../component/appData';
import Button from '../../../component/button';
import message from '../../../messageConfig';
import Logo from '../../../component/logo';
import isLogin from '../../../component/isLogin';
import Tracking from '../../../lib/tracking';
import Css3Loading from '../../../modelComponent/css3loading';
import MomentModel from '../../../modelComponent/moments-model';
const {stdApi, stdUserStatus} = AppData.api();
var {invitationCount = 0, invitationAmount = 0} = stdUserStatus && stdUserStatus.mgmInfo;

const {mgmQrInviteApi} = stdApi;

class PrizeRecommend extends React.Component {
    static propTypes = {query: React.PropTypes.object};
    static defaultProps = {
        query: {}
    };

    constructor(props) {
        super(props);
    };

    state = {
        showMask: false,
        rankList: [],
        loading: true
    };


    componentDidMount() {
        this.getRankList();
        Tracking.trackEvent('pageload', {activity: 'mgm-qr-mobile', page: '/m#/activity/mgm-a/prize-rec-m'});
        if (window.location.href.indexOf('showMGMMask=true') > -1) {
            this.setState({
                showMask: true
            });
        }
    };

    //获取排行榜
    getRankList() {
        $.ajax({
            'url': mgmQrInviteApi,
            'type': 'get',
            success: (json) => {
                this.setState({
                    rankList: json,
                    loading: false
                });
            },
            error: () => {
                alert(message.global.errorMessage.net);
            }
        });
    }

    showMaskModel = (e) => {
        isLogin(this, '', () => {
            this.setState({
                loading: false,
                showMask: true
            });
        });
        e.preventDefault();
    };

    hideMaskModel = (e) => {
        this.setState({
            showMask: false
        });
        e.preventDefault();
    };

    render() {
        if (this.state.loading) {
            return <Css3Loading loading={this.state.loading}></Css3Loading>;
        }
        return (
            <div className="_mgm">
                <div className="_mgm-bg-yello">
                    <div className="_mgm-rec-section-1"></div>
                    <div className="_mgm-rec-section-2"></div>
                    <div onClick={this.showMaskModel} className="_mgm-rec-section-3">
                        <Button
                            material-button
                            tracking={{
                                            'activity': 'mgm-qr-mobile',
                                            'lmt-track-id': 'recommend-share-top'
                                        }}>
                        </Button>
                    </div>
                </div>
                <div className="_mgm-bg-red">
                    <h3 className="_mgm-rec-h3">
                        <div className="tx-1"></div>
                    </h3>
                    <div className="tx-1-sec">
                        <div className="sec-1"></div>
                        <div className="sec-2"></div>
                    </div>
                    <h3 className="_mgm-rec-h3">
                        <div className="tx-2"></div>
                    </h3>
                    <div className="_mgm-name-div">
                        <div className="_mgm-my-list-rec">
                            <div className="_mgm-my-list-title-rec">我的推荐</div>
                            <div className="_mgm-my-list-main-rec">
                                <div className="_mgm-my-list-money-rec">
                                    <span className="_mgm-my-list-money-icon-rec"></span>
                                    <span className="_mgm-my-list-money-text-rec">
                                        佣金{invitationCount / 100}元
                                    </span>
                                    <i className="_mgm-my-list-money-text-rec-right"></i>
                                </div>
                                <div className="_mgm-my-list-people-rec">
                                    <span className="_mgm-my-list-people-icon-rec"></span>
                                    <span>
                                        人数{invitationAmount}人
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="money-table">
                            <div>
                                <p className="l money-table-title t-1">排名</p>
                                <p className="l money-table-title t-2">手机号</p>
                                <p className="l money-table-title t-3">所获奖品</p>
                            </div>
                            {
                                this.state.rankList &&
                                this.state.rankList.slice(0, 5).map((v, i) => {
                                    return (
                                        <div className="_mgm-rank-list" key={i}>
                                            <p className="l t-1">{v.rank}</p>
                                            <p className="l t-2">{v.account}</p>
                                            <p className="l t-3">{v.invitationCount}</p>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <h3 className="_mgm-rec-h3">
                        <div className="tx-3"></div>

                    </h3>

                    <div className="tx-3-sec">
                        <h4 className="tx-3-title">活动对象: 所有商通贷注册用户</h4>
                        <p className="tx-3-sec-p">
                            1、登录/注册后即可邀请好友参与抽奖活动，若好友抽中iPhone6s，您也可以获得一台iPhone6s。邀请的好友越多，中奖概率越高！</p>
                        <p className="tx-3-sec-p">2、若您邀请的好友是淘宝卖家，您还有机会获得最高200元/人的现金奖励。奖励满30元即可提现。</p>
                        <p className="tx-3-sec-p">
                            3、截至2月20日24:00，分享排行榜上前五名可获得相应实物奖励。第一名奖品为iPhone6s一台，第二名奖品为JmGo家庭投影仪一台，第三至五名奖品为卓棒智能手环一个。</p>
                        <p className="tx-3-sec-p">*本活动将于2月20日结束，请亲们抓住最后机会呦！</p>
                    </div>
                    <div onClick={this.showMaskModel} className="tx-3-sec-share-btn">
                        <Button
                            material-button
                            tracking={{
                                            'activity': 'mgm-qr-mobile',
                                            'lmt-track-id': 'recommend-share-bottom'
                                        }}>
                        </Button>
                    </div>
                </div>

                <MomentModel _onClick={this.hideMaskModel} show={this.state.showMask}></MomentModel>
                <div className="_mgm-h2-footer">
                    活动最终解释权归宜信商通贷所有
                </div>

            </div>
        );
    }
}
PrizeRecommend.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export default PrizeRecommend;

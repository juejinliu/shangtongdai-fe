/**
 * 红包历史
 * @file
 * @auther Created by malin on 16/1/5.
 */
import React from 'react';
import reactMixin from 'react-mixin';
import AppData from '../../../component/appData';
import Button from '../../../component/button';
import message from '../../../messageConfig';
import Logo from '../../../component/logo';
import Tracking from '../../../lib/tracking';

class PrizeEnding extends React.Component {
    static propTypes = {query: React.PropTypes.object};
    static defaultProps = {
        query: {}
    };

    state = {
        rankList: [{'rank': 1, 'account': '151****4737', 'invitationCount': 'iPhone6s'}, {
            'rank': 2,
            'account': '139****7769',
            'invitationCount': 'JmGo家庭投影仪'
        }, {'rank': 3, 'account': '134****1502', 'invitationCount': '卓棒智能手环'}, {
            'rank': 4,
            'account': '139****4327',
            'invitationCount': '卓棒智能手环'
        }, {'rank': 5, 'account': '137****9737', 'invitationCount': '卓棒智能手环'}],
    };


    componentDidMount() {
        Tracking.trackEvent('pageload', {activity: 'mgm-qr-mobile', page: '/m#/activity/mgm-a/prize-ending-m'});
    };


    render() {
        return (
            <div className="_mgm  _mgm-ending">
                <div className="_mgm-bg-yello">
                    <div className="_mgm-rec-section-1"></div>
                </div>
                <div className="_mgm-bg-red">
                    <div className="_mgm-bg-red-end-text">
                        <p>
                            亲爱的小伙伴，商通贷抽奖活动已于2016年2月20日正式结束。根据活动规则，截至2016年2月20日晚23:59，活动中分享排行榜上的前5名用户可获得相应奖品。
                        </p>
                        <p>
                            获奖名单公布如下，恭喜5位分享达人！
                        </p>

                    </div>
                    <div className="_mgm-name-div">
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

                    <div className="tx-3-sec">
                        <p className="tx-3-sec-p">请以上获奖人保持手机畅通,商通贷工作人员将电话沟通奖品邮寄事宜。</p>
                        <p className="tx-3-sec-p">所有奖品将在7个工作日内统一寄出,请注意查收。</p>
                    </div>
                </div>
                <div className="_mgm-h2-footer">
                    活动最终解释权归宜信商通贷所有
                </div>

            </div>
        );
    }
}
export default PrizeEnding;

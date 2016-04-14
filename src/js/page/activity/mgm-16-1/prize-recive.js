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
import Css3Loading from '../../../modelComponent/css3loading';
import MomentModel from '../../../modelComponent/moments-model';
import Tracking from '../../../lib/tracking';
const {stdApi} = AppData.api();
const {mgmQrMyBonusApi} = stdApi;

class PrizeRecive extends React.Component {
    static propTypes = {query: React.PropTypes.object};
    static defaultProps = {
        query: {}
    };
    static displayName = 'PrizeRecive';
    state = {
        bonusType: '',
        showMask: false,
        myBonusList: [],
        loading: false
    };

    componentDidMount() {
        Tracking.trackEvent('pageload', {activity: 'mgm-qr-mobile', page: '/m#/activity/mgm-a/prize-recive-m'});
        this.getMyBonus();
    };

    //红包历史
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
                    myBonusList: myBonusList,
                    loadingL: true
                });
            },
            error: () => {
                this.setState({
                    loadingL: true
                });
                alert(message.global.errorMessage.net);
            }
        });
    };

    showMaskModel = (e) => {
        this.setState({
            showMask: true
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
        let bonusName = this.state.myBonusList.length && this.state.myBonusList[0].bonusName;
        let bonusTime = this.state.myBonusList.length && this.state.myBonusList[0].bonusTime.split(' ')[0];
        let bonusType = bonusName && bonusName.indexOf('现金') > -1 ? 'cash' : 'interest';
        let className = '_mgm-recive-circular ' + bonusType;
        return (
            <div className="_mgm">
                <Logo></Logo>
                <div className="_mgm-recive">
                    <div className={className}>
                        <h2>{bonusName}</h2>
                        <p>
                            {
                                bonusType === 'cash' ?
                                    <span>点击右上角"个人中心"<br/>进入"我的钱包"查看</span> :
                                    <span>点击右上角"个人中心"<br/>进入"我的红包"查看</span>
                            }
                        </p>
                    </div>

                    <div className="_mgm-recive-say"></div>
                    <div className="activity-button width85" onClick={this.showMaskModel}>
                        <Button
                            material-button
                            tracking={{
                                        'activity': 'mgm-qr-mobile',
                                        'lmt-track-id': 'toShare-recive'
                                      }}>
                        </Button>
                    </div>

                    <h2 className="_mgm-h2">我的奖品</h2>

                    <div className="_mgm-name-div">
                        <div className="money-table">
                            <div>
                                <p className="l money-table-title t-l">奖品名称</p>
                                <p className="l money-table-title t-r">中奖日期</p>
                            </div>
                            {
                                this.state.myBonusList &&
                                this.state.myBonusList.slice(0, 5).map((v, i) => {
                                    return (
                                        <div className="_mgm-rank-list" key={i}>
                                            <p className="l  t-l">{v.bonusName}</p>
                                            <p className="l  t-r">{v.bonusTime.split(' ')[0]}</p>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className="_mgm-aside-text">
                        <i className="_mgm-aside-text-ic">1</i>
                        <span className="_mgm-aside-text-span">现金红包提现</span>
                        <b>点击右上角"个人中心"-"我的钱包"查看，满30元即可提现至您的银行卡。</b>
                    </div>
                    <div className="_mgm-aside-text">
                        <i className="_mgm-aside-text-ic">2</i>
                        <span className="_mgm-aside-text-span">息费红包使用</span>
                        <b>点击右上角"个人中心"—"我的红包"查看，还款时即可抵扣息费。</b>
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
export default PrizeRecive;

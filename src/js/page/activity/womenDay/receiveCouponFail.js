/**
 * 领取兑换券失败
 * Created by gaoyang on 16/3/1.
 */

import React from 'react';
import {Link} from 'react-router';
import Tracking from '../../../lib/tracking';
import AppData from '../../../component/appData';
import redirect from '../../../component/loginRedirect';
import Button from '../../../component/button';
import Logo from '../../../component/logo';
import Customer from '../../../component/customer';
import Css3Loading from '../../../modelComponent/css3loading';

const {stdApi} = AppData.api();
const {isReceivedCouponApi} = stdApi;

class ReceiveCouponFail extends React.Component {

    state = {
        loading: true,
        reasonTop: '',
        reason: ''
    };

    componentWillMount() {
        $.ajax({
            url: isReceivedCouponApi + '?_=' + (new Date).getTime(),
            type: 'get',
            beforeSend: () => {
                this.setState({
                    loading: true
                });
            },
            success: (json) => {
                if (typeof json === 'string') {
                    json = JSON.parse(json);
                }
                if (json.result === 'failure') {
                    let next = window.location.protocol + '//' +
                        window.location.host + window.location.pathname +
                        window.location.search + '#/activity/code/womenDay';
                    window.location.href = next;
                } else if (json.reason && json.reason === 'oldUser') {
                    this.setState({
                        loading: false,
                        reasonTop: '仅限3月7日-9日',
                        reason: '通过本次活动注册用户领取'
                    });
                } else if (json.reason && json.reason === 'noLeft') {
                    this.setState({
                        loading: false,
                        reasonTop: '很遗憾',
                        reason: '今日兑换券已发放完毕'
                    });
                } else {
                    let next = window.location.protocol + '//' +
                        window.location.host + window.location.pathname +
                        window.location.search + '#/activity/womenDay/success';
                    window.location.href = next;
                }
            }
        })
    };

    componentDidMount() {

    };

    render() {
        if (this.state.loading) {
            return <Css3Loading loading={this.state.loading}></Css3Loading>;
        }
        return (
            <div>
                <Logo></Logo>
                <div className="women-day-fail">
                    <div className="fail-banner">
                        {this.state.reasonTop} <br/>
                        {this.state.reason}
                    </div>
                    <p className="try">试试为女王抢一份专属福利</p>
                    <div className="arrow"></div>
                    <div className="main-content">
                        <div className="welfare"></div>
                        <p className="red">
                            3月7日－3月9日，女性用户完成首次借款申请，即可享受<span className="bold">首期息费全免优惠</span>
                        </p>
                        <p>电商女王请直接点击下方按钮申请</p>
                        <p>绅士请将活动分享给电商女王</p>
                        <Link to={{pathname: 'estimate'}} className="toapply-button">

                            <Button
                                text='立即申请'
                                material-button
                                tracking={{
                                        'activity': 'women-day',
                                        'lmt-track-id': 'fail-apply-btn'
                                    }}
                                ></Button>
                        </Link>
                        <div className="flower3"></div>
                        <div className="flower4"></div>
                        <div className="flower5"></div>
                        <div className="flower6"></div>
                    </div>
                    <div className="footer">活动最终解释权归宜信商通贷所有</div>
                </div>
            </div>
        );
    }
}
export default ReceiveCouponFail;


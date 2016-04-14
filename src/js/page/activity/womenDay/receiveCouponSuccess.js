/**
 * 领取兑换券成功
 * Created by gaoyang on 16/3/1.
 */

import React from 'react';
import {Link} from 'react-router';
import Router from 'react-router';
import Tracking from '../../../lib/tracking';
import AppData from '../../../component/appData';
import redirect from '../../../component/loginRedirect';
import Button from '../../../component/button';
import Logo from '../../../component/logo';
import Customer from '../../../component/customer';
import Css3Loading from '../../../modelComponent/css3loading';
const {stdApi} = AppData.api();
const {isReceivedCouponApi} = stdApi;

class ReceiveCouponSuccess extends React.Component {

    state = {
        loading: true,
        couponNum: ''
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
                } else if (json.couponNum == '') {
                    let next = window.location.protocol + '//' +
                        window.location.host + window.location.pathname +
                        window.location.search + '#/activity/womenDay/fail';
                    window.location.href = next;
                } else {
                    this.setState({
                        loading: false,
                        couponNum: json.couponNum
                    });
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
                <div className="women-day-success">
                    <div className="success-banner">
                        恭喜您获得 <br/>
                        红酒兑换券1张
                    </div>
                    <div className="coupon-num">
                        <p className="red bold text-center">
                            兑换券码：{this.state.couponNum}
                        </p>
                        <p className="text-center">(请复制或截图保存)</p>
                    </div>
                    <div className="use-coupon">
                        <div className="title"></div>
                        <ul className="item-list">
                            <li className="item item1">微信关注也买酒订阅号“也买酒Yesmywine”；</li>
                            <li className="item item2">点击底部菜单栏里“福利社”专区的“免费领酒区”；</li>
                            <li className="item item3">将“我爱红酒”商品加入购物车，买单时点击“优惠券”，输入兑换券码，即可0元下单。</li>
                        </ul>
                        <div className="flower2"></div>
                    </div>
                    <div className="main-content">
                        <div className="welfare"></div>
                        <p className="red">
                            3月7日－3月9日，女性用户完成首次借款申请，即可享受<span className="bold">首期息费全免优惠</span>
                        </p>
                        <p className="red small">(申请后进入"我的商通贷"查看红包 还款时可使用)</p>
                        <Link to={{pathname: 'estimate'}} className="toapply-button">
                            <Button
                                text='立即申请'
                                material-button
                                tracking={{
                                        'activity': 'women-day',
                                        'lmt-track-id': 'success-apply-btn'
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
export default ReceiveCouponSuccess;


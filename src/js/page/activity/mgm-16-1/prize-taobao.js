/**
 * 抽奖页面
 * @file
 * @auther Created by malin on 16/1/5.
 */
import React from 'react';
import NoDataTaobao from '../../../termite/noData-taobao';
import Tracking from '../../../lib/tracking';

class PrizeTaobao extends React.Component {

    componentDidMount() {
        Tracking.trackEvent('pageload', {activity: 'mgm-qr-mobile', page: '/m#/activity/mgm-a/prize-taobao-m'});
    }

    render() {
        return (
            <div className="_mgm">
                <NoDataTaobao></NoDataTaobao>
            </div>
        );
    }
}
export default PrizeTaobao;

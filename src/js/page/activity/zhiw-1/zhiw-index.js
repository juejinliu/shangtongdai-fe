/**
 * 红包历史
 * @file
 * @auther Created by malin on 16/1/5.
 */
import React from 'react';
import reactMixin from 'react-mixin';
import Tracking from '../../../lib/tracking';
import Cookie from 'react-cookie';
import AppData from '../../../component/appData';
import Button from '../../../component/button';
import message from '../../../messageConfig';
import Logo from '../../../component/logo';
import Popup from '../../../modelComponent/popup';
import formCheck from '../../../form/formCheck';
import Select from '../../../form/select';
import InputFull from '../../../form/inputFull';
import Css3Loading from '../../../modelComponent/css3loading';
import MomentModel from '../../../modelComponent/moments-model';
const {stdApi} = AppData.api();
const {ydwyEstimationApi} = stdApi;

class ZhiwIndex extends React.Component {
    static propTypes = {query: React.PropTypes.object};
    static defaultProps = {
        query: {}
    };

    contextTypes:{
        router: React.PropTypes.object.isRequired
    };

    state = {
        loading: false,
        isEstimateShow: false
    };

    componentDidMount() {

    };

    _toForm() {
        return formCheck(this);
    };

    ydwyEstimation = (e) => {
        if (this._toForm()) {
            $.ajax({
                'url': ydwyEstimationApi,
                'type': 'get',
                'data': {'_': (new Date).getTime(), 'seller_name': $('#seller_name').val().trim()},
                beforeSend: () => {
                    this.setState({
                        isEstimateShow: true
                    });
                    Tracking.trackEvent('click', {
                        'activity': 'zhiwang-january',
                        'lmt-track-id': 'index-click'
                    });
                },
                success: (json) => {
                    if (json.result === 'success') {
                        this.setState({
                            isEstimateShow: false
                        });
                        Tracking.trackEvent('click', {
                            'activity': 'zhiwang-january',
                            'lmt-track-id': 'estimate-success'
                        });
                        let estimation = json.estimation;
                        let money = estimation.split(',').join('');
                        if (money > 10000) {
                            money = parseInt((money / 10000).toFixed(2));
                        } else {
                            money = (money / 10000).toFixed(2);
                        }
                        this.context.router.push('activity/code/zhiwang', {money: money});
                    } else {
                        if (json.result === 'failure') {
                            if (json.message.indexOf('人工预估') > -1) {
                                alert('请确认您的网店会员名');
                            } else {
                                alert(json.message);
                            }
                        }
                        this.setState({
                            isEstimateShow: false
                        });
                    }
                },
                error: () => {
                    this.setState({
                        isEstimateShow: false
                    });
                    Tracking.trackEvent('click', {
                        'activity': 'zhiwang-january',
                        'lmt-track-id': 'estimate-fail'
                    });
                    this.context.router.push('activity/code/zhiwang', {money: 1.2});
                }
            });
        }
        e.preventDefault();
    };


    render() {
        if (this.state.loading) {
            return <Css3Loading loading={this.state.loading}></Css3Loading>;
        }
        return (
            <div className="zhiw-1">
                <section className="zhiw-1-section-1">
                    <div className="zhiw-1-sec-form">
                        <InputFull
                            type="text"
                            width="100%"
                            name="seller_name"
                            className="zhiw-1-seller-name"
                            ref="account"
                            id="seller_name"
                            placeholder="请填写您的网店会员名"
                            validate={{require: '请填写您的网店会员名'}}>
                        </InputFull>
                    </div>
                    <div className="zhiw-1-sec-button button-link-full" onClick={this.ydwyEstimation}>
                        <Button
                            text="立即预估"
                            material-button
                            tracking={{
                                'activity': 'zhiwang-january',
                                'lmt-track-id': 'estimate'
                            }}
                        ></Button>
                    </div>
                </section>
                <section className="zhiw-1-section-2"></section>
                <Popup class="zhiw-1-pop" width="80%" close show={this.state.isEstimateShow}>
                    <div className="zhiw-1-pop-main">
                        <img className="zhiw-1-pop-gif" width="200" height="150"
                             src="http://static.yixin.com/file/T1iXWTBQdO1RCvBVdKBPEB.gif" alt=""/>
                        <div className="zhiw-1-pop-text">正在玩命为您估算,请稍候...</div>
                    </div>
                </Popup>
            </div>
        );
    }
}
export default ZhiwIndex;

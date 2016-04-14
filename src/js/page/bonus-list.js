/**
 * Created by malin on 15/6/9.
 */

var React = require('react'),
    AppData = require('./../component/appData'),
    Logo = require('../component/logo'),
    Customer = require('./../component/customer'),
    appData = require('../component/appData'),
    Css3Loading = require('../modelComponent/css3loading'),
    ThreeNav = require('../component/threeNav');

const {stdApi} = AppData.api();

const bonusApi = stdApi.bonusApi;

let BonusList = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getDefaultProps() {
        return {
            params: {status: 'used'}
        };
    },

    getInitialState() {
        let active = '未使用红包';

        if (this.props.params.status === 'used') {
            active = '已使用红包';
        }
        if (this.props.params.status === 'over') {
            active = '已过期红包';
        }
        return {
            active: active,
            loading: false,
            json: ''
        };
    },

    componentDidMount() {
        if (this.props.params.status === 'used') {
            this.getData(bonusApi, {used: true});
        } else if (this.props.params.status === 'over') {
            this.getData(bonusApi, {used: false, expired: true});
        } else {
            this.getData(bonusApi, {used: false, expired: false});
        }
    },

    getData(url, sendData) {
        let self = this;
        $.ajax({
            'url': url,
            'type': 'get',
            'data': {'data': JSON.stringify(sendData), _: (new Date).getTime()},
            'dataType': 'jsonp',
            'jsonp': 'callback',
            beforeSend: function () {
                self.setState({loading: true});
            },
            success: function (json) {
                try {
                    self.setState(
                        {
                            loading: false,
                            json: json.data
                        });
                    if (sendData.used === true) {
                        appData.bonusList.used = json.data;
                    } else if (sendData.expired === true) {
                        appData.bonusList.over = json.data;
                    } else {
                        appData.bonusList.unuse = json.data;
                    }

                } catch (ex) {
                    alert('请检查您的网络或稍后再试。');
                }
            },
            error: function () {
                self.setState({loading: false});
                alert('请检查您的网络或稍后再试。');
            }
        });
    },

    changeNav(e) {
        if (e.target.innerText === '未使用红包') {
            if (appData.bonusList && appData.bonusList.unuse !== '') {
                this.setState({
                    json: appData.bonusList.unuse
                });
            } else {
                this.getData(bonusApi, {used: false, expired: false});
            }
            this.setState({
                active: '未使用红包'
            });
            this.context.router.push('/bonus-list/unuse');
        } else if (e.target.innerText === '已使用红包') {
            if (appData.bonusList && appData.bonusList.used !== '') {
                this.setState({
                    json: appData.bonusList.used
                });
            } else {
                this.getData(bonusApi, {used: true});
            }
            this.setState(
                {
                    active: '已使用红包'
                });
            this.context.router.push('/bonus-list/used');
        } else {
            if (appData.bonusList && appData.bonusList.over !== '') {
                this.setState({
                    json: appData.bonusList.over
                });
            } else {
                this.getData(bonusApi, {used: false, expired: true});
            }
            this.setState({
                active: '已过期红包'
            });
            this.context.router.push('/bonus-list/over');
        }
    },

    getBonusList(json) {
        let divs = '';
        if (json.length > 0) {
            divs = json.map((data, v) => {
                let expire = data.expire,
                    amount = data.amount,
                    activityDesc = data.activityDesc,
                    bonusEvent = data.bonusEvent,
                    bonusRemarkOpt = data.bonusRemarkOpt;
                return <li key={v}>
                    <div className="bonus-list-div">
                        {bonusEvent === 'AUGUST_REBATE' ?
                            <div className="left redpack-pic-augustRebate">
                                <a href="https://shangdai.yixin.com/m/activity/rebate818?lmt-track-id=ad-augustRebate-redpack#/"></a>
                            </div>
                            :
                            <div className="left">

                            {bonusRemarkOpt ?
                                      <p>{bonusRemarkOpt}</p>
                                      :
                                      <p className="money">¥{amount}</p>
                                    }
                                    <p>{activityDesc}</p>
                            </div>
                        }
                        <div className="right">
                            <p className="time">有效期至{expire}</p>
                            {bonusEvent === 'AUGUST_REBATE' ?
                                <p className="text">仅限归还息费使用</p>
                                :
                                <p className="text">仅限归还利息使用</p>
                            }
                        </div>
                    </div>
                </li>;
            });
            return <div>
                <ul className="bonus-list">
                    {divs}
                </ul>
            </div>;
        } else {
            divs = <div className="no-bonus">
                <div></div>
                <p>您还没有红包</p>

            </div>;
            return <div>
                {divs}
            </div>;
        }

    },

    render() {
        let json = this.state.json,
            ele = this.getBonusList(json);
        return (
            <div>
                <Logo></Logo>

                <ThreeNav onClick={this.changeNav}
                          textArr={['未使用红包', '已使用红包', '已过期红包']}
                          active={this.state.active}>
                </ThreeNav>

                <div className="bonus-list">
                    {ele}
                </div>
                <Css3Loading loading={this.state.loading}></Css3Loading>
                <Customer></Customer>
            </div>
        );
    }
});
module.exports = BonusList;

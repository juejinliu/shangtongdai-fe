/**
 * Created by malin on 15/9/11.
 */
var React = require('react'),
    {Link} = require('react-router'),
    Logo = require('./../component/logo'),
    AppData = require('./../component/appData'),
    Waypoint = require('react-waypoint'),
    BonusNav = require('./../component/bonus-nav'),
    isLogin = require('./../component/isLogin'),
    Css3Loading = require('./../modelComponent/css3loading'),
    Button = require('./../component/button'),
    Moment = require('moment'),
    Tracking = require('./../lib/tracking');

const {stdApi, stdUserStatus} = AppData.api();
const {withdrawLimit} = stdUserStatus && stdUserStatus.mgmInfo;

const [mgmBonus, mgmAccountDetail] = [stdApi.mgmBonusApi, stdApi.mgmAccountDetailApi];
let SharePackage = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            money: 0,
            monthReciveMoney: 0,
            allReciveMoney: 0,
            reciveElement: [],
            loading: true,
            loadData: '正在获取数据',
            reciveBonusPage: 1,
            allDetailPage: 1,
            itemsPerPage: 8,
            canLoadData: true,
            select: true
        };
    },

    isApplyableShowPage() {
        let self = this;
        isLogin(self, '', function () {
            self.getAccountDetail();
            self._handleWaypointEnter();

        });
    },

    getReciveBonus() {
        let self = this;
        let page = this.state.reciveBonusPage;
        $.ajax({
            'url': mgmBonus,
            'type': 'get',
            'data': {
                startDate: '2015-09-10',
                endDate: Moment().format('YYYY-MM-DD'),
                field: 'REBATE_HISTORY',
                page: page,
                itemsPerPage: this.state.itemsPerPage,
                _: (new Date).getTime()
            },
            beforeSend: function () {
                self.setState({
                    select: false,
                    canLoadData: false
                });
            },
            success(data) {
                self.setState({
                    select: true
                });
                let allData = JSON.parse(data);
                let json = allData.result;
                let length = json.length;
                let count = allData.count;
                if (count === 0) {
                    self.setState({
                        loadData: '',
                        canLoadData: false

                    });
                } else {
                    let arr = self.state.reciveElement;
                    if (length) {
                        arr.push(json.map(function (v, index) {
                                return (
                                    <li className="money-details-li" key={index}>
                                        <p className="money-details-title l">成功推荐</p>

                                        <p className="money-details-date l">{v.date}</p>

                                        <p className="money-details-money r">
                                            <span>{v.unitPrice / 100}元</span>
                                            <span className="money-details-blue">*{v.num}人</span>
                                        </p>
                                    </li>
                                );
                            }
                        ));
                        if (count === self.state.reciveBonusPage && length <= self.state.itemsPerPage) {
                            self.setState({
                                loadData: '没有更多数据',
                                canLoadData: false
                            });
                        } else if (count > 10) {
                            self.setState({
                                loadData: '请在电脑版中查看更多数据',
                                canLoadData: false
                            });
                        } else {
                            self.setState({
                                reciveBonusPage: self.state.reciveBonusPage + 1,
                                reciveElement: arr,
                                canLoadData: true
                            });
                        }

                    } else {
                        self.setState({
                            loadData: '没有更多数据',
                            canLoadData: false

                        });
                    }
                }

            },
            error() {
                self.setState({
                    select: true
                });
            }
        });
    },

    getAllDetails() {
        let self = this;
        let page = this.state.allDetailPage;
        $.ajax({
            'url': mgmBonus,
            'type': 'get',
            'data': {
                startDate: '2015-09-10',
                endDate: Moment().format('YYYY-MM-DD'),
                field: 'ACCOUNT_DETAIL',
                page: page,
                itemsPerPage: self.state.itemsPerPage,
                _: (new Date).getTime()
            },
            beforeSend: function () {
                self.setState({
                    select: false,
                    canLoadData: false

                });
            },
            success(data) {
                self.setState({
                    select: true
                });
                let allData = JSON.parse(data);
                let json = allData.result;
                let length = json.length;
                let count = allData.count;
                if (count === 0) {
                    self.setState({
                        loadData: '',
                        canLoadData: false
                    });
                } else {
                    let arr = self.state.reciveElement;
                    if (length) {
                        arr.push(json.map(function (v, index) {
                                return (
                                    <li className="money-details-li" key={index}>
                                        <p className="money-details-title l">{v.desc}</p>

                                        <p className="money-details-date l">{v.date}</p>

                                        <p className="money-details-money r">
                                            <span>{v.amount / 100}元</span>
                                        </p>
                                    </li>
                                );
                            }
                        ));
                        if (count === self.state.allDetailPage && length <= self.state.itemsPerPage) {
                            self.setState({
                                loadData: '没有更多数据',
                                canLoadData: false

                            });
                        } else if (count > 10) {
                            self.setState({
                                loadData: '请在电脑版中查看更多数据',
                                canLoadData: false

                            });
                        } else {
                            self.setState({
                                allDetailPage: self.state.allDetailPage + 1,
                                reciveElement: arr,
                                canLoadData: true
                            });
                        }

                    } else {
                        self.setState({
                            loadData: '没有更多数据',
                            canLoadData: false

                        });
                    }

                }
            },
            error() {
                self.setState({
                    select: true
                });
            }
        });
    },

    getAccountDetail() {
        let self = this;
        $.ajax({
            'url': mgmAccountDetail,
            'type': 'get',
            'data': {_: (new Date).getTime()},

            success(data) {
                let json = JSON.parse(data);
                try {
                    self.setState({
                        money: json.balanceTotal / 100,
                        monthReciveMoney: json.incomeCurMonth / 100,
                        allReciveMoney: json.incomeTotal / 100,
                        loading: false

                    });
                } catch (e) {
                    console.log(e);
                }
            },
            error() {
                alert('请检查您的网络');
            }
        });
    },

    _changeSelect(e) {
        let val = e.target.value;
        this.setState({
            reciveElement: [],
            canLoadData: true,
            reciveBonusPage: 1,
            allDetailPage: 1,
            loadData: '正在获取数据'

        });
        if (val === 'ACCOUNT_DETAIL') {
            Tracking.trackEvent('click', {
                'activity': 'mgm-package',
                'lmt-track-id': 'mgm-package-allDetails'
            });
        } else {
            Tracking.trackEvent('click', {
                'activity': 'mgm-package',
                'lmt-track-id': 'mgm-package-reciveBonus'
            });
        }

        this._handleWaypointEnter(e, true);
    },

    _handleWaypointEnter(e, renderData) {
        if (renderData === true || this.state.canLoadData) {
            let selectValue = document.querySelector('#detailSelect').value;
            if (selectValue === 'REBATE_HISTORY') {
                this.getReciveBonus();
            } else {
                this.getAllDetails();
            }
        }

    },

    componentDidMount() {
        this.isApplyableShowPage();
    },

    render() {
        if (this.state.loading) {
            return <Css3Loading loading={this.state.loading}></Css3Loading>;
        }
        return (
            <div>
                <Logo></Logo>
                <div className="share-package">
                    <div className="package-top">
                        <div className="share-package-money">
                            <h2 className="share-package-money-h2">
                                账户余额
                            </h2>
                            <p className="share-package-p">
                                <span className="share-package-num">{this.state.money}</span>
                                <span>元</span>
                            </p>
                        </div>
                        {
                            this.state.money >= withdrawLimit ?
                                <div>
                                    <Link className="share-package-button" to="cashOut">
                                        <Button
                                            material-button
                                            text="提现"
                                            tracking={{'activity': 'mgm-package','lmt-track-id': 'mgm-cashout'}}>
                                        </Button>
                                    </Link>
                                    <div className="share-package-button-notice-text">满{withdrawLimit}可提现</div>
                                </div>
                                :
                                <div>
                                    <div className="share-package-button" style={{opacity: 0.5}}>提现</div>
                                    <div className="share-package-button-notice-text">满{withdrawLimit}可提现</div>
                                </div>
                        }
                    </div>
                    <div className="recive-money">
                        <div className="recive-month l">
                            <p className="recive-name">本月收入</p>

                            <p className="recive-money-num">
                                ¥{this.state.monthReciveMoney}元
                            </p>
                        </div>
                        <div className="recive-all l">
                            <p className="recive-name">总收入</p>

                            <p className="recive-money-num">
                                ¥{this.state.allReciveMoney}元
                            </p>
                        </div>
                    </div>
                    <div className="money-details">
                        <div className="money-details-title">
                            <hr className="title-hr l"/>
                            <select name="list" className="title-select" disabled={!this.state.select} id="detailSelect"
                                    onChange={this._changeSelect}>
                                <option value="REBATE_HISTORY">返佣历史</option>
                                <option value="ACCOUNT_DETAIL">账户明细</option>
                            </select>
                            <hr className="title-hr r"/>
                        </div>
                        <ul className="money-details-ul">
                            {this.state.reciveElement.length ? this.state.reciveElement :
                                <div className="no-list">当前无记录</div> }
                        </ul>
                    </div>


                    <div className="loadDataText">{this.state.loadData}</div>
                    <Waypoint
                        onEnter={this._handleWaypointEnter}
                        onLeave={this._handleWaypointLeave}
                    />
                    <BonusNav index="2"></BonusNav>
                </div>
            </div>

        );
    }
});
module.exports = SharePackage;
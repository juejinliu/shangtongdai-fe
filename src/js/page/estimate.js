/**
 * Created by malin on 15/5/4.
 */
var React = require('react'),
    {Link} = require('react-router'),
    AppData = require('./../component/appData'),
    Event = require('./../lib/trigger'),
    Css3Loading = require('./../modelComponent/css3loading'),
    SetIntervalMixin = require('./../component/setIntervalMixin'),
    Button = require('./../component/button'),
    Loading = require('./../modelComponent/loading'),
    Logo = require('./../component/logo'),
    ErrorMessage = require('./../component/errorMessage'),
    Customer = require('./../component/customer'),
    Tracking = require('./../lib/tracking'),
    message = require('./../messageConfig'),
    ConfirmModel = require('./../modelComponent/confirmModel'),
    isLogin = require('./../component/isLogin'),
    FullPageModel = require('./../modelComponent/fullPageModel'),
    MobilePlatform = require('./../lib/mobilePlatform'),
    ListDelete = require('./../component/listDelete'),
    Banner = require('./../component/banner'),
    IndividualSubAccountList = require('./../compositeComponents/individualCredit/individualSubAccountList');

const {stdApi, stdUserStatus} = AppData.api();

const [estimateApi, applyable, appStatus, isLoggedIn, occupiedAmountCents, submitAllAccounts, deleteApi, ebayApi, {isWechatUa}] = [
    stdApi.estimateApi,
    stdUserStatus.applyable,
    stdUserStatus.appStatus,
    stdUserStatus.isLoggedIn,
    stdApi.occupiedAmountCents,
    stdApi.submitAllAccounts,
    stdApi.deleteApi,
    stdApi.ebayApi,
    MobilePlatform
];

var firstVisit = true,
    redirected = false,
    granted = false,
    notSubmitted = false,
    submitted = false,
    expired = false,
    rejected = false,
    ebayExpired = false,
    amazonExpired = false;

let AccountList = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            isSubAccountShow: true
        };
    },

    deleteAccount(pt, id) {
        return function () {
            $.ajax({
                'url': deleteApi + pt + '/remove/' + id,
                'type': 'get',
                'dataType': 'jsonp',
                'data': {_: (new Date).getTime()},
                beforeSend() {
                    $.publish('beforeDelete');
                },
                success: function () {
                    $.publish('delete');
                }
            });
        };
    },

    getEbay() {
        $.publish('getEbayUrl');
        $.ajax({
            'url': ebayApi,
            'type': 'get',
            'dataType': 'jsonp',
            'data': {_: (new Date).getTime()},
            success: function (json) {
                try {
                    window.location.href = json.url;
                } catch (ex) {
                    return false;
                }
            }
        });
        return false;
    },

    subAccountShow() {
        this.setState({
            isSubAccountShow: !this.state.isSubAccountShow
        });
    },

    authorizeUrl(platform, account) {
        let platforms = ['ebay', 'amazon', 'wish', 'aliexpress', 'taobao', 'tmall'];
        let platformLis = platforms.map((platform) => {
            var enabledClass = 'add-icon ' + platform + '-icon';
            var disabledClass = 'add-icon disable-' + platform + '-icon';
            var platformLink = platform + 'Account';
            if (['aliexpress', 'taobao', 'tmall'].indexOf(platform) >= 0) {
                platformLink = 'platform-account';
            } else if (platform === 'ebay') {
                platformLink = 'amazonAccount';
            }
            return <li key={platform}>
                <Link to={{pathname: platformLink}} onClick={this.getEbay}>
                    <p className={enabledClass} data-name={platform}>
                        <Button
                            material-button
                            tracking={{'lmt-track-id': platform}}>
                        </Button>
                    </p>
                </Link>
            </li>;
        });
        return () => {
            if (platform === 'EBAY') {
                this.getEbay();
            } else if (platform === 'AMAZON') {
                this.context.router.push('amazonAccount', {expiredAccount: account});
            } else if (platform === 'WISH') {
                this.context.router.push('wishAccount');
            } else {
                this.context.router.push('authorize', {pt: platform, account: account});
            }
        };
    },
    render() {
        let li = this.props.list.map((value, index) => {
            var classNameIcon = 'icon-';
            var classNameState = 'state-';
            var elementAuthorized = '';
            if (value.submitStatus === 'GRANTED') {
                elementAuthorized = '已授信';
            } else if (value.submitStatus === 'SUBMITTED') {
                elementAuthorized = '审核中';
            } else {
                elementAuthorized =
                    ((value.amountCents) / 1000000).toFixed(2) > 10 ?
                    ((value.amountCents) / 1000000).toFixed(1) + '万' :
                    ((value.amountCents) / 1000000).toFixed(2) + '万';
            }

            classNameIcon += value.platform;
            return <ListDelete key={index} delEvent={this.deleteAccount(value.platform, value.tokenId)}
                               isdelete={(value.submitStatus === 'NOT_SUBMITTED' || value.submitStatus === 'EXPIRED') && value.platform !== 'INDIVIDUALCREDIT'}>
                <div className="li"
                     onClick={value.platform === 'INDIVIDUALCREDIT' ? this.subAccountShow : null}>
                    <div className="icon">
                        <p className={classNameIcon}></p>
                    </div>
                    <div className="accountDiv">
                        {
                            value.submitStatus === 'EXPIRED' ?
                                <div className="status"
                                     onClick={this.authorizeUrl(value.platform, value.account)}
                                    >
                                    <p>
                                        重新授权
                                    </p>
                                </div>
                                : null
                        }
                        <p className="money">
                            {elementAuthorized}
                        </p>

                        {
                            //个人消费账号不显示账号名
                            value.platform === 'INDIVIDUALCREDIT' ?
                                <p className="account"></p> :
                                <p className="account"
                                   style={{textDecoration: value.submitStatus === 'EXPIRED' ? 'line-through' : 'none'}}>{value.account}</p>
                        }

                    </div>
                    {
                        value.platform === 'INDIVIDUALCREDIT' ?
                            <IndividualSubAccountList
                                isSubAccountShow={this.state.isSubAccountShow}
                                subAccount={JSON.parse(value.details)}
                                >
                            </IndividualSubAccountList>
                            :
                            null
                    }
                </div>
            </ListDelete>;
        });
        return (
            <div>
                <ul className="estimate-ul">
                    {li}
                </ul>
            </div>
        );
    }
});

var Estimate = React.createClass({
    mixins: [SetIntervalMixin],

    contextTypes: {
        router: React.PropTypes.object.isRequired

    },


    getDefaultProps() {
        return {
            addIndividualInfo: appStatus && appStatus.status === message.userStatus.addIndividualInfo
        };
    },

    getInitialState() {
        return {
            amount: 0,
            requestNum: 0,
            addAmount: 0,
            occupiedAmount: 0,
            grantedAmountCents: 0,
            expiredAmountCents: 0,
            remainedAmount: 0,
            amazonSecond: 3,
            ebaySecond: 3,
            hasConfirmableItem: true,
            showLoading: true,
            loading: false,
            h2Text: '您的预估额度为',
            platform: [],
            account: [],
            amazonExpiredAccount: '',
            ebayExpiredAccount: '',
            authorized: true,
            loanText: '申请借款',
            list: [],
            errorMessage: '',
            canLoan: false,
            addEstimate: false,
            estimateAssign: {'display': 'none'},
            eleModel: '',
            showModel: false,
            showConfirmModel: false,
            eleConfirmMain: '',
            whichModel: this.props.location.query.showModel
        };
    },

    componentDidUpdate() {
        // 弹窗3秒后跳转，隐藏close按钮
        let alertNoclose = $('.alertNoClose');
        if (alertNoclose.length) {
            alertNoclose.parent().find('.close').hide();
        }
    },

    componentDidMount: function () {
        if (!redirected) {
            this.estimate();
        }
        redirected = false;
        $.subscribe('beforeDelete', () => {
            this.setState({
                loading: true
            });
        });
        $.subscribe('delete', () => {
            this.estimate();
        });
        $.subscribe('getEbayUrl', () => {
            this.setState({
                loading: true
            });
        });

    },
    estimate() {
        let self = this;
        $.ajax({
            'url': estimateApi,
            'type': 'get',
            'data': {group: 'all', _: (new Date).getTime()},
            'dataType': 'jsonp',
            beforeSend() {
                granted = false;
                notSubmitted = false;
                submitted = false;
                self.setState({
                    showConfirmModel: false,
                    canLoan: false
                });
            },
            success(data) {
                let num = 0;
                let amountCents = 0;
                let platformArr = [];
                let accountArr = [];
                let getCrantedAmountCents = true;

                try {
                    let json = data.result;
                    let jsonLength = json.length;
                    let addAmount = 0;
                    if (jsonLength) {
                        for (let value of json) {
                            if (value.progress === 100) {
                                num += 1;
                                amountCents += Number(value.amountCents);
                                platformArr.push(value.platform);
                                accountArr.push(value.account);
                                if (!value.authorized) {
                                    self.setState({
                                        authorized: false
                                    });
                                }
                                //如果包含授信账号则文字修改，已使用额度，总授信额度信息显示，纪录有授信账号状态
                                if (value.submitStatus === 'GRANTED') {
                                    self.setState({
                                        h2Text: '您的可用授信额度为',
                                        estimateAssign: {'display': 'block'},
                                        canLoan: true
                                    });
                                    granted = true;
                                } else if (value.submitStatus === 'SUBMITTED') {
                                    submitted = true;
                                } else if (value.submitStatus === 'NOT_SUBMITTED') {
                                    self.setState({canLoan: true});
                                    addAmount += value.amountCents;
                                    notSubmitted = true;
                                } else if (value.submitStatus === 'EXPIRED') {
                                    expired = true;
                                    if (value.platform === 'EBAY') {
                                        ebayExpired = true;
                                        self.setState({
                                            ebayExpiredAccount: value.account
                                        });
                                    } else if (value.platform === 'AMAZON') {
                                        amazonExpired = true;
                                        self.setState({
                                            amazonExpiredAccount: value.account
                                        });
                                    }
                                } else if (value.submitStatus === 'REJECTED') {

                                    rejected = true;
                                }

                                // 这里不是审核中， 不是新账号 调用授信接口
                                if (value.submitStatus !== 'SUBMITTED' && value.submitStatus !== 'NOT_SUBMITTED') {
                                    if (getCrantedAmountCents) {
                                        getCrantedAmountCents = self.occupiedAmountCents();
                                    }
                                }

                                if (granted && (notSubmitted || submitted)) {
                                    self.setState({addEstimate: true});
                                } else {
                                    self.setState({addEstimate: false});

                                }
                            }
                        }
                    }
                    if (num === jsonLength) {
                        if (granted) {
                            self.setState({
                                addAmount: (addAmount / 1000000).toFixed(2) > 10 ?
                                    (addAmount / 1000000).toFixed(1) :
                                    (addAmount / 1000000).toFixed(2),
                                list: json,
                                showLoading: false,
                                loading: false,
                                platform: platformArr,
                                account: accountArr,
                                addEstimate: addAmount ? true : false

                            });
                        } else {
                            self.setState({
                                amount: (amountCents / 1000000).toFixed(2) > 10 ?
                                    (amountCents / 1000000).toFixed(1) :
                                    (amountCents / 1000000).toFixed(2),
                                addAmount: (addAmount / 1000000).toFixed(2) > 10 ?
                                    (addAmount / 1000000).toFixed(1) :
                                    (addAmount / 1000000).toFixed(2),
                                list: json,
                                showLoading: false,
                                loading: false,
                                platform: platformArr,
                                account: accountArr

                            });
                        }


                    } else {
                        setTimeout(self.estimate, 1000);
                        self.setState({
                            showLoading: true,
                            loading: false
                        });
                    }

                } catch (ex) {
                    self.setState({
                        showLoading: false,
                        loading: false,
                        errorMessage: '请检查您的网络，或稍后再试'
                    });
                }

            },
            error: function () {
                self.setState({
                    showLoading: false,
                    loading: false,
                    errorMessage: '请检查您的网络，或稍后再试'
                });
            }
        });
    },

    occupiedAmountCents() {
        let self = this;
        $.ajax({
            'url': occupiedAmountCents,
            'type': 'get',
            'dataType': 'jsonp',
            'data': {_: (new Date).getTime()},
            success: function (json) {
                let grantedAmountCents = json.grantedAmountCents;
                let occupiedAmountCents = json.occupiedAmountCents;
                let remainedAmount = grantedAmountCents - occupiedAmountCents;
                if (remainedAmount < 0) {
                    remainedAmount = 0;
                }
                self.setState({
                    amount: (remainedAmount / 1000000).toFixed(2) > 10 ?
                        (remainedAmount / 1000000).toFixed(1) :
                        (remainedAmount / 1000000).toFixed(2),
                    occupiedAmount: (occupiedAmountCents / 1000000).toFixed(2) > 10 ?
                        (occupiedAmountCents / 1000000).toFixed(1) :
                        (occupiedAmountCents / 1000000).toFixed(2),
                    grantedAmountCents: (grantedAmountCents / 1000000).toFixed(2) > 10 ?
                        (grantedAmountCents / 1000000).toFixed(1) :
                        (grantedAmountCents / 1000000).toFixed(2),
                    expiredAmountCents: json.expiredAmountCents,
                    hasConfirmableItem: json.hasConfirmableItem
                });
            }
        });
        return false;
    },

    submitAllAccounts() {
        let self = this;
        $.ajax({
            'url': submitAllAccounts,
            'type': 'get',
            'dataType': 'jsonp',
            'data': {_: (new Date).getTime()},
            success: function (json) {
                if (json.result === 'success') {
                    self.estimate();
                    self.setState({loanText: '审核中', showLoading: false});
                } else {
                    self.setState({showLoading: false});
                    self.context.router.push('loanAddInfo');

                }
            },
            error: function () {
                alert('请检查网络，或刷新再试');
                self.setState({showLoading: false});
            }
        });
    },

    goLoan(e) {
        if (!this.state.hasConfirmableItem) {    // 额度过期啦
            if (amazonExpired) {
                //    亚马逊过期弹窗
                this.getAmazonEle();
                this.setState({
                    showConfirmModel: true
                });
            } else if (ebayExpired) {
                //    ebay过期弹窗
                this.getEbayEle();
                this.setState({
                    showConfirmModel: true
                });
            } else {
                this.context.router.push('loan');

            }
        } else {
            //补充个人材料
            if (this.props.addIndividualInfo) {
                this.context.router.push('loanAddInfo');
            } else if (granted && notSubmitted) {
                this.setState({
                    showConfirmModel: true,
                    eleConfirmMain: this.getConfirmModelEle()
                });
            } else if (submitted && notSubmitted) {
                this.setState({loanText: '提交中', canLoan: false, loading: true});
                this.submitAllAccounts();
            } else if (granted && !(submitted || notSubmitted)) {
                this.context.router.push('loanConfirm');
            } else if (rejected) {
                this.context.router.push('loanFail');
            } else {
                this.context.router.push('loan');
            }
        }
        e.preventDefault();
    },

    jumpLoan(e) {
        if (expired) {
            if (amazonExpired) {
                //    亚马逊过期弹窗
                this.getAmazonEle();
                this.setState({
                    showConfirmModel: true
                });
            } else if (ebayExpired) {
                //    ebay过期弹窗
                this.getEbayEle();
                this.setState({
                    showConfirmModel: true
                });
            }
        } else {
            this.context.router.push('loan');
        }
        e.preventDefault();
    },

    jumpLoanConfirm(e) {
        this.context.router.push('loanConfirm');
        e.preventDefault();
    },

    getConfirmModelEle() {
        return (
            <div>
                <p className="text">您新添加的账号需要1-2天审核，这可能会提升您的续借额度。</p>

                <p className="text">您也可以选择不等待，立即续借现有剩余金额。</p>

                <div className="button button-l" onClick={this.jumpLoan}>
                    <Button
                        text="我可以等"
                        material-button
                        tracking>
                    </Button>
                </div>
                <div className="button button-r" onClick={this.jumpLoanConfirm}>
                    <Button
                        text="立即续借"
                        material-button
                        tracking>
                    </Button>
                </div>
            </div>
        );
    },

    jumpAmazon() {
        this.context.router.push('amazonAccount', {expiredAccount: this.state.amazonExpiredAccount});
    },

    getAmazonEle() {
        this.setState({
            eleConfirmMain: this.getConfirmModelEleAmazon()
        });
        this.setInterval(() => {
            this.setState({
                amazonSecond: this.state.amazonSecond - 1,
                eleConfirmMain: this.getConfirmModelEleAmazon()

            });
            if (this.state.amazonSecond === 0) {
                this.jumpAmazon();
            }
        }, 1000);
    },

    getEbayEle() {
        this.setState({
            eleConfirmMain: this.getConfirmModelEleEbay()
        });
        this.setInterval(() => {
            this.setState({
                ebaySecond: this.state.ebaySecond - 1,
                eleConfirmMain: this.getConfirmModelEleEbay()

            });
            if (this.state.ebaySecond === 0) {
                this.getEbay();
            }
        }, 1000);
    },


    getConfirmModelEleAmazon() {
        return (
            <div className="alertNoClose">
                <p className="text-center ">您的Amazon账号已过期</p>

                <p className="text-center">账号：{this.state.amazonExpiredAccount} 需重新授权</p>

                <p className="text-center"><span style={{color: 'red'}}>{this.state.amazonSecond - 1}</span> 秒后，将为您跳转
                </p>

                <div className="button estimate-confirm-button" onClick={this.jumpAmazon}>
                    <Button
                        text="立即跳转"
                        material-button
                        tracking>
                    </Button>
                </div>
            </div>
        );
    },

    getConfirmModelEleEbay() {
        return (
            <div className="alertNoClose">
                <p className="text-center">您的Ebay账号已过期</p>

                <p className="text-center">账号：{this.state.ebayExpiredAccount} 需重新授权</p>

                <p className="text-center"><span style={{color: 'red'}}>{this.state.ebaySecond - 1}</span> 秒后，将为您跳转</p>

                <div className="button" onClick={this.getEbay()}>
                    <Button
                        text="立即跳转"
                        material-button
                        tracking>
                    </Button>
                </div>
            </div>
        );
    },


    render() {
        if (this.state.loading) {
            return <Css3Loading loading={this.state.loading}></Css3Loading>;
        }

        let styleH2Div = {};
        if (this.state.hasConfirmableItem) {
            styleH2Div = {
                margin: '30px auto 20px',
                textAlign: 'center',
                padding: '0 10px 0'
            };
        } else {
            styleH2Div = {
                margin: '30px auto 20px',
                textAlign: 'center',
                padding: '0 10px 0',
                opacity: 0.6
            };
        }


        var estimateText = '预估额度';
        if (this.state.amount > 0) {
            estimateText = '涨额度';
        }
        return (
            <div>
                <Logo></Logo>
                <Loading showLoading={this.state.showLoading}></Loading>
                <Banner
                    displayName={this.__proto__.constructor.displayName}></Banner>
                {
                    <div>
                        <div style={{display: this.state.addEstimate ? 'block' : 'none'}}
                             className="estimate-addAccount">
                            <p>＋预估额度
                                <span>{this.state.addAmount}</span>
                                万元</p>
                            <span>新账号审核后，您的可用额度可能提升</span>
                        </div>
                        <div style={styleH2Div}>
                            <h2 className="estimate-text">{this.state.h2Text}</h2>

                            <h2 className="estimate-money">
                                <span id="moneyText">{this.state.amount}</span>
                                <span className="estimate-money-small">万元</span>
                            </h2>
                        </div>
                        <div style={{display: !this.state.hasConfirmableItem ? 'block' : 'none', textAlign: 'center'}}>
                            <p style={{color: '#f53053', marginBottom: '10px'}}>您的授信额度已过期</p>

                            <p style={{color: '#f53053', marginBottom: '10px'}}>请点击页面下方申请借款按钮激活账户</p>
                        </div>
                        <div style={this.state.estimateAssign} className="estimate-assign">
                            <p>已使用额度：
                                <i>{this.state.occupiedAmount}万元</i>
                                &nbsp;&nbsp;&nbsp;&nbsp;总授信额度：
                                <i>{this.state.grantedAmountCents}万元</i>
                            </p>
                        </div>
                        <div className="width80">
                            <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
                        </div>
                        <Link to={{pathname: 'platform'}} className="button-link-middle">
                            <Button style={{background: 'transparent', border: '1px solid #2484DF', color: '#2484DF'}}
                                    text={estimateText}
                                    material-button
                                    tracking
                                ></Button>
                        </Link>
                        {

                            (this.props.addIndividualInfo || (Number(this.state.amount > 0) || Number(this.state.addAmount) || !this.state.hasConfirmableItem) && this.state.canLoan) ?
                                <div onClick={this.goLoan} className="button-link-middle red-button-no">
                                    <Button style={{background: '#f53053', color: '#ffffff'}}
                                            text={this.state.loanText}
                                            material-butty
                                            tracking
                                        ></Button>
                                </div> :
                                <div className="button-link-middle grey-button">
                                    <Button text={this.state.loanText} tracking></Button>
                                </div>
                        }
                        <AccountList list={this.state.list} platform={this.state.platform}
                                     account={this.state.account}></AccountList>
                    </div>
                }
                <Customer></Customer>
                <ConfirmModel showConfirmModel={this.state.showConfirmModel}
                              ele={this.state.eleConfirmMain}></ConfirmModel>

                <FullPageModel ele={this.state.eleModel}></FullPageModel>
            </div>
        );
    }
});
module.exports = Estimate;

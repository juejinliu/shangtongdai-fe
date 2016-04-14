/**
 * Created by malin on 15/4/28.
 */
var React = require('react'),
    {Link} = require('react-router'),
    AppData = require('./../component/appData'),
    Logo = require('./../component/logo'),
    Customer = require('./../component/customer'),
    H4Title = require('./../component/h4Title'),
    Tracking = require('./../lib/tracking'),
    Css3Loading = require('./../modelComponent/css3loading'),
    MobilePlatform = require('./../lib/mobilePlatform'),
    Button = require('./../component/button'),
    Banner = require('./../component/banner');

const {stdApi, stdUserStatus} = AppData.api();

const [applyable, appStatus, isLoggedIn, {isWechatUa}] = [
    stdUserStatus.applyable,
    stdUserStatus.appStatus,
    stdUserStatus.isLoggedIn,
    MobilePlatform
];
let WelcomeLayout = React.createClass({
    getDefaultProps() {
        return {
            query: {showModel: ''}
        };
    },

    getInitialState: function () {
        return {
            text: '立即申请',
            disabled: false,
            loanState: 'estimate',
            adShow: false,
            loading: false,
            eleModel: '',
            showModel: false,
            whichModel: this.props.location.query.showModel
        };
    },


    componentDidMount: function () {
        let self = this;
        if (window.std.stdUserStatus.error && window.std.stdUserStatus.error.result === false) {
            alert(window.std.stdUserStatus.error.result.message);
            this.setState(
                {
                    loanState: '/',
                    disabled: true
                }
            );
        } else {
            if (applyable) {
                if ((window.std.stdUserStatus.estimateAmount !== '-1'
                    && window.std.stdUserStatus.estimateAmount !== undefined) ||
                    (window.std.stdUserStatus.skipEstimateAmount)) {
                    self.setState({
                        disabled: false
                    });
                }
            } else {
                //如果不可申请，查看status值，看他的申请状态，控制按钮的显示
                if (appStatus) {
                    let status = appStatus.status;
                    switch (status) {
                        case '抱歉，您的申请未通过':
                            self.setState({
                                text: '查看审核状态',
                                loanState: 'loanFail'
                            });
                            break;
                        case '审核失败':
                            self.setState({
                                text: '查看审核状态',
                                loanState: 'loanFail'
                            });
                            break;
                        case '等待放款':
                            self.setState({
                                text: '查看审核状态',
                                loanState: 'loanArmored'
                            });
                            break;
                        case '正在审核':
                            self.setState({
                                text: '查看审核状态',
                                loanState: 'loanOver'
                            });
                            break;
                        case '审核通过':
                            self.setState({
                                text: '查看审核状态',
                                loanState: 'loanConfirm'
                            });
                            break;
                        case '补充资料':
                            self.setState({
                                text: '查看审核状态',
                                loanState: 'loanAddInfo'
                            });
                            break;
                        case '补充个人征信信息':
                            self.setState({
                                text: '查看审核状态',
                                loanState: 'loanAddInfo'
                            });
                            break;
                        default:
                            self.setState({
                                text: '立即申请',
                                loanState: 'estimate'
                            });
                            break;
                    }
                } else {
                    self.setState({
                        text: '立即申请',
                        loanState: 'estimate'
                    });

                }
            }
        }
    },

    getModelEleHtml(ele) {
        var className = 'newPeople ' + ele;
        return (
            <div className={className}>
                <div onClick={this.hideModel} className="close"></div>
                <div onClick={this.adJumpLoan} className="go-loan"></div>
                <div onClick={this.adJumpAdnewPeople} className="go-game"></div>
                <div onClick={this.adJumpShare} className="go-share"></div>
                <div onClick={this.hideModel} className="i-know"></div>
            </div>
        );
    },

    hideModel() {
        this.setState({
            showModel: false
        });
        Tracking.trackEvent('click', {'activity': 'newPeople', 'status': 'close', 'lmt-track-id': 'model-close-index'});
    },

    render() {

        let disabled = this.state.disabled;
        if (this.state.loading) {
            return <Css3Loading loading={this.state.loading}></Css3Loading>;
        }
        return (
            <div className="welcome-page">
                <Logo></Logo>
                <Banner displayName={this.__proto__.constructor.displayName}></Banner>
                <div className="banner"></div>


                <Link to={{pathname: this.state.loanState}} disabled={this.state.disabled} className="button-link-big">
                    <Button style={disabled ? {backgroundColor: 'grey'} : {backgroundColor: '#f53053'}}
                            text={this.state.text}
                            material-button
                            tracking={{'lmt-track-id': 'button-top-index'}}
                        ></Button>
                </Link>
                <span className="span">获批后一个月内可随时收款,不收款不计息,可提前还款</span>

                <H4Title id="firstH4" text="给你理由，选择商通贷"></H4Title>
                <div className="liyou"></div>
                <div className="youshi">
                    <div className="part1 part">
                        <em>信用提额</em>
                        <span>循环借款，</span>
                        <span>专享提额优惠</span>
                    </div>
                    <div className="part2 part">
                        <em>放款快</em>
                        <span>急你所急，</span>
                        <span>最快8分钟放款</span>
                    </div>
                </div>
                <Link to={{pathname: this.state.loanState}} disabled={disabled} className="button-link-big">
                    <Button style={disabled ? {backgroundColor: 'grey'} : {backgroundColor: '#f53053'}}
                            text={this.state.text}
                            material-button
                            tracking={{'lmt-track-id': 'button-middle-index'}}
                        ></Button>
                </Link>
                <H4Title text="申请流程"></H4Title>
                <div className="step-pic">
                </div>
                <Link to={{pathname: this.state.loanState}} disabled={this.state.disabled} className="button-link-big">
                    <Button style={disabled ? {backgroundColor: 'grey'} : {backgroundColor: '#f53053'}}
                            text={this.state.text}
                            material-button
                            tracking={{'lmt-track-id': 'button-bottom-index'}}
                        ></Button>
                </Link>


                <Customer></Customer>
                {
                    //<Ad adShow to="ladderPackage" classProp="ad-ball-ladder"
                    //    trackObj={{"activity": "ladderPackage",
                    //            "status": "active-ball",
                    //            "lmt-track-id": "active-ball-welcome"}}
                    //    ></Ad>
                }


            </div>
        );
    }
});

module.exports = WelcomeLayout;

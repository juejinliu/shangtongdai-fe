/**
 * Created by malin on 15/5/7.
 */
var React = require('react'),
    AppData = require('./../component/appData'),
    Button = require('./../component/button'),
    Customer = require('./../component/customer'),
    Logo = require('./../component/logo'),
    ErrorMessage = require('./../component/errorMessage'),
    Css3Loading = require('./../modelComponent/css3loading'),
    LoanProgress = require('./../component/loan-progress');

const {stdApi} = AppData.api();

const [occupiedAmountCents, estimateApi] = [stdApi.occupiedAmountCents, stdApi.estimateApi];

let LoanProgram = React.createClass({
        getInitialState() {
            return {
                amount: 0,
                occupiedAmount: 0,
                grantedAmountCents: 0,
                oversea: 0,
                domestic: 0,
                loading: true,
                errorMessage: ''
            };
        },
        componentDidMount() {
            this.occupiedAmountCents();
            this.estimate();
        },
        estimate: function () {
            let self = this;
            $.ajax({
                'url': estimateApi,
                'type': 'get',
                'data': {group: 'all', _: (new Date).getTime()},
                'dataType': 'jsonp',
                success: function (data) {
                    let num = 0;
                    let amountCents = 0;
                    let platformArr = [];
                    let accountArr = [];
                    let oversea = 0;
                    let domestic = 0;

                    try {
                        let json = data.result;
                        let jsonLength = json.length;
                        if (jsonLength) {
                            json.forEach(function (value, index) {
                                if (value.progress === 100) {
                                    num += 1;
                                    amountCents += Number(value.amountCents);
                                    platformArr.push(value.platform);
                                    accountArr.push(value.account);

                                    //如果包含授信账号则文字修改，已使用额度，总授信额度信息显示，纪录有授信账号状态
                                    if (value.submitStatus === 'GRANTED' && (value.platform !== 'TAOBAO' && value.platform !== 'TMALL')) {
                                        oversea += Number(value.amountCents);
                                    } else {
                                        domestic += Number(value.amountCents);
                                    }
                                }
                            });

                        }
                        if (num === jsonLength) {
                            self.setState({
                                oversea: (oversea / 1000000).toFixed(2) > 10 ?
                                    (oversea / 1000000).toFixed(2).split('.')[0] :
                                    (oversea / 1000000).toFixed(2),
                                domestic: (domestic / 1000000).toFixed(2) > 10 ?
                                    (domestic / 1000000).toFixed(2).split('.')[0] :
                                    (domestic / 1000000).toFixed(2),
                                loading: false
                            })
                        } else {
                            setTimeout(self.estimate, 1000);
                            self.setState({loading: true});
                        }

                    } catch (ex) {
                        self.setState({
                            loading: false,
                            errorMessage: '请检查您的网络，或稍后再试'
                        });
                    }

                },
                error: function () {
                    self.setState({
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
                    console.log(json);
                    let grantedAmountCents = json.grantedAmountCents;
                    let occupiedAmountCents = json.occupiedAmountCents;
                    let remainedAmount = grantedAmountCents - occupiedAmountCents;
                    if (remainedAmount < 0) {
                        remainedAmount = 0;
                    }
                    self.setState({
                        amount: (remainedAmount / 1000000).toFixed(2) > 10 ?
                            (remainedAmount / 1000000).toFixed(2).split('.')[0] :
                            (remainedAmount / 1000000).toFixed(2),
                        occupiedAmount: (occupiedAmountCents / 1000000).toFixed(2) > 10 ?
                            (occupiedAmountCents / 1000000).toFixed(2).split('.')[0] :
                            (occupiedAmountCents / 1000000).toFixed(2),
                        grantedAmountCents: (grantedAmountCents / 1000000).toFixed(2) > 10 ?
                            (grantedAmountCents / 1000000).toFixed(2).split('.')[0] :
                            (grantedAmountCents / 1000000).toFixed(2)
                    });
                }
            });
            return false;
        },
        render: function () {
            if (this.state.loading) return <Css3Loading loading = {this.state.loading}></Css3Loading>;
            return (
                <div className="loan-program">
                    <Logo></Logo>
                    <LoanProgress option={{text: ['申请', '确款方案', '确认收款卡', '还款'], active: 2}}></LoanProgress>
                    <div className="width80">
                        <div className="all-estimate-div">
                            <h1 className="estimate-text">
                                您的可用授信额度为
                                <p>什么是授信额度？</p>
                            </h1>
                            <h2>
                                <p className="h2-big-money">{this.state.occupiedAmount}</p>
                                <p className="h2-small-money">万元</p>
                            </h2>
                            <div className="platform">
                                <div className="kuang"></div>
                                <div className="platform-name">
                                    <p>外贸平台</p>
                                    <p>{this.state.oversea}万元</p>
                                </div>
                                <div className="plusPic"></div>
                                <div className="platform-name">
                                    <p>内贸平台</p>
                                    <p>{this.state.domestic}万元</p>
                                </div>
                                <div className="kuang-right"></div>
                            </div>
                        </div>
                        <div className="width80">
                            <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
                        </div>
                        <div className="button-link-big">
                            <Button text="下一步"
                                    style={{background: '#2484DF'}}
                                material-button
                                tracking
                            ></Button>
                        </div>

                        <p className="underline-text">贷款流程详细说明</p>
                    </div>
                    <Customer></Customer>
                </div>
            );
        }
    })
    ;
module.exports = LoanProgram;

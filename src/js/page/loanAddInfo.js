/**
 * Created by malin on 15/5/7.
 */
var React = require('react'),
    {Link} = require('react-router'),
    message = require('../messageConfig'),
    AppData = require('./../component/appData'),
    Customer = require('./../component/customer'),
    Css3Loading = require('./../modelComponent/css3loading'),
    Button = require('./../component/button'),
    redirect = require('./../component/loginRedirect'),
    ErrorMessage = require('./../component/errorMessage'),
    $ = require('../lib/zepto'),
    Logo = require('./../component/logo');

const {stdApi} = AppData.api();

const {estimateApi, submitIndividualCreditApi} = stdApi;

let LoanAddInfo = React.createClass({

    getInitialState() {
        return {
            errorMessage: '',
            loading: false,
            isSubmitButtonShow: false
        };
    },

    componentDidMount() {
        this.estimate();
    },

    estimate() {
        let self = this;
        $.ajax({
            'url': estimateApi,
            'type': 'get',
            'data': {group: 'all', _: (new Date).getTime()},
            'dataType': 'jsonp',
            success(data) {

                try {
                    let json = data.result;
                    let jsonLength = json.length;
                    if (jsonLength) {
                        for (let value of json) {
                            //找到个人消费总账号
                            if (value.amountCents && (value.platform === message.individualCredit.individualCredit || value.submitStatus === 'NOT_SUBMITTED')) {
                                self.setState({
                                    isSubmitButtonShow: true
                                });
                            }
                        }
                    }
                } catch (ex) {
                }
            }
        });
    },

    submitIndividualCredit() {
        let self = this;
        $.ajax({
            'url': submitIndividualCreditApi,
            'type': 'get',
            'data': {_: (new Date).getTime()},
            beforeSend() {
                self.setState({
                    errorMessage: '',
                    loading: true
                });
            },
            success(data) {
                try {
                    let json = JSON.parse(data);
                    if (json.result === 'success') {
                        let next = window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search + '#/loanOver';
                        redirect(next);
                    } else {
                        self.setState({
                            errorMessage: json.message,
                            loading: false
                        });
                    }
                } catch (ex) {
                }
            }
        });
    },

    render() {
        if (this.state.loading) {
            return <Css3Loading loading={this.state.loading}></Css3Loading>;
        }

        let style = {
            smallTitle: {
                margin: '30px auto 20px'
            },
            title: {
                margin: '0 auto 35px',
                fontSize: '28px'
            },
            text: {
                textAlign: 'left',
                width: '90%',
                margin: '0 auto 60px',
                fontSize: '14px'
            }
        };
        return (
            <div className="loan-fail">
                <Logo></Logo>

                <p style={style.smallTitle}>当前审核进度</p>

                <h2 style={style.title}>{message.loan.loanAddInfoTitle}</h2>

                <p style={style.text}>{message.loan.loanAddInfoText}</p>
                <Link to={{pathname: 'individualCredit/choose'}} className="button-link-middle">
                    <Button
                        text={message.global.button.loanAddInfo}
                        material-button
                        tracking
                        ></Button>
                </Link>


                {
                    this.state.isSubmitButtonShow ?
                        <div className="button-link-middle" onClick={this.submitIndividualCredit}>
                            <Button
                                text={message.global.button.submit}
                                material-button
                                tracking
                                ></Button>
                        </div>
                        : null
                }
                <div className="width80">
                    <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
                </div>
                <Customer></Customer>
            </div>
        );
    }
});
module.exports = LoanAddInfo;




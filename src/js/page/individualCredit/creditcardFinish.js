/**
 * Created by malin on 15/6/9.
 */

var React = require('react'),
    {Link, History} = require('react-router'),
    Logo = require('./../../component/logo'),
    AppData = require('./../../component/appData'),
    Button = require('./../../component/button'),
    Css3Loading = require('./../../modelComponent/css3loading'),
    redirect = require('./../../component/loginRedirect'),
    message = require('./../../messageConfig'),
    ErrorMessage = require('./../../component/errorMessage');


const {stdApi, stdUserStatus} = AppData.api();

const [submitIndividualCreditApi, appStatus] = [
    stdApi.submitIndividualCreditApi,
    stdUserStatus.appStatus
];

let CreditcardFinish = React.createClass({
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
            buttonText: message.individualCredit.jumpButton,
            errorMessage: '',
            loading: false
        };
    },

    componentDidMount() {
        if (this.props.addIndividualInfo) {
            this.setState({
                buttonText: message.global.button.submit
            });
        }
    },

    submit(e) {
        e.preventDefault();
        if (this.props.addIndividualInfo) {
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
                        console.log(ex);
                    }

                }
            });
        } else {
            this.context.router.push('estimate');
        }
    },

    render() {
        if (this.state.loading) {
            return <Css3Loading loading={this.state.loading}></Css3Loading>;
        }
        return (
            <div className="creditcard">
                <Logo></Logo>

                <div className="creditcard-finish width90">
                    <h2 className="h2-title">{message.individualCredit.titleCreditcardFinish}</h2>

                    <p style={{fontSize: '12px', textAlign: 'center', marginBottom: '10px', opacity: '0.6'}}>
                        您可继续添加个人信用报告，对额度提升有很大帮助。
                    </p>
                    <Link to={{pathname: 'individualCredit/report-introduce'}} className="button-link-big">
                        <Button style={{background: 'transparent', border: '1px solid #2484DF', color: '#2484DF'}}
                                text={message.individualCredit.addReportButton}
                                material-button
                                tracking
                            ></Button>
                    </Link>

                    <div onClick={this.submit} className="button-link-big">
                        <Button
                            material-button
                            text={this.state.buttonText}
                            tracking
                            ></Button>
                    </div>
                    <div className="width90">
                        <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
                    </div>

                </div>
            </div>
        );
    }
});
module.exports = CreditcardFinish;

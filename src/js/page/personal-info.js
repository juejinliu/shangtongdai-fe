/**
 * Created by malin on 15/6/9.
 */

var React = require('react'),
    {Link} = require('react-router'),
    message = require('../messageConfig'),
    Css3Loading = require('./../modelComponent/css3loading'),
    AppData = require('./../component/appData'),
    Logo = require('../component/logo'),
    Button = require('../component/button'),
    Customer = require('../component/customer');

const {stdApi} = AppData.api();

const userInfoApi = stdApi.userInfoApi;

let PersonalInfo = React.createClass({
    getInitialState: function () {
        return {
            loading: true,
            headerName: '未填写',
            name: '未填写',
            tel: '未填写',
            email: '未填写'
        };
    },

    componentWillMount() {
        this.getUserInfoApi();
    },

    getUserInfoApi() {
        let self = this;
        $.ajax({
            'url': userInfoApi,
            'type': 'get',
            'dataType': 'jsonp',
            'data': {_: (new Date).getTime()},
            success(json) {
                try {
                    self.setState({
                        headerName: json.name || json.mobileAccount || '',
                        name: json.name || json.mobileAccount || '',
                        tel: json.mobileAccount || '',
                        email: json.email || ''
                    });
                } catch (e) {
                    console.log(e);
                }
                self.setState({
                    loading: false
                });
            }
        });
    },

    render() {
        if (this.state.loading) {
            return <Css3Loading loading={this.state.loading}></Css3Loading>;
        }
        return (
            <div className="personal-info">
                <Logo></Logo>
                <ul className="nav-ul">
                    <li className="nav-li">
                        <div className="face"></div>
                        <p className="name">{this.state.headerName}</p>
                    </li>
                    <li className="nav-li empty">

                    </li>
                    <li className="nav-li">
                        <p className="l tel">{message.personalInfo.telText}</p>
                        <p className="r">{this.state.tel}</p>
                    </li>
                    <li className="nav-li">
                        <p className="l email">{message.personalInfo.emailText}</p>
                        <p className="r">{this.state.email}</p>
                    </li>
                    <li className="nav-li">
                        <Link to={{pathname: 'getPasswordPersonal', query: {next: window.location.href}}}>
                            <span className="l password">
                                {message.personalInfo.passwordText}
                            </span>
                            <span className="r arrow"></span>
                        </Link>
                    </li>
                </ul>
                <div className="loginout">
                    <a href="/logoutmobile">
                        <Button material-button text={message.personalInfo.logoutText}
                                tracking={{'lmt-track-id': 'login-out'}}>
                        </Button>
                    </a>
                </div>
                <Customer></Customer>
            </div>
        );
    }
});
module.exports = PersonalInfo;
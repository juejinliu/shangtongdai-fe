/**
 * Created by malin on 15/6/9.
 */

var React = require('react'),
    {Link} = require('react-router'),
    message = require('../messageConfig'),
    Logo = require('../component/logo'),
    isLogin = require('./../component/isLogin'),
    Button = require('../component/button'),
    Css3Loading = require('./../modelComponent/css3loading'),
    Customer = require('../component/customer');

let Personal = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            loading: true
        };
    },

    componentDidMount() {
        this.isApplyableShowPage();
    },

    isApplyableShowPage() {
        let self = this;
        isLogin(self);
    },

    render: function () {
        if (this.state.loading) {
            return <Css3Loading loading={this.state.loading}></Css3Loading>;
        }
        return (
            <div className="personal">
                <Logo></Logo>
                <ul className="nav-ul">
                    <li className="nav-li">
                        <Link to={{pathname: 'bonus-list/unuse'}}>
                            <div className="icon p-first">
                                <Button material-button tracking={{'lmt-track-id': message.personal.myRedPackageIcon}}>
                                </Button>
                            </div>
                            <p className="icon-text">{message.personal.myRedPackageIcon}</p>
                        </Link>
                    </li>
                    <li className="nav-li">
                        <Link to={{pathname: 'bonus/financing'}}>
                            <div className="icon p-second">
                                <Button material-button tracking={{'lmt-track-id': message.personal.myWalletIcon}}>
                                </Button>
                            </div>
                            <p className="icon-text">{message.personal.myWalletIcon}</p>
                        </Link>
                    </li>
                    <li className="nav-li">
                        <Link to={{pathname: 'personal-info'}}>
                            <div className="icon p-three">
                                <Button material-button
                                        tracking={{'lmt-track-id': message.personal.accountSettingIcon}}>
                                </Button>
                            </div>
                            <p className="icon-text">{message.personal.accountSettingIcon}</p>
                        </Link>
                    </li>
                </ul>
                <Customer></Customer>
            </div>
        );
    }
});
module.exports = Personal;
/**
 * Created by malin on 15/6/9.
 */

var React = require('react'),
    {Link} = require('react-router'),
    message = require('../messageConfig'),
    Logo = require('../component/logo'),
    MobilePlatform = require('./../lib/mobilePlatform'),
    Button = require('../component/button'),
    Customer = require('../component/customer');

const {isWechatUa} = MobilePlatform;
var Nav = React.createClass({

    getInitialState() {
        return {
            link: 'mgmNew'
        };
    },

    componentWillMount() {
        if (isWechatUa) {
            this.setState({
                link: 'mgmNew'
            });
        } else {
            this.setState({
                link: 'bonus-share'
            });
        }
    },

    render() {
        return (
            <div className="nav">
                <Logo></Logo>
                <ul className="nav-ul">
                    <li className="nav-li">
                        <Link to={{pathname: 'platform'}}>
                            <div className="icon first">
                                <Button material-button tracking={{'lmt-track-id': message.nav.estimateIcon}}>
                                </Button>
                            </div>
                            <p className="icon-text">{message.nav.estimateIcon}</p>
                        </Link>
                    </li>
                    <li className="nav-li">
                        <Link to={{pathname: 'estimate'}}>
                            <div className="icon second">
                                <Button material-button tracking={{'lmt-track-id': message.nav.loanIcon}}>
                                </Button>
                            </div>
                            <p className="icon-text">{message.nav.loanIcon}</p>
                        </Link>
                    </li>
                    <li className="nav-li">
                        <Link to={{pathname: 'userStatusRouter'}}>
                            <div className="icon three">
                                <Button material-button tracking={{'lmt-track-id': message.nav.processingIcon}}>
                                </Button>
                            </div>
                            <p className="icon-text">{message.nav.processingIcon}</p>
                        </Link>
                    </li>
                    <li className="nav-li">
                        <Link to={{pathname: 'loanPlan'}}>
                            <div className="icon four">
                                <Button material-button tracking={{'lmt-track-id': message.nav.planIcon}}>
                                </Button>
                            </div>
                            <p className="icon-text">{message.nav.planIcon}</p>
                        </Link>
                    </li>
                    <li className="nav-li">
                        <Link to={{pathname: this.state.link}}>
                            <div className="icon five">
                                <Button material-button tracking={{'lmt-track-id': message.nav.inviteIcon}}>
                                </Button>
                            </div>
                            <p className="icon-text">{message.nav.inviteIcon}</p>
                        </Link>
                    </li>
                    <li className="nav-li">
                        <Link to={{pathname: 'personal'}}>
                            <div className="icon six">
                                <Button material-button tracking={{'lmt-track-id': message.nav.personalIcon}}>
                                </Button>
                            </div>
                            <p className="icon-text">{message.nav.personalIcon}</p>
                        </Link>
                    </li>
                </ul>
                <Customer></Customer>
            </div>
        );
    }
});
module.exports = Nav;

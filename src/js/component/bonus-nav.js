/**
 * Created by malin on 15/5/13.
 */

var React = require('react'),
    $ = require('./../lib/zepto'),
    {Link} = require('react-router'),
    Button = require('./button');

let BonusNav = React.createClass({
    getInitialState() {
        return {
            index: this.props.index
        };
    },

    componentDidMount() {
        let bonusNavEle = $('#bonusNav');
        bonusNavEle.find('a').eq(this.state.index).addClass('active');
    },

    render() {
        return (
            <div className="bonus-nav bottom" id="bonusNav">
                <ul className="bonus-nav-ul">
                    <li className="bonus-nav-li l">
                        <Link to={{pathname: 'bonus-share'}}>
                            <div className="nav-share">
                                <Button
                                    material-button
                                    tracking={{'lmt-track-id': 'mgm-nav-share'}}>
                                </Button>
                            </div>
                            <p>

                                邀请

                            </p>
                        </Link>
                    </li>
                    <li className="bonus-nav-li l">
                        <Link to={{pathname: 'bonus-rule'}}>

                            <div className="nav-rule">
                                <Button
                                    material-button
                                    tracking={{'lmt-track-id': 'mgm-nav-rule'}}>
                                </Button>
                            </div>
                            <p>
                                规则
                            </p>
                        </Link>
                    </li>
                    <li className="bonus-nav-li l">
                        <Link to={{pathname: 'bonus-package'}}>
                            <div className="nav-package">
                                <Button
                                    material-button
                                    tracking={{'lmt-track-id': 'mgm-nav-package'}}>
                                </Button>
                            </div>
                            <p>
                                钱包
                            </p>
                        </Link>
                    </li>
                    <li className="bonus-nav-li l">
                        <Link to={{pathname: 'bonus-fq'}}>
                            <div className="nav-fq">
                                <Button
                                    material-button
                                    tracking={{'lmt-track-id': 'mgm-nav-fq'}}>
                                </Button>
                            </div>
                            <p>
                                攻略
                            </p>
                        </Link>
                    </li>
                </ul>
            </div>
        );
    }
});
module.exports = BonusNav;

/**
 * @file 红包页面banner
 * @auther Created by malin on 15/6/9.
 */

var React = require('react'),
    {Link} = require('react-router'),
    AppData = require('./appData'),
    MobilePlatform = require('../lib/mobilePlatform'),
    Button = require('./button');

const {isWechatUa} = MobilePlatform;

let Banner = React.createClass({

    //这里保留下 可能会存在 不同 运行环境导致的链接不同
    //componentWillMount() {
    //    var self = this;
    //    if (isWechatUa) {
    //        this.setState(
    //            {
    //                adLink: 'mgmNew',
    //                bannerClass: 'ad-banner ad-banner-wx',
    //                loading: false
    //            }
    //        );
    //    } else {
    //        isLogin(self, 'no', function () {
    //            self.setState({
    //                adLink: 'bonus-share',
    //                loading: false
    //            });
    //        });
    //    }
    //},

    getDefaultProps() {
        return {
            tracking: {
                'activity': 'women-day',
                'lmt-track-id': 'women-day-banner'
            },
            displayName: 'WelcomeLayout'
        };
    },

    render() {
        let tracking = this.props.tracking;
        //如果但前是在welcome页面则tracking为home
        //如果是在estimate页面则tracking为estimate
        if (this.props.displayName === 'WelcomeLayout') {
            tracking['lmt-track-id'] = 'women-day-banner';
        } else {
            tracking['lmt-track-id'] = 'women-day-estimate-banner';
        }
        return (
            <div>
                {
                    AppData.adTime('2016-3-7', '2016-3-10') ?
                        <Link to={{pathname: 'activity/code/womenDay'}} className="ad-banner">

                            <Button material-button
                                    tracking={tracking}
                                >
                            </Button>
                        </Link>
                        :
                        null
                }
            </div>

        );
    }
});
module.exports = Banner;
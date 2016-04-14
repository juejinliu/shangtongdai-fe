/**
 * Created by malin on 15/5/7.
 */
var React = require('react'),
    AppData = require('./../component/appData'),
    Customer = require('./../component/customer'),
    Status = require('./status'),
    $ = require('../lib/zepto'),
    animateEnd = require('../component/animateEnd'),
    message = require('./../messageConfig'),
    Logo = require('./../component/logo');
import LoanOverTaobao from './../termite/loanOver-taobao';

const {stdApi, stdUserStatus} = AppData.api();

const [accountAuthorizeApi, appStatus] = [
    stdApi.accountAuthorizeApi,
    stdUserStatus.appStatus
];

let LoanOver = React.createClass({
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
            isShow: 'yes',
            tbArr: ''
        };
    },

    componentWillMount() {
        if (this.props.addIndividualInfo) {
            this.context.router.push('loanAddInfo');
        }
    },

    componentDidMount() {
        let self = this;
        $.ajax({
            'url': accountAuthorizeApi,
            'type': 'get',
            'dataType': 'jsonp',
            'data': {_: (new Date).getTime()},
            success(json) {
//              console.log(json);
                if (json.result === 'success') {
                    self.setState({
                        tbArr: json.results
                    });
                }
            }
        });

    },
    render() {

        let spanText = '<span>平均审核时间：1-2个工作日</span>';
        return (
            <div className="loan-over">
                <Logo></Logo>
                {this.state.tbArr.length ?
                    <LoanOverTaobao tbData={this.state.tbArr}></LoanOverTaobao> :
                    <div>
                        <Status text='申请成功，正在审核中' spanText={spanText}></Status>
                    <span className="span">审核通过后，
                        <br/>
                        我们会通过短信和微信的方式通知您
                    </span>
                    </div>

                }

                <Customer></Customer>
            </div>
        );
    }
});
module.exports = LoanOver;

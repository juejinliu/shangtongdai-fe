/**
 * @file 左侧导航点击 申请进度的router
 * @auther Created by malin on 15/6/9.
 */

let React = require('react'),
    AppData = require('./../component/appData'),
    isLogin = require('../component/isLogin'),
    Css3Loading = require('../modelComponent/css3loading');

const {stdUserStatus} = AppData.api();

const AppStatus = stdUserStatus.appStatus && stdUserStatus.appStatus.status;

let UserStatusRouter = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            loading: true
        };
    },

    componentDidMount() {
        this.getStatus();
    },

    getStatus: function () {
        switch (AppStatus) {
            // '审核通过','等待添加银行卡','等待放款','放款成功','还款完成'
            case '抱歉，您的申请未通过':
                this.context.router.push('loanFail');
                break;
            case '审核失败':
                this.context.router.push('loanFail');
                break;
            case '等待放款':
                this.context.router.push('loanArmored');
                break;
            case '正在审核':
                this.context.router.push('loanOver');
                break;
            case '审核通过':
                this.context.router.push('loanConfirm');
                break;
            case '您的授信额度已用完':
                this.context.router.push('loanOutLimit');
                break;
            case '补充资料':
                this.context.router.push('loanAddInfo');
                break;
            case '补充个人征信信息':
                this.context.router.push('loanAddInfo');
                break;
            case '您的授信额度已过期':
                this.context.router.push('loanOutLimitTime');
                break;
            case '放款成功':
                this.context.router.push('loanConfirm');
                break;
            //case '还款完成':
            //    this.context.router.push('estimate');
            //    break;
            case undefined:
                //没有进件信息与未登陆都会返回undefined所以这边判断下登陆
                let self = this;
                isLogin(self, '', function () {
                    self.context.router.push('loanNo');
                });
                break;
            case '申请取消':
                this.context.router.push('loanNo');
                break;
            default:
                this.context.router.push('estimate');
                break;
        }
    },
    render() {
        return this.state.loading ? <Css3Loading loading={this.state.loading}></Css3Loading> : null;
    }
});
module.exports = UserStatusRouter;
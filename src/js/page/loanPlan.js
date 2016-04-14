/**
 * Created by malin on 15/4/28.
 */
var React = require('react'),
    $ = require('./../lib/zepto'),
    Logo = require('./../component/logo'),
    isLogin = require('./../component/isLogin'),
    Css3Loading = require('./../modelComponent/css3loading'),
    Customer = require('./../component/customer');

let LoanPlan = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            loading: true
        };
    },

    componentWillMount() {
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
            <div className="welcome-page">
                <Logo></Logo>
                <div style={{textAlign: 'center'}}>
                    <iframe src="/loans?isFromMobile=true" id="iframePlan"  style={{
                        width: $(window).width(),
                        height: $(window).height()
                    }} name="iframeWindow"></iframe>
                </div>
                <Customer></Customer>

            </div>
        );
    }
});

module.exports = LoanPlan;

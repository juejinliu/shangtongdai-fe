/**
 * Created by malin on 15/4/28.
 */
var React = require('react'),
    Css3Loading = require('./../modelComponent/css3loading'),
    Logo = require('./../component/logo'),
    isLogin = require('../component/isLogin'),
    Customer = require('./../component/customer'),
    $ = require('./../lib/zepto');

let LoanConfirm = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            loading: true
        };
    },

    componentDidMount() {
        let self = this;
        isLogin(self, 'userStatusRouter', function () {
            let iframe = document.querySelector('#iframeConfirm');
            iframe.onload = () => {
                self.setState({
                    loading: false
                });
            };
        });

    },

    render() {
        return (
            <div className="welcome-page">
                <Logo></Logo>
                <div style={{textAlign: 'center'}}>
                    <iframe src="/loans/confirm?isFromMobile=true" style={{
                        width: $(window).width(),
                        height: $(window).height(),
                        position: 'relative'
                    }} id="iframeConfirm" name="iframeWindow"></iframe>
                </div>
                <Customer></Customer>
                {
                    this.state.loading ?
                        <Css3Loading loading = {this.state.loading}></Css3Loading> : <div></div>
                }
            </div>
        );
    }
});

module.exports = LoanConfirm;

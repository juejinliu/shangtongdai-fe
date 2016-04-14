/**
 * Created by malin on 15/9/15.
 */

var React = require('react'),
    AppData = require('./../component/appData'),
    Css3Loading = require('./../modelComponent/css3loading'),
    Logo = require('./../component/logo'),
    Customer = require('./../component/customer'),
    $ = require('./../lib/zepto');

const {stdApi} = AppData.api();

const cashOutiFrameUrl = stdApi.mgmWithdrawiFrameUrl;

let CashOut = React.createClass({

    getInitialState() {
        return {
            loading: true
        };
    },

    componentDidMount() {
        let self = this;
        let iframe = document.querySelector('#iframeCashOut');
        iframe.onload = function () {
            self.setState({
                loading: false
            });
        };
    },

    render() {
        return (
            <div className="welcome-page">
                <Logo></Logo>

                <div style={{textAlign: 'center'}}>
                    <iframe src={cashOutiFrameUrl} style={{
                        width: $(window).width(),
                        height: $(window).height(),
                        position: 'relative'
                    }} id="iframeCashOut" name="iframeWindow"></iframe>
                </div>
                <Customer></Customer>
                {
                    this.state.loading ?
                        <Css3Loading loading={this.state.loading}></Css3Loading> : <div></div>
                }
            </div>
        );
    }
});

module.exports = CashOut;

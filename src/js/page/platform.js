/**
 * Created by malin on 15/5/26.
 */
var React = require('react'),
    {Router, Route, Link, IndexLink, History} = require('react-router'),
    AppData = require('./../component/appData'),
    Css3Loading = require('./../modelComponent/css3loading'),
    Logo = require('./../component/logo'),
    Button = require('./../component/button'),
    Custorm = require('./../component/customer');

const {stdApi} = AppData.api();

const [estimateApi, ebayApi, wishApi] = [stdApi.estimateApi, stdApi.ebayApi, stdApi.wishApi];

let PlatForm = React.createClass({
    getInitialState() {
        return {
            isCreditCardShow: false,
            processing: false,
            overseaLoading: false
        };
    },

    componentDidMount() {
        this.isCreditcard();
    },

    isCreditcard() {
        let self = this;

        $.ajax({
            'url': estimateApi,
            'type': 'get',
            'dataType': 'jsonp',
            'data': {group: 'all', _: (new Date).getTime()},
            success(data) {
                try {
                    let json = data.result;
                    for (let v of json) {
                        if (v.platform === 'INDIVIDUALCREDIT') {
                            self.setState({
                                isCreditCardShow: true
                            });
                        }
                    }
                } catch (ex) {

                }
            },
            error: function () {

            }
        });
    },

    getOverseaUrl(e) {
        let overseaApi = '',
            self = this;
        e.preventDefault();
        if (e.target.parentNode.dataset.name.indexOf('ebay') >= 0) {
            overseaApi = ebayApi;
        } else if (e.target.parentNode.dataset.name.indexOf('wish') >= 0) {
            overseaApi = wishApi;
        } else {
            return true;
        }
        $.ajax({
            'url': overseaApi,
            'type': 'get',
            'dataType': 'jsonp',
            'data': {_: (new Date).getTime()},
            beforeSend() {
                self.setState({processing: true, overseaLoading: true});
            },
            success(json) {
                try {
                    self.setState({processing: false, overseaLoading: false});
                    window.location.href = json.url;

                } catch (ex) {
                    self.setState({processing: false, overseaLoading: false});
                }
            },
            error() {
                self.setState({processing: false, overseaLoading: false});
            }
        });
    },

    render() {
        let styleH2 = {
            fontSize: '24px',
            fontWeight: 'normal',
            textAlign: 'center',
            margin: '20px auto'
        };
        let styleUl = {
            width: '70%',
            margin: 'auto'
        };
        let styleLi = {
            width: '90%',
            margin: '14px auto'
        };
        let platforms = ['taobao', 'tmall', 'jingdong', 'others', 'ebay', 'amazon', 'wish', 'kjy', 'aliexpress', 'lazada'];
        let self = this;
        let platformList = platforms.map(function (platform) {
            let pt = platform;
            let enabledClass = 'add-icon ' + platform + '-icon';
            let disabledClass = 'add-icon disable-' + platform + '-icon';
            let platformLink = platform + 'Account';
            if (['aliexpress', 'taobao', 'tmall', 'jingdong', 'kjy', 'lazada'].indexOf(platform) >= 0) {
                platformLink = 'platform-account';
            } else if (platform === 'others') {
                platformLink = 'individualCredit';
                pt = 'introduce';
            } else if (platform === 'amazon') {
                pt = '';
            }
            return <li style={styleLi} key={platform}>
                {
                    (platform === 'ebay' || platform === 'wish') ?
                        <div onClick={self.getOverseaUrl}>
                            <p className={enabledClass} data-name={platform}>
                                <Button
                                    material-button
                                    tracking={{'lmt-track-id': platform}}
                                    ></Button>
                            </p>
                        </div> :
                        <Link to={{pathname: `${platformLink}/${pt}`}}>
                            <p className={enabledClass} data-name={platform}>
                                <Button
                                    material-button
                                    tracking={{'lmt-track-id': platform}}
                                    ></Button>
                            </p>
                        </Link>
                }
            </li>;
        });
        return (
            <div>
                <Logo />
                <h2 style={styleH2}>请选择经营平台</h2>
                <ul style={styleUl}>
                    {platformList}
                </ul>
                <Custorm></Custorm>
                <Css3Loading loading={this.state.overseaLoading}></Css3Loading>
            </div>
        );
    }
});

module.exports = PlatForm;

/**
 * Created by malin on 15/5/13.
 */

var React = require('react'),
    AppData = require('./../component/appData'),
    Customer = require('./../component/customer'),
    Button = require('./../component/button'),
    Logo = require('./../component/logo'),
    ErrorMessage = require('./../component/errorMessage'),
    formCheck = require('./../form/formCheck'),
    InputFull = require('./../form/inputFull');

const {stdApi} = AppData.api();

const platformPasswordApi = stdApi.platformPasswordApi;

let Authorize = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            text: '登录',
            processing: false,
            platform: this.props.location.query.pt,
            account: this.props.location.query.account,
            errorMessage: ''
        };
    },

    loginAjax() {
        if (this.state.processing) {
            return false;
        }
        let self = this;
        if (!formCheck(self)) {
            return false;
        }
        let o = $('form').serialize();
        $.ajax({
            'url': platformPasswordApi,
            'type': 'get',
            'dataType': 'jsonp',
            'data': o + '&platform=' + self.state.platform.toLowerCase() + '&account=' + self.state.account,
            beforeSend: function () {
                self.setState({processing: true, text: '授权中'});

            },
            success: function (json) {
                if (json.result === 'failure') {
                    self.setState({errorMessage: json.message, processing: false, text: '登录'});

                } else {
                    let platformGroup = 'all';
                    for (let group in window.std.platformGroupConfigs) {
                        if (window.std.platformGroupConfigs[group].indexOf(self.state.platform.toLowerCase()) >= 0) {
                            platformGroup = group;
                            break;
                        }
                    }
                    self.context.router.push('estimate', {platformGroup: platformGroup});
                }
                self.setState({processing: false, text: '登录'});
            },
            error: function () {
                self.setState({errorMessage: '请检查您的网络，或稍后再试', processing: false, text: '登录'});


            }
        });
    },

    render: function () {
        let styleH2 = {
            fontSize: '30px',
            fontWeight: 'normal',
            textAlign: 'center',
            margin: '20px auto'
        };
        let styleDiv = {
            width: '80%',
            margin: '0 auto'
        };
        let styleP = {
            color: 'rgb(120, 167, 252)',
            textAlign: 'center',
            fontSize: '16px',
            margin: '30px auto'
        };
        let styleSpan = {
            fontSize: '16px',
            display: 'block',
            width: '80%',
            lineHeight: '1.3em',
            color: 'rgb(97, 95, 95)',
            margin: '3px auto'
        };
        return (
            <div>
                <Logo></Logo>

                <h2 style={styleH2}>淘宝会员登录</h2>

                <p style={styleP}>为准确提供授信额度，需校验您的店铺数据</p>

                <div style={styleDiv}>
                    <InputFull
                        text=""
                        type="text"
                        className="input-account"
                        width="100%"
                        name="accountName"
                        ref="account"
                        data-name="account"
                        placeholder="请输入登录账号"
                        validate={{require: '请输入登录账号'}}
                        ></InputFull>
                    <InputFull
                        text=""
                        type="password"
                        className="input-password"
                        width="100%"
                        name="password"
                        ref="password"
                        data-name="password"
                        validate={{require: '该项为必填项'}}
                        placeholder="请输入登录密码">
                    </InputFull>
                </div>
                <div className="width80">
                    <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
                </div>
                <div className="button-link-middle" onClick={this.loginAjax}>
                    <Button style={{background: 'red'}} text={this.state.text}></Button>
                </div>
                <span style={styleSpan}>
                    *登录后后台将自动抓取校验店铺数据,商通贷不会记录修改任何账户信息,请放心使用
                </span>
                <Customer></Customer>
            </div>

        )
    }
})
module.exports = Authorize;

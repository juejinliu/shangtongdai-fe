/**
 * Created by malin on 15/9/23.
 */

var React = require('react'),
    Button = require('../../component/button'),
    AppData = require('./../../component/appData'),
    Cookie = require('react-cookie'),
    InputFullCode = require('../../form/inputFullCode'),
    Logo = require('./../../component/logo'),
    Customer = require('./../../component/customer'),
    ErrorMessage = require('./../../component/errorMessage'),
    Tracking = require('./../../lib/tracking'),
    formCheck = require('./../../form/formCheck'),
    mobileCheck = require('./../../form/mobileCheck'),
    InputFull = require('../../form/inputFull'),
    Css3Loading = require('./../../modelComponent/css3loading');

var codeInterval = 0;

const {stdApi, stdUserStatus} = AppData.api();

const [mgmAuthCodeApi, mgmViewWalletApi] = [stdApi.mgmAuthCodeApi, stdApi.mgmViewWalletApi];
var account = stdUserStatus.mgmInfo && stdUserStatus.mgmInfo.account;

let GetCheckCode = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            num: '',
            loading: false,
            processingCode: false,
            buttonText: '查看我的赏金',
            errorMessage: ''

        };
    },

    getCode() {
        let self = this;
        if (this.state.processingCode) {
            return;
        }

        if (!mobileCheck(self, 'mobile')) {
            return;
        }

        Tracking.trackEvent('click', {
            'activity': 'mgmNew',
            'status': 'active-button',
            'lmt-track-id': 'mgmNew-checkCode-button'
        });

        $.ajax({
            'url': mgmAuthCodeApi,
            'type': 'get',
            'data': {phone: $('#mobile').val(), _: (new Date).getTime()},
            beforeSend() {
                self.setState({errorMessage: ''});
            },
            success(data) {
                let json = JSON.parse(data);
                if (json.result !== 'success') {
                    if (codeInterval) {
                        clearInterval(codeInterval);
                        codeInterval = null;
                        self.setState({num: '', processingCode: false});
                    }
                    $('#authCode').next().html(json.message);
                } else {
                    $('#authCode').next().html('验证码发送成功');
                }
            },
            error() {
                self.setState({
                    errorMessage: '请检查您的网络或稍后再试'
                });
            }
        });
        self.setState({num: 60, processingCode: true});

        let timer = function () {
            self.setState({num: self.state.num - 1});
            if (self.state.num === 0) {
                clearInterval(codeInterval);
                codeInterval = null;
                self.setState({num: '', processingCode: false});
            }
        };
        codeInterval = setInterval(timer, 1000);


    },
    viewWallet(e) {
        if (this._toForm()) {
            let self = this;
            $.ajax({
                'url': mgmViewWalletApi,
                'type': 'get',
                'data': {
                    'data': JSON.stringify({mobile: $('#mobile').val(), authCode: $('#authCode').val()}),
                    _: (new Date).getTime()
                },
                beforeSend() {
                    self.setState({buttonText: '提交中', errorMessage: ''});
                },
                success(data) {
                    let json = JSON.parse(data);
                    if (json.result === 'failure') {
                        self.setState({buttonText: '查看我的赏金', errorMessage: json.message});
                    } else {
                        //设置已经成功访问过赏金页面
                        Cookie.save('reFinancing', true);
                        self.context.router.push('bonus/financing');
                    }
                },
                error() {
                    self.setState({buttonText: '查看我的赏金', errorMessage: '请检查您的网络或稍后再试'});
                }
            });
        }
        e.preventDefault();
    },

    _toForm() {
        let self = this;
        return formCheck(self);
    },

    render() {
        if (this.state.loading) {
            return <Css3Loading loading={this.state.loading}></Css3Loading>;
        }
        return (
            <div>
                <Logo></Logo>

                <div style={{height: '20px', background: '#E2E2DF'}}></div>
                <div className="regist fullpageHeight">
                    <InputFull
                        id="mobile"
                        text=""
                        type="text"
                        width="100%"
                        name="mobile"
                        className="input-mobile"
                        ref="mobile"
                        data-name="mobile"
                        placeholder="请输入手机号"
                        defaultValue={account}
                        validate={{require: '该项为必填项', phone: '请输入正确的手机号'}}
                        ></InputFull>
                    <InputFullCode
                        text=""
                        type="text"
                        width="60%"
                        className="input-yan"
                        name="authCode"
                        ref="authCode"
                        data-name="authCode"
                        id="authCode"
                        placeholder="请输入验证码"
                        onClick={this.getCode}
                        num={this.state.num}
                        validate={{require: '该项为必填项'}}
                        ></InputFullCode>

                    <ErrorMessage>{this.state.errorMessage}</ErrorMessage>

                    <div onClick={this.viewWallet} className="button-link-full">
                        <div className="toapply-button">
                            <Button
                                text={this.state.buttonText}
                                material-button
                                tracking={{
                                'activity': 'mgmNew',
                                'status': 'active-button',
                                'lmt-track-id': 'mgmNew-checkCode-link'
                            }}
                                ></Button>
                        </div>

                    </div>
                </div>
                <Customer></Customer>
            </div>
        );
    }
});


module.exports = GetCheckCode;
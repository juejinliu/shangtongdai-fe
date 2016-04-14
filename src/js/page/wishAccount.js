/**
 * Created by malin on 15/5/26.
 */
var React = require('react'),
    AppData = require('./../component/appData'),
    InputFull = require('./../form/inputFull'),
    Logo = require('./../component/logo'),
    Customer = require('./../component/customer'),
    ErrorMessage = require('./../component/errorMessage'),
    Button = require('./../component/button');

const {stdApi} = AppData.api();

const platformApi = stdApi.platformApi;

let WishAccount = React.createClass({
    getInitialState() {
        return {
            num: 1,
            processing: false,
            text: '添加',
            errorMessage: '',
            isShow: false
        };
    },
    toForm() {
        let data = $('form').serializeArray();
        let arr = [];
        let obj = {};
        data.forEach(function (val, index) {
            if (val.value) {
                obj[val.name] = val.value;
            }
            if (index % 2) {
                if (obj[val.name]) {
                    arr.push(obj);
                }
                obj = {};
            }
        });
        return {'accounts': arr};
    },
    addAcountAjax() {
        let self = this;
        if (self.state.processing) {
            return false;
        }
        ;
        let ref = this.refs;
        let hasError = 0;
        for (let i of Object.keys(ref)) {
            if (ref[i].refs.validate) {
                if (ref[i].refs.validate.refs.validate.props.toValidate) {
                    hasError += ref[i].refs.validate.refs.validate.props.toValidate(
                        ref[i].refs.validate.refs.validate.value,
                        ref[i].props.validate
                    );
                }
            }
        }
        if (hasError !== 0) {
            return false;
        }
        let o = this.toForm();
        $.ajax({
            'url': platformApi,
            'type': 'get',
            'dataType': 'jsonp',
            'jsonp': 'callback',
            'data': {'data': JSON.stringify(o), 'platform': 'WISH', _: (new Date).getTime()},
            beforeSend() {
                self.setState({processing: true, text: '提交中'});
            },
            success(json) {

                if (json.result !== 'success') {
                    let message = json.generalMessage ? json.generalMessage : json.message;
                    self.setState({
                        errorMessage: message,
                        processing: false,
                        text: '添加'
                    });
                } else {
                    window.location.href = window.location.pathname + window.location.search + '#estimate';
                }
            },
            error() {
                self.setState({
                    errorMessage: '请检查网络或刷新再试。',
                    processing: false,
                    text: '添加'
                });
            }
        });

    },
    closePage(){
        this.setState({
            isShow: false
        });
    },
    render() {
        let styleH2 = {
            fontSize: '30px',
            fontWeight: 'normal',
            textAlign: 'center',
            margin: '20px auto'
        };
        let subTitle = {
            fontSize: '19px',
            fontWeight: 'normal',
            textAlign: 'left',
            marginTop: '20px',
            marginBottom: '8px'
        };
        let content = {
            fontSize: '15px',
            marginBottom: '8px',
            lineHeight: '1.2em'
        };
        let styleDivOuter = {
            width: '80%',
            margin: 'auto'
        };
        return (
            <div>
                <Logo />

                <div className="fullpageHeight">

                    <h2 style={styleH2}>添加Wish账号</h2>

                    <div className="wishAccount" ref="tb" style={styleDivOuter}>
                        <p style={subTitle}>① 授权</p>

                        <p style={content}>
                            登录Wish商户平台，点击右上角“<b>账户-设置</b>”，点击左侧“<b>应用程序设置</b>”，选中<b>商通贷</b>
                        </p>

                        <p style={subTitle}>② 商户ID</p>

                        <p style={content}>
                            点击左侧“<b>基本信息</b>”，复制“<b>商户ID</b>”
                        </p>
                        <InputFull
                            type="text"
                            text=""
                            className="input-no-icon"
                            name="merchantId"
                            width="100%"
                            ref="merchantId"
                            data-name="merchantId"
                            placeholder="商户ID"
                            validate={{require: '请输入商户ID'}}
                            ></InputFull>

                        <p style={subTitle}>③ 商户名称</p>

                        <p style={content}>您的店铺名称。不可重复</p>
                        <InputFull
                            text=""
                            type="text"
                            className="input-no-icon"
                            width="100%"
                            name="account"
                            ref="account"
                            data-name="account"
                            placeholder="商户名称"
                            validate={{require: '请输入商户名称'}}
                            ></InputFull>
                    </div>
                    <div className="width80">
                        <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
                    </div>
                    <div className="button-link-middle" onClick={this.addAcountAjax}>
                        <Button
                            text={this.state.text}
                            material-button
                            tracking
                            ></Button>
                    </div>
                </div>

                <Customer></Customer>
            </div>
        );
    }
});
module.exports = WishAccount;

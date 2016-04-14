/**
 * Created by malin on 15/5/26.
 */
var React = require('react'),
    AppData = require('./../component/appData'),
    InputFull = require('./../form/inputFull'),
    Select = require('./../form/select'),
    Logo = require('./../component/logo'),
    {formate} = require('./../component/myfunction'),
    Customer = require('./../component/customer'),
    ErrorMessage = require('./../component/errorMessage'),
    AmazonHelp = require('./../modelComponent/amazonHelp'),
    Button = require('./../component/button');

const {stdApi, stdUserStatus} = AppData.api();

const [purpose, amazonApi] = [stdUserStatus.amazonCountry, stdApi.amazonApi];

let AmazonAccount = React.createClass({

    getDefaultProps() {
        return {
            query: {expiredAccount: ''}
        };
    },

    getInitialState() {
        return {
            num: 1,
            processing: false,
            text: '添加',
            errorMessage: '',
            isShow: false
        };
    },

    addAcountAjax() {
        var self = this,
            ref = this.refs,
            hasError = 0;
        if (this.state.processing) {
            return false;
        }
        for (let i of Object.keys(ref)) {
            if (ref[i].refs && ref[i].refs.validate) {
                if (ref[i].refs.validate.toValidate) {
                    hasError += ref[i].refs.validate.toValidate(
                        ref[i].refs.validate.refs.validate.value,
                        ref[i].props.validate
                    );
                }
            }
        }
        if (hasError > 0) {
            return false;
        }
        let o = {};
        let data = $('form').serializeArray();
        formate(data, o);
        $.ajax({
            'url': amazonApi,
            'type': 'get',
            'dataType': 'jsonp',
            'jsonp': 'callback',
            'data': {'data': JSON.stringify(o), _: (new Date).getTime()},
            beforeSend: function () {
                self.setState({processing: true, text: '提交中'});
            },
            success: function (json) {
                if (json.result !== 'success') {
                    var message = json.generalMessage ? json.generalMessage : json.message;
                    self.setState({
                        errorMessage: message,
                        processing: false,
                        text: '添加'
                    });
                } else {
                    window.location.href = window.location.pathname + window.location.search + '#estimate';
                }
            },
            error: function () {
                self.setState({
                    errorMessage: message,
                    processing: false,
                    text: '添加'
                });
            }
        });

    },

    showHelp() {
        this.setState({
            isShow: true
        });
    },

    closePage(e){
        this.setState({
            isShow: false
        });
        e.preventDefault();
    },

    render() {
        let styleH2 = {
                fontSize: '30px',
                fontWeight: 'normal',
                textAlign: 'center',
                margin: '20px auto'
            },
            styleDivOuter = {
                width: '80%',
                margin: 'auto'
            };
        let expiredAccount = this.props.location.query.expiredAccount;
        return (
            <div>
                <Logo></Logo>

                <div className="fullpageHeight">

                    <h2 style={styleH2}>添加Amazon账号</h2>

                    <div className="width80">

                        <p style={{display: expiredAccount? 'block': 'none', color: 'red', textAlign: 'center'}}>
                            您的账号{expiredAccount}已过期，需重新授权</p>
                    </div>

                    <div className="width80">
                        <div>
                            <AmazonHelp isShow={this.state.isShow} closePage={this.closePage}></AmazonHelp>
                        </div>
                        <p className="form-notice-sigle" onClick={this.showHelp}>必看教程：如何快速添加账户</p>
                    </div>

                    <div className="amazonAccount" ref="tb" style={styleDivOuter}>
                        <div className="relative">
                            <InputFull
                                text=""
                                type="text"
                                className="input-no-icon"
                                width="65%"
                                name="account"
                                ref="account"
                                data-name="account"
                                placeholder="Amazon账户名"
                                validate={{require: '请输入Amazon账户名'}}
                                ></InputFull>

                            <div id="amazonId">
                                <Select
                                    className="amazon"
                                    name='marketplaceId'
                                    options={purpose}
                                    ></Select>
                            </div>
                        </div>
                        <InputFull
                            type="text"
                            text=""
                            className="input-no-icon"
                            name="sellerId"
                            width="100%"
                            ref="sellerId"
                            data-name="sellerId"
                            placeholder="Seller ID"
                            validate={{require: '请输入Seller ID'}}
                            ></InputFull>
                        <InputFull
                            text=""
                            type="text"
                            width="100%"
                            name="accessKey"
                            className="input-no-icon"
                            ref="accessKey"
                            data-name="accessKey"
                            placeholder='AWS Access Key ID'
                            validate={{require: '请输入AWS Access Key ID'}}

                            ></InputFull>
                        <InputFull
                            type="text"
                            text=""
                            name="secretKey"
                            className="input-no-icon"
                            width="100%"
                            ref="secretKey"
                            data-name="secretKey"
                            placeholder="Secret Key"
                            validate={{require: '请输入Secret Key'}}
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
module.exports = AmazonAccount;

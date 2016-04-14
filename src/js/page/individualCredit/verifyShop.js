/**
 * Created by malin on 15/6/9.
 */

var React = require('react'),
    Logo = require('./../../component/logo'),
    Button = require('./../../component/button'),
    InputFull = require('./../../form/inputFull'),
    AppData = require('./../../component/appData'),
    ErrorMessage = require('./../../component/errorMessage'),
    formCheck = require('./../../form/formCheck'),
    message = require('./../../messageConfig'),
    Tracking = require('./../../lib/tracking'),
    Popup = require('./../../modelComponent/popup'),
    CreditcardLoading = require('./../../compositeComponents/individualCredit/creditcardLoading'),
    SuccessTipPopup = require('./../../component/successTipPopup');

const {stdApi} = AppData.api();

const {othersCodeApi, creditcardApi} = stdApi;

let CreditcardVerifyShop = React.createClass({

    getDefaultProps() {
        return {
            platform: message.individualCredit.validate
        };
    },

    getInitialState() {
        return {
            className: 'verify-small',
            code: '',
            errorMessage: '',
            isLoadingShow: false,
            isSuccessShow: false,
            processing: false
        };
    },

    componentDidMount() {
        let self = this;
        $.ajax({
            'url': othersCodeApi,
            'type': 'get',
            'data': {_: (new Date).getTime()},
            success(data) {
                if (data.result === 'success') {
                    self.setState({
                        code: data.code
                    });
                } else {
                    self.setState({
                        errorMessage: message.global.errorMessage.net
                    });
                }
            }
        });
    },

    linkToCreditcard() {
        this.context.router.push('creditcard');
    },

    touch(e) {
        e.preventDefault();
        $('input').blur();
        let self = this;
        let url = $.trim($('#validate-url').val());
        if (!formCheck(self)) {
            return;
        }
        let account = {
            platform: message.individualCredit.validate,
            code: self.state.code,
            account: url
        };
        let accounts = {};
        accounts.accounts = [account];
        $.ajax({
            'url': creditcardApi + self.props.platform,
            'type': 'post',
            'dataType': 'json',
            'data': JSON.stringify(accounts),
            'headers': {
                'Content-Type': 'application/json'
            },
            beforeSend() {
                self.setState({
                    processing: true,
                    isLoadingShow: true
                });
            },
            success(data) {
                Tracking.trackEvent('tsdata', {
                    activity: 'creditcard',
                    reason: 'send',
                    platform: self.props.platform,
                    username: url,
                    code: self.state.code
                });
                if (data.result === 'success') {
                    self.setState({
                        isSuccessShow: true,
                        isLoadingShow: false
                    });
                    Tracking.trackEvent('tsdata', {
                        activity: 'creditcard',
                        reason: 'success',
                        platform: self.props.platform,
                        username: url,
                        code: self.state.code
                    });
                } else {
                    if (data.errors && Object.keys(data.errors).length) {
                        self.setState({
                            errorMessage: data.errors[Object.keys(data.errors)[0]] || message.global.errorMessage.net
                        });
                    } else {
                        self.setState({
                            errorMessage: data.generalMessage
                        });
                    }
                    self.setState({
                        isLoadingShow: false,
                        processing: false,
                        isSuccessShow: false
                    });
                    Tracking.trackEvent('tserror', {
                        reason: data.generalMessage,
                        activity: 'creditcard',
                        platform: self.props.platform,
                        username: url,
                        code: self.state.code
                    });
                }
            }
        });
    },
    changePicture() {
        if (this.state.className === 'verify-big') {
            this.setState({
                className: 'verify-small'

            });
        } else {
            this.setState({
                className: 'verify-big'
            });
        }
    },

    render() {
        return (
            <div className="creditcard">
                <Logo></Logo>

                <div className="introduce fullpageHeight width90">
                    <h2 className="h2-title">{message.individualCredit.titleVerify}</h2>

                    <p>为了验证您对店铺的所有权，请按如下步骤操作：</p>
                    <br/>

                    <p>1. 将括号内的这段验证代码（<span className="warning">{this.state.code}</span>），复制到您某个商品的文字描述或标题中，并发布上架。</p>

                    <div className={this.state.className} onClick={this.changePicture}></div>

                    <p>2. 发布后，将此商品页的网址复制到下面的框中，点击验证。 验证成功后，即可将上述字母删除。</p>
                    <br/>
                    <InputFull
                        type="text"
                        text=""
                        id="validate-url"
                        width="100%"
                        ref="url"
                        className="input-no-icon"
                        placeholder="复制网址至此，比如 http://shop.mogujie.com/detail/182ul3y"
                        validate={{require: message.global.errorMessage.require}}>
                    </InputFull>
                    <ErrorMessage>{this.state.errorMessage}</ErrorMessage>

                    <div onClick={this.touch} className="button-link-big">
                        <Button
                            material-button
                            text={message.global.button.next}
                            tracking>
                        </Button>
                    </div>

                    <Popup width="80%" show={this.state.isLoadingShow} processing={this.state.processing}>
                        <CreditcardLoading
                            isLoadingShow={this.state.isLoadingShow}
                            ></CreditcardLoading>
                    </Popup>
                    <Popup width="80%" show={this.state.isSuccessShow}>
                        <SuccessTipPopup
                            isSuccessShow={this.state.isSuccessShow}
                            callback={this.linkToCreditcard}
                            ></SuccessTipPopup>
                    </Popup>
                </div>
            </div>
        );
    }
});
module.exports = CreditcardVerifyShop;

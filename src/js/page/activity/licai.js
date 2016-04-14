/**
 * Created by gaoyang on 15/10/21.
 */
var React = require('react'),
    Logo = require('./../../component/logo'),
    formValidator = require('./../../form/formValidator'),
    Tracking = require('./../../lib/tracking'),
    CryptoJS = require('./../../lib/cryptoJS'),
    ErrorMessage = require('./../../component/errorMessage'),
    $ = require('./../../lib/zepto');

const trialAssetApi = window.std.stdApi.trialAssetApi;
const keyAPi = window.std.stdApi.licaiKeyApi;
const loadingImgUrl = location.protocol + '//static.yixin.com/file/T1XRWTBThg1RCvBVdK0ffX.jpg';

let Licai = React.createClass({
    getInitialState() {
        return {
            'loading': false,
            'status': 'needPhoneNum',
            'errorMessage': '',
            'btnDisable': true,
            'btnText': '马上领取',
            'key': null,
            'ksi': null
        };
    },

    componentDidMount() {
        let self = this;
        $.ajax({
            'url': keyAPi,
            'type': 'get',
            'dataType': 'json',
            success(json) {
                if (json.session && json.session.key && json.session.ksi) {
                    self.setState({
                        key: json.session.key,
                        ksi: json.session.ksi
                    });
                }
            }
        });
    },

    encrypt(message, key, iv) {
        let options = {
            iv: iv,
            padding: CryptoJS.pad.ZeroPadding
        };
        let encrypted = CryptoJS.AES.encrypt(message, key, options);
        return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
    },

    getExperience(e) {
        e.preventDefault();
        let self = this;
        let formData = {
            'phone': $('.phone-input').val(),
            'activity_task_code': 'broker_std_trial_asset'
        };
        let key = CryptoJS.enc.Latin1.parse(this.state.key);
        let iv = key;
        let encryptString = this.encrypt(JSON.stringify(formData), key, iv);
        let api = trialAssetApi + '?br=shangtongdai&d=oj-nsv&ksi=' + encodeURIComponent(this.state.ksi) + '&data=' + encodeURIComponent(encryptString);
        Tracking.trackEvent('click', {'lmt-track-id': 'licai-get--gold-btn'});
        $.ajax({
            'url': api,
            'type': 'get',
            'dataType': 'json',
            beforeSend() {
                self.setState({
                    'status': 'loading'
                });
            },
            success(json) {
                if (json.return_code === 0) {
                    self.setState({
                        'status': 'getSuccess'
                    });
                } else if (json.return_code === 10001) {
                    self.setState({
                        'status': 'done'
                    });
                } else {
                    self.setState({
                        'status': 'needPhoneNum',
                        'errorMessage': json.return_message
                    });
                }
            },
            error() {
                self.setState({
                    btnText: '请重试'
                });
            }
        });
    },

    checkPhoneNum(event, value) {
        let self = this,
            validate = {
                require: '该项为必填项',
                phone: '请填写正确的手机号'
            };
        if (value && value !== event._dispatchIDs) {
            validate = value;
        }
        for (let i of Object.keys(validate)) {
            if (formValidator[i](event.target ? event.target.value : event) === false) {
                self.setState({
                    btnDisable: true
                });
            } else {
                self.setState({
                    errorMessage: '',
                    btnDisable: false
                });
            }
        }
    },

    withDraw(e) {
        e.preventDefault();
        this.setState({
            'status': 'getSuccess',
        });
    },

    render() {
        return (
            <div className="licai">
                <Logo></Logo>

                <div className="licai-banner"></div>
                <div className="status-container">
                    <div className="user-status"
                         style={{display: (this.state.status === 'loading') ? 'block' : 'none'}}>
                        <img src={loadingImgUrl}/>
                    </div>
                    <div className="user-status"
                         style={{display: (this.state.status === 'needPhoneNum') ? 'block' : 'none'}}>
                        <p className="section-title">输入手机号，免费领取体验金</p>
                        <input type="text" className="phone-input width70" onInput={this.checkPhoneNum}/>

                        <div className="err-container width70">
                            <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
                        </div>
                        {
                            this.state.btnDisable ?
                                <button className="disabled-btn" disabled>马上领取</button> :
                                <button className="btn" onClick={this.getExperience}>马上领取</button>
                        }
                    </div>
                    <div className="user-status"
                         style={{display: (this.state.status === 'getSuccess') ? 'block' : 'none'}}>
                        <p className="section-title">恭喜，您已领取18888体验金</p>

                        <div className="info">
                            已为您自动投资专属理财『吉祥如意』，享10%年化收益率，期限2天。如果您需要提现，请去商通贷理财的活动页面。
                        </div>
                        <a className="btn"
                           href="https://shangdai.yixin.com/licai/trial?lmt-track-id=licai-mobile-withdraw-btn"
                           data-lmt-track-id="licai-mobile-withdraw-btn"
                           data-lmt-track-trigger="click"
                           data-lmt-track-data='{"event": "click"}'
                            >去提现</a>
                    </div>
                    <div className="user-status" style={{display: (this.state.status === 'done') ? 'block' : 'none'}}>
                        <p className="section-title">体验金已领取</p>

                        <div className="info">
                            您已经领取过体验金，活动期间每人只能领取一次。
                        </div>
                        <button className="btn" onClick={this.withDraw}>确定</button>
                    </div>
                </div>
                <div className="dashed-border">
                    <p className="info-title">体验金是什么</p>
                    <span className="red">商通贷理财免费赠送</span>给您的理财体验金，用于体验投资专属理财产品[<span className="red">吉祥如意</span>]
                    ,享受<span className="red">年化10%</span>的收益率。您的理财收益可提现，体验活动结束后体验金会被系统收回。
                </div>
                <div className="step-container">
                    <p className="step info-title">如何使用体验金</p>

                    <div className="step-pic"></div>
                </div>
                <div className="rule-container">
                    <div className="text-center">
                        <div className="rule-title info-title">活动规则</div>
                    </div>
                    <p className="rule rule-1">本次活动时间：2015年10月28日至2015年11月10日；</p>

                    <p className="rule rule-2">本次活动对象：所有的商通贷注册用户；</p>

                    <p className="rule rule-3">活动期间，所有注册用户均可以免费领取18888元理财体验金，过期系统自动收回；</p>

                    <p className="rule rule-4">体验金可以投资专属理财[吉祥如意]，10%年化收益率，封闭期2天，到期后收益可以提现，活动结束后体验金被系统收回；</p>

                    <p className="rule rule-5">体验金收益需要在活动期间内完成一笔投资后才可提现；</p>

                    <p className="rule rule-6">
                        体验金收益会在您提交提现申请后的2个工作日内打到您绑定的银行卡上，您在活动期间购买的理财产品到期后，所产生的利息连同本金也将在2个工作日内打到您绑定的银行卡上；</p>

                    <p className="rule rule-7">由于活动11月10日结束，理财金有2天封闭期，所以您最晚需要在11月7日领取体验金，才能享受活动收益；</p>

                    <p className="rule rule-8">
                        体验金获得的收益，每个手机号、每个身份证号只能提现一次。<br/>
                        *本次活动解释权归商通贷所有
                    </p>
                </div>
                <div className="licai-footer"></div>
            </div>
        );
    }
});

module.exports = Licai;

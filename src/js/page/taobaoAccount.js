/**
 * Created by malin on 15/5/26.
 */
var React = require('react'),
    AppData = require('./../component/appData'),
    InputFull = require('./../form/inputFull'),
    ErrorMessage = require('./../component/errorMessage'),
    Logo = require('./../component/logo'),
    Customer = require('./../component/customer'),
    Select = require('./../form/select'),
    CheckAmount = require('./../modelComponent/checkAmount'),
    Button = require('./../component/button');


const {stdApi, stdUserStatus} = AppData.api();

const [platformApi, shopTypes] = [stdApi.platformApi, stdUserStatus.shopTypes];

let TaobaoAccount = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState() {
        return {
            num: 1,
            accountPlatform: this.props.params.platform,
            processing: false,
            text: '添加',
            errorMessage: ''
        };
    },

    addTB() {
        this.setState({num: this.state.num += 1});
    },

    toForm() {
        let self = this;
        let data = $('form').serializeArray();
        let arr = [];
        let obj = {};
        data.forEach(function (val, index) {
            if (val.value) {
                if (val.value - 1 > -1) {
                    obj[val.name] = Number(val.value);

                } else {
                    obj[val.name] = val.value;
                }
            }
            //淘宝天猫请求加一个select  每当是第3个元素的时候push，其他平台第2个的时候push
            if (self.state.accountPlatform === 'taobao' || self.state.accountPlatform === 'tmall') {
                if (index % 3 === 2) {
                    if (obj[val.name]) {
                        arr.push(obj);
                    }
                    obj = {};
                }
            } else {
                if (index % 2) {
                    if (obj[val.name]) {
                        arr.push(obj);
                    }
                    obj = {};
                }
            }
        });
        return {'accounts': arr};
    },

    addAcountAjax(e) {
        let self = this;
        if (self.state.processing) {
            return false;
        }
        let input = $('.tbAccount input');
        let arrName = [];
        let arrMoney = [];

        input.each(function (index, value) {
            if (value.value) {
                if (index % 2) {
                    arrMoney.push(index);
                } else {
                    arrName.push(index);
                }
            }
        });
        if (arrName.length === 0 || arrMoney.length === 0 || (arrName.length !== arrMoney.length)) {
            this.setState({
                errorMessage: '请填写完整账号信息'
            });
            return false;
        } else {
            if (arrMoney[arrMoney.length - 1] - arrName[arrName.length - 1] !== 1) {
                this.setState({
                    errorMessage: '请填写完整账号信息'
                });
                return false;
            } else {
                this.setState({
                    errorMessage: ''
                });
            }

        }
        let o = this.toForm();
        $.ajax({
            'url': platformApi,
            'type': 'get',
            'dataType': 'jsonp',
            'jsonp': 'callback',
            'data': {'data': JSON.stringify(o), 'platform': this.state.accountPlatform, _: (new Date).getTime()},
            beforeSend: function () {
                self.setState({processing: true, text: '提交中'});
            },
            success: function (json) {
                if (json.result === 'failure') {
                    self.setState({errorMessage: (json.message || json.generalMessage), processing: false, text: '添加'});
                } else {
                    self.context.router.push('estimate');
                }
            },
            error: function () {
                self.setState({errorMessage: '请检查您的网络，或稍后再试', processing: false, text: '添加'});
            }
        });
        e.preventDefault();

    },
    render() {
        let gmvName = 'gmv30';
        let accountText = '';
        let accountPlaceholder = '完整的旺旺名，店铺名称或店铺地址';
        let placeholder = '月均支付金额(元)';
        let checkAcountText = '如何查看月均支付金额？';
        if (this.state.accountPlatform === 'taobao') {
            accountText = '淘宝';
        } else if (this.state.accountPlatform === 'tmall') {
            accountText = '天猫';
        } else if (this.state.accountPlatform === 'kjy') {
            accountText = '一通百';
            gmvName = 'gmv180';
            placeholder = '近180天成功支付订单金额(元)';
            accountPlaceholder = '用户名';
            checkAcountText = '';

        } else if (this.state.accountPlatform === 'lazada') {
            accountText = 'Lazada';
            accountPlaceholder = '账号';
            placeholder = '近30天成功支付订单金额(美元)';
            checkAcountText = '';
        } else if (this.state.accountPlatform === 'jingdong') {
            accountText = '京东';
            accountPlaceholder = '完整的店铺地址';
            placeholder = '近3个月月均交易额';
            checkAcountText = '';
        } else {
            accountPlaceholder = '账号';
            accountText = '速卖通';
            gmvName = 'gmv90';
            placeholder = '近90天成功支付订单金额(美元)';
            checkAcountText = '如何查看近90天成功支付金额？';
        }
        let styleH2 = {
            fontSize: '30px',
            fontWeight: 'normal',
            textAlign: 'center',
            margin: '20px auto'
        };
        let styleDivOuter = {
            width: '80%',
            margin: 'auto'
        };
        let styleP = {
            marginLeft: '10%',
            fontSize: '13px',
            color: '#5894f0',
            width: '30%',
            marginBottom: '20px'
        };
        let tbEle = <div className="tbAccount"  ref="tb" style={styleDivOuter}>
            { this.state.accountPlatform === 'tmall' || this.state.accountPlatform === 'taobao' ?
                <div className="taobaoSelect">
                    <Select
                        name='shopType'
                        options={shopTypes}
                        ></Select>
                </div> : null
            }
            <InputFull
                text=""
                type="text"
                className="input-account"
                width="100%"
                name="account"
                ref="tbaccount"
                data-name="tbaccount"
                placeholder={accountPlaceholder}
            ></InputFull>
            <InputFull
                type="number"
                text=""
                className="input-money"
                name={gmvName}
                width="100%"
                ref="tbmoney"
                data-name="tbmoney"
                placeholder={placeholder}
                validate={{onlyNumber: '请填写数字'}}
            ></InputFull>
        </div>;
        let moreTbs = [];
        if (this.state.num > 1) {
            for (let i = 1; i < this.state.num; i++) {
                moreTbs.push(React.cloneElement(tbEle, {key: i}));
            }
        }

        return (
            <div>
                <Logo />
                <div className="fullpageHeight">
                    <div id="tbDiv">
                        <h2 style={styleH2}>添加{accountText}账号</h2>
                        {tbEle}
                        <CheckAmount text={checkAcountText} platform={this.state.accountPlatform}></CheckAmount>
                        {moreTbs}
                    </div>
                    <p style={styleP} onClick={this.addTB}>
                        <Button
                            text="继续添加"
                            tracking
                            style={{textAlign: 'left'}}
                            ></Button>
                    </p>

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
module.exports = TaobaoAccount;

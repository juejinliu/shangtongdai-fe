/**
 * Created by malin on 15/5/4.
 */
var React = require('react'),
    {Link, IndexLink} = require('react-router'),
    formCheck = require('./../form/formCheck'),
    AppData = require('./../component/appData'),
    Css3Loading = require('./../modelComponent/css3loading'),
    Event = require('./../lib/trigger'),
    Customer = require('./../component/customer'),
    Button = require('./../component/button'),
    Logo = require('./../component/logo'),
    H4Title = require('./../component/h4Title'),
    TextSelect = require('./../form/textSelect'),
    TextInputText = require('./../form/textInputText'),
    TextInput = require('./../form/textInput'),
    TextFile = require('./../form/textFile'),
    TextAddressSelectText = require('./../form/textAddressSelectText'),
    TextSelectHiddenText = require('./../form/textSelectHiddenText');

const {stdApi, stdUserStatus} = AppData.api();

const [purpose, applyableProductApi, loanFormApi, rateApi, isNewUser] = [
    stdUserStatus.purpose,
    stdApi.applyableProductApi,
    stdApi.loanFormApi,
    stdApi.rateApi,
    stdUserStatus.newUser
];

const companyType = [{id: 'company', message: '公司'}, {id: 'individual', message: '个体'}];

let LoanLayout = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
        return {
            loading: true,
            products: [],
            isShowCompanyInput: true
        };
    },

    componentDidMount() {
        const { route } = this.props;
        const { router } = this.context;
        router.setRouteLeaveHook(route, this.routerWillLeave);
    },

    componentWillMount() {
        this.isApplyableShowPage();
        this.getLoanFormInfo();
    },

    componentWillUnmount() {
        AppData.loan.toSave();
    },

    routerWillLeave(route) {
        if (route.pathname === 'loanSecond') {
            if (this._toForm() === false) {
                return false;           //这里不能改掉,否则不能阻止表单
            }
        }
    },

    isApplyableShowPage() {
        let self = this;
        $.ajax({
            'url': applyableProductApi,
            'type': 'get',
            'dataType': 'jsonp',
            'data': {_: (new Date).getTime()},
            success(json) {
                if (json.isLoggedIn && json.applyable) {
                    let parentJson = json;
                    if (!self.props.location.query.taobaoRefuse) {
                        $.ajax({
                            'url': rateApi,
                            'type': 'get',
                            'data': {_: (new Date).getTime()},
                            beforeSend() {
                                self.setState({
                                    loading: true
                                });
                            },
                            success(data) {
                                try {
                                    let json = JSON.parse(data);
                                    //KO是不合格的淘宝或天猫
                                    if (json.status === 'KO') {
                                        console.log(json.status);
                                        self.context.router.push('individualCredit/taobao-refuse');            //如果是淘宝卖家被拒绝，跳转到提示添加个人消费
                                    } else {
                                        self.setState({
                                            loading: false,
                                            products: parentJson.products
                                        });
                                    }
                                } catch (ex) {
                                }

                            }
                        });
                    } else {
                        self.setState({
                            loading: false,
                            products: json.products
                        });
                    }

                } else if (!json.isLoggedIn) {
                    if (isNewUser) {
                        self.context.router.push('reg-login/regist', {next: encodeURIComponent(window.location.href)});
                    } else {
                        self.context.router.push('reg-login/login', {next: encodeURIComponent(window.location.href)});
                    }
                } else {
                    window.location.href = window.location.pathname + window.location.search;
                }
            },
            error() {
                window.location.href = window.location.pathname + window.location.search;
            }
        });
    },
    getLoanFormInfo() {
        let self = this;
        $.ajax({
            'url': loanFormApi,
            'type': 'get',
            'dataType': 'jsonp',
            'data': {_: (new Date).getTime()},
            success(json) {
                if (json.result !== 'failure') {
                    AppData.loan.fillLoanForm(json);
                }
                self.setState({
                    loading: false
                });
            },
            error() {
                self.setState({
                    loading: false
                });
            }
        });
    },

    companyTypeSelectHandler(e) {
        if (e.target.value === 'individual') {
            this.setState({
                isShowCompanyInput: false
            });
            $('input[name="company"]').val('个体');
        } else {
            this.setState({
                isShowCompanyInput: true
            });
            $('input[name="company"]').val('');
        }
    },

    _toForm(e) {
        let self = this;
        return formCheck(self);
    },

    render() {
        if (this.state.loading || this.state.products.length === 0) {
            return <Css3Loading loading={this.state.loading}></Css3Loading>;
        }
        let products = this.state.products;
        purpose.unshift({id: '', message: '请选择'});
        products.unshift({id: '', message: '请选择'});
        return (
            <div className="loan-page">
                <Logo></Logo>
                <H4Title text="借款申请表"></H4Title>
                <div className="section-one">
                    <h5>1/4借款人信息</h5>
                    <TextInput
                        type="text"
                        text="姓名"
                        name="name"
                        ref="name"
                        className="input-no-icon"
                        data-name="name"
                        defaultValue={AppData.loan.name}
                        placeholder="请填写真实姓名"
                        validate={{require: '该项为必填项'}}
                    ></TextInput>
                    <TextInput
                        type="text"
                        text="身份证号"
                        name="identification"
                        className="input-no-icon"
                        ref="identification"
                        data-name="identification"
                        defaultValue={AppData.loan.identification}
                        placeholder="请填写身份证号"
                        validate={{require: '该项为必填项', identification: '请填写正确的身份证号'}}
                    ></TextInput>

                    <TextInput
                        type="tel"
                        text="常用手机号"
                        name="phone"
                        className="input-no-icon"
                        ref="phone"
                        data-name="phone"
                        defaultValue={AppData.loan.phone}
                        placeholder="请填写常用手机号"
                        validate={{require: '该项为必填项', phone: '请填写正确的手机号'}}
                    ></TextInput>

                    <TextAddressSelectText
                        type="select"
                        address="yes"
                        text="现居住地"
                        className="select-center"
                        validate={{require: '请选择地址'}}
                        ref="addressSelect"
                        data-name="addressSelect"
                        value1={AppData.loan.province_id}
                        value2={AppData.loan.city_id}
                        value3={AppData.loan.county_id}
                    ></TextAddressSelectText>
                    <TextInput
                        type="text"
                        name="address"
                        ref="address"
                        className="input-no-icon"
                        data-name="address"
                        defaultValue={AppData.loan.address}
                        placeholder="请填写街道名称"
                        validate={{require: '该项为必填项', length: '请填写完整的街道名称'}}
                    ></TextInput>
                    <TextSelect
                        type="select"
                        text="工作单位"
                        name="company_type"
                        ref="company_type"
                        data-name="company_type"
                        defaultValue={AppData.loan.company_type}
                        options={companyType}
                        validate={{require: '请选择单位类型'}}
                        className="select-center"
                        toggle={this.companyTypeSelectHandler}
                    ></TextSelect>
                    <TextInput
                        type="text"
                        name="company"
                        className={this.state.isShowCompanyInput ? 'input-no-icon' : 'input-no-icon hide'}
                        ref="company"
                        data-name="company"
                        defaultValue={AppData.loan.company}
                        placeholder="请填写工作单位名称"
                        validate={{require: '该项为必填项'}}
                    ></TextInput>
                    <TextInput
                        type="text"
                        text="工作地址"
                        name="company_address"
                        className="input-no-icon"
                        ref="company_address"
                        data-name="company_address"
                        defaultValue={AppData.loan.company_address}
                        placeholder="请填写工作单位地址"
                        validate={{require: '该项为必填项', length: '请填写完整的工作单位地址'}}
                    ></TextInput>
                    <TextFile
                        text="身份证正面照"
                        type="file"
                        name="identification_photo_1_id"
                        ref="identification_photo_1_id"
                        data-name="identification_photo_1_id"
                        validate={{require: '请上传身份证正面照'}}
                        defaultValue={AppData.loan.identification_photo_1_id}
                    ></TextFile>

                    <TextFile type="file"
                        name="identification_photo_2_id"
                        ref="identification_photo_2_id"
                        text="身份证反面照"
                              validate={{require: '请上传身份证反面照'}}
                        data-name="identification_photo_2_id"
                              defaultValue={AppData.loan.identification_photo_2_id}
                    ></TextFile>
                </div>

                <div className="section-two">
                    <h5>2/4借款信息</h5>
                    <TextSelectHiddenText
                        text="借款用途"
                        name="purpose_id"
                        ref="purpose_id"
                        data-name="purpose_id"
                        data-name2="purpose_text"
                        defaultValue={AppData.loan.purpose_id}
                        defaultValue2={AppData.loan.purpose_text}
                        options={purpose}
                        className="select-center"
                        validate={{require: '请选择借款用途'}}
                        id="use"
                        validateTwo={{require: '该项为必填项'}}
                    ></TextSelectHiddenText>

                    <TextInputText
                        type="number"
                        text="借款金额"
                        width="59%"
                        name="amount_cents"
                        ref="amount_cents"
                        className="input-no-icon"
                        data-name="amount_cents"
                        placeholder="请输入0到200的数字"
                        defaultValue={AppData.loan.amount_cents}
                        after="万元"
                        validate={{require: '该项为必填项', number: '请输入0-200之内的整数'}}
                    ></TextInputText>
                    <TextSelect
                        type="select"
                        text="借款方案"
                        name="product_id"
                        ref="product_id"
                        data-name="product_id"
                        defaultValue={AppData.loan.product_id}
                        options={products}
                        validate={{require: '请选择借款方案'}}
                        className="select-center"
                    ></TextSelect>
                </div>
                <div className="loan-bottom-text">
                    <span className="span">先息后本：指每月只需支付当月的利息，借款到期时再偿还本金；</span>
                    <span className="span">等额本息：指每月偿还同等数额的借款（包括本金和利息）。</span>
                </div>

                <IndexLink to={{pathname: '/'}} className="button-link-big grey-button">
                    <Button  text="上一步"></Button>
                </IndexLink>

                <Link to={{pathname: 'loanSecond'}} className="button-link-big">
                    <Button style={{backgroundColor: '#f53053'}}
                        text="下一步"
                        material-button
                        tracking
                    ></Button>
                </Link>
                <Customer></Customer>
            </div>
        );
    }
});
module.exports = LoanLayout;





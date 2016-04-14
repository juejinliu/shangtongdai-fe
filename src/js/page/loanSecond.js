/**
 * Created by malin on 15/5/4.
 */
var React = require('react'),
    {Link} = require('react-router'),
    loan = require('./loan'),
    formCheck = require('./../form/formCheck'),
    Button = require('./../component/button'),
    AppData = require('./../component/appData'),
    Logo = require('./../component/logo'),
    ErrorMessage = require('./../component/errorMessage'),
    Customer = require('./../component/customer'),
    Agree = require('./../component/agree'),
    H4Title = require('./../component/h4Title'),
    TextSelect = require('./../form/textSelect'),
    Event = require('./../lib/trigger'),
    TextInput = require('./../form/textInput');

const {stdApi, stdUserStatus} = AppData.api();

const applicationApi = stdApi.applicationSubmitApi;
const [
    {contacts: familyName, showName: familyShowName},
    {contacts: workName, showName: workShowName},
    {contacts: otherName, showName: otherShowName}
    ] = stdUserStatus.contacts;

familyName.unshift({id: '', message: '请选择'});
workName.unshift({id: '', message: '请选择'});
otherName.unshift({id: '', message: '请选择'});


let LoanSecondLayout = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    componentDidMount() {
        const { route } = this.props;
        const { router } = this.context;
        router.setRouteLeaveHook(route, this.routerWillLeave);
    },

    routerWillLeave(route) {
        if (route.pathname === 'loanOver') {
            if (this._toForm() === false) {
                return false;           //这里不能改掉,否则不能阻止表单
            }
        }
    },

    getInitialState() {
        var applyable = window.std.stdUserStatus.applyable;
        return {
            processing: !applyable,
            text: '提交申请',
            errorMessage: '',
            success: false
        };
    },

    componentWillUnmount() {
        AppData.loan.toSave();
    },

    _toForm() {
        if (this.state.success) {
            return true;
        } else if (!AppData.loan.identification) {
            this.context.router.push('loan');
        }
        if (this.state.processing) {
            return false;
        }
        let self = this;
        if (!formCheck(self)) {
            return false;
        }
        let secondData = $('form').serializeArray();
        let o = {};
        AppData.loan.toArr = AppData.loan.toArr.concat(secondData[secondData.length - 2], secondData[secondData.length - 1]);
        let contactInfo = [{}, {}, {}];
        $.each(secondData, function (i) {
            if (i < 3) {
                contactInfo[0][secondData[i].name] = secondData[i].value;
            } else if (2 < i && i < 6) {
                contactInfo[1][secondData[i].name] = secondData[i].value;
            } else if (5 < i && i < 9) {
                contactInfo[2][secondData[i].name] = secondData[i].value;
            }
            contactInfo[0]['relation_index'] = stdUserStatus.contacts[0].id;
            contactInfo[1]['relation_index'] = stdUserStatus.contacts[1].id;
            contactInfo[2]['relation_index'] = stdUserStatus.contacts[2].id;

        });
        var data = [];
        var personalInfo = data.concat(AppData.loan.toArr.slice(0, 2), AppData.loan.toArr.slice(3, 12));
        var phone = AppData.loan['phone'];
        var application = AppData.loan.toArr.slice(12, 16);


        let _ObjectForm = function _ObjectForm(data) {
            var obj = {};
            data.forEach(function (val) {
                obj[val.name] = val.value;
            });
            return obj;
        };

        o['amount_cents'] = Math.round(parseFloat(AppData.loan.amount_cents) * 100 * 10000);
        o['personal_info'] = _ObjectForm(personalInfo);
        o['phones'] = [{'phone': phone}];
        o['application'] = _ObjectForm(application);
        o['application']['amount_cents'] = o.amount_cents;
        o['ebay_euro_checked'] = false;
        o['contacts'] = contactInfo;
        o['agree_tou'] = true;
        o['questions'] = null;
        $.ajax({
            'url': applicationApi,
            'type': 'get',
            'dataType': 'jsonp',
            'jsonp': 'callback',
            'data': {'data': JSON.stringify(o), _: (new Date).getTime()},
            beforeSend: function () {
                self.setState({processing: true, text: '提交中'});
            },
            success: function (json) {
                if (json.result === 'failure') {
                    self.setState({errorMessage: json.message, processing: false, text: '申请提交'});
                    return false;
                } else {
                    stdUserStatus.applyable = false;
                    self.setState({success: true});
                    $.publish('reloadpage');
                    self.context.router.push('loanOver');
                }
            },
            error: function () {
                self.setState({errorMessage: '请检查您的网络，或稍后再试', processing: false, text: '申请提交'});
                return false;
            }
        });

        return false;

    },
    render() {
        var btnClass = '';
        var styleTitleP = {
            fontSize: '14px',
            textAlign: 'right',
            width: '28%',
            marginBottom: '6px'

        };
        if (this.state.processing === true) {
            btnClass = 'button-link-big lightGreen-button processing';
        } else {
            btnClass = 'button-link-big lightGreen-button';
        }
        return (
            <div className="loan-page loan-second">
                <Logo></Logo>
                <H4Title text="借款申请表"></H4Title>

                <div className="section-one">
                    <h5>3/4联系人信息</h5>

                    <p style={styleTitleP}>{familyShowName.slice(0, 5)}</p>
                    <TextInput type="text"
                               text="真实姓名"
                               className="input-no-icon"

                               validate={{require: '该项为必填项'}}
                               ref="contact_name1"
                               name="name"
                               data-name="contact_name1"
                               defaultValue={AppData.loan.contact_name1}
                               placeholder="请填写真实姓名"

                        ></TextInput>
                    <TextSelect type="select"
                                text="关系"
                                validate={{require: '请选择关系'}}
                                ref="relation1"
                                name="relation"
                                data-name="relation1"
                                defaultValue={AppData.loan.relation1}
                                options={familyName}
                                className="select-center"
                        ></TextSelect>
                    <TextInput type="tel"
                               text="手机号"
                               validate={{phone: '请填写正确的手机号'}}
                               className="input-no-icon"
                               ref="contact_phone1"
                               name="phone"
                               data-name="contact_phone1"
                               defaultValue={AppData.loan.contact_phone1}
                               placeholder="请填写手机号"
                        ></TextInput>

                    <p style={styleTitleP}>{workShowName.slice(0, 5)}</p>
                    <TextInput type="text"
                               text="真实姓名"
                               validate={{require: '该项为必填项'}}
                               ref="contact_name2"
                               className="input-no-icon"
                               name="name"
                               data-name="contact_name2"
                               defaultValue={AppData.loan.contact_name2}
                               placeholder="请填写真实姓名"
                        ></TextInput>
                    <TextSelect type="select"
                                text="关系"
                                validate={{require: '请选择关系'}}
                                ref="relation2"
                                name="relation"
                                data-name="relation2"
                                defaultValue={AppData.loan.relation2}
                                className="select-center"
                                options={workName}
                        ></TextSelect>
                    <TextInput type="tel"
                               text="手机号"
                               validate={{phone: '请填写正确的手机号'}}
                               ref="contact_phone2"
                               className="input-no-icon"

                               name="phone"
                               data-name="contact_phone2"
                               defaultValue={AppData.loan.contact_phone2}
                               placeholder="请填写手机号"
                        ></TextInput>

                    <p style={styleTitleP}>{otherShowName.slice(0, 5)}</p>
                    <TextInput type="text"
                               text="真实姓名"
                               validate={{require: '该项为必填项'}}
                               ref="contact_name3"
                               className="input-no-icon"

                               name="name"
                               data-name="contact_name3"
                               defaultValue={AppData.loan.contact_name3}
                               placeholder="请填写真实姓名"
                        ></TextInput>
                    <TextSelect type="select"
                                text="关系"
                                validate={{require: '请选择关系'}}
                                ref="relation3"
                                name="relation"
                                data-name="relation3"
                                defaultValue={AppData.loan.relation3}
                                className="select-center"
                                options={otherName}
                        ></TextSelect>
                    <TextInput type="tel"
                               text="手机号"
                               validate={{phone: '请填写正确的手机号'}}
                               ref="contact_phone3"
                               name="phone"
                               className="input-no-icon"
                               data-name="contact_phone3"
                               defaultValue={AppData.loan.contact_phone3}
                               placeholder="请填写手机号"
                        ></TextInput>


                </div>
                <div className="section-two">
                    <div className="agreeDiv">
                        <Agree
                            style={{width: '90%', margin: 'auto'}}
                            validate={{checked: '请勾选协议'}}
                            ref="agree"
                            text="《借款需求登记与信用审核服务协议》"
                            data-name="agree"
                            value={AppData.loan.agree}
                            ></Agree>
                    </div>
                </div>
                <div className="width90">
                    <ErrorMessage>{this.state.errorMessage}</ErrorMessage>
                </div>
                <Link to={{pathname: 'loan'}} className="button-link-big grey-button">
                    <Button text="上一步"
                            material-button
                            tracking
                        ></Button>
                </Link>
                <Link to={{pathname: 'loanOver'}} className={btnClass}>
                    <Button style={{backgroundColor: '#f53053'}}
                            text={this.state.text}
                            material-button
                            tracking
                        ></Button>
                </Link>
                <Customer></Customer>
            </div>
        );
    }
});
module.exports = LoanSecondLayout;





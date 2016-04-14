/**
 * @file
 * @auther Created by malin on 16/1/7.
 */
import React from 'react';
import AppData from './../component/appData';
import animateEnd from '../component/animateEnd';
import Button from '../component/button';
import ErrorMessage from '../component/errorMessage';
import message from '../messageConfig';
import InputFull from '../form/inputFull';
import Tracking from '../lib/tracking';
import Termite from './termite';

var identification = '';

class LoanOverTaobao extends React.Component {
    static propTypes = {
        tbData: React.PropTypes.array
    };
    static defaultProps = {
        tbData: []
    };

    state = {
        accountText: '导入',
        checkCodeText: '提交验证码',
        password2Text: '提交短信验证码',
        progressText: '分析中...',
        imgSrc: '',
        accountShow: false,
        SelectPhone: false,
        loadingShow: false,
        checkcodeShow: false,
        password2Show: false,
        errorMessage: '',
        errorMessageModel: false,
        errorMessageText: '',
        sendData: '',
        currentIdx: 0,
        top: 0,
        successHolder: '',
        disabledArr: [],
        phone: []
    };

    componentDidMount() {
        let self = this;
        Termite.identification((json) => {
            identification = json.identification;
            this.setState({
                accountShow: true
            });
        });
        $('.errorMessageModel').animateEnd(function () {
            self.setState({
                errorMessageModel: false,
                top: 0
            });
        });
        $('form').submit(function (e) {
            e.preventDefault();
        });
    }

    componentDidUpdate() {
        let self = this;
        let disabledArr = self.state.disabledArr;
        let finishLength = disabledArr.length;
        if (finishLength) {
            disabledArr.forEach(function (index) {
                let tbAccount = $('.over-tbAccount').eq(index);
                tbAccount.find('input').prop('disabled', true);
                tbAccount.find('.button').text('分析成功');
                tbAccount.find('input[type="text"]').attr('placeholder', self.state.successHolder);
                tbAccount.find('input[type="password"]').attr('placeholder', '**********');
                tbAccount.find('.button').prop('disabled', true);
                tbAccount.find('.button').css('background', '#ccc !important');
            });
            if (this.props.tbData.length === finishLength) {   //全部分析完成
                setTimeout(() => {
                    location.reload();
                }, 2000);

            }
        }
        if (this.state.top !== 0) {
            $(window).scrollTop(self.state.top - 222, 5000);
        }
    };

    validate = () => {
        let input = $('.over-tbAccount input');
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
    };

    init = (self) => {
        self.id = '';
        self.setState({
            imgSrc: '',
            CheckcodeShow: false,
            Password2Show: false,
            SelectPhone: false,
            AccountShow: false,
            LoadingShow: true,
            progressText: ''
        });
    };

    login = (index) => {
        let self = this;
        return (event) => {
            let platform = this.props.tbData[index].platform;
            let tmpl = 'mobile_taobao_shop';
            if (platform === 'TMALL') {
                tmpl = 'mobile_tmall_shop';
            }
            if (platform === 'JINGDONG') {
                tmpl = 'jd_shop';
            }
            let father = $('.over-tbAccount').eq(index);
            if (father.find('input').prop('disabled') === true) {
                return false;
            }
            let top = father.offset().top;
            let inputArr = father.find('input');
            let errNum = 0;
            inputArr.each(function () {
                if ($(this).val() === '') {
                    errNum += 1;
                }
            });
            if (errNum) {
                this.setState({
                    errorMessageModel: true,
                    errorMessageText: '请填写完整信息',
                    errorMessage: '请填写完整信息',
                    currentIdx: index,
                    top: top
                });

                return false;
            } else {
                this.setState({
                    errorMessageModel: false,
                    top: top,
                    currentIdx: index

                });
            }
            let o = {};
            inputArr.each(function () {
                o[$(this).attr('name')] = $(this).val();
            });
            o.platform = platform;
            this.password = o.password;
            this.username = o.username;
            this.init(self);
            this.setState({
                sendData: o,
                div: father
            });
            Termite.fetch({tmpl: tmpl, userid: identification}, this);
            event.preventDefault();
        };
    };

    selectPhoneFn = (e) => {
        let self = this,
            value = e.target.value;
        if (value) {
            self.setState({
                SelectPhone: false
            });
            self.fetch({
                id: self.id,
                phone: value
            }, self);
        }

    };

    sendCheckCode = (e) => {
        let randcode = $('#checkCode').val();
        if (randcode === '') {
            return;
        }
        Termite.fetch({
            id: this.id,
            randcode: randcode
        }, this);
        e.preventDefault();
    };

    sendPassword2 = (e) => {
        let password2 = $('#password2').val();
        if (password2 === '') {
            return;
        }
        Termite.fetch({
            id: this.id,
            password2: password2
        }, this);
        e.preventDefault();
    };
    renderAccountPassword = () => {
        let self = this;
        let eleData = this.props.tbData || [];
        return eleData.map(function (arr, index) {
            let iconClass = 'tb-icon-title';
            let mainClass = 'over-tbAccount';
            let loginPlaceHolder = '手机号/淘宝会员名';
            if (arr.platform === 'TMALL') {
                iconClass = 'tmall-icon-title';
                mainClass = mainClass + ' over-tmallAccount';
            }
            if (arr.platform === 'JINGDONG') {
                iconClass = 'jingdong-icon-title';
                mainClass = mainClass + ' over-tmallAccount';
                loginPlaceHolder = '邮箱/用户名/已验证手机';
            }
            return <div key={index} className={mainClass}>
                <div>
                    <div className={iconClass}></div>
                    <p>账号{index + 1}:</p>

                    <p className="account">{arr.account}</p>
                </div>
                <InputFull
                    text=""
                    type="text"
                    className="input-account-tb"
                    width="100%"
                    name="username"
                    validate={{require: '该项为必填项'}}
                    placeholder={loginPlaceHolder}
                ></InputFull>
                <InputFull
                    text=""
                    type="password"
                    className="input-password-tb"
                    width="100%"
                    name="password"
                    placeholder="密码"
                    validate={{require: '该项为必填项'}}
                ></InputFull>
                <InputFull
                    text=""
                    type="hidden"
                    className="input-no-margin"
                    class="no-margin"
                    width="100%"
                    name="platform"
                    unchangeableValue={arr.platform}
                ></InputFull>
                <InputFull
                    text=""
                    type="hidden"
                    className="input-no-margin"
                    class="no-margin"
                    width="100%"
                    name="id"
                    unchangeableValue={arr.account}
                ></InputFull>
                <ErrorMessage
                    className="err-for-jq">{index === self.state.currentIdx ? self.state.errorMessage : ''}</ErrorMessage>

                <div onClick={self.login(index)}>
                    <Button style={{borderRadius: 0, marginBottom: '20px'}}
                            text="登录"
                            tracking
                    ></Button>
                </div>
            </div>;
        });
    };
    renderSelectPhone = () => {

        let styleSelectPhone = {
            width: '280px',
            margin: 'auto',
            display: 'block'
        };
        let style = {
            width: '100%'
        };
        let phone = this.state.phone;
        phone.unshift('请选择接收短信的电话号码');
        let option = phone.map(function (val, index) {
            return <option key={index} value={val}>{val}</option>;
        });
        return <div className="select-phone" ref="tb" style={styleSelectPhone}>
            <div className="relative">
                <select style={style} onChange={this.selectPhoneFn}>
                    {option}
                </select>
            </div>
        </div>;


    };
    renderPassword2 = () => {

        let stylePassword2 = {
            width: '80%',
            margin: 'auto',
            display: 'block'
        };
        return <div className="password2" ref="tb" style={stylePassword2}>
            <div className="relative">
                <InputFull
                    text=""
                    type="password"
                    width="100%"
                    name="account"
                    className="input-password"

                    id="password2"
                    ref="password2"
                    data-name="password2"
                    placeholder="短信验证码"
                    validate={{require: '请输入短信验证码'}}>
                </InputFull>
            </div>
            <div className="button-link-big" onClick={this.sendPassword2}>
                <Button text={this.state.password2Text}></Button>
            </div>
        </div>;


    };

    renderVerifyCode = () => {
        let styleCheckcode = {
            width: '80%',
            margin: 'auto',
            display: 'block'
        };
        let styleImage = {
            display: 'block',
            margin: '0 auto',
            marginBottom: '20px'
        };
        return <div className="checkCode" ref="cb" style={styleCheckcode}>
            <div className="relative">
                <img id="random-code-image" src={this.state.imgSrc} style={styleImage}/>
                <InputFull
                    text=""
                    type="text"
                    width="100%"
                    name="checkCode"
                    className="input-yan"
                    ref="checkCode"
                    data-name="checkCode"
                    placeholder="请输入您的验证码"
                    id="checkCode"
                    validate={{require: '请输入验证码'}}>
                </InputFull>
            </div>
            <div className="button-link-big" onClick={this.sendCheckCode}>
                <Button material-button text={this.state.checkCodeText} style={{background: '#2484DF'}}></Button>
            </div>
        </div>;
    };

    renderLoading = () => {
        let styleLoading = {
            width: '80%',
            margin: '10%',
            display: 'block'
        };
        let styleProgress = {
            textAlign: 'center'
        };
        let styleImage = {
            display: 'block',
            margin: '0 auto',
            marginBottom: '20px'
        };
        return <div style={styleLoading}>
            <img src="https://shangdai.yixin.com/imgs/estimate-loading.gif" style={styleImage}/>
            <br />
            <br />

            <div style={styleProgress}>{this.state.progressText}</div>
            <br />
            <br />
        </div>;
    };

    render() {
        let style = '';
        if (this.state.errorMessageModel) {
            style = {
                display: 'block'
            };
        } else {
            style = {
                display: 'none'
            };

        }
        return (
            <div className="fullpageHeight">
                <h2 className="h2-title">数据分析</h2>

                <p className="center-text" style={{width: '280px', margin: '0 auto 10px', color: '#c40000'}}>
                    「为提供更准确的授信额度，请登录以下账号，我们会对您的店铺数据进行在线分析」</p>
                { this.state.accountShow ? this.renderAccountPassword() : <div></div> }
                { this.state.selectPhoneShow ? this.renderSelectPhone() : <div></div> }
                { this.state.password2Show ? this.renderPassword2() : <div></div> }
                { this.state.checkcodeShow ? this.renderVerifyCode() : <div></div> }
                { this.state.loadingShow ? this.renderLoading() : <div></div> }
                <div className="errorMessageModel" style={style}>{this.state.errorMessageText}</div>
            </div>
        );
    }
}
export default LoanOverTaobao;

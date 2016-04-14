/**
 * @file
 * @auther Created by malin on 16/1/7.
 */
import React from 'react';
import AppData from './../component/appData';
import animateEnd from '../component/animateEnd';
import Button from '../component/button';
import formCheck from '../form/formCheck';
import ErrorMessage from '../component/errorMessage';
import message from '../messageConfig';
import TextInput from '../form/textInput';
import InputFull from '../form/inputFull';
import Popup from '../modelComponent/popup';
import TermiteLoading from './termiteLoading';
import TermiteCancel from './termiteCancel';
import TermiteSelectPhone from './termiteSelectPhone';
import TermitePassword2 from './termitePassword2';
import TermiteVerifyCode from './termiteVerifyCode';
import Tracking from '../lib/tracking';
import Termite from './termite';


class NoDataTaobao extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        tbData: React.PropTypes.array,
        activity: React.PropTypes.string
    };
    static defaultProps = {
        tbData: [],
        activity: 'mgm-qr-mobile'
    };
    state = {
        accountText: '导入',
        imgSrc: '',
        selectPhoneShow: false,
        loadingShow: false,
        checkcodeShow: false,
        password2Show: false,
        cancelShow: false,
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
        $('form').submit(function (e) {
            e.preventDefault();
        });
        $.subscribe('cancelRequest', () => {
            this.setState({
                cancelShow: true,
                loadingShow: false
            });
        });
        $.subscribe('sureCancelRequest', () => {
            Termite.hide = true;
            Tracking.trackEvent('click', {
                'activity': 'mgm-qr-mobile',
                'lmt-track-id': message.tracking.individualCredit.creditcardCancelRequest
            });
        });
    }

    componentWillUpdate() {
        $('.errorMessageModel').animateEnd(() => {
            this.setState({
                errorMessageModel: false
            });
        });
    }

    init = (self) => {
        self.id = '';
        self.setState({
            imgSrc: '',
            CheckcodeShow: false,
            Password2Show: false,
            SelectPhone: false,
            LoadingShow: true,
            progressText: ''
        });
    };

    login = (e) => {
        let self = this;
        if (!formCheck(this)) {
            return false;
        }
        let platform = 'TAOBAO';
        let tmpl = 'mobile_taobao_shop';
        let inputArr = $('input');
        let o = {};
        inputArr.each(function () {
            o[$(this).attr('name')] = $(this).val();
        });
        o.platform = platform;
        this.password = o.password;
        this.username = o.username;
        this.init(self);
        this.setState({
            sendData: o
        });
        setTimeout(Termite.mgmStdSubmit(o, self), 2000);
        //Termite.fetch({tmpl: tmpl}, this, this.props.activity);
        e.preventDefault();
    };

    closeLoading = (e) => {
        this.setState({
            loadingShow: false,
            cancelShow: false
        });
        $.publish('sureCancelRequest');
        e.preventDefault();

    };

    closeCancel = (e) => {
        this.setState({
            cancelShow: false,
            loadingShow: true
        });
        e.preventDefault();
    };

    selectPhone = (e) => {
        let value = e.target.value;
        if (value) {
            this.setState({
                SelectPhone: false
            });
            Termite.fetch({
                id: self.id,
                phone: value
            }, this);
        }

    };

    sendCheckCode = (e) => {
        let checkcode = $('#checkCode').val();
        if (checkcode === '') {
            return;
        }
        Termite.fetch({
            id: this.id,
            randcode: checkcode
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
        return <div className="like-taobao">
            <div className="like-taobao-logo"></div>
            <div className="like-taobao-form">
                <TextInput
                    text="账户"
                    type="text"
                    class="like-taobao-div"
                    className="like-taobao-account-input"
                    width="100%"
                    name="username"
                    ref="username"
                    data-name="username"
                    validate={{require: '该项为必填项'}}
                    placeholder="手机号/淘宝会员名"
                ></TextInput>
                <TextInput
                    text="登录密码"
                    type="password"
                    class="like-taobao-div"
                    className="like-taobao-password-input"
                    width="100%"
                    name="password"
                    ref="password"
                    data-name="password"
                    placeholder="密码"
                    validate={{require: '该项为必填项'}}
                ></TextInput>
            </div>
            <div onClick={this.login} className="like-taobao-button">
                <Button text="登录" tracking={{
                    'activity': 'mgm-qr-mobile',
                    'lmt-track-id': '登录'
                }}>
                    }</Button>
            </div>
            <p className="center-text f12" style={{opacity: '0.4'}}>请先完成淘宝账号验证</p>
        </div>;
    };

    renderSelectPhone = () => {
        return <div>
            <Popup width="80%" show={this.state.selectPhoneShow}>
                <TermiteSelectPhone class="_mgm-termite-selectphone"
                                    selectPhoneFn={this.selectPhone}></TermiteSelectPhone>
            </Popup>
        </div>;
    };

    renderPassword2 = () => {
        return <div>
            <Popup width="80%" show={this.state.password2Show}>
                <TermitePassword2 class="_mgm-termite-password2" sendPassword2={this.sendPassword2}></TermitePassword2>
            </Popup>
        </div>;
    };

    renderVerifyCode = () => {
        return <div>
            <Popup width="80%" show={this.state.checkcodeShow}>
                <TermiteVerifyCode>
                    <div className="width80">
                        <p className="_mgm-verifycode-title">请输入图片验证码</p>
                        <div className="relative">
                            <img id="random-code-image" className="random-verifycode-image" src={this.state.imgSrc}/>
                            <InputFull
                                text=""
                                type="text"
                                width="100%"
                                name="checkCode"
                                className="input-yan _mgm-termite-input"
                                ref="checkCode"
                                data-name="checkCode"
                                placeholder="请输入图片验证码"
                                id="checkCode"
                                validate={{require: '请输入图片验证码'}}>
                            </InputFull>
                        </div>
                        <div className="button-link-full _mgm-termite-button" onClick={this.sendCheckCode}>
                            <Button material-button text="确&nbsp;&nbsp;&nbsp;&nbsp;认"
                                    style={{background: '#2484DF'}}></Button>
                        </div>
                    </div>
                </TermiteVerifyCode>
            </Popup>
        </div>;
    };

    renderLoading = () => {
        return <div>
            <Popup width="80%" mgmCancel show={this.state.loadingShow}>
                <TermiteLoading>
                    <p className="_mgm-loading-title">正在验证中</p>
                    <div className="_mgm-loading-main">
                        <img className="_mgm-loading-people" width="92" height="129"
                             src="http://static.yixin.com/file/T1CFVTBKDe1RCvBVdK_LIo.gif" alt=""/>
                        <div className="_mgm-loading-money rotate"></div>
                    </div>
                </TermiteLoading>
            </Popup>
        </div>;
    };

    renderCancel = () => {
        return <div>
            <Popup width="80%" show={this.state.cancelShow}>
                <TermiteCancel>
                    <div className="width80 cancel-popup-mgm">
                        <p className="_mgm-loading-title">关闭等待页面</p>
                        <span className="_mgm-loading-sub-title">你确定要放弃iPhone6s？</span>
                        <div className="_mgm-loading-cancel-text-link" onClick={this.closeLoading}>
                            <Button text="放弃6s" tracking={{
                            'activity': 'mgm-qr-mobile',
                            'lmt-track-id': 'pop-sure-close'
                        }}></Button>
                        </div>
                        <div className="button-link-full _mgm-termite-button" onClick={this.closeCancel}>
                            <Button text="我要6s" material-button tracking={{
                            'activity': 'mgm-qr-mobile',
                            'lmt-track-id': 'pop-sure-no-close'
                        }}></Button>
                        </div>
                    </div>
                </TermiteCancel>
            </Popup>
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
                {this.renderAccountPassword()}
                { this.state.selectPhoneShow ? this.renderSelectPhone() : <div></div> }
                { this.state.password2Show ? this.renderPassword2() : <div></div> }
                { this.state.checkcodeShow ? this.renderVerifyCode() : <div></div> }
                { this.state.loadingShow ? this.renderLoading() : <div></div> }
                { this.state.cancelShow ? this.renderCancel() : <div></div> }
                <div className="errorMessageModel" style={style}>{this.state.errorMessageText}</div>
            </div>
        );
    }
}
export default NoDataTaobao;

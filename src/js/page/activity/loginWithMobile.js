/**
 * 抽奖页面
 * @file
 * @auther Created by malin on 16/1/5.
 */
import React from 'react';
import {Link} from 'react-router';
import InputFullCode from '../../form/inputFullCode';
import InputFull from '../../form/inputFull';
import formCheck from '../../form/formCheck';
import mobileCheck from '../../form/mobileCheck';
import ErrorMessage from '../../component/errorMessage';
import Logo from '../../component/logo';
import Popup from '../../modelComponent/popup';
import Button from '../../component/button';
import Tracking from '../../lib/tracking';
import Customer from '../../component/customer';
import Css3Loading from '../../modelComponent/css3loading';
import Activity from '../../activityConfig';

var codeInterval = 0;
var className, activity, buttonTrack, buttonText, authCodeApi, loginApi,
    section1, section2, section3, section4, tips, init;


let hash = window.location.hash;
let arr = hash.split('/');
let query = arr.length && arr[arr.length - 1].split('?')[0];
if (!(query in Activity)) {
    query = 'default';
}

class LoginWithMobile extends React.Component {
    static displayName = query ? Activity[query].displayName : Activity['default'].displayName;

    //此部分相当于WillMount
    constructor(props) {
        super(props);
        //Activity[path] && Activity[path]['displayName']
        let {path} = this.props.params;
        //非配置的活动页 跳转至首页
        if (!Activity[path]) {
            window.location.href = window.location.pathname + window.location.search;
        } else {
            className = path;
            activity = Activity[path].activity;
            buttonTrack = Activity[path].track;
            buttonText = Activity[path].buttonText;
            authCodeApi = Activity[path].authCodeApi;
            loginApi = Activity[path].loginApi;
            tips = Activity[path].tips;
            init = Activity[path].init;
            if (typeof init === 'function') {
                init(this);
            }
            this.callback = Activity[path].callback;
            this.errCallback = Activity[path].errCallback;
        }
    };

    state = {
        num: 0,
        loading: true,
        loadingShow: false,
        processingCode: false,
        buttonText: this.props.buttonText,
        authCodeText: this.props.authCodeText,
        errorMessage: '',
        popupText: ''
    };

    static defaultProps = Activity['default'];

    componentDidMount() {
        let activity = Activity[this.props.params && this.props.params.path];
        Tracking.trackEvent('pageload', {
            activity: activity.activity,
            page: `/m#/activity/code/${this.props.params.path}-m`
        });
        this.setState({
            num: 0,
            loading: false,
            processingCode: false,
            buttonText: activity.buttonText || this.props.buttonText,
            authCodeText: activity.authCodeText || this.props.authCodeText,
            placeholder1: activity.placeholder1 || this.props.placeholder1,
            placeholder2: activity.placeholder2 || this.props.placeholder2,
            errorMessage: ''
        });
    };

    componentDidUpdate() {
        if (!this.state.loading) {
            this.getDomEle();

        }
    };

    getCode = () => {
        let self = this;
        if (this.state.processingCode) {
            return;
        }
        if (!mobileCheck(self, 'mobile')) {
            return;
        }
        $.ajax({
            'url': authCodeApi + '/' + $('#mobile').val() + '?_=' + (new Date).getTime(),
            'type': 'post',
            beforeSend() {
                self.setState({errorMessage: '', loadingShow: false});
                Tracking.trackEvent('click', {
                    'activity': activity,
                    'lmt-track-id': 'get-authCode'
                });
            },
            success: (json) => {
                if (json.result !== 'success') {
                    if (codeInterval) {
                        clearInterval(codeInterval);
                        codeInterval = null;
                        this.setState({num: '', processingCode: false});
                    }
                    $('#authCode').next().html(json.message);
                } else {
                    $('#authCode').next().html('验证码发送成功');
                    Tracking.trackEvent('click', {
                        'activity': activity,
                        'lmt-track-id': 'get-authCode-success'
                    });
                }
            },
            error: () => {
                this.setState({
                    errorMessage: '请检查您的网络或稍后再试'
                });
            }
        });
        self.setState({num: 60, processingCode: true});

        let timer = () => {
            this.setState({num: this.state.num - 1});
            if (this.state.num === 0) {
                clearInterval(codeInterval);
                codeInterval = null;
                this.setState({num: '', processingCode: false});
            }
        };
        codeInterval = setInterval(timer, 1000);
    };

    submit = (e) => {
        if (this._toForm()) {
            let self = this;
            if (this.state.buttonText === '提交中') {
                this.setState({
                    loadingShow: true,
                    num: ''
                });
                clearInterval(codeInterval);
                return;
            }
            $.ajax({
                'url': loginApi,
                'type': 'post',
                'contentType': 'application/json',
                'data': JSON.stringify({
                    mobile: $('#mobile').val(),
                    authCode: $('#authCode').val()
                }),
                beforeSend() {
                    self.setState({buttonText: '提交中', loadingShow: true, errorMessage: ''});
                    $('#authCode').next().html('');
                    if (codeInterval) {
                        clearInterval(codeInterval);
                        codeInterval = null;
                        self.setState({num: '', processingCode: false});
                    }
                },
                success(json) {
                    if (typeof json === 'string') {
                        json = JSON.parse(json);
                    }
                    if (json.result === 'success') {
                        if (self.callback) {
                            self.callback(self);
                        } else {
                            self.setState({buttonText: buttonText, errorMessage: json.message, loadingShow: false});
                        }
                    } else {
                        if (typeof json === 'string') {
                            json = JSON.parse(json);
                        }
                        if (self.errCallback) {
                            self.errCallback(self, json);
                        } else {
                            self.setState({buttonText: buttonText, errorMessage: json.message, loadingShow: false});
                        }
                    }
                },
                error() {
                    self.setState({
                        buttonText: buttonText,
                        errorMessage: '请检查您的网络或稍后再试'
                    });
                }
            });
        }
        e.preventDefault();
    };

    _toForm() {
        return formCheck(this);
    };

    getDomEle() {
        let {path} = this.props.params;
        for (let i = 1; i < 5; i++) {
            $(`#section-${i}`).html(Activity[path]['section' + i]);
        }
        if (path === 'zhiwang') {
            $('#ydwy').html(this.props.location.query.money);
        }
    };

    mgmPopup() {
        return (
            <div className="_mgm">
                <p className="_mgm-loading-title">正在验证中</p>
                <span className="_mgm-loading-sub-title">请耐心等待...</span>
                <div className="_mgm-loading-main">
                    <img className="_mgm-loading-people" width="92" height="129"
                         src="http://static.yixin.com/file/T1CFVTBKDe1RCvBVdK_LIo.gif" alt=""/>
                    <div className="_mgm-loading-money rotate"></div>
                </div>
            </div>
        );
    };

    mgmcloseCallback = () => {
        this.setState({
            num: '',
            buttonText: buttonText,
            loadingShow: false
        });
    };

    zhiwangPopup() {
        return (
            <div className="code-zhiwang-popup">
                <p className="code-zhiwang-popup-title">{this.state.popupText}</p>
                <Link to={{pathname: 'bonus-list/unuse'}}>
                    <div className="code-zhiwang-popup-button">
                        <Button material-button
                                text='查看免息卡'
                                tracking={{
                                            'activity': activity,
                                            'lmt-track-id': 'to-bonus'
                                        }}>
                        </Button>
                    </div>
                </Link>
                <span className="code-zhiwang-popup-more">了解更多,请关注"宜信商通贷"官方微信</span>
            </div>
        );
    };

    zhiwangcloseCallback = () => {
        this.setState({
            num: '',
            buttonText: buttonText,
            loadingShow: false
        });
    };

    render() {
        if (this.state.loading) {
            return <Css3Loading loading={this.state.loading}></Css3Loading>;
        }
        let activityClass = 'code-' + className;
        return (
            <div>
                <Logo></Logo>
                <div className={activityClass}>
                    <div className="section-1-outer">
                        <div className="section-1" id="section-1">
                        </div>
                    </div>
                    <div className="section-2" id="section-2"></div>
                    <div className="regist">
                        <InputFull
                            id="mobile"
                            text=""
                            type="text"
                            width="100%"
                            name="mobile"
                            className="input-mobile"
                            ref="mobile"
                            data-name="mobile"
                            placeholder="请输入您的手机号"
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
                            placeholder="短信验证码"
                            onClick={this.getCode}
                            num={this.state.num}
                            validate={{require: '该项为必填项'}}
                        ></InputFullCode>

                        <ErrorMessage className="white-span">{this.state.errorMessage}</ErrorMessage>

                        <div onClick={this.submit} className="button-link-full">
                            <div className="toapply-button">
                                <Button
                                    text={this.state.buttonText}
                                    material-button
                                    tracking={{
                                        'activity': activity,
                                        'lmt-track-id': buttonTrack
                                    }}
                                ></Button>
                            </div>
                        </div>
                        <div className="tips">{tips}</div>
                    </div>
                    <div className="section-3" id="section-3"></div>
                    <div className="section-4" id="section-4"></div>
                    {
                        this[`${className}Popup`] ?
                            <Popup width="80%"
                                   close
                                   callback={this[`${className}closeCallback`]}
                                   show={this.state.loadingShow}>{this[`${className}Popup`]()}</Popup> : null
                    }
                </div>
                <Customer></Customer>
            </div>
        );
    }
}
export default LoginWithMobile;

/**
 * @file
 * @auther Created by malin on 16/1/9.
 */
import React from 'react';
import InputFull from '../form/inputFull';
import Button from '../component/button';
import message from '../messageConfig';
class TermiteVerifyCode extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        imgSrc: React.PropTypes.string,
        sendCheckCode: React.PropTypes.func,
        class: React.PropTypes.string
    };
    static defaultProps = {
        imgSrc: '',
        sendCheckCode: message.global.errorMessage.errorFunction,
        class: 'termite-checkCode'
    };
    state = {
        imgSrc: this.props.imgSrc
    };

    defaultDiv = () => {
        return <div className={this.props.class} ref="cb">
            <div className="relative">
                <p className="termite-title">请输入图片验证码</p>
                <img id="random-code-image" src={this.state.imgSrc}/>
                <InputFull
                    text=""
                    type="text"
                    width="100%"
                    name="checkCode"
                    className="input-yan"
                    ref="checkCode"
                    data-name="checkCode"
                    placeholder="请输入图片验证码"
                    id="checkCode"
                    validate={{require: '请输入图片验证码'}}>
                </InputFull>
            </div>
            <div className="button-link-full" onClick={this.props.sendCheckCode}>
                <Button material-button text="确&nbsp;&nbsp;&nbsp;&nbsp;认"
                        style={{background: '#2484DF'}}></Button>
            </div>
        </div>;
    };

    render() {
        return (
            <div>
                {
                    this.props.children || this.defaultDiv()
                }
            </div>
        );
    }
}
export default TermiteVerifyCode;

/**
 * @file
 * @auther Created by malin on 16/1/9.
 */
import React from 'react';
import InputFull from '../form/inputFull';
import Button from '../component/button';
import message from '../messageConfig';
class TermitePassword2 extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        sendPassword2: React.PropTypes.func,
        class: React.PropTypes.string
    };
    static defaultProps = {
        sendPassword2: message.global.errorMessage.errorFunction,
        class: 'termite-password2'
    };
    state = {
        phone: this.props.phone
    };
    defaultDiv = () => {
        return <div className={this.props.class} ref="tb">
            <div className="relative">
                <p className="termite-title">
                    请输入短信验证码
                </p>
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
            <div className="button-link-full" onClick={this.props.sendPassword2}>
                <Button material-button text="确&nbsp;&nbsp;&nbsp;&nbsp;认"></Button>
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
export default TermitePassword2;

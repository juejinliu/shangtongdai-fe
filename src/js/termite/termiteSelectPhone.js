/**
 * @file
 * @auther Created by malin on 16/1/9.
 */
import React from 'react';
import message from '../messageConfig';
class TermiteLoading extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        phone: React.PropTypes.array,
        selectPhone: React.PropTypes.func,
        class: React.PropTypes.string

    };
    static defaultProps = {
        phone: [],
        selectPhone: message.global.errorMessage.errorFunction,
        class: 'termite-select-phone'

    };
    state = {
        phone: this.props.phone
    };

    defaultDiv = () => {
        let phone = this.state.phone;
        phone.unshift('请选择接收短信的电话号码');
        let option = phone.map(function (val, index) {
            return <option key={index} value={val}>{val}</option>;
        });
        return <div className={this.props.class} ref="tb">
            <div className="relative select-f">
                <p className="termite-title">
                    请选择电话
                </p>
                <select onChange={this.props.selectPhone}>
                    {option}
                </select>
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
export default TermiteLoading;

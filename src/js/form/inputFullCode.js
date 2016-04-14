/**
 * Created by malin on 15/5/20.
 */
var React = require('react'),
    LabelInput = require('./labelInput');

let TextInput = React.createClass({
    render: function () {
        var styleDiv = {
            width: '100%',
            marginBottom: '14px',
            overflow: 'hidden'
        };
        return (
            <div className={this.props.class ? this.props.class : 'input-container'} style={styleDiv}>
                <LabelInput
                    type = {this.props.type}
                    value={this.props.value}
                    width={this.props.width}
                    className={this.props.className}
                    name={this.props.name}
                    ref="validate"
                    data-name={this.props['data-name']}
                    id={this.props.id}
                    validate={this.props.validate}
                    placeholder={this.props.placeholder}
                ></LabelInput>
                <div className="code" onClick={this.props.onClick}>
                    {
                        this.props.num ? '再次获取'+this.props.num: '获取验证码'
                    }
                </div>
            </div>
        );
    }
});
module.exports = TextInput;

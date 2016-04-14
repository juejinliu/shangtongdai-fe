/**
 * Created by malin on 15/5/20.
 */
var React = require('react'),
    LabelInput = require('./labelInput'),
    LabelInputText = require('./labelInputText');

let TextInput = React.createClass({
    render() {
        let styleDiv = {
            width: '100%',
            marginBottom: '10px',
            overflow: 'hidden'
        };
        return (
            <div className={this.props.class} style={styleDiv}>
                <LabelInputText text={this.props.text} ></LabelInputText>
                <LabelInput
                    type = {this.props.type}
                    defaultValue={this.props.defaultValue}
                    name={this.props.name}
                    className={this.props.className}
                    ref="validate"
                    data-name={this.props['data-name']}
                    id={this.props.id}
                    validate={this.props.validate}
                    placeholder={this.props.placeholder}
                ></LabelInput>
            </div>
        );
    }
});
module.exports = TextInput;

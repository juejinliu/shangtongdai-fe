/**
 * Created by malin on 15/5/20.
 */
var React = require('react'),
    LabelInput = require('./labelInput');

let InputFull = React.createClass({
    getDefaultProps() {
        return {
            'type': '',
            'width': '',
            'className': '',
            'name': '',
            'ref': 'validate',
            'data-name': '',
            'id': '',
            'defaultValue': '',
            'placeholder': '',
            'validate': {},
            'unchangeableValue': null
        };
    },

    render() {
        var styleDiv = {
            width: '100%',
            marginBottom: '14px',
            overflow: 'hidden'
        };

        return (
            <div className={this.props.class ? this.props.class : 'input-container'} style={styleDiv}>
                <LabelInput
                    type={this.props.type}
                    width={this.props.width}
                    className={this.props.className}
                    name={this.props.name}
                    ref="validate"
                    data-name={this.props['data-name']}
                    id={this.props.id}
                    validate={this.props.validate}
                    unchangeableValue={this.props.unchangeableValue}
                    defaultValue={this.props.defaultValue}
                    placeholder={this.props.placeholder}
                    ></LabelInput>
            </div>
        );
    }
});
module.exports = InputFull;

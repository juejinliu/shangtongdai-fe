/**
 * Created by malin on 15/5/20.
 */
var React = require('react'),
    LabelInput = require('./labelInput'),
    Select= require('./select'),
    LabelInputText = require('./labelInputText');

let TextSelect = React.createClass({
    render: function () {
        let styleDiv = {
            width: '100%',
            marginBottom: '10px',
            overflow: 'hidden'

        };
        return (
            <div className={this.props.className} style={styleDiv}>
                <LabelInputText text={this.props.text} ></LabelInputText>
                <Select
                    className={this.props.className}
                    defaultValue={this.props.defaultValue}
                    name={this.props.name}
                    data-name={this.props['data-name']}
                    ref="validate"
                    options={this.props.options}
                    validate={this.props.validate}
                    toggle={this.props.toggle}></Select>
            </div>
        );
    }
});
module.exports = TextSelect;

/**
 * Created by malin on 15/5/20.
 */
var React = require('react'),
    LabelInput = require('./labelInput'),
    LabelInputText = require('./labelInputText');

let TextInputText = React.createClass({
    render: function () {
        let styleDiv = {
            width: '100%',
            marginBottom: '10px',
            overflow: 'hidden'

        };
        let styleP = {
            fontSize: '13px',
            paddingRight: '3%',
            marginTop: '10px',
            float: 'right'
        };
        return (
            <div className={this.props.class}  style={styleDiv}>
                <LabelInputText text={this.props.text} ></LabelInputText>
                <LabelInput
                    defaultValue={this.props.defaultValue}
                    name={this.props.name}
                    className={this.props.className}
                    data-name={this.props['data-name']}
                    width={this.props.width}
                    ref="validate"
                    placeholder={this.props.placeholder}
                    validate={this.props.validate}></LabelInput>
                <p style={styleP}>{this.props.after}</p>
            </div>
        );
    }
});
module.exports = TextInputText;

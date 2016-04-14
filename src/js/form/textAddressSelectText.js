/**
 * Created by malin on 15/5/20.
 */
var React = require('react'),
    LabelInputText = require('./labelInputText'),
    LabelInputAddressSelect = require('./labelInputAddressSelect');

let TextAddressSelectText = React.createClass({
    render() {
        var styleDiv = {
            width: '100%'

        };
        return (
            <div className={this.props.className} style={styleDiv}>
                <LabelInputText text={this.props.text} ></LabelInputText>
                <LabelInputAddressSelect
                    name={this.props.name}
                    data-name={this.props['data-name']}
                    ref="validate"
                    validate={this.props.validate}
                    value1={this.props.value1}
                    value2={this.props.value2}
                    value3={this.props.value3}
                ></LabelInputAddressSelect>
            </div>
        );
    }
});
module.exports = TextAddressSelectText;

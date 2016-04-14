/**
 * Created by malin on 15/5/20.
 */
var React = require('react'),
    LabelInputFile = require('./labelInputFile'),
    LabelInputText = require('./labelInputText');

let TextFile = React.createClass({
    render() {
        let styleDiv = {
            width: '100%',
            marginBottom: '10px',
            overflow: 'hidden'

        };
        return (
            <div className={this.props.class} style={styleDiv}>
                <LabelInputText text={this.props.text} ></LabelInputText>
                <LabelInputFile
                    defaultValue={this.props.defaultValue}
                    name={this.props.name}
                    data-name={this.props['data-name']}
                    placeholder={this.props.placeholder}
                    ref="validate"
                    validate={this.props.validate}
                ></LabelInputFile>
            </div>
        );
    }
});
module.exports = TextFile;

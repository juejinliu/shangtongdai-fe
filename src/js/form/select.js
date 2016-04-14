/**
 * Created by malin on 15/5/20.
 */
var React = require('react'),
    formValidator = require('./formValidator');
let LabelInputSelect = React.createClass({
    getInitialState: function () {
        return {
            error: ''
        };
    },

    getDefaultProps() {
        return {
            'name': '',
            'ref': '',
            'data-name': '',
            'validate': '',
            'toValidate': '',
            '_handleChange': '',
            'textIsShow': '',
            'onChange': '',
            'defaultValue': '',
            'options': []
        };
    },

    handleChange(event) {
        this.toValidate(event);
        this.props.toggle ? this.props.toggle(event) : '';
    },

    toValidate(event, value) {
        let self = this;
        let validate = this.props.validate;
        let hasError = 0;
        if (value) {
            validate = value;
        }
        for (let i of Object.keys(validate)) {
            if (formValidator[i](event.target ? event.target.value : event) === false) {
                self.setState({error: validate[i]});
                hasError += 1;
            } else {
                self.setState({error: ''});
            }
        }
        return hasError;
    },

    render() {
        let styleEm = {
            color: 'rgb(239, 120, 138)',
            fontSize: '12px',
            lineHeight: '2em',
            float: 'left',
            width: '100%'
        };
        let options = this.props.options;
        let selectNode = options.map(function (option) {
            return (
                <option value={option.id} key={option.id+2}>
                    {option.message}
                </option>
            );
        });
        return (
            <div className={this.props.className}>
                <select
                    defaultValue={this.props.defaultValue}
                    name={this.props.name}
                    ref="validate"
                    toValidate={this.toValidate}
                    validate={this.props.validate}
                    onChange={this.handleChange}
                    data-name={this.props['data-name']}
                    textIsShow="no"
                    _handleChange={this.props.toggle}
                    >
                    {selectNode}
                </select>
                <em style={styleEm}>{this.state.error}</em>

            </div>
        );
    }

});
module.exports = LabelInputSelect;

/**
 * Created by malin on 15/5/4.
 */
var React = require('react'),
    formValidator = require('./formValidator');


let LabelInput = React.createClass({
    getInitialState: function () {
        return {
            error: ''
        };
    },

    toValidate: function (event, value) {
        var self = this;
        var validate = this.props.validate;
        var hasError = 0;
        //将onChange改为onBlur后value为空时会默认传入react元素id
        if (value && value !== event._dispatchIDs) {
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
    render: function () {
        var width = this.props.width ?  this.props.width : '67%';
        var styleDiv = {
            float: 'left',
            width: width,
            overflow: 'hidden'
        };
        var styleInput = {
            padding: '2px 10px 2px 34px',
            letterSpacing: '1px',
            width: '100%',
            float: 'left',
            height: '36px',
            lineHeight: '36px',
            border: 'none',
            boxSizing: 'border-box',
            outline: 'none'
        };
        var styleEm = {
            color: 'rgb(239, 120, 138)',
            fontSize: '12px',
            lineHeight: '2em',
            float: 'left',
            width: '100%'
        };
        return (
            <div style={styleDiv} width={this.props.width} className={this.props.show}>
                <input ref="validate"
                    className={this.props.className}
                    toValidate={this.toValidate}
                    style={styleInput}
                    type={this.props.type}
                    id={this.props.id}
                    onBlur={this.toValidate}
                    validate={this.props.validate}
                    name={this.props.name}
                    data-name={this.props['data-name']}
                    placeholder={this.props.placeholder}
                    value={this.props.unchangeableValue}
                    defaultValue={this.props.defaultValue} />
                <em style={styleEm}>{this.state.error}</em>
            </div>
        );
    }
});
module.exports = LabelInput;

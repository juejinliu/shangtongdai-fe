/**
 * Created by malin on 15/5/22.
 */
var React = require('react'),
    Select = require('./select'),
    LabelInput = require('./labelInput'),
    LabelInputText = require('./labelInputText');

let TextSelect = React.createClass({
    getInitialState() {
        return {textIsShow: false};
    },

    _handleChange(event) {
        if (event.target.value === '55') {
            this.setState({textIsShow: true});
        } else {
            this.setState({textIsShow: false});

        }
    },

    componentDidMount(){
        setTimeout(() => {
            if ($('select[name="purpose_id"]').val() === '55') {
                this.setState({textIsShow: true});
            } else {
                this.setState({textIsShow: false});
            }
        },0);
    },

    render() {
        let styleDiv = {
            width: '100%',
            marginBottom: '10px',
            overflow: 'hidden'

        };
        let show = '';
        if (this.state.textIsShow) {
            show = 'show no-textAre';
        } else {
            show = 'hide no-textAre';
        }
        return (
            <div className={this.props.className} style={styleDiv}>
                <LabelInputText text={this.props.text} ></LabelInputText>
                <Select
                    className={this.props.className}
                    name={this.props.name}
                    data-name={this.props['data-name']}
                    ref="validate"
                    defaultValue={this.props.defaultValue}
                    options={this.props.options}
                    validate={this.props.validate}
                    toggle={this._handleChange}></Select>
                <LabelInput
                    name="purpose_text"
                    className="input-no-icon"
                    data-name={this.props['data-name2']}
                    defaultValue={this.props.defaultValue2}
                    ref="validateTwo"
                    show={show}
                    placeholder={this.props.placeholder}
                    validate={this.props.validateTwo}></LabelInput>
            </div>
        );
    }
});
module.exports = TextSelect;

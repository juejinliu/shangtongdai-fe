/**
 * Created by malin on 15/5/20.
 */
var React = require('react'),
    LabelInput = require('./labelInput');

let InputFullAuthImage = React.createClass({
    render: function () {
        var styleDiv = {
            width: '100%',
            marginBottom: '14px',
            overflow: 'hidden'
        };
        return (
            <div className={this.props.class} style={styleDiv}>
                <LabelInput
                    type = {this.props.type}
                    value={this.props.value}
                    width="60%"
                    className={this.props.className}
                    name={this.props.name}
                    ref="validate"
                    data-name={this.props['data-name']}
                    id={this.props.id}
                    validate={this.props.validate}
                    placeholder={this.props.placeholder}
                ></LabelInput>
                <div className="image-auth-code" style={{width: '40%'}}>
                    <img src={this.props.imageAuthCodeUrl} onClick={this.props.onImageCodeTouchEnd}/>
                </div>
            </div>
        );
    }
});
module.exports = InputFullAuthImage;

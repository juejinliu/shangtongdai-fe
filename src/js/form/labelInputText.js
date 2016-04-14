/**
 * Created by malin on 15/5/4.
 */
var React = require('react');
let LabelInputText = React.createClass({
    render() {
        var styleP = {
            width: '28%',
            paddingRight: '3%',
            marginTop: '10px',
            fontSize: '13px',
            float: 'left',
            textAlign: 'right',
            opacity: '0.7'
        };
        return (
            <p style={styleP}>
                {this.props.children}
                {this.props.text}
            </p>
        );
    }
});
module.exports = LabelInputText;
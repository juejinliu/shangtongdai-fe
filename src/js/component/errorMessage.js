/**
 * Created by malin on 15/6/4.
 */
var React = require('react');


let ErrorMessage = React.createClass({
    render() {
        let styleError = {
            width: '100%',
            margin: '0 auto 10px',
            color: 'rgb(239, 120, 138)',
            display: 'block',
            overflow: 'hidden'
        };
        return (
            <span className={this.props.className} style={styleError}>
                {this.props.children}
            </span>
        );
    }
});
module.exports = ErrorMessage;
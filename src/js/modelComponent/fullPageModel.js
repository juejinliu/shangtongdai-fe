/**
 * Created by malin on 15/6/5.
 */
var React = require('react');
let FullPageModel = React.createClass({

    render() {
        var ele = this.props.ele;
        var display = {};
        if (this.props.show) {
            display = {
                display: 'block'
            };
        } else {
            display = {
                display: 'none'
            };
        }
        return (
            <div style={display} onClick={this.props.onClick} className="full-page-model">
                {ele}
            </div>
        );
    }
});
module.exports = FullPageModel;
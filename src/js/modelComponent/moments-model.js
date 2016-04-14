/**
 * Created by malin on 15/6/5.
 */
var React = require('react');
let MomentModel = React.createClass({
    render: function () {
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
            <div style={display} onClick={this.props._onClick} className="share-model">
                <div className="share-model-jiantou"></div>
                <div className="share-model-text"></div>
            </div>
        );
    }
});
module.exports = MomentModel;
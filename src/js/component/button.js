/**
 * Created by malin on 15/5/7.
 */
var React = require('react'),
    $ = require('./../lib/zepto'),
    material = require('./material-x'),
    Tracking = require('./../lib/tracking'),
    mixinStyle = require('./style');


let Button = React.createClass({
    mixins: [mixinStyle],

    materialTracking(e) {
        if(this.props['material-button']) {
            material.button(e);
        }
        if(this.props['tracking']) {
            let tracking = this.props.tracking;
            if(tracking === true) {
                tracking = {};
            }
            var event = tracking.event ? tracking.event : 'click';
            tracking['lmt-track-id'] = tracking['lmt-track-id'] ? tracking['lmt-track-id'] : this.props.text;
            Tracking.trackEvent(event, tracking);
        }
    },

    render: function () {
        let defaultStyle = {height: '100%', width: '100%', display: 'block', overflow: 'hidden', position: 'relative'};
        let style = this.backgroundUrl(defaultStyle);
        return (
            <span style={style} onTouchStart={this.materialTracking} className="button">
                {this.props.text || this.props.children}
            </span>
        );
    }
});
module.exports = Button;
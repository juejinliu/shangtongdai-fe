/**
 * Created by malin on 15/6/5.
 */
var React = require('react'),
    Tracking = require('./../lib/tracking');
let Popup = React.createClass({
    componentWillReceiveProps(next) {
        this.setState({
            show: next.show,
            processing: next.processing,
            close: next.close,
            callback: next.callback

        });
    },

    getInitialState() {
        return {
            show: this.props.show,
            processing: this.props.processing,
            close: this.props.close,
            callback: this.props.callback
        };
    },

    closeModel(e) {
        this.setState({
            show: false
        });
        if (this.state.processing || this.props.mgmCancel) {
            $.publish('cancelRequest');
        }
        if (this.state.callback) {
            this.state.callback();
        }
        if (this.props.tracking) {
            var tracking = this.props.tracking;
            var event = tracking.event ? tracking.event : 'click';
            Tracking.trackEvent(event, tracking);
        }

        e.preventDefault();
    },

    render() {
        var style = {
            height: $(window).height(),
            width: this.props.width
        };
        return (
            this.state.show ?
                <div className={this.props.class}>
                    <div className="back-fixed" onClick={this.closeModel} style={{height: style.height}}></div>
                    <div className="popup" style={{width: style.width}}>
                        <div className="popup-header"></div>
                        {
                            this.state.close ?
                                <div className="close" onClick={this.closeModel}></div> : null
                        }

                        {this.props.children}
                    </div>
                </div> : null
        );
    }
});
module.exports = Popup;

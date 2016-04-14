/**
 * Created by malin on 15/6/5.
 */
var React = require('react');
let ConfirmModel = React.createClass({
    getInitialState() {
        return {
            show: false
        };
    },

    componentWillReceiveProps(props) {
            this.setState({
                show: props.showConfirmModel
            });
    },

    close() {
        this.setState({
            show: false
        });
    },

    render() {
        let ele = this.props.ele;
        let display = {};
        let displayMain = {};
        if (this.state.show) {
            displayMain = {
                display: 'block'
            };
            display = {
                display: 'block',
                background: '#000',
                opacity: this.props.opacity === true || this.props.opacity === undefined? 0.8 : this.props.opacity
            };
        } else {
            display = {
                display: 'none'
            };
            displayMain = {
                display: 'none'
            };
        }
        return (
            <div>
                <div style={display} className="confirm-model">
                </div>
                <div style={displayMain} className="confirm-model-main">
                     {ele}
                    <div className="close" onClick={this.close}></div>
                </div>
            </div>
        );
    }
});
module.exports = ConfirmModel;
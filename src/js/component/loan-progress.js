/**
 * @file 申请进度             未使用
 * @auther Created by malin on on 15/5/15.
 */
var React = require('react');


var LoanProgress = React.createClass({
    getInitialState() {
        return {
            text: this.props.option.text,
            active: this.props.option.active,
            width: 0
        };

    },
    componentDidMount() {
        var length = this.state.text.length;
        var widthPx = document.body.clientWidth * (1 / length);
        var picPx = parseInt(window.getComputedStyle(document.querySelector('.pic li'))['width']);
        var paddingPic = widthPx / 2 - picPx / 2;
        var picWidth = document.body.clientWidth - paddingPic * 2;
        this.setState({
            width: picWidth
        });
    },
    render: function () {
        var self = this,
            text = this.state.text,
            length = text.length,
            width = 100 / length + '%',
            li = [],
            active = 0;
        if (this.state.active == 0 || isNaN(this.state.active)) {
            active = 1;
        } else {
            active = (this.state.active - 1) * 2;
        }
        for (var i = 0, l = length * 2 - 1; i < l; i += 1) {
            if (i % 2) {
                li.push(<li className="hr">
                    <p></p>
                </li>);
            } else {
                if (i < active) {
                    li.push(<li className="progress-over-status"></li>)

                } else if (active === i) {
                    li.push(<li className="progress-over-status active"></li>)

                } else {
                    li.push(<li className="progress-over-status unable"><p></p></li>)
                }
            }
        }
        return (
            <div className="loan-progress">
                <ul className="text">
                    {
                        text.map(function (ele, index) {
                            if (index === self.state.active - 1) {
                                return <li style={{'width': width}} className="active" key={index}>{ele}</li>;
                            } else if (index > self.state.active - 1) {
                                return <li style={{'width': width}} className="unable" key={index}>{ele}</li>;
                            } else {
                                return <li style={{'width': width}} key={index}>{ele}</li>;
                            }

                        })
                    }
                </ul>
                <ul className="pic" style={{width: this.state.width}}>
                    {li}
                </ul>
            </div>
        );
    }
});
module.exports = LoanProgress;

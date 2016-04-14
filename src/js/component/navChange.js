/**
 * @file 预估页内外贸切换
 * @auther Created by malin on 15/5/28.
 */
var React = require('react');

let NavChange = React.createClass({
    changeType(event) {
        this.props.onClick(event);
    },
    render() {
        return (
            <div className="type-change" onClick={this.changeType}>
                <ul>
                    <li style={this.props.active === this.props.text2 ? {
                        background: 'rgb(198, 203, 207)',
                        color: '#918F8F'
                    } : null}>
                        <div >                    {this.props.text1}
                        </div>
                    </li>
                    <li style={this.props.active === this.props.text1 ? {
                        background: 'rgb(198, 203, 207)',
                        color: '#918F8F'
                    } : null}>
                        <div >                    {this.props.text2}
                        </div>
                    </li>
                </ul>
            </div>
        );

    }
});
module.exports = NavChange;

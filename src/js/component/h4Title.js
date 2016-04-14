/**
 * @file 横线文字横线
 * @auther Created by malin on on 15/5/4.
 */
var React = require('react');

let H4Title = React.createClass({
    render() {
        return (
            <h4 id={this.props.id} className="h4-title">
                <hr/>
                {this.props.text}
                <hr/>
            </h4>
        );
    }
});
module.exports = H4Title;
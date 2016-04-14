/**
 * @file 进件提交成功文字
 * @auther Created by malin on 15/5/13.
 */
var React = require('react');
let SuccessTips = React.createClass({
    render() {
        return (
            <b className={this.props.className}>提交成功，已获得特权资格，请静候佳音</b>
        );
    }
});
module.exports = SuccessTips;
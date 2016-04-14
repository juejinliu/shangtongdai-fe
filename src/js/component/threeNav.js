/**
 * @file 红包列表页3个tab
 * @auther Created by malin on 15/6/9.
 */

var React = require('react');

let ThreeNav = React.createClass({
    changeType(event) {
        this.props.onClick(event);
    },
    render() {
        let self = this;
        let activeClass = 'active';
        let textArr = this.props.textArr;
        let active = this.props.active;
        let li = [];
        for (let i = 0, l = textArr.length; i < l; i += 1) {
            li.push(<li className={active === textArr[i] ? activeClass : ''} key={i} data-index={i}
                        onClick={this.changeType}>
                {self.props.textArr[i]}
            </li>);
        }
        return (
            <div>
                <div className="three-nav">
                    <ul>
                        {li}
                    </ul>
                </div>

            </div>
        );
    }
});
module.exports = ThreeNav;
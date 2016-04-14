/**
 * @file setInterval 自动卸载
 * @auther Created by malin on on 15/6/9.
 */
var SetIntervalMixin = {
    componentWillMount() {
        this.intervals = [];
    },
    setInterval() {
        this.intervals.push(setInterval(...arguments));
    },
    componentWillUnmount() {
        this.intervals.map(clearInterval);
    }
};


module.exports = SetIntervalMixin;

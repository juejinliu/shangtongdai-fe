/**
 * @file 在第二步刷新会返回到第一步
 * Created by malin on 15/5/12.
 */

window.onbeforeunload = function () {
    var hash = window.location.hash;
    if(hash === '#/loanSecond') {
        window.location.href = window.location.pathname + window.location.search + '#loan';
    }
};
module.exports = window.onbeforeunload;
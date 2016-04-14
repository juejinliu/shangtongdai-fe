/**
 * @file 登录后重定向
 * @auther Created by malin on 15/10/22.
 */

let redirect = (urlNext) => {
    if (urlNext) {
        let next = decodeURIComponent(urlNext);
        let [nextTempFirst, _nextTempSecond] = next.split('#');
        let nextTempSecond = _nextTempSecond || '';
        let mark = (nextTempFirst.indexOf('?') >= 0) ? '&' : '?';
        next = nextTempFirst + mark + '_=' + new Date().getTime() + '#' + nextTempSecond;
        let queryBack = '';
        if (next.indexOf('bonus-share-wx') > -1) {
            queryBack = '?showModel=true';
            location.replace(next + queryBack);
        } else if (next.indexOf('ad-newPeople') > -1) {
            location.replace(next.replace('ad-newPeople', '?showModel=true'));
        } else if (next.indexOf('activity/mgm-a/prize-rec') > -1) {
            queryBack = '?showMGMMask=true';
            location.replace(next + queryBack);
        } else {
            location.replace(next);
        }
    } else {
        window.location.replace(window.location.pathname + window.location.search + '#m');
    }
};
module.exports = redirect;

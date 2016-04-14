/**
 * @file 全局数据通信
 * @auther Created by malin on 15/6/4.
 */
let $ = require('./../lib/zepto');
let appData = {
    historyUrl: [],
    loan: {
        toSave: function () {
            this.toArr = $('form').serializeArray();
            var select = document.querySelectorAll('select');
            var input = document.querySelectorAll('input');
            input = Array.prototype.slice.call(input).concat(Array.prototype.slice.call(select));
            $.each(input, function () {
                appData.loan[$(this).attr('data-name')] = this.value;
            });
        },
        fillLoanForm: function (obj) {
            for (let k of Object.keys(obj)) {
                if (!appData.loan[k]) {
                    appData.loan[k] = obj[k];
                }
            }
        }
    },


    bonusList: {
        unuse: '',
        used: '',
        over: ''
    },
    mgm: {},
    adTime: function (s, e) {

        let dateObj = new Date();
        let formateTime = (date) => {
            let arr = date.split('-');
            if (arr[1].length === 1) {
                arr[1] = '0' + arr[1];
            }
            if (arr[2].length === 1) {
                arr[2] = '0' + arr[2];
            }
            return arr.join('-');
        };
        let start = formateTime(s || (dateObj.getFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getDate()));
        let end = formateTime(e || (dateObj.getFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getDate()));
        let now = formateTime(dateObj.getFullYear() + '-' + (dateObj.getMonth() + 1) + '-' + dateObj.getDate());
        let startTime = new Date(start).getTime();
        let startDay = new Date(start).getDate();
        let endTime = new Date(end).getTime();
        let endDay = new Date(end).getDate();
        let nowTime = new Date(now).getTime();
        //TODO 这可以做成距离开始与结束还有几天，包装成一个对象返回两个值
        let left = 31 - endDay + 1;
        left = left > 9 ? left : '0' + left;
        if (!s && !e) {
            return left;
        } else {
            if (startTime > nowTime || endTime <= nowTime) {
                return 0;
            } else {
                return left;
            }
        }
    },
    api: function () {
        let std = window.std || '';
        let stdUserStatus = {};
        let stdApi = {};
        if (std) {
            if (std.stdUserStatus) {
                stdUserStatus = std.stdUserStatus;
                stdApi = std.stdApi;
            }
        }
        return {
            stdUserStatus: stdUserStatus,
            stdApi: stdApi
        };
    }

};


module.exports = appData;

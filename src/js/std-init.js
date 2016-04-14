/**
 * Created by malin on 15/12/07.
 */
(function () {

    const inLineStyle = (function () {
        let style = document.createElement('style');
        style.innerHTML = `
            #spinner{
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: #1abc9c;
                z-index: 900;
            }
            .page-loading-outer{
                position: absolute;
                top: 40%;
                left: 50%;
            }
            .page-loading-p{
                margin-top: 54px;
                color: #ffffff;
                margin-left: -50%;
            }
            .coffee_cup{
                width: 30px;
                height: 34px;
                border: 1px rgba(255,255,255,1) solid;
                border-radius: 0px 0px 5px 5px;
                position: absolute;
                margin: 0 auto;
                margin-left: -15px;

            }
            .coffee_cup:after, .coffee_cup:before{
                position: absolute;
                content: "";
            }
            .coffee_cup:after{
                width: 8px;
                height: 16px;
                border: 1px #fff solid;
                border-left: none;
                border-radius: 0px 20px 20px 0px;
                left: 30px;
            }
            .coffee_cup:before{
                width: 1px;
                height: 6px;
                background-color: rgba(255,255,255,1);
                top: -13px;
                left: 8px;
                box-shadow: 5px 0px 0px 0px rgba(255,255,255,1),
                            5px -5px 0px 0px rgba(255,255,255,1),
                            10px 0px 0px 0px rgba(255,255,255,1);
                -webkit-animation: steam 1s linear infinite alternate;
                   -moz-animation: steam 1s linear infinite alternate;
                        animation: steam 1s linear infinite alternate;
            }

            @-webkit-keyframes steam{
                0%{height: 0px;}
                100%{height: 6px;}
            }
            @-moz-keyframes steam{
                0%{height: 0px}
                100%{height: 6px;}
            }
            @keyframes steam{
                0%{height: 0px}
                100%{height: 6px;}
            }
    `;
        document.head.appendChild(style);
    })();

    const insetLoading = (function () {
        let spinnerEle = `
            <div id="spinner">
                <div class="page-loading-outer">
                    <div class="coffee_cup"></div>
                    <p class="page-loading-p">商通贷，贷出好生意</p>
                </div>
            </div>
        `;
        let body = document.getElementsByTagName('body')[0];
        let div = document.createElement('div');
        if (body.children[0]) {
            body.insertBefore(div, body.children[0]);
        } else {
            body.appendChild(div);
        }
        div.innerHTML = spinnerEle;
    })();


    const getJsPath = (function () {
        //获取当前js文件的路径
        let scripts = document.scripts;
        let jsPath;
        for (let i = 0; i < scripts.length; i += 1) {
            if (scripts[i].src.indexOf('std-init.js') > -1) {
                jsPath = scripts[i].src.substring(0, scripts[i].src.lastIndexOf('/') + 1);
            }
        }
        return jsPath;
    })();


    const commonsSrc = getJsPath + 'commons.js' + '?commonshash';
    const appSrc = getJsPath + 'std-app.js' + '?apphash';
    const appCssSrc = getJsPath.substr(0, getJsPath.length - 3) + 'css/' + 'std-app.css' + '?csshash';

    const appendStyle = function (src) {
        let link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.media = 'all';
        link.href = src;
        document
            .getElementsByTagName('head')[0]
            .appendChild(link);
    };
    appendStyle(appCssSrc);

    const appendJS = function (src) {
        let js = document.createElement('script');
        js.type = 'text/javascript';
        js.src = src;
        document
            .getElementsByTagName('head')[0]
            .appendChild(js);
        return function (appsrc) {
            js.onload = function () {
                appendJS(appsrc);
            };
        };
    };
    setTimeout(function () {
        appendJS(commonsSrc)(appSrc);
    }, 0);

})();

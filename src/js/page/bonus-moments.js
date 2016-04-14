/**
 * Created by malin on 15/6/11.
 */
var React = require('react');

const shareCode = window.shareCode || '';
let Moments = React.createClass({
    render() {
        var linkStyle = {
            display: 'block',
            width: '100%',
            height: '100%'

        };
        let link = 'https://shangdai.yixin.com/m';
        if (shareCode) {
            link = link + '?code=' + shareCode;
        }
        link = link + '#/platform';
        return (
            <div className="moments">
                <div className="moments-btn-red">
                    <a style={linkStyle} href={link}></a>
                </div>
                <div className="moments-btn-red moments-btn-second">
                    <a style={linkStyle} href={link}></a>
                </div>
                <div className="moments-btn-grey">
                    <a style={linkStyle} href={link}></a>
                </div>
            </div>
        );
    }
});
module.exports = Moments;

/**
 * Created by malin on 15/5/13.
 */
var React = require('react');
var redPack = 'https://shangdai.yixin.com/m/bonus#/bonus-list/unuse';
const hasBonusApi = window.std.stdApi.hasBonusApi;
let Status = React.createClass({
    getInitialState() {
        return {
            newPeopleText: '',
            redPackButton: ''
        };
    },
    componentDidMount() {
        this.adStatus();
    },
    adStatus() {
        let self = this;
        $.ajax({
            'url': hasBonusApi,
            'type': 'get',
            'dataType': 'jsonp',
            'data': {_: (new Date).getTime()},
            success(json) {
                let results = json.hasBonus;
                if (results) {
                    self.setState({
                        redPackButton: '查看我的红包>>',
                        newPeopleText: '恭喜您完成申请，"818返利红包"已抵达您的账户'

                    });
                } else {
                    self.setState({
                        redPackButton: '',
                        newPeopleText: ''

                    });
                }
            },
            error() {
                self.setState({
                    newPeopleText: '',
                    redPackButton: ''
                });
            }
        });
    },
    render() {
        let spanText = this.props.spanText;
        let styleSpan = {
            display: 'block',
            textAlign: 'center',
            margin: '20px auto',
            fontSize: '14px'
        };
        let styleP = {
            display: 'block',
            textAlign: 'center',
            margin: '20px auto 10px',
            fontSize: '20px',
            color: 'rgb(210, 3, 3)'
        };
        return (
            <div>
                <div className="right-pic"></div>
                <p className="state"> {this.props.text}</p>
                <span style={styleSpan} dangerouslySetInnerHTML={{__html: spanText}}></span>

                <p style={{display: 'block', textAlign: 'center', width: '280px', margin: '0 auto', lineHeight: '1.3em', fontSize: '14px'}}>{this.state.newPeopleText}
                    <a style={{color: 'red', display: 'block', lineHeight: '2em'}}
                       href={redPack}>{this.state.redPackButton}</a>
                </p>

                <p style={styleP}>恭喜您，完成商通贷申请流程</p>
            </div>
        );
    }
});
module.exports = Status;
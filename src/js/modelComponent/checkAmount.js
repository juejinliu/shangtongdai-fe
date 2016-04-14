/**
 * Created by malin on 15/5/26.
 */
var React = require('react'),
    $ = require('./../lib/zepto'),
    Button = require('./../component/button');


let Model = React.createClass({
    render: function () {
        let text = '';
        if (this.props.platform === 'aliexpress') {
            text = '请登录速卖通，点击"数据纵横－商铺流量统计"中的"商铺概况－交易概况"，填写"最近90天支付成功订单金额 "数字即可'
        } else {
            text = '请登录生意参谋，点击"经营分析－交易概况"或"自助取数"，计算至少最近6个月的月均支付金额';
        }
        let styleDiv = {
            fontSize: '13px',
            width: '82%',
            margin: '0 auto 10px',
            color: '#ffffff',
            textAlign: 'center',
            backgroundColor: '#000',
            lineHeight: '1.4em',
            padding: '6px 4px 8px 4px',
            display: 'none'
        };
        return (
            <div style={styleDiv} id="tbModel">
                <p>{text}</p>
            </div>
        );
    }
});
let CheckAmount = React.createClass({
    componentDidMount() {
        $(window).on('tap', function () {
            $('#tbModel').css('display', 'none');
        });
        $('#model').on('tap', function () {
            $('#tbModel').css('display', 'block');
            return false;
        });
    },
    render() {
        let styleP = {
            fontSize: '14px',
            width: '80%',
            margin: 'auto',
            color: '#5894f0',
            textAlign: 'center',
            marginBottom: '10px'
        };

        return (
            <div >
                <p id="model" style={styleP}>
                    <Button
                        text={this.props.text}
                        tracking
                    ></Button>
                </p>
                <Model platform={this.props.platform}></Model>
            </div>
        );
    }
});
module.exports = CheckAmount;
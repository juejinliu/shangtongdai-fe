/**
 * Created by malin on 15/5/29.
 */
var React = require('react'),
    {Link} = require('react-router'),
    Button = require('./../component/button');

var percentageFn = '',
    interval = '';

let Loading = React.createClass({
    getInitialState(){
        return {
            width: '0%',
            num: 0
        };
    },

    componentDidMount(){
        var self = this;
        percentageFn = function () {
            if (self.state.num >= 99) {
                self.clearInt();
                return;
            }
            var percentage = Math.ceil(Math.random() * 10) + self.state.num;
            if (percentage > 99) {
                percentage = 99;
            }
            self.setState({
                num: percentage,
                width: percentage + '%'
            });
        };
        interval = setInterval(percentageFn, 1000);

    },

    componentWillUnmount() {
        this.clearInt();
    },

    clearInt(){
        if (interval) {
            clearInterval(interval);
        }
        interval = '';
    },

    render() {
        var divClassName = '';
        var self = this;
        if (!this.props.showLoading) {
            divClassName = 'opacityAnimate opacityOut';
            setTimeout(function () {
                $('#loading').css({'display': 'none'})
            }, 500);
            self.clearInt();
        } else {
            divClassName = '';
            setTimeout(function () {
                $('#loading').css({'display': 'block'})
            }, 0);
        }
        var styleDiv = {
            width: '100%',
            height: '100%',
            position: 'fixed',
            top: '0',
            left: '0',
            zIndex: '1',
            background: '#fff'
        };
        var styleH2 = {
            fontSize: '24px',
            textAlign: 'center',
            fontWeight: 'normal',
            lineHeight: '1.5em',
            margin: '60px auto 40px'
        };
        var styleP = {
            fontSize: '20px',
            textAlign: 'center',
            fontWeight: 'normal',
            lineHeight: '1.5em',
            color: 'rgb(255, 0, 58)'
        };
        var process = {
            position: 'relative',
            borderRadius: '13px',
            boxShadow: 'inset 0px 2px 1px 1px #93948f',
            backgroundImage: '-webkit-linear-gradient(left, #D3D3D3, #faf7ff)',
            height: '26px',
            margin: '40px auto',
            width: '80%'
        };

        var line = {
            position: 'absolute',
            textAlign: 'center',
            lineHeight: '26px',
            color: '#ffffff',
            borderRadius: '13px',
            backgroundImage: '-webkit-linear-gradient(left, rgb(22, 188, 237), rgb(107, 217, 249))',
            height: '26px',
            width: this.state.width
        };
        return (
            <div id="loading" className={divClassName} style={styleDiv}>
                <h2 style={styleH2}>账号添加成功</h2>

                <p style={styleP}>正在为您预估额度</p>

                <div style={process}>
                    <div style={line}>{this.state.width}</div>
                </div>

                <Link to={{pathname: 'platform'}} onClick={this.clearInt} className="button-link-middle">
                    <Button text="继续添加账号"></Button>
                </Link>
            </div>
        );
    }
});
module.exports = Loading;

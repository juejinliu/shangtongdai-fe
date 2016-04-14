/**
 * Created by malin on 15/5/7.
 */
var React = require('react'),
    $ = require('./../lib/zepto'),
    Tracking = require('./../lib/tracking');

var isFirst = true;
var isMove = true;
var isButtonShow = false;

let ListDelete = React.createClass({
    getInitialState() {
        return {
            translateX: 0,
            startPositionX: 0,
            startPositionY: 0,
            isButtonShow: false
        };
    },

    swipeStart(e) {
        if (isButtonShow) {
            isButtonShow = false;
        } else {
            this.setState({
                startPositionX: e.targetTouches[0].pageX,
                startPositionY: e.targetTouches[0].pageY
            });
        }
    },

    swipeMove(e) {
        if (!isButtonShow && this.state.translateX === -this.refs.del.clientWidth) {
            return;
        }
        let translateX = e.targetTouches[0].pageX - this.state.startPositionX;
        let translateY = e.targetTouches[0].pageY - this.state.startPositionY;

        //向Y的趋势大于X,不能移动,
        //isFirst 如果第一次是向Y移动的则以后再向左右移动也不会触发滑动
        if (isFirst && (Math.abs(translateY) - Math.abs(translateX) > 0)) {
            isMove = false;
        }
        isFirst = false;
        if (isMove) {
            this.setState({
                translateX: translateX
            });
            //如果向左滑的距离大于按钮宽度的时候，设置放手后显示删除按钮
            isButtonShow = translateX < -this.refs.del.clientWidth;
            e.preventDefault();
        }

    },

    swipeEnd(e) {
        e.preventDefault();
        isMove = true;
        isFirst = true;
        if (isButtonShow) {
            let delDomWidth = this.refs.del.clientWidth;
            this.setState({
                translateX: -delDomWidth
            });
        } else {
            this.setState({
                translateX: 0
            });
        }
    },

    render() {
        let translate3d = 'translate3d(' + this.state.translateX + 'px, 0, 0)';
        let style = {
            li: {
                position: 'relative',
                borderTop: '1px solid #cccccc',
                transformStyle: 'preserve-3d',
                WebkitTransformStyle: 'preserve-3d',
                WebkitBackfaceVisibility: 'hidden',
                height: '50px'
            },
            div: {
                WebkitTransform: translate3d,
                transform: translate3d,
                WebkitTransition: '-webkit-transform 300ms ease-out',
                transition: 'transform 300ms ease-out',
                height: '50px',
                position: 'absolute',
                width: '100%',
                background: '#F1EFEF',
                zIndex: '1'

            },
            del: {
                background: '#f53053',
                position: 'absolute',
                width: '2rem',
                right: '0',
                top: '0',
                textAlign: 'center',
                height: '49px',
                lineHeight: '49px',
                color: '#ffffff',
                fontSize: '0.35rem'
            }
        };
        let {delEvent} = this.props;

        return (
            <li style={style.li} className="del-list">
                <div style={style.div}
                     onTouchStart={this.props.isdelete && this.swipeStart}
                     onTouchMove={this.props.isdelete && this.swipeMove}
                     onTouchEnd={this.props.isdelete && this.swipeEnd}
                    >
                    {this.props.children}
                </div>
                <div onClick={delEvent} ref='del' style={style.del}>删除</div>
            </li>
        );
    }
});
module.exports = ListDelete;
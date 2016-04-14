/**
 * @file 龙抬头活动
 * @auther Created by malin on 16/2/29.
 */
import React from 'react';
import {Link} from 'react-router';
import Button from '../../../component/button';
import Tracking from '../../../lib/tracking';
import MomentModel from '../../../modelComponent/moments-model';
import formValidator from '../../../form/formValidator';
import localforage from 'localforage';
import {isWechatUa} from '../../../lib/mobilePlatform';
import AppData from '../../../component/appData';
import BallChasing from '../../../modelComponent/css3loadingBallChasing';

const {stdApi} = AppData.api();
const {uploadDragonApi} = stdApi;

//s1首次进入输入姓名传图片
//s2已经传过图片
//s3分享查看页面
const pathObj = {
    s1: 1,
    s2: 2,
    s3: 3
};

class Dragon extends React.Component {

    state = {
        //imgSrc: 'http://10.106.163.80:8080/build/img/activity/dragon/person.jpg',
        imgSrc: 'http://static.yixin.com/file/T1M4xTB7W_1RCvBVdKUQhb.jpg',  //初始化图片
        showMask: false,                                                    //分享遮罩默认隐藏
        section: 1,
        btnDisable: true,
        inputValue: '',
        ballChasing: false
    };

    //获取当前path如果是分享页面再判断是否含有图片参数,
    //如果没有则属于非法url跳转至状态1
    //否则载入url中的图片替换默认图片
    componentWillMount() {
        let {path} = this.props.params;
        let shareImg = this.props.location.query.img;
        if (path === 's3') {
            if (!shareImg) {
                this.context.router.push('activity/dragon/s1');
            } else {
                this.loadImg(shareImg, 3);
                this.setState({
                    section: pathObj[path]
                });
                Tracking.trackEvent('pageload', {activity: 'dragon', page: `/m#/activity/dragon/${path}-m`});
            }
        } else {
            this.localStorageImg(pathObj[path]);
            Tracking.trackEvent('pageload', {activity: 'dragon', page: `/m#/activity/dragon/${path}-m`});
        }
    };

    //localforage 图片地址
    //传过图片的用户始终优先显示状态2
    localStorageImg(path) {
        localforage.getItem('dragon-img', (err, value) => {
            if (err) {
                path && this.setState({section: path});
            } else {

                if (value !== null) {
                    if (this.props.params.path === 's1') {
                        this.context.router.push('activity/dragon/s2');
                    } else {
                        //当前应该在s2,不要再传参数
                        this.loadImg(value);
                        path && this.setState({section: path});
                    }
                } else {
                    try {
                        setTimeout(() => {
                            this.wxShare(this.state.imgSrc);
                        }, 500);
                    } catch (ex) {

                    }
                    path && this.setState({section: path});
                }
            }
        });
    };

    componentWillReceiveProps(nextProps) {
        let nextP = nextProps.params.path;
        let thisP = this.props.params.path;
        if (nextP !== thisP) {
            if (nextP === 's1' && thisP === 's2') {
                this.toS1AndClear();
            } else {
                this.localStorageImg(pathObj[nextP]);
            }
            Tracking.trackEvent('pageload', {activity: 'dragon', page: `/m#/activity/dragon/${nextP}-m`});
        }
    };

    //获取input值
    componentDidMount = () => {
        this.localStorageInput();
    };

    //只执行一次动画
    componentDidUpdate = () => {
        if (!this.state.btnDisable) {
            $('#tips-input-p').removeClass('ani');
        }
    };


    //微信选择图片
    selectPictureWx = () => {
        if (this.state.btnDisable) {
            this.tipsInput();
            return;
        }
        let self = this,
            localIds;
        if (!isWechatUa) {
            alert('请使用微信访问');
        } else {
            localforage.setItem('dragon-input', $('#tips-input').val());
            wx.chooseImage({
                count: 1,
                success: (res) => {
                    localIds = res.localIds[0];
                    self.uploadFileWx(localIds);
                },
                fail: () => {
                    alert('上传失败');
                }
            });
        }

    };

    //微信获取serverid
    uploadFileWx = (localId) => {
        let serverId,
            self = this;
        wx.uploadImage({
            localId: localId,
            success: (res) => {
                serverId = res.serverId;
                self.uploadServerId(serverId);
                self.setState({
                    ballChasing: true
                });
            },
            fail: () => {
                alert('上传失败');
                self.setState({
                    ballChasing: false
                });
            }
        });
    };

    //上传serverid,合成图片,返回图片url
    uploadServerId = (serverId) => {
        $.ajax({
            url: uploadDragonApi,
            'data': JSON.stringify({'media_id': serverId, _: (new Date).getTime()}),
            'type': 'post',
            'dataType': 'json',
            'headers': {
                'Content-Type': 'application/json'
            },
            success: (json) => {
                if (json.result === 'success') {
                    this.loadImg(json.url, 2);
                    this.setState({
                        section: 2
                    });
                } else {
                    alert('请上传包含头像的照片');
                    this.setState({
                        ballChasing: false
                    });
                }
            },
            error: () => {
                alert('上传失败');
                this.setState({
                    ballChasing: false
                });
            }
        });
    };

    //获取input值
    localStorageInput = () => {
        let self = this;
        let input = $('#tips-input');
        localforage.getItem('dragon-input', (err, value) => {
            if (err) {
                console.error('Oh noes!');
            } else {
                if (value !== null) {
                    self.setState({
                        inputValue: value,
                        btnDisable: false
                    });
                }
                try {
                    setTimeout(() => {
                        this.wxShare(this.state.imgSrc);
                    }, 500);
                } catch (ex) {

                }
            }
        });
    };

    //错误提示动画
    tipsInput = () => {
        let input = $('#tips-input');
        let tips = $('#tips-input-p');
        input.attr('placeholder', '');
        tips.text('请陛下先输入您的名字').addClass('ani');
    };

    //载入请求返回的图片,超时处理
    loadImg = (src, to) => {
        let oldImg = this.state.imgSrc;
        this.setState({
            imgSrc: src,
            ballChasing: true
        });
        let timer = setTimeout(() => {
            this.setState({
                imgSrc: oldImg,
                ballChasing: false
            });
            imgObj.onload = null;
            alert('当前网络状况不佳');
        }, 5000);
        let imgObj = new Image();
        console.time('imgOnload: ');
        imgObj.onload = () => {
            console.timeEnd('imgOnload: ');
            console.log('success');
            if (to === 2) {
                this.context.router.push('activity/dragon/s2', {img: src});
            }
            this.setState({
                ballChasing: false
            });
            clearTimeout(timer);
        };
        imgObj.src = src;
        try {
            setTimeout(() => {
                this.wxShare(src);
            }, 500);
        } catch (ex) {

        }
        to !== 3 && localforage.setItem('dragon-img', src);
    };

    wxShare(src = '') {
        try {
            let defaultOption;
            let momentsOption;
            let tit = `今日${this.state.inputValue}龙袍加身!做天子,您也可以!`;
            let des = `秒变天子龙抬头`;
            let shareConfig = {
                title: tit,
                desc: des,
                link: window.location.protocol + '//' + window.location.host + window.location.pathname + window.location.search + '#/activity/dragon/s3' + (src && `?img=${src}`),
                imgUrl: 'http://static.yixin.com/file/T1eHxTB4VT1RCvBVdKqRaA.png'
            };
            momentsOption = defaultOption = shareConfig;
            wx.ready(() => {
                prepareShare(defaultOption, momentsOption, 'dragon');
            });
        } catch (e) {
            alert(e);
        }
    };

    //inputcheck
    checkName = (event, value) => {
        this.setState({
            inputValue: event.target.value
        });
        let self = this,
            validate = {
                require: '请陛下先输入您的名字'
            };
        if (value && value !== event._dispatchIDs) {
            validate = value;
        }
        for (let i of Object.keys(validate)) {
            if (formValidator[i](event.target ? event.target.value : event) === false) {
                self.setState({
                    btnDisable: true
                });
            } else {
                self.setState({
                    btnDisable: false
                });
            }
        }
    };


    //s1 ele
    getStep1 = () => {
        return (
            <div>
                <div className="tips-input">
                    <input type="text" id="tips-input"
                           ref="input"
                           className="dragon-btn dragon-input"
                           onChange={this.checkName}
                           placeholder="点击输入姓名"
                           value={this.state.inputValue}
                    />
                    <p id="tips-input-p" className="tips-input-p"></p>
                </div>

                <div onClick={this.selectPictureWx} className="dragon-btn choose-img">
                    <Button text="上传照片，做真龙天子"
                            material-button
                            tracking={{
                                    'activity': 'dragon',
                                    'lmt-track-id': 'dragon-upload'
                            }}>
                    </Button>
                </div>
                <p className="section1-p">请上传正面、光照良好的照片</p>
            </div>
        );
    };

    //s2 ele
    getStep2 = () => {
        return (
            <div>
                <div className="dragon-btn link-to-std dragon-share-btn" onClick={this.showMaskModel}>
                    <Button text="即刻转发，召见群臣"
                            material-button
                            tracking={{
                                    'activity': 'dragon',
                                    'lmt-track-id': 'dragon-share'
                            }}>
                    </Button>
                </div>
                <Link to={{pathname: 'nav'}} className="dragon-btn link-to-std">
                    <Button text="点我 生意也要龙抬头"
                            material-button
                            tracking={{
                                    'activity': 'dragon',
                                    'lmt-track-id': 'dragon-nav-2'
                            }}>
                    </Button>
                </Link>
            </div>
        );
    };

    //s3 ele
    getStep3 = () => {
        return (
            <div>
                <div className="dragon-btn choose-img" onClick={this.toS1AndClear}>
                    <Button text="朕也要抬头"
                            material-button
                            tracking={{
                                    'activity': 'dragon',
                                    'lmt-track-id': 'dragon-toS1'
                            }}>
                    </Button>
                </div>
                <Link to={{pathname: 'nav'}} className="dragon-btn link-to-std">
                    <Button text="点我 生意也要龙抬头"
                            material-button
                            tracking={{
                                    'activity': 'dragon',
                                    'lmt-track-id': 'dragon-nav-3'
                            }}>
                    </Button>
                </Link>
            </div>
        );
    };

    //点击再玩一次跳转至状态1并清空dragon-img的forage
    toS1AndClear = () => {
        localforage.removeItem('dragon-img', () => {
            this.context.router.push('activity/dragon/s1');
            this.setState({
                section: 1
            });
            try {
                setTimeout(() => {
                    this.wxShare(this.state.imgSrc);
                }, 500);
            } catch (ex) {
            }
        });
    };

    showMaskModel = () => {
        this.setState({
            showMask: true
        });
    };

    hideMaskModel = () => {
        this.setState({
            showMask: false
        });
    };

    render() {
        let section = this.state.section;
        return (
            <div className="dragon">
                {
                    section === 2 ?
                        <div onClick={this.toS1AndClear} className="dragon-again">
                            <Button text="再玩一次"
                                    material-button
                                    tracking={{
                                            'activity': 'dragon',
                                            'lmt-track-id': 'dragon-again'
                                        }}>
                            </Button>
                        </div> :
                        <div className="dragon-logo"></div>
                }
                <img src={this.state.imgSrc} height="70%" alt=""/>
                {
                    section === 1 ?
                        this.getStep1() : null
                }
                {
                    section === 2 ?
                        this.getStep2() : null
                }
                {
                    section === 3 ?
                        this.getStep3() : null
                }
                {
                    section === 3 ?
                        null :
                        <p className="dragon-bottom-p">商通贷是宜信旗下的全线上借款服务平台专为淘宝、天猫、京东、eBay、Amazon等电商平台卖家解决资金难题</p>
                }
                <div id="base64"></div>
                <MomentModel _onClick={this.hideMaskModel} show={this.state.showMask}></MomentModel>
                <BallChasing ballChasing={this.state.ballChasing}></BallChasing>
            </div>
        );
    }
}
Dragon.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export default Dragon;

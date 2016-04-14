/**
 * Created by jiashuai zhou on 15/12/08.
 */

var React = require('react'),
    {Link} = require('react-router'),
    Button = require('./../../component/button'),
    isLogin = require('./../../component/isLogin'),
    AppData = require('./../../component/appData'),
    Css3Loading = require('./../../modelComponent/css3loading');

const {stdApi} = AppData.api();
const double12BonusCheckApi = stdApi.double12BonusCheckApi;
const double12OpenBonusApi = stdApi.double12OpenBonusApi;
const shareWechatHeadImg = 'http://static.yixin.com/file/T1gz_TB7_71RCvBVdKZWl3.jpg';
const activityType = 'double12';

let Double12Index = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },

    getInitialState() {
    	return {
    		loading: true,
    		canGetBonus: true,
    		gettingBonus: false,
    		hasGotBonus: false,
            bonusMoney: 0,
            errMsg: '',
            sendName: '商通贷',
            say: '1212  有彩蛋才快乐！',
            bottomButtonShow: false
    	};
    },

    componentWillUnmount() {
    	if (!AppData.adTime('2015-12-10', '2015-12-13')) {
            this.context.router.push('estimate');
    	}
    },

    componentDidMount() {
    	var self = this;
        isLogin(self, '', function() {
        	self.initBonusState();
        });
    },

    // 初始化状态，是否领取过红包
    initBonusState() {
    	var self = this;
    	$.ajax({
    		'url': double12BonusCheckApi,
            'type': 'get',
            'data': {_: (new Date).getTime()},
            beforeSend() {
                self.setState({
                    loading: true
                });
            },
            success(data) {
            	var json = JSON.parse(data);
            	try {
            		var amountCents = json.amountCents;
            		if (amountCents > 0) {
            			// 已经领取过红包
            			self.setState({
            				hasGotBonus: true,
                        	bonusMoney: amountCents / 100,
                        	bottomButtonShow: true
                    	});
            		}
            		var valid = json.canGetBonus;
            		var message = json.message;
            		self.setState({
            			canGetBonus: valid,
            			errMsg: message
            		});
            	} catch (err) {
            		console.log(err);
            	}
            	self.setState({
            		loading: false
        		});
            },
            error() {
            	// 当作没领取没有领取过红包
    			self.setState({
            		loading: false
        		});
            }
    	});
    },

    // 领取红包
    touchBonus(e) {
    	var self = this;
    	if (this.state.canGetBonus) {
    		$.ajax({
	    		'url': double12OpenBonusApi,
	            'type': 'get',
	            'data': {_: (new Date).getTime()},
	            beforeSend() {
	                self.setState({
	                    gettingBonus: true
	                });
	            },
	            success(data) {
	            	var json = JSON.parse(data);
	            	try {
	            		var result = json.result;
	            		var amountCents = json.amountCents;
	            		var message = json.message;
	            		if (json.result === 'success') {
	            			self.setState({
	            				hasGotBonus: true,
	                        	bonusMoney: amountCents / 100,
	                        	bottomButtonShow: true
	                    	});
	            		} else {
	            			self.setState({
	            				errMsg: message
	            			});
	            		}
	            	} catch (err) {
	            		console.log(err);
	            	}
	            	self.setState({
	            		gettingBonus: false
	        		});
	            },
	            error() {
	            	// 当作没领取没有领取过红包
	    			self.setState({
	    				errMsg: '获取红包失败',
	            		gettingBonus: false
	        		});
	            }
	    	});
    	}
    	e.preventDefault();
    },

    touchBtn() {
    	return <div onClick={this.touchBonus} className="mgmNew-recive-phone-package">
			<Button
                material-button
                tracking={{
                            'activity': activityType,
                            'status': 'active-button',
                            'lmt-track-id': activityType + '-recive-redpackage-button'
                        }}>
                <p className="mgmNew-recive-phone-package-title">拆红包</p>
                <p className="mgmNew-recive-phone-package-bottom">商通贷息费红包</p>
            </Button>
	    </div>;
    },

    tipBtn() {
    	return <div onClick={this.touchBonus} className="mgmNew-recive-phone-package"> 
			<Button
                material-button
                tracking={{
                            'activity': activityType,
                            'status': 'active-button',
                            'lmt-track-id': activityType + '-tip-redpackage-button'
                        }}>
                <p className="mgmNew-recive-phone-package-bottom">商通贷息费红包</p>
            </Button>

        </div>;
    },

	// 未领取红包的页面
    notGetBonusView() {
    	var ele = '', tip = '';
    	if (this.state.canGetBonus) {
    		ele = this.touchBtn();
    	} else {
    		ele = this.tipBtn();
    		tip = <div className="mgmNew-recive-tip">
    			<p className="center-text" >彩蛋是给商通贷新用户准备的呦~</p>
    			<p className="center-text">你已经是自己人啦~</p>
    		</div>;
    	}
    	return <div className="mgmNew-recive-phone">
    		{tip}
            <h2 className="mgmNew-recive-phone-sendName">
                {this.state.sendName}的红包
            </h2>
            {ele}
        </div>;
    },

    // 已领取红包的页面
    gotBonusView() {
    	return <div className="mgmNew-recive-package">
            <div className="mgmNew-recive-package-open">
                <p className="mgmNew-recive-package-open-title">商通贷红包</p>

                <p className="mgmNew-recive-package-open-twice" style={{display: this.state.hasGotBonus? 'block': 'none'}}>
                    已抢过啦</p>

                <p className="mgmNew-recive-package-open-money"
                   style={{top: this.state.hasGotBonus? '3rem': '2.8rem'}}>{this.state.bonusMoney}元</p>

                <p className="mgmNew-recive-phone-package-bottom">商通贷息费红包</p>

            </div>
            <Link to={{pathname: 'bonus-fq'}} className="mgmNew-recive-toRule">
                <Button
                    material-button
                    tracking={{
                                'activity': activityType,
                                'status': 'active-button',
                                'lmt-track-id': activityType + '-recive-rule'
                            }}
                    text="红包使用规则>>"
                    >
                </Button>
            </Link>
            <Link className="width90 mgmNew-red-button" to={{pathname: 'estimate'}}
                  params={{platformGroup: 'domestic'}}>
                <Button
                    material-button
                    tracking={{
                                'activity': activityType,
                                'status': 'active-button',
                                'lmt-track-id': activityType + '-recive-use-button'
                            }}
                    text="立即使用"
                    >
                </Button>
            </Link>
        </div>;
    },

    render() {
        if (this.state.loading) {
            return <Css3Loading loading={this.state.loading}></Css3Loading>;
        }
        var hasGotBonus = this.state.hasGotBonus, ele = '';
        if (hasGotBonus) {
            ele = this.gotBonusView();
        } else {
            ele = this.notGetBonusView();
        }
        var buttonDisplay = this.state.bottomButtonShow ? 'block' : 'none';

        return (
            <div className="mgmNew">
                <div className="mgmNew-recive">
                    <div className="mgmNew-recive-message">
                        <div className="mgmNew-recive-message-head l">
                            <img style={{width: '100%', height: '100%'}} src={shareWechatHeadImg} alt=""/>
                        </div>
                        <div className="mgmNew-recive-message-text l">
                            <p className="mgmNew-recive-message-name">{this.state.sendName}</p>

                            <p className="mgmNew-recive-message-say">
                                {this.state.say}
                                <span className="mgm-triangle-left"></span>
                            </p>
                        </div>
                    </div>
                    <div className="mgmNew-recive-main">{ele}</div>
                    <div className="ad-mgm">
                        <h1 className="ad-mgm-h1">商通贷是什么？</h1>

                        <p className="ad-mgm-h1-bottom-text">商通贷是专为中小电商解决资金问题的贷款平台</p>

                        <p className="ad-mgm-h1-bottom-text">只需要电商账号即可</p>

                        <h1 className="ad-mgm-h1">为什么要选商通贷？</h1>

                        <div className="ad-mgm-section-1"></div>

                        <div className="ad-mgm-section-3-outer">
                            <h2 className="ad-mgm-section-h2">算算更安心</h2>

                            <div className="ad-mgm-section-3"></div>
                        </div>
                        <div className="ad-mgm-section-4-outer">
                            <h2 className="ad-mgm-section-h2">全线上无抵押，更便利</h2>

                            <div className="ad-mgm-section-4"></div>
                            <ul className="ad-mgm-section-ul">
                                <li className="ad-mgm-section-li">
                                    <p>预估</p>

                                    <p>信用额度</p>
                                </li>
                                <li className="ad-mgm-section-li">
                                    <p>注册</p>

                                    <p>并填写申请表</p>
                                </li>
                                <li className="ad-mgm-section-li">
                                    <p>审核通过后</p>

                                    <p>选择借款方案</p>
                                </li>
                                <li className="ad-mgm-section-li">
                                    <p>填银行卡信息</p>

                                    <p>坐等资金到账</p>
                                </li>
                            </ul>
                            <Link className="width90 mgmNew-red-button"
                                  style={{marginTop: '0.3rem', display: buttonDisplay}}
                                  to={{pathname: 'estimate'}}>
                                <Button
                                    material-button
                                    tracking={{
                                    			'activity': activityType,
                                				'status': 'active-button',
                                				'lmt-track-id': activityType + '-recive-use-bottom-button'
                                			}}
                                    text="使用红包"
                                    >
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

});

module.exports = Double12Index;

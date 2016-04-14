/**
 * Created by qijiao on 15/10/27.
 */

var React = require('react'),
    {Link} = require('react-router'),
    Logo = require('./../../component/logo'),
    Tracking = require('./../../lib/tracking'),
    Customer = require('./../../component/customer'),
    Button = require('./../../component/button');


var MgmPosterRule = React.createClass({

    getDefaultProps() {
        return {
            query: {headImg: 'http://static.yixin.com/file/T1zXdTB_Ag1RCvBVdKKJz6.png'}
        };
    },

    render() {
        let headImg = this.props.location.query.headImg || 'http://static.yixin.com/file/T1zXdTB_Ag1RCvBVdKKJz6.png';
        return (
            <div className="mgm-poster-rule">
                <div className="mgm-poster-banner"></div>
                <div className="step-item">NO.1 如何推荐？</div>
                <ul className="nav-ul">
                    <li className="nav-li first">
                        <div className="icon ">
                            <img src={headImg}/>
                            </div>
                        您
                    </li>
                    <li className="nav-li second">
                        <div className="icon"></div>
                        分享海报
                    </li>
                    <li className="nav-li third">
                        <div className="icon"></div>
                        卖家好友
                    </li>
                </ul>
                <div className="step-desc">
                    <span className="step-1">1</span> 点击【6秒赚钱】，生成专属海报，分享给好友
                </div>
                <div className="step-desc">
                    <span className="step-2">2</span> 好友识别海报中二维码，领取红包
                </div>
                <div className="step-desc">
                    <span className="step-3">3</span> 好友在商通贷完成申请，您即可获得返现
                </div>
                <div className="step-item">NO.2 如何返现？</div>
                <div className="mgm-poster-table">
                    <span className="mgm-poster-line"></span>
                    <div className="mgm-poster-title">
                        <p className="l mgm-poster-title">本月邀请好友的数量</p>

                        <p className="l mgm-poster-title">单笔佣金收入</p>
                    </div>
                    <div>
                        <p className="l">1－20人</p>

                        <p className="l">50元</p>
                    </div>
                    <div>
                        <p className="l">21-100人</p>

                        <p className="l">100元</p>
                    </div>
                    <div>
                        <p className="l">超过100人</p>

                        <p className="l">200元</p>
                    </div>
                </div>
                <div className="step-desc">假设您成功推荐120人，您可获得现金金额为：</div>
                <div className="speech-bubble speech-bubble-top">
                   50×20+100×80+200×20
                    <p className="final-result"><span className="final-result-big">=13000</span><span>元</span></p>
                </div>
                <div className="step-item">NO.3 如何提现？</div>
                <div className="step-desc">
                    <span className="step-1">1</span> 点击"我要赚钱"—"我的钱包"，查看返现金额
                </div>
                <div className="step-desc">
                    <span className="step-2">2</span> 点击"提现"按钮，填写银行卡信息
                </div>
                <Link to={{pathname: 'bonus-poster-fq'}} className="rule-link">
                    <Button
                        material-button
                        tracking={{
                            'activity': 'mgmPoster',
                            'status': 'active-button',
                            'lmt-track-id': 'mgmPoster-rule'
                        }}
                        text="查看活动细则">
                    </Button>
                </Link>
            </div>
        );
    }
});

module.exports = MgmPosterRule;

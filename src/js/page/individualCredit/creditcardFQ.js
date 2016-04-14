/**
 * Created by malin on 15/6/9.
 */

var React = require('react'),
    Logo = require('./../../component/logo'),
    Customer = require('./../../component/customer'),
    Button = require('./../../component/button'),
    message = require('./../../messageConfig');

let CreditcardFQ = React.createClass({

    componentDidMount() {
        window.scrollTo(0, 0);
        let location = this.props.location.query.location;
        let ele = document.querySelector('#' + location);
        if (ele) {
            let currentHeight = ele.getBoundingClientRect().top;
            setTimeout(() => {
                window.scrollTo(0, currentHeight - 100);
                ele.className = ele.className + ' bgYellow';
            }, 200);
        }

    },


    render() {
        return (
            <div>
                <Logo></Logo>

                <div className="bonus-fq">
                    <h2 className="bonus-fq-h2">常见问题</h2>

                    <div className="bonus-fq-list" id="must">
                        <h3 className="bonus-fq-h3">1. 如何添加收取招行账单的邮箱？</h3>

                        <p className="bonus-fq-p">由于招商银行的简版账单我们无法分析，所以直接输入账单邮箱将无法通过。</p>

                        <div className="bonus-fq-ul">
                            <p className="bonus-fq-p">1.拨打招行信用卡客服电话<a href="tel:4008205555" style={{color: '#2484DF'}}>400-820-5555</a>，输入卡号（或身份证号）和查询密码后，按9转人工客服。
                            </p>

                            <p className="bonus-fq-p">2.请客服将您最近一年的账单补发到您邮箱中。（一般情况下，次日即可收到补发账单）</p>

                            <p className="bonus-fq-p">3.确认接收到全部的补发账单后，请再回来添加。给您造成的不便敬请谅解！</p>
                        </div>

                    </div>
                    <div className="bonus-fq-list">
                        <h3 className="bonus-fq-h3">2. 为什么会提示无本人账单？</h3>

                        <p className="bonus-fq-p">原因有以下几点，请您确认：</p>

                        <div className="bonus-fq-ul">

                            <p className="bonus-fq-p">1.邮箱里无账单。</p>

                            <p className="bonus-fq-p">2.开卡行不支持。（目前我们支持13家银行：广发、中信、建设、华夏、平安、招商、交通、兴业、工商、光大、农业、中行、邮储）</p>

                            <p className="bonus-fq-p">3.账单被归类到文件夹中。（请将文件夹里的账单邮件移动到收件箱中，重试即可）</p>

                            <p className="bonus-fq-p">4.添加的是招商银行账单邮箱。（若添加招行账单邮箱，请参见下面第8点，按提示操作即可）</p>
                        </div>
                    </div>
                    <div className="bonus-fq-list" id="bank">
                        <h3 className="bonus-fq-h3">3. 目前支持哪些银行？</h3>

                        <p className="bonus-fq-p">目前我们支持13家银行：广发、中信、建设、华夏、平安、招商、交通、兴业、工商、光大、农业、中行、邮储</p>
                    </div>
                    <div className="bonus-fq-list" id="yesqq">
                        <h3 className="bonus-fq-h3">4. 我使用过手机版的QQ安全中心，显示分析未完成，怎么办？</h3>

                        <p className="bonus-fq-p">若您曾经在QQ安全中心app上设置过账号绑定，请执行下述操作：</p>

                        <div className="bonus-fq-ul">

                            <p className="bonus-fq-p">1.打开App，点击「工具-登录保护-邮箱」，关闭「邮箱登录保护」</p>

                            <p className="bonus-fq-p">2.点击「我-账号管理-您的QQ头像」，在弹出菜单中点击「解绑此账号」</p>

                            <p className="bonus-fq-p">3.返回商通贷重试</p>
                        </div>
                    </div>
                    <div className="bonus-fq-list" id="noqq">
                        <h3 className="bonus-fq-h3">5. 我从未使用过手机版的QQ安全中心，显示分析未完成，怎么办？</h3>

                        <p className="bonus-fq-p">若您从未使用过QQ安全中心app设置过账号绑定，请查看下一条帮助，开启邮箱的POP3功能后，请致电<a
                            href="tel:4008181868" style={{color: '#2484DF'}}>4008-1818-68</a>，联系客服进行后续操作。</p>
                    </div>
                    <div className="bonus-fq-list" id="pop3">
                        <h3 className="bonus-fq-h3">6. 如何开启QQ邮箱的POP3功能？</h3>

                        <p className="bonus-fq-p">第一步：登录邮箱，在顶部点击「设置」；</p>

                        <p className="bonus-fq-p">第二步：点击顶部的「账户」菜单；</p>

                        <p className="bonus-fq-p">
                            第三步：往下滚动页面，找到图中3所示的设置项，分别开启「POP3/SMTP服务」和「IMAP/SMTP服务」两项功能，并设置独立密码；</p>

                        <p className="bonus-fq-p">第四步：在下方的「收取选项」选择「全部」，点击页面底部的「保存更改」；</p>

                        <p className="bonus-fq-p">第五步：致电<a href="tel:4008181868"
                                                           style={{color: '#2484DF'}}>4008-1818-68</a>，联系客服进行后续操作。</p>

                        <div className="bonus-fq-pic"></div>
                    </div>
                    <div className="bonus-fq-list">
                        <h3 className="bonus-fq-h3">7. 什么是个人信用报告？</h3>

                        <p className="bonus-fq-p">个人信用报告记录了客户与银行之间发生的信贷交易的历史信息，只要客户在银行办理过信用卡、贷款、为他人贷款担保等信贷业务，
                            他在银行登记过的基本信息和账户信息就会而进入个人征信系统，形成客户的信用报告。</p>
                    </div>
                    <div className="bonus-fq-list" id="s" name="s">
                        <h3 className="bonus-fq-h3">8. 如何查询个人信用信息？</h3>

                        <p className="bonus-fq-p">用户注册或登录人行征信中心，并进行身份验证。若通过验证（一般在提交的第2天），平台会向用户发送含有身份验证码的短信。
                            用户可在收到身份验证码的7天内，登录平台使用身份验证码査看査询结果。</p>
                    </div>
                    <div className="bonus-fq-list">
                        <h3 className="bonus-fq-h3">9. 使用个人信用信息服务平台的査询服务需要付费吗？</h3>

                        <p className="bonus-fq-p">目前通过征信中心网络查询是免费的。</p>

                        <p className="bonus-fq-p">如果直接去人民银行柜台查询，则个人前2次免费，第三次开始收取25元/次。</p>
                    </div>
                    <div className="bonus-fq-list">
                        <h3 className="bonus-fq-h3">10. 注册时填写的手机号码错误、更换或遗忘怎么办？</h3>

                        <p className="bonus-fq-p">您可以登录人民银行征信中心官网使用“用户管理”-“手机号码修改”功能进行更改。</p>
                    </div>
                    <div className="bonus-fq-list">
                        <h3 className="bonus-fq-h3">11. 为什么我注册用户时被拒绝？</h3>

                        <p className="bonus-fq-p">用户注册时被拒绝可能有以下几种情況：</p>

                        <div className="bonus-fq-ul">

                            <p className="bonus-fq-p">1.目前人民银行个人征信系统尚未收录您的任何信息，无法进行注册；</p>

                            <p className="bonus-fq-p">2.您已使用您的身份信息（姓名、证件类型和证件号搞）注册过其他用户，并且那个用户已通过身份验证。</p>
                        </div>
                    </div>
                    <div className="bonus-fq-list" id="message">
                        <h3 className="bonus-fq-h3">12. 为什么我提交查询申请后，没有收到身份验证码？</h3>

                        <p className="bonus-fq-p">
                            正常情況下，会在您提交査询申请的24个小时后，将身份验证结果反馈给您。若您在申请査询24个小时后仍未收到反馈结果，可能是由于以下原因:</p>

                        <div className="bonus-fq-ul">

                            <p className="bonus-fq-p">1.您注册时填写的手机号码不正确;</p>

                            <p className="bonus-fq-p">2.您的手机对短信进行了拦截，或短信接收出现异常；</p>

                            <p className="bonus-fq-p">3.您在提交查询申请时，使用的是问题验证方式，经审核您未通过身份验证。</p>
                        </div>
                    </div>
                    <div className="bonus-fq-list" id="solve">
                        <h3 className="bonus-fq-h3">13. 采用“私密性问题验证”为什么不容易通过？</h3>

                        <p className="bonus-fq-p">出于保护个人隐私安全的考虑并参考国外通用做法，“私密性问题验证”是根据您在银行办理信贷业务时的身份信息和信贷交易信息设计的。
                            若您对自己办理过的信贷业务及自身信用交易状況不熟悉或平常不刻意关注，可能很难回答正确。 同时，若您的真实信息与征信系统记录的信息不一致，也会导致身份验证无法通过。
                            因此，采用“私密性问题验证”方式的通过率可能会不高。</p>

                        <p className="bonus-fq-p">
                            若您未通过“私密性问题验证”，建议到人民银行征信中心官网转为“数字证书验证”或“银行卡验证”确认身份的真实性，也可以到人民银行分支机构现场查询本人信用信息。</p>
                    </div>
                    <div className="bonus-fq-list">
                        <h3 className="bonus-fq-h3">14. 为什么我无法用回答问题来验证身份？</h3>

                        <p className="bonus-fq-p">为什么我无法用回答问题来验证身份？
                            人民银行个人征信系统如果尚未及时收录您的信用卡和贷款信息，所以您无法使用安全级別较低的回答问题验证方式，您可以登录人行征信中心官网选择银行卡验证或数字验证。</p>
                    </div>
                    <div className="bonus-fq-list">
                        <h3 className="bonus-fq-h3">15. 为什么今天提交的査询申请不能马上获取报告?</h3>

                        <p className="bonus-fq-p">保障信息安全，基于互联网运行的个人信用信息服务平台与基于人民银行内联网（专网）运行的个人征信系统实行物理隔离，
                            平台用于验证的个人信息存储在个人征信系统中，系统每日会对平台的査询申请集中处理，并需要在两网间进行数据交换。因此，个人信用信息服务平台无法实现实时交付征信产品，
                            一般会在个人提交查询申请的第二日反馈查询结果。对于那些在办理信贷业务过程中急需査询个人信用信息的个人，可以通过去人民银行柜台现场查询的方式立即获取个人信用报告.</p>
                    </div>

                </div>
                <Customer></Customer>
            </div>
        );
    }
});
module.exports = CreditcardFQ;

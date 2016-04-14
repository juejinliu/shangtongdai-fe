/**
 * @file 协议
 * @auther Created by malin on 15/5/15.
 */
var React = require('react'),
    Button = require('./../component/button'),
    formValidator = require('./../form/formValidator');

let AgreementA = React.createClass({
    render() {
        let noMargin = {
            marginBottom: '0px'
        };
        return (
            <div style={this.props.style} className="model">
                <h2 style={noMargin} className="text-center">借款需求登记与</h2>
                <h2 className="text-center ">信用审核服务协议</h2>
                <div className="scroll">
                    <p>本协议由以下三方于
                        <span className="blank-space">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        年
                        <span className="blank-space">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        月
                        <span className="blank-space">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        日在
                        <span className="blank-space">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        省
                        <span className="blank-space">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        市
                        <span className="blank-space">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        区（县）签署：</p>
                    <p>
                        <b>甲方：</b>
                        <span
                            className="blank-space">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </p>
                    <p>身份证号码：
                        <span
                            className="blank-space">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    </p>
                    <br/>
                    <p>
                        <b>乙方：宜信惠民投资管理（北京）有限公司</b>
                    </p>
                    <p>地址：北京市朝阳区建国路88号现代城A区（SOHO)区C栋1606室</p>
                    <p>邮编：100022</p>
                    <br/>
                    <p>
                        <b>丙方：宜信普诚信用管理（北京）有限公司</b>
                    </p>
                    <p>地址： 北京市朝阳区建国路88号北京现代城A区B栋0315</p>
                    <p>邮编：100022</p>
                    <br/>

                    <p>鉴于甲方有借款需求，甲方、乙方与丙方针对甲方借款需求登记、甲方信用审核事宜达成如下协议：</p>

                    <h4>第一条 甲方的权利与义务</h4>
                    <ol className="list-unstyled">
                        <li>1.1 甲方应如实填写《借款服务申请表》，并根据乙方要求提供必要的资料。</li>
                        <li>1.2 甲方同意乙方通过其他合法途径获取甲方的个人信息,包括在商通贷网站上已授权的eBay账号获取过去最长36个月的交易数据。</li>
                        <li>1.3 甲方同意乙方将本条第1款、第2款获取的甲方信息提交给丙方，并授权丙方对甲方的个人信息进行整理、保存、加工。</li>
                        <li>1.4
                            <b>甲方同意丙方采集甲方个人的收入、存款、有价证券、不动产等信息；甲方知晓有此可能造成第三方知悉上述信息等后果。</b>
                        </li>
                        <li>1.5 甲方有权向丙方了解信用审核进度及结果。</li>
                        <li>1.6 甲方同意丙方向乙方提供其信用评估报告。</li>
                        <li>1.7
                            <b>如甲方实现借款需求，与甲方签署《借款协议》之出借人、或债权受让人向丙方申请查询甲方的个人信用评估报告，甲方同意丙方向出借人或债权受让人提供。</b>
                        </li>
                        <li>1.8
                            <b>甲方同意将本次申请个人信息与信用交易信息（包括不良信息）向金融信用信息基础数据库以及其他依法设立的征信机构提供并授权使用。</b>
                        </li>
                        <li>1.9 不论甲方是否实现借款需求，甲方不得要求乙方或丙方退还甲方为实现借款需求而提交的资料。</li>
                    </ol>

                    <h4>第二条 乙方的权利与义务</h4>
                    <ol className="list-unstyled">
                        <li>2.1 对于甲方向乙方提供的个人资料及其他各类信息，乙方应依法为甲方保密。</li>
                        <li>2.2 乙方应根据甲方的借款需求，以及丙方出具的甲方信用评估报告就借款额度、还款期限等事项提出借款方案。</li>
                    </ol>

                    <h4>第三条 丙方权利与义务</h4>
                    <ol className="list-unstyled">
                        <li>3.1 丙方应就甲方借款事宜提供全程信用审核服务，包括对甲方提供的个人信息及行为记录进行审核。</li>
                        <li>3.2 丙方应向乙方提供甲方的信用评估报告，作为乙方提出借款方案的依据。</li>
                        <li>3.3 丙方对甲方个人信息的使用应以信用审核目的为限。</li>
                        <li>3.4 出借人外的其他个人或组织可在法律允许的范围内向丙方查询甲方的个人信用评估报告。</li>
                        <li>3.5 对于甲方的个人资料及其他信息，丙方应依法为甲方保密，法律另有规定或本协议另有约定的除外。</li>
                    </ol>

                    <h4>第四条 费用</h4>
                    <p>甲方无须就本协议项下乙方提供的借款需求登记服务与丙方提供的信用审核服务支付任何费用，本协议另有约定或各方之间另有协议约定的除外。</p>

                    <h4>第五条 信息变更</h4>
                    <p>甲方如发生本人居住地址、常用手机号码、电子邮箱，或其他联系人手机号码的变更，应及时登录商通贷网站的个人中心，更新以上信息。否则，由此产生的损失应由甲方承担。</p>

                    <h4>第六条 争议解决</h4>
                    <p>各方一致同意，如发生争议，不论争议金额大小，均提交北京仲裁委员会适用北京仲裁委员会仲裁规则项下的简易程序进行仲裁。仲裁裁决为终局的，对各方均有拘束力。</p>

                    <h4>第七条 其他</h4>
                    <ol className="list-unstyled">
                        <li>7.1
                            本协议自三方签署后生效。三方约定,乙方及丙方以电子签章或者其他法律认可的的方式对协议内容进行确认签署，甲方以在线点击确定或者其他法律认可的方式对协议进行签署，双方不得以签署方式的不同，否认其法律效力。
                        </li>
                        <li>7.2 本协议的传真件、复印件和扫描件等与本协议具有同等法律效力。</li>
                        <li>7.3 本协议部分条款无效或不能履行，不影响其他条款的效力与履行。</li>
                        <li>7.4 本协议一式三份，甲方、乙方和丙方各执一份。</li>
                    </ol>

                    <br/>
                    <br/>
                    <br/>
                    <p className="text-center">（以下无正文）</p>
                    <br/>
                    <p>
                        <b>甲方（签字）：</b>
                    </p>
                    <br/>
                    <p>
                        <b>乙方（盖章）：宜信惠民投资管理（北京）有限公司</b>
                    </p>
                    <br/>
                    <p>
                        <b>丙方（盖章）：宜信普诚信用管理（北京）有限公司</b>
                    </p>
                    <br/>

                </div>
                <div onClick={this.props._Click} className="closePage">
                    <Button
                        style={{textAlign: 'right'}}
                        text='关闭'
                        material-button
                        tracking={{'event': 'close', 'lmt-track-id': 'loan-agree'}}
                    ></Button>
                </div>
            </div>
        );
    }
});
let AgreementB = React.createClass({
    render() {
        let noMargin = {
            marginBottom: '0px'
        };
        return (
            <div style={this.props.style} className="model">
                <h2 style={noMargin} className="text-center">信用卡电子账单等</h2>
                <h2 className="text-center ">数据信息收集使用协议</h2>
                <div className="scroll">
                    <p>
                        本协议所述“信用卡电子账单等数据信息收集使用”是指：商通贷根据客户的提额申请，经客户授权向客户指定的电子信箱抓取、收集客户信用卡电子账单数据信息，并以此作为对客户提升借款额度申请进行审核的依据。</p>
                    <p>
                        <b>第一章 客户有权拒绝商通贷的信息收集 </b>
                        <br/>

                        <span>
                            1.如您不希望接受商通贷通过您的电子信箱收集您的信用卡电子账单等信息，请关闭提供此服务的弹层。</span>
                        <br/>

                        <span>
                            2.如您未选择进行以上操作并坚持完成后续操作的，商通贷将视为您同意并授权商通贷通过您指定的电子信箱抓取、收集、分析您的信用卡电子账单等数据信息以完成本协议约定的服务内容。</span>
                        <br/>

                    </p>
                    <p>
                        <b>第二章 信息的收集范围 </b>
                        <br/>

                        <span>

                            商通贷将在取得您的明确授权后，通过本协议约定方式收集您的电子邮箱地址、邮箱密码以及信用卡电子账单等数据信息。
                            <br/>


                            在收集上述信息的过程中，商通贷可能会接触和收集到你的以下个人信息（可能包括您的敏感信息）：
                            <br/>
                            姓名、年龄、性别、职业、出生日期、传真号码、通讯地址、教育、收入状况，婚姻家庭状况、兴趣爱好等。</span>
                    </p>
                    <p>
                        <b> 第三章 信息的收集方式 </b>
                        <br/>

                        <span>


                            商通贷将通过您提供的电子邮箱地址及密码，抓取银行给您发送的信用卡电子账单的全部信息和数据。
                            <br/>


                            客户确认，客户向商通贷提供的电子邮箱地址由本人合法持有或使用，
                            <br/>
                            有关电子邮箱地址及密码信息真实、有效，并能有效接收客户本人的信用卡电子账单数据信息。</span>
                    </p>
                    <p>
                        <b> 第四章 信息的使用范围 </b>
                        <br/>

                        <span>

                            客户确认并同意，商通贷将以下方式使用您的个人信息：
                            <br/>


                            通过抓取、收集、分析客户信用卡电子账单数据信息，作为商通贷对客户提升借款额度申请进行审核的依据。
                            <br/>

                            将抓取的信息进行整合和处理，并按商通贷产品的不同功能和方式，通过商通贷产品向您呈现；
                            <br/>

                            商通贷承诺，不会以上述范围以外的任何其他形式使用因履行本协议收集到的您的个人信息。</span>
                    </p>
                    <p>
                        <b> 第五章 信息的披露和处置 </b>
                        <br/>


                        <span>
                            商通贷感谢您对我们的信任并承诺我们将会使用商业上一切合理、必要的技术和其他措施，帮助防止您的个人信息的丢失和被盗用。
                            <br/>


                            在征得您的同意后，商通贷可以对外披露您的个人信息。
                            <br/>

                            依据法律法规规定或应司法、行政执法部门的要求等，商通贷需要向其披露您的个人信息。
                            <br/>

                            重大交易。如果涉及合并、收购或资产出售等交易需要披露您的个人信息的，商通贷将确保有关信息接收方受到与本协议同等的信息保密义务的约束。</span>
                    </p>
                    <p>
                        <b> 第六章 免责条款 </b>
                        <br/>


                        <span>

                            1.客户同意，如因您提供的电子邮箱地址和密码不正确、或指定电子信箱内无有效信用卡电子账单数据信息等原因，使商通贷不能按本协议约定完成有关数据收集工作，并因此导致您不能通过提升额度申请审核的，将由您自行承担不利后果。
                            <br/>

                            2.客户承诺，客户向商通贷提供的应是客户本人合法持有的电子信箱，对于因客户擅自提供任何第三方电子信箱地址导致的全部法律后果，将由客户自行承担。
                            <br/>

                            3.客户充分了解，商通贷根据您的授权收集指定信息的过程中，可能会接触或收集到的您的其他个人信息，客户同意，上述接触或收集行为不违反本协议约定，也不构成对您及任何其他受影响方个人隐私、商业秘密的侵犯。
                            <br/>

                            4.商通贷依据本协议收集、取得的客户信息，将作为商通贷对客户提升借款额度申请进行审核的依据，为避免误解，客户应充分了解，商通贷取得上述信息并不意味着客户必然通过商通贷提升借款额度审核，客户是否通过上述审核将取决于商通贷根据相关业务规程进行独立综合判断。
                            <br/>

                            5.在所适用的法律允许的范围内，商通贷均无须就用户个人信息的丢失和/或损坏及任何间接的、附带的、特殊的、后果性的损失向用户负责赔偿。</span>
                    </p>

                    <p>
                        <b> 第七章 执行和变更 </b>
                        <br/>


                        <span>

                            客户了解并同意，商通贷有权随时对本协议内容进行单方面的变更，并以在商通贷网站公告的方式予以公布，
                            <br/>

                            无需另行单独通知您；若您在本协议内容公告变更后继续使用本服务的，表示您已充分阅读、理解并接受修改后的协议内容，
                            <br/>

                            也将遵循修改后的协议内容使用本服务；若您不同意修改后的协议内容，您应立刻停止使用本服务。</span>
                    </p>
                    <p>
                        <b> 第八章 适用法律 </b>
                        <br/>


                        <span>

                            本协议条款的解释，效力及纠纷的解决，适用于中华人民共和国大陆地区法律、法规。若客户和商通贷之间发生任何纠纷或争议，首先应友好协商解决，协商不成的，客户在此完全同意将纠纷或争议提交北京市朝阳区人民法院管辖。</span>
                    </p>
                    <p>
                        <b> 第九章 信息的收集范围 </b>
                        <br/>


                        <span>
                            如果您对本协议有任何问题，请拨打客服电话4008-1818-68联系我们，我们将尽最大努力在合理时间内回复您。

                            客户确认，已认真阅读本协议全部条款，理解上述约定的意义及法律后果，并在此声明：</span>
                    </p>
                    <br/>
                    <b>同意商通贷通过本协议约定方式收集本人的电子邮箱地址、邮箱密码以及信用卡电子账单等数据信息以从事本协议约定的服务。</b>


                </div>
                <div onClick={this.props._Click} className="closePage">
                    <Button style={{textAlign: 'right'}}
                            text="关闭"
                            material-button
                            tracking={{'event': 'close', 'lmt-track-id': 'creditCard-agree'}}
                    ></Button>
                </div>
            </div>
        )
    }
});
var Agree = React.createClass({
    getInitialState: function () {
        return {
            show: false,
            val: true,
            checked: true,
            error: ''
        };
    },
    handleClose: function () {
        this.setState({show: false});
    },
    showPage: function (e) {
        this.setState({
            show: true
        });
        e.preventDefault();
    },
    toValidate: function (event, value) {

        var self = this;
        var validate = this.props.validate;
        var hasError = 0;
        if (value) {
            validate = value;
            this.setState({
                val: event
            });
        } else {
            this.setState({
                val: event.target.checked
            });
        }
        for (var i of Object.keys(validate)) {
            if (formValidator[i](event.target ? event.target.checked : event) === false) {
                self.setState({error: validate[i]});
                hasError += 1;
            } else {
                self.setState({error: ''});
            }
        }

        return hasError;
    },
    render: function () {
        var showStyle = {};
        if (this.state.show) {
            showStyle = {
                display: 'block'

            };
        } else {
            showStyle = {
                display: 'none'
            };
        }
        var defaultStyle = {
            width: '100%',
            fontSize: '14px',
            lineHeight: '1.5em',
            paddingLeft: '2%',
            marginBottom: '10px'
        };
        var labelStyle = {
            overflow: 'hidden'
        };
        var styleinput = {
            float: 'left'
        };
        var iStyle = {
            color: 'rgb(239, 120, 138)',
            fontStyle: 'normal'
        };
        var emStyle = {
            color: 'rgb(239, 120, 138)',
            fontSize: '12px',
            lineHeight: '2em',
            float: 'left'
        };
        let props = this.props;
        let style = props.style || {};
        style = $.extend({}, defaultStyle, style);
        return (
            <div style={style}>
                {
                    this.props.text === '《借款需求登记与信用审核服务协议》' ?
                        <AgreementA style={showStyle} _Click={this.handleClose}></AgreementA> : <div></div>
                }
                {
                    this.props.text === '《信用卡电子账单等数据信息收集使用协议》' ?
                        <AgreementB style={showStyle} _Click={this.handleClose}></AgreementB>
                        : <div></div>
                }
                <label style={labelStyle}>
                    <input style={styleinput}
                           type="checkbox"
                           data-name={this.props['data-name']}
                           ref="validate"
                           validate={this.props.validate}
                           onChange={this.toValidate}
                           toValidate={this.toValidate}
                           defaultChecked={this.state.val}
                           value={this.state.val}/>
                    <p>
                        同意并接受
                        <i onClick={this.showPage} style={iStyle}>
                            {this.props.text}
                        </i>
                    </p>
                </label>
                <em style={emStyle}>
                    {this.state.error}
                </em>
            </div>
        );
    }
});
module.exports = Agree;

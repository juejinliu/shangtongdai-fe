/**
 * @file message
 * @auther Created by malin on 15/10/26.
 */
module.exports = {
    global: {
        //输入框的placeholder
        input: {
            phone: '请输入手机号',
            account: '请输入账户名',
            verification: '请输入验证码',
            password2: '请输入独立密码',
            setPassword: '设置登录密码',
            invitation: '邀请码（可选）',
            phoneEmail: '请输入手机号/邮箱',
            password: '请输入登录密码',
            creditcardEmail: '请输入信用卡邮箱',
            emailPassword: '邮箱登录密码',
            taobaoBuyerAccount: '淘宝买家账户用户名',
            imageAuthCode: '请输入图像验证码'
        },
        //按钮
        button: {
            sure: '确定',
            verification: '获取验证码',
            submitVerification: '提交验证码',
            submitPassword2: '提交独立密码',
            regist: '立即注册',
            login: '立即登录',
            fogotPassword: '忘记密码？',
            backToLogin: '返回登录',
            resetPassword: '重置密码',
            sending: '提交中',
            loanAddInfo: '补充个人消费',
            submit: '提交申请',
            next: '下一步'
        },
        //错误提示
        errorMessage: {
            account: '请输入账户名',
            sendOK: '验证码发送成功',
            verification: '请输入验证码',
            password2: '请输入独立密码',
            net: '请检查您的网络或稍后再试',
            abort: '您取消了请求，请重新发送',
            require: '该项为必填项',
            requirePassword: '该项为必填项',
            phone: '请输入正确的手机号',
            password: '请输入至少8位的密码',
            setPassword: '请设置至少8位的密码',
            setEmail: '请输入正确的邮箱地址',
            setEmailPassword: '请输入邮箱登录密码',
            agree: '请勾选协议',
            errorButton: '出错了',
            errorFunction: function () {
                console.log('error props');
            },
            errorTracking: {
                'lmt-track-id': window.location.href
            }
        },

        popup: {
            success: '成功'
        }
    },

    //申请相关页面
    loan: {
        loanAddInfoTitle: '补充个人消费账号',
        loanAddInfoText: '请于1周内补全下列信息，过期将视为自动放弃，30日内无法再次申请'
    },

    //导航页
    nav: {
        estimateIcon: '店铺估值',
        loanIcon: '我要贷款',
        processingIcon: '申请进度',
        planIcon: '还款计划',
        inviteIcon: '邀请好友',
        personalIcon: '个人中心'
    },
    //个人中心
    personal: {
        myRedPackageIcon: '我的红包',
        myWalletIcon: '我的钱包',
        accountSettingIcon: '账户设置'
    },
    //个人信息
    personalInfo: {
        telText: '手机号',
        emailText: '邮箱地址',
        passwordText: '密码修改',
        logoutText: '退出登录'
    },
    userStatus: {
        addIndividualInfo: '补充个人征信信息'
    },
    registLogin: {
        navNewPerson: '我是新用户',
        navOldPerson: '我是老用户',
        normalLogin: '普通登录',
        verificationLogin: '手机验证码登录'
    },
    individualCredit: {
        individualCredit: 'INDIVIDUALCREDIT',
        creditcard: 'CREDITCARD',
        taobaoBuyer: 'TAOBAOBUYER',
        report: 'CREDITREPORT',
        validate: 'VALIDATE',
        estimateCreditcard: '添加个人信用卡账号',
        estimateTaobaoBuyer: '添加淘宝买家账号',
        estimateReport: '添加个人征信账号',
        estimateCreditcardOK: '个人信用卡',
        estimateTaobaoBuyerOK: '淘宝买家',
        estimateReportOK: '个人征信',
        addReportButton: '添加个人信用报告（可选）',
        jumpButton: '跳过',
        viewOperationGuideButton: '查看操作指南',
        jumpIndividualCreditButton: '补充个人消费',
        hasGotCodeButton: '我已获取验证码',

        titleIntroduce: '其他平台',
        titleVerify: '验证店铺',
        titleTaobaoBuyer: '淘宝买家',
        titleCreditcardFinish: '个人消费数据添加完毕',
        titleTaobaoSellerRefuse: '请继续添加账号',
        titleReport: '个人征信报告',
        titleReportOperationGuideButton: '操作指南',

        knonw: '我知道了',
        notSeller: '我不是卖家',
        loginAndAnalysis: '登录并分析',
        agree: '《信用卡电子账单等数据信息收集使用协议》',
        question: '常见问题',
        toLoan: '直接申请',
        wrongPassword: '您输入的密码和账户名不匹配，请重新输入。',
        wrongVerifycode: '您输入的验证码错误，请重新输入。',
        unknowError: '抱歉数据分析失败，请重试一次或再换一个账号',
        taobaoBuyerError: '抱歉，该账号的数据不符合我们的申请要求，无法通过个人消费进行申请',
        reportError: '抱歉，该账号的数据不符合我们的申请要求，无法通过个人消费进行申请',
        loadingImgLink: 'https://shangdai.yixin.com/imgs/estimate-loading.gif',
        loadingText: '分析数据中，预计需要10-30秒，请耐心等待'

    },
    tracking: {
        individualCredit: {
            notSeller: 'notSeller-mobile',                                                      //我不是卖家
            creditcardQuest: 'creditcardQuest-mobile',                                          //信用卡常见问题
            reportQuest: 'reportQuest-mobile',                                                      //报告常见问题
            creditcardCancelRequest: 'creditcardCancelRequest-mobile',                           //信用卡页面取消请求
            taobaoBuyerCancelRequest: 'taobaoBuyerCancelRequest-mobile',                           //淘宝买家页面取消请求
            reportCancelRequest: 'reportCancelRequest-mobile',                           //信用报告页面取消请求
            creditcardBtnChoose: 'creditcard-btn-choose-mobile',                        //选择页面点击继续添加信用卡
            taobaoBuyerBtnChoose: 'taobaoBuyer-btn-choose-mobile',                        //选择页面点击继续添加淘宝买家账号
            reportBtnChoose: 'report-btn-choose-mobile',                        //选择页面点击继续添加征信报告
            creditcardLoginAndAnalysis: 'creditcard-loginAndAnalysis-mobile',            //添加信用卡登录并分析第一步按钮
            creditcardCheckcodeButton: 'creditcardCheckcodeButton-mobile',           //添加信用卡输入图片验证码提交按钮
            creditcardPassword2Button: 'creditcardPassword2Button-mobile',           //添加信用卡输入2次密码提交按钮

            taobaoBuyerLoginAndAnalysis: 'taobaoBuyerLoginAndAnalysis-mobile',           //添加淘宝买家登录并分析第一步按钮
            taobaoBuyerCheckcodeButton: 'taobaoBuyerCheckcodeButton-mobile',           //添加淘宝买家输入图片验证码提交按钮
            taobaoBuyerPassword2Button: 'taobaoBuyerPassword2Button-mobile',           //添加淘宝买家输入2次密码提交按钮

            reportSubmitButton: 'reportLoginAndAnalysis-mobile',                             //信用报告短信验证码确定按钮
            reportCheckcodeButton: 'reportCheckcodeButton-mobile',           //添加信用报告输入图片验证码提交按钮
            reportPassword2Button: 'reportPassword2Button-mobile',           //添加信用报告输入2次密码提交按钮

            toLoan: 'taobaoSellerRefuseToLoan-mobile',                           //淘宝卖家拒绝提示页立即申请
            toChoose: 'taobaoSellerRefuseToChoose-mobile',                           //淘宝卖家拒绝去添加个人信息

            creditcardLoadSuccess: 'CREDITCARD-load-success-mobile',                //信用卡添加成功
            creditcardLoadFail: 'CREDITCARD-load-fail-mobile',                      //信用卡添加失败
            taobaoBuyerLoadSuccess: 'TAOBAOBUYER-load-success-mobile',                  //淘宝买家添加成功
            taobaoBuyerLoadFail: 'TAOBAOBUYER-load-fail-mobile',                            //淘宝买家添加失败
            ReportLoadSuccess: 'CREDITREPORT-load-success-mobile',                          //信用报告添加成功
            ReportLoadFail: 'CREDITREPORT-load-fail-mobile'                             //信用报告添加失败

        }
    }
};

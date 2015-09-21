/**
 * @require common:widget/oui/alice/poptip/1.1.1/poptip.css
 */

define(function (require, exports, module) {
  var $ = require("jquery");
  require("validate");
  var jQuery = $;
  // require("ui-poptip");
  var form = {};
  form.err = {
    required: "不能为空",
    remoteCode: "验证码输入错误",
    isEmail: "请输入有效的邮箱地址",
    equalPsw: "您输入的密码不一致",
    length: "字数超过限制",
    minPswLength: "长度为6-16个字符之间",
    maxPswLength: "长度为6-16个字符之间",
    isMobile: "请正确输入手机号码",
    isMobileOrEmail: "请输入正确的邮箱地址或手机号码",
    isNickName: "昵称只能由中文、英文字母、数字、下划线组成",
    isRealName:"包含非法字符",
    isHasUnderlineFrontEnd: "不能以下划线开头或结尾",
    isNickNameLength: "长度为4-16个字符之间",
    isHasYX: "前缀请不要使用“YX_”,且后缀请不要使用“_yx”",
    nickNameRemote: "昵称已存在",
    userNameRemote: "该手机号已经存在",
    isPassWord: "包含非法字符",
    isPassNotAllNum:"密码不能全为数字",
    isPassNotRepeat:"密码不能为同一个字符",
    equalTo: "您输入的密码不一致",
    agree: "请同意我们的条款",
    contractPay: "支付前请阅读并同意协议",
    maxLoanTitle: "借款标题不能超过14字",
    isOneDecimal: "利率最大保留小数点后1位",
    isRateOver: "您输入的借款年利率超出范围，请重新输入！",
    minLoanDescription: "借款描述应限制在20-500字之间",
    maxLoanDescription: "借款描述应限制在20-500字之间",
    minRealNameLength: "姓名长度在2-32字之间",
    maxRealNameLength: "姓名长度在2-32字之间",
    isPostCode: "邮政编码须为6位数字",
    isIDNum: "请正确输入您的二代身份证号码",
    isPhone: "请正确输电话号码",
    isUrl: "请输入正确的网址",
    isAmount: "请输入正确的金额",
    minAmount: "单笔充值金额应大于1元且小于或等于30万元",
    maxAmount: "单笔充值金额应大于1元且小于或等于30万元",
    bankRequired: "请选择充值方式",
    userBankId: "请选择提现银行卡",
    isEnough: "您的账户余额不足",
    equalToBank: "您输入的银行卡号不一致",
    bankCardLength: "银行卡号须为12-19位数字",
    isBankCard: "银行卡号输入错误",
    isCardDeposit: "开户行只能由中文、英文字母、数字、小括号组成",
    maxCashPasswordLength: "密码长度不超过16位",
    depositLength: "开户行的名称限制在64字以内",
    isEducationCode: "学历在线验证码须为12位数字",
    isIntNum: "请输入正整数",
    codeLength: "请输入4位验证码",
    minCachLength:"提现金额不能小于1元",
    maxNumberLength : "提现金额小于15位数字",
    intention:"请选择角色",
    phoneCodeMsg:"手机验证码不能为空",
    phoneCodeMsgLength:"验证码为4位",
    loanProductType: '请选择您要申请的借款产品'
  };

  //form.tip可以内定一些tip消息，已不推荐在form.js中定义了，所以为空
  form.tip = {};

  form.checkCode = function (opt) {
    opt.ele.rules("add", {remote: {
      url: opt.url || "/account/checkCode.action",
      data: opt.data,
      dataFilter: function (data) {
        var json = jQuery.parseJSON(data);
        if (json.result == "true") {
          if(opt.success && typeof opt.success =="function"){
            opt.success.call(this,data);
          }
          return true;
        }else{

          var oldCodeLabel = $("#code-label");
          var newCodeLabel = '<label class="isMaxCodeNum error">'+ json.message +'</label>';

          if( json.message != null ){

            if( !oldCodeLabel.parent('.fn-hide').length ){
              oldCodeLabel.wrap('<div class="fn-hide">');
            }

            if( $('.isMaxCodeNum').length ){
              $('.isMaxCodeNum').show();
            }else{
              oldCodeLabel.parent('div').after(newCodeLabel);
            }

          }else{

            if( oldCodeLabel.parent('.fn-hide').length ){
              oldCodeLabel.unwrap('<div class="fn-hide">');
            }
            $('.isMaxCodeNum').hide();
          }
        }

        if(opt.failed && typeof opt.failed =="function"){
          opt.failed.call(this,data);
        }
        return false;
      }
    }, messages: {
      remote: form.err.remoteCode
    }});
  };


  form.validateData = {
    errorPlacement: function (error, element) {
      error.appendTo(element.parent());
    },
    rules: {
      register: {
        nickName: {
          required: true,
          isNickName: true,
          isHasUnderlineFrontEnd: true,
          isNickNameLength: true,
          isHasYX: true,
          remote: "/checkUserNickname!checkNickname.action"
        },
        username: {
          required: true,
          isMobile: true,
          remote: "/checkEmail.action"
        },
        password: {
          required: true,
          minlength: 6,
          maxlength: 16,
          isPassWord: true,
          isPassNotAllNum:true,
          isPassNotRepeat:true
        },
        confirm_password: {
          required: true,
          equalTo: "#password"
        },
        randCode: {
          required: true,
          minlength: 4,
          maxlength: 4
        },
        agree: {
          required: true
        },
        intention:{
          required:true
        }
      },
      mobileCodeForReg: {
        mobileCode: {
          required: true,
          minlength: 4,
          maxlength: 4
        }
      },
      login: {
        j_username: {
          required: true,
          isMobileOrEmail: true
        },
        username:{
          required: true,
          isMobileOrEmail: true
        },
        j_password: {
          required: true
        },
        password: {
          required: true
        },
        j_code: {
          required: true
        }
      },
      //loan page
      loaninfo: {
        borrowTitle: {
          required: true,
          maxlength: 14
        },
        borrowAmount: {
          required: true,
          isBorrowAmount: true
        },
        apr: {
          required: true,
          isOneDecimal: true,
          isRateOver: true
        },
        repayTime: {
          required: true
        },
        endDate: {
          required: true
        },
        borrowDesc: {
          required: true,
          minlength: 20,
          maxlength: 500
        },
        agree_contract: {
          required: true
        },
        loanProductType: {
          required: true
        }
      },
      borrowerinfo: {
        //base info
        realName: {
          required: true,
          minlength: 2,
          maxlength: 32
        },
        idNo: {
          required: true,
          isIDNum: true
        },
        graduation: {
          required: true
        },
        university: {
          maxlength: 20
        },
        homeProvince: {
          required: true
        },
        homeCity: {
          required: true
        },
        liveProvince: {
          required: true
        },
        liveCity: {
          required: true
        },
        address: {
          required: true,
          maxlength: 30
        },
        postCode: {
          required: true,
          isPostCode: true
        },
        phone: {
          isPhone: true
        },
        //family info
        marriage: {
          required: true
        },
        hasChild: {
          required: true
        },
        urgentContact: {
          required: true,
          maxlength: 32
        },
        urgentRelation: {
          required: true,
          maxlength: 10
        },
        urgentMobile: {
          required: true,
          isMobile: true
        },
        urgentContact2: {
          required: true,
          maxlength: 32
        },
        urgentRelation2: {
          required: true,
          maxlength: 10
        },
        urgentMobile2: {
          required: true,
          isMobile: true
        },
        //workinfo
        office: {
          required: true,
          maxlength: 32
        },
        jobType: {
          required: true
        },
        position: {
          required: true,
          maxlength: 10
        },
        province: {
          required: true
        },
        city: {
          required: true
        },
        officeType: {
          required: true
        },
        officeDomain: {
          required: true
        },
        officeScale: {
          required: true
        },
        workYears: {
          required: true
        },
        salary: {
          required: true
        },
        workPhone: {
          required: true,
          isPhone: true
        },
        workEmail: {
          required: true,
          isEmail: true
        },
        officeAddress: {
          required: true,
          maxlength: 32
        },
        //assetinfo
        hasHouse: {
          required: true
        },
        hasLoan: {
          required: true
        },
        hasCar: {
          required: true
        },
        carLoan: {
          required: true
        },
        carBrand: {
          maxlength: 15
        },
        carNumber: {
          maxlength: 8
        }
      },
      userbasic: {
        graduation: {
          required: true
        },
        university: {
          maxlength: 20
        },
        marriage: {
          required: true
        },
        address: {
          required: true,
          maxlength: 30
        },
        officeDomain: {
          required: true
        },
        officeScale: {
          required: true
        },
        position: {
          required: true,
          maxlength: 10
        },
        salary: {
          required: true
        }
      },
      recharge: {
        //账户充值金额
        bank: {
          required: true
        },
        free: {
          required: false
        },
        amount: {
          required: true,
          isAmount: true,
          min: 1,
          max: 300000
        }
      },
      withdraw: {
        amount: {
          required: true,
          isAmount: true,
          maxlength: 15,
          min: 1,
          isEnough: true
        },
        cashPassword: {
          required: true,
          maxlength: 16,
          isPassWord: true
        },
        userBankId: {
          required: true
        }
      },
      addcard: {
        bankDataId: {
          required: true
        },
        address: {
          required: true
        },
        deposit: {
          required: true,
          maxlength: 64,
          isCardDeposit: true
        },
        cardId: {
          required: true,
          minlength: 12,
          maxlength: 19,
          isBankCard: true
        },
        reBankCard: {
          required: true,
          equalTo: "#cardId",
          isBankCard: true
        },
        validateCode: {
         required: true,
         minlength: 4,
         maxlength: 4
       }
      },
      modpsw: {
        oldPassword: {
          required: true,
          minlength: 6,
          maxlength: 16
        },
        newPassword: {
          required: true,
          isPassWord: true,
          minlength: 6,
          maxlength: 16
        },
        newPassword2: {
          required: true,
          minlength: 6,
          maxlength: 16,
          equalTo: "#newPassword"
        }
      },
      modCashPsw: {
        cashPassword: {
          required: true,
          minlength: 6,
          maxlength: 16
        },
        newCashPwd: {
          required: true,
          isPassWord: true,
          minlength: 6,
          maxlength: 16
        },
        newCashPwd2: {
          required: true,
          minlength: 6,
          maxlength: 16,
          equalTo: "#newCashPwd"
        }
      },
      findCashPswStepOne: {
        validateCode: {
          required: true
        }
      },
      findCashPswStepTwo: {
        newCashPwd: {
          required: true,
          isPassWord: true,
          minlength: 6,
          maxlength: 16
        },
        newCashPwd2: {
          required: true,
          minlength: 6,
          maxlength: 16,
          equalTo: "#newCashPwd"
        }
      },
      modMobileByPhoneStepOne: {
        validateCode: {
          required: true
        },
        cashPassword: {
          required: true
        }
      },
      modMobileByPhoneStepTwo: {
        phone: {
          required: true,
          isMobile: true
        },
        validateCode: {
          required: true
        }
      },
      modMobileByIdStepOne: {
        idNo: {
          required: true,
          isIDNum: true
        },
        cashPassword: {
          required: true
        }
      },
      modMobileByIdStepTwo: {
        phone: {
          required: true,
          isMobile: true
        },
        validateCode: {
          required: true
        }
      },
      emailUpdateByOldStepOne: {
        code: {
          required: true,
          remote: {
            url: "/account/checkCode.action",
            dataFilter: function (data) {
              var json = jQuery.parseJSON(data);
              if (json.result == "true") {
                return true;
              }
              return false;
            }
          }
        }
      },
      emailUpdateByOldStepTwo: {
        email: {
          required: true,
          isEmail: true
        }
      },
      emailUpdateByMobileStepOne: {
        code: {
          required: true
        },
        idCard: {
          required: true,
          isIDNum: true
        }
      },
      setId: {
        realName: {
          required: true,
          isRealName:true
        },
        idNo: {
          required: true,
          isIDNum: true
        }
      },
      setEmail: {
        email: {
          required: true,
          isEmail: true
        }
      },
      setMobile: {
        mobile: {
          required: true,
          isMobile: true
        },
        validCode: {
          required: true
        }
      },
      setCashPwd: {
        cashPwd: {
          required: true,
          isPassWord: true,
          minlength: 6,
          maxlength: 16
        },
        cashPwd2: {
          required: true,
          equalTo: "#cashPwd",
          minlength: 6,
          maxlength: 16
        }
      },
      setNickName: {
        nickName: {
          required: true,
          isNickName: true,
          isHasUnderlineFrontEnd: true,
          isNickNameLength: true,
          isHasYX: true,
          remote: "/checkUserNickname!checkNickname.action"
        }
      },
      creditWeibo: {
        credit_web: {
          required: true
        }
      },
      creditVideo: {
        usemail: {
          required: true
        }
      },
      creditGraduation: {
        validCode: {
          required: true,
          isEducationCode: true
        }
      },
       notLoginFindPsw: {
        mobileOrEmail: {
          required: true,
          isMobileOrEmail: true
        },
        code: {
          required: true,
          minlength: 4,
          maxlength: 4,
          remote: {
            url: "/account/checkCode.action",
            dataFilter: function (data) {
              var json = jQuery.parseJSON(data);
              if (json.result == "true") {
                return true;
              }
              return false;
            }
          }
        }
      },
      notLoginFindPswByEmail: {
        email: {
          required: true,
          isEmail: true
        },
        code: {
          required: true,
          minlength: 4,
          maxlength: 4,
          remote: {
            url: "/account/checkCode.action",
            dataFilter: function (data) {
              var json = jQuery.parseJSON(data);
              if (json.result == "true") {
                return true;
              }
              return false;
            }
          }
        }
      },
      notLoginFindPswByMobile: {
        mobile: {
          required: true,
          isMobile: true
        },
        code: {
          required: true,
          minlength: 4,
          maxlength: 4,
          remote: {
            url: "/account/checkCode.action",
            dataFilter: function (data) {
              var json = jQuery.parseJSON(data);
              if (json.result == "true") {
                return true;
              }
              return false;
            }
          }
        }
      },
      notLoginFindPswByEmailCode: {
        validCode: {
          required: true
        }
      },
      notLoginFindPswByMobileCode: {
        validCode: {
          required: true
        }
      },
      notLoginFindPswResetPsw: {
        password: {
          required: true,
          isPassWord: true,
          minlength: 6,
          maxlength: 16
        },
        password2: {
          required: true,
          equalTo: "#password"
        }
      },
      calculator: {
        borrowAmount: {
          required: true,
          isBorrowAmount: true
        },
        yearRate: {
          required: true,
          isOneDecimal: true,
          isRateOver: true
        }
      },
      ucode:{
        ucodeSerial:{
          required:true
        }
      },
      couponCode: {
        couponCode:{
          required:true
        }
      },
      accontRsvConfirm:{
        contract:{
          required:true
        }
      },
      confirmReserve:{
        randCode:{
          required:true
        },
        joinContract:{
          required:true
        },
        reserveContract:{
          required:true
        }
      }
    },
    messages: {
      register: {
        nickName: {
          required: form.err.required,
          isNickName: form.err.isNickName,
          isHasUnderlineFrontEnd: form.err.isHasUnderlineFrontEnd,
          isNickNameLength: form.err.isNickNameLength,
          isHasYX: form.err.isHasYX,
          remote: form.err.nickNameRemote
        },
        username: {
          required: form.err.required,
          isMobile: form.err.isMobile,
          remote: form.err.userNameRemote
        },
        password: {
          required: form.err.required,
          isPassWord: form.err.isPassWord,
          isPassNotAllNum:form.err.isPassNotAllNum,
          isPassNotRepeat:form.err.isPassNotRepeat,
          minlength: form.err.minPswLength,
          maxlength: form.err.maxPswLength
        },
        confirm_password: {
          required: form.err.required,
          equalTo: form.err.equalTo
        },
        randCode: {
          required: form.err.required,
          minlength: form.err.codeLength,
          maxlength: form.err.codeLength
        },
        agree: {
          required: form.err.agree
        },
        intention:{
          required:form.err.intention
        }
      },
      mobileCodeForReg: {
        mobileCode: {
          required: form.err.required,
          minlength: form.err.codeLength,
          maxlength: form.err.codeLength
        }
      },
      login: {
        j_password: {
          required: form.err.required
        },
        password: {
          required: form.err.required
        },
        j_username: {
          required: form.err.required,
          isMobileOrEmail: form.err.isMobileOrEmail
        },
        username: {
          required: form.err.required,
          isMobileOrEmail: form.err.isMobileOrEmail
        },
        j_code: {
          required: form.err.required
        }
      },
      //loan page
      loaninfo: {
        borrowTitle: {
          required: form.err.required,
          maxlength: form.err.maxLoanTitle
        },
        borrowAmount: {
          required: form.err.required
        },
        apr: {
          required: form.err.required,
          isOneDecimal: form.err.isOneDecimal,
          isRateOver: form.err.isRateOver
        },
        repayTime: {
          required: form.err.required
        },
        endDate: {
          required: form.err.required
        },
        borrowDesc: {
          required: form.err.required,
          minlength: form.err.minLoanDescription,
          maxlength: form.err.maxLoanDescription
        },
        agree_contract: {
          required: form.err.agree
        },
        loanProductType: {
          required: form.err.loanProductType
        }
      },
      borrowerinfo: {
        //base info
        realName: {
          required: form.err.required,
          minlength: form.err.minRealNameLength,
          maxlength: form.err.maxRealNameLength
        },
        idNo: {
          required: form.err.required,
          isIDNum: form.err.isIDNum
        },
        graduation: {
          required: form.err.required
        },
        university: {
          maxlength: form.err.length
        },
        homeProvince: {
          required: form.err.required
        },
        homeCity: {
          required: form.err.required
        },
        liveProvince: {
          required: form.err.required
        },
        liveCity: {
          required: form.err.required
        },
        address: {
          required: form.err.required,
          maxlength: form.err.length
        },
        postCode: {
          required: form.err.required,
          isPostCode: form.err.isPostCode
        },
        phone: {
          isPhone: form.err.isPhone
        },
        //family info
        marriage: {
          required: form.err.required
        },
        hasChild: {
          required: form.err.required
        },
        urgentContact: {
          required: form.err.required
        },
        urgentRelation: {
          required: form.err.required,
          maxlength: form.err.length
        },
        urgentMobile: {
          required: form.err.required,
          isMobile: form.err.isMobile
        },
        urgentContact2: {
          required: form.err.required,
          maxlength: form.err.length
        },
        urgentRelation2: {
          required: form.err.required,
          maxlength: form.err.length
        },
        urgentMobile2: {
          required: form.err.required,
          isMobile: form.err.isMobile
        },
        //workinfo
        office: {
          required: form.err.required,
          maxlength: form.err.length
        },
        jobType: {
          required: form.err.required
        },
        position: {
          required: form.err.required,
          maxlength: form.err.length
        },
        province: {
          required: form.err.required
        },
        city: {
          required: form.err.required
        },
        officeType: {
          required: form.err.required
        },
        officeDomain: {
          required: form.err.required
        },
        officeScale: {
          required: form.err.required
        },
        workYears: {
          required: form.err.required
        },
        salary: {
          required: form.err.required
        },
        workPhone: {
          required: form.err.required,
          isPhone: form.err.isPhone
        },
        workEmail: {
          required: form.err.required,
          isEmail: form.err.isEmail
        },
        officeAddress: {
          required: form.err.required,
          maxlength: form.err.length
        },
        //assetinfo
        hasHouse: {
          required: form.err.required
        },
        hasLoan: {
          required: form.err.required
        },
        hasCar: {
          required: form.err.required
        },
        carLoan: {
          required: form.err.required
        },
        carBrand: {
          maxlength: form.err.length
        },
        carNumber: {
          maxlength: form.err.length
        }
      },
      userbasic: {
        graduation: {
          required: form.err.required
        },
        university: {
          maxlength: form.err.length
        },
        marriage: {
          required: form.err.required
        },
        address: {
          required: form.err.required,
          maxlength: form.err.length
        },
        officeDomain: {
          required: form.err.required
        },
        officeScale: {
          required: form.err.required
        },
        position: {
          required: form.err.required,
          maxlength: form.err.length
        },
        salary: {
          required: form.err.required
        }
      },
      recharge: {
        //账户充值金额
        bank: {
          required: form.err.bankRequired
        },
        amount: {
          required: form.err.required,
          isAmount: form.err.isAmount,
          min: form.err.minAmount,
          max: form.err.maxAmount
        }
      },
      withdraw: {
        amount: {
          required: form.err.required,
          isAmount: form.err.isAmount,
          min: form.err.minCachLength,
          maxlength: form.err.maxNumberLength,
          isEnough: form.err.isEnough
        },
        cashPassword: {
          required: form.err.required,
          maxlength: form.err.maxCashPasswordLength,
          isPassWord: form.err.isPassWord
        },
        userBankId: {
          required: form.err.userBankId
        }

      },
      addcard: {
        bankDataId: {
          required: form.err.required
        },
        address: {
          required: form.err.required
        },
        deposit: {
          required: form.err.required,
          maxlength: form.err.depositLength,
          isCardDeposit: form.err.isCardDeposit
        },
        cardId: {
          required: form.err.required,
          minlength: form.err.bankCardLength,
          maxlength: form.err.bankCardLength,
          isBankCard: form.err.isBankCard
        },
        reBankCard: {
          required: form.err.required,
          equalTo: form.err.equalToBank,
          isBankCard: form.err.isBankCard
        },
        validateCode: {
         required: form.err.phoneCodeMsg,
         minlength:form.err.phoneCodeMsgLength,
         maxlength:form.err.phoneCodeMsgLength
        }

      },
      modpsw: {
        oldPassword: {
          required: form.err.required,
          minlength: form.err.minPswLength,
          maxlength: form.err.maxPswLength
        },
        newPassword: {
          required: form.err.required,
          isPassWord: form.err.isPassWord,
          minlength: form.err.minPswLength,
          maxlength: form.err.maxPswLength
        },
        newPassword2: {
          required: form.err.required,
          minlength: form.err.minPswLength,
          maxlength: form.err.maxPswLength,
          equalTo: form.err.equalTo
        }
      },
      modCashPsw: {
        cashPassword: {
          required: form.err.required,
          minlength: form.err.minPswLength,
          maxlength: form.err.maxPswLength
        },
        newCashPwd: {
          required: form.err.required,
          isPassWord: form.err.isPassWord,
          minlength: form.err.minPswLength,
          maxlength: form.err.maxPswLength
        },
        newCashPwd2: {
          required: form.err.required,
          minlength: form.err.minPswLength,
          maxlength: form.err.maxPswLength,
          equalTo: form.err.equalTo
        }
      },
      findCashPswStepOne: {
        validateCode: {
          required: form.err.required
        }
      },
      findCashPswStepTwo: {
        newCashPwd: {
          required: form.err.required,
          isPassWord: form.err.isPassWord,
          minlength: form.err.minPswLength,
          maxlength: form.err.maxPswLength
        },
        newCashPwd2: {
          required: form.err.required,
          minlength: form.err.minPswLength,
          maxlength: form.err.maxPswLength,
          equalTo: form.err.equalTo
        }
      },
      modMobileByPhoneStepOne: {
        validateCode: {
          required: form.err.required
        },
        cashPassword: {
          required: form.err.required
        }
      },
      modMobileByPhoneStepTwo: {
        phone: {
          required: form.err.required,
          isMobile: form.err.isMobile
        },
        validateCode: {
          required: form.err.required
        }
      },
      modMobileByIdStepOne: {
        idNo: {
          required: form.err.required,
          isIDNum: form.err.isIDNum
        },
        cashPassword: {
          required: form.err.required
        }
      },
      modMobileByIdStepTwo: {
        phone: {
          required: form.err.required,
          isMobile: form.err.isMobile
        },
        validateCode: {
          required: form.err.required
        }
      },
      emailUpdateByOldStepOne: {
        code: {
          required: form.err.required,
          remote: form.err.remoteCode
        }
      },
      emailUpdateByOldStepTwo: {
        email: {
          required: form.err.required,
          isEmail: form.err.isEmail
        }
      },
      emailUpdateByMobileStepOne: {
        code: {
          required: form.err.required
        },
        idCard: {
          required: form.err.required,
          isIDNum: form.err.isIDNum
        }
      },
      setId: {
        realName: {
          required: form.err.required,
          isRealName:form.err.isRealName
        },
        idNo: {
          required: form.err.required,
          isIDNum: form.err.isIDNum
        }
      },
      setEmail: {
        email: {
          required: form.err.required,
          isEmail: form.err.isEmail
        }
      },
      setMobile: {
        mobile: {
          required: form.err.required,
          isMobile: form.err.isMobile
        },
        validCode: {
          required: form.err.required
        }
      },
      setCashPwd: {
        cashPwd: {
          required: form.err.required,
          isPassWord: form.err.isPassWord,
          minlength: form.err.minPswLength,
          maxlength: form.err.maxPswLength
        },
        cashPwd2: {
          required: form.err.required,
          minlength: form.err.minPswLength,
          maxlength: form.err.maxPswLength,
          equalTo: form.err.equalTo
        }
      },
      setNickName: {
        nickName: {
          required: form.err.required,
          isNickName: form.err.isNickName,
          isHasUnderlineFrontEnd: form.err.isHasUnderlineFrontEnd,
          isNickNameLength: form.err.isNickNameLength,
          isHasYX: form.err.isHasYX,
          remote: form.err.nickNameRemote
        }
      },
      creditWeibo: {
        credit_web: {
          required: form.err.required
        }
      },
      creditVideo: {
        usemail: {
          required: form.err.required
        }
      },
      creditGraduation: {
        validCode: {
          required: form.err.required,
          isEducationCode: form.err.isEducationCode
        }
      },
      notLoginFindPsw: {
        mobileOrEmail: {
          required: form.err.required,
          isMobileOrEmail: form.err.isMobileOrEmail
        },
        code: {
          required: form.err.required,
          minlength: form.err.codeLength,
          maxlength: form.err.codeLength,
          remote: form.err.remoteCode
        }
      },
      notLoginFindPswByEmail: {
        email: {
          required: form.err.required,
          isEmail: form.err.isEmail
        },
        code: {
          required: form.err.required,
          minlength: form.err.codeLength,
          maxlength: form.err.codeLength,
          remote: form.err.remoteCode
        }
      },
      notLoginFindPswByMobile: {
        mobile: {
          required: form.err.required,
          isMobile: form.err.isMobile
        },
        code: {
          required: form.err.required,
          minlength: form.err.codeLength,
          maxlength: form.err.codeLength,
          remote: form.err.remoteCode
        }
      },
      notLoginFindPswByEmailCode: {
        validCode: {
          required: form.err.required
        }
      },
      notLoginFindPswByMobileCode: {
        validCode: {
          required: form.err.required
        }
      },
      notLoginFindPswResetPsw: {
        password: {
          required: form.err.required,
          isPassWord: form.err.isPassWord,
          minlength: form.err.minPswLength,
          maxlength: form.err.maxPswLength
        },
        password2: {
          required: form.err.required,
          equalTo: form.err.equalTo
        }
      },
      calculator: {
        borrowAmount: {
          required: form.err.required,
          isBorrowAmount: form.err.isBorrowAmount
        },
        yearRate: {
          required: form.err.required,
          isOneDecimal: form.err.isOneDecimal,
          isRateOver: form.err.isRateOver
        }
      },
      ucode:{
        ucodeSerial:{
          required:form.err.required
        }
      },
      couponCode:{
        couponCode:{
          required:form.err.required
        }
      },
      accontRsvConfirm:{
        contract:{
          required:form.err.contractPay
        }
      },
      confirmReserve:{
        randCode:{
          required:form.err.required
        },
        joinContract:{
          required:form.err.contractPay
        },
        reserveContract:{
          required:form.err.contractPay
        }
      }
    }
  };

  form.log = function (m) {
    if (window.console && window.console.log) {
     // window.console.log(m);
    }
  };

  form.msg = function (msgafter, msg, type) {
    if (msgafter !== undefined) {
      $msgafter = $(msgafter);
      if (!$msgafter.length) {
        form.log("'msgafter' element can't find!");
        return;
      }
      if (type === undefined) type = "log";
      var $msg = $msgafter.parent().find(".form-msg");
      if (!$msg.length) {
        $msg = $("<span class='form-msg'></span>").insertAfter($msgafter).slideUp().html("<span class='" + type + "'>" + msg + "</span>").slideDown();
      } else {
        $msg.html("<span class='" + type + "'>" + msg + "</span>");
        return;
      }
      $msg.delay(3000).slideUp(function () {
        $(this).remove();
      });
    } else {
      form.log(msg);
    }
  };

  //内置ajaxSubmit，不用笨重的jquery.form,支持文件file的ajax上传
  form.ajaxSubmit = function ($form, opt) {

    if (!$form.length) return;
    if (opt && $.type(opt) != "object") return;

    var method, action, url, data, extra;

    if (typeof opt == 'function') {
      opt = { success: opt };
    }
    else if (opt === undefined) {
      opt = {};
    }

    opt.msg = function (msg, type) {
      form.msg(opt.msgafter, msg, type);
    };

    method = opt.type || $form.attr('method');
    action = opt.url || $form.attr('action');

    url = (typeof action === 'string') ? $.trim(action) : '';

    if (url) {
      url = (url.match(/^([^#]+)/) || [])[1];
    }

    if (opt.extraData) {
      if ($.isPlainObject(opt.extraData) || $.type(opt.extraData) == 'array') {
        extra = $.param(opt.extraData);
      }
    }

    data = !opt.data ? $form.serialize() : opt.data;
    data = !extra ? data : data + "&" + extra;

    if (opt.debug) {
      form.log(data);
    }

    /* jshint scripturl:true */
    opt = $.extend(true, {
      url: url,
      success: $.ajaxSettings.success,
      type: method || 'GET',
      iframeSrc: /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank'
    }, opt);


    var hasProp = !!$.fn.prop;
    $.fn.attr2 = function () {
      if (!hasProp)
        return this.attr.apply(this, arguments);
      var val = this.prop.apply(this, arguments);
      if (( val && val.jquery ) || typeof val === 'string')
        return val;
      return this.attr.apply(this, arguments);
    };


    var fileInputs = $form.find('input[type=file]');
    var hasFileInputs = fileInputs.length > 0;

    //文件input[type='file']异步上传，代码参考了jquery.form
    //主要技术原理是用一个form和iframe进行上传，把form数据的target指向iframe
    function fileUploadIframe(a) {
      var form = $form[0], el, i, s, g, id, $io, io, xhr, sub, n, timedOut, timeoutHandle;
      var deferred = $.Deferred();

      /*if (a) {
       // ensure that every serialized input is still enabled
       for (i=0; i < elements.length; i++) {
       el = $(elements[i]);
       if ( hasProp )
       el.prop('disabled', false);
       else
       el.removeAttr('disabled');
       }
       }*/

      s = $.extend(true, {}, $.ajaxSettings, opt);

      s.context = s.context || s;
      id = 'jqFormIO' + (new Date().getTime());
      if (s.iframeTarget) {
        $io = $(s.iframeTarget);
        n = $io.attr2('name');
        if (!n)
          $io.attr2('name', id);
        else
          id = n;
      }
      else {
        $io = $('<iframe name="' + id + '" src="' + s.iframeSrc + '" />');
        $io.css({ position: 'absolute', top: '-1000px', left: '-1000px' });
      }
      io = $io[0];


      xhr = { // mock object
        aborted: 0,
        responseText: null,
        responseXML: null,
        status: 0,
        statusText: 'n/a',
        getAllResponseHeaders: function () {
        },
        getResponseHeader: function () {
        },
        setRequestHeader: function () {
        },
        abort: function (status) {
          var e = (status === 'timeout' ? 'timeout' : 'aborted');
          // log('aborting upload... ' + e);
          this.aborted = 1;

          try { // #214, #257
            if (io.contentWindow.document.execCommand) {
              io.contentWindow.document.execCommand('Stop');
            }
          }
          catch (ignore) {
          }

          $io.attr('src', s.iframeSrc); // abort op in progress
          xhr.error = e;
          if (s.error)
            s.error.call(s.context, xhr, e, status);
          if (g)
            $.event.trigger("ajaxError", [xhr, s, e]);
          if (s.complete)
            s.complete.call(s.context, xhr, e);
        }
      };

      g = s.global;
      // trigger ajax global events so that activity/block indicators work like normal
      if (g && 0 === $.active++) {
        $.event.trigger("ajaxStart");
      }
      if (g) {
        $.event.trigger("ajaxSend", [xhr, s]);
      }

      if (s.beforeSend && s.beforeSend.call(s.context, xhr, s) === false) {
        if (s.global) {
          $.active--;
        }
        deferred.reject();
        return deferred;
      }
      if (xhr.aborted) {
        deferred.reject();
        return deferred;
      }

      // add submitting element to data if we know it
      sub = form.clk;
      if (sub) {
        n = sub.name;
        if (n && !sub.disabled) {
          s.extraData = s.extraData || {};
          s.extraData[n] = sub.value;
          if (sub.type == "image") {
            s.extraData[n + '.x'] = form.clk_x;
            s.extraData[n + '.y'] = form.clk_y;
          }
        }
      }

      var CLIENT_TIMEOUT_ABORT = 1;
      var SERVER_ABORT = 2;

      function getDoc(frame) {
        /* it looks like contentWindow or contentDocument do not
         * carry the protocol property in ie8, when running under ssl
         * frame.document is the only valid response document, since
         * the protocol is know but not on the other two objects. strange?
         * "Same origin policy" http://en.wikipedia.org/wiki/Same_origin_policy
         */

        var doc = null;

        // IE8 cascading access check
        try {
          if (frame.contentWindow) {
            doc = frame.contentWindow.document;
          }
        } catch (err) {
          // IE8 access denied under ssl & missing protocol
          //log('cannot get iframe.contentWindow document: ' + err);
        }

        if (doc) { // successful getting content
          return doc;
        }

        try { // simply checking may throw in ie8 under ssl or mismatched protocol
          doc = frame.contentDocument ? frame.contentDocument : frame.document;
        } catch (err) {
          // last attempt
          // log('cannot get iframe.contentDocument: ' + err);
          doc = frame.document;
        }
        return doc;
      }

      // Rails CSRF hack (thanks to Yvan Barthelemy)
      var csrf_token = $('meta[name=csrf-token]').attr('content');
      var csrf_param = $('meta[name=csrf-param]').attr('content');
      if (csrf_param && csrf_token) {
        s.extraData = s.extraData || {};
        s.extraData[csrf_param] = csrf_token;
      }

      // take a breath so that pending repaints get some cpu time before the upload starts
      function doSubmit() {
        // make sure form attrs are set
        var t = $form.attr2('target'), a = $form.attr2('action');

        // update form attrs in IE friendly way
        form.setAttribute('target', id);
        if (!method) {
          form.setAttribute('method', 'POST');
        }
        if (a != s.url) {
          form.setAttribute('action', s.url);
        }

        // ie borks in some cases when setting encoding
        if (!s.skipEncodingOverride && (!method || /post/i.test(method))) {
          $form.attr({
            encoding: 'multipart/form-data',
            enctype: 'multipart/form-data'
          });
        }

        // support timout
        if (s.timeout) {
          timeoutHandle = setTimeout(function () {
            timedOut = true;
            cb(CLIENT_TIMEOUT_ABORT);
          }, s.timeout);
        }

        // look for server aborts
        function checkState() {
          try {
            var state = getDoc(io).readyState;
            //log('state = ' + state);
            if (state && state.toLowerCase() == 'uninitialized')
              setTimeout(checkState, 50);
          }
          catch (e) {
            //log('Server abort: ' , e, ' (', e.name, ')');
            cb(SERVER_ABORT);
            if (timeoutHandle)
              clearTimeout(timeoutHandle);
            timeoutHandle = undefined;
          }
        }

        // add "extra" data to form if provided in options
        var extraInputs = [];
        try {
          if (s.extraData) {
            for (var n in s.extraData) {
              if (s.extraData.hasOwnProperty(n)) {
                // if using the $.param format that allows for multiple values with the same name
                if ($.isPlainObject(s.extraData[n]) && s.extraData[n].hasOwnProperty('name') && s.extraData[n].hasOwnProperty('value')) {
                  extraInputs.push(
                    $('<input type="hidden" name="' + s.extraData[n].name + '">').val(s.extraData[n].value)
                      .appendTo(form)[0]);
                } else {
                  extraInputs.push(
                    $('<input type="hidden" name="' + n + '">').val(s.extraData[n])
                      .appendTo(form)[0]);
                }
              }
            }
          }

          if (!s.iframeTarget) {
            // add iframe to doc and submit the form
            $io.appendTo('body');
            if (io.attachEvent)
              io.attachEvent('onload', cb);
            else
              io.addEventListener('load', cb, false);
          }
          setTimeout(checkState, 15);

          try {
            form.submit();
          } catch (err) {
            // just in case form has element with name/id of 'submit'
            var submitFn = document.createElement('form').submit;
            submitFn.apply(form);
          }
        }
        finally {
          // reset attrs and remove "extra" input elements
          form.setAttribute('action', a);
          if (t) {
            form.setAttribute('target', t);
          } else {
            $form.removeAttr('target');
          }
          $(extraInputs).remove();
        }
      }

      if (s.forceSync) {
        doSubmit();
      }
      else {
        setTimeout(doSubmit, 10); // this lets dom updates render
      }

      var data, doc, domCheckCount = 50, callbackProcessed;

      function cb(e) {
        if (xhr.aborted || callbackProcessed) {
          return;
        }

        doc = getDoc(io);
        if (!doc) {
          //log('cannot access response document');
          e = SERVER_ABORT;
        }
        if (e === CLIENT_TIMEOUT_ABORT && xhr) {
          xhr.abort('timeout');
          deferred.reject(xhr, 'timeout');
          return;
        }
        else if (e == SERVER_ABORT && xhr) {
          xhr.abort('server abort');
          deferred.reject(xhr, 'error', 'server abort');
          return;
        }

        if (!doc || doc.location.href == s.iframeSrc) {
          // response not received yet
          if (!timedOut)
            return;
        }
        if (io.detachEvent)
          io.detachEvent('onload', cb);
        else
          io.removeEventListener('load', cb, false);

        var status = 'success', errMsg;
        try {
          if (timedOut) {
            throw 'timeout';
          }

          var isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
          //log('isXml='+isXml);
          if (!isXml && window.opera && (doc.body === null || !doc.body.innerHTML)) {
            if (--domCheckCount) {
              // in some browsers (Opera) the iframe DOM is not always traversable when
              // the onload callback fires, so we loop a bit to accommodate
              //log('requeing onLoad callback, DOM not available');
              setTimeout(cb, 250);
              return;
            }
            // let this fall through because server response could be an empty document
            //log('Could not access iframe DOM after mutiple tries.');
            //throw 'DOMException: not available';
          }

          //log('response detected');
          var docRoot = doc.body ? doc.body : doc.documentElement;
          xhr.responseText = docRoot ? docRoot.innerHTML : null;
          xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
          if (isXml)
            s.dataType = 'xml';
          xhr.getResponseHeader = function (header) {
            var headers = {'content-type': s.dataType};
            return headers[header];
          };
          // support for XHR 'status' & 'statusText' emulation :
          if (docRoot) {
            xhr.status = Number(docRoot.getAttribute('status')) || xhr.status;
            xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
          }

          var dt = (s.dataType || '').toLowerCase();
          var scr = /(json|script|text)/.test(dt);
          if (scr || s.textarea) {
            // see if user embedded response in textarea
            var ta = doc.getElementsByTagName('textarea')[0];
            if (ta) {
              xhr.responseText = ta.value;
              // support for XHR 'status' & 'statusText' emulation :
              xhr.status = Number(ta.getAttribute('status')) || xhr.status;
              xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
            }
            else if (scr) {
              // account for browsers injecting pre around json response
              var pre = doc.getElementsByTagName('pre')[0];
              var b = doc.getElementsByTagName('body')[0];
              if (pre) {
                xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
              }
              else if (b) {
                xhr.responseText = b.textContent ? b.textContent : b.innerText;
              }
            }
          }
          else if (dt == 'xml' && !xhr.responseXML && xhr.responseText) {
            xhr.responseXML = toXml(xhr.responseText);
          }

          try {
            data = httpData(xhr, dt, s);
          }
          catch (err) {
            status = 'parsererror';
            xhr.error = errMsg = (err || status);
          }
        }
        catch (err) {
          //log('error caught: ',err);
          status = 'error';
          xhr.error = errMsg = (err || status);
        }

        if (xhr.aborted) {
          //log('upload aborted');
          status = null;
        }

        if (xhr.status) { // we've set xhr.status
          status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error';
        }

        // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
        if (status === 'success') {
          if (s.success)
            s.success.call(s.context, data, 'success', xhr);
          deferred.resolve(xhr.responseText, 'success', xhr);
          if (g)
            $.event.trigger("ajaxSuccess", [xhr, s]);
        }
        else if (status) {
          if (errMsg === undefined)
            errMsg = xhr.statusText;
          if (s.error)
            s.error.call(s.context, xhr, status, errMsg);
          deferred.reject(xhr, 'error', errMsg);
          if (g)
            $.event.trigger("ajaxError", [xhr, s, errMsg]);
        }

        if (g)
          $.event.trigger("ajaxComplete", [xhr, s]);

        if (g && !--$.active) {
          $.event.trigger("ajaxStop");
        }

        if (s.complete)
          s.complete.call(s.context, xhr, status);

        callbackProcessed = true;
        if (s.timeout)
          clearTimeout(timeoutHandle);

        // clean up
        setTimeout(function () {
          if (!s.iframeTarget)
            $io.remove();
          xhr.responseXML = null;
        }, 100);
      }

      var toXml = $.parseXML || function (s, doc) { // use parseXML if available (jQuery 1.5+)
        if (window.ActiveXObject) {
          doc = new ActiveXObject('Microsoft.XMLDOM');
          doc.async = 'false';
          doc.loadXML(s);
        }
        else {
          doc = (new DOMParser()).parseFromString(s, 'text/xml');
        }
        return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
      };
      var parseJSON = $.parseJSON || function (s) {
        /*jslint evil:true */
        return window['eval']('(' + s + ')');
      };

      var httpData = function (xhr, type, s) { // mostly lifted from jq1.4.4

        var ct = xhr.getResponseHeader('content-type') || '',
          xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
          data = xml ? xhr.responseXML : xhr.responseText;

        if (xml && data.documentElement.nodeName === 'parsererror') {
          if ($.error)
            $.error('parsererror');
        }
        if (s && s.dataFilter) {
          data = s.dataFilter(data, type);
        }
        if (typeof data === 'string') {
          if (type === 'json' || !type && ct.indexOf('json') >= 0) {
            data = parseJSON(data);
          } else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
            $.globalEval(data);
          }
        }
        return data;
      };

      return deferred;
    }


    opt = $.extend({
      url: url,
      data: data,
      beforeSend: function () {
        this.msg("Loading...");
      },
      success: function () {
        this.msg("提交成功！");
      },
      error: function () {
        this.msg("服务器链接出错！", "warn");
      },
      type: method || 'GET'
    }, opt);

    if (hasFileInputs) {
      fileUploadIframe();
    } else {
      $.ajax(opt);
    }

  };

  form.is = {
    isDate: function (intYear, intMonth, intDay) {
      if (isNaN(intYear) || isNaN(intMonth) || isNaN(intDay))
        return false;
      if (intMonth > 12 || intMonth < 1)
        return false;
      if (intDay < 1 || intDay > 31)
        return false;
      if ((intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) && (intDay > 30))
        return false;
      if (intMonth == 2) {
        if (intDay > 29)
          return false;
        if ((((intYear % 100 === 0) && (intYear % 400 !== 0)) || (intYear % 4 !== 0)) && (intDay > 28))
          return false;
      }
      return true;
    },
    isIDNum: function (cId) {
      var pattern;
      if (cId.length == 18) {
        pattern = /^\d{17}(\d|x|X)$/;// 正则表达式,18位且前17位全是数字，最后一位只能数字,x,X
        if (!pattern.exec(cId)) {
          return false;
        }
        if (!form.is.isDate(cId.substring(6, 10), cId.substring(10, 12), cId.substring(12, 14))) {
          return false;
        }
        var strJiaoYan = [ "1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2" ];
        var intQuan = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];
        var intTemp = 0;
        for (var i = 0; i < cId.length - 1; i++)
          intTemp += cId.substring(i, i + 1) * intQuan[i];
        intTemp %= 11;
        if (cId.substring(cId.length - 1, cId.length).toUpperCase() != strJiaoYan[intTemp]) {
          return false;
        }
      } else {
        return false;
      }
      return true;
    },
    isUserName: function (n) {
      var myreg = /^\w+(@)\w+(\.\w+)(\.\w+|)$/;
      var mobile = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
      return myreg.test(n) || mobile.test(n);
    },
    isRealName: function (n) {
      //正则后的/都加了括号，不加jslint会警告，Douglas大神已回答了为什么加括号好些，看：http://groups.yahoo.com/neo/groups/jslint_com/conversations/topics/345
      return (/^[\u4E00-\u9FA5]+$/).test(n);
    },
    isNickName: function (n) {
      return (/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/).test(n);
    },
    isHasUnderlineFrontEnd: function (v) {
      return (/^(?!_)(?!.*?_$).*$/).test(v);
    },
    isHasYX: function (v) {
      return !(/^(YX_|yx_|yX_|Yx_).*|(.*(_YX|_yx|_yX|_Yx)$)/).test(v);
    },
    isNickNameLength: function (v) {
      function getLength(str) {
        var len = str.length;
        var reLen = 0;
        for (var i = 0; i < len; i++) {
          if (str.charCodeAt(i) < 27 || str.charCodeAt(i) > 126) {
            // 全角
            reLen += 2;
          } else {
            reLen++;
          }
        }
        return reLen;
      }

      return getLength($.trim(v)) <= 16 && getLength($.trim(v)) >= 4;
    },
    isPassWord: function (p) {
      return (/^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{1,}$/).test(p);
    },
    isPassNotAllNum:function(v){
      return !((/^\d{1,}$/).test(v));
    },
    isPassNotRepeat:function(v){
     // var s = v.substring(0,1);
      //if(s === '*') return true;
      // return !(new RegExp("^"+s+"{1,}$","g").test(v));
      return  !(new RegExp(/^(.)\1+$/).test(v));
    },
    isMobile: function (t) {
      return (/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/).test(t);
    },
    isPhone: function (p) {
      return (/^0\d{2,3}[-]?\d{8}$|^0\d{3}[-]?\d{7,8}$/).test(p);
    },
    isEmail: function (e) {
      return (/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i).test(e);
    },
    isMobileOrEmail: function (v) {
      return this.isMobile(v) || this.isEmail(v);
    },
    isUrl: function (v) {
      return (/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i).test(v);
    },
    isAmount: function (v) {
      return (/^[0-9]*(\.[0-9]{1,2})?$/).test(v);
    },
    isPostCode: function (v) {
      return (/^\d{6}$/).test(v);
    },
    isBankCard: function (v) {
      return (/^\d{12,19}$/).test(v);
    },
    isCardDeposit: function (v) {
      return (/^[a-zA-Z0-9\(\)\（\）\u4e00-\u9fa5]+$/).test(v);
    },
    isEducationCode: function (v) {
      return (/^\d{12}$/).test(v);
    },
    isIntNum: function (v) {
      return (/^\d+$/).test(v);
    },
    //loan page
    isOneDecimal: function (v) {
      return (/^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1})?$/).test(v);
    },
    isLuhn: function (v) {
      //luhn算法，见：http://rosettacode.org/wiki/Luhn_test_of_credit_card_numbers
      //主要是验证银行卡和信用卡
      //value为字符串类型
      if (/[^0-9-\s]+/.test(v)) return false;

      var nCheck = 0, nDigit = 0, bEven = false;
      v = v.replace(/\D/g, "");

      for (var n = v.length - 1; n >= 0; n--) {
        var cDigit = v.charAt(n);
        nDigit = parseInt(cDigit, 10);

        if (bEven) {
          if ((nDigit *= 2) > 9) nDigit -= 9;
        }

        nCheck += nDigit;
        bEven = !bEven;
      }

      return (nCheck % 10) === 0;
    }

  };

  form.isEmptyObj = function (obj) {
    var ret = true;
    if ('[object Array]' === Object.prototype.toString.call(obj)) {
      ret = !obj.length;
    } else {
      obj = new Object(obj);
      for (var key in obj) {
        return false;
      }
    }
    return ret;
  };

  form.comma = function (n, length) {
    var source = n;
    if (!length || length < 1) {
      length = 3;
    }
    source = String(source).split(".");
    source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{' + length + '})+$)', 'ig'), "$1,");
    return source.join(".");
  };

  $.extend({
    uniqueArray: function (source, compareFn) {
      var len = source.length,
        result = source.slice(0),
        i, datum;

      if ('function' != typeof compareFn) {
        compareFn = function (item1, item2) {
          return item1 === item2;
        };
      }
      while (--len > 0) {
        datum = result[len];
        i = len;
        while (i--) {
          if (compareFn(datum, result[i])) {
            result.splice(len, 1);
            break;
          }
        }
      }

      return result;
    }
  });

  form.addValidateMethod = function (arr) {
    if ($.type(arr) != "array") {
      return;
    }
    $.each(arr, function (k, v) {
      jQuery.validator.addMethod(v, function (value, element) {
        return this.optional(element) || form.is[v](value);
      });
    });
  };

  form.placeholder = function () {
    $('.ui-form').on('click', ".placeholder",function () {
      $(this).hide().parent().children('input').trigger('focus');
    }).on('focus', 'input',function () {
        $(this).parent().children('.placeholder').hide();
      }).on('blur', 'input',function () {
        if (!this.value) {
          $(this).parent().children('.placeholder').show();
        }
      }).find("input").trigger("focus");
  };

  form.randImage = function (target) {
    var $randImage = typeof target == 'undefined' ? $("#randImage") : $(target);
    if ($randImage.length > 0) {
      $randImage.click(function () {
        $(this).attr("src", "/image.jsp?" + Math.random());
      });
      $("#refreshCode").click(function () {
    	  $('#randImage').trigger('click');
       });
    }
  };

  form.tipfocus = function (element, tipmsg) {
    var left = element[0].offsetWidth + element.parent().children(".ui-label").width() + 10,
      top = 2;
    $poptip = element.parent().children(".ui-poptip");
    if (/code/.test(element[0].className)) {
      left += element.nextAll("button")[0].offsetWidth;
    }
    if ($poptip.length) {
      $poptip.show();
      return;
    }
    $('<div class="ui-poptip ui-poptip-orange ui-poptip-new" style="z-index: 99; position: absolute; left: ' + left + 'px; top:' + top + 'px;"><div class="ui-poptip-container"><div class="ui-poptip-arrow ui-poptip-arrow-10"><em></em><span></span></div><div data-role="content" class="ui-poptip-content" style="width: auto; height: auto;"></div></div></div>').appendTo(element.parent("div")).find(".ui-poptip-content").html(tipmsg);
  };

  form.tipblur = function (element) {
    element.parent().children(".ui-poptip").hide();
  };

  form.setPhone = function (id1, id2, tagetPhoneId) {
    var $id1 = $("#" + id1), $id2 = $("#" + id2), $tagetPhoneId = $("#" + tagetPhoneId);
    var $tagetV = $("#" + tagetPhoneId).val();
    if ($tagetV && /-/.test($tagetV)) {
      $id1.val($tagetV.split("-")[0]);
      $id2.val($tagetV.split("-")[1]);
    } else {
      $id2.val($tagetPhoneId.val());
    }
    function checkv() {
      var $id1v = $id1.val(), $id2v = $id2.val();
      if ($id1v && $id2v) {
        $tagetPhoneId.val($id1v + "-" + $id2v).keyup();
      } else {
        $tagetPhoneId.val("").keyup();
      }
    }

    $id1.add($id2).bind("keyup", function () {
      checkv();
    });
    $id1.add($id2).bind("blur", function () {
      checkv();
      $tagetPhoneId.trigger("blur");
    });
    $tagetPhoneId.css({"height": "0px", "width": "0px", "border": "1px dashed #fff"}).show().keyup();
  };

  form.sendPhoneCode = function (telNumId, btId, urlstr, opt) {
    var t, timeout = 30 , i = timeout;
    var $tel = typeof telNumId == 'undefined' ? $("#phone") : $("#" + telNumId);
    btId = typeof btId == 'undefined' ? "getMobileCode" : btId;
    var $bt = $("#" + btId);
    var btval = $bt.html();
    var url = typeof urlstr == 'undefined' ? "/sendPhoneCode.action?phone=" : urlstr;
    if(opt.unDisabled){
     $bt.bind('click',function(e){
      if($(this).attr('disabled')=='disabled'){
       return;
      }else{
       if (opt && opt.onStart && $.isFunction(opt.onStart)) opt.onStart();
                send();
      }
     });
    }else{
        $bt.removeAttr("disabled").html(btval).unbind("click").bind("click", function (e) {
            e.preventDefault();
            if (opt && opt.onStart && $.isFunction(opt.onStart)) opt.onStart();
            send();
          });
    }

    function send() {
      var telvalue = !$tel.length ? "" : $tel.val();
      //$tel可以不存在，也可以发送验证码
      if ($tel.length && !form.is.isMobile($tel.val())) {
        form.msg("#" + btId, "请正确填写您的手机号码", "warn");
        return;
      }
      $bt.attr("disabled", "disabled").addClass("ui-button-disabled");
      t = setInterval(function () {
        if (i <= 0) {
          $bt.removeAttr('disabled').removeClass("ui-button-disabled").html(btval);
          clearInterval(t);
          i = timeout;
          if (opt && opt.onClear && $.isFunction(opt.onClear)) opt.onClear();
        } else {
          $bt.html(i + "秒重新获取");
          i--;
        }
      }, 1000);
      $.ajax({
        url: url + telvalue,
        type: "POST",
        success: function (data) {
          if (opt && opt.onSuccess && $.isFunction(opt.onSuccess)) opt.onSuccess();
          if (data.result) {
            form.msg("#" + btId, data.result, "warn");
          } else if (data.message) {
            form.msg("#" + btId, data.message, "warn");
          }
        }
      });
    }

    function clear(){
      clearInterval(t);
      i = timeout;
    }

    return {
      send:send,
      clear:clear
   };

  };

  //让所有字段去除required验证，方便调试后台数据
  form.notRequired = function ($form) {
    $form.find(":text,[type='password'],[type='checkbox'],[type='radio'],[type='file'],select,textarea").each(function () {
      $(this).data("required", "false");
    });
  };

  form.removeRequired = function ($form) {
    $form.find(":text,[type='password'],[type='checkbox'],[type='radio'],[type='file'],select,textarea").each(function () {
      $(this).removeData("required");
    });
  };

  form.init = function () {
    //init some function 
  };

  $.validator.prototype.checkForm = function () {
    //让jquery.validate支持多个相同name,覆盖其原有方法
    //http://stackoverflow.com/questions/931687/using-jquery-validate-plugin-to-validate-multiple-form-fields-with-identical-nam
    this.prepareForm();
    for (var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++) {
      if (this.findByName(elements[i].name).length && this.findByName(elements[i].name).length > 1) {
        for (var cnt = 0; cnt < this.findByName(elements[i].name).length; cnt++) {
          this.check(this.findByName(elements[i].name)[cnt]);
        }
      } else {
        this.check(elements[i]);
      }
    }
    return this.valid();
  };

  (function ($) {
    //check for IE7 or lower
    if (document.all && !document.querySelector && $.fn.validate) {
      var
        origValidateFn = $.fn.validate,
        slice = Array.prototype.slice;
      $.fn.validate = function () {
        var
          args = slice.call(arguments, 0),
          origAttrFn = this.attr;
        this.attr = function () {
          var args = slice.call(arguments, 0);

          //do not set the novalidate attribute in IE7 or lower, since it throws an error
          if (args.length > 1 && args[0] === "novalidate") {
            return this;
          }
          return origAttrFn.apply(this, args);
        };
        return origValidateFn.apply(this, args);
      };
    }
  }(jQuery));

  //新版登录注册input样式
  var inputTheme = {
    success: function(label) {
      label.addClass("valid");
    },
    highlight: function(element, errorClass) {
      $(element).removeClass('input-bg-gray').addClass('input-bg-red').addClass('error');
      var $icon = $(element).siblings('.icon');
      var icon = $icon.attr('class');
      if(icon && /gray/.test(icon)){
        var match = icon.match(/input-icon-(.*)-gray/);
        $icon.removeClass(match[0]).addClass("input-icon-" + match[1] + "-red");
      }
    },
    unhighlight: function(element, errorClass) {
      $(element).removeClass('input-bg-red error').addClass('input-bg-gray');
      var $icon = $(element).siblings('.icon');
      var icon = $icon.attr('class');
      if(icon && /red/.test(icon)){
        var match = icon.match(/input-icon-(.*)-red/);
        $icon.removeClass(match[0]).addClass("input-icon-" + match[1] + "-gray");
      }
    }
  };


  var showSingleError = {
    showErrors:function(errorMap, errorList){
      var i, elements;
      for ( i = 0; this.errorList[i]; i++ ) {
        var error = this.errorList[i];
        if ( this.settings.highlight ) {
          this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass );
        }
        this.showLabel( error.element, error.message );
        break;
      }
      if ( this.errorList.length ) {
        this.toShow = this.toShow.add( this.containers );
      }
      if ( this.settings.success ) {
        for ( i = 0; this.successList[i]; i++ ) {
          this.showLabel( this.successList[i] );
        }
      }
      if ( this.settings.unhighlight ) {
        for ( i = 0, elements = this.validElements(); elements[i]; i++ ) {
          this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );
        }
      }
      this.toHide = this.toHide.not( this.toShow );
      this.hideErrors();
      this.addWrapper( this.toShow ).show();
    }
  };

  form.ui = {
    init:function(){
      //TODO 这里暂时只做了checkbox样式
      $("input[type='checkbox']").each(function(){
        var me = $(this);
        var isChecked = me.prop('checked');
        $wrap = $( "<span class='ui-select j-checkbox'></span>").on("click",function(e){
          if(e.target.nodeName == "SPAN"){
            if(me.prop('checked')){
              //$(this).css("backgroundPosition","0 0");
              $(this).removeClass('j-checked');
            }else{
              //$(this).css("backgroundPosition","0 -33px");
              $(this).addClass('j-checked');
            }
            me.trigger('click');
          }

        });
        if(isChecked){
          //$wrap.css("background-position","0 -33px");
          $wrap.addClass('j-checked');
        }
        me.wrap($wrap);
      });
    },
    partInit: function (obj){
    //TODO 这里暂时只做了 局部 的checkbox样式
      $("input[type='checkbox']",obj).each(function(){
        var me = $(this);
        var isChecked = me.prop('checked');
        $wrap = $( "<span class='ui-select j-checkbox'></span>").on("click",function(e){
          if(e.target.nodeName == "SPAN"){
            if(me.prop('checked')){
              //$(this).css("backgroundPosition","0 0");
              $(this).removeClass('j-checked');
            }else{
              //$(this).css("backgroundPosition","0 -33px");
              $(this).addClass('j-checked');
            }
            me.trigger('click');
          }

        });
        if(isChecked){
          //$wrap.css("background-position","0 -33px");
          $wrap.addClass('j-checked');
        }
        me.wrap($wrap);
      });
    }
  };

  form.validate = function (opt) {
    var $target,
      def,
      len,
      result = {};

    def = {
      //为tip定义的name
      name: null,

      //可选参数：目标form，可以指定为id,class
      target: 'form',

      //可选参数：可以指定一些field字段的name，参数为数组
      fieldArr: [],

      //可选参数：强烈推荐放在各字段的 data.is="isUserName"中,不要用这个
      validateMethodArr: [],

      //可以覆盖定义好的form.validateData,增加灵活性,还可以复用jquery.validate中的参数
      validateData: {},

      //可以覆盖定义好的tip
      tip: {},

      //是否显示提示tip框，默认不显示
      showTip: false,

      //inputTheme 为新版注册登录添加的功能
      inputTheme:false,

      //在用$.validate()方法前做的一些初始化配置，传入参数form，可以直接调用form中的方法
      before: function (form, $target) {
      }
    };

    //根据数组元素返回对象中相同的属性，带一个回调函数，可以改变对象中的属性值，返回一个新的对象
    var getArrObj = function (obj, arr, fn) {
      var o = {}, i = 0, len = arr.length;
      for (i; i < len; i++) {
        for (var j in obj) {
          if (arr[i].name == j) {
            o[j] = fn && typeof fn == "function" ? fn.apply(this, [j, obj[j], arr[i], obj]) : obj[j];
            delete obj[j];
            break;
          }
        }
      }
      return o;
    };

    def = $.extend(def, opt);
    $target = $(def.target);

    def.tip = $.extend(form.tip, def.tip);

    def.name = def.name || $target.data("name");

    if (!def.name) {
      throw "name is empty";
    }
    if ($.type(def.fieldArr) == "array") {
      $target.find("input[type='text'],input[type='password'],input[type='checkbox'],input[type='radio'],input[type='file'],select,textarea").each(function () {
        var $this = $(this),
          dataIs = $this.data("is"),
          name = $this.attr("name"),
          obj = {};
        if (dataIs)
          dataIs = $.trim(dataIs).split(/\s+/);
        if (dataIs && dataIs.length) {
          for (var i = 0, len = dataIs.length; i < len; i++) {
            def.validateMethodArr.push(dataIs[i]);
          }
        }
        if (name) {
          obj.name = name;
          if ($this.data("required") == "false") {
            obj.required = false;
          } else if ($this.data("required") == "true") {
            obj.required = true;
          }
          obj.label = $this.parent().children(".ui-label").text().replace("*", "");
          def.fieldArr.push(obj);
        }
        if (!def.showTip) return;
        $.each(def.tip, function (k, v) {
          if (v && name == k) {
            $this.focus(function () {
              form.tipfocus($this, v);
            }).blur(function () {
                form.tipblur($this);
              });
            return false;
          }
        });
      });
    }

    len = def.fieldArr.length;
    if (!len) throw "fieldArr is empty";
    def.validateData = $.extend(form.validateData, def.validateData);
    $.each(def.validateData, function (k, v) {
      if (k == "rules") {
        result[k] = getArrObj(v[def.name], def.fieldArr, function (k, v, a) {
          if (a.required || a.required === false) {
            v.required = !!a.required;
          }
          return v;
        });
      } else if (k == "messages") {
        result[k] = getArrObj(v[def.name], def.fieldArr, function (k, v, a) {
          //加上条件可以让自定义的required messages 覆盖 默认的
          if (v.required == form.err.required) {
            v.required = a.label + form.err.required;
          }
          return v;
        });
      } else {
        //装载jquery.validate中的默认方法
        result[k] = v;
      }
    });

    form.addValidateMethod(def.validateMethodArr);  
    
    if ($(".placeholder").length) {
      form.placeholder();
    }

    def.before.call(this, form, $target);

    if(def.inputTheme){
      result = $.extend(inputTheme,result);
    }

    if(def.showSingleError){
      result = $.extend(showSingleError,result);
    }

    //返回$.validator对象,可以用其中的如:resetForm等方法
    return $target.validate(result);
  };

  module.exports = form;
});

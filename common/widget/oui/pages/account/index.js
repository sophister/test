define(function (require) {

  var $ = require('jquery'),
    Common = require('common'),
    Protocol = require('protocol'),
    Widgets = require('widgets/widgets'),
    Mask = require('mask'),
    Tip = require('tip');
  var progress = 0;
  var __noReject = [];//新手引导弹出层
  var form = Widgets.Form,
      RSAencript = require('rsa');
  
  //新手引导弹窗
  var newbieGuide = [
      {
        "class" : "identity-pop",
        "status" : newbieGuideStatus.identity=='1'
      },
      {
        "class" : "cashPW-pop",
        "status" : newbieGuideStatus.cashPW=='1'
      },
      {
        "class" : "recharge-pop",
        "status" : newbieGuideStatus.recharge=='1'
      },
      {
         "class" : "invest-pop",
         "status" : newbieGuideStatus.invest=='1'
      }
  ];

  for(var i=0; i<newbieGuide.length;i++){
    var json = newbieGuide[i];
    var sClass = json['class'];
    if(json.status){
      $("."+ sClass).remove();
      newbieGuide.splice(i,1);
      i--;
    }else{
    	switch(sClass){
    		case "identity-pop":
    			//实名验证
    			  form.validate({
    			    target: "#setIdForm",
    			    validateData: {
    			      submitHandler: function (el) {
    			        form.ajaxSubmit($(el), {
    			          msgafter: "#subbt",
    			          before: function () {
    			            this.msg("正在验证，请稍后...");
    			          },
    			          success: function (data) {
    			            this.msg(data.message, "warn");
    			            if (data.status === 0) {
    			              $('.identity-set-succeed').show();
                        $('.cashpsw-set-succeed').hide();
    			              popSlide(0,1);
    			              mdtongji('identify_success');
    			            }
    			          }
    			        });
    			      }
    			    }
    			  });
    			  break;
    		case "cashPW-pop":
    			 //交易密码
    			  form.validate({
    			    target: "#setCashPwdForm",
    			    validateData: {
    			      submitHandler: function (el) {
    			        var $pwds = $('input[type=password]', el);
    			        if (typeof(RSAencript) != 'undefined') {
    			          $pwds.each(function () {
    			            $(this).val(RSAencript($(this).val()));
    			          });
    			        }
    			        form.ajaxSubmit($(el), {
    			          msgafter: "#subSetCashPwdBt",
    			          success: function (data) {
    			            $pwds.each(function () {
    			              $(this).val('');
    			            });
    			            this.msg(data.message, "warn");
    			            if (data.status === 0) {
    			              var f ;
    			              for(var i=0;i<newbieGuide.length;i++){
    			                if(newbieGuide[i]['class']=="cashPW-pop"){
    			                  f = i;
    			                }
    			              }
                        $('.identity-set-succeed').hide();
    			              $('.cashpsw-set-succeed').show();
                        mdtongji('cashPass_success');
                        popSlide(f,f+1);
    			            }
    			          }
    			        });
    			      }
    			    }
    			  });
    			  break;
    		default:
    			break;
    	}
    }
  }
  
  //if(newbieGuide.length>0){  //去掉小闹钟
  if(false){
	  var json = newbieGuide[0], sClass = json['class'];
	  $("."+ sClass).show();
    $(".J_alarm").show();
    $(".J_alarm").addClass('waggle');
    setTimeout(function(){
      $(".J_alarm").removeClass('waggle');
    },2000)
  }
  
  $(".J_alarm").on("click",function(){
    $(".masking-wrap").show();
    $(".newbie-guide-wrap").show();
    mdtongji('icon_click');
    //弹窗埋点
    var sClass = newbieGuide[0]['class'];
    var para;
    if(sClass=="identity-pop"){
      para = 'dialog_identify';
    }
    if(sClass=="cashPW-pop"){
      para = 'dialog_cashPass';
    }
    if(sClass=="recharge-pop"){
      para = 'dialog_recharge';
    }
    if(sClass=="invest-pop"){
      para = 'dialog_invest';
    }
    mdtongji(para);
  });
  $(".close-x").on("click",function(){
    $(".masking-wrap").hide();
    $(".newbie-guide-wrap").hide();
    location.reload();
  });
  //按钮埋点统计
  $("#subbt").click(function(){
    mdtongji('dialog_identify_ok');
  });
  $("#subSetCashPwdBt").click(function(){
    mdtongji('dialog_cashPass_ok');
  });
  
  $(".LJXQ").click(function(){
    $.get('/html/blank/blank.html?tag=3xuqixht',function(){});
  });
  function popSlide(from,to){
    var oSlider = $(".newbie-guide-pop");
    var oCur = oSlider.eq(from);
    var oNext = oSlider.eq(to);
    oNext.css({
      left: 960 + oNext.width(),
      opacity: 0.5,
      marginLeft: 0
    });
    oCur.animate({
      opacity: 0.5,
      left: - oCur.width()
    },1000,function(){
      oCur.hide();
    });
    oNext.show().animate({
      opacity: 1,
      left: (960-oNext.width())/2
    },1000,function(){
      oNext.css({
        left: '50%',
        marginLeft: - oNext.width()/2
      })
    });
  }
  //埋点统计
  function mdtongji(para){
    $.get('/html/blank/blank.html?newUserGuide='+para,function(){});
  }
  
  
  function showGuide() {
    $guide = $('#novice-guide');
    $ad = $('.ad-dimgray');
    if (!$guide.length) return;
    if ($ad.length) {
      $ad.hide();
    }
    $guide.find('.close,.goto').on('click', function () {
      $guide.hide();
      Mask.hide();
    }).end().find('.next').on('click', function () {
      var type = $guide.data('type').toLowerCase();
      var src = $guide.css('backgroundImage');
      var match = src.match(/(account-step-)(\d)/);
      var n = parseInt(match[2], 10);
      n++;
      if (n >= 3) {
        $(this).remove();
        $('.goto').show();
        $ad.show();
      }
      if (type == '借出者') {
        $guide.css({
          background: 'url(/static/img/guide/' + match[1] + n + '-lender.png)'
        });
        $('#novice-guide .guide').removeClass().addClass( 'guide ' + match[1] + n + '-lender' );
      } else {
        $guide.css({
          background: 'url(/static/img/guide/' + match[1] + n + '-borrower.png)'
        });
        $('#novice-guide .guide').removeClass().addClass('guide ' + match[1] + n + '-borrower' );
      }

    });
    Mask.set('backgroundColor', '#000').set('zIndex', 100001).set('opacity', '0.6').show();
  }

  showGuide();


  $('#info-box .icons a').each(function () {
    var len = /light/.test(this.className);
    if (len) {
      progress += 25;
    }
  });

  $('#safe-progressbar').attr('title', progress + '%').find('div').css('width', progress + 'px');


  var rsp = Common.loadJSON($('#borrowing-rsp'), true);
  var l = rsp.data.loans,
    t = Protocol.translator;
  for (var i = 0; i < l.length; i++) {
    l[i].notPayPrincipal = t._commaFloat(l[i].notPayPrincipal);
    l[i].notPayInterestAndMgmtFee = t._commaFloat(l[i].notPayInterestAndMgmtFee);
    l[i].overdueAmount = t._commaFloat(l[i].overdueAmount);
  }

  Common.fillTemplate({
    container: $('#borrowing'),
    data: rsp,
    template: $('#borrowing-template'),
    isResponse: true
  });

  new Widgets.List({
    name: 'loan-list',
    api: Protocol.API.getLoans,
    header: true
  }).init(Common.loadJSON('#loan-list-rsp', true));

  new Tip({
    element: '#tipCon_1',
    trigger: '#tips_1',
    direction: 'right'
  });
  new Tip({
    element: '#tipCon_2',
    trigger: '#tips_2',
    direction: 'right'
  });

  //安全没有认证完，自动弹出tip提示，并且只弹一个提示
  $('.icon-box','#info-box').each(function (i) {
    if (!$(this).hasClass('light')) {
      var $a = $(this).find('a');
      var txt = $a.data('txt').split('||');
      var href = $a.attr('href');
      var left = 140 + i * 40;
      $('#tipCon_3').css({
        position: 'absolute',
        left: left + 'px',
        top: '160px'
      }).find('.ui-poptip-content').html("<div>" + txt[0] + "<a href='" + href + "'>" + txt[1] + "</a><i class='iconfont closeTip' style='position: absolute;right:-1px;top:-1px;cursor: pointer;color:#d9c6a4; font-size:16px;padding: 0 2px; height: 16px;line-height: 16px;'>&#xF045;</i></div>").end().show();
      return false;
    }
  });
  $('.closeTip').on('click', function () {
    $(this).parents('.ui-poptip').hide();
  });

  $('.yelltips-close').click(function () {
    $(this).parent().addClass("fn-hide");
    $.ajax({
      url: "/notification/updateStatus.action?combiType=LOAN_REJECTED&status=CLOSED"
    });
  });
  $('.yelltips-close-roll').click(function () {
    $(this).parent().addClass("fn-hide");
    $.ajax({
      url: "/notification/closeTip.action?combiType=CLOSE_ROLL_OVER_TIP"
    });
  });
  var yellowData = notification.data;
  var noti = yellowData.notification; 
  if(!noti){
    return;
  }
  var productType = noti.productType || "";
  var rewriteLoanDOM = {
      "NONE" : function (){
        //申请借款
        $(".LOAN-NONE").removeClass("fn-hide");
      },
      "INCOMPLETE_INFO" : function (){
        //填写借款信息
        var oParClass = ".LOAN-INCOMPLETE_INFO";
        $(".basic-percent", oParClass).css({
          "width": noti.formProgress + "%"
        });
        $(".basic-progress-value", oParClass).find('em').text(noti.formProgress + "%");
        if (noti.formProgress == 100) {
          $(".yeltip-button", oParClass).find("a").text("提交申请");
        }
        setUrl(productType, $(oParClass));
        $(oParClass).removeClass("fn-hide");
      },
      "WAITING_AUDIT" : function (){
        //等待审核
        //身份认证
        var oParClass = ".LOAN-WAITING_AUDIT";
        var idFn = getStatusContent(noti.idStatus);
        authentication(".idStatus","id_" , idFn);
        if (productType == "RRGXD" || productType == "RRSYD") {
          //信用认证
          var userFn = getStatusContent(noti.userCreditStatus);
          authentication(".userCreditStatus","credit_" , userFn);
          //收入认证
          var incoFn = getStatusContent(noti.incomeStatus);
          authentication(".incomeStatus","income_" , incoFn);
          //工作认证 || 公司认证
          var workFn = getStatusContent(noti.workStatus);
          authentication(".workStatus","work_" , workFn);
        }
        if (productType == "RRWSD") {
          //网店认证
          var eshopFn = getStatusContent(noti.eshopStatus);
          authentication(".eshopStatus","work_" , eshopFn);
        }
        if (__noReject.length===0) {
          $(".loan-tips", oParClass).removeClass("fn-hide");
          $(".yeltip-button", oParClass).addClass("fn-hide");
        } else if (__noReject.join('').indexOf("failed") != -1) {
          $(".loan-reject-msg", oParClass).removeClass("fn-hide");
        }
        setUrl(productType, $(oParClass));
        $(oParClass).removeClass("fn-hide");
      },
      "AUDITING" : function (){
        //审核中
        var oParClass = ".LOAN-AUDITING";
        var percent = Math.round(noti.passedMaterialCount / noti.uploadedMaterialCount * 100);
        $(".basic-percent", oParClass).css({
          "width": percent + '%'
        });
        $(".basic-progress-value", oParClass).find("em").text("已通过" + noti.passedMaterialCount + "项");
        setUrl(productType, $(oParClass));
        $(oParClass).removeClass("fn-hide");
      },
      "REJECTED" : function (){
        //借款驳回
        if (!noti.closeable) {
          $(".yelltips-close", ".LOAN-REJECTED").remove();
        }
        $(".LOAN-REJECTED").removeClass("fn-hide");
      },
      "OPEN" : function (){
        //筹集借款
        var oParClass = ".LOAN-OPEN";
        var _useMonthlyComprehensiveFeeRate = noti.useMonthlyComprehensiveFeeRate || false;
        $(".amount", oParClass).text(noti.amount);
        $(".interest", oParClass).text(noti.interest);
        $(".months", oParClass).text(noti.months);
        if( _useMonthlyComprehensiveFeeRate ){
          $(".fee-rate", oParClass).text(noti.finalMonthlyComprehensiveFeeRate);
        }else{
          $(".J_fee-rate", oParClass).text('借款利率');
          $(".fee-rate", oParClass).text(noti.interest);
        }
        $(".creditLevel", oParClass).text(noti.creditLevel);
        $(".basic-percent", oParClass).css({
          "width": noti.finishedRatio + "%"
        });
        $(".basic-progress-value", oParClass).find("em").text(noti.finishedRatio + "%");
        setUrl(productType, $(oParClass));
        $(oParClass).removeClass("fn-hide");
      }
  };
  
  var rewriteYellowTipsDOM = {
    "FINANCE_PLAN" : function (){
      //理财计划
      var oParClass = ".FINANCE_PLAN";
      $('.bookedNum', oParClass).text(noti.bookedNum);
      $('.planName', oParClass).text(noti.planName).attr("href", "/financeplan/listPlan!detailPlan.action?financePlanId=" + noti.id);
      $('.payDueDate', oParClass).text(noti.payDueDate);
      $('.unpaidAmount', oParClass).text(noti.unpaidAmount + "元");
      $(".FINANCE_PLAN").removeClass("fn-hide");
    },
    "REPAY" : function (){
      //还款
      var oParClass = ".REPAY";
      $(".loanCount", oParClass).text(noti.loanCount);
      $(".latestRepayDate", oParClass).text(noti.latestRepayDate);
      $(".repayAmount", oParClass).text(noti.repayAmount + "元");
      if (noti.status == "OVER_DUE") { //逾期
        $(".overDuedCount", ".REPAY-OVER_DUE").text(noti.overDuedCount);
        $(".overDuedDays", ".REPAY-OVER_DUE").text(noti.overDuedDays + "天");
        $(".REPAY-OVER_DUE").removeClass("fn-hide");
      }
      if (noti.status == "UNREPAID") { //未支付
        $(".leftMonths", ".REPAY-UNREPAID").text(noti.leftMonths + "/" + noti.totalMonths);
        $(".REPAY-UNREPAID").removeClass("fn-hide");
      }
    },
    "LOAN" : function (){
      var __status = noti.status;
      rewriteLoanDOM[__status]();
    },//续期
    "ROLL_OVER" : function(){
      $(".ROLL_OVER").removeClass("fn-hide");
    }
  };
  
  function authentication (sClass,str,obj){
    var $el = $(sClass, ".LOAN-WAITING_AUDIT");
    $el.find("img:first").attr("src", "/static/img/auth_icon/mid/" + str + obj.str + ".png");
    if (obj.src !== "") {
      $el.find("img:last").attr("src", obj.src);
    } else {
      $el.find("em").addClass("fn-hide");
    }
    $el.removeClass("fn-hide");
  }
  
  function getStatusContent(status) {
    var sImgName = {
        "VALID": ["light","pass"],
        "INVALID": ["dark",""],
        "PENDING": ["light","uploaded"],
        "OVERDUE": ["dark","expired"],
        "FAILED": ["dark","reject"]
    };
    if (status == "OVERDUE"){
      __noReject.push("overdue");
    } else if(status == "FAILED"){
      __noReject.push("failed");
    } else if(status == "INVALID"){
      return {
        str: sImgName[status][0],
        src: ""
      };
    }
    var aURL = [
       "/static/img/auth_icon/mid/",
       sImgName[status][1],
       ".png"
    ];
    return {
      str: sImgName[status][0],
      src: aURL.join('')
    };
  }

  function setUrl(productType, obj) {
    var oType = {
        "RRGXD": "RRGXD",
        "RRSYD": "RRSYD",
        "RRWSD": "RRWSD"
    };
    if(!oType[productType]) {
      return;
    }
    $(".yeltip-button", obj).find("a").attr("href", "/borrow/borrowPage.action?loanProductType="+oType[productType]);
  }  
  function initYellowTips() {
    if (!noti) return;
    rewriteYellowTipsDOM[noti.type]();
  }

  //初始化小黄条
  initYellowTips();  
});
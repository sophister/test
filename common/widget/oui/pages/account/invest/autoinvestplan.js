define(function(require) {

  var $ = require('jquery'),
      Common = require('common'),
      Dialog = require('dialog'),
      Protocol = require('protocol'),
      Widgets = require('widgets/widgets'),
      Handlebars = require('handlebars'),
      Components = require('components/components');

  var Form = Widgets.Form;
  var couponIntData = {};
  // 提示信息
  $('.iconfont').hover(function(){
    $(this).next().css({
      'position' : 'absolute',
      'left': $(this).position().left + $(this).width() + 6,
      'top': $(this).position().top - 6
    })
    .toggle();
  });

  // 投资表提示信息
  $(function(){

    var overdue = $('.overdue-days');
    var periodNumber = $('#periodNumber').val();
    var liWidth = $('.auto-invest-plan-time li').width();
    var html = '';
    $('.ui-tiptext-container').css('left',periodNumber*liWidth -134);
    for(var i=0; i<overdue.length; i++){
      html+= '<div class="ui-tiptext-container ui-tiptext-container-message ui-tiptext-container-error" style="left:'+ ((overdue.eq(i).parents('tr').find('td').first().attr('id')-1)*liWidth + 25) +'px"><em class="icon-rule"></em><div class="ui-tiptext-arrow ui-tiptext-arrowup"><em>◆</em><span>◆</span></div><p class="ui-tiptext ui-tiptext-message">延期'+ overdue.eq(i).text() +'天</p></div>';
    }

    $(html).appendTo($('.auto-invest-plan-time')); 
  
    var errorTip = $('.ui-tiptext-container-error');
    var errorTipRule = $('.ui-tiptext-container-error .icon-rule');

    errorTipRule.siblings().hide();
    
    errorTipRule.hover(function(){
      $(this).siblings().toggle();
    });

  });

  // 下拉框
  $('.ui-button-dropdown .ui-button').on('click',function(){
    $(this).next().toggle();
    $(this).next().find('li').on('click',function(){
      $(this).parent().prev().find('span').text($(this).find('a').html());
      $(this).parent().hide();
    });
    return false;
  });

  $('body').on('click',function(){
    $('.ui-button-dropdown ul').hide();
  });

  // 修改标签
  var oldTopTitle,tipTitle,tipList,aipCustomName;
  function tip(){
    tipTitle = $('#j_tip_name');
    tipList = $('.tip-list');
    aipCustomName = $('#aipCustomName').val();

    tipList.find('li').on('click',function(){

      if($(this).index() == tipList.find('li').length - 1 ){
        tipList.find('input').show();
      }else{
        tipList.find('input').val('').hide();
      }

      oldTopTitle = tipTitle.text();
      tipList.find('li').removeClass('active');
      $(this).addClass('active');
    }).each(function(){
      if($(this).text() == aipCustomName){
        $(this).siblings().removeClass();
        $(this).addClass('active');
      }
    });
  }

  $(".avatar").on("click",function(){
    tip();
    new Dialog({
      trigger: '.avatar',
      height: '370px',
      width: '650px',
      content: $('.auto-invest-plan-tip')
    }).after('show',function(){
      var dialog = this;

      $('.auto-invest-plan-tip').show();

      $( "#tipopen" ).on( "click", function() {

        var autoInvestPlanId = $('#autoInvestPlanId').val();
        var text = '';

        if( $('.tip-list input').val() ){
          text = $('.tip-list input').val();
        }else{
          text = $('.tip-list .active').text();
          if($('.tip-list li:last').hasClass('active')){
            text = '';
          }
        }

        tipTitle.text(text);

        $.ajax({
          type: 'post',
          url: "/account/customNameAutoInvestPlan.action",
          data: {
            autoInvestPlanIdStr: autoInvestPlanId,
            tagStr: text
          },
          success: function(data){
            if( data.status == 1 ){
              alert( data.message );
            }
            dialog.hide();
          }
        });
      });

      $( "#colse").on( "click", function() {
        $('#j_tip_name').text(oldTopTitle);
        dialog.hide();
      });
    }).after('hide', function () {
      location.reload();
    }).show();
    return false;
  });

  // 补加入
  $('.J_add_money').on("click",function(){
    var oldHtml = $('.J_add_money_div').clone();
    var periodNumber = $('#overdue-periodNumber');
    var rechargeDate = $('#overdue-rechargeDate');
    var overdueDays = $('#overdue-overdueDays');
    var overdueDaysTip = $('#overdue-overdueDays-tip');
    var tipMessage= $('#tip-message');
    var $this = $(this);
    var planRecordId ='';

    periodNumber.text( $this.parent().siblings().eq(0).attr('id'));
    rechargeDate.text($this.parent().siblings().eq(1).text());
    overdueDays.text($this.parent().prev().find('.overdue-days').text());
    planRecordId = $this.parent().siblings().eq(0).attr('autoInvestId');
    
    createCouponDom('J_BJR');
    $('.J_add_money_div').show();

    if( overdueDaysTip.text() <= 10){
      tipMessage.html('小于等于10天，退出时不扣延期费用');
    }else{
      tipMessage.html('退出时将扣除<a target="_blank" href="/help/invest/invest!autoinvestplan.action#fixedInvestOverdue">延期费用</a>');
    }

    new Dialog({
      trigger: '.J_add_money',
      width: '580px',
      content: $('.J_add_money_div')
    }).after('show',function(){
      var dialog = this;

       $('#add_money_tipopen').on( "click", function() {
         var _max = parseInt($("#max-account").val()*100,10);
         var _pay = parseInt($(".J_payable",'.J_BJR').attr("data-payable")*100,10);
         if(_max-_pay < 0){
           $(".ui-confirm-yue",'.J_BJR').html("您的余额不足  　<a href='/account/capital!recharge.action'>充值</a>").show();
           return;
         }else {
           $(".ui-confirm-yue",'.J_BJR').html("").hide();
         }
         var couponId = '';
         if($(".getUseCouponId",".J_BJR").val()){
           couponId = $(".getUseCouponId",".J_BJR").val();
         }
        $.ajax({
          type: 'post',
          url: "/account/rechargeAutoInvestPlan.action",
          data: {
            autoInvestPlanRecordId: planRecordId,
            couponId: couponId
          },
          success: function(data){
            if( data.status == 1 ){
              dialog.hide();
              var rulstOldHtml = $('.rulst-tip_div').clone();
              $('.rulst-tip_div').show();
              new Dialog({
                height: '225px',
                width: '580px',
                content: $('.rulst-tip_div')
              }).after('show',function(){
                var _dialog = this;
                $('.rulst-tip_div').addClass('fail');
                $('.rulst-tip_div .title').text('失败');
                $('.rulst-tip-message').text( data.message);

                $('#rulst_tipopen').on( "click", function() {
                  _dialog.hide();
                });
              }).after('hide',function(){
                rulstOldHtml.appendTo($('.pg-container-content')).hide();
                this.destroy();
              }).show();
            }else{
              dialog.hide();
              var rulstOldHtml = $('.rulst-tip_div').clone();
              $('.rulst-tip_div').show();
              new Dialog({
                height: '245px',
                width: '580px',
                content: $('.rulst-tip_div')
              }).after('show',function(){
                var _dialog = this;
                $('.rulst-tip_div .title').text('成功');
                $('.rulst-tip-message').text(data.message);
                $('.marketTxt').removeClass('fn-hide');
                $('#rulst_tipopen').on( "click", function() {
                  _dialog.hide();
                  location.reload();
                });
              }).after('hide',function(){
                rulstOldHtml.appendTo($('.pg-container-content')).hide();
                this.destroy();
              }).show();
            }
            dialog.hide();
            return false;
          }
        });
      });

      $( "#add_money_colse").on( "click", function() {
        dialog.hide();
      });
    }).after('hide', function () {
      oldHtml.appendTo($('.pg-container-content')).hide();
      this.destroy();
    }).show();
    return false;;
  });

  //
  $('.J_unpay').on("click",function(){
    $(".unpay-tip_div").show();
    new Dialog({
      height: '225px',
      width: '580px',
      content: $('.unpay-tip_div')
    }).after('show',function(){
      var _dialog = this;
      $('#unpay_rulst_tipopen').on( "click", function() {
        _dialog.hide();
      });
    }).after('hide',function(){
      $('.unpay-tip_div').hide();
    }).show();
  });
  
  // 支付

  $('.J_pay_money').on("click",function(){

    var oldHtml = $('.J_pay_money_div').clone();
    var periodNumber = $('#pay_periodNumber');
    var rechargeDateActual = $('#pay_rechargeDateActual');
    var autoInvestPlanId = $('#autoInvestPlanId');
    var $this = $(this);
    var planRecordId;

    var now = new Date();
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate(); 


    if($this.attr('payId')){
      periodNumber.text($this.attr('payId'));
    }else{
      periodNumber.text($this.parent().siblings().eq(0).attr('id'));
    }
    planRecordId = $this.parent().siblings().eq(0).attr("autoInvestId");
    if($this.hasClass('J_pay_top')){
      planRecordId = $this.attr('autoivestid');
    }
    
    rechargeDateActual.text($("#currentDate").val());
    createCouponDom('J_ZF');
    $('.J_pay_money_div').show();

    new Dialog({
      trigger: '.J_pay_money',
      height: '',
      width: '580px',
      content: $('.J_pay_money_div')
    }).after('show',function(){
      var dialog = this;

      $('#add_pay_tipopen').on( "click", function() {
        var _max = parseInt($("#max-account").val()*100,10);
        var _pay = parseInt($(".J_payable",'.J_ZF').attr("data-payable")*100,10);
        if(_max-_pay < 0){
          $(".ui-confirm-yue",'.J_ZF').html("您的余额不足  　<a href='/account/capital!recharge.action'>充值</a>").show();
          return;
        }else {
          $(".ui-confirm-yue",'.J_ZF').html("").hide();
        }
        var couponId = '';
        if($(".getUseCouponId",".J_ZF").val()){
          couponId = $(".getUseCouponId",".J_ZF").val();
        }
        $.ajax({
          type: 'post',
          url: "/account/rechargeAutoInvestPlan.action",
          data: {
            autoInvestPlanRecordId: planRecordId,
            couponId: couponId
          },
          success: function(data){
            if( data.status == 1 ){
              dialog.hide();
              var rulstOldHtml = $('.rulst-tip_div').clone();
              $('.rulst-tip_div').show();
              new Dialog({
                height: '225px',
                width: '580px',
                content: $('.rulst-tip_div')
              }).after('show',function(){
                var _dialog = this;
                $('.rulst-tip_div').addClass('fail');
                $('.rulst-tip_div .title').text('失败');
                $('.rulst-tip-message').text( data.message);

                $('#rulst_tipopen').on( "click", function() {
                  _dialog.hide();
                });
              }).after('hide',function(){
                rulstOldHtml.appendTo($('.pg-container-content')).hide();
                this.destroy();
              }).show();
            }else{
              dialog.hide();
              var rulstOldHtml = $('.rulst-tip_div').clone();
              $('.rulst-tip_div').show();
              new Dialog({
                height: '245px',
                width: '580px',
                content: $('.rulst-tip_div')
              }).after('show',function(){
                var _dialog = this;
                $('.rulst-tip_div .title').text('成功');
                $('.rulst-tip-message').text(data.message);
                $('.marketTxt').removeClass('fn-hide');
                $('#rulst_tipopen').on( "click", function() {
                  _dialog.hide();
                  location.reload();
                });
              }).after('hide',function(){
                rulstOldHtml.appendTo($('.pg-container-content')).hide();
                this.destroy();
              }).show();
            }
            dialog.hide();
          }
        });
      });

      $( "#add_pay_colse").on( "click", function() {
        dialog.hide();
      });
    }).after('hide', function () {
      oldHtml.appendTo($('.pg-container-content')).hide();
      this.destroy();
    }).show();
    return false;
  });

  // 表格隔行换色
  $('.ui-table-inbox tbody tr:odd').addClass('dark');

  // 分页
  var SubPointId = $('#SubPointId').text();
  if(SubPointId!=''){
    new Widgets.List({
      name: 'auto-invest-plan',
      api: Protocol.API.getAutoinvestPlanBidLoans,
      header: true,
      pagination: true,
      params: { subPointId: SubPointId }
    }).init()._update({ subPointId: SubPointId });
  }

  function poup(target,status,message){
    new Dialog({
      trigger: target,
      height: '380px',
      width: '580px',
      content: $('.rulst-tip_div')
    }).after('show',function(){
      $('.rulst-tip').addClass('fail');
      $('.rulst-tip .title').text(status);
      $('.rulst-tip-message').text( message);
    });
  }
  
  //将优惠券插入到支付弹窗
  function createCouponDom(sClass){
    var oParent = $('.'+sClass);
    var couponJson =  Common.loadJSON('#autoinvest-couponlist-rsp', true);
    var myData = {};
    myData.couponList = couponJson.data.couponListJsonVoList;
    if(myData.couponList && myData.couponList[0]){
      myData.initCouponValue = myData.couponList[0];
    }
    myData.unRepayAmountNotComma = parseInt($(".J_payable",oParent).attr("data-payable"),10);
    var myTemplate = Handlebars.compile($("#confirm-autoinvest-join-coupon-template").html());
    $('.J_coupon_wrap',oParent).html(myTemplate(myData));
    Form.ui.init();
    if(couponJson.status===1){
      $('.J_coupon_wrap', oParent).addClass('no-coupon-list');
      $(".J_addCoupon .ui-select",oParent).hide();
      $(".J_addCoupon .ui-selectdrop",oParent).hide();
    }else{
      if(myData.initCouponValue){
        $('.J_coupon_wrap', oParent).removeClass('no-coupon-list');
        couponIntData = {
            id : myData.initCouponValue.couponId,
            payable : parseFloat(myData.unRepayAmountNotComma) - parseFloat(myData.initCouponValue.couponValue)
        };
        if(couponIntData.payable<0){
          couponIntData.payable = 0;
        }
        $(".J_payable",oParent).attr("data-payable",couponIntData.payable).html(Protocol.translator._commaFloat(couponIntData.payable));
        if(myData.initCouponValue.couponTypeEng=="DISCOUNT"){
          $(".J_red_packet_tips",oParent).removeClass("fn-hide");
        }
      }else{
        $('.J_coupon_wrap', oParent).addClass('no-coupon-list');
        $(".J_addCoupon .ui-select",oParent).hide();
        $(".J_addCoupon .ui-selectdrop",oParent).hide();
      }
    }
    couponSelectFn(myData,oParent);
  }
  //优惠券下拉框
  function couponSelectFn (data,oParent){
    //自定义select的按钮事件，点击显示选择
    ///////////////
    //点击其他地方的时候需要关闭弹出的select
    var businessPayAmount = data.unRepayAmountNotComma;
    
    $(document).click(function(e){
      var target = e.target;
      if($(target).parent("span").hasClass("arrow")) return;
      if ( !$(target).parent("div").hasClass("J_select_btn")) {
        $(".J_popBox",oParent).css("display","none");
      }
    });

    $(".J_select_btn",oParent).click(function(e){
      $(".J_popBox",oParent).css("display","none");
      var ul_dom =  $(e.currentTarget).parent().find("ul");
      if(ul_dom.css("display")=="block"){
        ul_dom.css("display","none");
      }else{
        ul_dom.css("display","block");
      }
    });
    //鼠标划过离开select时候的高亮状态
    $(".J_popBox",oParent).on('mouseover','li',function(e){
      $(e.currentTarget).attr("class","selected");
    });

    $(".J_popBox",oParent).on('mouseleave','li',function(e){
      $(e.currentTarget).attr("class","");
    });
    $(".J_popBox",oParent).on('click','li',function(e){
      var value = ($(e.currentTarget).attr("datavalue"));
      var txt = $(e.currentTarget).find("span").text();
      var type = $(e.currentTarget).attr("couponType");
      var dom =  $(e.currentTarget).parent().parent();
      var payable = parseFloat(data.unRepayAmountNotComma)-parseFloat($(e.currentTarget).attr("couponvalue"));
      if(payable<0){
        payable = 0;
      }
      $(".J_red_packet_tips",oParent).addClass("fn-hide");
      dom.find(".J_txt").text(txt);
      couponIntData.id = value;
      couponIntData.payable = payable;
      $(".getUseCouponId",oParent).attr("couponType",type);
      if($(".chooseCoupon",oParent).prop('checked')){
        $(".getUseCouponId",oParent).attr("value",value);
        $(".J_payable",oParent).attr("data-payable",couponIntData.payable).html(Protocol.translator._commaFloat(couponIntData.payable));
        if(type=="DISCOUNT"){
          $(".J_red_packet_tips",oParent).find("span").text($(e.currentTarget).attr("couponvalue"));
          $(".J_red_packet_tips",oParent).removeClass("fn-hide");
        }
      }else{
        if(type=="DISCOUNT"){
          $(".J_red_packet_tips",oParent).find("span").text($(e.currentTarget).attr("couponvalue"));
        }
      }
      checkYuE(oParent);
    });

  //使用密码
    $(".J_use_psw",oParent).on('click',function(){
      $('.J_use_psw_wrap',oParent).toggle();
      $('.J_use_psw_wrap input',oParent).focus();
    });
    $(".J_use_coupon",oParent).on('click',function (){
      var sCouponCodeVal = $.trim($('.J_use_psw_wrap .ui-input',oParent).val());
      if(sCouponCodeVal===""){
        $('.J_use_coupon_tips',oParent).text('优惠券密码不能为空!').show();
        $(".J_use_coupon_tips",oParent).delay(3000).slideUp(function () {
          $(this).html('');
        });
        return;
      }
      $.ajax({
        url : "/account/bindUserCoupon.action?couponCode="+ sCouponCodeVal+"&payAmount="+businessPayAmount+"&businessCategory=AUTO_INVEST_PLAN",
        success : function (result){
          $(".J_use_coupon_tips",oParent).text(result.message).show().delay(3000).slideUp(function () {
            $(this).html('');
          });
          if (result.status === 0) {
            //成功
            $('.ui-selectdrop .J_txt',oParent).text(result.data.name);
            var payable = parseFloat(data.unRepayAmountNotComma)-result.data.couponValue;
            if(payable<0){
              payable = 0;
            }
            $('.ui-selectdrop .J_popBox',oParent).prepend('<li class="" datavalue="'+result.data.couponId+'" unrepayamout="'+businessPayAmount+'" couponvalue="'+result.data.couponValue+'" couponType="'+result.data.couponTypeEng+'"  ><span>'+result.data.name+'</span></li>');
            $('.J_use_psw_wrap',oParent).slideUp();
            $('.J_use_psw_wrap input',oParent).val('');
            couponIntData.id = result.data.couponId;
            couponIntData.payable = payable;
            $(".J_addCoupon .ui-select",oParent).show();
            $(".J_addCoupon .ui-selectdrop",oParent).show();
            if($(".chooseCoupon",oParent).prop('checked')){
              $('.getUseCouponId',oParent).val(result.data.couponId);
              $(".J_payable",oParent).attr("data-payable",couponIntData.payable).html(Protocol.translator._commaFloat(couponIntData.payable));
            }
            if(result.data.couponTypeEng=="DISCOUNT"){
              $(".J_red_packet_tips",oParent).find("span").text(result.data.couponValue);
              $(".J_red_packet_tips",oParent).removeClass("fn-hide");
            }else{
              $(".J_red_packet_tips").addClass("fn-hide");
            }
            checkYuE(oParent);
          }
        }
      });
    });
    //是否选中优惠券checkbox
    $(".chooseCoupon",oParent).on('click',function (){
      if($(this).prop('checked')){
        $('.getUseCouponId',oParent).val(couponIntData.id);
        $(".J_payable",oParent).attr("data-payable",couponIntData.payable).html(Protocol.translator._commaFloat(couponIntData.payable));
        if($(".getUseCouponId",oParent).attr("coupontype")=="DISCOUNT"){
          $(".J_red_packet_tips",oParent).removeClass("fn-hide");
        }
      }else{
        $(".J_red_packet_tips",oParent).addClass("fn-hide");
        $('.getUseCouponId',oParent).val('');
        $('.J_payable',oParent).attr("data-payable",businessPayAmount).html(Protocol.translator._commaFloat(businessPayAmount));
      }
      checkYuE(oParent);
    });
  }
  //判断余额是否足够
  function checkYuE(oParent){
    var _max = parseInt($("#max-account").val()*100,10);
    var _pay = parseInt($(".J_payable",oParent).attr("data-payable")*100,10);
    if(_max-_pay < 0){
      $(".ui-confirm-yue",oParent).html("您的余额不足  　<a href='/account/capital!recharge.action'>充值</a>").show();
    }else {
      $(".ui-confirm-yue",oParent).html("").hide();
    }
  }

});
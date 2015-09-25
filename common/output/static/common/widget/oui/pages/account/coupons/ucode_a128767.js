define('common:widget/oui/pages/account/coupons/ucode', ['require', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/common', 'common:widget/oui/widgets/widgets', 'common:widget/oui/lib/handlebars/1.0.0/handlebars'],function(require) {

  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery');
  var Common = require('common:widget/oui/common');
  var Widgets = require('common:widget/oui/widgets/widgets');
  var Handlebars = require('common:widget/oui/lib/handlebars/1.0.0/handlebars');
  var form = Widgets.Form;



  $(function() {
    form.validate({
      validateData: {
        submitHandler: function(el) {
          form.ajaxSubmit($(el), {
            msgafter: ".J_bind_cou_tips",
            dataType:"json",
            success: function(data) {
              this.msg(data.jsonVo.message, "warn");
              $(".J_bind_cou_tips").text()
              if (data.jsonVo.status === 0) {
                showSuccess(data);
              }
            }
          });
        }
      }
    });

    if(initData&&initData.status==0){
      showSuccess(initData.data);
    }

   var  _getDateTime = function (raw, type) {
      var iso = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/i;
      if (isNaN(Date.parse(raw)) || iso.test(raw)) {
        if (type == 'date') {
          return raw ? raw.substring(0, 10) : '';
        } else {
          return raw ? raw.substring(0, 16).replace('T', ' ') : '';
        }
      } else {
        var date = new Date(raw),
          year = date.getFullYear(),
          day = date.getDate(),
          month = date.getMonth() + 1;
        day = day < 10 ? '0' + day : day;
        month = month < 10 ? '0' + month : month;
        if (type == 'date') {
          return year + '-' + month + '-' + day;
        } else {
          var hr = date.getHours(), min = date.getMinutes();
          hr = hr < 10 ? '0' + hr : hr;
          min = min < 10 ? '0' + min : min;
          return year + '-' + month + '-' + day + ' ' + hr + ':' + min;
        }
      }
    };

    function showSuccess(data){
      data.couponId = data.couponId;
      data.expireDate = data.expireDate;
      data.investAmount = data.investAmount;
      for (var i = 0; i < data.financePlanList.length; i++) {
        data.financePlanList[i].ucodeSerial = data.ucodeSerial;
        data.financePlanList[i].ucodeValue = data.ucodeValue;
        data.financePlanList[i].buyInRate = parseInt(data.financePlanList[i].buyInRate) *0.01 * parseInt(data.investAmount);
      }
      var source = $("#ucode-sub-template").html();
      var template = Handlebars.compile(source);
      var html = template(data);
      $("#ucodeForm").hide().after(html);
      $("#getUseCouponId").val(data.couponId);
    }

    var clickcount = 0;
    $("body").on("click",".linkRsv",function(e){
      if(clickcount == 1)return false;
      clickcount = 1;
      e.preventDefault();
      var rand = new Date().getTime();
      var href = $(this).attr("href") + "&r = " + rand;
      var planurl = "/financeplan/listPlan!detailPlan.action?financePlanId="+ $(this).attr("data-plan-id")+"&couponId="+$("#getUseCouponId").val();
      var ajax = $.getJSON(href+"&callback=?",function(result){
            clickcount = 0;
            if(result.status ===0){//成功
                  location.href =planurl;
            }
            if(result.status && result.status ===1){//失败
              Common.showMessage({
                 error:true,
                 message:result.message
              });
            }
            $('.loading-tips').hide();
       });
       $('.loading-tips').show();
    });

    //使用coupon
    ////////
    $(".J_use_coupon").click(function (){
      $.ajax({
        url : "/account/coupon!useUcodeReserve.action?couponId="+$("#getUseCouponId").val(),
        success:function(data){
          if(data.jsonVo.status === 0){
            showSuccess(data);
          }else{
            $(".J_warn").html(data.jsonVo.message).show();
            $(".J_warn").delay(3000).slideUp(function () {
              $(this).html('');
            });
          }
        }
      });
    });
   
  //使用密码
    $(".J_use_psw").on('click',function(){
      $('.J_use_psw_wrap').toggle();
      $('input','.J_use_psw_wrap').focus();
    });
    
/*
    var Common = require('common');

    *//* Show server message if exists *//*
    var $msgr = $('#pg-server-message');
    if ($msgr.length > 0) {
      var status = $msgr.data('status'),
          message = $msgr.data('message'),
          data = { message: message };

      if (status !== '') {
        if (status === 0 || status === '0') {
          data.success = true;
        }
        else {
          data.error = true;
        }
        Common.showMessage(data);
      }
    }

    *//* Initialize pop-tips *//*
    Common.initPoptips();*/
  });

  //自定义select的按钮事件，点击显示选择
  ///////////////
  //点击其他地方的时候需要关闭弹出的select
  $(document).click(function(e){
    var target = e.target;
    if($(target).parent("span").hasClass("arrow")) return;
    if ( !$(target).parent("div").hasClass("J_select_btn")) {
      $(".J_popBox").css("display","none");
    }
  });

  $(".J_select_btn").click(function(e){
    $(".J_popBox").css("display","none");
    var ul_dom =  $(e.currentTarget).parent().find("ul");
    if(ul_dom.css("display")=="block"){
      ul_dom.css("display","none");
    }else{
      ul_dom.css("display","block");
    }
  });
  //鼠标划过离开select时候的高亮状态
  $(".J_popBox li").mouseover(function(e){
    $(e.currentTarget).attr("class","selected");
  });

  $(".J_popBox li").mouseleave(function(e){
    $(e.currentTarget).attr("class","");
  });
  $(".J_popBox li").click(function(e){
    var value = ($(e.currentTarget).attr("datavalue"));
    var txt = $(e.currentTarget).find("span").text();
    var dom =  $(e.currentTarget).parent().parent();
    $("#getUseCouponId").attr("value",value);
    dom.find(".J_txt").text(txt);
  });

  /*
  //自定义复选框的点击事件
  $(".J_ui_checkbox").click(function(e){
    var dom =  $(e.currentTarget);
    if( dom.hasClass("uncheck")){
      dom.removeClass("uncheck");
      dom.addClass("check");
      dom.find("input").attr("value","true");
    } else{
      dom.removeClass("check");
      dom.addClass("uncheck");
      dom.find("input").attr("value","false");
    }
  });

  var Dialog = require('dialog');
  //优选理财计划弹出框
  new Dialog({
    trigger: '.J_conform_pay_a',
    content: $('#J_conform_pay_div'),
    hasMask: false,
    height:'650px',
    width:'580px'
  });
//点击立即支付以后跳转tab
  $('#J_imm_pay_a').click(function(e){
    $("#J_select_status_ul li:last").trigger("click");
  });
  //ucode兑换输入框，获得焦点后清空提示内容,如果没有输入补充提示内容
  $('.J_ucode_input').focus(function(){
    var v = $('.J_ucode_input');
    if( v.val()=='请输入您要兑换的U-code'){
      v.val('');
    }
  });
  $('.J_ucode_input').blur(function(){
    var v = $('.J_ucode_input');
    console.log($.trim(v.val()).length);
    if( $.trim(v.val()).length == 0){
      v.val('请输入您要兑换的U-code');
    }
  });

  //点击兑换按钮弹出确认
  new Dialog({
    trigger: '.J_duihuan_a',
    content: $('#J_conform_duihuan_div'),
    hasMask: false,
    height:'330px',
    width:'580px'
  });

  new Dialog({
    trigger: '#J_confirm_dh_a',
    content: $('#J_conform_duihuan_s_div'),
    hasMask: false,
    height:'330px',
    width:'580px'
  });

*/


});
define('common:widget/oui/pages/account/account/userbank', ['require', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/pages/account/account/addcard', 'common:widget/oui/widgets/widgets', 'common:widget/oui/arale/dialog/1.3.3/dialog', 'common:widget/oui/lib/handlebars/1.0.0/handlebars'],function (require) {
  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery'),
    addcard = require('common:widget/oui/pages/account/account/addcard'),
    Widgets = require('common:widget/oui/widgets/widgets'),
    Dialog = require('common:widget/oui/arale/dialog/1.3.3/dialog'),
    Handlebars = require('common:widget/oui/lib/handlebars/1.0.0/handlebars');

  var $getMobileCode = $("#getMobileCode");
  var getVoice, getMobile;
  var form = Widgets.Form;
  $(function () {
    var lastNum, dialog, isCheckLuhn = true;
    addcard.pop.init();
    addcard.search.init();

    $("#close").click(function () {
      $(".ui-dialog-close", parent.document).trigger("click");
    });
    
    function showDialog(card) {
      var ctx = {cardNum: splitNum(card)};
      var temlate = Handlebars.compile($('#dialog-confirmBankNum').html());
      var html = temlate(ctx);
      dialog = new Dialog({content: html, width: 500, closeTpl: '', hasMask: {hideOnClick: false}}).show();
    }

    $('body').on('click', '#card-confirm', function () {
      dialog.hide();
      isCheckLuhn = false;
      lastNum = $('#cardId').val();
      $('form').submit();
    });

    $('body').on('click', '#card-cancel', function () {
      dialog.hide();
      $('#cardId').focus();
      isCheckLuhn = true;
      lastNum = $('#cardId').val();
    });

    function splitNum(num) {
      return num.replace(/\d{4}/g, function (n) {
        return  n + " ";
      });
    }
           
    form.validate({
      validateData: {
        submitHandler: function (el) {
          $("#J_must_chooseBankArea").hide();
          form.ajaxSubmit($(el), {
            beforeSend: function () {
              var cardId = $('#cardId').val();
              var isLuhn = form.is.isLuhn(cardId);
              //和上一次的银行卡对比，如果银行卡卡号改变，则重新测试luhn算法
              if (lastNum && lastNum != cardId) {
                isCheckLuhn = true;
              }
              if (isCheckLuhn && !isLuhn) {
                showDialog(cardId);
                return false;
              }
            },
            success: function (data) {
              if (data.status === 0) {
                $("#J_addCardSuccess").show();
                new Dialog({
                  width:'500px',
                  content:$("#J_addCardSuccess")
                }).after('show',function(){
                  var dialog = this;
                  //删除成功 关闭
                  $(".J_close","#J_addCardSuccess").click(function(){
                    dialog.hide();
                  });
                }).after('hide',function(){
                  parent.location.reload();
                }).show();
              }else{
                $("#serverMsg").html(data.message);
              }
            }
          });
        }
      }
    });     
    
    //验证银行卡不能输入非数字
    $("#cardId").on("keydown",function(ev){
      if((ev.keyCode<48 || ev.keyCode>57 ) && ev.keyCode!=8){
        if(ev.keyCode<96 || ev.keyCode>105){
          return false; 
        }
      }
      $(".J_friendTip").show();
    });
    $("#cardId").on("keyup",function(){
      $(".J_friendTip").html(splitNum($(this).val()));
    });
    $("#cardId").on("focus",function(){
      if($("#cardId").val()!==""){
        $(".J_friendTip").show();
      }
    });
    $("#cardId").on("blur",function(){
      $(".J_friendTip").hide();
    });
    
  }); 
  
  
  
  //验证手机码
   getMobile = form.sendPhoneCode("", "getMobileCode", "/account/bindMobile!sendOrigionalPhoneCode.action?&checkCode=other", {
      onStart: function () {
        switchEnable($("#getVoiceCode"), false);
        $('#voiceCodeBox').show();
      },
      onClear: function () {
        switchEnable($("#getVoiceCode"), true);
      },
      unDisabled:true
    });
  getVoice = form.sendPhoneCode('', 'getVoiceCode', '/account/bindMobile!sendOrigionalPhoneCode.action?type=VOICE&checkCode=other', {
      onStart: function () {
        switchEnable($("#getMobileCode"), false);
      },
      onClear: function () {
        switchEnable($("#getMobileCode"), true);
      },
      unDisabled:true
    });
  function switchEnable($obj, enabled) {
    if (!$obj.length) return;
    if (enabled) {
      $obj.removeAttr('disabled').removeClass("ui-button-disabled");
    } else {
      $obj.attr("disabled", "disabled").addClass("ui-button-disabled");
    }
  }
  
  //自定义select的按钮事件，点击显示选择
  ///////////////
  //点击其他地方的时候需要关闭弹出的select
  $(document).click(function(e){
    var target = e.target;
    if($(target).parent("span").hasClass("arrow")) return;
    if ( !$(target).parent("div").hasClass("J_select_btn") && !$(target).closest("div.J_popBankBox").length) {
      $(".J_popBankBox").css("display","none");
    }
  });

  $(".J_select_btn").click(function(e){
    $(".J_popBox").css("display","none");
    var ul_dom =  $(e.currentTarget).parent().find(".J_popBankBox");
    if(ul_dom.css("display")=="block"){
      ul_dom.css("display","none");
    }else{
      ul_dom.css("display","block");
    }
  });
  $(".J_chooseOtherBank").click(function(){
    var txt = $(this).text()=="选择其他银行" ? "收起" : "选择其他银行";
    $(this).text(txt);
    $(".J_otherBankList").toggle();
  });
  
  $(".J_popBankBox li").click(function(e){
    var value = ($(e.currentTarget).attr("datavalue"));
    var txt = $(e.currentTarget).html();
    var dom =  $(e.currentTarget).parent().parent().parent();
    $("#selBankType").attr("value",value);
    $(".J_popBankBox").hide();
    dom.find(".J_txt").html(txt);
    $("#J_must_chooseBank").hide();
    $("#selBankType").blur();
  });
  
});

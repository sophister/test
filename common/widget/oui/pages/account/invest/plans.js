define(function (require) {

  var $ = require('jquery'),
    Common = require('common'),
    Protocol = require('protocol'),
    Widgets = require('widgets/widgets'),
    Components = require('components/components'),
    Dialog = require('dialog'),
    Handlebars = require('handlebars');

  var Form = Widgets.Form;



  var PlanOnHoldingItem = function (conf) {
    $.extend(this, {
      container: conf.container,
      subPointid: '',
      handler: null,
      dialogExitExecution: null,
      dialogExit: null,
      _ui: {}
    });
  };

  $.extend(PlanOnHoldingItem.prototype, {
    init: function () {
      var self = this,
        ui = this._ui;
      ui.btn = self._elem('quit');
      ui.rollbtn = self._elem('rollOver');
      ui.rollbtn.index = 0;
      if (ui.btn.length > 0) {
        self.handler = new Components.PlanQuitHandler({
          planName: self.container.data('plan-name'),
          subPointId: self.container.data('sub-point-id'),
          finalAmount: self.container.data('final-amount')
        }).init();

        if (Common.constant.QUIT_PLAN_DISABLED) {
          ui.btn.removeClass('cursor-pointer');
          ui.btn.addClass('quit-disabled');
        }

        ui.btn.click(function (event) {
          if (!Common.constant.QUIT_PLAN_DISABLED) {
            self.handler.start('exit');
          }
        });
      }
      ui.rollbtn.click(function(){
        if(ui.rollbtn.index!=0){
          return;
        }
        ui.rollbtn.index++;
        farmatRollOverData($(this).attr('data-subPointId'),ui.rollbtn);
        $.get('/html/blank/blank.html?tag=3xuqilist',function(){});
      });
    },

    _elem: function (name) {
      return this.container.find('[data-name="' + name + '"]');
    }
  });
  
  //续期
  
  function farmatRollOverData(id,btn){
    $.get('/account/invest!rollOverInfo.action?subPointId='+id,function(data){
      if(data.status==0){
        var ret = {
            financePlanName : data.data.financePlanName,
            subPointId: data.data.subPointId,
            category : data.data.financePlanTemplate.category,
            lockPeriod : data.data.financePlanTemplate.lockPeriod,
            expectedRateUplan:  Protocol.translator._fixedFloat2(data.data.financePlanTemplate.expectedRateUplan),
            seniorDiscountRate: Protocol.translator._fixedFloat2(data.data.seniorDiscountRate),
            discountRate: Protocol.translator._fixedFloat2(data.data.discountRate),
            rollOverAmount: Protocol.translator._fixedFloat2(data.data.rollOverAmount),
            lockDays: data.data.lockDays,
            financePlanId: data.data.financePlanId
        };
        showRollOverDialog(ret,btn);
      }else{
        alert(data.message);
      }
    });
  }
  
  function showRollOverDialog (data,btn){
    var source = $("#confirm-uplan-roll-over-plans-template").html();
    var template = Handlebars.compile(source);
    var html = template(data);
    var dl = new Dialog({
      width: '580px'
    }).before('show', function () {
      this.set('content', html);
    }).after('hide', function () {
      btn.index = 0;
      dl.element.remove();
    }).after('show',function(){
      Form.ui.partInit($("#J_ROLLOVER_FORM"));
      $('#J_ROLLOVER_FORM .ui-confirm-cancel-link').click(function () {
        dl.hide();
        dl.element.remove();
      });
      //提交表单
      $("#J_ROLLOVER_FORM").submit(function(e){
        var agreement = $('input[name="agree-contract"]');
        var hint = $('.ui-confirm-agree-hint');
        if($("#J_cashPassword2").val().length===0){
         $('#J_ERROR_P_TX2').css('display','block');
         return false;
        }
        if (agreement.length > 0) {
          var agreed = agreement.prop('checked');
          if (!agreed) {
            hint.text('投标前请阅读并同意协议');
            hint.show();
            return false;
          }
          else {
            hint.hide();
          }
        }
        // enscript pwd
        $('#J_cashPassword2').val(RSAencript($('#J_cashPassword2').val()));
      });
      $("#J_cashPassword2").focus(function(){
        $('#J_ERROR_P_TX2').css('display','none');
      });
      //选择加息续期
      $("#addrate-agree").on('click',function(){
        var r1 = parseInt($("#addRate").attr('data-seniorDiscountRate')*100,10);
        var r2 = parseInt($("#addRate").attr('data-discountRate')*100,10);
        var r = (r1+r2)/100;
        if($(this).prop('checked')){
          $("#addRate").text('+'+r.toFixed(2)+'%');
          $("#rollOverOrNot").val(2);
        }else{
          $("#addRate").text('+'+(r2/100).toFixed(2)+'%');
          $("#rollOverOrNot").val(1);
        }
      });
      
    }).show();
    if ($("#tipCon_7").length && $("#tips_7").length) {
      $('#tips_7').on('mouseleave',function(e){
        $('#tipCon_7').hide();
      });
     $('#tips_7').on('mousemove',function(e){
         var ldis = $("#tips_7").offset().left - $("#J_ROLLOVER_FORM").offset().left + 20;
         $('#tipCon_7').css('left',ldis+'px').show();
     });
    }
    if ($("#tipCon_8").length && $("#tips_8").length) {
      $('#tips_8').on('mouseleave',function(e){
        $('#tipCon_8').hide();
      });
     $('#tips_8').on('mousemove',function(e){
       var ldis = $("#tips_8").offset().left - $("#J_ROLLOVER_FORM").offset().left + 20;
       $('#tipCon_8').css('left',ldis+'px').show();
     });
    }
  }
  
  new Widgets.List({
    name: 'holding-list',
    api: Protocol.API.getUserHoldingPlans,
    title: true,
    filter: true,
    pagination: true,
    rendered: function () {
      this.container.children('li.ui-list-item').each(function (i, elem) {
        new PlanOnHoldingItem({
          container: $(elem)
        }).init();
      });
      Common.initPoptips(this.container);
    }
  }).init(Common.loadJSON('#holding-list-rsp', true));

  new Widgets.Tab({
    name: 'plans',
    switched: function (from, to, initialized) {
      if (initialized) {
        return true;
      }

      if (to == 'exiting') {
        new Widgets.List({
          name: 'exiting-list',
          api: Protocol.API.getUserExitingPlans,
          title: true,
          pagination: true
        }).init()._update();
      }

      if (to == 'exited') {
        new Widgets.List({
          name: 'exited-list',
          api: Protocol.API.getUserExitedPlans,
          title: true,
          pagination: true,
          rendered: function () {
            Common.initPoptips(this.container);
          }
        }).init()._update();
      }

      if (to == 'reserve') {
        new Widgets.List({
          name: 'reserve-list',
          api: Protocol.API.getUserReservePlans,
          title: true,
          pagination: true,
          rendered: function () {
            Common.initPoptips(this.container);
          }
        }).init()._update();

      }

      return true;
    }
  }).init();

  $('body').on('click', ".list-a-pay", function (e) {
    e.preventDefault();
    $.get("/account/invest!detailPlanRsv.action?financeId=" + $(this).data("id")+"&t="+(new Date().getTime()), function (data) {
      if (data.status === 1) {
        alert(data.message);
        return;
      }
      var myData = data.data.financePayDetail;
      myData.joinFee = myData.joinFee ? myData.joinFee : 0;
      myData.expectedRate = myData.expectedRate;
      myData.planAmount = Protocol.translator._commaFloat(myData.planAmount);
      myData.unRepayAmountComma = Protocol.translator._commaFloat(myData.unRepayAmount);
      myData.unRepayAmountNotComma = myData.unRepayAmount;
      myData.availablePointsNotTran = myData.availablePoints;
      myData.availablePoints = Protocol.translator._commaFloat(myData.availablePoints);
      myData.codeList = data.data.couponList;
      myData.initCouponValue = data.data.couponList[0];
      showPay(myData);
    });
  });

  var $bankSelectCon = $("<div class='fn-hide'></div>").appendTo($("body"));

  Common.fillTemplate({
    container: $bankSelectCon,
    template: $('#bank-accounts-template'),
    data: Protocol.translator.translate(
    Protocol.API.getUserBankInfo, Common.loadJSON('#bank-accounts-rsp', true).data)
  });


  function showPay(data) {
    var source = $("#confirm-pay-template").html();
    var template = Handlebars.compile(source);
    var couponIntData = {};
    if(data.initCouponValue){
      var couponIntData = {
          id : data.initCouponValue.couponId,
          payable : parseInt(data.unRepayAmountNotComma) - parseInt(data.initCouponValue.couponValue)
      };
    }
    if (data.category == 'OLD') {
      data.categorystr = 1;
    }
    var html = template(data);

    var dl = new Dialog({
      width: '580px'
    }).before('show', function () {
      this.set('content', html);
    }).after('hide', function () {
      dl.element.remove();
    }).show();
    Form.ui.init();
    if(data.initCouponValue){;
      if(couponIntData.payable<0){
        couponIntData.payable = 0;
      }
      $(".J_payable").attr("data-payable",couponIntData.payable).html(Protocol.translator._commaFloat(couponIntData.payable));
    }else{
      $(".ui-select",".J_addCoupon").hide();
      $(".ui-selectdrop",".J_addCoupon").hide();
    }
    Form.validate({
      target: "#accontRsvConfirm",
      validateData: {
        submitHandler: function (el) {
          if ($("input[name='cashTypeStr']:checked").val() == "BANK") {
            if (!$.trim($("#txPsw").val())) {
              $("#pswMsg").html("交易密码不能为空");
              return;
            } else {
              $("#pswMsg").empty();
            }
          }
          var _max = parseInt($("#max-account").attr("data-account")*100,10);
          var _pay = parseInt($(".J_payable").attr("data-payable")*100,10);
          if(_max-_pay < 0){
            $(".ui-confirm-yue").text("您的余额不足").show();
            return;
          }
          el.submit();
        }
      }
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
    $(".J_popBox").on('mouseover','li',function(e){
      $(e.currentTarget).attr("class","selected");
    });

    $(".J_popBox").on('mouseleave','li',function(e){
      $(e.currentTarget).attr("class","");
    });
    $(".J_popBox").on('click','li',function(e){
      var value = ($(e.currentTarget).attr("datavalue"));
      var txt = $(e.currentTarget).find("span").text();
      var type = $(e.currentTarget).attr("couponType");
      var dom =  $(e.currentTarget).parent().parent();
      var payable = parseInt(data.unRepayAmountNotComma)-parseInt($(e.currentTarget).attr("couponvalue"));
      if(payable<0){
        payable = 0;
      }
      $(".J_red_packet_tips").addClass("fn-hide");
      dom.find(".J_txt").text(txt);
      couponIntData.id = value;
      couponIntData.payable = payable;
      $("#getUseCouponId").attr("couponType",type);
      if($("#chooseCoupon").prop('checked')){
        $("#getUseCouponId").attr("value",value);
        $(".J_payable").attr("data-payable",couponIntData.payable).html(Protocol.translator._commaFloat(couponIntData.payable));
        if(type=="DISCOUNT"){
          $("span",".J_red_packet_tips").text($(e.currentTarget).attr("couponvalue"));
          $(".J_red_packet_tips").removeClass("fn-hide");
        }
      }else{
        if(type=="DISCOUNT"){
          $("span",".J_red_packet_tips").text($(e.currentTarget).attr("couponvalue"));
        }
      }
      checkYuE();
    });


    $("#closeDialog").unbind().on("click", function () {
      location.reload();
      $(".ui-dialog-close").trigger("click");
    });
    $(".ui-dialog-close").unbind().on("click", function () {
      location.reload();
    });

    //使用密码
    $(".J_use_psw").on('click',function(){
      $('.J_use_psw_wrap').toggle();
      $('input','.J_use_psw_wrap').focus();
    });
    $(".J_use_coupon").on('click',function (){
      var sCouponCodeVal = $.trim($('.ui-input','.J_use_psw_wrap').val());
      if(sCouponCodeVal===""){
        $('.J_use_coupon_tips').text('优惠密码不能为空!').show();
        $(".J_use_coupon_tips").delay(3000).slideUp(function () {
          $(this).html('');
        });
        return;
      }
      var businessCategory = "";
      if(data.category=='A'){
    	  businessCategory="UPLAN_A";
      }
      if(data.category=='B'){
    	  businessCategory="UPLAN_B";
      }
      if(data.category=='C'){
    	  businessCategory="UPLAN_C";
      }
      $.ajax({
        url : "/account/bindUserCoupon.action?couponCode="+ sCouponCodeVal+"&payAmount="+data.unRepayAmountNotComma+"&businessCategory="+businessCategory+"&t="+(new Date().getTime()),
        success : function (result){
          $(".J_use_coupon_tips").text(result.message).show().delay(3000).slideUp(function () {
            $(this).html('');
          });
          if (result.status === 0) {
            //成功
            $('.J_txt','.ui-selectdrop').text(result.data.name);
            var payable = parseInt(data.unRepayAmountNotComma)-result.data.couponValue;
            if(payable<0){
              payable = 0;
            }
            $('.J_popBox','.ui-selectdrop').prepend('<li class="" datavalue="'+result.data.couponId+'" couponvalue="'+result.data.couponValue+'" unrepayamout="'+businessPayAmount+'" couponType="'+result.data.couponTypeEng+'" ><span>'+result.data.name+'</span></li>')
            $('.J_use_psw_wrap').slideUp();
            $('input','.J_use_psw_wrap').val('');
            couponIntData.id = result.data.couponId;
            couponIntData.payable = payable;
            $(".ui-select",".J_addCoupon").show();
            $(".ui-selectdrop",".J_addCoupon").show();
            if($("#chooseCoupon").prop('checked')){
              $('#getUseCouponId').val(result.data.couponId);
              $(".J_payable").attr("data-payable",couponIntData.payable).html(Protocol.translator._commaFloat(payable));
            }
            if(result.data.couponTypeEng=="DISCOUNT"){
              $("span",".J_red_packet_tips").text(result.data.couponValue);
              $(".J_red_packet_tips").removeClass("fn-hide");
            }else{
              $(".J_red_packet_tips").addClass("fn-hide");
            }
          }
        }
      });
    });

    $("#chooseCoupon").on('click',function (){
      if($(this).prop('checked')){
        $('#getUseCouponId').val(couponIntData.id);
        $(".J_payable").attr("data-payable",couponIntData.payable).html(Protocol.translator._commaFloat(couponIntData.payable));
        if($("#getUseCouponId").attr("coupontype")=="DISCOUNT"){
          $(".J_red_packet_tips").removeClass("fn-hide");
        }
      }else{
        $(".J_red_packet_tips").addClass("fn-hide");
        $('#getUseCouponId').val('');
        $('.J_payable').attr("data-payable",data.unRepayAmount).html(data.unRepayAmountComma);
      }
      checkYuE();
    });

    $("#J_conform_pay_div").unbind("click").on('click', 'input[name="cashTypeStr"]', function () {
      if ($(this).val() == "BANK") {
        $(this).parent().siblings('select').html($bankSelectCon.html()).show();

        if ($(this).parent().siblings('select').val() != '-1') {
          $(this).parent().siblings('#J_TX_pass').show(); //如果有银行卡
        } else {
          $(this).parent().siblings('#J_a_addbank').show(); //没有银行卡则显示添加按钮
        }

      } else {
        $(this).parent().siblings('select').hide();
        $(this).parent().siblings('#J_TX_pass').hide();
        $(this).parent().siblings('#J_a_addbank').hide();
        $("#pswMsg").empty();
      }
    });
  }

  if ($("#J_imm_pay_a").length) {
    $("#J_imm_pay_a").click(function (e) {
      $("#plans-tab li:last").trigger("click");
      e.preventDefault();
    });
  }

  if ($('#pg-helper-tab-jumpping').text() == 'RESERVATIONS' || getParameterByName("tab") == "reservations") {
    $("#plans-tab li:last").trigger("click");
  }

  function getParameterByName(name) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }

  function checkYuE (){
    //判断余额
    var _max = parseInt($("#max-account").attr("data-account")*100,10);
    var _pay = parseInt($(".J_payable").attr("data-payable")*100,10);
    if(_max-_pay < 0){
      $(".ui-confirm-yue").text("您的余额不足").show();
    }else {
      $(".ui-confirm-yue").text("").hide();
    }
  }

});
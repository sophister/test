define(function (require, exports, module) {

  var $ = require('jquery'),
    Dialog = require('dialog'),
    Common = require('common'),
    Protocol = require('protocol'),
    Widgets = require('widgets/widgets');
    Handlebars = require('handlebars');

  var Form = Widgets.Form;

  var InvestmentTerminal = function (conf) {
    $.extend(this, {
      container: conf.container,
      template: conf.template,
      page: conf.page || 'loan-invest',
      unit: conf.unit || 'amount',
      qualified: conf.qualified,
      qualifiedMessage: conf.qualifiedMessage,
      authenticated: conf.authenticated,
      amountPerShare: conf.amountPerShare || 50,
      fee: conf.fee || 0,
      deposit: conf.deposit || 0,

      plan: conf.plan || {},

      utmSourceTransfer:conf.utmSourceTransfer ||false,
      max: {
        amount: conf.maxAmount,
        shares: conf.maxShares,
        account: conf.maxAccount
      },
      min: {
        amount: conf.minAmount
      }
    });

    this.ui = {
      input: this.container.find('.ui-term-input'),
      placeholder: this.container.find('.ui-term-placeholder'),
      error: this.container.find('.ui-term-error'),
      hint: this.container.find('.ui-term-hint'),
      eq: this.container.find('.ui-term-eq'),
      pseudoForm: this.container.find('.ui-term-form'),
      submitForm: this.container.find('.ui-term-form-real'),
      minus: this.container.find('.minus'),
      plus: this.container.find('.plus'),

      deposit: this.container.find('#deposit'),
      // plan specific
      fee: this.container.find('#fee'),
      // plan specific
      gainChoices: this.container.find('.ui-term-gain'),
      bankAccount: this.container.find('.ui-term-bank-account')
    };

    this.maxdepositamount = Number($('#J_thisMaxDepositAmount').attr('data'));

    this.ui.pseudoForm.find("button").removeAttr("disabled").removeClass("ui-button-gray");

    var o = this;
    $.each(this.max, function (k, v) {
      if (v instanceof $ && v.length > 0) {
        o.max[k] = parseFloat(v.data(k), 10);
      }
    });

    var m = this.unit == 'amount' ? this.max.amount + '元' : this.max.shares + '份';
    var min = this.min.amount+'元';
    var t = Protocol.translator;

    this.errors = {
      NONE: '',
      EXCEEDED_MAX: '您最多只能购买' + m,
      EXCEEDED_MIN: '您最少购买' + min,
      OVER_BALANCE: '账户余额不足',
      NOT_INT: '请输入整数' + (this.unit == 'amount' ? '金额' : '份额'),
      NOT_INT_SHARE: '输入金额需为' + t._commaInteger(this.amountPerShare) + '元的整数倍',
      NO_INPUT: '请输入有效' + (this.unit == 'amount' ? '金额' : '份额')
    };
  };

  $.extend(InvestmentTerminal.prototype, {
    init: function (data, showDialog) {
      var me = this;
      var ui = this.ui;

      if (ui.input.attr('disabled') == 'disabled') {
        this.inputUpdated();
      } else {
        this.initInput(data);
      }

      this.initPseudoForm(showDialog);
      this.initGainChoices();

      ui.placeholder.click(function () {
        ui.input.focus();
      });
      //创富加减按钮
      ui.minus.click(function(){
        var v = Number(ui.input.val());
        var am = Number($("#max-amount").attr('data-amount'));
        if(v<=1000){
          return;
        }
        v-=1000;
        var err = me.check(v);
        if (err === me.errors.NONE) {
            me.toggleErrorMessage(null);
            ui.input.removeClass('invalid');
            ui.pseudoForm.find('button[type="submit"]').removeClass('disabled');
        }
        ui.input.val(v);
        var v2 = parseInt(v / 1000, 10);
        ui.eq.text(v2 + '份');
      });
      ui.plus.click(function(){
        var v = Number(ui.input.val());
        var am = Number($("#max-amount").attr('data-amount'));
        if(v>=am) return;
        v+=1000;
        me.check(v);
        var err = me.check(v);
        if (err === me.errors.NONE) {
            me.toggleErrorMessage(null);
            ui.input.removeClass('invalid');
            ui.pseudoForm.find('button[type="submit"]').removeClass('disabled');
        }
        ui.input.val(v);
        var v2 = parseInt(v / 1000, 10);
        ui.eq.text(v2 + '份');
      });
    },

    initInput: function (data) {
      var me = this,
        ui = this.ui;

      ui.input.focusin(function () {
        if (ui.placeholder.is(':visible')) {
          ui.placeholder.hide();
        }
      }).focusout(function () {
        if (ui.input.val() === '') {
          ui.placeholder.show();
        }
      }).keyup(function () {
        me.inputUpdated();
      });

      if (data) {
        ui.input.focusin();
        ui.input.val(data[me.unit]);
        ui.input.keyup();
      }
      else {
        ui.input.val('');
        ui.eq.text('');
        if($("#loan-type").val()=="cf"){
          ui.input.val(1000);
        }
      }
    },

    inputUpdated: function () {
      var me = this,
        ui = this.ui;
      var v = ui.input.val();
      var pseudoSubmit = ui.pseudoForm.find('button[type="submit"]');
      if (v.length > 10) {
        v = v.substring(0, 10);
      }
      v = parseInt(v, 10);
      if (isNaN(v)) {
        ui.input.removeClass('invalid');
        pseudoSubmit.removeClass('disabled');
        ui.input.val('');
        ui.eq.text('');
        me.toggleErrorMessage(null);
        if(me.page == 'autoinvest-join'){
          $(".J_totalMyInvest").text("0");
        }
        return;
      }
      else {
        ui.input.val(v);
      }
      var err = me.check(v);
      if (err === me.errors.NONE) {
        me.toggleErrorMessage(null);
        ui.input.removeClass('invalid');
        if (v !== '') {
          var v2;
          if (me.unit == 'amount') {
            v2 = parseInt(v / me.amountPerShare, 10);
            ui.eq.text(v2 + '份');
          }
          else {
            v2 = Math.round(v * me.amountPerShare * 100) / 100;
            ui.eq.text(v2 + '元');
          }
          pseudoSubmit.removeClass('disabled');
        }
        else {
          pseudoSubmit.addClass('disabled');
          ui.eq.text('');
        }
        if(pseudoSubmit.hasClass('HASJOINED')){
          pseudoSubmit.addClass('disabled');
        }
      }
      else {
        me.toggleErrorMessage(err);
        pseudoSubmit.addClass('disabled');
        ui.input.addClass('invalid');
        ui.eq.text('');
      }

      if ((err === me.errors.NONE || err === me.errors.OVER_BALANCE) && v !== '') {
        var depositV = parseInt(me.deposit * v, 10);
        depositV = depositV >= this.maxdepositamount ? this.maxdepositamount : depositV;


        var maxda = Number($('#J_thisMaxDepositAmount').attr('data'));
        var maxall = Number($('#J_maxDepositAmount').attr('data'));

        if (depositV > maxda) {
          ui.deposit.text(maxda);
        } else if (depositV > maxall) {
          ui.deposit.text(maxall);
        } else {
          ui.deposit.text(depositV);
        }
        ui.fee.text(parseInt(me.fee * v, 10));
      }
      else {
        ui.deposit.text('0');
        ui.fee.text('0');
      }
    },

    initPseudoForm: function (showDialog) {
      var me = this,
        ui = this.ui;
      var couponIntData = {}
      ui.pseudoForm.submit(function () {;
        if (ui.pseudoForm.find('button[type="submit"]').hasClass('disabled')) {
          return false;
        }
        if (!ui.input.val() || parseInt(ui.input.val(), 10) === 0) {
          ui.hint.hide();
          ui.error.text(me.errors.NO_INPUT).show();
          return false;
        }
        if (me.check(ui.input.val()) == me.errors.NONE) {
          if (!me.authenticated) {
            // TODO: redirect back with amount after login
            window.location.replace('/loginPage.action');
          }
          else if (!me.qualified) {
            Common.showMessage({
              error: true,
              message: me.qualifiedMessage
            });
          }
          else {
            var html = Common.fillTemplate({
              template: me.template,
              data: me.getData()
            });
            
            if($("#invest-type").val()=="U-Plan"){
              var category = $("#financePlanCategory").val();
              var businessCategory = "UPLAN_"+category;
              var businessPayAmount = me.getData().amountAndFee;
              getCouponFn(businessPayAmount,businessCategory);
            }else if($("#invest-type").val()=="loan"){
              var businessCategory = "LOAN";
              var businessPayAmount = me.getData().amount;
              getCouponFn(businessPayAmount,businessCategory);
            }else if($("#invest-type").val()=="transfer"){
              var businessCategory = "TRANSFER";
              var businessPayAmount = me.getData().amount;
              getCouponFn(businessPayAmount,businessCategory);
            }else if($("#invest-type").val()=="AUTOINVEST"){
              var businessCategory = "AUTO_INVEST_PLAN";
              var businessPayAmount = me.getData().amount;;
              if($("#hasSameDate").val()!=0){
                $(".autoinvest-tip_div").show();
                new Dialog({
                  width: '580px',
                  content: $('.autoinvest-tip_div')
                }).after('show',function(){
                  var _dialog = this;
                  $('#gooninvest').on( "click", function() {
                    _dialog.hide();
                    getCouponFn(businessPayAmount,businessCategory);
                    
                    new Dialog({
                      content: html,
                      width: "580"
                    }).after('show', function () {
                      var dialog = this;
                      $('.ui-confirm-cancel-link').click(function () {
                        dialog.hide();
                      });
                      me.renderConfirmation();
                      //Form.ui.init();
                      if ($("#reserveForm").length) {
                        $("#closeRsvDialog").click(function () {
                          $(".ui-dialog-close").trigger("click");
                        });
                        Form.validate({
                          target: "#reserveForm"
                        });
                      }
                    }).after('hide', function () {
                      this.destroy();
                      location.reload();
                    }).show();
                  });
                }).after('hide',function(){
                  $('.autoinvest-tip_div').hide();
                }).show();
                
                return false;
              }else{
                getCouponFn(businessPayAmount,businessCategory);
              }
            }

            new Dialog({
              content: html,
              width: "580"
            }).after('show', function () {
              var dialog = this;
              $('.ui-confirm-cancel-link').click(function () {
                dialog.hide();
              });
              me.renderConfirmation();
              //Form.ui.init();
              if ($("#reserveForm").length) {
                $("#closeRsvDialog").click(function () {
                  $(".ui-dialog-close").trigger("click");
                });
                Form.validate({
                  target: "#reserveForm"
                });
              }
            }).after('hide', function () {
              this.destroy();
              location.reload();
            }).show();
          }
        }
        return false;
      });

      if (showDialog && me.authenticated && me.qualified) {
        ui.pseudoForm.submit();
      }

      function  getCouponFn(businessPayAmount,businessCategory){
        $.ajax({
          url : "/getUsableCoupon.action?payAmount="+businessPayAmount+"&businessCategory="+businessCategory+"&t="+(new Date().getTime()),
          success : function (data){
            var myData = data.data;
            if(data.data.couponList && data.data.couponList[0]){
              myData.initCouponValue = data.data.couponList[0];
            }
            myData.unRepayAmountNotComma = businessPayAmount;
            var myTemplate = Handlebars.compile($("#confirm-plan-join-coupon-template").html());
            $('.J_coupon_wrap').html(myTemplate(myData));
            Form.ui.init();
            if(data.status===1){
              $(".ui-select",".J_addCoupon").hide();
              $(".ui-selectdrop",".J_addCoupon").hide();
            }else{
              if(myData.initCouponValue){
                couponIntData = {
                    id : myData.initCouponValue.couponId,
                    payable : parseFloat(myData.unRepayAmountNotComma) - parseFloat(myData.initCouponValue.couponValue)
                };
                if(couponIntData.payable<0){
                  couponIntData.payable = 0;
                }
                $(".J_payable").attr("data-payable",couponIntData.payable).html(Protocol.translator._commaFloat(couponIntData.payable));
                
                if(myData.initCouponValue.couponTypeEng=="DISCOUNT"){
                  $(".J_red_packet_tips").removeClass("fn-hide");
                }
                
              }else{
                $(".ui-select",".J_addCoupon").hide();
                $(".ui-selectdrop",".J_addCoupon").hide();
              }
            }
            couponSelectFn(myData);
          }
        });
        function couponSelectFn (data){
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
            var payable = parseFloat(data.unRepayAmountNotComma)-parseFloat($(e.currentTarget).attr("couponvalue"));
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
            me.checkYuE();
          });

        //使用密码
          $(".J_use_psw").on('click',function(){
            $('.J_use_psw_wrap').toggle();
            $('input','.J_use_psw_wrap').focus();
          });
          $(".J_use_coupon").on('click',function (){
            var sCouponCodeVal = $.trim($('.ui-input','.J_use_psw_wrap').val());
            if(sCouponCodeVal===""){
              $('.J_use_coupon_tips').text('优惠券密码不能为空!').show();
              $(".J_use_coupon_tips").delay(3000).slideUp(function () {
                $(this).html('');
              });
              return;
            }
            $.ajax({
              url : "/bindUserCoupon.action?couponCode="+ sCouponCodeVal+"&payAmount="+businessPayAmount+"&businessCategory="+businessCategory,
              success : function (result){
                $(".J_use_coupon_tips").text(result.message).show().delay(3000).slideUp(function () {
                  $(this).html('');
                });
                if (result.status === 0) {
                  //成功
                  $('.J_txt','.ui-selectdrop').text(result.data.name);
                  var payable = parseFloat(data.unRepayAmountNotComma)-result.data.couponValue;
                  if(payable<0){
                    payable = 0;
                  }
                  $('.J_popBox','.ui-selectdrop').prepend('<li class="" datavalue="'+result.data.couponId+'" unrepayamout="'+businessPayAmount+'" couponvalue="'+result.data.couponValue+'" couponType="'+result.data.couponTypeEng+'" ><span>'+result.data.name+'</span></li>');
                  $('.J_use_psw_wrap').slideUp();
                  $('input','.J_use_psw_wrap').val('');
                  couponIntData.id = result.data.couponId;
                  couponIntData.payable = payable;
                  $(".ui-select",".J_addCoupon").show();
                  $(".ui-selectdrop",".J_addCoupon").show();
                  if($("#chooseCoupon").prop('checked')){
                    $('#getUseCouponId').val(result.data.couponId);
                    $(".J_payable").attr("data-payable",couponIntData.payable).html(Protocol.translator._commaFloat(couponIntData.payable));
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
              $('.J_payable').attr("data-payable",businessPayAmount).html(Protocol.translator._commaFloat(businessPayAmount));
            }
            me.checkYuE();
          });

        }
      }
    },

    initGainChoices: function () {
      var ui = this.ui;
      ui.gainChoices.children('.ui-term-radio').click(function () {
        var input = $(this).children('input');
        if (!input.prop('checked')) {
          input.prop('checked', true);
        }
        if (input.val() == 'BANK' && input.prop('checked')) {
          ui.bankAccount.show();
        }
        else {
          ui.bankAccount.hide();
        }
      });
    },

    renderConfirmation: function () {
      var me = this;
      var shares = parseFloat($('[data-name="shares"]').text(), 10);
      if (typeof shares === 'number') {
        $('[data-type="multishares"]').each(function () {
          var $this = $(this);
          var v = parseFloat($this.text(), 10);
          if (typeof v === 'number') {
            v = v * shares;
            v = Protocol.translator._fixedFloat2(v);
          }
          if(me.utmSourceTransfer)
        	  v=Protocol.translator._fixedFloat2(v*20);
          $this.text(v);
        });
      }

      if ($('#captcha').length > 0) {
        new Widgets.Captcha({
          name: 'captcha'
        }).init();
      }

      var $er = $('[data-name="expacted-rate"]'); // FIXME: temporary solution
      if ($er.length > 0) {
        var er = $er.data('value').toString();
        $er.text(er.replace(/%/g, '').replace('-', ' - '));
      }

      $('.ui-confirm-form').submit(function () {
        var agreement = $('input[name="agree-contract"]');
        var captcha = $('#captcha-input');
        var hint = $('.ui-confirm-hint');
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
        if (captcha.length > 0) {
          if (!captcha.val()) {
            hint.text('请填写验证码');
            hint.show();
            return false;
          }
          else {
            hint.hide();
          }
        }
        var _max = parseInt($("#max-account").attr("data-account")*100,10);
        var _pay = parseInt($(".J_payable").attr("data-payable")*100,10);
        if(_max-_pay < 0){
          $(".ui-confirm-yue").html("您的余额不足  <a href='/account/capital!recharge.action'>充值</a>").show();
          return false;
        }
        $(this).find(":submit").attr("disabled", "disabled");
        return true;
      });
    },

    check: function (v) {
      var depositRate = parseFloat($('#deposit-rate').data('deposit-rate'), 10) / 100;
      var vInt = parseInt(v, 10);
      if (v === '') {
        return this.errors.NONE;
      }
      else if (v != vInt.toString()) {
        return this.errors.NOT_INT;
      }
      else {
        vInt = this.unit == 'amount' ? vInt : vInt * this.amountPerShare;

        var yfdj = vInt * depositRate;
        var maxda = Number($('#J_thisMaxDepositAmount').attr('data'));
        var maxall = Number($('#J_maxDepositAmount').attr('data'));
        var finaldj = 0;

        if (yfdj > maxda) {
          finaldj = maxda;
        } else if (yfdj > maxall) {
          finaldj = maxall;
        } else {
          finaldj = yfdj;
        }
        var fee = this.fee * vInt;
        if(this.page == 'autoinvest-join'){
          $(".J_totalMyInvest").text("0");
        }
        //创富：当输入的金额大于等于剩余金额，停用加号
        if (vInt >= this.max.amount) {
          if($("#loan-type").val()=="cf"){
	         this.ui.plus.addClass("cal-grey").attr("disabled","disabled");
	         this.ui.minus.removeAttr("disabled").removeClass("cal-grey");
          }
          //创富：等于时候，不返回任何错误信息
          if(vInt == this.max.amount){
            if(this.page == 'autoinvest-join'){
              var aM = parseInt($("#lockPeriod").attr("data-lockPeriod"));
              $(".J_totalMyInvest").text(Protocol.translator._commaFloat(vInt*aM));
            }
            return this.errors.NONE;
          }
          else{
            return this.errors.EXCEEDED_MAX;
          }
        }
        else if ((this.ui.pseudoForm.attr('data-book') == "true") && finaldj > this.max.account) {
          return this.errors.OVER_BALANCE;
        }
        else if ((vInt + fee > this.max.account) && (this.ui.pseudoForm.attr('data') != "rsv") && (this.ui.pseudoForm.attr('data-book') != "true")) {
          return this.errors.OVER_BALANCE;
        }else if(vInt<this.min.amount && (this.page == 'autoinvest-join')){
          return this.errors.EXCEEDED_MIN;
        }
        //创富：当输入的金额小于等于标单价，停用减号
        else if(vInt <= this.amountPerShare && $("#loan-type").val()=="cf"){
          this.ui.minus.addClass("cal-grey").attr("disabled","disabled");
          this.ui.plus.removeAttr("disabled").removeClass("cal-grey");
          //创富：等于时候，不返回任何错误信息
          if(vInt == this.amountPerShare){
            return this.errors.NONE;
          }else
            return this.errors.NOT_INT_SHARE;
        }
        else if (this.unit == 'amount' && vInt % this.amountPerShare !== 0) {
            return this.errors.NOT_INT_SHARE;
        }
        //创富：当输入的金额大于等于标单价 且小于等于最大金额 
        else if (vInt < this.max.amount && vInt > this.amountPerShare && $("#loan-type").val()=="cf") {
          //创富：当输入的金额大于 标单价 且小于 最大金额 ，加减号可用
      	    this.ui.minus.removeAttr("disabled") .removeClass("cal-grey");
      	    this.ui.plus.removeAttr("disabled").removeClass("cal-grey");
            return this.errors.NONE;
        }
        else {
          if(this.page == 'autoinvest-join'){
            var aM = parseInt($("#lockPeriod").attr("data-lockPeriod"));
            $(".J_totalMyInvest").text(Protocol.translator._commaFloat(vInt*aM));
          }
          return this.errors.NONE;
        }
      }
    },

    getData: function () {
      var ui = this.ui;
      var v = ui.input.val();
      if (this.page == 'loan-invest') {
        return {
          formatAmount : Protocol.translator._commaFloat(v),
          amount: v,
          shares: v / this.amountPerShare
        };
      }
      else if (this.page == 'loan-transfer') {
        return {
          amount: Math.round(v * 100 * this.amountPerShare,10)/100,
          shares: v,
          formatAmount : Protocol.translator._commaFloat(Math.round(v * 100 * this.amountPerShare,10)/100),
          utmSourceTransfer:this.utmSourceTransfer
        };
      }
      else if (this.page == 'plan-join') {
        var input, text, intoBank = false,
          bankText = '',
          bankVal = '';
        input = ui.gainChoices.find('input:checked');
        text = input.parent().children('.ui-term-radio-text').text();
        var inputvalue = parseInt(this.ui.input.val(), 10);
        var feeRate = parseFloat($('#fee-rate').data('fee-rate'), 10) / 100;
        var depositRate = parseFloat($('#deposit-rate').data('deposit-rate'), 10) / 100;
        var depositFee = inputvalue * depositRate >= this.maxdepositamount ? this.maxdepositamount : inputvalue * depositRate;

        if (input.val() == 'BANK') {
          var option = ui.bankAccount.find('option:selected');
          intoBank = true;
          bankText = option.text();
          bankVal = option.val();
        }

        var isAppend = $('#append-action').text() !== '';
        var doAppend = $('#append-action').text();

        var $surplus = $("#surplus-amount-helper");
        var overplusAmount = 0;
        var buyInRate = 0;
        var alreadyDepositAmount = 0;
        var restAmount = 0;

        if ($surplus.length) {
          overplusAmount = parseFloat(Number($surplus.data("overplusamount")));
          buyInRate = parseFloat(Number($surplus.data("buyinrate")));
          alreadyDepositAmount = parseFloat(Number($surplus.data("alreadydepositamount")));
          restAmount = (overplusAmount + inputvalue) * buyInRate * 0.01 + overplusAmount + inputvalue - alreadyDepositAmount - depositFee;
        }

        var maxda = Number($('#J_thisMaxDepositAmount').attr('data'));
        var maxall = Number($('#J_maxDepositAmount').attr('data'));

        if (depositFee > maxda) {
          depositFee = maxda;
        } else if (depositFee > maxall) {
          depositFee = maxall;
        }
        return {
          amount: v,
          shares: v / this.amountPerShare,
          deposit: depositFee,
          fee: feeRate * v,
          amountAndFee: parseInt(v, 10) + feeRate * v,
          append: doAppend,
          isAppend: isAppend,
          gain: input.val(),
          gainText: text,
          intoBank: intoBank,
          restAmount: restAmount,
          bankText: bankText,
          bankVal: bankVal,
          formatAmountAndFee : Protocol.translator._commaFloat(parseInt(v, 10) + feeRate * v)
        };
      }else if(this.page == 'autoinvest-join'){
        var m = parseInt($("#lockPeriod").attr("data-lockPeriod"));
        return {
          amount: v,
          formatAmount: Protocol.translator._commaFloat(v),
          totalJoinAmount: Protocol.translator._commaFloat(v*m)
        };
      }
      else {
        return {};
      }
    },

    toggleErrorMessage: function (message) {
      if (message) {
        this.ui.hint.hide();
        this.ui.error.text(message).show();
      }
      else {
        this.ui.error.hide().empty();
        this.ui.hint.show();
      }
    },

    checkYuE : function (){
      //判断余额
      var _max = parseInt($("#max-account").attr("data-account")*100,10);
      var _pay = parseInt($(".J_payable").attr("data-payable")*100,10);
      if(_max-_pay < 0){
        $(".ui-confirm-yue").html("您的余额不足  <a href='/account/capital!recharge.action'>充值</a>").show();
      }else {
        $(".ui-confirm-yue").html("").hide();
      }
    }

  });

  module.exports = InvestmentTerminal;

});
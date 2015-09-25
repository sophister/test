define('common:widget/oui/pages/account/invest/plan', ['require', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/rsa/index', 'common:widget/oui/common', 'common:widget/oui/arale/dialog/1.3.3/dialog', 'common:widget/oui/protocol', 'common:widget/oui/widgets/widgets', 'common:widget/oui/lib/handlebars/1.0.0/handlebars', 'common:widget/oui/arale/tip/1.1.4/tip', 'common:widget/oui/components/components.jscomponents'],function(require) {

  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery'),
      RSAencript = require('common:widget/oui/rsa/index'),
      Common = require('common:widget/oui/common'),
      Dialog = require('common:widget/oui/arale/dialog/1.3.3/dialog'),
      Protocol = require('common:widget/oui/protocol'),
      Widgets = require('common:widget/oui/widgets/widgets'),
      Handlebars = require('common:widget/oui/lib/handlebars/1.0.0/handlebars'),
      Tip = require('common:widget/oui/arale/tip/1.1.4/tip'),
      Components = require('common:widget/oui/components/components.jscomponents');
  var Form = Widgets.Form;
  var feeInTotal = $('#fee-in-total').data('value');
  $('#fee-in-total').text(Protocol.translator._fixedFloat2(feeInTotal));

  var planId = $('#pg-helper-plan-id').text();
  var subPointId = $('#pg-helper-plan-sub-point-id').text();
  var gainManner = $('#pg-helper-gain-manner').text();

  // TODO: the PlanRecordItem is very similar to TransferredOutItem;
  //    kind of duplicate
  var PlanRecordItem = function(conf) {
    $.extend(this, {
      container: conf.container
    });

    this._ui = {
      switcher: this._elem('details'),
      box: this._elem('details-box')
    };

    this.loanId = this.container.data('loan-id');
  };

  $.extend(PlanRecordItem.prototype, {
    init: function() {
      var self = this, ui = this._ui;
      ui.switcher.click(function() {
        if (ui.switcher.hasClass('active')) {
          ui.switcher.removeClass('active');
          ui.box.hide();
        }
        else {
          if (ui.box.data('status') != 'initialized') {
            self._initDetails();
          }
          ui.switcher.addClass('active');
          ui.box.show();
        }
      });
      return this;
    },

    _initDetails: function() {
      new Widgets.List({
        template: $('#transferred-out-details-template'),
        name: 'transferred-out-details-' + this.loanId,
        api: Protocol.API.getUserTransferredOutRecords,
        title: true,
        pagination: true,
        params: { loanId: this.loanId, subPointId: subPointId }
      }).init()._update({ loanId: this.loanId, subPointId: subPointId });
    },

    _elem: function(name) {
      return this.container.find('[data-name="' + name + '"]');
    }
  });

  new Widgets.List({
    name: 'plan-records',
    api: Protocol.API.getUserPlanRecords,
    title: true,
    pagination: true,
    rendered: function() {
      this.container.children('li.ui-list-item').each(function(i, elem) {
        new PlanRecordItem({ container: $(elem) }).init();
      });
    },
    params: { financeId: planId, subPointId: subPointId }
  }).init(Common.loadJSON('#plan-records-rsp', true));


  var StatusButton = function(conf) {
    $.extend(this, {
      container: conf.container,
      handler: null,

      _ui: {}
    });

    this._ui.button = this.container.children('a');
  };

  $.extend(StatusButton.prototype, {
    init: function() {
      var self = this, ui = this._ui;

      if (ui.button.hasClass('quit-enabled')) {

        if (Common.constant.QUIT_PLAN_DISABLED) {
          ui.button.removeClass('quit-enabled');
          ui.button.removeClass('cursor-pointer');
          ui.button.addClass('cursor-default');
        } else {
          self.handler = new Components.PlanQuitHandler({
            planName: self.container.data('plan-name'),
            subPointId: self.container.data('sub-point-id'),
            finalAmount: self.container.data('final-amount')
          }).init();

          ui.button.hover(function() {
            ui.button.text('退出');
          }, function() {
            ui.button.text('退出');
          });

          ui.button.click(function() {
            self.handler.start();
          });
        }
      }

      return this;
    }
  });


  var ProfitHandler = function(conf) {
    $.extend(this, {
      container: conf.container,
      _manner: gainManner
    });

    this._ui = {
      switcher: this._elem('ph-switcher'),
      box: this._elem('ph-box'),
      bankBox: this._elem('ph-bank-box'),
      bankPasswordBox: this._elem('ph-bank-password-box'),
      radios: this.container.find('input[name="cashTypeStr"]'),
      submit: this._elem('ph-submit'),
      cancel: this._elem('ph-cancel'),
      hint: this._elem('ph-hint'),
      form: this._elem('ph-form'),
      bankAccount: this._elem('ph-bank-account'),
      bankPassword: this._elem('ph-bank-password')
    };
  };

  $.extend(ProfitHandler.prototype, {
    init:function() {
      var self = this, ui = this._ui;

      Common.fillTemplate({
        container: $('#bank-accounts'),
        template: $('#bank-accounts-template'),
        data: Protocol.translator.translate(
          Protocol.API.getUserBankInfo,
          Common.loadJSON('#bank-accounts-rsp', true).data
        )
      });
      if (!ui.bankAccount.val()) {
        ui.bankPasswordBox.hide();
      }

      ui.switcher.click(function() {
        if (ui.switcher.hasClass('editing')) {
          ui.switcher.removeClass('editing');
          ui.switcher.text('更改');
          ui.box.hide();
        }
        else {
          self.reset();
          ui.switcher.addClass('editing');
          ui.switcher.text('收起');
          ui.box.show();
        }
      });

      ui.cancel.click(function() {
        ui.switcher.removeClass('editing');
        ui.switcher.text('更改');
        ui.box.hide();
      });
      ui.radios.change(function() {
       if ($(this).val() == 'BANK') {
          ui.bankBox.show();
        } else {
          ui.bankBox.hide();
        }
      });

      ui.form.submit(function() {
        var v = self.container.find('input[name="cashTypeStr"]:checked').val();
        var pwd = $('[name=cashPassword]',this);
        if (v == 'BANK') {
          if (!ui.bankAccount.val() || !ui.bankPassword.val()) {
            return false;
          }
        }
        // enscript pwd
        pwd.val(RSAencript(pwd.val()));
        return true;
      });

      return this;
    },

    reset: function() {
      this._checkRadio(this._manner);
    },

    _elem: function(name) {
      return this.container.find('[data-name="' + name + '"]');
    },

    _checkRadio: function(value) {
      this.container
        .find('input[name="cashTypeStr"][value="' + value + '"]')
        .prop('checked', true)
        .attr('checked', 'checked')
        .change();
    }
  });

  new ProfitHandler({ container: $('#plan-summary') }).init();

  new StatusButton({ container: $('#status-button') }).init();

  var temppx =0;

  function setProgressdiv(curr,total){//当前金额，总金额，计算进度条位置
   if(temppx !=  $('#J_progress-acco-div').find('.tip').css("left")){
    temppx =  $('#J_progress-acco-div').find('.tip').css("left");
   }else{
    return;
   }
     var progress = curr/total * 550;
     if(progress < 0 ){progress =0;}
     if(progress > 550 ){progress =550;}
     $('#J_progress-acco-div').find('.bock').css("left",progress+"px");
    $('#J_progress-acco-div').find('.progress').css("width",progress+"px");
    $('#J_progress-acco-div').find('.tip').css("left", progress+22.5+"px");
     if(progress<=0){
       $('#J_progress-acco-div').find('.bock').css("left",progress+1+"px");
       $('#J_progress-acco-div').find('.progress').css("width",progress+1+"px");
       $('#J_progress-acco-div').find('.tip').css("left", progress+23.5+"px");
     }
     if(progress>=550){
      $('#J_progress-acco-div').find('.bock').css("left",progress-1+"px");
      $('#J_progress-acco-div').find('.progress').css("width",progress-1+"px");
      $('#J_progress-acco-div').find('.tip').css("left", progress+21.5+"px");
     }
  }

  setProgressdiv( Number($('#J_progress-acco-div').attr('data1')),Number($('#J_progress-acco-div').attr('data2')));
  setInterval(function(){
   setProgressdiv( Number($('#J_progress-acco-div').attr('data1')),Number($('#J_progress-acco-div').attr('data2')));
   //提前退出
  },50);



  new Dialog({
  trigger:'#J_TQTC_BTN',
        width: '600px',
        height:'500px',
        content: $('#J_CONFORM_QUIT_DIV .conform_pay_div')
        }).before('show',function () {
        var dialog = this;
        $('.ui-confirm-cancel-link').click(function () {
          dialog.hide();
        });

         $.ajax({
                type: "GET",
                url: "/account/invest!getUplanAdvanceQuitPrincipalAndInterest.action",
                data: {subPointId:$('#J_SUBPOINT_ID').attr('data')},
                dataType: "json",
                success: function(data){
                 if(data.status === 0){
                       $('#J_YJHSJE').html(data.data.interest+'元');
                 }
                }
            });

          
         $("#J_QUIT_FORM").submit(function(e){

             if($("#J_cashPassword").val().length===0){
              $('#J_ERROR_P_TX').css('display','block');
              return false;
             }
             // enscript pwd
             $('#J_cashPassword').val(RSAencript($('#J_cashPassword').val()));
           //  $("#J_QUIT_FORM").submit();
           //  location.reload();
        });

         $("input[type='password']").click(function(e){
          $('#J_ERROR_P_TX').css('display','none');

         });

        });
$('#tips_0').on('mousemove',function(e){
   $('#tipCon_0').css('display','inline-block');
});
$('#tips_0').on('mouseleave',function(e){
    $('#tipCon_0').css('display','none');
 });
$('#tips_1').on('mousemove',function(e){
    $('#tipCon_1').css('display','inline-block');
    alert(22);
 });
 $('#tips_1').on('mouseleave',function(e){
     $('#tipCon_1').css('display','none');
  });


 $('#tips_2').on('mousemove',function(e){
     $('#tipCon_2').css('display','inline-block');
  });
  $('#tips_2').on('mouseleave',function(e){
      $('#tipCon_2').css('display','none');
   });

  $('#tips_3').on('mousemove',function(e){
      $('#tipCon_3').css('display','inline-block');
  });

  $('#tips_3').on('mouseleave',function(e){
       $('#tipCon_3').css('display','none');
   });
  $('#tips_4').on('mousemove',function(e){
    var ldis = $("#tips_4").offset().left - $("#J_QUIT_FORM").offset().left + 20;
    $('#tipCon_4').css('left',ldis+'px').show();
  });

  $('#tips_4').on('mouseleave',function(e){
       $('#tipCon_4').hide();
   });
  $('#tips_5').on('mousemove',function(e){
    var ldis = $("#tips_5").offset().left - $("#J_QUIT_FORM").offset().left + 20;
    $('#tipCon_5').css('left',ldis+'px').show();
  });

  $('#tips_5').on('mouseleave',function(e){
       $('#tipCon_5').hide();
   });
  $('#tips_6').on('mousemove',function(e){
    $('#tipCon_6').css('display','inline-block');
});

$('#tips_6').on('mouseleave',function(e){
     $('#tipCon_6').css('display','none');
 });


  //u计划续期
  $(".rollover-ok").on('click',function(){
    $.get('/html/blank/blank.html?tag=3xuqidetail',function(){});
    var source = $("#confirm-uplan-roll-over-template").html();
    var template = Handlebars.compile(source);
    var html = template();
    var dl = new Dialog({
      width: '580px'
    }).before('show', function () {
      this.set('content', html);
    }).after('hide', function () {
      dl.element.remove();
    }).after('show',function(){
      Form.ui.init();
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
  });
  //取消续期
  $(".cancelrollover-ok").on('click',function(){
    var source = $("#confirm-cancel-roll-over-succ-template").html();
    var template = Handlebars.compile(source);
    var html = template();
    var dl = new Dialog({
      width: '580px'
    }).before('show', function () {
      this.set('content', html);
    }).after('hide', function () {
      dl.element.remove();
    }).after('show',function(){
      Form.ui.init();
      $('#J_CANCEL_ROLLOVER_FORM .ui-confirm-cancel-link').click(function () {
        dl.hide();
        dl.element.remove();
      });
      //提交表单
      $("#J_CANCEL_ROLLOVER_FORM").submit(function(e){
        var agreement = $('input[name="agree-contract"]');
        var hint = $('.ui-confirm-agree-hint');
        if($("#J_cashPassword2").val().length===0){
         $('#J_ERROR_P_TX2').css('display','block');
         return false;
        }
        // enscript pwd
        $('#J_cashPassword2').val(RSAencript($('#J_cashPassword2').val()));
      });
      $("#J_cashPassword2").focus(function(){
        $('#J_ERROR_P_TX2').css('display','none');
      });
      
    }).show();
  });
  
});


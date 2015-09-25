define('common:widget/oui/components/transfer-confirmation', ['require', 'exports', 'module', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/rsa/index', 'common:widget/oui/protocol', 'common:widget/oui/widgets/widgets'],function(require, exports, module) {
  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery'),
      RSAencript = require('common:widget/oui/rsa/index'),
      Protocol = require('common:widget/oui/protocol'),
      Widgets = require('common:widget/oui/widgets/widgets');

  var TransferConfirmation = {};


  var Confirm = function(conf) {
    $.extend(this, {
      container: conf.container
    });

    this._ui = {
      hint: this._elem('cfm-hint'),
      hint2: this.container.find('.ui-confirm-hint'),
      form: this._elem('cfm-form'),
      submit: this._elem('cfm-submit'),
      inputAgree: this._elem('cfm-agreement'),
      inputShares: this._elem('cfm-shares-to-transfer'),
      selectDiscount: this._elem('cfm-discount'),
      availableShares: this._elem('cfm-available-shares'),
      valuePerShare: this._elem('cfm-value-per-share'),
      pricePerShare: this._elem('cfm-price-per-share'),
      price: this._elem('cfm-price-in-total'),
      fee: this._elem('cfm-fee'),
      summary: this._elem('cfm-income-summary')
    };

    this.fee = parseFloat(this._ui.fee.data('value'), 10);
    this.availableShares = parseInt(this._ui.availableShares.text(), 10);
    this.valuePerShare = parseFloat(this._ui.valuePerShare.text(), 10);
  };

  $.extend(Confirm.prototype, {
    init: function() {
      var self = this, ui = this._ui;
      self.update();
      ui.inputShares.keyup(function() {
        self.hint(self.check());
        self.update();
      });
      ui.selectDiscount.change(function() {
        self.update();
      });
      ui.inputAgree.change(function() {
        self.update();
      });

      ui.form.submit(function() {
          var zrfs= $('#J_zrff').val();
          var s = /^[0-9]*$/;
          if(!s.test(zrfs)){
            $('#J_error_hint').html('请输入正确的转让份数');
            $('#J_error_hint').css('display','inline-block');
            $('#J_zrff').focus();
            return false;
          }

        if (ui.submit.hasClass('disabled')) {
          return false;
        }
        var txmm = $('#captcha-input').val();
        if($.trim(txmm).length<=0){
          $('.J_error_msg_p').css('display','block');
          $('#captcha-input').focus();
          return false;
        }
        $('#captcha-input').val(RSAencript(txmm));
        return true;
      });
      new Widgets.Captcha({ name: 'captcha' }).init();
      return this;
    },

    hint: function(msg) {
      if (msg) {
        this._ui.hint.text(msg).show();
      }
      else {
        this._ui.hint.text('').hide();
      }
    },

    check: function() {
      var $input = this._ui.inputShares;
      var v = $input.val();
      v = parseInt(v, 10);
      if (isNaN(v)) {
        $input.val('');
        return;
      }
      else {
        $input.val(v);
      }
      if (v > this.availableShares) {
        return '转让份数不能多于' + this.availableShares + '份';
      }
    },

    update: function() {
      var ui = this._ui, t = Protocol.translator,
          toTransferShares = parseInt(ui.inputShares.val(), 10),
          discount = parseFloat(ui.selectDiscount.val(), 10),
          agreed = ui.inputAgree.prop('checked'),
          pps = parseFloat(ui.pricePerShare.data('interest'), 10),
          ppsn = parseFloat(ui.pricePerShare.data('principal'), 10);

      if (!isNaN(toTransferShares) && toTransferShares <= this.availableShares) {
        ui.submit.removeClass('disabled');
      }
      else {
        ui.submit.addClass('disabled');
        toTransferShares = 0;
      }

      if (!agreed) {
        ui.hint2.text('转让前请阅读并同意协议');
        ui.hint2.show();
        ui.submit.addClass('disabled');
      }
      else {
        ui.hint2.text('');
        ui.hint2.hide();
      }
      var pricePerShare = pps - parseFloat(t._fixedFloat2(ppsn * (1 - discount)), 10);

      var price = pricePerShare * toTransferShares;
      var fee = price * this.fee;
      ui.pricePerShare.text(t._fixedFloat2(pricePerShare));
      ui.price.text(t._fixedFloat2(price));
      ui.fee.text(t._fixedFloat2(fee));
      ui.summary.text(t._fixedFloat2(price - fee));
    },

    _elem: function(name) {
      return this.container.find('[data-name="' + name + '"]');
    }
  });


  var ConfirmBatch = function(conf) {
    $.extend(this, {
      container: conf.container
    });

    this._ui = {
      form: this._elem('cfm-form'),
      submit: this._elem('cfm-submit'),
      inputAgree: this._elem('cfm-agreement'),
      selectDiscount: this._elem('cfm-discount'),
      value: this._elem('cfm-value-in-total'),
      price: this._elem('cfm-price-in-total'),
      fee: this._elem('cfm-fee'),
      summary: this._elem('cfm-income-summary'),
      hint2: this.container.find('.ui-confirm-hint')
    };

    this.fee = parseFloat(this._ui.fee.data('value'), 10);
    this.value = parseFloat(this._ui.value.text(), 10);
  };

  $.extend(ConfirmBatch.prototype, {
    init: function() {
      var self = this, ui = this._ui;
      self.update();
      ui.selectDiscount.change(function() {
        self.update();
      });
      ui.inputAgree.change(function() {
        self.update();
      });
      ui.form.submit(function() {

        if (ui.submit.hasClass('disabled')) {
          return false;
        }
        var txmm = $('#captcha-input').val();
        if($.trim(txmm).length<=0){
          $('.J_error_msg_p').css('display','block');
          $('#captcha-input').focus();
          return false;
        }
        
        $('#captcha-input').val(RSAencript(txmm));
        return true;
      });
      new Widgets.Captcha({ name: 'captcha' }).init();
      return this;
    },

    update: function() {
      var ui = this._ui, t = Protocol.translator,
          discount = parseFloat(ui.selectDiscount.val(), 10),
          agreed = ui.inputAgree.prop('checked');

      if (agreed) {
        ui.hint2.text('');
        ui.hint2.hide();
        ui.submit.removeClass('disabled');
      }
      else {
        ui.hint2.text('转让前请阅读并同意协议');
        ui.hint2.show();
        ui.submit.addClass('disabled');
      }
      var price = discount * this.value;
      var fee = price * this.fee;
      ui.fee.text(t._fixedFloat2(fee));
      ui.price.text(t._fixedFloat2(price));
      ui.summary.text(t._fixedFloat2(price - fee));
    },

    _elem: function(name) {
      return this.container.find('[data-name="' + name + '"]');
    }
  });

  TransferConfirmation.Confirm = Confirm;
  TransferConfirmation.ConfirmBatch = ConfirmBatch;

  module.exports = TransferConfirmation;

  $("body").delegate("#captcha-input","keydown",function(){
       var txmm = $('#captcha-input').val();
        if($.trim(txmm).length>0){
          $('.J_error_msg_p').css('display','none');
        }
  });

});

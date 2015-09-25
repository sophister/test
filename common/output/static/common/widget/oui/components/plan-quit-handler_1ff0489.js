define('common:widget/oui/components/plan-quit-handler', ['require', 'exports', 'module', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/arale/dialog/1.3.3/dialog', 'common:widget/oui/rsa/index', 'common:widget/oui/protocol', 'common:widget/oui/common'],function(require, exports, module) {

  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery'),
      Dialog = require('common:widget/oui/arale/dialog/1.3.3/dialog'),
      RSAencript = require('common:widget/oui/rsa/index'),
      Protocol = require('common:widget/oui/protocol'),
      Common = require('common:widget/oui/common');

  var HINT_CALC = "系统正在努力为您计算预计回收金额，请您耐心等待";
  var HINT_SELL = "系统正在为您挂出债权，请您耐心等待";

  var PlanQuitHandler = function(conf) {
    $.extend(this, {
      subPointId: conf.subPointId,
      planName: conf.planName,
      finalAmount: conf.finalAmount,

      exitDialog: null,
      confirmDialog: null,

      exitTemplate: $('#confirm-plan-exit-template'),
      confirmTemplate: $('#confirm-plan-exit-execution-template'),

      canceled: false,
      confirmed: false,
      quitType: null,

      _ui: {}
    });
  };

  $.extend(PlanQuitHandler.prototype, {
    init: function() {
      return this;
    },

    start: function(uiType, data) {
      var self = this, ui = this._ui, html = null;

      if (!uiType || uiType == 'exit') {

        html = Common.fillTemplate({
          template: self.exitTemplate,
          data: self.dataUI('exit')
        });
        self.exitDialog = new Dialog({ content: html, hasMask: { hideOnClick: false } });
        self.exitDialog.after('show', function() {
          self.canceled = false;
          self.loadUI('exit');
          self.initUI('exit');
          self.updateQuitType();
          var dialog = this;
          ui.exitCancel.click(function() {
            dialog.hide();
          });
        });
        self.exitDialog.after('hide', function() {
          self.canceled = true;
          this.destroy();
        });
        self.exitDialog.show();

      } else {

        html = Common.fillTemplate({
          template: self.confirmTemplate,
          data: $.extend(true, data, self.dataUI('confirm'))
        });
        self.confirmDialog = new Dialog({ content: html, hasMask: { hideOnClick: false } });
        self.confirmDialog.after('show', function() {
          self.loadUI('confirm');
          self.confirmed = false;
          var dialog = this;

          Common.initPoptips($('.expected-exit-amount-tip'));
          Common.initPoptips($('.expected-total-amount-tip'));

          ui.confirmCancel.click(function() {
            if (!self.confirmed) {
              dialog.hide();
            }
          });
          ui.confirmForm.submit(function() {
            var pwd = $('input[name=cashPassword]', '#form-quit'),
                msg = $('#J_error_p_txma');
            if (ui.confirmSubmit.hasClass('ui-button-disabled')) {
              return false;
            }
            pwd.on('click, focus',function(e){
              msg.css('display','none');
            });
            if(pwd.val().length < 1){
              msg.css('display','inline-block');
              return false;
            }

            if((typeof(RSAencript) != 'undefined')){
              pwd.val(RSAencript(pwd.val()));
            }

            self.confirmed = true;
            ui.confirmCancel.addClass('disabled');
            ui.confirmSubmit.addClass('ui-button-disabled');
            self.showLoading(ui.confirmDialog, HINT_SELL);
            return true;
          });
        });
        self.confirmDialog.after('hide', function() {
          this.destroy();
        });
        self.confirmDialog.show();

      }
    },

    initUI: function(uiType) {
      var accounts = Protocol.translator.translate(
        Protocol.API.getUserBankInfo,
        Common.loadJSON('#bank-accounts-rsp', true).data
      );
      Common.fillTemplate({
        container: $('#account-info'),
        template: $('#account-info-template'),
        data: accounts
      });

      var self = this, ui = this._ui;
      ui.exitQuitType.click(function() {
        ui.exitRRD.toggle();
        ui.exitRRDHint.toggle();
        ui.exitBank.toggle();
        ui.exitBankHint.toggle();
        self.updateQuitType();
      });

      ui.exitSubmit.click(function() {
        if (ui.exitSubmit.hasClass('ui-button-disabled')) {
          return;
        }
        ui.exitSubmit.addClass('ui-button-disabled');
        self.showLoading(ui.exitDialog, HINT_CALC);

        Protocol.getExpectedAmountsForPlanExiting({
          subPointId: self.subPointId
        }, function(status, message, data) {
          if (self.canceled) {
            return;
          }
          self.exitDialog.hide();
          if (status === 0) {
            self.start('confirm', data);
          } else {
            Common.showMessage(message);
          }
        });
      });
    },

    loadUI: function(uiType) {
      if (!this._elem) {
        this._elem = function(name, isDialog) {
          return $('.ui-confirm').find('[data-name="' + name + '"]');
        };
      }
      var ui = this._ui;
      if (uiType == 'exit') {
        ui.exitRRD = this._elem('to-renrendai');
        ui.exitRRDHint = this._elem('to-renrendai-hint');
        ui.exitBank = this._elem('to-bank');
        ui.exitBankHint = this._elem('to-bank-hint');
        ui.exitBankAccount = this._elem('bank-account');
        ui.exitQuitType = this._elem('change-manner');
        ui.exitDialog = $('#confirm-plan-exit');
        ui.exitSubmit = $('#submit-plan-exit');
        ui.exitCancel = $('#cancel-plan-exit');
      } else {
        ui.confirmDialog = $('#confirm-plan-exit-execution');
        ui.confirmSubmit = $('#submit-plan-exit-execution');
        ui.confirmCancel = $('#cancel-plan-exit-execution');
        ui.confirmForm = $('#form-quit');
      }
    },

    dataUI: function(uiType) {
      if (uiType == 'exit') {
        return { name: this.planName, amount: this.finalAmount };
      } else {
        var ui = this._ui;
        var ret = {
          name: this.planName,
          amount: this.finalAmount
        };
        if (this.quitType == 'RRD') {
          ret.quitType = 'RRD';
          ret.quitTypeName = '提取至账户';
        } else {
          ret.quitType = 'BANK';
          ret.quitTypeName = '提取至银行卡';
          ret.quitBankId = ui.exitBankAccount.val();
          ret.quitBankAccount = ui.exitBankAccount.find('[value="' + ret.quitBankId + '"]').text();
        }
        return ret;
      }
    },

    updateQuitType: function() {
      var ui = this._ui;
      if (ui.exitRRD.is(':visible')) {
        this.quitType = 'RRD';
      } else {
        this.quitType = 'BANK';
      }
    },

    showLoading: function(container, hint) {
      container.append('<div class="ui-confirm-loading-text"></div>');
      var w = $('.ui-dialog-content').width();
      var h = $('.ui-dialog-content').height();
      $('.ui-confirm-loading-text')
        .css({ width: w + 'px', height: h + 'px' })
        .append('<p class="hint">' + hint + '</p><p class="loading"></p>');
    }
  });

  module.exports = PlanQuitHandler;

});
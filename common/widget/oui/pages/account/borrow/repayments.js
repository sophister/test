define(function (require) {

  var $ = require('jquery'),
    Common = require('common'),
    Protocol = require('protocol'),
    Widgets = require('widgets/widgets');
  /**
   * Item for Repaying Records, we define the class since its logic is complex
   */
  var RepayingItem = function (conf) {
    $.extend(this, {
      container: conf.container,
      _checked: {
        start: 0,
        end: 0,
        count: 0
      }
    });

    this.loanId = this.container.data('loan-id');

    this._ui = {
      repaySwitch: this._elem('repay-switch'),
      repayBox: this._elem('repay-box'),
      repayList: this._elem('repayment-records'),
      repayAvailable: this._elem('repay-available-amount'),
      repayAmount: this._elem('repay-amount'),
      repayHint: this._elem('repay-hint'),
      repayInputCount: this._elem('repay-input-count'),
      repayInputStart: this._elem('repay-input-start'),
      repayInputEnd: this._elem('repay-input-end'),
      repaySubmit: this._elem('repay-submit'),
      repayForm: this._elem('repay-form'),

      repayAllSwitch: this._elem('repay-all-switch'),
      repayAllBox: this._elem('repay-all-box'),
      repayAllAvailable: this._elem('repay-all-available-amount'),
      repayAllAmount: this._elem('repay-all-amount'),
      repayAllHint: this._elem('repay-all-hint'),
      repayAllSubmit: this._elem('repay-all-submit'),
      repayAllForm: this._elem('repay-all-form')
    };
  };

  $.extend(RepayingItem.prototype, {
    init: function () {
      var self = this,
        ui = this._ui;

      ui.repaySwitch.click(function () {
        self._switchClicked($(this));
      });

      ui.repayAllSwitch.click(function () {
        if (ui.repayAllSwitch.hasClass('disabled')) {
          return;
        }
        self._switchClicked($(this));
      });

      //url有参数 pageFlag = expandAllRepayList 默认打开还款
      var urlPara = location.search.substring(1).split("=");
      if (urlPara[0] == "pageFlag") {
        ui.repaySwitch.click();
      }
      return this;
    },

    _initRepay: function () {
      var self = this,
        ui = this._ui,
        loanId = this.loanId;
      var t = Protocol.translator;
      new Widgets.List({
        container: ui.repayList,
        name: 'repayment-records',
        api: Protocol.API.getUserLoanRepaymentRecords,
        title: true,
        rendered: function (rsp) {
          self._elem('repay-term-checking').change(function () {
            self._checkboxClicked($(this));
          });
          if (rsp.status === 0) {
            self._elem('repaid-summary').children('em').text(
            t._fixedFloat2(rsp.data.alreadyPayTotalAmount));
            self._elem('to-repay-summary').children('em').text(
            t._fixedFloat2(rsp.data.notPayTotalAmount));
          }
        }
      }).init()._update({
        loanId: loanId
      }, function (status, message, data) {
        if (status === 0) {
          ui.repayBox.data('status', 'initialized');
        }
      });

      ui.repayForm.submit(function () {
        if (ui.repayAmount.children('em').text() == '0.00') {
          ui.repayHint.text('请选择还款期').show();
        }
        if (ui.repaySubmit.hasClass('disabled')) {
          return false;
        }
        return true;
      });
    },

    _initRepayAll: function () {
      var ui = this._ui;
      var amount = parseFloat(ui.repayAllAmount.data('amount'), 10),
        available = parseFloat(ui.repayAllAvailable.data('amount'), 10);
      if (amount > available) {
        ui.repayAllSubmit.addClass('disabled');
        ui.repayAllHint.text('您的余额不足，请先充值');
      }

      ui.repayAllForm.submit(function () {
        if (ui.repayAllSubmit.hasClass('disabled')) {
          return false;
        }
        return true;
      });
    },

    _elem: function (name) {
      return this.container.find('[data-name="' + name + '"]');
    },

    _switchClicked: function ($switch) {
      var prefix = 'repay',
        another = 'repayAll';
      if ($switch.data('name') == 'repay-all-switch') {
        prefix = 'repayAll';
        another = 'repay';
      }
      var init = prefix == 'repay' ? '_initRepay' : '_initRepayAll',
        $currS = this._ui[prefix + 'Switch'],
        $currB = this._ui[prefix + 'Box'],
        $anotherS = this._ui[another + 'Switch'],
        $anotherB = this._ui[another + 'Box'];
      if ($currS.hasClass('active')) {
        this.container.removeClass('active');
        $currS.removeClass('active');
        $currS.text($currS.data('text'));
        $currB.hide();
      }
      else {
        if ($anotherS.hasClass('active')) {
          $anotherS.removeClass('active');
          $anotherS.text($anotherS.data('text'));
          $anotherB.hide();
        }
        this.container.addClass('active');
        $currS.addClass('active');
        $currS.text('取消');
        $currB.show();
        if ($currB.data('status') != 'initialized') {
          this[init]();
        }
      }
    },

    _checkboxClicked: function ($check) {
      var self = this,
        ui = this._ui;

      self._elem('repay-term-checking').each(function (i, elem) {
        var $elem = $(elem),
          cv = parseInt($check.val(), 10),
          ev = parseInt($elem.val(), 10);
        if (ev < cv) {
          $elem.prop('checked', true);
          $elem.attr('checked', 'checked');
        }
        else if (ev == cv) {
          if (self._checked.end > cv && !$check.prop('checked')) {
            $elem.prop('checked', true);
            $elem.attr('checked', 'checked');
          }
        }
        else {
          $elem.prop('checked', false);
          $elem.removeAttr('checked');
        }
      });

      self._checked.count = 0;
      self._checked.start = 0;
      self._checked.end = 0;

      var amount = 0,
        $amount = null,
        available = parseFloat(ui.repayAvailable.data('amount'), 10);

      self._elem('repay-term-checking').each(function (i, elem) {
        var $elem = $(elem),
          v = parseInt($elem.val(), 10);
        if ($elem.prop('checked')) {
          if (self._checked.start === 0) {
            self._checked.start = v;
          }
          self._checked.end = v;
          self._checked.count++;
          $amount = $elem.closest('li').find('.to-repay-amount em');
          amount += parseFloat($amount.text(), 10);
        }
      });

      if (amount > available) {
        ui.repaySubmit.addClass('disabled');
        ui.repayHint.text('您的余额不足，请先充值').show();
      }
      else {
        ui.repaySubmit.removeClass('disabled');
        ui.repayHint.text('').hide();
      }

      if (amount === 0) {
        ui.repaySubmit.addClass('disabled');
      }
      else {
        ui.repaySubmit.removeClass('disabled');
      }

      ui.repayAmount.children('em').text(Protocol.translator._fixedFloat2(amount));

      ui.repayInputCount.val(self._checked.count);
      ui.repayInputStart.val(self._checked.start);
      ui.repayInputEnd.val(self._checked.end);
    }
  });


  /**
   * Initialize page
   */

  new Widgets.List({
    name: 'repaying-list',
    api: Protocol.API.getUserRepayingRecords,
    title: true,
    pagination: true,
    rendered: function (rsp) {
      var $ul = this.container;
      $ul.children('li[data-name="repaying-item"]').each(function (i, elem) {
        new RepayingItem({
          container: $(elem)
        }).init();
      });
      if(rsp.data && rsp.data.data.length){
        for(var i=0; i< rsp.data.data.length; i++){
          if(rsp.data.data[i].termsLeft &&
              rsp.data.data[i].termsLeft == 1){
            $('.J_repayment-payback', $ul).eq(i).addClass('fn-hide');
          }
        }
      }          
    }
  }).init(Common.loadJSON('#repaying-list-rsp', true));

  new Widgets.Tab({
    tabsContainer: $('#repayments-tab'),
    contentsContainer: $('#repayments-tab-content'),
    switched: function (from, to, initialized) {
      if (initialized) {
        return true;
      }
      if (to == 'repaid') {
        new Widgets.List({
          name: 'repaid-list',
          api: Protocol.API.getUserRepaidRecords,
          title: true,
          pagination: true
        }).init()._update();
      }
      return true;
    }
  }).init();

});

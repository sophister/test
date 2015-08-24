define(function(require) {
  
  var $ = require('jquery'),
      Dialog = require('dialog'),
      Common = require('common'),
      Protocol = require('protocol'),
      Widgets = require('widgets/widgets'),
      Components = require('components/components'),
      Tip = require('tip');
  /**
   * Item
   */
  var LoanRepayingItem = function(conf) {
    $.extend(this, {
      container: conf.container
    });
    
    this._ui = {
      row: this.container.children('.ui-list-item-row'),
      box: this.container.children('.ui-list-item-box'),
      btn: this._elem('operation'),
      lender: this._elem('lenderinfo'),
      link: this._elem('details')
    };
  };
  
  $.extend(LoanRepayingItem.prototype, {
    init: function() {
      var self = this, ui = this._ui;
      
      ui.row.click(function() {
        if (ui.box.is(':visible')) {
          ui.box.hide();
        }
        else {
          ui.box.show();
        }
      });

      ui.link.click(function(event) {
        event.stopPropagation();
      });

      ui.btn.click(function(event) {
        event.stopPropagation();
        if (ui.btn.data('operation') == 'TRANSFER_DISABLED') {
          return;
        }
        var html = Common.fillTemplate({
          template: $('#confirm-transfer-out-template'),
          data: self._confirmData()
        });
        new Dialog({ content: html })
          .after('show', function() {
            var dialog = this;
            $('.ui-confirm-cancel-link').click(function() {
              dialog.hide();
            });
            new Components.TransferConfirmation.Confirm({
              container: $('#confirm-transfer-out')
            }).init();
          })
          .after('hide', function() { this.destroy(); })
          .show();
      });

      ui.lender.click(function(event){
        event.stopPropagation();
        var loanId = $(this).data('loanid'),
          url = ['/account/invest!borrowerRealNameAndIdNo.action?loanId=', loanId].join('');
        new Dialog({
            width: '480px',
            height: '180px',
            content: url
          })
          .after('hide', function() { this.destroy(); })
          .show();
        return false;
      });
      return this;
    },
  
    _elem: function(name) {
      return this.container.find('[data-name="' + name + '"]');
    },
    
    _confirmData: function() {
      var t = Protocol.translator;
      ret = {
        loanId: this.container.data('loan-id'),
        lenderId: this.container.data('lender-id'),
        investAmount: this.container.data('invest-amount'),
        investShares: this.container.data('invest-shares'),
        interest: this.container.data('interest'),
        interestGained: this.container.data('interest-gained'),
        termsLeft: this.container.data('terms-left'),
        termsInTotal: this.container.data('terms-in-total'),
        availableShares: this.container.data('available-shares'),
        valuePerShare: this.container.data('value-per-share'),
        interestPerShare: this.container.data('interest-per-share'),
        principalPerShare: this.container.data('principal-per-share'),
        repaymentsPerShare: this.container.data('repayments-per-share'),
        fee: this.container.data('fee')
      };
      ret.value = t._fixedFloat2(ret.valuePerShare * ret.availableShares);
      ret.summary = t._fixedFloat2(ret.value - ret.fee);
      return ret;
    }
    
  });
  
  
  /**
   * Page
   */
  new Widgets.List({
    name: 'repaying-list',
    api: Protocol.API.getUserLoansRepaying,
    title: true,
    pagination: true,
    rendered: function() {
      this.container.children('li.ui-list-item').each(function(i, elem) {
        new LoanRepayingItem({ container: $(elem) }).init();
      });
    }
  }).init(Common.loadJSON('#repaying-list-rsp', true));
  
  new Widgets.Tab({
    name: 'loans',
    switched: function(from, to, initialized) {
      if (initialized) {
        return true;
      }
      
      if (to == 'repaid') {
        new Widgets.List({
          name: 'repaid-list',
          api: Protocol.API.getUserLoansRepaid,
          title: true,
          pagination: true
        }).init()._update();
      }
      
      if (to == 'investing') {
        new Widgets.List({
          name: 'investing-list',
          api: Protocol.API.getUserLoansInProgress,
          title: true,
          pagination: true
        }).init()._update();
      }

      if (to == 'transferred-out') {
        Components.ListFactory.create('transferred-out', 'transferred-out-list').init()._update();
      }
      
      return true;
    }
  }).init();
  
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
});
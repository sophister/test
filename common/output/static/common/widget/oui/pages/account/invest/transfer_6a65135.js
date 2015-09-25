define('common:widget/oui/pages/account/invest/transfer', ['require', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/arale/dialog/1.3.3/dialog', 'common:widget/oui/common', 'common:widget/oui/protocol', 'common:widget/oui/widgets/widgets', 'common:widget/oui/components/components.jscomponents', 'common:widget/oui/arale/tip/1.1.4/tip'],function(require) {
  
  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery'),
      Dialog = require('common:widget/oui/arale/dialog/1.3.3/dialog'),
      Common = require('common:widget/oui/common'),
      Protocol = require('common:widget/oui/protocol'),
      Widgets = require('common:widget/oui/widgets/widgets'),
      Components = require('common:widget/oui/components/components.jscomponents'),
      Tip = require('common:widget/oui/arale/tip/1.1.4/tip');
  /**
   * Item Classes
   */
  
  /* Transferring Item */
  var TransferringItem = function(conf) {
    $.extend(this, {
      container: conf.container
    });
    
    this._ui = {
      cancel: this._elem('cancel')
    };
  };
  
  $.extend(TransferringItem.prototype, {
    init: function() {
      var self = this;
      this._ui.cancel.click(function() {
        var html = Common.fillTemplate({
          template: $('#confirm-transfer-cancel-template'),
          data: self._data()
        });
        new Dialog({ content: html })
          .after('show', function() {
            var dialog = this;
            $('.ui-confirm-cancel-link').click(function() {
              dialog.hide();
            });
            new Widgets.Captcha({ name: 'captcha' }).init();
          })
          .after('hide', function() {
            this.destroy();
          })
          .show();
      });
      return this;
    },
    
    _elem: function(name) {
      return this.container.find('[data-name="' + name + '"]');
    },
    
    _data: function() {
      var t = Protocol.translator;
      return {
        loanId: this.container.data('loan-id'),
        transferId: this.container.data('transfer-id'),
        sharesTransferred: this.container.data('initialShares') - this.container.data('shares'),
        sharesLeft: this.container.data('shares'),
        income: this.container.data('income'),
        fee: this.container.data('fee'),
        summary: t._fixedFloat2(this.container.data('income') - this.container.data('fee'))
      };
    }
  });
  
  /* Transferable Item */
  var TransferableItem = function(conf) {
    $.extend(this, {
      container: conf.container,
      changed: conf.changed || function() {}
    });
    
    this._ui = {
      transfer: this._elem('transfer'),
      checkbox: this._elem('check')
    };
    
    this.loanId = this.container.data('loan-id');
  };
  
  $.extend(TransferableItem.prototype, {
    init: function() {
      var self = this, ui = this._ui;
      
      ui.transfer.click(function() {
        var html = Common.fillTemplate({
          template: $('#confirm-transfer-out-template'),
          data: self._data()
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
      ui.checkbox.change(function() {
        self.changed(ui.checkbox.prop('checked'));
      });
      
      return this;
    },
    
    _elem: function(name) {
      return this.container.find('[data-name="' + name + '"]');
    },
    
    _data: function() {
      var t = Protocol.translator;
      ret = {
        loanId: this.loanId,
        lenderId: this.container.data('lender-id'),
        investAmount: this.container.data('invest-amount'),
        investShares: this.container.data('invest-shares'),
        interest: this.container.data('interest'),
        interestGained: this.container.data('interest-gained'),
        termsLeft: this.container.data('terms-left'),
        termsInTotal: this.container.data('terms-in-total'),
        availableShares: this.container.data('available-shares'),
        valuePerShare: this.container.data('value-per-share'),
        repaymentsPerShare: this.container.data('repayments-per-share'),
        interestPerShare: this.container.data('interest-per-share'),
        principalPerShare: this.container.data('principal-per-share'),
        fee: this.container.data('fee')
      };
      ret.value = t._fixedFloat2(ret.valuePerShare * ret.availableShares);
      ret.summary = t._fixedFloat2(ret.value - ret.fee);
      return ret;
    }
  });
  
  
  
  /**
   * Batch Transfer
   */
  
  var BatchToTransfer = function(conf) {
    $.extend(this, {
      container: conf.container,
      selector: conf.checkboxSelector,
      
      _items: {},
      _count: 0,
      _value: 0,
      _skipUpdating: false,
      
      _ui: {
        count: $('#selected-count'),
        value: $('#selected-value'),
        all: $('#select-all'),
        submit: $('#transfer-batch')
      }
    });
  };
  
  $.extend(BatchToTransfer.prototype, {
    init: function() {
      var self = this, ui = this._ui;
      
      ui.all.change(function() {
        self._skipUpdating = true;
        if (ui.all.prop('checked')) {
          $(self.selector).each(function(i, elem) {
            var $checkbox = $(elem);
            if (!$checkbox.prop('checked')) {
              $checkbox.prop('checked', true);
              $checkbox.attr('checked', 'checked');
              $checkbox.change(); // TODO: does it work?
            }
          });
        }
        else {
          $(self.selector).each(function(i, elem) {
            var $checkbox = $(elem);
            if ($checkbox.prop('checked')) {
              $checkbox.prop('checked', false);
              $checkbox.removeAttr('checked');
              $checkbox.change(); // TODO: does it work?
            }
          });
        }
        self._skipUpdating = false;
      });
      
      ui.submit.click(function() {
        if (ui.submit.hasClass('disabled')) {
          return;
        }
        var html = Common.fillTemplate({
          template: $('#confirm-batch-transfer-out-template'),
          data: self._data()
        });
        new Dialog({ content: html })
          .after('show', function() {
            var dialog = this;
            $('.ui-confirm-cancel-link').click(function() {
              dialog.hide();
            });
            new Components.TransferConfirmation.ConfirmBatch({
              container: $('#confirm-batch-transfer-out'),
              items: self._items
            }).init();
          })
          .after('hide', function() { this.destroy(); })
          .show();
      });
      
      return this;
    },
    
    add: function(item) {
      var loanId = item.loanId;
      if (!loanId) {
        return;
      }
      this._items[loanId] = item;
      this._value += parseFloat(item.value, 10);
      this._count += 1;
      this.update();
    },
    
    remove: function(item) {
      var loanId = item.loanId;
      if (!loanId || !this._items[loanId]) {
        return;
      }
      this._value -= parseFloat(this._items[loanId].value, 10);
      this._count -= 1;
      delete this._items[loanId];
      this.update();
    },
    
    update: function() {
      var self = this, ui = this._ui;
      if (this._count === 0) {
        this._value = 0;
        ui.submit.addClass('disabled');
      }
      else {
        ui.submit.removeClass('disabled');
      }
      ui.count.text(this._count);
      ui.value.text(Protocol.translator._fixedFloat2(this._value));

      var boxes = $(this.selector), loanId;
      
      $.each(boxes, function(i, box) {
        $box = $(box);
        loanId = $box.val();
        if (self._items[loanId]) {
          $box.prop('checked', true);
          $box.attr('checked', 'checked');
        }
      });
      
      if (!this._skipUpdating) {
        var allSelected = boxes.length !== 0;
        for (var i = 0; i < boxes.length; i++) {
          if (!$(boxes[i]).prop('checked')) {
            allSelected = false;
            break;
          }
        }
        
        if (allSelected) {
          ui.all.prop('checked', true);
          ui.all.attr('checked', 'checked');
        }
        else {
          ui.all.prop('checked', false);
          ui.all.removeAttr('checked');
        }
      }
    },
    
    _data: function() {
      var t = Protocol.translator, ids = [], shares = [], fee = null;
      $.each(this._items, function(k, item) {
        if (item.lenderId && item.availableShares) {
          ids.push(item.lenderId);
          shares.push(item.availableShares);
          if (!fee) {
            fee = item.fee || 0.01; // TODO: remove the default value
          }
        }
      });
      
      var ret = {
        count: this._count,
        value: this._value,
        lenderIds: ids.join(','),
        shares: shares.join(','),
        fee: fee
      };
      ret.summary = t._fixedFloat2(ret.value - ret.fee);
      ret.value = t._fixedFloat2(ret.value);
      return ret;
    }
  });
  
  
  /**
   * Initialize page
   */
  
  new Widgets.List({
    name: 'transferring-list',
    api: Protocol.API.getUserTransferringLoans,
    title: true,
    pagination: true,
    rendered: function() {
      this.container.children('li.ui-list-item').each(function(i, elem) {
        new TransferringItem({ container: $(elem) }).init();
      });
    }
  }).init(Common.loadJSON('#transferring-list-rsp', true));
  
  new Widgets.Tab({
    tabsContainer: $('#transfer-tab'),
    contentsContainer: $('#transfer-tab-content'),
    switched: function(from, to, initialized) {
      if (initialized) {
        return true;
      }
      
      if (to == 'transferable') {
        var batch = new BatchToTransfer({
          container: $('#transferable-selections'),
          checkboxSelector: 'input[data-name="check"]'
        }).init();
        
        new Widgets.List({
          name: 'transferable-list',
          api: Protocol.API.getUserTransferableLoans,
          title: true,
          pagination: true,
          rendered: function() {
            this.container.children('li.ui-list-item').each(function(i, elem) {
              new TransferableItem({
                container: $(elem),
                changed: function(selected) {
                  if (selected) {
                    batch.add(this._data());
                  }
                  else {
                    batch.remove({ loanId: this.loanId });
                  }
                }
              }).init();
            });
            batch.container.show();
            batch.update();
          }
        }).init()._update();
      }
      
      if (to == 'transferred-out') {
        Components.ListFactory.create('transferred-out', 'transferred-out-list').init()._update();
      }
      
      if (to == 'transferred-in') {
        new Widgets.List({
          name: 'transferred-in-list',
          api: Protocol.API.getUserTransferredInLoans,
          title: true,
          pagination: true
        }).init()._update();
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
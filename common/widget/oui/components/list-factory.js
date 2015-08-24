define(function(require, exports, module) {
  
  var $ = require('jquery'),
      Protocol = require('protocol'),
      Widgets = require('widgets/widgets');
  
  
  /* Transferred-Out Item */
  var TransferredOutItem = function(conf) {
    $.extend(this, {
      container: conf.container
    });
    
    this._ui = {
      switcher: this._elem('details'),
      box: this._elem('details-box')
    };
    
    this.loanId = this.container.data('loan-id');
  };
  
  $.extend(TransferredOutItem.prototype, {
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
        params: { loanId: this.loanId }
      }).init()._update({ loanId: this.loanId });
    },
    
    _elem: function(name) {
      return this.container.find('[data-name="' + name + '"]');
    }
  });
  
  
  var _ListFactory = function(conf) {
    $.extend(this, {
      
    });
  };
  
  $.extend(_ListFactory.prototype, {
    create: function(listType, listName) {
      
      if (listType == 'transferred-out') {
        return new Widgets.List({
          name: listName,
          api: Protocol.API.getUserTransferredOutLoans,
          title: true,
          pagination: true,
          rendered: function() {
            this.container.children('li.ui-list-item').each(function(i, elem) {
              new TransferredOutItem({ container: $(elem) }).init();
            });
          }
        });
      }
      
    }
  });
  
  module.exports = new _ListFactory();
  
});
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
    init: function(listType) {
      var self = this, ui = this._ui;
      ui.switcher.click(function() {
        if (ui.switcher.hasClass('active')) {
          ui.switcher.removeClass('active');
          ui.box.hide();
        }
        else {
          if (ui.box.data('status') != 'initialized') {
            self._initDetails(listType);
          }
          ui.switcher.addClass('active');
          ui.box.show();
        }
      });
      return this;
    },
    
    _initDetails: function(listType) {
      var url;
      var temp;
      var name;
      if(listType=="transferred-out"){
        url = Protocol.API.getUserTransferredOutRecords;
        temp = $('#transferred-out-details-template');
        name = 'transferred-out-details-' + this.loanId
      }
      if(listType=="repaying-list"){
        url = Protocol.API.getUserTransferredInRecords;
        temp = $('#repaying-list-details-template');
        name = 'repaying-list-details-' + this.loanId
      }
      if(listType=="repaid"){
        url = Protocol.API.getUserTransferredLogJsonRecords;
        temp = $('#repaid-list-details-template');
        name = 'repaid-list-details-' + this.loanId
      }
      new Widgets.List({
        template: temp,
        name: name,
        api: url,
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
              new TransferredOutItem({ container: $(elem) }).init(listType);
            });
          }
        });
      }
      
    }
  });
  
  module.exports = new _ListFactory();
  module.exports.TransferredOutItem = TransferredOutItem;
  
});
define('common:widget/oui/components/sidebar', ['require', 'exports', 'module', 'common:widget/oui/lib/jquery/1.9.1/jquery'],function(require, exports, module) {
  
  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery');
  
  var Sidebar = function(conf) {
    $.extend(this, {
      name: conf.name,
      container: $('#sidebar')
    });
    
    this._ui = {
      dropdownTriggers: this._elem('.ui-side-item-link'),
      subLists: this._elem('.ui-side-sub-list')
    };
  };
  
  $.extend(Sidebar.prototype, {
    init: function() {
      var ui = this._ui;
      ui.dropdownTriggers.click(function() {
        $.each(ui.subLists, function(i, elem) {
          var $elem = $(elem);
          if (!$elem.parent().hasClass('active') && !$elem.is(':visible')) {
            $elem.hide();
          }
        });
        if (!$(this).parent().hasClass('active')) {
          $(this).next().toggle();
        }
      });
      
      return this;
    },
    
    _elem: function(selector) {
      return this.container.find(selector);
    }
  });
  
  module.exports = Sidebar;
  
});

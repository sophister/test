define(function(require, exports, module) {
  var $ = require("jquery");
  
  var Tab = function(conf) {
    $.extend(this, {
      name: conf.name,
      tabs: conf.tabsContainer || $('#' + conf.name + '-tab'),
      contents: conf.contentsContainer || $('#' + conf.name + '-tab-content'),
      switched: conf.switched || function() {},
      clicked: conf.clicked || function() {},
      
      _current: null
    });
    
    this.tabItems = this.tabs.find('.ui-tab-item');
    this.contentItems = this.contents.find('.ui-tab-content');
    
    this.ui = {};
    
    var me = this;
    
    $.each(this.tabItems, function(i, elem) {
      var tab = $(elem);
      name = tab.data('name');
      if (!me.ui[name]) {
        me.ui[name] = {};
      }
      me.ui[name].tab = tab;
      me.ui[name].initialized = false;
    });
    
    $.each(this.contentItems, function(i, elem) {
      var content = $(elem);
      name = content.data('name');
      me.ui[name].content = content;
    });
  };
  
  $.extend(Tab.prototype, {
    init: function() {
      this._current = this.getName(this.tabs.find('.ui-tab-item-current'));
      this.ui[this._current].initialized = true;
      
      var me = this;
      
      this.tabItems.click(function() {
        var from = me._current,
            to = me.getName($(this));
        me._current = to;
        me.clicked(to, me.ui[to].initialized);
        if (from != to) {
          me.ui[from].tab.removeClass('ui-tab-item-current');
          me.ui[from].content.removeClass('ui-tab-content-current');
          me.ui[to].tab.addClass('ui-tab-item-current');
          me.ui[to].content.addClass('ui-tab-content-current');
          
          var ret = me.switched(from, to, me.ui[to].initialized);
          me.ui[to].initialized = ret;
        }
      });
    },
    
    getName: function($elem) {
      return $elem.data('name');
    }
  });
  
  module.exports = Tab;
  
});
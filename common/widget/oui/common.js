define(function(require, exports, module) {

  var $ = require('jquery');
  var Dialog = require('dialog');
  var Protocol = require('protocol');
  var Handlebars = require('handlebars');
  
  var CONTANTS = {
    QUIT_PLAN_DISABLED: false
  };
  
  var _Common = function() {
    $.extend(this, {
      constant: CONTANTS
    });
  };
  
  $.extend(_Common.prototype, {
    /**
     * Test is current browser is IE6
     */
    isIE6: function() {
      var ua = (window.navigator.userAgent || "").toLowerCase();
      return ua.indexOf("msie 6") !== -1;
    },

    /**
     * Load JSON string from html
     * @param container: can be #id or $ object
     * @param retainRaw: if set to true, raw data will be retained
     */
    loadJSON: function(container, retainRaw) {
      if (typeof container === 'string') {
        container = $(container);
      }
      var raw = $.trim(container.html());
      var ret = $.parseJSON(raw);
      if (!retainRaw) {
        container.remove();
      }
      return ret;
    },
    
    /**
     * Fill/render view via Handlebars
     * @param conf: an object of params, including:
     *   template:  $ object, should be a script element
     *   data:      it can be a $ object which contains raw json string; 
     *              or, an plain data object.
     *   container: (optional) $ object, if provided, result will be appended
     *              to it
     *   api:       (optional) used when data needs be translated;
     *   isResponse:true or false
     */
    fillTemplate: function(conf) {
      var data = conf.data,
          $template = conf.template,
          $container = conf.container || null,
          api = conf.api,
          isRsp = conf.isResponse || false;
      
      if (!data) {
        data = {};
      }
      
      if (data instanceof $) {
        data = $.trim(data.html());
        if (data) {
          data = $.parseJSON(data);
        }
        else {
          throw 'Common: cannot fill empty data.';
        }
      }
      
      if (isRsp) {
        data = data.data;
      }
      
      data = api ? Protocol.translator.translate(api, data) : data;
      var src = $template.html(),
          tpl = Handlebars.compile(src),
          html = tpl(data);
      if ($container) {
        $container.append(html);
      }
      return html;
    },
    
    /**
     * Show message dialog
     * @param data: object or string
     */
    showMessage: function(data, afterhide, aftershow) {
      var html, $tpl = $('#dialog-message');
      if ($tpl.length < 1) {
        return;
      }
      data = typeof data === 'string' ? { message: data } : data;
      html = Common.fillTemplate({ template: $tpl, data: data });

      if (this.isIE6()) {
        $('.pg-container-content').prepend(html);
        $('.ui-message-close-button').click(function() {
          $('.ui-message-content').remove();
        });
      }
      else {
        new Dialog({ content: html }).after('hide', function() {
          this.destroy();
          if(afterhide && $.isFunction(afterhide)){
            afterhide.call(this);
          }
        }).after('show', function() {
          var self = this;
          $('.ui-message-close-button').click(function() {
            self.hide();
          });
          if(aftershow && $.isFunction(aftershow)){
            aftershow.call(this);
          }
        }).show();
      }
    },
    showMessage2: function(data, afterhide, aftershow) {
      var html, $tpl = $('#dialog2-message');
      if ($tpl.length < 1) {
        return;
      }
      data = typeof data === 'string' ? { message: data } : data;
      html = Common.fillTemplate({ template: $tpl, data: data });

      if (this.isIE6()) {
        $('.pg-container-content').prepend(html);
        $('.ui-message-close-button').click(function() {
          $('.ui-message-content').remove();
        });
      }
      else {
        new Dialog({ content: html }).after('hide', function() {
          this.destroy();
          if(afterhide && $.isFunction(afterhide)){
            afterhide.call(this);
          }
        }).after('show', function() {
            var self = this;
            $('.ui-message-close-button').click(function() {
              self.hide();
            });
            if(aftershow && $.isFunction(aftershow)){
              aftershow.call(this);
            }
          }).show();
      }
    },

    /**
     * Initialize all poptips in page
     */
    initPoptips: function(container) {
      var triggers = null;
      if (container) {
        triggers = container.find('[data-ui-name="ui-poptip-trigger"]');
      } else {
        triggers = $('[data-ui-name="ui-poptip-trigger"]');
      }
      triggers.hover(function() {
        var s = $(this).data('ui-poptip-ancestor');
        var $ancestor = s ? $(this).closest(s) : $(this);
        $ancestor.find('[data-ui-name="ui-poptip"]').show();
      }, function() {
        var s = $(this).data('ui-poptip-ancestor');
        var $ancestor = s ? $(this).closest(s) : $(this);
        $ancestor.find('[data-ui-name="ui-poptip"]').hide();
      });
    }
  });
  
  var Common = new _Common();
  module.exports = Common;
  
});
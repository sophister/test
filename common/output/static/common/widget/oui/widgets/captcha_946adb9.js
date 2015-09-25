define('common:widget/oui/widgets/captcha', ['require', 'exports', 'module', "common:widget/oui/lib/jquery/1.9.1/jquery"],function(require, exports, module) {
  var $ = require("common:widget/oui/lib/jquery/1.9.1/jquery");
  
  var Captcha = function(conf) {
    $.extend(this, {
      name: conf.name,
      message: conf.message || '验证码输入错误，请重新输入'
    });
    
    this._ui = {
      img: $('#' + this.name + '-img'),
      input: $('#' + this.name + '-input'),
      message: $('#' + this.name + '-message')
    };
    
  };
  
  $.extend(Captcha.prototype, {
    
    init: function() {
      var me = this, ui = this._ui;
      
      ui.img.click(function() {
        var ts = new Date().getTime();
        ui.img.attr('src', '/image.jsp?ts=' + ts);
        ui.input.val('');
        me.clean();
      });
      
      ui.input.focusin(function() {
        me.clean();
      });
      
      return this;
    },
    
    clean: function() {
      if (this._ui.message.text() == this.message) {
        this._ui.message.text('');
      }
    }
  
  });

  module.exports = Captcha;
    
});

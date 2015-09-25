define('common:widget/oui/components/footer', ['require', 'exports', 'module', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/arale/dialog/1.3.3/dialog'],function(require, exports, module) {

  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery');
  var Dialog = require('common:widget/oui/arale/dialog/1.3.3/dialog');
  
  var Footer = function(conf) {
    
  };
  
  $.extend(Footer.prototype, {
    init: function() {
      if ($(".we-chat").length && $("#weixin-content").length) {
        new Dialog({
          trigger: '.we-chat',
          width: '350px',
          content: $('#weixin-content')
        });
      }
    }
  });
  
  module.exports = Footer;

});

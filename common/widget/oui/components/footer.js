define(function(require, exports, module) {

  var $ = require('jquery');
  var Dialog = require('dialog');
  
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

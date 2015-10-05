define(function (require, exports, module){
  var tpl = [
    '<div class="modal_header"></div>',
    '<span class="btn-close btn-close-pos"></span>',
    '<div class="verify_wrap">',
        '<h3>您还没有进行身份验证</h3>',
        '<a href="#" class="verify">马上验证</a>',
    '</div>',
    '<div class="modal_footer"></div>'
  ];

  var str = tpl.join("");
  
  module.exports = str;
});
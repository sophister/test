define(function (require, exports, module){
  
  var tpl = [
    '<span class="btn-close btn-close-pos"></span>',
    '<div class="raffle_wrap">',
        '<div class="button_wrap">',
           '<h3>您还没有进行身份验证</h3>',
           '<a href="#" class="register">马上验证</a>',
        '</div>',
    '</div>'
  ];

  var str = tpl.join("");

  module.exports = str;
  
});
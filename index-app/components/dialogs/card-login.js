define(function (require, exports, module){
  var tpl = [
    '<div class="modal_header"></div>',
    '<span class="btn-close btn-close-pos"></span>',
    '<div class="login_wrap">',
        '<h3>您还没有登录哦</h3>',
        '<div class="button_wrap">',
           '<a href="/loginPage.action" class="login">登录</a>',
           '<a href="/regPage.action?registerSource=web_top" class="register">注册</a>',
        '</div>',
    '</div>',
    '<div class="modal_footer"></div>'
  ];

  var str = tpl.join("");
  
  module.exports = str;
});
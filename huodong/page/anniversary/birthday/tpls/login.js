
module.exports = function (){
  var tpl = [
    '<span class="btn-close btn-close-pos"></span>',
    '<div class="signup_login_wrap">',
        '<h3>请登录人人贷账号报名</h3>',
        '<div class="button_wrap">',
           '<a href="/loginPage.action" class="login">登录</a>',
           '<a href="/regPage.action?registerSource=web_top" class="register">注册</a>',
        '</div>',
    '</div>'
  ];

  return tpl.join("");

};
/**
 * 点击宝箱 -- 未登录
 * @return {[type]} [description]
 */
module.exports = function (){
  var tpl = [
    '<span class="btn-close btn-close-pos"></span>',
    '<div class="raffle_wrap">',
        '<h3>您还没有登录哦</h3>',
        '<div class="button_wrap">',
           '<a href="/loginPage.action" class="login">登录</a>',
           '<a href="/regPage.action?registerSource=web_top" class="register">注册</a>',
        '</div>',
    '</div>'
  ];

  return tpl.join("");

};
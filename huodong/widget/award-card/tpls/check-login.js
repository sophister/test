/**
 * 点击卡牌 -- 登录
 * @return {[type]} [description]
 */
module.exports = function (){
  var tpl = [
    '<div class="modal_header"></div>',
    '<span class="btn-close btn-close-pos"></span>',
    '<div class="login_wrap">',
        '<h3>您还没有登录哦</h3>',
        '<div class="button_wrap">',
           '<a href="#" class="login">登录</a>',
           '<a href="#" class="register">注册</a>',
        '</div>',
    '</div>',
    '<div class="modal_footer"></div>'
  ];

  return tpl.join("");

};
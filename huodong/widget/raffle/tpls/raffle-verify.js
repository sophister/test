/**
 * 点击兑换 -- 点击兑换出现的待验证弹框
 * @return {[type]} [description]
 */
module.exports = function (){
  var tpl = [
    '<span class="btn-close btn-close-pos"></span>',
    '<div class="raffle_wrap">',
        '<div class="button_wrap">',
           '<h3>您还没有进行身份验证</h3>',
           '<p>完成验证后才可参与活动哦</p>',
           '<a href="#" class="register">马上验证</a>',
        '</div>',
    '</div>'
  ];

  return tpl.join("");

};
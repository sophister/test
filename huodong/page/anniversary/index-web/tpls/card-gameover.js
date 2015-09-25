/**
 * 点击卡牌 -- 翻牌次数已用尽
 * @return {[type]} [description]
 */
module.exports = function (){
  var tpls = [
    '<div class="modal_header"></div>',
    '<span class="btn-close btn-close-pos"></span>',
    '<h3>您今天牌翻的次数已用尽!<br>明天再来试试</h3>',
    '<div class="modal_footer"></div>'
  ];

  return tpls.join("");
};
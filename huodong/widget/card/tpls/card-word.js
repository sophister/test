/**
 * 点击卡牌 -- 获得文字
 * @return {[type]} [description]
 */
module.exports = function (){

  var tpls = [
    '<div class="modal_header"></div>',
    '<span class="btn-close btn-close-pos"></span>',
    '<h3>恭喜您获得幸运文字</h3>',
    '<div class="word_wrap"><span><i><%= word %></i></span></div>',
    '<p>集齐幸运文字可获得心意礼包</p>',
    '<div class="modal_footer"></div>'
  ];

  return tpls.join('');
  
}
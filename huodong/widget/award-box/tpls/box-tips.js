/**
 * 点击宝箱 -- 没有获得奖品
 * @return {[type]} [description]
 */
module.exports = function (){
  var tpl = [
    '<span class="btn-close btn-close-pos"></span>',
    '<div class="raffle_wrap">',
        '<h3><%= tip %></h3>',
    '</div>'
  ];

  return tpl.join("");

};
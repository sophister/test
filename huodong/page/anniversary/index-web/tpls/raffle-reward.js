/**
 * 点击宝箱 -- 获得奖品
 * @return {[type]} [description]
 */
module.exports = function (){
  var tpl = [
    '<span class="btn-close btn-close-pos"></span>',
    '<div class="raffle_wrap">',
        '<h3>我的奖品</h3>',
        '<img src="<%= src %>" alt="" />',
        '<h4><%= name %></h4>',
        '<a href="">修改收货地址</a>',
    '</div>'
  ];

  return tpl.join("");
}
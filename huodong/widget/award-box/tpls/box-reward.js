/**
 * 点击宝箱 -- 获得奖品
 * @return {[type]} [description]
 */
module.exports = function (){
  var tpl = [
    '<span class="btn-close btn-close-pos"></span>',
    '<div class="raffle_big_wrap">',
      '<div class="box">',
        '<h3>我的奖品</h3>',
        '<img src="<%= data.src %>" alt="" />',
        '<h4><%= data.name %></h4>',
        '<span id="writeAddr">修改收货地址</span>',
      '</div>',
    '</div>'
  ];

  return tpl.join("");
}
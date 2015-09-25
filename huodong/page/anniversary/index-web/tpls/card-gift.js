/**
 * 点击卡牌 -- 翻牌后获得奖励的弹框内容
 * @return {[type]} [description]
 */
module.exports = function (){
  var tpls = [
    '<div class="modal_header"></div>',
    '<span class="btn-close btn-close-pos"></span>',
    '<div class="gift_wrap">',
        '<h3><%= lotteryName %></h3>',
        '<div class="ptag_wrap"><span>兑换码：<strong><%= ticketCode  %></strong></span><br>',
        // '<span>使用地址：<%=  %></span></div>',
    '</div>',
    '<div class="modal_footer"></div>'
  ];

  return tpls.join('');

};
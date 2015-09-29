/**
 * 点击兑换 -- 兑换成功的弹窗内容
 * @return {[type]} [description]
 */
module.exports = function (){
  return '<div class="modal_header"></div>'+
    '<span class="btn-close btn-close-pos"></span>'+
    '<h3>恭喜您集齐幸运文字！<br>获得心意礼包</h3>'+
    '<div class="suc_wrap" id="suc_wrap">'+
    '<% for (var i = 0; i < data.length; i++) { %>' +
      '<div class="gift_wrap">'+
      '<h3><%= data[i].ticketName || "" %></h3>'+
      '<div class="ptag_wrap"><span>兑换码：<strong><%= data[i].ticketCode || "" %></strong></span>'+
      '</div></div>'+
    '<% } %>'+
    '</div>'+
    '<div class="modal_footer"></div>'
};
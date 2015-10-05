define(function (require, exports, module){
  var tpl = [
    '<div class="modal_header"></div>',
    '<span class="btn-close btn-close-pos"></span>',
    '<h3>恭喜您！<br>抽中<%= ticketName %></h3>',
    '<div class="libao">' +
    '<% for (var i = 0; i < data.length; i++) { %>' +
      '<div class="gift_wrap">'+
      '<h3><%= data[i].ticketName || "" %></h3>'+
      '<div class="ptag_wrap"><span>兑换码：<strong><%= data[i].ticketCode || "" %></strong></span>'+
      '</div></div>'+
    '<% } %>'+
    '</div>' +
    '<div class="modal_footer"></div>'
  ];

  var str = tpl.join("");

  module.exports = str;
});
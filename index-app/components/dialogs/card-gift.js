define(function (require, exports, module){
  var tpl = [
    '<div class="modal_header"></div>',
    '<span class="btn-close btn-close-pos"></span>',
    '<h3>恭喜您！<br>抽中<%= data.ticketName %></h3>',
    '<div class="gift_wrap">',
        '<h3><%= data.ticketName %></h3>',
        '<div class="ptag_wrap"><span>兑换码：<br><strong><%= data.ticketCode  %></strong></span><br></div>',
    '</div>',
    '<div class="modal_footer"></div>'
  ];

  var str = tpl.join("");

  module.exports = str;
});
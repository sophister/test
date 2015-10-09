define(function (require, exports, module){
  var tpl = [
    '<div class="modal_header"></div>',
    '<span class="btn-close btn-close-pos"></span>',
    '<h3>恭喜您！<br>抽中<%= data.ticketName %></h3>',
    '<div class="gift_wrap">',
        '<h3><%= data.ticketName %></h3>',
        '<div class="ptag_wrap">',
          '<% if(data.ticketCode && data.ticketMobileUrl){ %>',
            '<span>兑换码：<strong><%= data.ticketCode  %><br></strong></span>',
            '<span>使用地址：<a href="<%= data.ticketMobileUrl %>" target="_blank"><%= data.ticketMobileUrl %></a></span>',
          '<% } else { %>',
              '<span><strong><%= data.ticketName %>(已发到个人账户)</strong></span>',
          '<% } %>',
        '</div>',
    '</div>',
    '<div class="modal_footer"></div>'
  ];
  

  var str = tpl.join("");

  module.exports = str;
});
define(function (require, exports, module){

  var str = '<div class="modal_header"></div>'+
          '<span class="btn-close btn-close-pos"></span>'+
          '<h3>我的奖品</h3>'+
          '<div class="suc_wrap" id="suc_wrap">'+
            '<% for (var i = 0; i < data.length; i++) { %>' +
              '<% if(data[i].luckPackage && data[i].luckPackage.value.length){ %>' +
                '<h5 style="color: #fff;font-size: 26px;margin: 10px 0;">心意礼包</h5>' +
                '<% for (var j = 0; j < data[i].luckPackage.value.length; j++) { %>' +
                  '<div class="gift_wrap">'+
                    '<h3><%= data[i].luckPackage.value[j].ticketName %></h3>'+
                    '<div class="ptag_wrap">' +
                      '<% if(data[i].luckPackage.value[j].ticketCode && data[i].luckPackage.value[j].ticketUrl){ %>' +
                        '<span>兑换码：<strong><%= data[i].luckPackage.value[j].ticketCode  %><br></strong></span>' +
                        '<span>使用地址：<a href="<%= data[i].luckPackage.value[j].ticketUrl %>" target="_blank"><%= data[i].luckPackage.value[j].ticketUrl %></a></span>' +
                      '<% } else { %>' +
                          '<span><strong><%= data[i].luckPackage.value[j].ticketName %>(已发到个人账户)</strong></span>' +
                      '<% } %>' +
                    '</div>' +
                  '</div>'+
                '<% } %>' +
              '<% } else { %>' +
                '<div class="gift_wrap">'+
                  '<h3><%= data[i].ticketName %></h3>'+
                  '<div class="ptag_wrap">' +
                    '<% if(data[i].ticketCode && data[i].ticketUrl){ %>' +
                      '<span>兑换码：<strong><%= data[i].ticketCode  %><br></strong></span>' +
                      '<span>使用地址：<a href="<%= data[i].ticketUrl %>" target="_blank"><%= data[i].ticketUrl %></a></span>' +
                    '<% } else { %>' +
                        '<span><strong><%= data[i].ticketName %>(已发到个人账户)</strong></span>' +
                    '<% } %>' +
                  '</div>' +
                '</div>'+
              '<% } %>'+
            '<% } %>'+
          '</div>'+
          '<div class="modal_footer"></div>';

  module.exports = str;
  
});
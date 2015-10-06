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
                      '<div class="ptag_wrap"><span>兑换码：<br><strong><%= data[i].luckPackage.value[j].ticketCode %></strong></span>'+
                      '</div></div>'+
                    '<% } %>' +
                  '<% } else { %>' +
                    '<div class="gift_wrap">'+
                    '<h3><%= data[i].ticketName || "" %></h3>'+
                    '<div class="ptag_wrap"><span>兑换码：<br><strong><%= data[i].ticketCode || "" %></strong></span>'+
                    '</div></div>'+
                  '<% } %>' +
                '<% } %>'+
              '</div>'+
              '<div class="modal_footer"></div>';

  module.exports = str;
  
});
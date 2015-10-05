define(function (require, exports, module){
  var tpl = [
    '<span class="btn-close btn-close-pos"></span>',
    '<div class="raffle_wrap">',
        '<h3><%= tip %></h3>',
    '</div>'
  ];

  var str = tpl.join("");

  module.exports = str;

  
});
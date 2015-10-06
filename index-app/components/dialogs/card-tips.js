define(function (require, exports, module){
  
  var tpl = [
    '<div class="modal_header"></div>',
    '<span class="btn-close btn-close-pos"></span>',
    '<div class="login_wrap">',
        '<h3><%= tips %></h3>',
    '</div>',
    '<div class="modal_footer"></div>'
  ];

  var str = tpl.join("");

  module.exports = str;
  
});
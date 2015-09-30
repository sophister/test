/**
 * 查看我的奖品 -- 无
 * @return {[type]} [description]
 */
module.exports = function (){
  var tpl = [
    '<div class="modal_header"></div>',
    '<span class="btn-close btn-close-pos"></span>',
    '<div class="login_wrap">',
        '<h3><%= tips %></h3>',
    '</div>',
    '<div class="modal_footer"></div>'
  ];

  return tpl.join("");
}
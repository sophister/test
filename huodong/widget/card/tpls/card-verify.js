module.exports = function (){
  var tpls = [
    '<div class="modal_header"></div>',
    '<span class="btn-close btn-close-pos"></span>',
    '<div class="verify_wrap">',
        '<h3>您还没有进行身份验证</h3>',
        '<p>完成验证后才可参与活动哦</p>',
        '<a href="#" class="verify">马上验证</a>',
    '</div>',
    '<div class="modal_footer"></div>'
  ];

  return tpls.join('');
};
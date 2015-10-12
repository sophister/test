module.exports = function (){
  var tpl = [
    '<span class="btn-close btn-close-pos"></span>',
    '<div class="signup_wrap">',
      '<h3>活动报名表</h3>',
      '<form id="addr">',
        '<input type="text" name="userName" class="userName" value="" placeholder="姓名" />',
        '<input type="text" name="mobile" class="mobile" value="" placeholder="电话" />',
        '<input type="text" name="province" class="province" value="" placeholder="省" />',
        '<input type="text" name="city" class="city" value="" placeholder="市" />',
        '<input type="text" name="detailedAddress" class="address" value="" placeholder="详细地址（官方将为您快递邀请函）" />',
        '<input type="text" name="reason" class="reason" value="" placeholder="申请理由" />',
        '<input type="button" class="submit" id="signup" value="提交资料">',
      '</form>',
    '</div>'
  ];

  return tpl.join("");

};
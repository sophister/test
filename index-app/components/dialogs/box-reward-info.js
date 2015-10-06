define(function (require, exports, module){
  
  var tpl = [
    '<span class="btn-close btn-close-pos"></span>',
    '<div class="raffle_big_wrap">',
      '<h3>鸿运当头！</h3>',
      '<h6>恭喜您抽中<%= data.lotteryDetail %>，请填写收货信息</h6>',
      '<form id="addr">',
        '<input type="text" name="userName" class="userName" value="" placeholder="收货人姓名" />',
        '<input type="text" name="mobile" class="mobile" value="" placeholder="收货人电话" />',
        '<input type="text" name="province" class="province" value="" placeholder="省" />',
        '<input type="text" name="city" class="city" value="" placeholder="市" />',
        '<input type="text" name="detailedAddress" class="detailedAddress" value="" placeholder="输入门牌号等详细信息" />',
        '<input type="button" class="submit" id="submit" value="确认提交">',
      '</form>',
    '</div>'
  ];

  var str = tpl.join("");

  module.exports = str;
  
});
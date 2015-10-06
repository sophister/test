define(function (require, exports, module){
  
  var tpl = [
    '<h3>鸿运当头！</h3>',
    '<h6>恭喜您抽中<%= data.lotteryName %>，请填写收货信息</h6>',
    '<form id="addrChange" class="addr">',
      '<input type="text" name="userName" class="userName" value="<%= data.userName || "" %>" placeholder="收货人姓名" /><br>',
      '<input type="text" name="mobile" class="mobile" value="<%= data.mobile || "" %>" placeholder="收货人电话" /><br>',
      '<input type="text" name="province" class="province" value="<%= data.province || "" %>" placeholder="省" />',
      '<input type="text" name="city" class="city" value="<%= data.city || "" %>" placeholder="市" /><br>',
      '<input type="text" name="detailedAddress" class="detailedAddress" value="<%= data.detailedAddress || "" %>" placeholder="详细地址" />',
      '<input type="button" class="submit" id="confirm" value="确认提交">',
    '</form>',
  ];

  var str = tpl.join("");

  module.exports = str;
  
});

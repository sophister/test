/**
 * 修改地址信息
 * @return {[type]} [description]
 */
module.exports = function (){
  var tpl = [
    '<h3>鸿运当头！</h3>',
    '<h6>恭喜您抽中***，请填写收货信息</h6>',
    '<form class="addr" name="addr" method="post" onSubmit="" action="/event/eventLottery!addUserAddress.action">',
      '<label for="userName">收货人姓名</label><input type="text" name="userName" class="userName" value="<%= data.userName || "" %>" placeholder="收货人姓名" />',
      '<label for="mobile">收货人电话</label><input type="text" name="mobile" class="mobile" value="<%= data.mobile || "" %>" placeholder="收货人电话" />',
      '<label for="province">收货地址</label><input type="text" name="province" class="province" value="<%= data.province || "" %>" placeholder="省" />',
      '<input type="text" name="city" class="city" value="<%= data.city || "" %>" placeholder="市" />',
      '<input type="text" name="detailedAddress" class="detailedAddress" value="<%= data.detailedAddress || "" %>" placeholder="详细地址" />',
      '<input type="button" class="submit" value="确认提交">',
    '</form>',
  ];

  return tpl.join("");

};
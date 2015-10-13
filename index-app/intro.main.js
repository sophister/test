require.config({
  baseUrl: '/',
  paths: {
    jquery: "static/libs/jquery/1.11.2/jquery",
    text: "static/libs/requirejs/text",
    css: "static/libs/requirejs/css",
    ajax: "static/libs/ajax/ajax",
    modal: "static/libs/modal/modal",
  },
  shim: {

  }
});

require([
  'jquery',
  'ajax'
], function($, ajax) { 

  $('.submit').on('click', function(e){
    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

    if($('.userName').val() == ""  ){
      alert("收货人姓名不能为空");
      return false;
     }
     if( !reg.test($('.mobile').val()) ){
      alert("收货人电话格式不正确");
      return false;
     }
     if( $('.province').val() == "" || $('.city').val() == "" || $('.detailedAddress').val() == "" ){
      alert("请完善收货地址信息");
      return false;
     }
     if( $('.reason').val() == "" ){
      alert("请填写您的申请理由");
      return false;
    }

    ajax.get('/five_annual/add_registration.json', {
      "userName": $(".userName").val(),
      "mobile": $(".mobile").val(),
      "province": $(".province").val(),
      "city": $(".city").val(),
      "detailedAddress": $(".detailedAddress").val(),
      "reason": $(".reason").val()
    }, function(res){
      $('body').append('<span id="tips">报名成功！</span>')
      $('#tips').fadeOut(3000, function () {
        window.open('/pages/birthday/index.html', '_self');
      });

      return false;
      
    });

  });
});

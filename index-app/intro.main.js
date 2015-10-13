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

  function DOMRender(){
    ajax.get('/five_annual/query_registration.json', {"version": "2.0"}, function( res ){
      var mobile = res.data.registration.mobile;
      $('.mobile').val(mobile);
    });
  }

  function commonTips( tip , cb){
    $('body').append('<span id="tips">' + tip + '！</span>')
    $('#tips').fadeOut(2000, function(){
      $('#tips').remove();
      if(cb)
        cb();
    });
  }

  DOMRender();

  $('.submit').on('click', function(e){
    var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

    if($('.userName').val() == ""  ){
      commonTips("收货人姓名不能为空");
      return false;
    }
    if( !reg.test($('.mobile').val()) ){
      commonTips("收货人电话格式不正确");
      return false;
    }
    if( $('.province').val() == "" || $('.city').val() == "" || $('.detailedAddress').val() == "" ){
      commonTips("请完善收货地址信息");
      return false;
    }
    if( $('.reason').val() == "" ){
      commonTips("请填写您的申请理由");
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
      
      commonTips("报名成功", function(){
        window.open('/pages/birthday/index.html', '_self');
      })

      return false;
      
    });

  });
});

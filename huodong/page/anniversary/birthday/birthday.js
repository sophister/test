/**
 * 生日趴首页
 * @type {[type]}
 */
var $ = require('jquery');
var Swiper = require('huodong:widget/ui/swiper/swiper.3.1.2.min.js');
var template = require('huodong:widget/ui/template/template.js');
var ajax = require('huodong:widget/ui/ajax/ajax.js');
var Modal = require('huodong:widget/ui/modal/modal.js');
var show = initModal();
var modal;

var tpl_login = require('./tpls/login.js')();
var tpl_signup = require('./tpls/signup.js')();

function initModal () {
  return function (txt){
    var modal;
    if( modal ){
        modal.show(txt);
    }else{
      modal = new Modal({
        content : txt,
      });
      modal._create();
    }

    return modal;
  }
}

// init swiper
$(document).ready(function () {
  var swiper = new Swiper('.swiper-container', {
    pagination: '.swiper-pagination',
    direction: 'vertical',
    slidesPerView: 1,
    paginationClickable: true,
    spaceBetween: 0,
    mousewheelControl: true
  });
});

/**
 * 报名
 * @type {Object}
 */
var birth = {

  init: function(){
    this.DOMRender();
    this.evenHandle();
  },

  DOMRender: function(){
    ajax.get('/event/eventLottery!queryRegistration.action', {}, function( res ){
      var data = res.data || {};
      // 如果已经报名，则初始化为报名成功
      if(!$.isEmptyObject(data)){
        $('.want').text('报名成功');
      }
    })
  },

  evenHandle: function(){
    var _this = this;

    $('.want').on('click', function( e ){
      ajax.get('/event/eventLottery!queryRegistration.action', {}, function( res ){
        var code = res.errorCode;
        var data = res.data;

        if(9999 == code){
          modal = show( template(tpl_login)() );
        }else if(0 == code){
          // 如果返回的接口有数据，则是修改
          if(data && data.length){
            // DO SOMETHING.
          }
          // 返回的接口无数据，则是新增
          else {
            modal = show( template(tpl_signup)() );

            // 点击新增提交按钮
            _this.checkForm();
          }
        }
      })
    });
  },

  checkForm: function(){
    $('#signup').on('click', function(e){
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

       // 表单提交
       ajax.post('/event/eventLottery!addRegistration.action', {
        "userName": $("#addrChange .userName").val(),
        "mobile": $("#addrChange .mobile").val(),
        "province": $("#addrChange .province").val(),
        "city": $("#addrChange .city").val(),
        "detailedAddress": $("#addrChange .detailedAddress").val(),
        "reason": $("#addrChange .reason").val()
       }, function(res){
         modal.hide();
         $('.want').text('报名成功');
         $('body').append('<span id="tips">报名成功！</span>')
         $('#tips').fadeOut(2000);
         return false;
       });
    });
  }
};

birth.init();



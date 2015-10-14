/**
 * 生日趴首页
 * @type {[type]}
 */
var $ = require('jquery');
var Swiper = require('huodong:widget/ui/swiper/2.7.0/swiper.js');
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
    // pagination: '.swiper-pagination',
    // direction: 'vertical',
    pagination : '.pagination',
    paginationClickable :true,
    mode: 'vertical',
    slidesPerView: 1,
    paginationClickable: true,
    spaceBetween: 0,
    mousewheelControl: true
  });

  function correctPNG(){  
   for(var i=0; i<document.images.length; i++)  
      {  
      var img = document.images  
      var imgName = img.src.toUpperCase()  
      if (imgName.substring(imgName.length-3, imgName.length) == "PNG")  
         {  
         var imgID = (img.id) ? "id='" + img.id + "' " : ""  
         var imgClass = (img.className) ? "class='" + img.className + "' " : ""  
         var imgTitle = (img.title) ? "title='" + img.title + "' " : "title='" + img.alt + "' "  
         var imgStyle = "display:inline-block;" + img.style.cssText   
         if (img.align == "left") imgStyle = "float:left;" + imgStyle  
         if (img.align == "right") imgStyle = "float:right;" + imgStyle  
         if (img.parentElement.href) imgStyle = "cursor:hand;" + imgStyle          
         var strNewHTML = "<span " + imgID + imgClass + imgTitle  
         + " style=\"" + "width:" + img.width + "px; height:" + img.height + "px;" + imgStyle + ";"  
         + "filter:progid:DXImageTransform.Microsoft.AlphaImageLoader"  
         + "(src=\'" + img.src + "\', sizingMethod='scale');\"></span>"   
         img.outerHTML = strNewHTML  
         i = i-1  
         }  
      }  
  }  

  window.attachEvent("onload", correctPNG);  

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
      var status = res.data.status;
      // 如果已经报名，则初始化为报名成功
      if(status){
        $('.want').text('报名成功');
      }
    })
  },

  evenHandle: function(){
    var _this = this;

    $('.want').on('click', function( e ){
      ajax.get('/event/eventLottery!queryRegistration.action', {}, function( res ){
        var code = res.errorCode;
        var status = res.data.status;

        if(9999 == code){
          modal = show( template(tpl_login)() );
        }else if(0 == code){
          // 未报名
          if(!status){
            modal = show( template(tpl_signup)({"data": res.data.registration}) );
            // 点击新增提交按钮
            _this.checkForm();
          }
        }
      })
    });
  },

  checkForm: function(){
    var _this = this;

    $('#signup').on('click', function(e){
      var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

      if($('.userName').val() == ""  ){
        _this.commonTips("收货人姓名不能为空");
        return false;
       }
       if( !reg.test($('.mobile').val()) ){
        _this.commonTips("收货人电话格式不正确");
        return false;
       }
       if( $('.province').val() == "" || $('.city').val() == "" || $('.detailedAddress').val() == "" ){
        _this.commonTips("请完善收货地址信息");
        return false;
       }
       if( $('.reason').val() == "" ){
        _this.commonTips("请填写您的申请理由");
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
         _this.commonTips("报名成功");
         return false;
       });
    });
  },

  commonTips: function ( tip , cb){
    $('body').append('<span id="tips">' + tip + '！</span>')
    $('#tips').fadeOut(2000, function(){
      $('#tips').remove();
      if(cb)
        cb();
    });
  }
};

birth.init();



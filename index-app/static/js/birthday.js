define([
  'jquery',
  'ajax',
  'template',
  'modal',
  'tpl_birth_login'
], function ($, ajax, template, Modal, tpl_birth_login){

  var show = initModal();
  var modal;

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
  };

  /**
   * index
   * @type {Object}
   */
  var birth = {

    init: function(){

      this.DOMRender();
      this.eventHandle();
    },

    DOMRender: function(){
      ajax.get('/five_annual/query_registration.json', {"version": "2.0"}, function( res ){
        var status = res.data.status;

        // 如果已经报名，则初始化为报名成功
        if(status){
          $('.want').text('报名成功');
        }
      });
    },

    eventHandle: function(){
      var _this = this;
      
      $('.want').on('click', function( e ){
        ajax.get('/five_annual/query_registration.json', {"version": "2.0"}, function( res ){
          var code = res.errorCode;
          var status = res.data.status;

          // 未登录
          if(9999 == code){
            modal = show( template(tpl_birth_login)() );
          }

          // 去报名的条件: 返回的参数正确，data无参数表示之前没有填写过
          if(!status){
            window.open('/pages/birthday/signup.html', '_self');
          }

        });

      });
    }
  };

  birth.init();
  
});
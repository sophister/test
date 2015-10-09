define([
  'jquery', 
  'text!components/word/word.html', 
  'css!components/word/word.css',
  'ajax',
  'template',
  'modal',
  'tpl_card_login',
  'tpl_card_verify',
  'tpl_exchange_success',
  'tpl_card_tips'
], function ($, tpl, css, ajax, template, Modal, tpl_card_login, tpl_card_verify, tpl_exchange_success, tpl_card_tips){
  
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
        //原show方法会引起定位问题，重写
        modal.hide = function() {
          modal.dom.instance.css({'display':'none'});
        };
        modal.show = function(){
          modal.dom.instance.css({'display':'block'});
        };
      }

      return modal;
    }
  };

  var rank = {

    init: function(){
      this.DOMRender();
      this.eventHandle();
    },

    DOMRender: function(){
      // 模板异步插入
      $('#sec_03').append(tpl);

      var list = $('.widget-word li').find('.word');

      // ajax.get('/event/eventLottery!queryUserLuckyWords.action', {}, function(res){
      ajax.get('/event/eventLottery/queryUserLuckyWords.json', {}, function(res){
        if( res.errorCode == 0 ) {
          var userLuckyWords = res.data || [];
          for(var i=0,len=list.length; i<len; i++){
            var word = $(list[i]).text();

            for(var j=0;j<userLuckyWords.length;j++){
              if(word == userLuckyWords[j]) {
                $(list[i]).parent().addClass('selected');
              }
            }
          }
        }
      });
    },

    eventHandle: function(){
      var target = $('.widget-word button');
      target.on('click', function( e ){
        // ajax.get('/five_annual/exchange_package', {}, function(res){
        ajax.get('/five_annual/exchange_package.json', {}, function(res){
          var code = res.status;
          switch(code) {
            case 9999:
              modal = show( template(tpl_card_login)() );
              break;
            case 3000:
              modal = show( template(tpl_card_verify)() );
              break;
            case 0:
              modal = show( template(tpl_exchange_success)({"data": res.data.package_list}) );

              // 用来模拟滚动条
              // $("#suc_wrap").mCustomScrollbar({
              //     theme:"minimal"
              // });

              break;
            default:
              break;
          }
        });
      });
    }
  };

  rank.init();
  
});
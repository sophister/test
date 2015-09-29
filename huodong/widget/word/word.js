/**
 * 点击兑换按钮部分
 * @type {[type]}
 */
var $ = require('jquery');
var template = require('huodong:widget/ui/template/template.js');
var ajax = require('huodong:widget/ui/ajax/ajax.js');
var Modal = require('huodong:widget/ui/modal/modal.js');
var show = initModal();
var modal;

var scrollbar = require('huodong:widget/ui/scrollbar/scrollbar.js');

// 兑换部分的弹框：三种情况
var tpl_exchange_login = require('./tpls/exchange-login.js')();
var tpl_exchange_verify = require('./tpls/exchange-verify.js')();
var tpl_exchange_success = require('./tpls/exchange-success.js')();

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
}

var word = {
  init: function (){
    this.DOMRender();
    this.eventHandle();
  },
  DOMRender: function(){
    var list = $('.widget-word li').find('.word');

    ajax.get('/event/eventLottery!queryUserLuckyWords.action', {}, function(res){
      if( res.errorCode == 0 ) {
        var userLuckyWords = res.data;
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

      ajax.get('/event/eventLottery!exchangePackage.action', {}, function(res){
        var code = res.errorCode;
        switch(code) {
          case 9999:
            modal = show( template(tpl_exchange_login)() );
            break;
          case 3000:
            modal = show( template(tpl_exchange_verify)() );
            break;
          case 0:
            modal = show( template(tpl_exchange_success)({"data": res.data}) );

            // 用来模拟滚动条
            $("#suc_wrap").mCustomScrollbar({
                theme:"minimal"
            });

            break;
          default:
            break;
        }

      });
    });
  }
};

module.exports = word;
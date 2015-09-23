/**
 * @author GuoYongfeng
 * @date   2015-09-21
 * @description 翻卡牌
 */
var Modal = require('huodong:widget/ui/modal/modal.js');

function turn(target, time, opts){
  var el = target.find('span');

  el.on('click', function( e ){
    $(this).find('.front').stop().animate(opts[0],time,function(){
      $(this).hide().next().show();
      $(this).next().animate(opts[1],time);
    });
  });

  el.hover(function(){
    //鼠标放上去
    $(this).addClass('scale-hover');
  }, function(){
    // 鼠标离开
    $(this).removeClass('scale-hover');
  });
};

function initModal (txt) {
  var modal;

  return function (txt){
    if( modal ){
      modal.show(txt);
    }else{
      modal = new Modal({
        content : txt,
      });
      modal._create();
      //原生show方法会引起定位问题，重写
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

module.exports.turn = turn;
module.exports.initModal = initModal;

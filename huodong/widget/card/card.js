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

function initModal () {
  var modal;

  return function (url, txt){
    if( modal ){
      modal.show();
    }else{
      modal = new Modal({
        // title : "温馨提示",
        content : "恭喜您注册成功",
        // confirmText : "返回"
      });
      modal.show();
    }

    return modal;
  }
}

module.exports.turn = turn;
module.exports.initModal = initModal;

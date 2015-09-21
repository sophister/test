/**
 * @author GuoYongfeng
 * @date   2015-09-21
 * @description 翻卡牌
 * @param  {[type]} target [description]
 * @param  {[type]} time   [description]
 * @param  {[type]} opts   [description]
 * @return {[type]}        [description]
 */
module.exports = function (target, time, opts){
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


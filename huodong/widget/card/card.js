/**
 * @author GuoYongfeng
 * @date   2015-09-21
 * @description 翻卡牌
 */
var $ = require('jquery');
var template = require('huodong:widget/ui/template/template.js');
var ajax = require('huodong:widget/ui/ajax/ajax.js');
var Modal = require('huodong:widget/ui/modal/modal.js');
var show = initModal();
var modal;

// 卡牌部分的弹框：五种情况
var tpl_card_login = require('./tpls/card-login.js')();
var tpl_card_gift = require('./tpls/card-gift.js')();
var tpl_card_word = require('./tpls/card-word.js')();
var tpl_card_gameover = require('./tpls/card-gameover.js')();
var tpl_card_libao = require('./tpls/card-libao.js')();

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

var card = {
  /**
   * 初始入口
   * @return {[type]} [description]
   */
  init: function(){
    this.DOMRender();
    this.eventHanle();
  },
  /**
   * 封装翻转函数
   * @param  {[type]} target [description]
   * @param  {[type]} time   [description]
   * @param  {[type]} opts   [description]
   * @return {[type]}        [description]
   */
  turn: function(target, time, opts){
    var el = target.find('span');

    el.hover(function(){
      //鼠标放上去
      $(this).addClass('scale-hover');
    }, function(){
      // 鼠标离开
      $(this).removeClass('scale-hover');
    });

    // 点击卡牌
    el.on('click', function( e ){
      var position = $(this).data('position');

      ajax.get('/event/eventLottery!turnCardLottery.action?position=' + position, {}, function(res){
          var data = res.data;
          var code = res.errorCode;
          var lotteryResult = res.data.lotteryResult;
          var lotteryIndex = res.data.lotteryIndex;

          // 未登录
          if(code == 9999) {
            modal = show( template(tpl_card_login)() );
          } 
          // 未验证
          else if(code == 3000) {

          }
          // 请求成功，继续判断活动情况
          // lotteryResult字段含义：
          // 1:投资额不足; 2:未中奖; 3:中奖; 4:今天抽过奖;
          // 5:已经中过奖; 6.可以抽奖; 7:抽奖时间已过期; 8:未到抽奖时间
          else if(code == 0) {
            switch(lotteryResult) {
              case 4:
                modal = show( template(tpl_card_gameover)() );
                break;
              case 3:
                // 还需要根据lotteryIndex字段判断
                // 继续判断获取的是红包、优惠券、幸运文字三种情况
                // lotteryIndex字段含义：
                // 0:心意礼包; 1:兑换券; 2:红包; 3:"心"字; 4:其它文字
                if ( lotteryIndex == 3 || lotteryIndex == 4 ) {
                  modal = show( template(tpl_card_word)(data) );
                  break;
                } else if( lotteryIndex == 2 ) {
                  modal = show( template(tpl_card_gift)(data) );
                  break;
                } else if( lotteryIndex == 0 ) {
                  modal = show( template(tpl_card_libao)(data) );
                  break;
                }
              default:
                break;
            }
          }
      });

      $(this).find('.front').stop().animate(opts[0],time,function(){
        $(this).hide().next().show();
        $(this).next().animate(opts[1],time);
      });
    });

    
  },
  /**
   * 处理翻转
   * @return {[type]} [description]
   */
  turnHandle: function (){
    var verticalOpts = [{'width':0},{'width':'180px'}];
    this.turn($('#vertical'),100,verticalOpts);
  },
  DOMRender: function(){
    var tpls = this.tpls();
    var _this = this;

    ajax.get('/event/eventLottery!queryUserCardList.action', {}, function(res){
        var data = res.data;

        $('#vertical').append(template(tpls)({"data": data}));
        _this.turnHandle();
    });

  },
  tpls: function(){
    // lotteryIndex字段含义：
    // 0:心意礼包;
    // 1:兑换券;
    // 2:红包;
    // 3:"心"字;
    // 4:其它文字
    return '<% for (var i = 0; i < data.length; i++) { %>' +
            '<span data-position="<%= data[i].position %>">' +
              '<div class="front" id="bgcolor_0<%= data[i].position %>">' +
                '<h3>0<%= data[i].position %></h3>' +
                '<p>只为成就更好的你</p>' +
              '</div>' +
              '<div class="info">' +
                '<% if( data[i].lotteryIndex == 3 || data[i].lotteryIndex == 4 ){ %>' + 
                  '<h3 class="word"><i><%= data[i].lotteryName %></i></h3>' +
                '<% } else { %>' +
                  '<h3><%= data[i].lotteryName %></h3>' +
                '<% } %>' +
              '</div>' +
            '</span>' +
          '<% } %>';
  },
  /**
   * 统一事件处理入口
   * @return {[type]} [description]
   */
  eventHanle: function(){
    this.turnHandle();
  }
};

module.exports = card;


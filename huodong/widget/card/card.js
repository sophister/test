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

var defaultData = [
  {
    "position": 1,
    "lotteryId": 31,
    "lotteryIndex": 3,
    "lotteryName": "心",
    "status": false
  },
  {
    "position": 2,
    "lotteryId": 33,
    "lotteryIndex": 4,
    "lotteryName": "始",
    "status": false
  },
  {
    "position": 3,
    "lotteryId": 37,
    "lotteryIndex": 4,
    "lotteryName": "见",
    "status": false
  },
  {
    "position": 4,
    "lotteryId": 36,
    "lotteryIndex": 4,
    "lotteryName": "从",
    "status": false
  },
  {
    "position": 5,
    "lotteryId": 37,
    "lotteryIndex": 4,
    "lotteryName": "来",
    "status": false
  }
];

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
   * 统一事件处理入口
   * @return {[type]} [description]
   */
  eventHanle: function(){
    this.clickCard();
  },

  /**
   * 封装翻转函数
   * @param  {[type]} target [description]
   * @param  {[type]} time   [description]
   * @param  {[type]} opts   [description]
   * @return {[type]}        [description]
   */
  hoverEffect: function(target, time, opts){
    var el = target.find('span');

    el.hover(function(){
      //鼠标放上去
      $(this).addClass('scale-hover');
    }, function(){
      // 鼠标离开
      $(this).removeClass('scale-hover');
    });
  },

  // 点击卡牌
  clickCard: function(){
    var _this = this;

    $('#vertical').on('click', 'span', function( e ){
      var target = $(this);
      var position = $(this).data('position');

      ajax.get('/event/eventLottery!turnCardLottery.action?position=' + position, {}, function(res){
          var data = res.data;
          var code = res.errorCode;
          var lotteryResult = res.data.lotteryResult;
          var lotteryIndex = res.data.lotteryIndex;
          var lotteryName = res.data.lotteryName;
          var ticketName = res.data.ticketName;

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
                  modal = show( template(tpl_card_word)({"word": lotteryName}) );
                  target.find('.info').html(' ').append('<h3 class="word"><i>' + lotteryName + '</i></h3>');
                } else if( lotteryIndex == 1 ) {
                  modal = show( template(tpl_card_gift)({"data": data}) );
                  target.find('.info').html(' ').append('<h3>' + ticketName + '</h3>');
                } 
                // TODO: 0和2两种情况待定
                else if( lotteryIndex == 0 || lotteryIndex == 2 ) {
                  modal = show( template(tpl_card_libao)(data) );
                  target.find('.info').html(' ').append('<h3>' + ticketName + '</h3>');
                }

                _this.turnHandle(target,100);

                break;
              default:
                break;
            }
          }
      });
    });
  },

  /**
   * 处理翻转
   * @return {[type]} [description]
   */
  turnHandle: function (el, time){
    el = $(el);

    el.find('.front').css({"width": 0, "display": "none"});
    el.find('.info').css({"width": 180, "display": "block"});
    // el.find('.front').stop().animate(opts[0],time,function(){
    //   el.hide().next().show();
    //   el.next().animate(opts[1],time);
    // });
  },

  DOMRender: function(){

    var tpls = this.tpls();
    var _this = this;

    ajax.get('/event/eventLottery!queryUserCardList.action', {}, function(res){
      var code = res.errorCode;

      if(code == 0) {
        $('#vertical').append(template(tpls)({"data": res.data}));
      } else {
        $('#vertical').append(template(tpls)({"data": defaultData}));
      }

      _this.changeStatus();

      var verticalOpts = [{'width':0},{'width':'180px'}];
      _this.hoverEffect($('#vertical'), 100, verticalOpts);

    });

  },

  /**
   * 如果有已经翻过的牌，进行正面展示
   * @return {[type]} [description]
   */
  changeStatus: function(){
    var eles = $('#vertical span');
    for(var i=0,len=eles.length; i<len; i++){
      var el = $(eles[i]);
      var status = el.data('status');

      if(status) {
        el.find('.front').css({"width": 0, "display": "none"});
        el.find('.info').css({"width": 180, "display": "block"});
      }
    }
  },

  tpls: function(){
    // lotteryIndex字段含义：
    // 0:心意礼包;
    // 1:兑换券;
    // 2:红包;
    // 3:"心"字;
    // 4:其它文字
    // var displayBlock = "width:180px;display:block";
    // var displayNone = "width:0;display:none";

    return '<% for (var i = 0; i < data.length; i++) { %>' +

            '<span data-position="<%= data[i].position %>" data-status="<%= data[i].status %>">' +
              '<div class="front" id="bgcolor_0<%= data[i].position %>">' +
                '<h3>0<%= data[i].position %></h3>' +
                '<p>只为成就更好的你</p>' +
              '</div>' +
              '<div class="info" >' +
                '<% if( data[i].lotteryIndex == 3 || data[i].lotteryIndex == 4 ){ %>' + 
                  '<h3 class="word"><i><%= data[i].lotteryName %></i></h3>' +
                '<% } else { %>' +
                  '<h3><%= data[i].lotteryName %></h3>' +
                '<% } %>' +
              '</div>' +
            '</span>' +
          '<% } %>';
  }

};

module.exports = card;


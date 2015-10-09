define([
  'jquery', 
  'text!components/card/card.html', 
  'css!components/card/card.css',
  'ajax',
  'template',
  'modal',
  'tpl_card_login',
  'tpl_card_verify',
  'tpl_card_tips',
  'tpl_card_gift',
  'tpl_card_libao',
  'tpl_card_word'
], function ($, tpl, css, ajax, template, Modal, tpl_card_login, tpl_card_verify, tpl_card_tips, tpl_card_gift, tpl_card_libao, tpl_card_word){

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
  }

  // 初始化默认数据
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
        var cardStatus = $(this).data('status');

        // 如果卡牌被翻过就弹框提示
        // 如果卡牌第一次翻，前端记录下翻过的状态
        if( cardStatus ) {
          modal = show( template(tpl_card_tips)({"tips": "这张卡牌已被您翻过<br>去翻其他的卡牌吧"}) );
          return;
        }else {
          $(this).data('status', 'true');
        }
      
        ajax.get('/five_annual/lottery_card.json', {"version": "", "position": position}, function(res){
            var data = res.data;
            var code = res.status;
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
              modal = show( template(tpl_card_verify)() );
            }
            // 请求成功，继续判断活动情况
            else if(code == 0) {
              // lotteryResult字段含义：
              // 1:投资额不足; 2:未中奖; 3:中奖; 4:今天抽过奖;
              // 5:已经中过奖; 6.可以抽奖; 7:抽奖时间已过期; 8:未到抽奖时间
              switch(lotteryResult) {
                case 8:
                  modal = show( template(tpl_card_tips)({"tips": "未到抽奖时间<br>感谢您的关注"}) );
                  break;
                case 7:
                  modal = show( template(tpl_card_tips)({"tips": "抽奖时间已过期<br>感谢您的关注"}) );
                  break;
                case 6:
                  modal = show( template(tpl_card_tips)({"tips": "可以抽奖"}) );
                  break;
                case 5:
                  modal = show( template(tpl_card_tips)({"tips": "您已经中过奖<br>感谢您的关注"}) );
                  break;
                case 4:
                  modal = show( template(tpl_card_tips)({"tips": "您今天牌翻的次数已用尽!<br>明天再来试试"}) );
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
                case 2:
                  modal = show( template(tpl_card_tips)({"tips": "您与奖品擦肩而过<br>明天再来吧"}) );
                  break;
                case 1:
                  modal = show( template(tpl_card_tips)({"tips": "您的投资额不足<br>快去投资参加我们的活动吧"}) );
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
      el.find('.info').css({"width": 96, "display": "block"});

    },

    DOMRender: function(){

      var tpls = this.tpls();
      var _this = this;

      // 模板异步插入
      $('#sec_02').append(tpl);

      // ajax.get('/five_annual/lottery_today_info', {}, function(res){
      ajax.get('/five_annual/lottery_today_info.json', {}, function(res){
        var code = res.status;

        if(code == 0) {
          $('#vertical').append(template(tpls)({"data": res.data.info_list}));
        } else {
          $('#vertical').append(template(tpls)({"data": defaultData}));
        }

        _this.changeStatus();

        var verticalOpts = [{'width':0},{'width':'0.96rem'}];
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
          el.find('.info').css({"width": "0.96rem", "display": "inline-block"});
        }
      }
    },

    tpls: function(){
      // lotteryIndex字段含义：
      // 0:心意礼包; 1:兑换券; 2:红包; 3:"心"字; 4:其它文字
      return '<% for (var i = 0; i < data.length; i++) { %>' +
              '<div class="<%= data[i].position < 3 ? "top_wrap" : "bottom_wrap" %>">' +
                '<span data-position="<%= data[i].position %>" data-status="<%= data[i].status %>">' +
                  '<div class="front" id="bgcolor_0<%= data[i].position %>">' +
                    '<h3>0<%= data[i].position %></h3>' +
                    '<p>成就更好的你</p>' +
                  '</div>' +
                  '<div class="info" >' +
                    '<% if( data[i].lotteryIndex == 3 || data[i].lotteryIndex == 4 ){ %>' + 
                      '<h3 class="word"><i><%= data[i].lotteryName %></i></h3>' +
                    '<% } else { %>' +
                      '<h3><%= data[i].lotteryName %></h3>' +
                    '<% } %>' +
                  '</div>' +
                '</span>' +
              '</div>' + 
              '<% if(data[i].position == 2) { %>' +
                '<br style="clear:both;">' + 
              '<% } %>' +
            '<% } %>';
    }

  };

  card.init();
  
});
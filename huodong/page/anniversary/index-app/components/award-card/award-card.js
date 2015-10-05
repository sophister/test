define([
  'jquery', 
  'text!components/award-card/award-card.html', 
  'css!components/award-card/award-card.css',
  'ajax',
  'template',
  'modal',
  // 'font_scroll',
  'tpl_card_login',
  'tpl_card_verify',
  'tpl_card_tips',
  'tpl_check_list'
], function ($, tpl, css, ajax, template, Modal, tpl_card_login, tpl_card_verify, tpl_card_tips, tpl_check_list){

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

  var awardBox = {

    init: function(){
      this.DOMRender();
      this.eventHandle();
    },

    DOMRender: function(){
      // 模板异步插入
      $('#sec_04').append(tpl);

      var tpls = this.getTemplate();
      var _this = this;

      // ajax.get('/event/eventLottery!queryPrizeList.action', { "type": "card"}, function(res){
      ajax.get('/event/eventLottery/queryPrizeList.json', { "type": "card"}, function(res){
        $('.award_card_list').append(template(tpls)({"data": res.data}));
        // 中奖数量超过6条轮播
        var acount = res.data.length || 0;
        if( acount > 6 ) 
          $('#FontScroll').FontScroll({time: 2000});

      });
    },

    eventHandle: function(){
      // 查看我的奖品
      $('#goAward').on('click', function( e ){

        // ajax.get('/event/eventLottery!queryUserCardPrize.action', {}, function(res){
        ajax.get('/event/eventLottery/queryUserCardPrize.json', {}, function(res){
          // 未登录 未验证 暂时没有奖品 有奖品
          var status = res.errorCode;
          switch (status) {
            // 未登录
            case 9999:
              modal = show( template(tpl_card_login)() );
              break;
            // 未认证
            case 3000:
              modal = show( template(tpl_card_verify)() );
              break;
            // 无记录，没有奖品（如果接口变，王程修改这里）
            case 1002:
              modal = show( template(tpl_card_tips)({"tips": "暂无奖品<br>快来投资参加我们的活动吧"}) );
              break;
            // 有奖品
            case 0:
              modal = show( template(tpl_check_list)({"data": res.data}) );
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
    },

    getTemplate: function(){
      return '<% for (var i = 0; i < data.length; i++) { %>' +
             '<li><span><%= data[i].nickName %></span><i><%= data[i].lotteryName %></span></i></li>' +
          '<% } %>';
    }
  };

  awardBox.init();
  
});
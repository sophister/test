define([
  'jquery', 
  'text!components/award-card/award-card.html', 
  'css!components/award-card/award-card.css',
  'ajax',
  'template',
  'modal',
  'font_scroll'
], function ($, tpl, css, ajax, template, modal){
  
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
      
    },

    getTemplate: function(){
      return '<% for (var i = 0; i < data.length; i++) { %>' +
             '<li><span><%= data[i].nickName %></span><i><%= data[i].lotteryName %></span></i></li>' +
          '<% } %>';
    }
  };

  awardBox.init();
  
});
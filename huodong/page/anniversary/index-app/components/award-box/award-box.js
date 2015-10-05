define([
  'jquery', 
  'text!components/award-box/award-box.html', 
  'css!components/award-box/award-box.css',
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
      $('#sec_07').append(tpl);

      var tpls = this.getTemplate();
      var _this = this;

      // ajax.get('/event/eventLottery!queryPrizeList.action', { "type": "box"}, function(res){
      ajax.get('/event/eventLottery/queryPrizeList.json', { "type": "box"}, function(res){

        $('.award_box_list').append(template(tpls)({"data": res.data}));
        
        var acount = res.data.length || 0;
        if( acount > 5 ) 
          $('#boxScroll').FontScroll({time: 2000});

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
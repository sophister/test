define([
  'jquery', 
  'text!components/rank/rank.html', 
  'css!components/rank/rank.css',
  'ajax',
  'template'
], function ($, tpl, css, ajax, template){
  
  var rank = {

    init: function(){
      this.DOMRender();
      this.eventHandle();
    },

    DOMRender: function(){
      // 模板异步插入
      $('.rank_info').append(tpl);
    },

    eventHandle: function(){
      var $myrank = $('#myrank');
      var $rank_list = $('#rank_list');
      var tpls = this.getTemplate();

      // ajax.get('/event/eventLottery!rank.action', {}, function(res){
      ajax.get('/event/eventLottery/rank.json', {}, function(res){
        
        var data = res.data;

        var myrank = data.myrank;
        var rankList = data.rankList;

        $myrank.html(myrank);
        $rank_list.append(template( tpls)({"data": rankList}) );
        
      });
    },

    getTemplate: function(){
      return '<% for (var i = 0; i < data.length; i++) { %>' +
          '<li>' + 
            '<span class="rank_<%= data[i].rank < 10 ? "0" + data[i].rank : data[i].rank %>">NO.<%= data[i].rank %></span>' + 
            '<i><%= data[i].nickName %></i>' + 
            '<strong><%= data[i].amount %>元</strong>' + 
          '</li>' +
        '<% } %>';
    }
  };

  rank.init();
  
});
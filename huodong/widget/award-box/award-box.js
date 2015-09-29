var $ = require('jquery');
var template = require('huodong:widget/ui/template/template.js');
var ajax = require('huodong:widget/ui/ajax/ajax.js');
var FontScroll = require('huodong:widget/ui/font_scroll/font_scroll.js');

var award = {
  init: function(){
    this.DOMRender();
  },
  tpls: function(){
    return '<% for (var i = 0; i < data.length; i++) { %>' +
             '<li><span><%= data[i].nickName %></span><i><%= data[i].lotteryName %></span></i></li>' +
          '<% } %>';
  },
  DOMRender: function(){
    var tpls = this.tpls();
    var _this = this;

    ajax.get('/event/eventLottery!queryPrizeList.action', { "type": "box"}, function(res){

      $('.award_box_list').append(template(tpls)({"data": res.data}));
      _this.eventHandle();

    });
  },
  eventHandle: function(){
    $('#boxScroll').FontScroll({time: 2000});
  }
};

module.exports = award;

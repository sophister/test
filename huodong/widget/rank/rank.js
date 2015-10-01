var $ = require('jquery');
var template = require('huodong:widget/ui/template/template.js');
var ajax = require('huodong:widget/ui/ajax/ajax.js');

var tpls = '<% for (var i = 0; i < data.length; i++) { %>' +
  '<li>' + 
    '<span class="rank_<%= data[i].rank < 10 ? "0" + data[i].rank : data[i].rank %>">NO.<%= data[i].rank %></span>' + 
    '<i><%= data[i].nickName %></i>' + 
    '<strong><%= data[i].amount %>元</strong>' + 
  '</li>' +
'<% } %>';

var $myrank = $('#myrank');
var $left = $('#left');
var $right = $('#right');

ajax.get('/event/eventLottery!rank.action', {}, function(res){
  
  var data = res.data;

  var myrank = data.myrank;
  var rankList = data.rankList;

  $myrank.html(myrank);
  var len = rankList.length;

  if(len > 5) {
    var leftData = [];
    var rightData = [];

    for (var i = 0; i < 5; i++) {
      var tmp = rankList[i];
      leftData.push(tmp);
    };

    for (var j = 5; j < len; j++) {
      var tmpR = rankList[j];
      rightData.push(tmpR);
    };
    
    $left.append(template( tpls)({"data": leftData}) );
    $right.append(template( tpls)({"data": rightData}) );
  } else {
    $left.append(template( tpls)({"data": rankList}) );
  }
  
});


var template = require('huodong:widget/ui/template/template.js');
var ajax = require('huodong:widget/ui/ajax/ajax.js');

var tpls = '<% for (var i = 0; i < data.length; i++) { %>' +
  '<li>' + 
    '<span class="rank_0<%= data[i].rank %>">NO.<%= data[i].rank %></span>' + 
    '<i><%= data[i].nickName %></i>' + 
    '<strong><%= data[i].amount %>元</strong>' + 
  '</li>'
'<% } %>';

var $myrank = $('#myrank');
var $left = $('#left');
var $right = $('#right');

ajax.get('/event/eventLottery', {}, function(res){
  console.log(res);

  // if( res && res.resultMap.errorCode == 0) {
  //   var data = res.resultMap.data;
  //   var myrank = data.myrank;
  //   var rankList = data.rankList;

  //   $myrank.text(myrank);
  //   var len = rankList.length;

  //   if(len > 5) {
  //     var leftData = [];

  //     for (var i = 0; i < 5; i++) {
  //       leftData.push(rankList.splice(i, 1));
  //     };

  //     $left.append(template( tpls)({"data": leftData}) );
  //     $right.append(template( tpls)({"data": rankList}) );
  //   } else {
  //     $left.append(template( tpls)({"data": rankList}) );
  //   }
  // }
});


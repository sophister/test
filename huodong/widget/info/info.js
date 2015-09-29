/**
 * 活动说明可折叠
 * @type {[type]}
 */
var $ = require('jquery');

$(document).ready(function(){
  $('.widget-info').on('click', '.huodong_info', function (e){
    var el = $(e.target).siblings();
    $(el).toggle(500);
  });

});

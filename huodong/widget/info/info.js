/**
 * 活动说明可折叠
 * @type {[type]}
 */
var $ = require('jquery');

$(document).ready(function(){
    $('.huodong_info').click(function( e ){
        $('.rules').toggle(500);
    });
});

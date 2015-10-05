/**
 * [exports description]
 * @type {Object}
 */
define(function(require, exports, module){
  var $ = require('jquery');

  module.exports = {
    post: function( url, data, fn ){
      $.ajax({
        url : url,
        data : data,
        type : 'POST',
        success: function ( res ){
          var data = {};
          
          try{
            fn(res);
          }catch(e){
            console.log('系统错误suc: ' + e.message);
          }
        },
        // TODO Handle callback
        error : function ( data ){
          console.log('系统错误err');
        }
      });
    },
    get: function( url, data, fn ){
      $.ajax({
        url : url,
        data : data,
        type : 'GET',
        success: function ( res ){
          var data = {};
          
          try{
            fn(res);
          }catch(e){
            console.log('系统错误suc');
          }
        },
        error : function ( data ){
          console.log('系统错误err');
        }
      });
    }
  };
});

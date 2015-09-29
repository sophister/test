/**
 * [exports description]
 * @type {Object}
 */
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
          console.log('系统错误: ' + e.message);
        }
      },
      // TODO Handle callback
      error : function ( data ){
        console.log('系统错误');
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
          console.log('系统错误');
        }
      },
      error : function ( data ){
        console.log('系统错误');
      }
    });
  }
};
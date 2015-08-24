define(function (require) {

  var $ = require('jquery');

  opt = {
    monthList : $('.ui-list-month ul'),
    monthBt : $('.ui-list-month p')
  };


  opt.monthBt.on('click',function(e){
    opt.monthList.toggle();
    e.stopPropagation();
  });

  $('body').on('click',function(){
    opt.monthList.hide();
  });

});

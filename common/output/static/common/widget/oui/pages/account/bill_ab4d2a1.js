define('common:widget/oui/pages/account/bill', ['require', 'common:widget/oui/lib/jquery/1.9.1/jquery'],function (require) {

  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery');

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

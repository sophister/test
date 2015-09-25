define('common:widget/oui/pages/borrow/preview', ['require', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/protocol', 'common:widget/oui/arale/dialog/1.3.3/dialog'],function (require) { 

var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery'),
    Protocol = require('common:widget/oui/protocol'),
    Dialog = require('common:widget/oui/arale/dialog/1.3.3/dialog');

new Dialog({
  trigger: '.auth',
  width: '600px',
  align: {
    baseXY: ['50%', 0],
    selfXY: ['50%', 0]
  },
  hasMask: {
    hideOnClick: false
  }
}).before('show',function () {
    //$savebt.trigger("click");
    index = this.activeTrigger.parents(".listinfo ").index();
    this.set('content', "/upload/uploadMaterial!uploadPage.action?" + this.activeTrigger.attr('href') + "&tab=" + index);
  }).after('hide', function () {
    //location.href = "/borrow/borrow.action?tab=" + index;
  });

var txt = document.getElementById("J_marrige_status").innerHTML.replace(/(^\s*)|(\s*$)/g, "");
document.getElementById("J_marrige_id").innerHTML = "<span>婚姻状况</span>"+txt;

function calcMonthPay(){
  var amount=$('#J_loan-Amount').data('val');
  var month=$('#J_loan-Month').data('val');
  var rate=$('#J_loan-Rate').data('val');
  var val = amount*100;
  val = parseInt(Math.round(val/month + val*rate/100), 10)/100;
  val = val.toFixed(2);
  $('#J_loan-month-Pay').text(['￥',val].join(''));
}

//所有为空的 --
$('td').each(function(key,val){

  if($(val).find('span').length!==0 && $(val).find('span').text() !==''){
    var str = $(val).html();
    if(str[str.length-1] == ">" && str[str.length-2] == "n"){
      $(val).html($(val).html() +"--");
    }
  }
});

calcMonthPay();
});
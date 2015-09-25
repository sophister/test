
  var $ = require('jquery');
  var Tip = require('tip');
  var Common = require('common');
  var Protocol = require('protocol');
  var Widgets = require('widgets');
  var Components = require('components');
  var Dialog = require('dialog');
  var Handlebars = require('handlebars');
  var GoTop = Widgets.GoTop();
  
  
  var uplanMain ={
  	initTab:function(){
	      new Widgets.Tab({
	        name: 'uplanMainn',
	        switched: function (from, to, initialized) {
	          if (initialized) {
	            return true;
	          }
	          if (to == 'joined') {
	            joined = initializeRecords('joined', Protocol.API.getAutoinvestJoinedRecords, { autoInvestPlanId: autoinvestId });
	          }
	          return true;
	        },
	        clicked: function (to, initialized) {
	          if (!clickTimer) {
	            if (to == 'joined' && initialized && joined) {
	              joined._update(joined.getParams());
	            }
	          }
	          clickTimer = window.setTimeout(function () {
	            window.clearTimeout(clickTimer);
	            clickTimer = null;
	          }, 750);
	        }
	      }).init();
  	}
  	
  }


    var initializeRecords = function (name, api, params) {
      var list = new Widgets.List({
        name: name,
        api: api,
        title: true,
        params: params,
        container: $('#' + name + '-records'),
        rendered: function (rsp) {
          var status = rsp.status, data = rsp.data, t = Protocol.translator;
          if (status === 0 && api == Protocol.API.getAutoinvestJoinedRecords) {
            $('#joined-count').text(data.jsonList.length);
            var hadpay = 0;
            $.each(data.jsonList, function(k, v) {
              hadpay += Number(v.amount.replace(/,/g,"") ) ;
              });
            var payAmo = Math.round(hadpay*100/data.jsonList.length)/100;
            if(data.jsonList.length==0){
              payAmo = 0;
            }
            
            $("#reserve-had-pay-amount").html(payAmo);
          }
        }
      }).init();
      list._update(list.getParams());
      return list;
    };
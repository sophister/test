var  transactionlist = require("user:widget/transactionlist/transactionlist.js");

function init(){
	inityear();
	transactionlist.listinit();
	initevent();
	initexports();
}

function inityear(){
	var currYear = parseInt($('#pg-helper-year').text(), 10) - 7;
	for (i = 6; i >0; i --) {
		currYear ++;
    	if(i == 1){
    		$(".year").prepend($('<div class="time-opt" style="margin-left:81px" value="' + currYear + '">'+currYear+'年</div>'));		
    	}else{
    		$(".year").prepend($('<div class="time-opt" value="' + currYear + '">'+currYear+'年</div>'));
    	}
  	}
}
function initevent(){
	//opt 切换
	$(".time-opt").on("click",function(e){
		var el = e.currentTarget;
		$(".time-opt.selected").toggleClass("selected");
		$(el).toggleClass("selected");
		querycondition.query_submit();
	})
	$(".ty-opt.sin").on("click",function(e){
		var el = e.currentTarget;
		$(".ty-opt.selected").toggleClass("selected");
		$(el).toggleClass("selected");
		querycondition.query_submit();
	});
	$(".ty-opt li").on("click",function(e){
		var el = e.currentTarget;
		$(".ty-opt.selected").toggleClass("selected");
		$(el).closest(".ty-opt").toggleClass("selected");
		changeselect($(el));
		querycondition.query_submit();
	})
	$(".transrecord .more").on("click",function(){
		$(".year").show();
		$(".transrecord .more").hide();
	});
	$(".transrecord .less").on("click",function(){
		$(".year").hide();
		$(".transrecord .more").show();
	})
}

function changeselect($el){
	var value = $el.attr("data-v");
	$el.closest(".ty-opt").attr("value",value);
	$(".selectshow li.selected").removeClass("selected");
	$el.addClass("selected");	
}

function initexports(){
  	$('#export').attr('href', lastcondition.url + '?' + lastcondition.latestParams);
}

var querycondition ={
	getParams:function(){
		var params = {
	      type: $(".ty-opt.selected").attr("value")
	    };
	    if ($(".year .selected").length>0) {
	      params.year = $(".time-opt.selected").attr("value");
	      params.startMonth = 1;
	      params.endMonth = 12;	      
	    }
	    else {
	      params.time = $(".time-opt.selected").attr("value");
	    }
	    return params;
	},
	query_submit:function(){
		var params = this.getParams(),
	        paramsEncoded = $.param(params);
	    if (lastcondition.latestParams == paramsEncoded && lastcondition.latestStatus === 0) {
	      return;
	    }
	    transactionlist.list._params = params;
	    transactionlist.list._update(params, function(status, message, data) {
	      lastcondition.latestStatus = status;
	      lastcondition.latestParams = paramsEncoded;
	      
	      if (status === 0) {
	      	initexports();
	        $('#export').removeClass('disabled');
	      }
	      else {
	        $('#export').removeAttr('href');
	        $('#export').addClass('disabled');
	      }
	    });
	}
}

var lastcondition = {
	latestStatus:transactionlist.liststatus,
	latestParams:$.param(querycondition.getParams()),
	url:$('#export').attr('href')
}

var transaction = {
	init : init,
}

module.exports = transaction;
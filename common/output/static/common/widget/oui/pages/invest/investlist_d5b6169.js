define('common:widget/oui/pages/invest/investlist', ['require', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/arale/dialog/1.3.3/dialog'],function (require) {

  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery');
  var Dialog = require('common:widget/oui/arale/dialog/1.3.3/dialog');
  
  var getQryStrRegExp = function(testsrc,reg) {  
        if (reg.test(testsrc)) {
            return unescape(RegExp.$2.replace(/\+/g, " "))
        } else {
            return null
        }
   };
   var setCookie = function (c_name, value, expiredays) {
	     var exdate = new Date();
	     exdate.setDate(exdate.getDate() + expiredays);
	     document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString() + ";path=/")
   };
   
   var gettested = function(){
	   var reg = new RegExp("(^|\\s|;)tested=([^;]*)(\\s|;|$)", "i");
	   var test = getQryStrRegExp(document.cookie,reg);
	   return test;
   };
   var settested = function(result){
	   setCookie("tested", result, 365);
   };
   
   var showRetSwtichTab = function(e){
	    //ui-tab-item-current
	    var cls = 'ui-tab-item-current',
	      li = $('#calcu-tab li'),
	      tabs = $('#J_tab_uplan,#J_tab_loan,#J_tab_fixed'),
	      selector_uplan = '#calcResult_u',
	      selector_fixed = '#calcResult_fixed',
	      selector_loan = '#calcResult,#J_calculator-article',
	      selector_all = [selector_uplan, selector_fixed, selector_loan].join(','),
	      dom, target;
	    var hide = function(el){
	      $(el).css('display', 'none');
	    },show = function(el){
	      $(el).css('display', 'block');
	    };
	    dom = li.filter('.'+cls);
	    // click trigger
	    if (e){
	      dom =$(e.currentTarget);
	    }
	    li.removeClass(cls);
	    dom.addClass(cls);
	    target = dom.attr('data-name');

	    //hide all
	    hide( tabs );
	    //show current
	    show( '#'+target );

	    //hide result
	    hide( selector_all );
	    
	    $(".ui-tab-items [data-name='"+target+"']").addClass(cls);

	    if( 'J_tab_uplan' == target){
	      show( selector_uplan );
	    }
	    if( 'J_tab_loan' == target){
	      show( selector_loan );
	    }
	    if( 'J_tab_fixed' == target){
	      show( selector_fixed );
	    }
	  };
  
//	  var results = {
//			   "A":{ "name":"U计划-A",
//				   "text":"U计划-A是一款3个月投资期限的理财产品，1000元起投，符合您现阶段“小有盈余”的资金状态，同时达到您短期理财的个人预期。加入U计划-A，实现财富快速增值！",
//				   "button":"去加入",
//				   "href":"financeplan/listPlan!detailPlan.action?financePlanId=297",
//				   "cl":"u"
//			   }
//	   };
   var urlA= $("span.A").text(),urlB= $("span.B").text(),urlC= $("span.C").text();
   var results = {
		   A:{ name:"U计划-A",
			   text:"U计划-A是一款3个月投资期限的理财产品，1000元起投，符合您现阶段“小有盈余”的资金状态，同时达到您短期理财的个人预期。加入U计划-A，实现财富快速增值！",
			   button:"去加入",
			   href:"/financeplan/listPlan!detailPlan.action?financePlanId="+urlA,
			   cl:"u"
		   },
		   B:{ name:"U计划-B",
			   text:"U计划-B是一款6个月投资期限的理财产品，10000元起投，将充裕资金最大化运转实现资金高效增值，同时契合您理财规划的时间范围。加入U计划-B，半年就有好收益！",
			   button:"去加入"	 ,
			   href:"/financeplan/listPlan!detailPlan.action?financePlanId="+urlB,
			   cl:"u"
		   },
		   C:{ name:"U计划-C",
			   text:"U计划-C是一款12个月投资期限的理财产品，10000元起投，在满足您长期投资需求的同时，带来稳定高额收益。加入U计划-C，您财富增值的快车道！",
			   button:"去加入"	,
			   href:"/financeplan/listPlan!detailPlan.action?financePlanId="+urlC,
			   cl:"u"
		   },   
		   X:{ name:"薪计划",
			   text:"薪计划是一款12个月投资期限的定投产品，500元起投，每月固定日期加入固定金额，符合您现在每月有所盈余的资金状态。每月攒小钱，年底变大钱，薪计划帮您快速攒钱，助您实现每个心愿！",
			   button:"去加入"	,
			   href:"/autoinvestplan/listPlan!detailPlan.action",
			   cl:"x"
		   }, 
		   S:{ name:"散标",
			   text:"散标是将资金出借给真实的借款需求以获取利息回报，50元起投，灵活便捷，更契合还在积累初始资产阶段的您，同时满足您对对资金流动性的诉求。投资散标，加速财富原始积累！",
			   button:"去投资"	,
			   href:"/lend/loanList.action",
			   cl:"s"
		   }
   };
     var result;
   var showresult = function(){
	   var num = $("#test-02 input:checked").closest("p").index() + $("#test-03 input:checked").closest("p").index(),
	   first = $("#test-01 input:checked").closest("p").index();
	   switch(first){
	      case 1:
	    	  	result = num>2?"A":"S"
	    	  	break;
	      case 2:
		      	result = num>=4?"B":"A"
		      	break;
	      case 3:
		      	result = num>=4?"C":"X"
		      	break;
	      default:
	    	  break;
	   }	
	   
	   if(results[result]){
		   var name = results[result].name,text = results[result].text, button=results[result].button,href=results[result].href,cl=results[result].cl;
		   $("#testresult .title").text(name);
		   $("#testresult .text p").text(text);
		   $("#testresult a.ui-button-blue").text(button);
		   $("#testresult a.ui-button-blue").attr("href",href);	
		   $("#testresult a.ui-button-blue").attr("t",cl);		   
		   
		   $(".tested .test-left span").text(name);
		   $(".tested .test-right p").html(text + "<a t='"+cl+"' href='"+ href + "'>"+button+" ></a>");
		   $(".tested").removeClass("hide");
		   $(".untest").addClass("hide");
		   settested(result);
	   }else{
		   resultdialog.hide();
	   }
	   
   }
   
   var setmiaodian =function(e){
	   var el = e.currentTarget, m = $(el).attr("t");
	   switch (m){
	   		case "u":
	   			$.get("../html/blank/blank.html?tag=000002",function(){});
	   			break;
	   		case "x":
	   			$.get("../html/blank/blank.html?tag=000001",function(){});
	   			break;
	   		case "s":
	   			$.get("../html/blank/blank.html?tag=000003",function(){});
	   			break;
	   		case "z":
	   			$.get("../html/blank/blank.html?tag=000004",function(){});
	   			break;
	   		default:
	   			break;
	   
	   }
   }

   $(function () {	  
	  //show test tip
	  var  result = gettested();
	  if(result && results[result]){
		  var name = results[result].name,text = results[result].text, button=results[result].button,href=results[result].href,cl=results[result].cl;
		  
		  $(".tested .test-left span").text(name);
		  $(".tested .test-right p").html(text + "<a t='"+cl+"' href='"+ href + "'>"+button+" ></a>");
		  $(".tested").removeClass("hide");
		  $(".untest").addClass("hide");
	  }else{
		  $(".untest").removeClass("hide");
		  $(".tested").addClass("hide");
	  }
	  
	  $(".procategories-list a[data-name]").on('click',showRetSwtichTab);
	 
	  //maidian
	  $(".untest .test-left a").on("click",function(){
		  $.get("../html/blank/blank.html?tag=000005",function(){});
	  });
	  $(".tested .test-left a").on("click",function(){
		  $.get("../html/blank/blank.html?tag=000006",function(){});
	  });	  
	  $(".tested .test-right p a").on("click",setmiaodian);
	  $("#testresult a").on("click",setmiaodian);
	  $(".products-link .review-button a").on("click",setmiaodian);
	  var test1 = new Dialog({
	      trigger: '.test-left a',
	      content: $('#test-01'),
	      width: '580px'
	  });
	  
	  var test2 = new Dialog({
	      content: $('#test-02'),
	      width: '580px'
	  });
	  
	  var test3 = new Dialog({
	      content: $('#test-03'),
	      width: '580px'
	  });
	  
	  var resultdialog = new Dialog({
	      content: $('#testresult'),
	      width: '580px'
	  });
	  
	  $("#test-01 a").on("click",function(){
		  test1.hide();
		  test2.show();
	  })
	  
	  $("#test-02 a.w7").on("click",function(){
		  test2.hide();
		  test1.show();	  
	  })
	  
	  $("#test-02 .ui-button-blue").on("click",function(){
		  test2.hide();
		  test3.show();
	  })
	  
	  $("#test-03 a.w7").on("click",function(){
		  test3.hide();
		  test2.show();
	  })
	  
	  $("#test-03 .ui-button-blue").on("click",function(){
		  test3.hide();
		  resultdialog.show();

		  showresult();
	  })
	  
	  
	  
   });
   


});
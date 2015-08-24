define(function (require) {

  var $ = require('jquery');
  var Common = require('common');
  var Protocol = require('protocol');
  var Widgets = require('widgets/widgets');
  var Dialog = require('dialog');
  //require('flash');


  //首页不能嵌在子页面中，如第三方注册后要跳出来
  if (window.parent != window) {
      var parentUrl = getParentUrl();
      if(parentUrl.indexOf('tongji.baidu.com')==-1){
        window.top.location.href = location.href;
      }
  }
  //若果首页被嵌套 获取 父级url
  function getParentUrl(){
    var url = "";  
    try {  
        url = window.top.document.referrer;
    } catch(M) {  
        if (window.parent) {  
            try {  
                url = window.parent.document.referrer;
            } catch(L) {  
                url = "";
            }  
        }  
    }  
    if (url === "") {  
        url = document.referrer;
    }  
    return url;
  }
  
  $(function () {
    var $plan = $('#plan-status-open');
    new Widgets.Slider();

    if ($("#openweixin").length && $("#weixin").length) {
      new Dialog({
        trigger: '#openweixin',
        width: '350px',
        content: $('#weixin')
      });
    }

    if($plan.is(":visible")){
      $(".ui-plan-latest ").on("mouseenter",function(){
        $plan.find(".plan-progress").hide();
        $plan.find("a").show();
      }).on("mouseleave",function(){
          $plan.find(".plan-progress").show();
          $plan.find("a").hide();
        });
    }

    
  });

  if ($('#notice-title').length > 0) {
    $('#notice-title').click(function (e) {
      var $noticeContent = $('#notice-content');
      if ($noticeContent.is(':visible')) {
        $(this).removeClass('rrdcolor-blue-text');
        $noticeContent.slideUp(200);
      }
      else {
        $(this).addClass('rrdcolor-blue-text');
        $noticeContent.slideDown(200);
      }
      e.preventDefault();
    });
  }

  new Widgets.List({
    name: 'loan-list',
    api: Protocol.API.getLoans,
    header: true,
    more: true,
    rendered: function () {
      this.container.find('.ui-list-item.last').removeClass('last');
      this.container.find('.ui-list-title')
      .removeClass('ui-list-title-sortable')
      .removeClass("ui-list-title-sortable-1")
      .removeClass("ui-list-title-sortable-2")
      .removeClass("ui-list-title-sortable-3")
      .removeClass("ui-list-title-sortable-4");
      this.container.find('.ui-list-title').attr("next","-1");
      this.container.find('.ui-list-title').children('em').remove();
      this.container.find('.ui-list-title-refresh').text("").removeClass("ui-list-title-refresh");
    }
  }).init(Common.loadJSON('#loan-list-rsp', true));

/*  new Widgets.List({
    name: 'news-list',
    api: Protocol.API.getNews,
    more: true,
    rendered: function () {
      this.container.find('.ui-list-item.last').removeClass('last');
    }
  }).init(Common.loadJSON('#news-list-rsp', true));*/

  Common.initPoptips();

  /**
   * Async Slider
   * @param slidesNavType: 0 点效果; 1 box效果; 其它值 自定义效果;
   */
  /*$('#slides').asyncSlider({
    slidesNav: $('#slider_nav'),
    prevNextNav: false,
    slidesNavType: '0',
    autoswitch: 3000
  });*/


  function formatSeconds(value,el,sta,type) {
   var theTime = parseInt(value,10);// 秒
   var theTime1 = 0;// 分
   var theTime2 = 0;// 小时
   var theTime3 = 0;// 天

   if(theTime > 60) {
   theTime1 = parseInt(theTime/60,0);
   theTime = parseInt(theTime%60,0);
   if(theTime1 > 60) {
   theTime2 = parseInt(theTime1/60,0);
   theTime1 = parseInt(theTime1%60,0);
   }
   if(theTime2 > 24) {
    theTime3 = parseInt(theTime2/24,0);
    theTime2 = parseInt(theTime2%24,0);
  }
   }
   var result;

   if(theTime3 > 0) {
    result = parseInt(theTime3,0)+"天"+parseInt(theTime2,0)+"时";
   }else if(theTime2 > 0){
    result = parseInt(theTime2,0)+"时"+parseInt(theTime1,0)+"分";
   }else{
    result = parseInt(theTime1,0)+"分"+parseInt(theTime,0)+"秒";
   }

   if(sta === 0){
    if(type=="XJH"){
      result = result+"后加入";
    }else{
      result = result+"后预定";
    }
   }
   if(sta === 3){
    result = result+"后加入";
   }

   $(el).html(result);
   }


  function ticksownTime(id){
    var el = $(id),
      status = parseInt(el.data("status"), 10),
      totaltime = (el.data("wait") - 0) || 0,
      type = el.data("type"),
      timeid;
    var fn = function(){
      totaltime = totaltime - 1;
      formatSeconds(totaltime, id, status,type);
      if(totaltime<=0){
        clearInterval(timeid);
        location.reload();
      }
    };
    //console.log('status:',status,'totaltime:',totaltime);
    if(el.length <=0 || status === -1 || totaltime<= 0 || (status !== 3 && status !== 0)){
     return false;
    }
    timeid = setInterval(fn, 1000);
    fn.call(this);
  }
  var bindCount = function(){ 
	  $(".register-box-inner .btn-a, .intro-link").on("click",setmiaodian);
	  $(".index-fixed-item a").on("click",function(){
		  setblank("000025");
	  });
	  $(".plan-item-a .btn-link").on("click",function(){
		  setblank("000026");
	  });
	  $(".plan-item-b .btn-link").on("click",function(){
		  setblank("000027");
	  });
	  $(".plan-item-c .btn-link").on("click",function(){
		  setblank("000028");
	  });
  }
  var setmiaodian =function(e){
	   var el = e.currentTarget, m = $(el).attr("href");
	   var tag;
	   switch (m){
	   		case "/regPage.action?registerSource=web_banner":
	   			tag = "000020";
	   			setblank(tag);
	   			break;
	   		case "/account/index.action":
	   			tag = "000021";
	   			setblank(tag);
	   			break;
	   		case "/guide/invest.action":
	   			tag = "000022";
	   			setblank(tag);
	   			break;
	   		case "/guide/borrow.action":
	   			tag = "000023";
	   			setblank(tag);
	   			break;
	   		case "/guide/investSecurity.action":
	   			tag = "000024";
	   			setblank(tag);
	   			break;
	   		default:
	   			break;  
	   }
 }
  var setblank = function(tag){
	  $.get("../html/blank/blank.html?tag="+tag,function(){});
  }

  ticksownTime("#J_count_time_fixed");
  ticksownTime("#J_count_time_a");
  ticksownTime("#J_count_time_b");
  ticksownTime("#J_count_time_c");
  
  //添加统计数据
  bindCount();
});

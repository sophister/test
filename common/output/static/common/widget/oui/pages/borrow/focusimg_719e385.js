define('common:widget/oui/pages/borrow/focusimg', ['require', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/arale/dialog/1.3.3/dialog'],function (require) { 

	var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery'),
	Dialog = require('common:widget/oui/arale/dialog/1.3.3/dialog');
	var tcount;
	var index=$(".thumfram").index(this);
	var first_entry = true;
	function showImg(index){
		var img = $("#focusimg-bigpic img").eq(index);
		var title = $("#focusimg-bigpic img").eq(index).attr("data").split("|");  
		//var w = $("#bigpic img").eq(index).css("width");  
		//var h = $("#bigpic img").eq(index).css("height");  
 
        // 当图片比预览区域小时不做任何改变  
       // if(w < 750 && h < 480) return;          
        // 当实际图片比例大于预览区域宽高比例时  
        // 缩放图片宽度，反之缩放图片宽度  
      //  w/h > 750/480  ? img.css("width","750") : img.css("height","480");
	img.css("width","900");
	img.stop(true,true).show().siblings().stop(true,true).hide();
	$(".J_fimg div").eq(index).addClass("focusimg-prompt").css("opacity","1").siblings().removeClass("focusimg-prompt").css("opacity","1");
	$("#focusimg-fram .title").html(title[0]+'<span style="font-size:14px;font-weight:normal;">'+title[1]+'</span>');
	}
	
	$(".J_fimg div").click(function(){
	/*这个索引变量定义很重要*/
		index=$(".thumfram").index(this);
		showImg(index);
		$("html,body").animate({scrollTop:0},0);	
	});
	
	
	$("#focusimg-btnp").click(function(){
		index--;
		if(index<0) {index=tcount-1;}
		showImg(index);
		$("html,body").animate({scrollTop:0},0);	
	});
	
	$("#focusimg-btnn").click(function(){
		if(index == -1){index=0;}
		index++;
		if(index>tcount-1){index=0;}
		showImg(index);
		$("html,body").animate({scrollTop:0},0);	
	});

	$('.card-icon').on('focus',function(e){
		this.blur();
	});

    new Dialog({
  trigger: '.card-icon',
  content: '.J_focusimg-img',
        width:'920px',
        //height:'702px',
        align: {
        baseXY: ['50%', 0],
        selfXY: ['50%', 0]
  },
      hasMask:true
    }).before('show',function() {
    $("html,body").animate({scrollTop:0},0);	
    index = this.activeTrigger.attr("data");
    tcount = $(".J_fimg div").size();
    $('.ui-mask').css('background-color','#000');
    $('.ui-mask').css('opacity','0.5');
    $('.ui-mask').css('z-index','99999');
   
    if(index-1 <0){
        index = 0;
    }else{
        index = index - 1;	
    }
   // index-1 <0 ? index = 0:index = index - 1;  
    showImg(index);
    first_entry = true;
    });
});
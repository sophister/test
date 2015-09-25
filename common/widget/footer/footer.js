var $ = require('jquery');

//返回顶部
window.onscroll=function()
{
  var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
  if(scrollTop>=100){
    $('.fixed-goTop').show();
  }else{
    $('.fixed-goTop').hide();
  }      
};

$(function(){
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	if(scrollTop>=100){
	   $('.fixed-goTop').show();
	}
})

$('.fixed-goTop').click(function(){
  upMove($(this)[0]);
});
function upMove(obj) {
    var timer=null;
    clearInterval(timer);
    var speed=0;
    var cur=0;
    timer=setInterval(function() {
        cur=document.documentElement.scrollTop||document.body.scrollTop;
        speed=Math.floor((0-cur)/8);
        if(cur==0) {
            clearInterval(timer);
        }else{
            document.documentElement.scrollTop=document.body.scrollTop=cur+speed;
        }
    },10);
}

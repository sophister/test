define('common:widget/oui/widgets/slider', ['require', 'exports', 'module', 'common:widget/oui/lib/jquery/1.9.1/jquery'],function (require, exports, module) {
  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery');
  //写的一个简单的Slider，没有追求功能，只满足了目前的需求
  var Slider = function (opt) {
    opt = $.extend({
      target: $("#slides"),
      targetNav: $('#slider_nav'),
      curIndex: 0,
      delay: 5000,
      curClass: 'active'
    }, opt);

    var $lis = opt.target.find("li");
    var len = $lis.length;
    var timer;
    var curIndex = opt.curIndex;
    var aImgSrc = [];
    var $navUl = $('<ul>').addClass('slider-nav-pointer').appendTo(opt.targetNav);

    function initSlideStyle(){
      $lis.each(function(i){
        var n = i + 1;
        var _url =  $lis.eq(i).data('background');
        _url = _url.replace(/url\(/,'').replace(/\) no-repeat 50\% 50\%/,'');
        $('<li><a href="#">' + n + '</a></li>').appendTo($navUl);
        aImgSrc.push(_url);
      }); 
      $lis.eq(curIndex).show();
      opt.target.parent().css('background','none');
      $navUl.find("li").eq(curIndex).addClass(opt.curClass);
    }
    
    function addEv(){
      $(opt.target).find('li').hover(function(){
        clearInterval(timer);
      },auto);
      $navUl.find('li').on('click',function(e){
        curIndex = $(this).index();
        addBackground(curIndex);
        $(this).addClass(opt.curClass).siblings().removeClass(opt.curClass);
        $lis.eq(curIndex).fadeIn("slow").siblings().fadeOut("slow");
        e.preventDefault();
        clearInterval(timer);
        showPic(curIndex);
        auto();
      });
    }

    function showPic(index){
      addBackground(index);
      opt.targetNav.find("li").eq(index).addClass(opt.curClass).siblings().removeClass(opt.curClass);
      $lis.eq(index).fadeIn("slow").siblings().fadeOut("slow");
    }

    function auto(index){
      timer = setInterval(function(){
        showPic(curIndex);
        curIndex++;
        if(curIndex >= $navUl.find('li').length){
          curIndex = 0;
        }
        addBackground(curIndex);
        $lis.eq(curIndex).fadeIn().siblings().fadeOut();
        $navUl.find('li').eq(curIndex).addClass(opt.curClass).siblings().removeClass(opt.curClass);
      },opt.delay);
    }
    function addBackground(index){
      var curLis = $lis.eq(index);
      if(!curLis.data("isLoadImg")){
        curLis.data("isLoadImg",true).css("background", "url("+aImgSrc[index]+") no-repeat 50% 50%");
      }
    }
    
    //图片预加载
    function loadImgOneByOne(n){
      n++;
      if(n==$lis.length+1){
        return;
      }
      var oImg=new Image();
      oImg.src=aImgSrc[n-1];
      oImg.onload=function (){
        loadImgOneByOne(n);
      };
    }
    function slideInit(){
      initSlideStyle();
      addEv();
      showPic(curIndex);
      loadImgOneByOne(0);
      addBackground(curIndex);
      auto();
    }
    slideInit();
  };  
  module.exports = Slider;

});
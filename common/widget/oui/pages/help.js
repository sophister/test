define(function(require) {

  var $ = require('jquery');

  var opt = {
    title : $('.pg-help-list-box ul>li h5'),
    snowTop : $('.pg-help-list-box .icon-snow-top')
  };

  opt.title.hover(function(){
    if( $(this).siblings().css('display') == 'none' ){
      $(this).parent('li').addClass('hover');
    }
  },function(){
    $(this).parent('li').removeClass('hover');
  }).on('click',function(){

    var $title = $(this);

    if ( $title.hasClass('active') ) {
      $title.removeClass('active');
    }else {
      $title.addClass('active');
    }

    $title.siblings().toggle();
    $title.parent().removeClass('hover');

    if( $title.siblings().css('display') == 'none' ){
      $title.parent().addClass('hover');
    }

  });

  opt.snowTop.on('click',function(){

    $(this).parents('.help-list-item').hide();

  });



  var $link = $('.pg-help-list-box a[href*=#]');
  var topBuffer =[];
  var $target;

  $link.click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      $target = $(this.hash);
      $target = $target.length && $target || $('[name=' + this.hash.slice(1) + ']');
      if ($target.length) {
        var targetOffset = $target.offset().top;
        $('html,body').animate({
            scrollTop: targetOffset
        },500);

        $target.parent().siblings().show();
        return false;
      }
    }
  });

  function arrLength(){
    var idUrl = $('.pg-help-list-box a[href*=#]');
    var newUrl,
        oldUrl;

    for(var i=0; i< idUrl.length; i++){
      oldUrl = idUrl.eq(i).attr('href');
      newUrl = oldUrl.substring(oldUrl.lastIndexOf("#"));

      if(oldUrl == newUrl){
        topBuffer.push($(newUrl).offset().top);
      }
    }
  }

  arrLength();

  $(window).scroll(function(){
      var curTop = $(this).scrollTop();
      var currentPage = getPosit(curTop, topBuffer);
  });

  function getPosit(topValue,bufferArr){
    for(var i= 0, len = bufferArr.length; i<len; i++ ){
      if(topValue < bufferArr[i]){
        if(i === 0)return 1;
        return i;
      }
    }
  }

  var anchor = window.location.hash;
  if (!$(anchor).hasClass('active')) {
    $(anchor).click();
  }

});
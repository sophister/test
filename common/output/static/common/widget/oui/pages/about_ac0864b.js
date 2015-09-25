define('common:widget/oui/pages/about', ['require', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/common', 'common:widget/oui/protocol', 'common:widget/oui/widgets/widgets'],function(require) {

  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery');
  var Common = require('common:widget/oui/common');
  var Protocol = require('common:widget/oui/protocol');
  var Widgets = require('common:widget/oui/widgets/widgets');
  
  var conf = {};
  
  if ($("#news-list").length > 0) {
    $.extend(conf, {
      name: 'news-list',
      api: Protocol.API.getNews
    });
    initList(conf);
  }
  else if ($("#notices-list").length > 0) {
    $.extend(conf, {
      name: 'notices-list',
      api: Protocol.API.getNotices
    });
    initList(conf);
  }
  else {
    var noticeType = $('#pg-helper-notice-type').text();
    if ($(".detail").length > 0) {
      if (noticeType == "NOTICE") {
        jQuery(".sub li:eq(8)").addClass("active");
      } else {
        jQuery(".sub li:eq(7)").addClass("active");
      }
    }
  }
  
  function initList(conf) {
    new Widgets.List({
      name: conf.name,
      api: conf.api,
      pagination: true
    }).init(Common.loadJSON('#' + conf.name + '-rsp'));
  }

  $('.about-list>li h5').hover(function(){
    if( $(this).siblings('.about-list-item').css('display') == 'none'){
      $(this).parent().addClass('hover');
    }
  },function(){
    $(this).parent().removeClass('hover');
  }).on('click',function(){
    $(this).siblings('.about-list-item').toggle();
    $(this).parent().removeClass('hover');
    if( $(this).siblings('.about-list-item').css('display') == 'none'){
      $(this).parent().addClass('hover');
    }
  });

  $('.about-list .icon-snow-top').on('click',function(){
    $(this).parents('.about-list-item').hide();
  });

});

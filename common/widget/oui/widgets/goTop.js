define(function (require, exports, module) {
  var $ = require('jquery');
  module.exports = function (options) {
    options = $.extend({
      elem: '.ui-goTop'
    }, {}, options);
    var $elem = $(options.elem);
    $elem.on('click',function () {
      $('body,html').animate({
        scrollTop: 0
      }, 800);
      return false;
    }).hide();
    $(window).scroll(function () {
      if ($(this).scrollTop() > 200) {
        $elem.fadeIn();
      } else {
        $elem.fadeOut();
      }
    }).resize(function () {
        resize();
      });
    resize();
    function resize() {
      var pos = ( $(window).width() - 960 ) / 2;
      if (pos > 0) {
        $elem.css('left', 960 + pos + 20 + 'px');
      }
    }
  };
});

define('common:widget/oui/components/latest-financial-plan', ['require', 'exports', 'module', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/widgets/widgets'],function(require, exports, module) {
  
  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery');
  var Widgets = require('common:widget/oui/widgets/widgets');
  
  var LatestPlan = function(conf) {
    
  };
  
  $.extend(LatestPlan.prototype, {
    init: function() {
      var $counter = $('#counter');
      if ($counter.length > 0 && $counter.is(':visible')) {
        new Widgets.Counter({
          container: $counter,
          start: $counter.data('now'),
          end: $counter.data('end'),
          daysStyle: 'big',
          minDays: 3,
          stopped: function() {
            $('#plan-status-presale').hide();
            $('#plan-status-in-progress').show();
            $('#plan-status-in-progress .plan-progress').hide();
            $('#plan-status-in-progress .ui-progressbar-circle').show();
          }
        }).init();
        
        if ($('.plan-status').hasClass('seconds')) {
          $('.ui-counter-text .suffix').text('开始预定');
        }
      }
      
      $('.ui-plan-latest').hover(function() {
        $('#plan-status-in-progress .plan-progress').hide();
        $('#plan-status-in-progress .ui-progressbar-circle').show();
      }, function() {
        $('#plan-status-in-progress .ui-progressbar-circle').hide();
        $('#plan-status-in-progress .plan-progress').show();
      });
    }
  });
  
  module.exports = LatestPlan;
  
});

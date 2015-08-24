/*
 *  @require common:widget/oui/lib/counter/0.0.1/jquery.counter-analog.css
 */

define(function(require, exports, module) {
  var $ = require("jquery");
  //require('ui-counter');
  require('counter');
  
  /**
   * Class for display the timer, based on jquery.counter
   * TODO: the view is not implemented good, need to be decoupled
   * @param delta: integar, (ms)
   * @param start: string, yyyy-MM-dd-hh-mm-ss
   * @param end: string, yyyy-MM-dd-hh-mm-ss
   */
  var Counter = function(conf) {
    $.extend(this, {
      container: conf.container,
      
      delta: conf.delta,
      start: conf.start,
      end: conf.end,
      
      minDays: conf.minDays || 1,
      daysStyle: conf.daysStyle || 'small',
      secondsStyle: conf.secondsStyle || 'small',
      
      changed: conf.changed || function() {},
      stopped: conf.stopped || function() {}
    });
  };
  
  $.extend(Counter.prototype, {
    
    _getDelta: function() {
      var delta = null;
      if (this.delta || (this.start && this.end)) {
        if (this.delta) {
          delta = this.delta;
        }
        else {
          var s = this.start.split('-');
          var e = this.end.split('-');
          sd = new Date(s[0], parseInt(s[1], 10) - 1, s[2], s[3], s[4], s[5]);
          ed = new Date(e[0], parseInt(e[1], 10) - 1, e[2], e[3], e[4], e[5]);
          delta = ed.getTime() - sd.getTime();
        }
      }
      else {
        delta = 0;
      } 
      
      delta = delta / 1000;
      
      var day = Math.floor(delta / (3600 * 24)),
          hr = Math.floor(delta / 3600),
          min = Math.floor((delta - hr * 3600) / 60),
          sec = Math.floor(delta - hr * 3600 - min * 60);
      
      return {days: day, hours: hr, minutes: min, seconds: sec, delta: delta};
    },
    
    _setStyle: function($container, style) {
      $container.removeClass('counter-analog counter-analog2');
      $container.removeClass('ui-counter-days ui-counter-seconds');
      $container.parent().removeClass('days seconds');
      if (this[style + 'Style'] == 'small') {
        $container.addClass('counter-analog');
      }
      else {
        $container.addClass('counter-analog2');
      }
      $container.addClass('ui-counter-' + style);
      $container.parent().addClass(style);
    },
    
    _renderSeconds: function($container, delta) {
      var maxhr = (delta.days + 1) * 24 - 1;
      if (maxhr > 999) {
        throw "Min days is too large to display";
      }
      this._setStyle($container, 'seconds');
      $container.counter({
        format: maxhr + ':59:59',
        direction: 'down',
        interval: '1000',
        initial: delta.hours + ':' + delta.minutes + ':' + delta.seconds,
        stop: (maxhr >= 100 ? '000' : '00') + ':00:00'
      });
    },
    
    init: function() {
      var $container = null;
      if (typeof this.container === 'string') {
        $container = $(this.container);
      }
      else {
        $container = this.container;
      }
      
      var delta = this._getDelta();
      var count = 0, timer = null, o = this;
      
      if (delta.days < this.minDays) {
        this._renderSeconds($container, delta);
        timer = setInterval(function() {
          count += 1;
          if (delta.delta - count === 0) {
            o.stopped();
            clearInterval(timer);
          }
        }, 1000);
      }
      else {
        if (delta.days > 999) {
          throw "Delta days is too large to display";
        }

        this._setStyle($container, 'days');
        $container.counter({
          format: delta.days >= 100 ? '999' : '99',
          direction: 'down',
          interval: '86400000',
          initial: delta.days,
          stop: delta.days >= 100 ? '000' : '00'
        });
        
        timer = setInterval(function() {
          count += 1;
          if (delta.delta - count < o.minDays * 86400) {
            $container.empty();
            o.changed();
            o.delta = (delta.delta - count) * 1000;
            o._renderSeconds($container, o._getDelta());
          }
          if (delta.delta - count === 0) {
            o.stopped();
            clearInterval(timer);
          }
        }, 1000);
      }
    }
  });

  module.exports = Counter;
    
});

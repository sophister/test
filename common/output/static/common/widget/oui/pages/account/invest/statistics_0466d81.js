define('common:widget/oui/pages/account/invest/statistics', ['require', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/protocol', 'common:widget/oui/lib/highcharts/3.0.5/highcharts'],function(require) {
  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery');
  var Protocol = require('common:widget/oui/protocol');
  require('common:widget/oui/lib/highcharts/3.0.5/highcharts');

  var t = Protocol.translator;
  
  var colors = [ '#3488ad', '#1bb8e2', '#aabc64', '#ffc400', '#f78800', '#e52012', '#f01f5a' ];
  var getColor = function(n) {
    return colors[n % 7];
  };
  
  var getY = function(v) {
    return parseFloat(t._bankersRound(v));
  };
  
  
  var data = null, loadData = null;

  loadData = function(container, name) {
    var ret = {};
    container.find('[data-name="' + name + '"]').each(function(i, elem) {
      var $elem = $(elem);
      if ($elem.data('deep') == 'yes') {
        ret[$elem.data(name)] = loadData($elem, $elem.data('value'));
      }
      else {
        var v = $elem.data('value');
        if (typeof v === 'string') {
          v = parseFloat(v, 10);
        }
        ret[$elem.data(name)] = v;
      }
    });
    return ret;
  };

  /* 累计收益 */
  var labels = [], values = [];
  data = loadData($('#gained-data'), 'category');
  $.each(data, function(k, v) {
    labels.push(k);
    values.push(getY(v));
  });
  $('#gained-chart').highcharts({
    chart: { type: 'column' },
    title: { text: '理财账户收益金额组成' },
    legend: false,
    xAxis: {
      categories: labels
    },
    yAxis: {
      title: false
    },
    series: [{
      name: '收益',
      data: values,
      color: getColor(0)
    }],
    credits: {
      enabled: false
    }
  });
  
  var inner, outer, count;

  /* 累计投资 */
  inner = [];
  outer = [];
  count = 0;
  data = loadData($('#total-invest-data'), 'category');
  $.each(data, function(k, v) {
    if (typeof v === 'number') {
      if (v !== 0) {
        inner.push({ name: k, y: getY(v), color: getColor(count) });
        outer.push({ name: k, y: getY(v), color: getColor(count) });
        count += 1;
      }
    }
    else {
      var total = 0;
      $.each(v, function(k2, v2) {
        if (v2 !== 0) {
          outer.push({ name: k2, y: getY(v2), color: getColor(count) });
          total += v2;
        }
      });
      if (total !== 0) {
        inner.push({ name: k, y: getY(total), color: getColor(count) });
        count += 1;
      }
    }
  });
  if (count === 0) {
    $('#total-invest-chart').addClass('empty').text($('#total-invest-chart').data('empty'));
  }
  else {
    $('#total-invest-chart').highcharts({
      chart: { type: 'pie' },
      title: { text: '累计投资金额分类占比' },
      legend: false,
      plotOptions: {
        pie: {
          shadow: false, 
          center: ['50%', '50%']
        }
      },
      tooltip: {
        valueSuffix: '元'
      },
      series: [{
        name: '投资额',
        data: inner,
        size: '60%',
        dataLabels: { enabled: false }
      }, {
        name: '投资额',
        data: outer,
        size: '80%',
        innerSize: '60%'
      }],
      credits: {
        enabled: false
      }
    });
  }
  
  /* 当前投资 */
  inner = [];
  outer = [];
  count = 0;
  data = loadData($('#current-invest-data'), 'category');
  $.each(data, function(k, v) {
    if (typeof v === 'number') {
      if (v !== 0) {
        inner.push({ name: k, y: getY(v), color: getColor(count) });
        outer.push({ name: k, y: getY(v), color: getColor(count) });
        count += 1;
      }
    }
    else {
      var total = 0;
      $.each(v, function(k2, v2) {
        if (v2 !== 0) {
          outer.push({ name: k2, y: getY(v2), color: getColor(count) });
          total += v2;
        }
      });
      if (total !== 0) {
        inner.push({ name: k, y: getY(total), color: getColor(count) });
        count += 1;
      }
    }
  });
  if (count === 0) {
    $('#current-invest-chart').addClass('empty').text($('#current-invest-chart').data('empty'));
  }
  else {
    $('#current-invest-chart').highcharts({
      chart: { type: 'pie' },
      title: { text: '理财账户资产分类占比' },
      legend: false,
      plotOptions: {
        pie: {
          shadow: false, 
          center: ['50%', '50%']
        }
      },
      tooltip: {
        valueSuffix: '元'
      },
      series: [{
        name: '投资额',
        data: inner,
        size: '60%',
        dataLabels: { enabled: false }
      }, {
        name: '投资额',
        data: outer,
        size: '80%',
        innerSize: '60%'
      }],
      credits: {
        enabled: false
      }
    });
  }
  
  /* 债权收益 */
  inner = [];
  outer = [];
  count = 0;
  data = loadData($('#to-gain-data'), 'category');
  $.each(data, function(k, v) {
    if (v !== 0) {
      inner.push({ name: k, y: getY(v), color: getColor(count) });
      count += 1;
    }
  });
  if (count === 0) {
    $('#to-gain-chart').addClass('empty').text($('#to-gain-chart').data('empty'));
  }
  else {
    $('#to-gain-chart').highcharts({
      chart: { type: 'pie' },
      title: { text: '债权待收收益分类占比' },
      legend: false,
      plotOptions: {
        pie: {
          shadow: false, 
          center: ['50%', '50%']
        }
      },
      tooltip: {
        valueSuffix: '元'
      },
      series: [{
        name: '金额',
        data: inner
      }],
      credits: {
        enabled: false
      }
    });
  }
});
define('common:widget/oui/pages/account/borrow/statistics', ['require', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/common', 'common:widget/oui/protocol', 'common:widget/oui/lib/highcharts/3.0.5/highcharts'],function(require) {
  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery');
  var Common = require('common:widget/oui/common');
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
  
  /* Render Tables */
  
  var stat = Common.loadJSON('#stat-rsp', true);
  var stat1yr = stat.data.loanAmountMap;
  var data1yr = { stats: [] };
  var i = 0;
  $.each(stat1yr, function(k, v) {
    var item = {};
    if (k == 'total') {
      k = '总计';
    } else {
      item.data = true;
    }
    item.label = k;
    item.value = t._fixedFloat2(v);
    item.formattedValue = t._commaFloat(v);
    i += 1;
    if (i % 2 == 1) {
      item.style = 'rrdcolor-paleblue3-bg';
    } else {
      item.style = 'rrdcolor-paleblue2-bg';
    }
    data1yr.stats.push(item);
  });
  Common.fillTemplate({
    container: $('#succeeded-data'),
    template: $('#stat-template'),
    data: data1yr
  });

  var stat6mon = stat.data.repayAmountMap;
  var data6mon = { stats: [] };
  i = 0;
  $.each(stat6mon, function(k, v) {
    var item = {};
    if (k == 'total') {
      k = '总计';
    } else {
      k = k.replace('-', '年') + '月';
      item.data = true;
    }
    item.label = k;
    item.value = t._fixedFloat2(v);
    item.formattedValue = t._commaFloat(v);
    i += 1;
    if (i % 2 == 1) {
      item.style = 'rrdcolor-paleblue3-bg';
    } else {
      item.style = 'rrdcolor-paleblue2-bg';
    }
    data6mon.stats.push(item);
  });
  Common.fillTemplate({
    container: $('#half-year-data'),
    template: $('#stat-template'),
    data: data6mon
  });
  
  /* Render Charts */
  
  var renderPie = function(name) {
    var data = [], count = 0; 
    var dataContainer = $('#' + name + '-data');
    dataContainer.find('[data-name="category"]').each(function(i, elem) {
      var $elem = $(elem),
          k = $elem.data('category'),
          v = $elem.data('value');
      if (typeof v === 'string') {
        v = parseFloat(v, 10);
      }
      if (v !== 0) {
        data.push({ name: k, y: getY(v), color: getColor(count) });
      }
      count += 1;
    });
    
    var chartContainer = $('#' + name + '-chart');
    if (data.length === 0) {
      chartContainer.addClass('empty').text(chartContainer.data('empty'));
    }
    else {
      chartContainer.highcharts({
        chart: { type: 'pie' },
        title: { text: chartContainer.data('title') },
        legend: false,
        plotOptions: { pie: { shadow: false, center: ['50%', '50%'] } },
        tooltip: { valueSuffix: '元' },
        credits: { enabled: false },
        series: [{ name: '金额', data: data }]
      });
    }
  };
  
  var renderColumn = function(name) {
    var labels = [], values = [];
    var dataContainer = $('#' + name + '-data');
    dataContainer.find('[data-name="category"]').each(function(i, elem) {
      labels.push($(elem).data('category'));
      values.push(parseFloat($(elem).data('value'), 10));
    });
    
    var chartContainer = $('#' + name + '-chart');
    chartContainer.highcharts({
      chart: { type: 'column' },
      title: { text: chartContainer.data('title') },
      legend: false,
      xAxis: { categories: labels },
      yAxis: { title: false },
      credits: { enabled: false },
      series: [{ name: '金额', data: values, color: getColor(0) }]
    });
  };
  
  renderPie('overall');
  renderPie('to-repay');
  renderPie('repaid');

  renderColumn('succeeded');
  renderColumn('half-year');
  
});
define(function(require) {
  
  var $ = require('jquery'),
      Common = require('common'),
      Protocol = require('protocol'),
      Widgets = require('widgets/widgets');
  
  var rsp = Common.loadJSON('#transactions-rsp', true);
  var list = new Widgets.List({
    name: 'transactions',
    api: Protocol.API.getUserTransactions,
    title: true,
    pagination: true
  }).init(rsp);
  
  /* Initialize switch */
  $('#query-switch').click(function() {
    var btn = $(this);
    if (btn.data('current') == 'normal') {
      btn.text('切换到普通查询');
      btn.data('current', 'advanced');
      $('#query-normal').hide();
      $('#query-advanced').show();
    }
    else {
      btn.text('切换到高级查询');
      btn.data('current', 'normal');
      $('#query-advanced').hide();
      $('#query-normal').show();
    }
  });
  
  /* Initialize advanced query */
  var startYear = 2010,
      currYear = parseInt($('#pg-helper-year').text(), 10),
      currMonth = parseInt($('#pg-helper-month').text(), 10),
      $yr = $('select[name="year"]'),
      $mon = $('select[name="startMonth"], select[name="endMonth"]'),
      $sMon = $('select[name="startMonth"]'),
      $eMon = $('select[name="endMonth"]');
  
  var option = function(i) {
    return '<option value="' + i + '">' + i + '</option>';
  };
  
  var intval = function($elem) {
    return parseInt($elem.val(), 10);
  };
  
  var i;
  for (i = currYear - 1; i >= startYear; i--) {
    $yr.append(option(i));
  }
  for (i = 1; i <= currMonth; i++) {
    $mon.append(option(i));
  }
  
  $yr.change(function() {
    var v = intval($yr);
    var s = intval($sMon);
    var e = intval($eMon);
    var max = v == currYear ? currMonth : 12;
    $mon.empty();
    for (i = 1; i <= max; i++) {
      $mon.append(option(i));
    }
    $sMon.val(s <= currMonth ? s : 1);
    $eMon.val(e <= currMonth ? e : 1);
  });
  
  $sMon.change(function() {
    var v = $eMon.val();
    var max = intval($yr) == currYear ? currMonth : 12;
    $eMon.empty();
    for (i = intval($(this)); i <= max; i++) {
      $eMon.append(option(i));
    }
    $eMon.val(v);
  });
  
  $eMon.change(function() {
    var v = $sMon.val();
    $sMon.empty();
    for (i = 1; i <= intval($(this)); i++) {
      $sMon.append(option(i));
    }
    $sMon.val(v);
  });
  
  
  /* Initialize query submission */
  var getParams = function() {
    var params = {
      type: $('select[name="type"]').val() 
    };
    if ($('#query-normal').is(':visible')) {
      params.time = $('select[name="time"]').val();
    }
    else {
      params.year = $('select[name="year"]').val();
      params.startMonth = $('select[name="startMonth"]').val();
      params.endMonth = $('select[name="endMonth"]').val();
    }
    return params;
  };
  
  var latestStatus = rsp.status,
      latestParams = $.param(getParams()),
      $export = $('#export');
  
  var url = $('#export').attr('href');
  $('#export').attr('href', url + '?' + latestParams);
  
  $('#query-submit').click(function() {
    var params = getParams(),
        paramsEncoded = $.param(params);
    if (latestParams == paramsEncoded && latestStatus === 0) {
      return;
    }
    list._params = params;
    list._update(params, function(status, message, data) {
      latestStatus = status;
      latestParams = paramsEncoded;
      
      if (status === 0) {
        $export.attr('href', url + '?' + latestParams);
        $export.removeClass('disabled');
      }
      else {
        $export.removeAttr('href');
        $export.addClass('disabled');
      }
    });
  });
  
});

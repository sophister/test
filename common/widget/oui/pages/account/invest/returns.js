define(function (require) {

  var $ = require('jquery'),
      Calendar = require('calendar'),
      Common = require('common'),
      Protocol = require('protocol'),
      Widgets = require('widgets/widgets');

  var getStatus = function (v) {
    v = v || $('#back-status').val();
    return $('#back-status').children('option[value="' + v + '"]').text();
  };
  
  var getDate = function(strDate, years, months, days) {
    var date = strDate ? new Date(strDate.replace(/-/g, "/")) : new Date();
    if (years !== undefined) {
      date.setFullYear(date.getFullYear() + years);
    }
    if (months !== undefined) {
      date.setMonth(date.getMonth() + months);
    }
    if (days !== undefined) {
      date.setDate(date.getDate() + days);
    }
    var y = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate();
    return y + '-' + (m > 9 ? m : '0' + m) + '-' + (d > 9 ? d : '0' +d);
  };

  var rsp = Common.loadJSON('#return-records-rsp', true);

  var $summary = $('#query-summary'),
      $amount = $('#return-total-amount'),
      $status = $('#return-status-label'),
      $nor = $('#normal'),
      $adv = $('#advance'),
      $info = $('#query-info'),
      $switch = $('#query-switch'),
      $backStatus = $('#back-status'),
      $startTime = $('#back-start-time'),
      $endTime = $('#back-end-time'),
      initAmount = rsp.data.selectedDateAmount,
      initStatus = getStatus();

  $amount.text(initAmount);
  $status.text(initStatus);

  var list = new Widgets.List({
    name: 'return-records',
    api: Protocol.API.getUserLoansReturnRecords,
    title: true,
    pagination: true
  }).init(rsp);

  var minDate = '2010-01-01', currDate = $startTime.data('current');

  var dates = {
    today: currDate,
    prevYear: getDate(currDate, -1, 0, 1),
    prevMonth: getDate(currDate, 0, -1),
    nextMonth: getDate(currDate, 0, 1)
  };

  var startCal = null, endCal = null;

  $endTime.val(dates.nextMonth);

  // initialize select component for advanced query 
  (function() {
    var startYear = 2010,
        currYear = parseInt(dates.today.split("-")[0], 10),
        currMonth = parseInt(dates.today.split("-")[1], 10),
        $yr = $('select[name="year"]'),
        $mon = $('select[name="startMonth"], select[name="endMonth"]'),
        $sMon = $('select[name="startMonth"]'),
        $eMon = $('select[name="endMonth"]');

    var option = function (i) {
      return '<option value="' + i + '">' + i + '</option>';
    };

    var intval = function ($elem) {
      return parseInt($elem.val(), 10);
    };

    var i;
    for (i = currYear; i >= startYear; i--) {
      $yr.append(option(i));
    }
    for (i = 1; i <= currMonth; i++) {
      $mon.append(option(i));
    }

    $yr.change(function () {
      var v = intval($yr), s = intval($sMon), e = intval($eMon);
      var max = v == currYear ? currMonth : 12;
      $mon.empty();
      for (i = 1; i <= max; i++) {
        $mon.append(option(i));
      }
      $sMon.val(s <= currMonth ? s : 1);
      $eMon.val(e <= currMonth ? e : 1);
    });

    $sMon.change(function () {
      var v = $eMon.val();
      var max = intval($yr) == currYear ? currMonth : 12;
      $eMon.empty();
      for (i = intval($(this)); i <= max; i++) {
        $eMon.append(option(i));
      }
      $eMon.val(v);
    });

    $eMon.change(function () {
      var v = $sMon.val();
      $sMon.empty();
      for (i = 1; i <= intval($(this)); i++) {
        $sMon.append(option(i));
      }
      $sMon.val(v);
    });
  })();

  if (!Common.isIE6()) {
    startCal = new Calendar({ trigger: $startTime, range: [minDate, null] });
    endCal = new Calendar({ trigger: $endTime, range: [minDate, null] });
    startCal.on('selectDate', function (date) {
      var upper = $backStatus.val() == 'BACK_REP' ? dates.today : null;
      endCal.range([date, upper]);
    });
    endCal.on('selectDate', function (date) {
      var lower = $backStatus.val() == 'BACK_REP' ? dates.prevYear : null;
      startCal.range([lower, date]);
    });
  }

  var getParams = function () {
    var params = {};
    if ($('#normal').is(':visible')) {
      params.backStatus = $backStatus.val();
      params.backStartTime = $startTime.val();
      params.backEndTime = $endTime.val();
      params.accountType = 'normal';
    } else {
      var y = $('#advance').find("[name='year']").val();
      var sm = parseInt($('#advance').find("[name='startMonth']").val(),10);
      var em = parseInt($('#advance').find("[name='endMonth']").val(),10);
      sm = sm >9 ? sm: "0" + sm;
      em = em >9 ? em: "0" + em;
      params.backStatus = $backStatus.val();
      params.backStartTime = y + "-" + sm + '-' + '01';
      params.backEndTime = y + "-" + em + '-' + '30';
      params.accountType = 'senior';
    }
    return params;
  };

  $backStatus.change(function () {
    var val = $(this).val().toUpperCase();
    if (val == 'BACK_REP') {
      $startTime.add($endTime).css({ width: '80px' });
      $startTime.val(dates.prevMonth);
      $endTime.val(dates.today);
      startCal.range([dates.prevYear, dates.today]);
      endCal.range([dates.prevYear, dates.today]);
      $info.add($switch).show();
    } else {
      if ($switch.text() != '高级查询') {
        $switch.trigger('click');
      }
      $startTime.add($endTime).css({ width: 'auto' });
      $startTime.val(dates.today);
      $endTime.val(dates.nextMonth);
      startCal.range([minDate, null]);
      endCal.range([minDate, null]);
      $info.add($switch).hide();
    }
  });

  $switch.click(function () {
    if ($(this).text() == '高级查询') {
      $nor.add($info).hide();
      $adv.show();
      $(this).text('普通查询');
    } else {
      $nor.add($info).show();
      $adv.hide();
      $(this).text('高级查询');
    }
  });

  $('#query-submit').click(function () {
    var params = getParams();
    var paramsEncoded = $.param(params);
    list._params = params;
    list._update(params, function (status, message, data) {
      latestStatus = status;
      latestParams = paramsEncoded;
      $amount.text(data.selectedDateAmount);
      $status.text(getStatus(params.backStatus));
      if (params.backStatus == 'BACK_REP') {
        $summary.hide();
      } else {
        $summary.show();
      }
    });
  });

});
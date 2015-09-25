define('common:widget/oui/pages/borrow/verify', ['require', 'exports', 'module', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/arale/dialog/1.3.3/dialog'],function (require, exports, module) {

  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery'),
    Dialog = require('common:widget/oui/arale/dialog/1.3.3/dialog');

  var totaltime = 0,
    _init;

  var renderDialog = function () {
    new Dialog({
      trigger: '.auth',
      width: '600px',
      align: {
        baseXY: ['50%', 0],
        selfXY: ['50%', 0]
      },
      hasMask: {
        hideOnClick: false
      }
    }).before('show', function () {
      this.set('content', "/upload/uploadMaterial!uploadPage.action?" + this.activeTrigger.attr('href'));
    }).after('hide', function () {
      // alert(3)
    });
  };

  var calc = function () {
    var amount, $tr, $tds, $tds2;
    $tr = $("#ratetable tr");
    amount = $.trim($("#borrowAmount").text());
    $tds = $tr.eq(1).find("td").filter(function () {
      return $(this).text() != "服务费率";
    });
    $tds2 = $tr.eq(2).find("td").filter(function () {
      return $(this).text() != "服务费用";
    });
    if (!amount || amount % 50 !== 0 || amount > 1000000) {
      $.each($tds, function (i) {
        $tds2.eq(i).html("");
      });
    } else {
      $.each($tds, function (i) {
        var v = parseFloat($(this).text().replace("%", ""));
        $tds2.eq(i).html((v * amount * 0.01).toFixed(0));
      });
    }
  };
  var updateRepayDetail = function () {
    var amount, apr, repayTime, productId, extraData = {};
    amount = $.trim($("#borrowAmount").text());

    apr = $.trim($("#apr").text());
    apr = apr === "" ? "" : parseFloat(apr);
    repayTime = $.trim($("#repayTime").text());
    productId = $.trim($("#J_productid").text());

    //productId = $.inArray(productId, ["AA", "A", "B", "C", "D", "E", "HR"]) + 1;

    if (!amount || !apr || !repayTime || !productId) {
      return;
    }

    extraData = {
      amount: amount,
      apr: apr,
      repayTime: repayTime,
      productId: productId
    };

    $.ajax({
      url: "/borrow/getMonthlyInterest.action",
      data: $.param(extraData),
      type: "POST",
      dataType: 'json',
      success: function (data) {
        $("#monthRepayMoney").html("￥" + Number(data.monthlyRepay).toFixed(2) + " ");
        $("#managerFee").html("￥" + Number(data.manageFee).toFixed(2) + " ");
        $("#J_monthPay").html("￥" + Number(data.totalMonthlyRepay).toFixed(2) + " ");
        $("#J_origin_fee").html("￥" + Number(data.guaranteeFee).toFixed(2) + " ");
      }
    });
  };

  function formatSeconds(value) {
    var _floor = function (num) {
      return Math.floor(Number(num));
    },
      _fixStr = function (str) {
        // 1 fix to 01
        return ('00' + str).slice(-2);
      },
      totalSec = _floor(value),
      secs = _floor(totalSec % 60),
      minuts = _floor((totalSec / 60) % 60),
      hours = _floor((totalSec / (60 * 60)) % (60 * 60)),
      ret = [];
    // console.log(hours, minuts, secs, totalSec);
    if (hours > 99) {
      ret.push('<em>' + hours + '</em>时');
    } else {
      ret.push('<em>' + _fixStr(hours) + '</em>时');
    }
    ret.push('<em>' + _fixStr(minuts) + '</em>分');
    ret.push('<em>' + _fixStr(secs) + '</em>秒');
    $("#J_count_time").html(ret.join(''));
  }

  function setTimer() {
    var timeid, _flush = function () {
      formatSeconds(totaltime);
      if (totaltime <= 0) {
        clearInterval(timeid);
        $("#J_count-down-tip-div").html("<span class='dot'>●</span>补充上传资料时间已截止，我们将尽快检查您的资料，请耐心等待。");
        // 未上传/审核中
        $('.icon-noload ~ .auth, .icon-verify ~ .auth').addClass('hide');
      }
      totaltime = totaltime - 1;
    };
    timeid = setInterval(_flush, 1000);
    _flush();
  }

  function bindExtraTip(){
    var hide = 'hide';
    // 提示信息
    $('.extra-div-a').on('mouseenter',function(){
      var el = $(this).next('.ui-poptip-bx').removeClass(hide);

      var pos = $(this).position();
      el.css({'left':pos.left + 30,top:pos.top - 10,width: 290});
    });

    $('.extra-div-a').on('mouseleave',function(){
      $(this).next('.ui-poptip-bx').addClass(hide);
    });
  }

  var verify = {
    init: function (sec) {
      if (_init) {
        return;
      }
      _init = true;
      renderDialog();
      calc();
      updateRepayDetail();
      if (sec){
        totaltime = sec;
      }
      setTimer();
      bindExtraTip();
    }
  };

  module.exports = verify;
});
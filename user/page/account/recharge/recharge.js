
var Widgets = require('widgets');
var $ = require('jquery');
var Dialog = require('dialog');
var Tip = require('tip');
var Handlebars = require('handlebars');
var form = Widgets.Form;


  $(function () {
    var $bankId = $("#bankId"),$paytype = $("#paytype");
    var bankName; //用户最近一次选择的银行卡记录，后续保存到cookie中
    var $eq0 = $("#bankList").find("dl").eq(0).hide(); //用户最近使用的银行卡
    var $eq1 = $(".e-banks-list"); //普通银行卡，为动态数据
    var $eq2 = $(".c-banks-list"); //渠道银行卡，目前为静态数据
    //var dt = ['最近使用的充值方式', '充值银行', '充值渠道'];
    var formatData = {
        "rows":[]
    }
    var cardArr = compact(readCookie('cd').split(','));
    var data = $("#rechargeBank-list-rsp").html();
    var qudao = [
       {"fullName": "快钱", "payChannelStr": "QUICKPAY", "code": "QUICKPAY", "bankInfoId": "q1", "logo": "/static/img/banks30/checkin_kq.jpg"},
       {"fullName": "财付通", "payChannelStr": "TENPAY", "code": "TENPAY", "bankInfoId": "q4", "logo": "/static/img/banks30/tenpay.jpg"},
       {"fullName": "易宝", "payChannelStr": "YEEPAY", "code": "YEEPAY", "bankInfoId": "q3", "logo": "/static/img/banks30/yeepay.jpg"}
     //,
     //{"fullName": "汇付天下", "payChannelStr": "CHINAPNR", "code": "CHINAPNR", "bankInfoId": "q2", "logo": "/static/img/bank/chinapnr.jpg"}
     ];
     var qudaoData = {
       rows: qudao
     };
     data = $.parseJSON(data);
    for(var i=0; i<data.data.rows.length;i++){
      var tmp = {};
      tmp.payChannelStr = data.data.rows[i].payChannelStr;
      tmp.code = data.data.rows[i].code;
      tmp.bankInfoId = data.data.rows[i].bankInfoId;
      tmp.fullName = data.data.rows[i].fullName;
      //tmp.logo = data.data.rows[i].logo.replace(/banks/,'banks30');
      tmp.logo = data.data.rows[i].logo;
      if(i<5){
        tmp.className = '';
      }else {
        tmp.className= 'fn-hide';
      }
      formatData.rows.push(tmp);
    }
    var cardAll = $.merge(data.data.rows, qudao);
    var dataRecord = getUserRecentBanks(cardAll, cardArr);

    if (dataRecord.rows.length) {
      var changeIndex = 0;
      for(var i=0;i<formatData.rows.length;i++){
        if(dataRecord.rows[0].code==formatData.rows[i].code){
          changeIndex = i;
        }
      }
      var tmpClass = formatData.rows[changeIndex].className;
      formatData.rows[changeIndex].className = "";
      if(changeIndex!=0){
        formatData.rows[4].className = tmpClass;
      }
      //将最近充值的银行卡放在第一位
      var firstBank = formatData.rows.slice(changeIndex,changeIndex+1)[0];
      formatData.rows.splice(changeIndex,1);
      formatData.rows.unshift(firstBank);
    }
    data2html($eq1, formatData); //填充普通银行卡数据
    data2html($eq2, qudaoData); //填充渠道充值数据
    defaultBank($(".e-banks-list"));

    //充值方式 tab切换
    $("li",".J_recharge-title").click(function(){
      $(this).addClass("active").siblings().removeClass("active");
      $(".e-banks-list,.c-banks-list").hide();
      $("."+$(this).data("way")+"-list").show();
      defaultBank($("."+$(this).data("way")+"-list"));
    });

    //更多银行
    $(".J_show_more_banks").on("click",function(){
      $(this).siblings().removeClass("fn-hide");
      $(this).remove();
    });
    //选中充值方式
    $("li:not('.J_show_more_banks')",".recharge-banks").on("click",function(){
      $(this).siblings().removeClass("active");
      $(this).addClass("active");
      var payChannel = $(this).data('type');
      $paytype.val(payChannel);
      $bankId.val($(this).data('value'));
      bankName = $(this).data('value');
      $(".banks-limit-table table").hide();
      $("."+$(this).data('value')+"-table").show();
    });

    function defaultBank(el){
      var defBank = el.find('li:first');
      var payChannel = defBank.data('type');
      defBank.siblings().removeClass("active");
      defBank.addClass('active');
      $paytype.val(payChannel);
      $bankId.val(defBank.data('value'));
      bankName = defBank.data('value');
      $(".banks-limit-table table").hide();
      $("."+defBank.data('value')+"-table").show();
    }

    //var vali = form.validate();
    $("#rechargeAmount").on('keyup blur',function () {
      calcRecharge();
    });

    $("#rechargeFree").click(function () {
      calcRecharge();
    });

    $("#sub-recharge").click(function (e) {
      //提交表单以让验证立即执行
      $("form").submit();

      //检测验证是否通过
      // if (!vali.valid()) {
      //   return false;
      // }

      new Dialog({
        width: '500px',
        hasMask: {
          hideOnClick: true
        },
        content: $("#afterSub")
      }).show();

      if ($.inArray(bankName, dataRecord.updateCode) === -1) {
        cardArr = $.merge([bankName], dataRecord.updateCode);
      }

      writeCookie('cd', compact(cardArr).toString(), 24 * 360);
      e.preventDefault();
    });

    $("#finishRecharge").click(function () {
      location.reload();
    });

    $("#troubleRecharge").click(function () {
      location.reload();
    });

    new Tip({
      element: '#tipCon',
      trigger: '#tips',
      direction: 'right'
    });

    if ($("#tips2").length) {
      new Tip({
        element: '#tipCon2',
        trigger: '#tips2',
        direction: 'right'
      });
    }
  });

  function calcRecharge() {
    var $poundage = $("#rechargePoundage"),
      $pay = $("#rechargePay"),
      free = $("#rechargeFree").is(":checked"),
      amount = $.trim($("#rechargeAmount").val()),
      payType = $("#payFeeType").val(),
      type = "checkin";

    if (!form.is.isAmount(amount)) {
      return;
    }

    $.ajax({
      url: "/my/getCashFee.action",
      cache: false,
      dataType: 'json',
      data: {
        amount: amount,
        type: type,
        payCategory: payType,
        couponlog: free
      },
      timeout: 10000,
      success: function (resp) {
        var fe = parseFloat(resp.fe).toFixed(2);
        var cal = parseFloat(resp.cal).toFixed(2);
        var afterBanlance = parseFloat(resp.balance).toFixed(2);
        $poundage.html('￥'+form.comma(fe));
        $pay.html('￥'+form.comma(cal));
      }
    });
  }

  function writeCookie(name, value, hours) {
    var expire = "";
    if (hours !== null) {
      expire = new Date((new Date()).getTime() + hours * 3600000);
      expire = "; expires=" + expire.toGMTString();
    }
    document.cookie = name + "=" + escape(value) + expire;
  }

  function readCookie(name) {
    var cookieValue = "";
    var search = name + "=";
    if (document.cookie.length > 0) {
      offset = document.cookie.indexOf(search);
      if (offset != -1) {
        offset += search.length;
        end = document.cookie.indexOf(";", offset);
        if (end == -1) end = document.cookie.length;
        cookieValue = unescape(document.cookie.substring(offset, end));
      }
    }
    return cookieValue;
  }

  //去掉数组中的"",null,undefined值，并只返回4条

  function compact(arr) {
    var result = [];
    $.each(arr, function (k, v) {
      if (v) {
        result.push(v);
      }
    });
    if (result.length > 4) result.length = 4;
    return result;
  }

  function data2html(ele, data) {
    var source = $("#rechargeBank-list-template").html();
    var template = Handlebars.compile(source);
    var html = template(data);
    ele.html(html);
    if(data.rows.length>5){
      $('<li class="J_show_more_banks"><a href="javascript:">更多银行</a></li>').insertAfter(ele.find('li').eq(5));
    }
  }

  //获得用户最近银行卡数据，从浏览器cookie中取出并转换

  function getUserRecentBanks(cardAll, cardArr) {
    var result = {};
    result.rows = [];
    result.updateCode = []; //这里要把cookie中没用的code删除，即以后台数据为准
    for (var i = 0; i < cardArr.length; i++) {
      for (var o in cardAll) {
        if (cardArr[i] == cardAll[o].code) {
          cardAll[o].bankInfoId = 'recent' + i;
          result.rows.push(cardAll[o]);
          result.updateCode.push(cardAll[o].code);
          delete cardAll[o];
          break;
        }

      }
    }
    return result;
  }
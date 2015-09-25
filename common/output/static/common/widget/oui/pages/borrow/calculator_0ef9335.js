define('common:widget/oui/pages/borrow/calculator', ['require', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/protocol', 'common:widget/oui/widgets/widgets', 'common:widget/oui/components/components.jscomponents', 'common:widget/oui/lib/handlebars/1.0.0/handlebars'],function (require) {
  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery'),
    Protocol = require('common:widget/oui/protocol'),
    Widgets = require('common:widget/oui/widgets/widgets'),
    Components = require('common:widget/oui/components/components.jscomponents'),
    Handlebars = require('common:widget/oui/lib/handlebars/1.0.0/handlebars');

  var t = Protocol.translator,
    calc = Components.Calculator,
    form = Widgets.Form;
  var RE_CASH = /^(([1-9]{1}\d*)|([0]{1}))?$/;
  var range = $("#borrowAmount").data("range") || "";
  range = range.split(",");
  var borrowAmount = range[0] === "" ? "出借金额50的倍数" : "金额范围" + form.comma(range[0]) + "-" + form.comma(range[1]);
  form.validate({
    before: function () {
      if (range[0] !== "") {
        jQuery.validator.addMethod("isBorrowAmount", function (value, element) {
          return this.optional(element) || (value >= parseInt(range[0], 10) && value <= parseInt(range[1], 10) && value % 50 === 0 && RE_CASH.test(value));
        }, "借款金额范围" + range[0] + "-" + range[1] + "，且为50的倍数");
      } else {
        jQuery.validator.addMethod("isBorrowAmount", function (value, element) {
          return this.optional(element) || (value % 50 === 0 && RE_CASH.test(value));
        }, "出借金额范围须为50的倍数");
        jQuery.validator.addMethod("isRepayDate", function (value, element) {
          return this.optional(element) || (value > 0 && value <= 36);
        }, "借款期限须为1-36个月");
      }
      //定投 金额
      jQuery.validator.addMethod("isFixedAmount", function(value, element){
        return this.optional(element) || (value >= 500 && value <=20000 && value % 100===0 && RE_CASH.test(value))
      }, '金额500-20000元之间，且100的倍数');
      jQuery.validator.addMethod("isRateOver", function (value, element) {
        var minRate = range[0] === "" ? 5 : 10;
        var maxRate = 24;
        value = parseFloat(value);
        return (value >= minRate) && (value <= maxRate);
      }, form.err.isRateOver);
    },
    showTip: true,
    tip: {
      fixedAmount: '500-20000元之间，100的倍数',
      borrowAmount: borrowAmount,
      yearRate: range[0] === "" ? "利率范围5%-24%" : "利率范围10%-24%",
      repayDate: range[0] === "" ? "可填写从1到36任意整数月份" : null
    },
    validateData: {
      submitHandler: function (el) {
        if ($('#J_tab_loan').css('display') == 'block') {
          var offsetTop = $("#calcu-tab").offset().top;
          if(offsetTop){
            $('body,html').animate({
              scrollTop: offsetTop
            }, 800);
          }
        }
        if ($('#J_tab_uplan').css('display') == 'block') {
          //如果是U计划的计算器，走单独逻辑
          var con = $('#touziAmount').val();

          if ($.trim(con) === '' || Number(con) % 1000 !== 0) {
            $('#touziAmount-error-label').css('display', 'block');
            return false;
          } else {
            $('#touziAmount-error-label').css('display', 'none');
          }
          var offsetTop = $("#calcu-tab").offset().top;
          if(offsetTop){
            $('body,html').animate({
              scrollTop: offsetTop
            }, 800);
          }
          var calcArr = $('#calcForm1').serializeArray();
          var res = calc.arrToObj(calcArr);
          //console.log(res["UType"]);
          //console.log(res["rType"]);
          //console.log(res["touziAmount"]);
          var parameter = {};
          parameter.amount = res.touziAmount;
          parameter.cashType = res.rType;
          parameter.category = res.UType;
          $.ajax({
            async: false,
            type: "GET",
            url: "/calculate!calculateUplanInterest.action",
            data: parameter,
            dataType: "json",
            success: function (resp) {
              if (resp.status === 0 && resp.message === "okay") {
                $("#J_CJJE").html("￥" + res.touziAmount + ".00");
                $("#J_YQSY").html("￥" + Number(resp.data.interest).toFixed(2));
              } else {
                alert(resp.message);
                $("#J_CJJE").html("￥" + res.touziAmount + ".00");
                $("#J_YQSY").html("￥0.00");
              }
            },
            error: function (msg) {
              alert(resp.message);
              $("#J_CJJE").html("￥" + res.touziAmount + ".00");
              $("#J_YQSY").html("￥0.00");
            }
          });
          return false;
        }
        if ($('.J_tit').text() == "借款设置") {
          if ($('#repayDate').attr("value") === "") {
            $('.noinput-p').css('display', 'block');
            return false;
          }
        }
        calcFee();
        calcLoan(el);
      }
    }
  });

  //定投form
  $('#calcFormFixed').validate({
    rules:{
      fixedAmount: {
        required: true,
        isFixedAmount: true
      }
    },
    messages:{
      fixedAmount: {
        required: form.err.required
      }
    },
    submitHandler: function(el){
      calcFixed();
      return false;
    }
  });
  if (range[0] === "") {
    $("#repayDate").rules("add", {
      required: true,
      isIntNum: true,
      isRepayDate: true,
      messages: {
        required: form.err.required,
        isIntNum: form.err.isIntNum
      }
    });
  }

  var calcFixed = function(){
    var offsetTop = $("#calcu-tab").offset().top;
    if(offsetTop){
      $('body,html').animate({
        scrollTop: offsetTop
      }, 800);
    };
    var amount,total, month, rate, ret;
    var holder = $('#calcResult_fixed'),
      template = Handlebars.compile($('#fixed-calc').html());
    amount = $.trim($('#fixedAmount').val());
    rate = 9;
    month = 12;
    earn = amount * (rate/12) * (1+month) * (month/2);
    total = amount * month;
    ret = {
      total: total.toFixed(2),
      amount: amount,
      rate: rate,
      earn: (earn/100).toFixed(2)
    }
    holder.html( template(ret) );
  };

  var calcFee = function () {
    var amount, $tr, $tds, $tds2;
    $tr = $('#ratetable tbody tr');
    amount = $.trim($('#borrowAmount').val());

    $tds = $tr.eq(0).find('td').filter(function () {
      return $(this).text() != '服务费率';
    });
    $tds2 = $tr.eq(1).find('td').filter(function () {
      return $(this).text() != '服务费用';
    });
    if (!amount || amount % 50 !== 0 || amount > 1000000) {
      $.each($tds, function (i) {
        $tds2.eq(i).html('');
      });
    } else {
      $.each($tds, function (i) {
        var v = parseFloat($(this).text().replace('%', ''));
        $tds2.eq(i).html((v * amount * 0.01).toFixed(0));
      });
    }

    $('#J_sjfy').css('color', '#383838');
  };

  var calcLoan = function (el) {
    var calcArr = $(el).serializeArray();
    var res = calc(calc.arrToObj(calcArr));
    var data = res.calc();
    
    data.borrowAmount = $.trim($('#borrowAmount').val())=='' ? 0 : $.trim($('#borrowAmount').val());
    data.gain = 0;
    $.each(data.table, function (k, v) {
      data.gain += parseFloat(v.mlixi);
    });
    data.gain = t._fixedFloat2(data.gain);

    data.monthlyRepayB = t._fixedFloat2(data.monthlyRepay + 0.003 * data.borrowAmount);
    data.mounthRate = t._fixedFloat2(data.mounthRate);
    data.monthlyRepay = isNaN(data.monthlyRepay) ? '0.00' : t._fixedFloat2(data.monthlyRepay);
    data.borrowAmount = t._fixedFloat2(data.borrowAmount);

    res = null;

    var source = $('#loan-calc').html();
    var template = Handlebars.compile(source);
    var J_tit = $('.J_tit').eq(0).text();


    if( J_tit =="借款设置" && data.isShowTable == "false"){
        data.isShowTable = false;
    }else{
        data.isShowTable = true;
    }
    if( J_tit =="理财计算器 "){
      data.isShowTable =$("#isShowTable").is(':checked');
    }

    var html = template(data);
    $('#calcResult').html(html);
    //<span>本金及利息</span>￥<em>t._commaFloat(data.monthlyRepay - 0.003 *data.borrowAmount)</em>&nbsp;&nbsp;(支付给理财人)
    $('#J_BJLX').html("<span>本金及利息</span><em>￥" + t._commaFloat(data.monthlyRepay) + "</em>&nbsp;&nbsp;(支付给理财人)");

    $('#J_JKGLF').html("<span>借款管理费</span><em>￥" + t._commaFloat(0.003 * data.borrowAmount) + "</em>&nbsp;&nbsp;(由人人贷平台收取)");

    if ($('.J_tit').text() == "借款设置") {
      var scroll_offset = $("#calcForm").offset(); //得到pos这个div层的offset，包含两个值，top和left
      $("body,html").animate({
        scrollTop: scroll_offset.top //让body的scrollTop等于pos的top，就实现了滚动
      }, 0);
    }

  };

  //自定义select的按钮事件，点击显示选择
  ///////////////
  //点击其他地方的时候需要关闭弹出的select
  $(document).click(function (e) {
    var target = e.target;
    if ($(target).parent("span").hasClass("arrow")) return;
    if (!$(target).parent("div").hasClass("J_select_btn")) {
      $(".J_popBox").css("display", "none");
    }
    if ($(target).attr('id') != 'touziAmount') {
      $('#J_touziAmount_hint').css('display', 'none');
    }

  });

  $(".J_select_btn").click(function (e) {
    $(".J_popBox").css("display", "none");
    var ul_dom = $(e.currentTarget).parent().find("ul");
    if (ul_dom.css("display") == "block") {
      ul_dom.css("display", "none");
    } else {
      ul_dom.css("display", "block");
    }

  });
  //鼠标划过离开select时候的高亮状态
  $(".J_popBox li").mouseover(function (e) {
    $(e.currentTarget).attr("class", "selected");
  });

  $(".J_popBox li").mouseleave(function (e) {
    $(e.currentTarget).attr("class", "");
  });
  $(".J_popBox li").click(function (e) {
    var value = ($(e.currentTarget).attr("datavalue"));
    var txt = $(e.currentTarget).find("span").text();
    var dom = $(e.currentTarget).parent().parent();
    var rateDict = {
      '3': 10,
      '6': 11,
      '9': 12,
      '12': 12,
      '15': 13,
      '18': 13,
      '24': 13,
      '36': 13
    };
    var yearRate;
    dom.find("input").attr("value", value);
    dom.find(".J_txt").text(txt);
    if (value == 'RRGXD' || value == 'RRSYD' || value == 'RRWSD') {
      location.href = "/borrow/calculator.action?prodType=" + value;
      return false;
    }
    $('.noinput-p').css('display', 'none');
    if ( value && rateDict[value] ) {
      yearRate = rateDict[value];
      $('#yearRate').val(yearRate)
        .parent()
          .find('.error-p').css('display', 'none');
    }
  });

  $('#touziAmount').on('click', function (e) {
    $(e.currentTarget).parent().find('.error').css('display', 'none');
    $('#J_touziAmount_hint').css('display', 'block');
  });

  $('#yearRate,#borrowAmount,.error-p').on('click', function (e) {
    $(e.currentTarget).parent().find('.error-p').css('display', 'none');
  });


  //自定义复选框的点击事件
  $(".J_ui_checkbox").bind('click', function (e) {
    var dom = $(e.currentTarget);
    if (dom.hasClass("uncheck")) {
      dom.removeClass("uncheck");
      dom.addClass("check");
      $("#isShowTable").attr("value", "true");
    } else {
      dom.removeClass("check");
      dom.addClass("uncheck");
      $("#isShowTable").attr("value", "false");
    }
  });

  var showRetSwtichTab = function(e){
    //ui-tab-item-current
    var cls = 'ui-tab-item-current',
      li = $('#calcu-tab li'),
      tabs = $('#J_tab_uplan,#J_tab_loan,#J_tab_fixed'),
      selector_uplan = '#calcResult_u',
      selector_fixed = '#calcResult_fixed',
      selector_loan = '#calcResult,#J_calculator-article',
      selector_all = [selector_uplan, selector_fixed, selector_loan].join(','),
      dom, target;
    var hide = function(el){
      $(el).css('display', 'none');
    },show = function(el){
      $(el).css('display', 'block');
    };
    dom = li.filter('.'+cls);
    // click trigger
    if (e){
      dom =$(e.currentTarget).parent('li');
    }
    li.removeClass(cls);
    dom.addClass(cls);
    target = dom.attr('data-name');

    //hide all
    hide( tabs );
    //show current
    show( '#'+target );

    //hide result
    hide( selector_all );

    if( 'J_tab_uplan' == target){
      show( selector_uplan );
    }
    if( 'J_tab_loan' == target){
      show( selector_loan );
    }
    if( 'J_tab_fixed' == target){
      show( selector_fixed );
    }
  };

  $('#calcu-tab .ui-tab-item-link').on('click',showRetSwtichTab);

  var init = function(){
    showRetSwtichTab();
  };
  init();
});

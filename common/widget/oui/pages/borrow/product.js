define(function (require) {
  var $ = require('jquery'), Widgets = require('widgets/widgets');
  var form = Widgets.Form;
  var products = [];

  var current = 'active';
  var hide = 'hide';



/*  选择产品  */
  function selectProductType(){

    var productType = $('#J_product-type');
    var productList = $('#J_product-list>div');
    var loanProductType = $('#loanProductType');
    var productTitle = $('#J_product-title');
    var current = 'active';
    var hide = 'hide';
    var val = loanProductType.length && loanProductType.val()

    $('li', productType).on('click',function(){

      $(this)
      .siblings().removeClass(current)
      .end()
      .addClass(current);


      productList
      .addClass(hide)
      .eq($(this).index()).removeClass(hide);

      productTitle.text(' - ' + $(this).find('span').text());
      loanProductType.val($(this).attr('data-type')).next().css('display','none');
    }).each(function(idx, o){
      //默认选择已经提交的选择
      if(val && val.length && val == $(o).data('type')){
        $(o).addClass(current);
        productList
          .addClass(hide)
          .eq(idx).removeClass(hide);
      }
    });
  }
  selectProductType();


  // 提示信息
  $('.extra-div-a').on('mouseenter',function(){
    $('.ui-poptip-bx').removeClass(hide);

    var left = $('.extra-div .extra-div-a').position().left;
    $('.extra-div .ui-poptip').css('left',left + 30);

  });

  $('.extra-div-a').on('mouseleave',function(){
    $('.ui-poptip-bx').addClass(hide);
  });

  $('#borrowAmount').on('focus',function(e){
    $('#J_amount_range').text('借款金额范围:3,000-500,000。且为50的倍数');
    $('#J_borrowamount_pop').css('display','block');
  });

  $('#borrowAmount').on('blur',function(e){
    $('#J_borrowamount_pop').css('display','none');
  });

  $('#apr').on('focus',function(e){
    $('#J_yearrate_pop').css('display','block');
  });

  $('#apr').on('blur',function(e){
    $('#J_yearrate_pop').css('display','none');
  });


  //自定义select的按钮事件，点击显示选择

  //点击其他地方的时候需要关闭弹出的select
  $(document).click(function(e){

    var target = e.target;

    if($(target).parent("span").hasClass("arrow")) return;
    if ( !$(target).parent("div").hasClass("J_select_btn")) {
      $(".J_popBox").css("display","none");
    }
  });

  $(".J_select_btn").click(function(e){

    $(".J_popBox").css("display","none");

    var ul_dom =  $(e.currentTarget).parent().find("ul");

    if(ul_dom.css("display")=="block"){
      ul_dom.css("display","none");
    }else{
      ul_dom.css("display","block");
    }
  });

  //鼠标划过离开select时候的高亮状态
  $(".J_popBox").delegate('li','mouseover',function(e){
    $(e.currentTarget).attr("class","selected");
  });

  $(".J_popBox").delegate('li','mouseleave',function(e){
    $(e.currentTarget).attr("class","");
  });

  $(".J_popBox").delegate('li','click',function(e){
    var value = ($(e.currentTarget).attr("datavalue"));
    var txt = $(e.currentTarget).find("span").text();
    var dom =  $(e.currentTarget).parent().parent();
    dom.find("input").val(value);
    dom.find(".J_txt").text(txt);
    if (value =='RRGXD' || value=='RRSYD' || value=='RRWSD' ){
      location.href= "/borrow/calculator.action?prodType="+value;
    }

    if($(e.currentTarget).parent('ul').attr('id') == 'repayTimeul'){switch(value){
      case "3": $('#apr').val('10');
        break;
      case "6": $('#apr').val('11');
        break;
      case "9": $('#apr').val('12');
        break;
      case "12": $('#apr').val('12');
        break;
      case "15": $('#apr').val('13');
        break;
      case "18": $('#apr').val('13');
        break;
      case "24": $('#apr').val('13');
        break;
      case "36": $('#apr').val('13');
        break;
      }
    }
    updateRepayDetail();
    updateRateRange();
  });

  //自定义复选框的点击事件
  $(".J_ui_checkbox").bind('click',function(e){
    var dom =  $(e.currentTarget);
    if( dom.hasClass("uncheck")){
      dom.removeClass("uncheck");
      dom.addClass("check");
      $("#agree_contract").attr("value","true");
      $('#J_error_agree').css("display","none");
    } else{
      dom.removeClass("check");
      dom.addClass("uncheck");
      $("#agree_contract").attr("value","false");
      $('#J_error_agree').css("display","block");
    }
  });

  //计算每月还本息和每月交易管理费
  var updateRepayDetail = function () {
    var amount, apr, repayTime, productId , extraData = {};
    var formatMoney = function(d){
      return Number(d).toFixed(2);
    }
    amount = $.trim($("#borrowAmount").val());
    //apr = $.trim($("#apr").val());
    //apr = apr === "" ? "" : parseFloat(apr);
    repayTime = $("#repayTime").val();

    if (!amount || !repayTime ) {
      return;
    }

    extraData = {amount: amount, apr: apr, repayTime: repayTime};

    $.ajax({
      url: "/borrow/getMonthlyInterest.action",
      data: $.param(extraData),
      type: "POST",
      dataType: 'json',
      success: function (data) {
        $("#monthRepayMoney").html("￥" + formatMoney(data.monthlyRepay));
        $("#managerFee").html("￥" + formatMoney(data.manageFee));
        $("#monthRepayAccont").html("￥" + formatMoney(data.totalMonthlyRepay));
        $("#guaranteeFee").html("￥" + formatMoney(data.guaranteeFee));
      }
    });

  };

  //根据借款金额和费率算实际费用
  var calc = function () {
    var amount, $tr, $tds, $tds2;
    $tr = $("#ratetable tr");
    amount = $.trim($("#borrowAmount").val());
    $tds = $tr.eq(1).find("td").filter(function () {
      return $(this).text() != "服务费率";
    });
    $tds2 = $tr.eq(2).find("td").filter(function () {
      return $(this).text() != "服务费";
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

  $("#borrowAmount,#apr").keyup(function () {
    updateRepayDetail();
    updateRateRange();
    calc();
  });

  //获得产品类型
/*  function getProducts() {
    var $p = $("#productIdul");
    $.ajax({
      url: "/borrow/getProductsByUser.action",
      cache: false,
      dataType: "JSON",
      success: function (data) {
        $p.empty();
        var d = data;
        if (d.vos.length <= 1) {
          $p.parents(".ui-form-item").hide();
        } else {
          $p.parents(".ui-form-item").show();
        }

        $('#productId').attr('value',d.vos[0].id);
        $('#productId').parent('div').find('.J_txt').text(d.vos[0].productName);
        $.each(d.vos, function (n, v) {
          products.push({id: v.id, name: v.productName, loanType: v.loanType, monthInte: $.parseJSON(v.monthlyMinInterest)});
          //$("<option value='" + v.id + "'>" + v.productName + "</option>").appendTo($p);
          $("<li datavalue='" + v.id + "'><span>" + v.productName + "</span></li>").appendTo($p);
        });
        var id =$('#productId').val();
        if (!id) {
          return;
        }


        for (var i = 0; i < products.length; i++) {
          if (id == products[i].id) {
            $("#loanType").html(products[i].loanType);
            var marr = products[i].monthInte;
            var option = "";
            for (var j = 0, len = marr.length; j < len; j++) {
             // option += "<option value='" + marr[j].month + "'>" + marr[j].month + "个月</option>";
              option +=" <li datavalue='" + marr[j].month + "'><span>" + marr[j].month + "个月</span></li>";
            }

            $("#repayTimeul").html(option);
            $('#repayTime').attr('value',marr[0].month);
            $('#repayTime').parent('div').find('.J_txt').text(marr[0].month+'个月');
            break;
          }
        }
        //初始化算一下利率
        updateRateRange();
      }
    });

  }*/

  //计算最底年利率和最高年利率,单独提出来，这里要动态更新
  var updateRateRange = function () {
    var id = $("#productId").val();
    var month = $("#repayTime").val();
    for (var i = 0; i < products.length; i++) {
      if (id == products[i].id) {
        var marr = products[i].monthInte;
        for (var j = 0, len = marr.length; j < len; j++) {
          if (month == marr[j].month) {
            $("#minRate").html(marr[j].minInterest + "%");
            $("#maxRate").html(marr[j].maxInterest + "%");
          }
        }
        break;
      }
    }
  };

  //getProducts();
  //添加一些验证方法
  var range = $("#borrowAmount").data("range").split(",");

  function addViliMethod(form) {
    jQuery.validator.addMethod("isBorrowAmount", function (value, element) {
      return this.optional(element) || (value >= parseInt(range[0], 10) && value <= parseInt(range[1], 10) && value % 50 === 0 && /^(([1-9]{1}\d*)|([0]{1}))?$/.test(value));
    }, "借款金额范围" + range[0] + "-" + range[1] + "，且为50的倍数");

    jQuery.validator.addMethod("isRateOver", function (value, element) {
      //minRate和maxRate是可变的，所以验证也要动态改变
      var minRate = parseFloat(Number($('#minRate').html().replace("%", "")));
      var maxRate = parseFloat(Number($('#maxRate').html().replace("%", "")));
      value = parseFloat(value);
      return (value >= minRate) && (value <= maxRate);
    }, form.err.isRateOver);
  }

  //表单验证
  var vali = form.validate({
    showTip: true,
    tip: {
      borrowTitle: "不超过14字"
      //apr:""
      //borrowAmount: "借款金额范围" + form.comma(range[0]) + "-" + form.comma(range[1]) + "，且为50的倍数"
    },
    before: function (form) {
      addViliMethod(form);
    }
  });

  // 默认自动计算 post 过来的值
  $("#repayTimeul").each(function(i,o){
    var parent = $(o).parent();
    var el = $('#repayTime');
    var text = $('.J_txt', parent);
    var val = el && el.val();
    if (!val.length){
      //默认选择3个月
      val = 3;
      el.val(val);
    }
    $('li', o).each(function(j,li){
      if ( $(li).attr('datavalue') == val ){
        text.text($(li).text());
        return;
      }
    });
    updateRepayDetail();
    updateRateRange();
    calc();
  });

  function valiBorrwType(){
    var el = $('#borrowType'),
      tip = $('#J_tip-borrowType'),
      cls = 'hide';
    console.log('valiBorrwType',el.val().length);
    if(el.val().length){
      tip.addClass(cls);
      return true;
    }
    tip.removeClass(cls);
    return false;
  }

  //其实下面这段本可不要，但后来需求是，用户不能提交一次后要禁用第二次提交而加上的
  $('form').submit(function(){

    var _bValid = valiBorrwType();

    if (!vali.valid() || !_bValid) {
      return false;
    }

    if($('#agree_contract').attr('value') != 'true'){
      $('#J_error_agree').css("display","block");
      return false;
    }

    this.submit();

    $(this).find(":submit").attr("disabled","disabled");
    return false;
  });

});
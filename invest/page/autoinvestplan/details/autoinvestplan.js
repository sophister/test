
  var $ = require('jquery');
  var Tip = require('tip');
  var Common = require('common');
  var Protocol = require('protocol');
  var Widgets = require('widgets');
  var Components = require('components');
  var Dialog = require('dialog');
  var Handlebars = require('handlebars');
  var GoTop = Widgets.GoTop();
function basic(){
  var succeeded = $('#pg-helper-success-hint').html();
  var failed = $('#pg-helper-fail-hint').html();
  if(succeeded){
      var succeededjson  = $.parseJSON(succeeded);
      if (succeededjson) {
        showMessage.succeeMsg({
          title: '加入成功',
          planName:succeededjson.data.planName,
          lockPeriod:succeededjson.data.lockPeriod,
          finalAmount:succeededjson.data.finalAmount,
          labels:succeededjson.data.labels
        });
        $(".J_target-list li").not('.target-ipt').on('click',function(){
          $(".J_target-list li").not('.target-ipt').removeClass('active');
          $(this).addClass('active');
          $("input[name='tagStr']").val($(this).text());
          if($(this).hasClass('J_author-target')){
            $('.target-ipt').removeClass('fn-hide');
          }else{
            $('.target-ipt').addClass('fn-hide');
          }
        });
        $('.ui-message-sure-button').click(function() {
          if($(".J_author-target").hasClass("active")){
            if($(".target-ipt input").val()==""){
              $("input[name='tagStr']").val("薪");
            }else if($(".target-ipt input").val().length>64){
              $(".target-error").text("标签不能超过64个字").show();
              return;
            }else{
              $("input[name='tagStr']").val($(".target-ipt input").val());
            }
          }
          if($("input[name='tagStr']").val()){
            $.ajax({
              url: '/autoinvestplan/customNameAutoInvestPlan.action',
              type: 'POST',
              data: {
                autoInvestPlanIdStr: $("input[name='autoInvestPlanSubPointIdStr']").val(),
                tagStr: $("input[name='tagStr']").val()
              },
              success: function(data){
                if(data.status==1){
                  $(".target-error").text(data.message).show();
                }else{
                  location.reload();
                }
              }
            });
          }else{
            location.reload();
          }
        });
      }
    }

    if(failed){
        var failedjson  = $.parseJSON(failed);
        if(failedjson){
          showMessage.failedMsg({
            title: '失败',
            failMsg:failedjson.data.message
          });
        }
     }

    var data;
    var authenticated = $('#authenticated').text() == 'true';
    var qualified = $('#pg-helper-is-investor').text() == 'true';
    var qualMsg = $('#pg-helper-be-investor-message').html();
    var $fullTime = $("#fullTime");
    var $university = $('#university');
    if ($fullTime.length) {
      var fullTimeData = $fullTime.data('time');
      var day = fullTimeData.match(/(\d+)天/);
      day = day !== null ? Number(day[1]) : day;
      if (day > 0) {
        $fullTime.html(fullTimeData.split("分")[0] + "分");
      } else {
        $fullTime.html(fullTimeData.split("天")[1]);
      }
    }
    if ($university.length) {
      var universityData = $university.data('data');
      if (!universityData.length) {
        $university.html('--');
      } else if (universityData.length > 6) {
        $university.html(universityData.substring(0, 6) + '...');
      } else {
        $university.html(universityData);
      }
    }

    /* Initialize investment terminal */
    var maxAccount = parseFloat($('#max-account').data('account'), 10);

    if ($('#pg-helper-has-withdraw-password').length > 0) {
      var hasBankPwd = $('#pg-helper-has-withdraw-password').text() == 'true';
      qualified = hasBankPwd && qualified;
    }

    var termConf = {
      container: $('#investment-terminal'),
      authenticated: authenticated,
      qualified: qualified,
      qualifiedMessage: qualMsg
     // maxAccount: maxAccount
    };

    var planStatus = $("#plan-status").text();
    var maxAmount, maxShares, amountPerShare;
    var maxAmount = parseInt($('#max-amount-1').data('amount'), 10);
    var minAmount = parseInt($('#min-amount-1').data('amount'), 10);
    amountPerShare = $('#share-amount').attr('data-share-amount');

    $.extend(termConf, {
      plan: { status: planStatus },
      page: 'autoinvest-join',
      unit: 'amount',
      template: $('#confirm-autoinvest-in-template'),
      amountPerShare: amountPerShare,
      maxAmount: maxAmount,
      minAmount: minAmount
    });

    new Components.InvestmentTerminal(termConf).init();

    /* Fixes for Finance Plan */
    if ($('#autoinvest-basic').length > 0) {
      var products = $('#autoinvest-basic-products').data('products').split(',');
      var s = {};
      $.each(products, function (i, v) {
        v = $.trim(v);
        if (v == '信用认证标' || v == '信用标') {
          s.XYRZ = '信用认证标';
        }
        else if (v == '机构担保标') {
          s.JGDB = v;
        }
        else if (v == '实地认证标') {
          s.SDRZ = v;
        }
        else if (v == '智能理财标') {
          s.ZNLC = v;
        }
      });
      data = { products: [] };
      $.each(s, function (k, v) {
        data.products.push({ product: k, productName: v });
      });
      Common.fillTemplate({
        container: $('#autoinvest-basic-products'),
        template: $('#autoinvest-basic-products-template'),
        data: data
      });

     // var er = $('#expected-rate').data('value').toString();
      //$('#expected-rate').children('em').text(er.replace(/%/g, '').replace('-', ' - '));

      var time = $('#plan-begin-selling-time').data('time');
      if (time) {
        $('#plan-begin-selling-time').text(time.substring(0, 19));
      }
    }


    /**
     * Details
     */

    var initializeRecords = function (name, api, params) {
      var list = new Widgets.List({
        name: name,
        api: api,
        title: true,
        params: params,
        container: $('#' + name + '-records'),
        rendered: function (rsp) {
          var status = rsp.status, data = rsp.data, t = Protocol.translator;
          if (status === 0 && api == Protocol.API.getAutoinvestJoinedRecords) {
            $('#joined-count').text(data.jsonList.length);
            var hadpay = 0;
            $.each(data.jsonList, function(k, v) {
              hadpay += Number(v.amount.replace(/,/g,"") ) ;
              });
            var payAmo = Math.round(hadpay*100/data.jsonList.length)/100;
            if(data.jsonList.length==0){
              payAmo = 0;
            }
            
            $("#reserve-had-pay-amount").html(payAmo);
          }
        }
      }).init();
      list._update(list.getParams());
      return list;
    };
    /**
     * Details - Plan
     */

    if ($('#autoinvest-basic').length > 0) {
      var autoinvestId = $('#pg-helper-plan-id').text(),
        joined = null,
        clickTimer = null;

      new Widgets.Tab({
        name: 'autoinvest',
        switched: function (from, to, initialized) {
          if (initialized) {
            return true;
          }
          if (to == 'joined') {
            joined = initializeRecords('joined', Protocol.API.getAutoinvestJoinedRecords, { autoInvestPlanId: autoinvestId });
          }
          return true;
        },
        clicked: function (to, initialized) {
          if (!clickTimer) {
            if (to == 'joined' && initialized && joined) {
              joined._update(joined.getParams());
            }
          }
          clickTimer = window.setTimeout(function () {
            window.clearTimeout(clickTimer);
            clickTimer = null;
          }, 750);
        }
      }).init();
    }

    if ($("#tipCon").length && $("#tips").length) {
      new Tip({
        element: '#tipCon',
        trigger: '#tips',
        direction: 'right'
      });
    }
    if ($("#tipCon_0").length && $("#tips_0").length) {
      new Tip({
        element: '#tipCon_0',
        trigger: '#tips_0',
        direction: 'right'
      });
    }
    if ($("#tipCon_1").length && $("#tips_1").length) {
      new Tip({
        element: '#tipCon_1',
        trigger: '#tips_1',
        direction: 'right'
      });
    }
  };//初始执行函数

  var showMessage = {
        isIE6: function() {
          var ua = (window.navigator.userAgent || "").toLowerCase();
          return ua.indexOf("msie 6") !== -1;
        },
        succeeMsg : function(data, afterhide, aftershow) {
          var html, $tpl = $('#joined-succee-message');
          if ($tpl.length < 1) {
            return;
          }
          data = typeof data === 'string' ? { message: data } : data;
          html = Common.fillTemplate({ template: $tpl, data: data });

          if (this.isIE6()) {
            $('.pg-container-content').prepend(html);
            $('.ui-message-close-button').click(function() {
              $('.ui-message-content').remove();
            });
          }
          else {
            new Dialog({ content: html }).after('hide', function() {
              this.destroy();
              if(afterhide && $.isFunction(afterhide)){
                afterhide.call(this);
              }
            }).after('show', function() {
                var self = this;
                $('.ui-message-close-button').click(function() {
                  self.hide();
                });
                if(aftershow && $.isFunction(aftershow)){
                  aftershow.call(this);
                }
              }).show();
          }
        },
        failedMsg : function(data, afterhide, aftershow){
          var html, $tpl = $('#joined-failed-message');
          if ($tpl.length < 1) {
            return;
          }
          data = typeof data === 'string' ? { message: data } : data;
          html = Common.fillTemplate({ template: $tpl, data: data });
          if (this.isIE6()) {
            $('.pg-container-content').prepend(html);
            $('.ui-message-close-button').click(function() {
              $('.ui-message-content').remove();
            });
          }
          else {
            new Dialog({ content: html }).after('hide', function() {
              this.destroy();
              if(afterhide && $.isFunction(afterhide)){
                afterhide.call(this);
              }
            }).after('show', function() {
                var self = this;
                $('.ui-message-close-button').click(function() {
                  self.hide();
                });
                if(aftershow && $.isFunction(aftershow)){
                  aftershow.call(this);
                }
              }).show();
          }
        }
  }


 

 function details(){
		foot();
 }
 function foot(){
 		footListInit();
 }
 
function footListInit(){
	  new Widgets.List({
	    name: "autoinvest-list",
	    api: Protocol.API.getAutoinvestPlans,
	    filter: false,
	    header: true,
	    pagination: false,
	    rendered: null
  }).init()._update();
}

var init = {
  basic:basic,
  details:details
}

module.exports = init;
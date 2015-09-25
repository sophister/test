define('common:widget/oui/pages/invest/details', ['require', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/arale/tip/1.1.4/tip', 'common:widget/oui/common', 'common:widget/oui/protocol', 'common:widget/oui/widgets/widgets', 'common:widget/oui/components/components.jscomponents', 'common:widget/oui/arale/dialog/1.3.3/dialog', 'common:widget/oui/lib/handlebars/1.0.0/handlebars'],function (require) {

  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery');

  $(function () {

    var Tip = require('common:widget/oui/arale/tip/1.1.4/tip');
    var Common = require('common:widget/oui/common');
    var Protocol = require('common:widget/oui/protocol');
    var Widgets = require('common:widget/oui/widgets/widgets');
    var Components = require('common:widget/oui/components/components.jscomponents');
    var Dialog = require('common:widget/oui/arale/dialog/1.3.3/dialog');
    var Handlebars = require('common:widget/oui/lib/handlebars/1.0.0/handlebars');
    require('common:widget/oui/lib/handlebars/1.0.0/handlebars');
    var succeeded = $('#pg-helper-success-hint').html();
    if(succeeded){
      var succeededjson  = $.parseJSON(succeeded);
      if (succeededjson) {
        Common.showMessage2({
          title: 'U计划预定成功！',
          depositAmount:succeededjson.data.depositAmount,
          endPaymentTime:succeededjson.data.endPaymentTime,
          overplusAmount:succeededjson.data.overplusAmount,
          button: {
            link: '/account/invest!plan.action?planTab=RESERVATIONS',
            text: '立即支付'
          }
        });
      }

    }
    var GoTop = Widgets.GoTop();

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
      var trueTime = fullTimeData;
      if (day > 0) {
      	trueTime = fullTimeData.split("分")[0] + "分";    
      } else {
        trueTime = fullTimeData.split("天")[1];
      }
      trueTime = trueTime.replace(/(\d)+/g,function($1){
      	 return "<i class='num-family font-30px'>"+$1+"</i>" ;
      });
      $fullTime.html(trueTime);
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
    /**
     * Basic
     */

    /* Initialize counter if exists */
    var $counter = $('#counter');
    if ($counter.length > 0) {
      new Widgets.Counter({
        container: $counter,
        delta: parseInt($counter.data('delta'), 10)
      }).init();

      if (!$('#counter').hasClass('ui-counter-seconds')) {
        $('#counter').parent().children('.suffix').show();
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

    var maxAmount, maxShares, amountPerShare;
    if ($('#pg-loan-invest').length > 0) {
      maxAmount = parseInt($('#max-amount').data('amount'), 10);
      $.extend(termConf, {
        page: 'loan-invest',
        unit: 'amount',
        template: $('#confirm-loan-template'),
        amountPerShare: $("#loan-type").val()=="cf" ? 1000 : 50,
        maxAmount: maxAmount,
        maxShares: maxAmount /amountPerShare
      });
    }
    else if ($('#pg-loan-transfer').length > 0) {
      maxShares = parseInt($('#max-shares').data('shares'), 10);
      amountPerShare = parseFloat($('#amount-per-share').data('amount-per-share'), 10);
      $.extend(termConf, {
        page: 'loan-transfer',
        unit: 'shares',
        template: $('#confirm-transfer-in-template'),
        amountPerShare: amountPerShare,
        maxAmount: maxShares * amountPerShare,
        maxShares: maxShares,
        utmSourceTransfer : $("#loan-type-tr").val()=="cf" ? true : false
      });
    }
    else if ($('#pg-plan-join, #pg-plan-index').length > 0) {
      var planStatus = $("#plan-status").text();
      var ma1 = parseInt($('#max-amount-1').data('amount'), 10);
      var ma2 = parseInt($('#max-amount-2').data('amount'), 10);
      maxAmount = ma1 > ma2 ? ma2 : ma1;
      amountPerShare = $('#share-amount').attr('data-share-amount');
      var fee = parseFloat($('#fee-rate').data('fee-rate'), 10) / 100;
      var deposit = parseFloat($('#deposit-rate').data('deposit-rate'), 10) / 100;

      var maxda =  Number($('#J_thisMaxDepositAmount').attr('data'));
      var maxall = Number($('#J_maxDepositAmount').attr('data'));

      if(deposit>maxda){
          deposit = maxda;
      }else if(deposit >maxall){
          deposit = maxall;
      }

      $.extend(termConf, {
        plan: { status: planStatus },
        page: 'plan-join',
        unit: 'amount',
        template: planStatus == 'RSV' ? $('#confirm-plan-reserve-template') : $('#confirm-plan-join-template'),
        amountPerShare: amountPerShare,
        maxAmount: maxAmount,
        maxShares: maxAmount / amountPerShare,
        fee: fee,
        deposit: deposit
      });
    }

    new Components.InvestmentTerminal(termConf).init();

    /* Fixes for Finance Plan */
    if ($('#plan-basic').length > 0) {
      var products = $('#plan-basic-products').data('products').split(',');
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
        container: $('#plan-basic-products'),
        template: $('#plan-basic-products-template'),
        data: data
      });

      if (authenticated) {
        var accounts = Protocol.translator.translate(
          Protocol.API.getUserBankInfo,
          Common.loadJSON('#account-info-rsp', true).data
        );
        Common.fillTemplate({
          container: $('#select-bank-accounts'),
          template: $('#select-bank-accounts-template'),
          data: accounts
        });
      }

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
          if (status === 0 && api == Protocol.API.getLoanInvestmentRecords) {
            $('#investor-count').text(data.lenderRecords.length);
          }
          if (status === 0 && api == Protocol.API.getLoanLenderRecords) {
            $('#loan-buyer-count').text(data.lenders.length);
          }
          if (status === 0 && api == Protocol.API.getLoanTransferRecords) {
            $('#loan-done-amount').text(t._commaFloat(data.account));
            $('#loan-left-amount').text(t._commaFloat(data.noAccount));
          }
          if (status === 0 && api == Protocol.API.getLoanCollectionRecords) {
            if (data.dunInfoList.length === 0) {
              $('#collection-records').parent().remove();
            }
          }
          if (status === 0 && api == Protocol.API.getLoanRepaymentRecords) {
            $('#repayment-done-amount').text(t._commaFloat(data.repaid));
            $('#repayment-left-amount').text(t._commaFloat(data.unRepaid));
          }
          if (status === 0 && api == Protocol.API.getPlanJoinedRecords) {
            $('#joined-count').text(data.jsonList.length);
            var hadpay = 0;
            $.each(data.jsonList, function(k, v) {
              hadpay += Number(v.amount.replace(/,/g,"") ) ;
              });
            $("#reserve-had-pay-amount").html(hadpay);
          }
          if (status === 0 && api == Protocol.API.getPlanReserveRecords) {
            var notpay = 0;
            $.each(data.rsvList, function(k, v) {
              if (v.status == '未支付') {
                notpay += v.planAmountNotComma;
              }
            });

            $("#reserve-not-pay-amount").html(notpay);
            $('#reserve-count').text(data.rsvList.length);
          }
        }
      }).init();
      list._update(list.getParams());
      return list;
    };

    /**
     * Details - Loan
     */

    if ($('#loan-details').length > 0) {
      var loanId = $('#pg-helper-loan-id').text();

      /* Fix large numbers in credit records */
      $.each($('.pg-helper.large-number'), function (i, elem) {
        var $elem = $('#' + $(elem).data('name')),
          amount = $(elem).text(),
          $num = $elem.children('em'),
          $pfx = $elem.children('.prefix'),
          $sfx = $elem.children('.suffix');
        if (!amount) {
          $num.text('0');
        }
        else {
          var amountFloat = parseFloat(amount, 10);
          var amountInt = parseInt(Protocol.translator._bankersRound(amountFloat / 100) * 100, 10);
          if (amountInt != amountFloat || amountFloat >= 100000) {
            $pfx.text('约');
          }
          if (amountInt >= 100000) {
            if ($pfx.length > 0) {
              amountInt = Math.floor(amountInt / 10000);
              $num.text(amountInt);
            }
            else {
              $num.text(Protocol.translator._fixedFloat2(amountInt / 10000));
            }
            $sfx.text('万元');
          }
          else {
            $num.text(amountInt);
          }
        }
      });

      /* Fix empty items */
      $.each($('.maybe-empty'), function (i, elem) {
        if (!$(elem).text()) {
          $(elem).text('-');
        }
      });

      /* Render verification */
      Common.fillTemplate({
        container: $('#verification-container'),
        template: $('#credit-info-template'),
        data: $('#credit-info-data'),
        api: Protocol.API.getCreditInfo,
        isResponse: true
      });

      Common.fillTemplate({
        container: $('#verification-container2'),
        template: $('#credit-info-template2'),
        data: $('#credit-info-data'),
        api: Protocol.API.getCreditInfo,
        isResponse: true
      });

      /* Render comments */
      var rsp, list;
      rsp = Common.loadJSON('#comments-data', true);
      // data = Protocol.translator.translate(Protocol.API.getCommentsOnLoan, rsp.data);

      if ($('#comments').length) {
        list = new Widgets.List({
          api: Protocol.API.getCommentsOnLoan,
          name: 'comments',
          container: $('#comments'),
          template: $('#comments-template'),
          params: { loanId: loanId },
          pagination: true
        }).init(rsp);
      } else {
        list = new Widgets.List({
          api: Protocol.API.getCommentsOnLoan,
          name: 'comment',
          container: $('#comments2'),
          template: $('#comments-template2'),
          params: { loanId: loanId },
          pagination: true
        }).init(rsp);
      }
      /* Initialize comment posting */
      var $post = $('#comment-post'), $content = $('#comment-content');
      $content.focus(function () {
        $('.comment-msg').empty();
      });
      $post.click(function () {
        var content = $content.val();
        var $msg = $(this).siblings('.comment-msg');
        if ($post.hasClass('disabled')) {
          return;
        }
        if (!qualified) {
          Common.showMessage({
            info: true,
            title: '请完善安全设置',
            message: '在使用该功能前，请先完成<em>实名认证</em>和<em>交易密码</em>设置。',
            button: { link: '/account/info!security.action', text: '去设置' }
          });
          return;
        }
        if (!content) {
          $msg.text('留言内容不能为空！');
          return;
        } else if (content.length > 500) {
          $msg.text('留言字数不能超过500字！');
          return;
        }
        else {
          var params = { id: loanId, threadId: '0', comment: content };
          $post.addClass('disabled');
          var $loading = $('<li><img src="/static/img/loading.gif" /> </li>');
          $("#comments").prepend($loading);
          Protocol.postCommentOnLoan(params, function (status, msg, data) {
            if (status === 0) {
              list.add(data.comment, true, $('#comment-template'));
              $content.val('');
            }
            else {
              Common.showMessage(msg);
            }
            $loading.remove();
            $post.removeClass('disabled');
          });
        }
      });

      /* Initialize comment posting */
      var $post2 = $('#comment-post2'), $content2 = $('#comment-content2');
      $post2.click(function () {
        var content = $content2.val();
        if ($post2.hasClass('disabled')) {
          return;
        }
        if (!qualified) {
          Common.showMessage({
            info: true,
            title: '请完善安全设置',
            message: '在使用该功能前，请先完成<em>实名认证</em>和<em>交易密码</em>设置。',
            button: { link: '/account/info!security.action', text: '去设置' }
          });
          return;
        }
        if (!content) {
          return;
        }
        else {
          var params = { id: loanId, threadId: '0', comment: content };
          $post.addClass('disabled');
          Protocol.postCommentOnLoan(params, function (status, msg, data) {
            if (status === 0) {
              list.add(data.comment, true, $('#comment-template2'));
              $content2.val('');
            }
            else {
              Common.showMessage(msg);
            }
            $post2.removeClass('disabled');
          });
        }
      });

      $(document).on('focus', '.ui-reply-textarea', function () {
        $('.msg').empty();
      });
      $(document).on('click', '.ui-comments-reply', function () {
        if (!qualified) {
          Common.showMessage({
            info: true,
            title: '请完善安全设置',
            message: '在使用该功能前，请先完成<em>实名认证</em>和<em>交易密码</em>设置。',
            button: { link: '/account/info!security.action', text: '去设置' }
          });
          return;
        }
        var commentId = $(this).data('commentid');
        $(this).hide().siblings('.ui-comments-cancel').show();
        $form = $(this).parents('.comments-message-info').find('form').show();
        $form.find('.replaybt').unbind().on('click', function (e) {
          var $this = $(this);
          var comment = $.trim($form.find('textarea').val());
          e.preventDefault();
          if (!comment) {
            $this.siblings('.msg').html('回复不能为空！');
            return;
          } else if (comment.length > 500) {
            $this.siblings('.msg').html('回复字数不能超过500字！');
            return;
          }
          $this.attr('disabled', 'disabled');
          var params = { id: loanId, threadId: commentId, comment: comment };
          var $loading = $('<li><img src="/static/img/loading.gif" /> </li>');
          var $dl = $form.parents('.comments-message-info').find('dl').prepend($loading);
          Protocol.postCommentOnLoan(params, function (status, msg, data) {
            if (status === 0) {
              var html = Common.fillTemplate({data: data.comment, template: $('#replay-template')});
              $dl.prepend(html);
            }
            else {
              Common.showMessage(msg);
            }
            $loading.remove();
            $('.ui-reply-textarea').val('');
            $this.removeAttr('disabled').siblings('.msg').empty();
            $form.hide().parent().find('.ui-comments-cancel').hide().end().find('.ui-comments-reply').show();
          });
        });
      });

      $(document).on('click', '.ui-comments-cancel', function () {
        $(this).hide().siblings('.ui-comments-reply').show().parent().siblings('form').hide();

      });
      /* Initialize tabs */
      new Widgets.Tab({
        name: 'loan',
        switched: function (from, to, initialized) {
          if (initialized) {
            return true;
          }
          if (to == 'investment') {
            initializeRecords('investment', Protocol.API.getLoanInvestmentRecords, { loanId: loanId });
          }
          if (to == 'repayment') {
            initializeRecords('repayment', Protocol.API.getLoanRepaymentRecords, { loanId: loanId });
            initializeRecords('collection', Protocol.API.getLoanCollectionRecords, { loanId: loanId });
          }
          if (to == 'transferred') {
            initializeRecords('lender', Protocol.API.getLoanLenderRecords, { loanId: loanId });
          }
          if (to == 'transfer') {
            initializeRecords('transferred', Protocol.API.getLoanTransferRecords, { loanId: loanId });
          }
          return true;
        }
      }).init();
      new Widgets.Tab({
          name: 'loan',
          switched: function (from, to, initialized) {
            if (initialized) {
              return true;
            }
          if (to == 'investment2') {
            initializeRecords('investment2', Protocol.API.getLoanInvestmentRecords, { loanId: loanId });
          }
          if (to == 'repayment2') {
            initializeRecords('repayment2', Protocol.API.getLoanRepaymentRecords, { loanId: loanId });
            initializeRecords('collection2', Protocol.API.getLoanCollectionRecords, { loanId: loanId });
          }
          if (to == 'transferred2') {
            initializeRecords('lender2', Protocol.API.getLoanLenderRecords, { loanId: loanId });
            initializeRecords('transferred2', Protocol.API.getLoanTransferRecords, { loanId: loanId });

            $('.transfer-info-switch').click(function () {
              $(this).children('span').toggle();
              $('.summary-lenders, .summary-transrec').toggle();
              $('#lender2-records, #transferred2-records').toggle();
            });
          }
          return true;
        }
      }).init();
    }


    /*
    if($(".ui-termRsv-form").length){
      $(".ui-termRsv-form").submit(function(e){
        e.preventDefault();
        var data = {};
        data.action = $(this).attr('action');
        data.amount = $(this).find("input[type='text']").val();
        data.id = $(this).data("id");
        data.restAmount = data.amount * 0.9;
        var source = $("#confirm-plan-reserve-template").html();
        var template = Handlebars.compile(source);
        var html = template(data);

        new Dialog({
          width: '580px',
          height:'540px'
        }).before('show',function () {
            this.set('content', html);
          }).show();
      });
    }*/

    /**
     * Details - Plan
     */

    if ($('#plan-details').length > 0) {
      var planId = $('#pg-helper-plan-id').text(),
        joined = null,
        clickTimer = null;

      new Widgets.Tab({
        name: 'plan',
        switched: function (from, to, initialized) {
          if (initialized) {
            return true;
          }
          if (to == 'reserve') {
            joined = initializeRecords('reserve', Protocol.API.getPlanReserveRecords, { financePlanStr: planId });
          }
          if (to == 'joined') {
            joined = initializeRecords('joined', Protocol.API.getPlanJoinedRecords, { financePlanStr: planId });
          }
          if (to == 'performance') {
            new Components.PlanPerformance({
              name: 'performance',
              planId: planId
            }).init();
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
    if ($("#tipCon_2").length && $("#tips_2").length) {
      new Tip({
        element: '#tipCon_2',
        trigger: '#tips_2',
        direction: 'down',
        arrowShift: -22
      });
    }
  });



  function formatSeconds(value,divid,sta) {
   var theTime = parseInt(value,10);// 秒
   var theTime1 = 0;// 分
   var theTime2 = 0;// 小时
   var theTime3 = 0;// 天

   if(theTime > 60) {
   theTime1 = parseInt(theTime/60,10);
   theTime = parseInt(theTime%60,10);
   if(theTime1 > 60) {
   theTime2 = parseInt(theTime1/60,10);
   theTime1 = parseInt(theTime1%60,10);
   }
   if(theTime2 > 24) {
    theTime3 = parseInt(theTime2/24,10);
    theTime2 = parseInt(theTime2%24,10);
  }
   }
   var result = "",text="";

   if(theTime3 > 0) {
    result = ""+parseInt(theTime3,10)+"天"+parseInt(theTime2,10)+"时";
   }else if(theTime2 > 0){
    result = ""+parseInt(theTime2,10)+"时"+parseInt(theTime1,10)+"分";
   }else{
    result = parseInt(theTime1,10)+"分"+parseInt(theTime,10)+"秒";
   }

   if(divid=='#J_WAIT_BUTTON'){
    result = "";
    
    if(theTime3 > 0) {
     result = ""+parseInt(theTime3,10)+"天"+parseInt(theTime2,10)+"时" +parseInt(theTime1,10)+"分";
    }else{
     result = ""+parseInt(theTime2,10)+"时"+parseInt(theTime1,10)+"分" +parseInt(theTime,10)+"秒";
    }

    $(divid).css('letter-spacing','0');
    if(sta === "0"){
     text="后开始预定";
    }
    if(sta === "3"){
     text="开始加入";     
    }
   }else{

	   if(sta === "0"){
	   		text="后开始预定";
	   }
	   if(sta === "3"){
	    	text="开始加入";     
	   }
   }
    result = trueTime.replace(/(\d)+/g,function($1){
      	 return "<i class='num-family font-30px'>"+$1+"</i>" ;
    })
   $(divid).html(result);
   if($("#J_WAIT_BUTTON_TEXT")) $("#J_WAIT_BUTTON_TEXT").html(text);
   }

function ticksownTimeBtn(){
 var id ='#J_WAIT_BUTTON';

 if($(id).length <=0 ||  ($(id).attr("data")!== "3" && $(id).attr("data")!== "0") || $(id).attr("data1") === "-1"){
   return false;
  }
  var totaltime = $(id).attr("data1") ;
    var timeid= setInterval(
     function(){
      totaltime = totaltime-1;
      formatSeconds(totaltime,'#J_WAIT_BUTTON',$('#J_WAIT_BUTTON').attr("data"));
      if(totaltime<=0){
       clearInterval(timeid);
       location.reload();
      }
     },
     1000);
 }

ticksownTimeBtn();

$('.J_click_p').on('click',function(e){
    var id = $(e.target).get(0).tagName == 'P' ? $(e.target).attr('data') : $(e.target).parent('.J_click_p').attr('data');
    location.href="/financeplan/listPlan!detailPlan.action?financePlanId="+id;
});

});
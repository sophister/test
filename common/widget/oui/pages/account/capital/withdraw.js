define(function (require) {

  var $ = require('jquery'),
    RSAencript = require('rsa'),
    Dialog = require('dialog'),
    Handlebars = require('handlebars'),
    Tip = require('tip'),
    Common = require('common'),
    Widgets = require('widgets/widgets');
  var form = Widgets.Form;

  $(function () {
    $(".J_change_card").on("click",function(){
      changeCardBtn();
      $(".J_card_list").toggleClass("fn-hide");
    });
    $("#withdrawAmount").val('');
    $("#cashPassword").val('');
    getCash();
    var data = $("#withdraw-list-rsp").html();
    data = $.parseJSON(data);
    var userBanks = [];
    var userBanksList = {};
    if(data.data.userBanks.length!=0){
      $(".J_no_bank").addClass("fn-hide");
      $(".J_default-bank").removeClass("fn-hide");
      for(var i=0;i<data.data.userBanks.length;i++){
        var d = data.data.userBanks[i];
        var obj = {};
        obj.userBankId = d.userBankId;
        obj.bankCode = d.bankCode;
        obj.tailNumber = d.dealCardId.slice(-4);
        obj.bankNumber = "**** **** **** "+ d.dealCardId.slice(-4);
        obj.isFailLastCashDraw = d.isFailLastCashDraw;
        obj.cordIndex = i;
        userBanks.push(obj);
      }
      userBanksList.userBanks = userBanks;
      checkedCard(userBanks[0]);
      var source = $("#withdraw-list-template").html();
      var template = Handlebars.compile(source);
      var html = template(userBanksList);
      $("#J_banklis").append(html);
    }
    
    //点击其他地方的时候需要关闭弹出的select
    $(document).click(function(e){
      var target = e.target;
      if ( !$(target).parent("a").hasClass("J_change_card") && !$(target).hasClass("J_change_card")) {
        $(".J_card_list").addClass("fn-hide");
        $(".J_change_card").find("span").text("更换");
        $(".J_change_card").find("i").removeClass("active");
      }
    });
    
    $(".J_card_list").on("click", "a.bankli", function () {
      //li是在页面加载后创建所以只能动态获取
      $(".J_card_list").addClass("fn-hide");
      changeCardBtn();
      checkedCard(userBanks[$(this).data("index")]);
    });
    function checkedCard(obj){
      var con = [];
      con.push('<div class="bank-logo"><img src="../../../../static/img/banks35/code_'+obj.bankCode+'.jpg" /></div>');
      con.push('<span class="card-tail-number">'+obj.tailNumber+'</span>');
      $('.bank-logo,.card-tail-number','.J_default-bank').remove();
      $('.J_default-bank').prepend(con.join(''));
      if(obj.isFailLastCashDraw){
        $('.J_error-tips').removeClass('fn-hide');
      }else{
        $('.J_error-tips').addClass('fn-hide');
      }
      $("#userBankId").data("index",obj.cordIndex).val(obj.userBankId);
    }
    
    form.validate({
      before: function () {
        //验证账户余额是否充足
        jQuery.validator.addMethod("isEnough", function (value, element) {
          return this.optional(element) || parseFloat($("#totalAmount").val()) >= 0.00;
        }, form.err.required);
      },
      validateData: {
        submitHandler: function (el) {
          $(el).find("input[name=cashPassword]").val(RSAencript($(el).find("input[name=cashPassword]").val()));
          if(!(/^[0-9]*(\.[0-9]{1,2})?$/).test($("#withdrawAmount").val())){
            form.msg("#subWithdraw","请输入正确的金额", "warn");
            $("#withdrawAmount").focus();
            $("#cashPassword").val('');
             return false;
          }
          if(parseFloat($("#canUseCash").val())-parseFloat($("#withdrawAmount").val())<0){
            form.msg("#subWithdraw","您的账户余额不足", "warn");
            $("#withdrawAmount").focus();
            $("#cashPassword").val('');
            return false;
          }
          $("#J_sureWithdraw").show();
          new Dialog({
            width:'650px',
            content:$("#J_sureWithdraw")
          }).after('hide',function(){
            $("#cashPassword").val('');
          }).after('show',function(){
            var dialog = this;
            var data = userBanks[$("#userBankId").data("index")];
            $(".J_bankNumber").text(data.bankNumber);
            $(".J_bankLogo").attr("src","../../../../static/img/banks30/code_"+data.bankCode+".jpg");
            //删除成功 关闭
            $(".J_close","#J_sureWithdraw").click(function(){
              dialog.hide();
            });
            var isSubmit = false;
            $(".J_submit_btn").click(function(){
              if(isSubmit) return;
              isSubmit = true;
              form.ajaxSubmit($(el), {
                msgafter: "#subWithdraw",
                success: function (data) {
                  dialog.hide();
                  $(el).find("input[name=cashPassword]").val('');
                  if (data.status === 0) {
                    $("#J_apply_success").show();
                    new Dialog({
                      width:'650px',
                      content:$("#J_apply_success")
                    }).after('show',function(){
                      var _dialog = this;
                      //删除成功 关闭
                      $(".J_close","#J_apply_success").click(function(){
                        _dialog.hide();
                      });
                    }).after('hide',function(){
                      location.reload();
                    }).show();
                  }else{
                    this.msg(data.message, "warn");
                  }
                }
              });
            });
          }).show();
        }
      }
    });

    //更换银行卡按钮切换
    function changeCardBtn(){
      var txt = $(".J_change_card").find("span").text()=="更换"?"收起":"更换";
      $(".J_change_card").find("span").text(txt);
      $(".J_change_card").find("i").toggleClass("active");
    };
    
    
    //添加银行卡
    $(".addBank").on("click",function(){
      if(userBanks.length>=10){
        $("#J_moreTenCards").show();
        new Dialog({
          width:'650px',
          content:$("#J_moreTenCards")
        }).after('show',function(){
          var dialog = this;
          //删除成功 关闭
          $(".J_close","#J_moreTenCards").click(function(){
            dialog.hide();
          });
        }).show();
      }else{
        new Dialog({
          trigger: '.addBank',
          height: '595px',
          width: '650px'
        }).before('show', function () {
          this.set('content', this.activeTrigger.attr('href'));
        }).after('hide', function () {
          this.destroy();
        }).show();
      }
      return false;
    });
    //placeholder提示
    $(".ui-term-placeholder").click(function(){
      $("#withdrawAmount").focus();
    });
    $("#withdrawAmount").focusin(function(){
      if($(".ui-term-placeholder").is(":visible")){
        $(".ui-term-placeholder").hide();
      }
    }).focusout(function(){
      if($("#withdrawAmount").val()===''){
        $(".ui-term-placeholder").show();
      }
    });
    
    new Tip({
      element: '#tipCon',
      trigger: '#tips',
      direction: 'right'
    });

    // auto calc withdraw amount
    var _drawTimer;
    $("#withdrawAmount").on('keyup blur',function () {
      //getCash();
      clearTimeout(_drawTimer);
      _drawTimer = setTimeout(getCash, 250);
      //提现金额不能超过15位
      if($(this).val().length>15){
        var val = $(this).val().substring(0,15);
        $(this).val(val);
      }
      //验证余额
      
      
    });

    function getCash() {
      var amount = $("#withdrawAmount").val();
      if (amount <= 0) {
        $("#withdrawFee").html("0.00");
        $("#withdrawReal").html("0.00");
        $(".J_withdrawReal").html("0.00");
        $(".J_withdrawFee").html("0.00");
        $(".J_withdrawAmout").html("0.00");
        return;
      }
      $(".J_withdrawAmout").html("￥"+form.comma(parseFloat(amount)));
      var type = "cashDraw";
      $.ajax({
        url: "/my/getCashFee.action?amount=" + amount + "&type=" + type,
        cache: false,
        dataType: 'json',
        timeout: 10000,
        success: function (resp) {
          // calc with current value,expired respone was less than current
          var _amount = $("#withdrawAmount").val();
          if( resp.cal < _amount ){
            return;
          }
          $("#totalAmount").val(form.comma(resp.balance));
          $("#withdrawFee").html(form.comma(resp.fe));
          $("#withdrawReal").html(form.comma(resp.cal));
          $(".J_withdrawReal").html("￥"+form.comma(resp.cal));
          $(".J_withdrawFee").html(form.comma(resp.fe)+".00");
        }
      });
    }
  });
});
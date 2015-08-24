define(function (require) {

  var $ = require('jquery'),
    RSAencript = require('rsa');


  if (window.parent != window) {
    window.top.location.href = location.href;
  }

  $(function () {
    var Widgets = require('widgets/widgets');
    var form = Widgets.Form;
    var pswLevel = Widgets.pswLevel;
    Tip = require('tip');
    var $range = $('.psw-range div');
    var getVoice, getMobile;
    

    
    form.ui.init();

    $('#password').on('keyup', function () {
      var v = $(this).val();
      var res = pswLevel(v);
      switch (res.level) {
      case '强':
        $range.removeClass().addClass('high');
        break;
      case '中':
        $range.removeClass().addClass('mid');
        break;
      case '弱':
        $range.removeClass().addClass('low');
        break;
      }
      $range.show();
    }).on('blur', function () {
      //产品说不隐藏
      //$range.hide();
    });

    $('#usertype').on('click', 'li', function () {
      var index = $(this).index();
      $(this).addClass('cur').siblings().removeClass('cur');
      $("input[name = 'intention']").eq(index).trigger('click');
      $("label[for='intention']").addClass("valid").html("");
    });

    $('#gostep1').click(function (e) {
      showStep1();
      if($("#lpjumptoreg").val()=="1"){
        $("input[name=nickName]").focus();
        $("#phone").focus();
      };
      e.preventDefault();
    });

    function showStep1() {
      $('.ui-step li').eq(0).removeClass('ui-step-done').addClass('ui-step-active');
      $('.ui-step li').eq(1).removeClass('ui-step-active');
      $("#randCode").val('');
      $("#randImage").trigger("click");
      $(".validCode").hide();
      $('#step1').show();
      $('#step2').hide();
      $("#reg").find("input[name=confirm_password]").val('');
      $("#reg").find("input[name=password]").val('');
    }

    function showStep2() {
      $('.ui-step li').eq(0).removeClass('ui-step-active').addClass('ui-step-done');
      $('.ui-step li').eq(1).addClass('ui-step-active');
      $("#mobileCode").val("");
      $("#code-label").hide();
      $('#step1').hide();
      $('#step2').show();

      var $input = $("#reg").find("input").not("input[type='submit']").filter(function () {
        return this.type != "radio" || this.type == "radio" && this.checked;
      });
      var hiddens = "";
      $input.each(function () {
        hiddens += "<input type='hidden' name='" + $(this).attr("name") + "' value='" + $(this).val() + "' />";
      });
      $("#hiddeninputs").html(hiddens);

      var $getMobileCode = $("#getMobileCode");
      if ($getMobileCode.data("mobile") != $("input[name='username']").val()) {
        $getMobileCode.removeAttr("disabled");
        getMobile.clear();
      }
      if (!$getMobileCode.is(":disabled")) {
        $getMobileCode.trigger("click");
      }

      $getMobileCode.data("mobile", $("#userMobile").text());

    }
    //showStep2();
    //showStep1();
    
    
    //从LP 页面跳转来的
    if($("#lpjumptoreg").val()=="1"){
      $("#userMobile").html($("#lpphonenum").val());
      $("#phone").val($("#lpphonenum").val());
      getVoice = form.sendPhoneCode('phone', 'getVoiceCode', '/sendPhoneCode!voiceCode.action?&checkCode=reg&phone=', {
        onStart: function () {
          switchEnable($("#getMobileCode"), false);
        },
        onClear: function () {
          switchEnable($("#getMobileCode"), true);
        }
      });
      getMobile = form.sendPhoneCode("phone", "getMobileCode", "/sendPhoneCode.action?&checkCode=reg&phone=", {
        onStart: function () {
          switchEnable($("#getVoiceCode"), false);
        },
        onClear: function () {
          switchEnable($("#getVoiceCode"), true);
        }
      });
      showStep2();
    }

    function switchEnable($obj, enabled) {
      if (!$obj.length) return;
      if (enabled) {
        $obj.removeAttr('disabled').removeClass("ui-button-disabled");
      } else {
        $obj.attr("disabled", "disabled").addClass("ui-button-disabled");
      }
    }

    //注册成功第三步身份认证
    if ($('#setIdForm').length) {
      form.validate({
        target: "#setIdForm",
        validateData: {
          submitHandler: function (el) {
            form.ajaxSubmit($(el), {
              msgafter: "#" + $(el).find("input[type='submit']")[0].id,
              before: function () {
                this.msg("正在验证，请稍后...");
              },
              success: function (data) {
                this.msg(data.message, "warn");
                if (data.status === 0) {
                  $('.auth').hide();
                  $('.authSuccess').show();

                  var $second = $("#second");
                  var s = 5;
                  var t = setInterval(function () {
                    $second.html(s);
                    if (s <= 0) {
                      document.location = '/account/index.action';
                      clearInterval(t);
                    } else {
                      s--;
                    }
                  }, 1000);
                }
              }
            });
          }
        }
      });
    }

    //注册第二步验证
    form.validate({
      target: "#mobileCodeForRegForm",
      validateData: {
        submitHandler: function (el) {
          var code = $("#mobileCode").val();
          var mobile = $("#userMobile").text();
          $.get('/account/checkCode.action?mobileCode=' + code + "&code=" + code + "&mobile=" + mobile, function (data) {
            if (data.result == "false") {
              $("#code-label").show();
            } else {
              $("#code-label").hide();
              el.submit();
            }
          });
        }
      }
    });



    //注册第一步验证
    form.validate({
      target: "#reg",
      showTip: $("#reg").data("showtip") === true ? true : false,
      /*tip: {
        nickName: "4-16个字符，一个汉字为两个字符，可包含中文、英文、数字和下划线。",
        username: "请保证手机号真实，将用于接收验证码。",
        password: "6-16个字符，可以是字母、数字和符号的组合。",
        confirm_password:"再输一次密码。"
      },*/
      before: function () {
        if(!getVoice && !getMobile){
          getVoice = form.sendPhoneCode('phone', 'getVoiceCode', '/sendPhoneCode!voiceCode.action?&checkCode=reg&phone=', {
            onStart: function () {
              switchEnable($("#getMobileCode"), false);
            },
            onClear: function () {
              switchEnable($("#getMobileCode"), true);
            }
          });
          getMobile = form.sendPhoneCode("phone", "getMobileCode", "/sendPhoneCode.action?&checkCode=reg&phone=", {
            onStart: function () {
              switchEnable($("#getVoiceCode"), false);
            },
            onClear: function () {
              switchEnable($("#getVoiceCode"), true);
            }
          });
        }
        form.randImage();
        $('#refreshCode').click(function () {
          $("#randImage").trigger('click');
        });
      },
      inputTheme: true,
      showSingleError: true,
      validateData: {
        ignore: '.ignore',
        success: function (label) {
          if (label.attr('for') == "nickName") {
            label.html("此昵称将用作展示，一旦注册成功不能修改");
          }
          if (label.attr('for') == "phone") {
            label.html("请保持手机畅通，以便完成手机信息验证");
          }
          label.addClass("valid");
        },
        submitHandler: function (el) {
          $(el).find("input[name=password]").val(RSAencript($(el).find("input[name=password]").val()));
          $(el).find("input[name=confirm_password]").val(RSAencript($(el).find("input[name=confirm_password]").val()));
          form.ajaxSubmit($(el), {
            msgafter: "#" + $(el).find("input[type='submit']")[0].id,
            success: function (data) {
              if (data.status === 0) {
                $("#userMobile").html(data.data.username);
                showStep2();
              } else {
                this.msg(data.message, "warn");
              }
            }
          });
        }
      }
    });
    
    if (!document.all && document.querySelector) {
      var codeNum = 0;


      form.checkCode({
        ele: $("#randCode"),
        data: {
          code: function () {
            return $("#randCode").val();
          }
        },
        success: function (data) {
          $('.validCode').show();
        },
        failed: function (data) {
          $('.validCode').hide();
        }
      });

      form.checkCode({
        ele: $("#mobileCode"),
        data: {
          code: function () {
            return $("#mobileCode").val();
          },
          mobile: function () {
            return $("#phone").val();
          },
          t: function(){
            return new Date().getTime();
          }
        }
      });
    }

    $("#randCode").on('blur', function () {
      if ($('#code-error').hasClass('valid')) {
        $('.validCode').show();
      } else {
        $('.validCode').hide();
      }
    });


    if ($("#reg-tab").length) {
      new Widgets.Tab({
        name: 'reg',
        switched: function (from, to, initialized) {
          if (to == 'exist') {}
          if (to == 'without') {}
          return true;
        }
      }).init();
    }

    $("body")[0].scrollTop = 0;
  });
});
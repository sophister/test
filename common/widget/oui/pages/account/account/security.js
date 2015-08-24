define(function (require) {

  var $ = require('jquery'),
    RSAencript = require('rsa'),
    Widgets = require('widgets/widgets');

  var form = Widgets.Form;

  // 最后一步完成，显示成功信息
  var showSuccess = function () {
    var $s = $(".success");
    var $b = $(".backBt");
    if (!$s.length) return;
    $(".content").delay(1000).slideUp();
    $s.delay(1000).slideDown();
    //用户可以手机刷新
    $b.on("click", function () {
      window.parent.location.reload();
    });
    //无手动刷新,则2秒后自动刷新
    setTimeout(function () {
      window.parent.location.reload();
    }, 2000);
  };
  var len = $(".success").length;
  var $formIds = $("#modPswForm,#modCashPswForm,#findCashPswFormStepOneForm,#findCashPswFormStepTwoForm,#modMobileByPhoneStepOneForm,#modMobileByPhoneStepTwoForm,#modMobileByIdStepOneForm,#modMobileByIdStepTwoForm,#emailUpdateByOldStepOneForm,#emailUpdateByOldStepTwoForm,#emailUpdateByMobileStepOneForm,#setIdForm,#setEmailForm,#setMobileForm,#setCashPwdForm,#setNickNameForm");

  //绑定邮箱向邮箱再次发送验证码
  $("#reSendMail").click(function (e) {
    $.get($(this).attr("href"), function () {
      form.msg("#reSendMail", "验证码发送成功,请去邮箱查收");
    });
    e.preventDefault();
  });

  function switchEnable($obj, enabled) {
    if (!$obj.length) return;
    if (enabled) {
      $obj.removeAttr('disabled').removeClass("ui-button-disabled");
    } else {
      $obj.attr("disabled", "disabled").addClass("ui-button-disabled");
    }
  }

  if ($formIds.length) {
    form.validate({
      target: "#" + $formIds[0].id,
      before: function () {
        if ($("#getMobileCode").length) {
          //form.sendPhoneCode("phone", "getMobileCode", "/sendPhoneCode.action?&checkCode=other&phone=");
          form.sendPhoneCode('phone', 'getVoiceCode', '/sendPhoneCode!voiceCode.action?&checkCode=other&phone=', {
            onStart: function () {
              switchEnable($("#getMobileCode"), false);
            },
            onClear: function () {
              switchEnable($("#getMobileCode"), true);
            }
          });
          form.sendPhoneCode("phone", "getMobileCode", "/sendPhoneCode.action?&checkCode=other&phone=", {
            onStart: function () {
              $('.voice').show();
              switchEnable($("#getVoiceCode"), false);
            },
            onClear: function () {
              switchEnable($("#getVoiceCode"), true);
            }
          });

        }
        if ($("#getMobileCodeWithoutMobile").length) {
          //form.sendPhoneCode("", "getMobileCodeWithoutMobile", "/account/bindMobile!sendOrigionalPhoneCode.action?&checkCode=other");
          form.sendPhoneCode('phone', 'getVoiceCode', '/account/bindMobile!sendOrigionalPhoneCode.action?type=VOICE&checkCode=other', {
            onStart: function () {
              switchEnable($("#getMobileCodeWithoutMobile"), false);
            },
            onClear: function () {
              switchEnable($("#getMobileCodeWithoutMobile"), true);
            }
          });
          form.sendPhoneCode("", "getMobileCodeWithoutMobile", "/account/bindMobile!sendOrigionalPhoneCode.action?&checkCode=other", {
            onStart: function () {
              $('.voice').show();
              switchEnable($("#getVoiceCode"), false);
            },
            onClear: function () {
              switchEnable($("#getVoiceCode"), true);
            }
          });
        }
        if ($("#randImage").length) {
          form.randImage();
        }

      },
      validateData: {
        submitHandler: function (el) {
          var $pwds = $('input[type=password]', el);
          if (typeof(RSAencript) != 'undefined') {
            $pwds.each(function () {
              $(this).val(RSAencript($(this).val()));
            });
/*
            //修改密码
            $(el).find("input[name=oldPassword]").val(RSAencript($(el).find("input[name=oldPassword]").val()));
            $(el).find("input[name=newPassword]").val(RSAencript($(el).find("input[name=newPassword]").val()));
            $(el).find("input[name=newPassword2]").val(RSAencript($(el).find("input[name=newPassword2]").val()));
            //修改交易密码
            $(el).find("input[name=cashPassword]").val(RSAencript($(el).find("input[name=cashPassword]").val()));
            $(el).find("input[name=newCashPwd]").val(RSAencript($(el).find("input[name=newCashPwd]").val()));
            $(el).find("input[name=newCashPwd2]").val(RSAencript($(el).find("input[name=newCashPwd2]").val()));
            
            //设置交易密码
            $(el).find("input[name=cashPwd]").val(RSAencript($(el).find("input[name=cashPwd]").val()));
            $(el).find("input[name=cashPwd2]").val(RSAencript($(el).find("input[name=cashPwd2]").val()));
            */
          }
          if (len) {
            //这里用ajax提交
            form.ajaxSubmit($(el), {
              msgafter: "#" + $formIds.find("input[type='submit']")[0].id,
              success: function (data) {
                $pwds.each(function () {
                  $(this).val('');
                });
/*
                $(el).find("input[name=oldPassword]").val('');
                $(el).find("input[name=newPassword]").val('');
                $(el).find("input[name=newPassword2]").val('');
                $(el).find("input[name=cashPassword]").val('');
                $(el).find("input[name=newCashPwd]").val('');
                $(el).find("input[name=newCashPwd2]").val('');
                $(el).find("input[name=cashPwd]").val('');
                $(el).find("input[name=cashPwd2]").val('');
                */
                this.msg(data.message, "warn");
                if (data.status === 0) {
                  showSuccess();
                }
              }
            });
          } else {
            //用普通表单提交，这里一定不要用$(el).submit()
            el.submit();
          }

        }
      }
    });
  }

});
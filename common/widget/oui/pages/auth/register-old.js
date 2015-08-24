define(function (require) {

  var $ = require('jquery'),
      RSAencript = require('rsa');
  $(function () {
    var Dialog = require('dialog');
    var Widgets = require('widgets/widgets');
    var form = Widgets.Form;

    new Dialog({
      trigger: '#showMobileCodeBox',
      width: $('#mobileCodeBox').data('width') ? $('#mobileCodeBox').data('width') + 'px' : '570px',
      hasMask: {
        hideOnClick: false
      }
    }).before('show',function () {
        var $input = $("#reg").find("input").not("input[type='submit']").filter(function () {
          return this.type != "radio" || this.type == "radio" && this.checked;
        });
        var hiddens = "";
        $input.each(function () {
          hiddens += "<input type='hidden' name='" + $(this).attr("name") + "' value='" + $(this).val() + "' />";
        });
        $("#hiddeninputs").html(hiddens);
        this.set('content', $("#mobileCodeBox"));
        $("#getMobileCode").trigger("click");
      }).after('hide', function () {
        $("#hiddeninputs").empty();
        $("#randImage").trigger("click");
      });
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
    //$("#showMobileCodeBox").trigger('click')

    function switchEnable($obj, enabled) {
      if (!$obj.length) return;
      if (enabled) {
        $obj.removeAttr('disabled').removeClass("ui-button-disabled");
      } else {
        $obj.attr("disabled", "disabled").addClass("ui-button-disabled");
      }
    }

    form.validate({
      target: "#reg",
      showTip: $("#reg").data("showtip") === true ? true : false,
      tip: {
        nickName: "4-16位字符，可包含中文，英文，数字和“_”。注册完成后不可修改",
        username: "请输入11位数字",
        password: "密码须为6-16位英文字母、数字和符号(不包括空格)"
      },
      before: function () {
        form.sendPhoneCode('phone', 'getVoiceCode', '/sendPhoneCode!voiceCode.action?&checkCode=reg&phone=', {
          onStart: function () {
            switchEnable($("#getMobileCode"), false);
          },
          onClear: function () {
            switchEnable($("#getMobileCode"), true);
          }
        });
        form.sendPhoneCode("phone", "getMobileCode", "/sendPhoneCode.action?&checkCode=reg&phone=", {
          onStart: function () {
            switchEnable($("#getVoiceCode"), false);
          },
          onClear: function () {
            switchEnable($("#getVoiceCode"), true);
          }
        });
        form.randImage();
      },
      validateData: {
        submitHandler: function (el) {
          var $pwd = $(el).find("input[name=password]");
          // encript password
          $pwd.val( RSAencript($pwd.val()) );
          form.ajaxSubmit($(el), {
            msgafter: "#" + $(el).find("input[type='submit']")[0].id,
            success: function (data) {
              //$pwd.val('');
              if (data.status === 0) {
                $("#userMobile").html(data.data.username);
                $("#showMobileCodeBox").trigger("click");
                //$(el).find("input[name=password]").val('');
              } else {
                this.msg(data.message, "warn");
                //$(el).find("input[name=password]").val('');
              }
              $pwd.val('');
            }
          });
        }
      }
    });
    /**
     * check code cause cross domain(https for url:/account/*)
     */
    /*if (!document.all && document.querySelector) {
      form.checkCode({ele: $("#randCode"), data: {code: function () {
        return $("#randCode").val();
      }}});
      form.checkCode({ele: $("#mobileCode"), data: {code: function () {
        return $("#mobileCode").val();
      }, mobile: function () {
        return $("#phone").val();
      }}});
    }*/

    $("#randCode").on('blur', function () {
      if ($('#code-error').hasClass('valid')) {
        $('.validCode').show();
      } else {
        $('.validCode').hide();
      }
    });

    var href = location.href;
    var match = href.match(/\?[^\.|^:]*/);
    if (match && match.length) {
      $(".reg-link").attr("href", "/regPage.action" + match[0]);
    }

    form.ui.init();
  });
});

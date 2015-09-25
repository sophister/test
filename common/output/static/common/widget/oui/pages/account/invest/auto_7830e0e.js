define('common:widget/oui/pages/account/invest/auto', ['require', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/common', 'common:widget/oui/arale/dialog/1.3.3/dialog', 'common:widget/oui/widgets/widgets'],function (require) {
  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery');
  var Common = require('common:widget/oui/common');
  var Dialog = require('common:widget/oui/arale/dialog/1.3.3/dialog');
  var Widgets = require('common:widget/oui/widgets/widgets');

  var form = Widgets.Form;

  $(function () {
    function jiajian(type) {
      var initV = Number($("#ten_value").val()) || 0;
      if (type == "add") {
        initV += 50;

      } else if (type == "sub") {
        initV -= 50;
        if (initV <= 200) {
          initV = 200;
        }
      }
      $("#ten_value").val(initV);
    }

    $(".addorsub").click(function () {
      var type = $(this).data("type");
      jiajian(type);
    });

    $(".closeAuto").click(function (e) {
      var txt = $(this).text();
      if (confirm("您确定" + txt + "功能？")) {
        $.get($(this).attr("href"), function (data) {
          Common.showMessage(data.message, function () {
            if (data.status === 0) {
              location.reload();
            }
          });
        });
      }
      e.preventDefault();
      return false;
    });

    new Dialog({
      trigger: '#selfType',
      width: '650px',
      content: $('#selfTypeBox')
    });

    new Dialog({
      trigger: '#oneKeyType',
      width: '650px',
      content: $('#oneKeyTypeBox')
    });

    $("form").submit(function (e) {
      var $this = $(this);
      form.ajaxSubmit($this, {
        msgafter: "#" + $this.find("input[type='submit']")[0].id,
        success: function (data) {
          this.msg(data.message, "warn");
          if (data.status === 0) {
            setTimeout(function () {
              location.reload();
            }, 2000);
          }
        }
      });
      e.preventDefault();
    });

  });

});
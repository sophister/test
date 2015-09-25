define('common:widget/oui/pages/account/account/userbasic', ['require', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/widgets/widgets', 'common:widget/oui/arale/dialog/1.3.3/dialog'],function (require) {
  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery');
  var Widgets = require('common:widget/oui/widgets/widgets');
  var Dialog = require('common:widget/oui/arale/dialog/1.3.3/dialog');
  var form = Widgets.Form;

  $(function () {
    var $form = $("#userInfoForm");
    var $clone = $form.clone();
    $clone.find("input,select,a.photo").each(function () {
      if (this.type == 'radio') {
        this.value = "";
        if (!this.checked) {
          $(this).parent("em").remove();
        }
        $(this).remove();
      } else if (this.type == "submit" || this.type == "hidden") {
        $(this).remove();
      } else if (this.tagName.toUpperCase() == "A" && this.id == "modUserPhoto") {
        $(this).attr("href", "#");
      } else {
        var value = $(this).val();
        $(this).after(value).remove();
      }

    });
    $form.hide().after($clone);
    $("#modiForm").click(function () {
      if ($(this).text() != "修改信息") {
        $clone.show();
        $form.hide();
        $(this).html("修改信息");

      } else {
        $clone.hide();
        $form.show();
        $(this).html("取消修改");
      }

    });

    new Dialog({
      trigger: '#modUserPhoto',
      width: '550px',
      height: /msie 6/i.test(navigator.userAgent) ? '550px' : '220px'
    }).before('show',function () {

        this.set('content', this.activeTrigger.attr('href'));
      }).after('hide', function () {

      });

    form.validate({
      validateData: {
        submitHandler: function (el) {
          form.ajaxSubmit($(el), {
            msgafter: "#" + $(el).find("input[type='submit']")[0].id,
            success: function (data) {
              this.msg(data.message, "warn");
              if (data.status === 0) {
                setTimeout(function () {
                  location.reload();
                }, 1500);
              }
            }
          });
        }
      }
    });
  });

});

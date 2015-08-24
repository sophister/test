define(function(require) {

  var $ = require('jquery');
  var Common = require('common');
  var Widgets = require('widgets/widgets');
  var Handlebars = require('handlebars');
  var Dialog = require('dialog');
  var form = Widgets.Form;
  
  $(function() {
    form.validate({
      validateData: {
        submitHandler: function(el) {
          form.ajaxSubmit($(el), {
            msgafter: ".J_bind_cou_tips",
            dataType:"json",
            success: function(data) {
              this.msg(data.message, "warn");
              if (data.status === 0) {
                //成功
                $(".couponType").text(data.data.couponType);
                $('#J_bind_coupon_success').show();
                new Dialog({
                  content: $('#J_bind_coupon_success'),
                  height:'178px',
                  width:'500px'
                }).show();
              }
            }
          });
        }
      }
    });
  })
  
});
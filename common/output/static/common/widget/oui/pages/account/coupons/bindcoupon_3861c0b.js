define('common:widget/oui/pages/account/coupons/bindcoupon', ['require', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/common', 'common:widget/oui/widgets/widgets', 'common:widget/oui/lib/handlebars/1.0.0/handlebars', 'common:widget/oui/arale/dialog/1.3.3/dialog'],function(require) {

  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery');
  var Common = require('common:widget/oui/common');
  var Widgets = require('common:widget/oui/widgets/widgets');
  var Handlebars = require('common:widget/oui/lib/handlebars/1.0.0/handlebars');
  var Dialog = require('common:widget/oui/arale/dialog/1.3.3/dialog');
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
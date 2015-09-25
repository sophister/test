define('common:widget/oui/pages/borrow/credit', ['require', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/widgets/widgets'],function(require) {
  
  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery'),
      Widgets = require('common:widget/oui/widgets/widgets');
  
  var form = Widgets.Form;
  
  var $formIds = $("#creditWeiboForm,#creditGraduationForm,#creditVideoForm");
  if ($formIds.length) {
    form.validate({
      validateData: {
        submitHandler: function(el) {
          el.submit();
        }
      }
    });
  }
});
define(function(require) {
  
  var $ = require('jquery'),
      Widgets = require('widgets/widgets');
  
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
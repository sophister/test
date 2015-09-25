define('common:widget/oui/pages/account/borrow/applications', ['require', 'common:widget/oui/common', 'common:widget/oui/protocol', 'common:widget/oui/widgets/widgets'],function(require){
  
  var Common = require('common:widget/oui/common'),
      Protocol = require('common:widget/oui/protocol'),
      Widgets = require('common:widget/oui/widgets/widgets');
  
  new Widgets.List({
    name: 'applications',
    api: Protocol.API.getUserLoanApplicationRecords,
    title: true,
    pagination: true
  }).init(Common.loadJSON('#applications-rsp', true));
  
});

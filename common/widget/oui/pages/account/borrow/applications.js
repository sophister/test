define(function(require){
  
  var Common = require('common'),
      Protocol = require('protocol'),
      Widgets = require('widgets/widgets');
  
  new Widgets.List({
    name: 'applications',
    api: Protocol.API.getUserLoanApplicationRecords,
    title: true,
    pagination: true
  }).init(Common.loadJSON('#applications-rsp', true));
  
});

define(function(require) {
  var $ = require('jquery'),
      Common = require('common'),
      Protocol = require('protocol'),
      Widgets = require('widgets/widgets');

  var name, api, filter = true, rendered = null;
  if ($('#pg-loan-list').length > 0) {
    name = 'loan-list';
    api = Protocol.API.getLoans;
  }

  else if ($('#pg-loan-list-transfer').length > 0) {
    name = 'transfer-list';
    api = Protocol.API.getLoansTransfer;
  }

  else {
    name = 'plan-list';
    api = Protocol.API.getPlans;
    filter = false;
    if ($('.ui-plan-latest').length < 1) {
      $('#plan-latest-container').remove();
    }
  }

  rsp = Common.loadJSON('#' + name + '-rsp', true);
  new Widgets.List({
    name: name,
    api: api,
    filter: filter,
    header: true,
    pagination: true,
    rendered: rendered
  }).init(rsp);

  Common.initPoptips();

});
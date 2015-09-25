define('common:widget/oui/pages/invest/list', ['require', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/common', 'common:widget/oui/protocol', 'common:widget/oui/widgets/widgets'],function(require) {
  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery'),
      Common = require('common:widget/oui/common'),
      Protocol = require('common:widget/oui/protocol'),
      Widgets = require('common:widget/oui/widgets/widgets');

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
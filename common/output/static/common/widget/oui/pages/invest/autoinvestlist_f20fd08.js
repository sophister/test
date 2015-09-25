define('common:widget/oui/pages/invest/autoinvestlist', ['require', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/common', 'common:widget/oui/protocol', 'common:widget/oui/widgets/widgets'],function(require) {
  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery'),
      Common = require('common:widget/oui/common'),
      Protocol = require('common:widget/oui/protocol'),
      Widgets = require('common:widget/oui/widgets/widgets');

  var name, api, filter = true, 
    rendered = null;

    name = 'autoinvest-list';
    api = Protocol.API.getAutoinvestPlans;
    filter = false;
  //rsp = Common.loadJSON('#' + name + '-rsp', true);
  new Widgets.List({
    name: name,
    api: api,
    filter: filter,
    header: true,
    pagination: true,
    rendered: rendered
  }).init()._update();

});
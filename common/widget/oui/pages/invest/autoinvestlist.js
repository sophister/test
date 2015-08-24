define(function(require) {
  var $ = require('jquery'),
      Common = require('common'),
      Protocol = require('protocol'),
      Widgets = require('widgets/widgets');

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
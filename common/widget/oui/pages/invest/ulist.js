define(function(require) {
  var $ = require('jquery'),
      Common = require('common'),
      Protocol = require('protocol'),
      Widgets = require('widgets/widgets');

  var name, api, filter = true, 
    joined, clickTimer, rendered = null;

    name = 'uplan-list-a';
    api = Protocol.API.getPlans;
    filter = false;

  //rsp = Common.loadJSON('#' + name + '-rsp', true);
  new Widgets.List({
    name: name,
    api: api,
    filter: filter,
    header: true,
    pagination: true,
    rendered: rendered,
    params: { category: "A" }
  }).init()._update({ category: "A" });

  if ($('#pg-plan-list').length > 0) {
    new Widgets.Tab({
      name: 'uplan',
      switched: function (from, to, initialized) {
        if (initialized) {
          return true;
        }
        if (to == 'UB') {
          new Widgets.List({
                 name: 'uplan-list-b',
                 api: Protocol.API.getPlans,
                 title: true,
                 pagination: true,
                 params: { category: "B" }
               }).init()._update({ category: "B" });
        }
        if (to == 'UC') {
         new Widgets.List({
             name: 'uplan-list-c',
             api: Protocol.API.getPlans,
             title: true,
             pagination: true,
             params: { category: "C" }
           }).init()._update({ category: "C" });
        }
        return true;
      },
      clicked: function (to, initialized) {
        if (!clickTimer) {
        }
        clickTimer = window.setTimeout(function () {
          window.clearTimeout(clickTimer);
          clickTimer = null;
        }, 750);
      }
    }).init();
  }



});
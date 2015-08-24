define(function (require) {

  var $ = require('jquery');
  var Common = require('common');
  var Protocol = require('protocol');
  var Widgets = require('widgets/widgets');
  new Widgets.List({
    name: 'loan-list',
    api: Protocol.API.getLoans,
    header: true,
    more: true,
    rendered: function () {
      this.container.find('.ui-list-item.last').removeClass('last');
      this.container.find('.ui-list-title')
      .removeClass('ui-list-title-sortable')
      .removeClass("ui-list-title-sortable-1")
      .removeClass("ui-list-title-sortable-2")
      .removeClass("ui-list-title-sortable-3")
      .removeClass("ui-list-title-sortable-4");
      this.container.find('.ui-list-title').attr("next","-1");
      this.container.find('.ui-list-title').children('em').remove();
      this.container.find('.ui-list-title-refresh').text("").removeClass("ui-list-title-refresh");
    }
  }).init(Common.loadJSON('#loan-list-rsp', true));
});
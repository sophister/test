define('common:widget/oui/pages/auth/loan-list', ['require', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/common', 'common:widget/oui/protocol', 'common:widget/oui/widgets/widgets'],function (require) {

  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery');
  var Common = require('common:widget/oui/common');
  var Protocol = require('common:widget/oui/protocol');
  var Widgets = require('common:widget/oui/widgets/widgets');
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
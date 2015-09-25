define('common:widget/oui/pages/account/profile', ['require', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/common', 'common:widget/oui/protocol', 'common:widget/oui/widgets/widgets', 'common:widget/oui/components/components.jscomponents'],function(require) {

  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery'),
      Common = require('common:widget/oui/common'),
      Protocol = require('common:widget/oui/protocol'),
      Widgets = require('common:widget/oui/widgets/widgets'),
			Components = require('common:widget/oui/components/components.jscomponents');

	new Widgets.List({
		name: 'userInfo-list',
		api: Protocol.API.getUserInfo,
		pagination: true,
		params:{
			userId:$('#nick-name').data('userid')
		},
		rendered: function () {

			//this.container.find('.ui-list-item.last').removeClass('last');
		}
	}).init(Common.loadJSON('#userInfo-list-rsp', true));

});

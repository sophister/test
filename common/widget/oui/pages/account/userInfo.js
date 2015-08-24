define(function(require) {

  var $ = require('jquery'),
      Common = require('common'),
      Protocol = require('protocol'),
      Widgets = require('widgets/widgets'),
			Components = require('components/components');

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

	var $ = require('jquery'),
	    Common = require('common'),
	    Protocol = require('protocol'),
		Widgets = require('widgets');

	function getList (){
	  	var name, api, filter = true, rendered = null;
		name = 'loan-list';
		api = Protocol.API.getLoans; 
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
	}
	  
	list ={
	  	getList:getList
	}
	module.exports = list;
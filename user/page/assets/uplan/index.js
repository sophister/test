var Donut =  require('donut');
var Handelbars = require('handlebars');
var exports = {
	init : function (){
		exports.tab($('#assets-tab'));
		exports.chart();
		exports.myUplanList();
	},
	tab : function (obj){
		var tabItems = obj.find('.assets-tab-li');
		var contentItems = obj.find('.assets-tab-content');
		var currentName = obj.find('.active').data('name');
		obj.find('.assets-tab-content[data-name='+currentName+']').show();
		tabItems.click(function(){
			currentName = $(this).data('name');
			tabItems.removeClass('active');
			$(this).addClass('active');
			contentItems.hide();
			obj.find('.assets-tab-content[data-name='+currentName+']').show();
		})
	},
	chart : function (){
		var pie = new Donut({
			container : document.getElementById('pie'),
			width: 220,
			height: 220,
			data: myAssersData
		});
	    pie.on('select', function( conf ){
	     	var sClass = conf.id;
	    } );
	    pie.on('unselect', function( conf ){
	    	var sClass = conf.id;
	    } );
	 },
	 myUplanList : function (){
	 	exports.tab($("#my-uplan-tab"));
	 	var temp = Handelbars.compile($("#uplan-holding-template").html());
  		var html = temp();
  		$("#my-holding-list").append(html);
	 }
};

var myAssersData = [
                    {
                      id: 'pie-u',
                      color: '#154d85',
                      y: 10000
                    },
                    {
                      id: 'pie-x',
                      color: '#ee7565',
                      y: 5000
                    },
                    {
                      id: 'pie-s',
                      color: '#e4cd85',
                      y: 8000
                    }
                ];

module.exports = exports;
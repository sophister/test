var Donut =  require('donut');
var Handelbars = require('handlebars');
var exports = {
	init : function (){
		tab($('#assets-tab'));
		chart();
		getProgress();
	}
};

var tab = function (obj){
	var tabItems = obj.find('.acc-tab-li');
	var contentItems = obj.find('.account-tab-content');
	var currentName = obj.find('.active').data('name');
	obj.find('.account-tab-content[data-name='+currentName+']').show();
	tabItems.click(function(){
		currentName = $(this).data('name');
		tabItems.removeClass('active');
		$(this).addClass('active');
		contentItems.hide();
		obj.find('.account-tab-content[data-name='+currentName+']').show();
	})
};
var myAssersData = [
                    {
                      id: 'pie-u',
                      color: '#154d85',
                      y: investAmount.uplan
                    },
                    {
                      id: 'pie-x',
                      color: '#ee7565',
                      y: investAmount.autoinvestplan
                    },
                    {
                      id: 'pie-s',
                      color: '#e4cd85',
                      y: investAmount.loan
                    },
                    {
                      id: 'pie-d',
                      color: '#4fa4a6',
                      y: investAmount.frozen
                    },
                    {
                      id: 'pie-k',
                      color: '#6acea5',
                      y: investAmount.available
                    }
                ];
var myAssersListData = function (){
  var count=0;
  var arr = [];
  var pre = 0;
  for(var i=0;i<myAssersData.length;i++){
    count+=myAssersData[i].y;
  }
  for(var i=0;i<myAssersData.length;i++){
    arr[myAssersData[i].id] = {};
    arr[myAssersData[i].id].id= myAssersData[i].id;
    arr[myAssersData[i].id].amount = toFixed(myAssersData[i].y);
    if(i==myAssersData.length-1){
      arr[myAssersData[i].id].percent = (1000-pre)/10+'%';
    }else{
      pre+= (myAssersData[i].y/count).toFixed(3)*1000;
      arr[myAssersData[i].id].percent = (myAssersData[i].y/count).toFixed(3)*1000/10+'%';
    }
  }
  
  return arr;
}
var chart = function (){
	var pie = new Donut({
		container : document.getElementById('pie'),
		width: 220,
		height: 220,
		data: myAssersData
	});
  pie.on('select', function( conf ){
      var sClass = conf.id;
      $('.assers-detail li').removeClass('active');
      $('.assers-detail li.'+sClass).addClass('active');
  } );
  pie.on('unselect', function( conf ){
    var sClass = conf.id;
    $('.assers-detail li.'+sClass).removeClass('active');
} );
  pie.on('click', function(conf){
      alert('跳转到'+conf.id);
  } );
  
  //列表  
  var temp = Handelbars.compile($("#assets-list-template").html());
  var html = temp(myAssersListData());
  $("#account-tab-pie").append(html);
  $(".assers-detail li").hover(function(){
    var sId = $(this).data('id');
    pie.selectPointById(sId);
  },function(){
    var sId = $(this).data('id');
    pie.unselectPointById(sId);
  });
  $(".assers-detail li").click(function(){
    var sId = $(this).data('id');
  });
};

var getProgress = function (){
	var progress = 0;
	$('.safe-rank').each(function () {
	    var len = /light/.test(this.className);
	    if (len) {
	      progress += 25;
	    }
	 });
	if(progress<=25){
		$('#sec-level').text('低');
	}else if(progress>25&&progress<=75){
		$('#sec-level').text('中');
	}else{
		$('#sec-level').text('高');
	}
}
function toFixed(floatNumber){
  var num = parseFloat(Math.round(floatNumber * 100) / 100, 10).toFixed(2);
  return  num.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
module.exports = exports;
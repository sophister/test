var Handlebars = require("common:widget/ui/lib/handlebars.js");
var listData = {
	'name' : 'wanghao',
	'what': '牛逼',
	'allPepole' : [
		{
			'name': '校花',
			'age': '28'
		},
		{
			'name': '校草',
			'age': '19'
		},
		{
			'name': '强哥',
			'age': '34'
		}
	]
};
var init = {
	drag: function (obj){
		obj.onmousedown = function (ev){
			var oEvent = ev || event;
			var disX = oEvent.clientX - obj.offsetLeft;
			var disY = oEvent.clientY - obj.offsetTop;
			var oDottedBox = document.createElement('div');
			oDottedBox.className = 'dotted-box';
			oDottedBox.style.left = obj.offsetLeft + 'px';
			oDottedBox.style.top = obj.offsetTop + 'px';
			document.body.appendChild(oDottedBox);
			document.onmousemove = function (ev){
				var oEvent = ev || event;
				var l = oEvent.clientX - disX;
				var t = oEvent.clientY - disY;

				oDottedBox.style.left = l + 'px';
				oDottedBox.style.top = t + 'px';
			}

			document.onmouseup = function(){
				document.onmousemove = null;
				document.onmouseup = null;
				obj.style.left = oDottedBox.offsetLeft + 'px';
				obj.style.top = oDottedBox.offsetTop + 'px';
				document.body.removeChild(oDottedBox);
				obj.releaseCapture && obj.releaseCapture();
			}

			obj.setCapture && obj.setCapture();
			return false;
		}
	},
	list: function (){
		var  tpl =  __inline('./temp.tpl');
		var template = Handlebars.compile(tpl);
		var html = template(listData);
		$('body').append(html);
	}
}

module.exports = init;
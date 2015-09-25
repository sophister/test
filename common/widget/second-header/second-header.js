var $ = require('jquery'),
    Protocol = require('protocol');
var header = {
	init: function () {
	  var authenticated = $.trim($('#header-helper-authenticated').text()) == 'true';
	  if (authenticated) {
	    getUserInfo.initMsg();
	    getUserInfo.initUserInfo();
	  }
	}
}

var getUserInfo = {
	getHomePageUserInfoCallBack : function (status, msg, rsp){
		if (rsp.retResult != 'success' || status == '-1') {
	      return;
	    }
		if ($.trim(rsp.userAvatar)) {
	      $('#he-userAvatar').attr('src', rsp.userAvatar);
	      $('.he-userAvatar-class').attr('src', rsp.userAvatar);
	    } else {
	      $('#he-userAvatar').attr('src', '/static/img/account/default-avatar-78.png');
	      $('.he-userAvatar-class').attr('src', '/static/img/account/default-avatar-78.png');
	    }
	},
	initUserInfo : function () {
	    if ('https:' == document.location.protocol.toLowerCase()) {
	      Protocol.getHomePageUserInfoHttps({
	        timeout: 5000
	      }, getUserInfo.getHomePageUserInfoCallBack);
	    } else {
	      Protocol.getHomePageUserInfoHttp({
	        timeout: 5000
	      }, getUserInfo.getHomePageUserInfoCallBack);
	    }
	},
	initMsg : function () {
	    var $msg = $('#header-msgcount');
	    var $mail = $(".account-menu .org");	    
	    Protocol.getUnreadMsgCount(null, function (status, msg, rsp) {
	      var count = rsp.count;
	      if (count >= 100) {
	        $msg.text('');
	        $msg.removeClass('msgcount-icon').addClass('msgcountmore-icon');
	        $msg.show();
	      } else if (count > 0 && count < 100) {
	        $msg.text(count);
	        $msg.show();
	      }

	      $mail.text("（"+count+"）");
	    });
	 }
}


module.exports = header;
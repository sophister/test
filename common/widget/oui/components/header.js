define(function (require, exports, module) {

  var $ = require('jquery'),
    Protocol = require('protocol');

  var Header = function (conf) {};

  // 获取头部用户下拉菜单信息
  var getHomePageUserInfoCallBack = function (status, msg, rsp) {
    if (rsp.retResult != 'success' || status == '-1') {
      $('.ui-nav-dropdown-account').html('<div class="loadfail color-dark-text">抱歉,系统忙,信息加载失败。</div>');
      return;
    }

    $('.loadfail', '.ui-nav-dropdown-account').addClass('fn-hide');
    $('.ui-nav-dropdown-account-box').removeClass('fn-hide');
    $('#he-avaliableBalance').text(rsp.avaliableBalance);

    // set user avatar
    if ($.trim(rsp.userAvatar)) {
      $('#he-userAvatar').attr('src', rsp.userAvatar);
      $('.he-userAvatar-class').attr('src', rsp.userAvatar);
    } else {
      $('#he-userAvatar').attr('src', '/static/img/account/default-avatar-78.png');
      $('.he-userAvatar-class').attr('src', '/static/img/account/default-avatar-78.png');
    }
    //
    
    // all infoed
    if (rsp.bindMobile == 'true' && rsp.setIdentity == 'true' && rsp.setCashPass == 'true' && rsp.bindEmail == 'true') {
      $('.user-info-container dd').eq(0).show();
      $('.user-info-container dd').eq(1).show();
      $('.ui-nav-dropdown-bottom').eq(0).show();
      return;
    }

    if (rsp.bindMobile == 'true') {
      $('.cellphone', '.icon-box').addClass('light').attr('title', '绑定手机，已绑定');
    } else {
      $('.cellphone', '.icon-box').attr('title', '绑定手机，未绑定');
    }

    if (rsp.setIdentity == 'true') {
      $('.man', '.icon-box').addClass('light').attr('title', '实名认证，已设置');
    } else {
      $('.man', '.icon-box').attr('title', '实名认证，未设置');
    }

    if (rsp.setCashPass == 'true') {
      $('.lock', '.icon-box').addClass('light').attr('title', '交易密码，已设置');
    } else {
      $('.lock', '.icon-box').attr('title', '交易密码，未设置');
    }

    if (rsp.bindEmail == 'true') {
      $('.mail', '.icon-box').addClass('light').attr('title', '绑定邮箱，已绑定');
    } else {
      $('.mail', '.icon-box').attr('title', '绑定邮箱，未绑定');
    }

    $('.user-info-container dd').eq(2).show();
    $('.user-info-container dd').eq(3).show();
    $('.ui-nav-dropdown-bottom').eq(1).show();
  };

  /* Get unread message count for authenticated user */
  var initMsg = function () {
    var $msg = $('#header-msgcount'),
    $newTask = $('#header-newtask');
    
    Protocol.getUnreadMsgCount(null, function (status, msg, rsp) {
      var count = rsp.count;
      if (count >= 100) {
        $msg.attr('class', 'icon icon-msg mr5');
        $msg.show();
      } else if (count > 0 && count < 100) {
        $msg.text(count);
        $msg.show();
      }
    });
    Protocol.getUnreadNewTask(null, function (status, msg, rsp) {
        var count = rsp.count;
        if (count >0) {
      	  $newTask.attr('class', 'icon-task-new mr5');
      	  $("#header-task").show();
        } 
      });
      $("#header-task").click(function(){
        $.get('/html/blank/blank.html?tag=380015',function(){});
      });
  };
 
  

  var initUserInfo = function () {
    if ('https:' == document.location.protocol.toLowerCase()) {
      Protocol.getHomePageUserInfoHttps({
        timeout: 5000
      }, getHomePageUserInfoCallBack);
    } else {
      Protocol.getHomePageUserInfoHttp({
        timeout: 5000
      }, getHomePageUserInfoCallBack);
    }
  };

  var bindHover = function () {
    $('#header .ui-nav-item-x').hover(function () {
      $(this).children('.ui-nav-dropdown').show();
    }, function () {
      $(this).children('.ui-nav-dropdown').hide();
    });
  };

  var setblank = function(tag){
	  $.get("../html/blank/blank.html?tag="+tag,function(){});
  }
  var setmiaodian =function(e){
	   var el = e.currentTarget, m = $(el).closest("li").index();
	   var tag;
	   switch (m){
	   		case 0:
	   			tag = "000007";
	   			setblank(tag);
	   			break;
	   		case 1:
	   			tag = "000008";
	   			setblank(tag);
	   			break;
	   		case 2:
	   			tag = "000009";
	   			setblank(tag);
	   			break;
	   		case 3:
	   			tag = "000010";
	   			setblank(tag);
	   			break;
	   		case 4:
	   			tag = "000011";
	   			setblank(tag);
	   			break;
	   		default:
	   			break;  
	   }
	   return true;
  }
  var setmiaodian2 =function(e){
	   var el = e.currentTarget, m = $(el).attr("href");
	   switch (m){
	   		case "/event/app.action":
	   			tag = "000012";
	   			setblank(tag);
	   			break;
	   		case "/regPage.action?registerSource=web_top":
	   			tag = "000013";
	   			setblank(tag);
	   			break;
	   		case "/loginPage.action":
	   			tag = "000014";
	   			setblank(tag);
	   			break;
	   		case "/account/index.action":
	   			tag = "000015";
	   			setblank(tag);
	   			break;
	   		case "/account/capital!recharge.action":
	   			tag = "000016";
	   			setblank(tag);
	   			break;
	   		case "/account/capital!withdraw.action":
	   			tag = "000017";
	   			setblank(tag);
	   			break;
	   		case "/help/index.action":
	   			tag = "000018";
	   			setblank(tag);
	   			break;
	   		case "http://bbs.renrendai.com":
	   			tag = "000019";
	   			setblank(tag);
	   			break;
	   		default:
	   			break;  
	   }
 }
  
  //添加导航页统计数据
  var bindCount = function(){
	  $(".ui-header-main .ui-nav-item-link").on("click",setmiaodian);
	  $(".ui-header-top .ui-nav-item,.user-info-container .ui-button-mid").on("click",setmiaodian2);
  }

  $.extend(Header.prototype, {
    init: function () {
      var authenticated = $.trim($('#header-helper-authenticated').text()) == 'true';
      if (authenticated) {
        initMsg();
        initUserInfo();
      }
      bindHover();
      bindCount();
    }
  });
  
  //在线客服 二维码
  var hideTimer = null;
  $(".fixed-download").hover(function(){
    $(this).addClass('hover');
    clearTimeout(hideTimer);
    $('.download-app-wrap').show();
    $('.download-app-wrap-opacity').show();
  },function(){
    hideTimer = setTimeout(function(){
      $('.download-app-wrap').hide();
      $('.download-app-wrap-opacity').hide();
      $('.fixed-download').removeClass('hover');
    },100);
  });
  //返回顶部
  window.onscroll=function()
  {
      var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
      if(scrollTop>=100){
        $('.fixed-goTop').show();
      }else{
        $('.fixed-goTop').hide();
      }      
  };

$('.fixed-goTop').click(function(){
  upMove($(this)[0]);
});
function upMove(obj) {
    var timer=null;
    clearInterval(timer);
    var speed=0;
    var cur=0;
    timer=setInterval(function() {
        cur=document.documentElement.scrollTop||document.body.scrollTop;
        speed=Math.floor((0-cur)/8);
        if(cur==0) {
            clearInterval(timer);
        }else{
            document.documentElement.scrollTop=document.body.scrollTop=cur+speed;
        }
    },10);
}
  
  
  module.exports = Header;
  
});
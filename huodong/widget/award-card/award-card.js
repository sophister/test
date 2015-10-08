var $ = require('jquery');
var template = require('huodong:widget/ui/template/template.js');
var ajax = require('huodong:widget/ui/ajax/ajax.js');
var FontScroll = require('huodong:widget/ui/font_scroll/font_scroll.js');
var Modal = require('huodong:widget/ui/modal/modal.js');
var show = initModal();
var modal;

var scrollbar = require('huodong:widget/ui/scrollbar/scrollbar.js');

// 查看我的奖品部分的弹框：三种情况
var tpl_check_login = require('./tpls/check-login.js')();
var tpl_check_verify = require('./tpls/check-verify.js')();
var tpl_check_list = require('./tpls/check-list.js')();
var tpl_check_none = require('./tpls/check-none.js')();

function initModal () {
  return function (txt){
    var modal;
    if( modal ){
        modal.show(txt);
    }else{
      modal = new Modal({
        content : txt,
      });
      modal._create();
    }

    return modal;
  }
}

var award = {
  init: function(){
    this.DOMRender();
    this.eventHandle();
  },

  tpls: function(){
    return '<% for (var i = 0; i < data.length; i++) { %>' +
             '<li><span><%= data[i].nickName %></span><i><%= data[i].lotteryName %></span></i></li>' +
          '<% } %>';
  },

  DOMRender: function(){
    var tpls = this.tpls();
    var _this = this;

    ajax.get('/event/eventLottery!queryPrizeList.action', { "type": "card"}, function(res){
      $('.award_card_list').append(template(tpls)({"data": res.data}));
      // 中奖数量超过6条轮播
      var acount = res.data.length || 0;
      if( acount > 6 ) 
        $('#FontScroll').FontScroll({time: 2000});

    });
  },

  eventHandle: function(){
    // 查看我的奖品
    $('#goAward').on('click', function( e ){
      ajax.get('/event/eventLottery!queryUserCardPrize.action', {}, function(res){
        // 未登录 未验证 暂时没有奖品 有奖品
        var status = res.errorCode;
        switch (status) {
          // 未登录
          case 9999:
            modal = show( template(tpl_check_login)() );
            break;
          // 未认证
          case 3000:
            modal = show( template(tpl_check_verify)() );
            break;
          case 1002:
            modal = show( template(tpl_check_none)({"tips": "暂无奖品<br>快来投资参加我们的活动吧"}) );
            break;
          // 有奖品
          case 0:
            modal = show( template(tpl_check_list)({"data": res.data}) );
            // 用来模拟滚动条
            $("#suc_wrap").mCustomScrollbar({
                theme:"minimal"
            });
            break;
          // 出错
          case 1:
            modal = show( template(tpl_check_none)({"tips": res.msg}) );
            break;
          default:
            break;
        }
      });
    });
  }
};

module.exports = award;

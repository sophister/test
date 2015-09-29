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
      //原show方法会引起定位问题，重写
      modal.hide = function() {
        modal.dom.instance.css({'display':'none'});
      };
      modal.show = function(){
        modal.dom.instance.css({'display':'block'});
      };
    }

    return modal;
  }
}

var award = {
  init: function(){
    this.DOMRender();
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
      _this.eventHandle();

    });
  },
  eventHandle: function(){
    // 轮播
    $('#FontScroll').FontScroll({time: 2000});

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
          // 无记录，没有奖品
          case 1002:
            modal = show( template(tpl_check_none)() );
            break;
          // 有奖品
          case 0:
            modal = show( template(tpl_check_list)({"data": res.data}) );
            // 用来模拟滚动条
            $("#suc_wrap").mCustomScrollbar({
                theme:"minimal"
            });
            break;
          default:
            break;
        }
      });
    });
  }
};

module.exports = award;

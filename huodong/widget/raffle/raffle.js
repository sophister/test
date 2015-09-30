/**
 * 开宝箱效果
 * @return {[type]} [description]
 */
var $ = require('jquery');
var Modal = require('huodong:widget/ui/modal/modal.js');
var template = require('huodong:widget/ui/template/template.js');
var ajax = require('huodong:widget/ui/ajax/ajax.js');
var show = initModal();
var modal;

// 宝箱部分的弹框：10种情况
var tpl_raffle_login = require('./tpls/raffle-login.js')();
var tpl_raffle_verify= require('./tpls/raffle-verify.js')();
var tpl_raffle_reward_info = require('./tpls/raffle-reward-info.js')();
var tpl_raffle_tips = require('./tpls/raffle-tips.js')();

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

var raffle = {
  init: function (){
    this.DOMRender();
    this.eventHandle();
  },

  DOMRender: function(){

    ajax.get('/event/eventLottery!showBox.action', {}, function(res){
      // boxCode字段含义：
      // silverbox:银宝箱; goldbox:金宝箱; diamondbox:钻石宝箱
      
      var el = $('.widget-raffle .gift');
      var title = $('.widget-raffle .title-close');

      if(res && res.data && res.errorCode == 0) {
        var boxCode = res.data.boxCode;
        $('#cash').text(res.data.amount);

        if(boxCode == 'goldbox'){
          title.text('金宝箱');
          el.css({"background-image": "url(/static/huodong/widget/raffle/assets/baoxiang_03.png)"});
        }else if(boxCode == 'diamondbox'){
          title.text('钻石宝箱');
          el.css({"background-image": "url(/static/huodong/widget/raffle/assets/baoxiang_05.png)"});
        }else {
          title.text('银宝箱');
          el.css({"background-image": "url(/static/huodong/widget/raffle/assets/baoxiang_01.png)"});
        }
      }else {
        title.text('银宝箱');
        el.css({"background-image": "url(/static/huodong/widget/raffle/assets/baoxiang_01.png)"});
      }
    });


  },

  eventHandle: function (){
    this.clickBaoxiang();
  },

  /**
   * 点击开宝箱
   * @return {[type]} [description]
   */
  clickBaoxiang: function (){
    var _this = this;

    // 点击宝箱容器
    $(".chest-close").click(function(){
      var el = $(this);
      ajax.get('/event/eventLottery!openBoxLottery.action', {}, function(res){
        var code = res.errorCode;
        // 未登录
        if(code == 9999) {
          modal = show( template(tpl_raffle_login)() );
        }
        // 未认证
        else if(3000 == code ){
          modal = show( template(tpl_raffle_verify)() );
        }
        // 投资金额不足
        else if(2000 == code){
          modal = show( template(tpl_raffle_tips)({"tip": "您的投资金额不足<br>快投资参加我们的活动吧"}) );
        }
        // 返回成功后，继续判断lotteryResult字段情况
        else if(code == 0){
          // lotteryResult字段值如下：
          // 1:投资额不足; 2:未中奖; 3:中奖; 4:今天抽过奖;
          // 5:已经中过奖; 6:可以抽奖; 7:抽奖时间已过期; 8:未到抽奖时间
          var lotteryResult = res.data.lotteryResult;
          var lotteryName = res.data.lotteryName;

          switch ( lotteryResult ) {
            case 1:
              modal = show( template(tpl_raffle_tips)({"tip": "非常抱歉<br>您还没达到开宝箱条件"}) );
              break;
            case 2:
              _this.shake.call(el, function (e){
                modal = show( template(tpl_raffle_tips)({"tip": "差一点点，奖品与你擦肩而过~<br>明天再来试试吧"}) );
              });
              break;
            case 3:
              _this.shake.call(el, function (e){
                // 点击宝箱后弹出的中奖信息弹框
                modal = show( template(tpl_raffle_reward_info)({"data": {"lotteryDetail": lotteryName}}));

                $('#submit').on('click', function(e){
                  var reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

                  if($('.userName').val() == ""  ){
                    alert("收货人姓名不能为空");
                    return false;
                   }
                   if( !reg.test($('.mobile').val()) ){
                    alert("收货人电话格式不正确");
                    return false;
                   }
                   if( $('.province').val() == "" || $('.city').val() == "" || $('.detailedAddress').val() == "" ){
                    alert("请完善收货地址信息");
                    return false;
                   }

                   // 表单提交
                   ajax.post('/event/eventLottery!addUserAddress.action', {
                    "userName": $("#addr .userName").val(),
                    "mobile": $("#addr .mobile").val(),
                    "province": $("#addr .province").val(),
                    "city": $("#addr .city").val(),
                    "detailedAddress": $("#addr .detailedAddress").val()
                   }, function(res){
                     alert('提交成功');
                     modal.hide();
                     return false;
                   });
                });
              });
              break;
            case 4:
              modal = show( template(tpl_raffle_tips)({"tip": "您今天打开过宝箱~<br>明天再来吧"}) );
              break;
            case 5:
              modal = show( template(tpl_raffle_tips)({"tip": "您今天已经中过大奖啦~<br>把机会留给其他朋友吧"}) );
              break;
            case 6:
              modal = show( template(tpl_raffle_tips)({"tip": "可以抽奖"}) );
              break;
            case 7:
              modal = show( template(tpl_raffle_tips)({"tip": "活动时间结束~<br>感谢您的关注"}) );
              break;
            case 8:
              modal = show( template(tpl_raffle_tips)({"tip": "还未到活动时间~<br>明等等吧"}) );
              break;
            default:
              break;
          }
        }
      });
    });
  },

  /**
   * 宝箱摇晃的效果
   * @return {[type]} [description]
   */
  shake: function(fn){
      var that = $(this);
      // 给容器加上摇晃的效果
      this.addClass("shake");
      // 监听动画结束时的webkitAnimationEnd事件
      $(this).on("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function( e ){
        that.closest(".open-has").addClass("opened");
        // 隐藏开宝箱前的图片
        that.removeClass("show");
        // 展示开宝箱后的图片
        that.closest(".mod-chest").find(".chest-open").addClass("show");
        if( fn )
          fn();
      });
  },
};

module.exports = raffle;
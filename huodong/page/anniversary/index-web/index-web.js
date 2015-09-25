/**
 * WEB 活动首页逻辑
 * @type {[type]}
 */
var card = require('huodong:widget/card/card.js');
var Modal = require('huodong:widget/ui/modal/modal.js');
var template = require('huodong:widget/ui/template/template.js');
var modal;
var turn = card.turn;
var show = initModal();

// 卡牌部分的弹框：四种情况
var tpl_card_login = require('./tpls/card-login.js')();
var tpl_card_gift = require('./tpls/card-gift.js')();
var tpl_card_word = require('./tpls/card-word.js')();
var tpl_card_gameover = require('./tpls/card-gameover.js')();
// 兑换部分的弹框：三种情况
var tpl_exchange_verify = require('./tpls/exchange-verify.js')();
var tpl_exchange_success = require('./tpls/exchange-success.js')();
// 查看我的奖品部分的弹框：三种情况
var tpl_check_list = require('./tpls/check-list.js')();
var tpl_check_none = require('./tpls/check-none.js')();
// 宝箱部分的弹框：六种情况
var tpl_raffle_login = require('./tpls/raffle-login.js')();
var tpl_raffle_reward = require('./tpls/raffle-reward.js')();
var tpl_raffle_reward_info = require('./tpls/raffle-reward-info.js')();
var tpl_raffle_tips = require('./tpls/raffle-tips.js')();

var package_list = [
    {
        "ticketId": "1",               
        "ticketName": "5元红包",          
        "ticketCode": ""                
    },
    {
        "ticketId": "1",
        "ticketName": "糯米电影代金券*2",
        "ticketCode": "SDFADF2SDFAAD"
    },
    {
        "ticketId": "1",
        "ticketName": "格劳克斯代金券",
        "ticketCode": "SDFADF2SDFAAD"
    },
    {
        "ticketId": "1",
        "ticketName": "乐普普博士血糖仪兑换券",
        "ticketCode": "SDFADF2SDFAAD"
    }
];

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

var Index = {
    /**
     * 逻辑入口
     * @return {[type]} [description]
     */
    init: function (){
        this.commonToggle();
        this.eventHandle();
    },
    /**
     * 活动说明可折叠
     * @return {[type]} [description]
     */
    commonToggle: function() {
        $(document).ready(function(){
            $('.huodong_info').click(function( e ){
                $('.rules').toggle(500);
            });
        });
    },
    /**
     * 处理卡片翻转
     * @return {[type]} [description]
     */
    turnHandle: function(){
        var verticalOpts = [{'width':0},{'width':'210px'}];
        turn($('#vertical'),100,verticalOpts);
    },
    /**
     * 点击卡片的弹窗处理
     * @return {[type]} [description]
     */
    cardModalHandle: function(){
        
        var wordData = { 'word': '见' };
        var giftData = {
            "position": 1,                
            "lotteryId": 37,               
            "lotteryIndex": 2,             
            "lotteryResult": "WIN",        
            "lotteryName": "格劳克斯代金券",   
            "ticketId": "1",               
            "ticketName": "格劳克斯代金券",   
            "ticketCode": "SDFADF2SDFAAD"   
        };

        // 0为翻牌次数用尽 1为获奖 2为获得文字 3为未登录
        var code = '3';

        $('#vertical').on('click', 'span', function(){
            switch(code) {
                case '0':
                    modal = show( template(tpl_card_gameover)() );
                    break;
                case '1':
                    modal = show( template(tpl_card_gift)(giftData) );
                    break;
                case '2':
                    modal = show( template(tpl_card_word)(wordData) );
                    break;
                case '3':
                    modal = show( template(tpl_card_login)() );
                    break;
                default:
                    break;
            }
            return false;
        });
    },
    /**
     * 点击兑换按钮部分
     * @return {[type]} [description]
     */
    wordModalHandle: function(){
        var target = $('.widget-word button');
        // 0为未登录 1为未验证 2为兑换成功
        var flag = '2';
        target.on('click', function( e ){
            switch(flag) {
                case '0':
                    modal = show( template(tpl_card_login)() );
                    break;
                case '1':
                    modal = show( template(tpl_exchange_verify)() );
                    break;
                case '2':
                    modal = show( template(tpl_exchange_success)({"data": package_list}) );

                    // 用来模拟滚动条
                    console.log($("#suc_wrap"))
                    $("#suc_wrap").mCustomScrollbar({
                        theme:"minimal"
                    });

                    break;
                default:
                    break;
            }
            
            return false;
        });
    },
    /**
     * 开宝箱
     * @return {[type]} [description]
     */
    reffleHandle: function (){
        var _this = this;
        // 0为未登录 1为未达到开宝箱条件 2为当天已经开过 3为未中奖 4为中奖 5为中奖后填写地址等收获信息
        var flag = '1';

        // 点击宝箱容器
        $(".chest-close").click(function(){
            switch (flag) {
                case '0':
                    modal = show( template(tpl_raffle_login)() );
                    break;
                case '1':
                    modal = show( template(tpl_raffle_tips)({"tip": "非常抱歉<br>您还没达到开宝箱条件"}) );
                    break;
                case '2':
                    modal = show( template(tpl_raffle_tips)({"tip": "您今天打开过宝箱~<br>明天再来哦"}) );
                    break;
                case '3':
                    _this.shake.call(this, function(){
                        modal = show( template(tpl_raffle_tips)({"tip": "差一点点，奖品与你擦肩而过~<br>明天再来试试吧"}) );
                    });
                    break;
                case '4':
                    _this.shake.call(this, function(){
                        modal = show( template(tpl_raffle_reward)({
                            "name": "高级定制文具礼盒一套",
                            "src": "/static/huodong/widget/raffle/assets/baoxiang_02.png"
                        }) );
                    });
                    break;
                default:
                    break;
            }
        });
    },
    /**
     * 宝箱摇晃的效果
     * @return {[type]} [description]
     */
    shake: function(fn){
        var that = this;

        // 给容器加上摇晃的效果
        $(this).addClass("shake");
        // 监听动画结束时的webkitAnimationEnd事件
        this.addEventListener("webkitAnimationEnd", function(){

          $(that).closest(".open-has").addClass("opened");

          // setTimeout(function(){
            // 隐藏开宝箱前的图片
            $(that).removeClass("show");
            // 展示开宝箱后的图片
            $(that).closest(".mod-chest").find(".chest-open").addClass("show");
            fn();
          //   setTimeout(function(){
          //     $(".chest-open").addClass("blur");
          //   },200);

          // },200);

        }, false);
    },
    /**
     * 点击查看我的礼品
     * @return {[type]} [description]
     */
    previewGift: function(){
        // 0为未登录 1为查看我的礼品 2为暂时没有礼品
        var status = '1';
        $('#goAward').on('click', function( e ){
            switch (status) {
                case '0':
                    modal = show( template(tpl_card_login)() );
                    break;
                case '1':
                    modal = show( template(tpl_check_list)({"data": package_list}) );
                    break;
                default:
                    break;
            }
        });
    },
    /**
     * 事件处理
     * @return {[type]} [description]
     */
    eventHandle: function(){
        this.turnHandle();
        this.cardModalHandle();
        this.wordModalHandle();
        this.previewGift();
        this.reffleHandle();
    }
};

module.exports = Index;

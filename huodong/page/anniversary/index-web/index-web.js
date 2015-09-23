/**
 * WEB 活动首页逻辑
 * @type {[type]}
 */
var card = require('huodong:widget/card/card.js');
var Modal = require('huodong:widget/ui/modal/modal.js');
var raffle = require('huodong:widget/raffle/raffle.js');
var modal;
var turn = card.turn;
var show = initModal();

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
      //原生show方法会引起定位问题，重写
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
        this.eventHandle();
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
        // 翻牌后获得文字的弹框内容
        var wordArr = [];
        var word = '见';
        wordArr.push('<h3>恭喜您获得幸运文字</h3>');
        wordArr.push('<div class="word_wrap"><span><i>' + word + '</i></span></div>');
        wordArr.push('<p>集齐幸运文字可获得心意礼包</p>');

        // 翻牌后获得奖励的弹框内容
        var giftArr = [];
        var giftName = '糯米电影优惠券';
        var giftCode = 'HHHHHHHHHHHHHHHH';
        var giftAddr = 'www.renrendai.com';
        giftArr.push('<div class="gift_wrap">')
            giftArr.push('<h3>' + giftName + '</h3>');
            giftArr.push('<div class="ptag_wrap"><span>兑换码：<strong>' + giftCode + '</strong></span><br>');
            giftArr.push('<span>使用地址：' + giftAddr + '</span></div>');
        giftArr.push('</div>');

        // 翻牌次数已用尽
        var gameoverArr = [];
        gameoverArr.push('<h3>您今天牌翻的次数已用尽!<br>明天再来试试</h3>');

        // 0为翻牌次数用尽 1为获奖 2为获得文字
        var code = '2';

        $('#vertical').on('click', 'span', function(){
            switch(code) {
                case '0':
                    show( gameoverArr.join('') );
                    break;
                case '1':
                    show( giftArr.join('') );
                    break;
                case '2':
                    modal = show( wordArr.join('') );
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

        // 未验证
        var verifyArr = [];
        verifyArr.push('<div class="verify_wrap">')
            verifyArr.push('<h3>您还没有进行身份验证</h3>');
            verifyArr.push('<p>完成验证后才可参与活动哦</p>');
            verifyArr.push('<a href="#" class="verify">马上验证</a>');
        verifyArr.push('</div>');

        // 未登录
        var loginArr = [];
        loginArr.push('<div class="login_wrap">')
            loginArr.push('<h3>您还没有登录哦</h3>');
            loginArr.push('<div class="button_wrap"><a href="#" class="login">登录</a><a href="#" class="register">注册</a></div>');
        loginArr.push('</div>');

        // 兑换成功
        var successArr = [];
        
        successArr.push('<h3>恭喜您集齐幸运文字！<br>获得心意礼包</h3>');
        successArr.push('<div class="suc_wrap" id="suc_wrap">')
            for (var i = 0; i < 5; i++) {
                successArr.push('<div class="gift_wrap">')
                successArr.push('<h3>' + 'giftName' + '</h3>');
                successArr.push('<div class="ptag_wrap"><span>兑换码：<strong>' + 'giftCode' + '</strong></span><br>');
                successArr.push('<span>使用地址：' + 'giftAddr' + '</span></div></div>');
            }
        successArr.push('</div>');
        // 0为未登录 1为未验证 2为兑换成功 3为查看礼品
        var flag = '2';

        target.on('click', function( e ){
            switch(flag) {
                case '0':
                    show( loginArr.join('') );
                    break;
                case '1':
                    show( verifyArr.join('') );
                    break;
                case '2':
                    modal = show( successArr.join('') );

                    $("#suc_wrap").mCustomScrollbar({
                        theme:"minimal"
                    });

                    break;
                case '3':
                    show( loginArr.join('') );
                    break;
                default:
                    break;
            }
            
            return false;
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

        raffle();
    }
};

module.exports = Index;

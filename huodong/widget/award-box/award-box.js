var $ = require('jquery');
var template = require('huodong:widget/ui/template/template.js');
var ajax = require('huodong:widget/ui/ajax/ajax.js');
var Modal = require('huodong:widget/ui/modal/modal.js');

var FontScroll = require('huodong:widget/ui/font_scroll/font_scroll.js');
var show = initModal();
var modal;

// 弹框模板片段
var tpl_box_login = require('./tpls/box-login.js')();
var tpl_box_verify= require('./tpls/box-verify.js')();
var tpl_box_reward_change = require('./tpls/box-reward-change.js')();
var tpl_box_reward = require('./tpls/box-reward.js')();
var tpl_box_tips = require('./tpls/box-tips.js')();

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

var box = {
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

    ajax.get('/event/eventLottery!queryPrizeList.action', { "type": "box"}, function(res){

      $('.award_box_list').append(template(tpls)({"data": res.data}));
      
      var acount = res.data.length || 0;
      if( acount > 6 ) 
        $('#boxScroll').FontScroll({time: 2000});

    });
  },

  eventHandle: function(){
    this.viewGift();
  },

  viewGift: function(){
    var _this = this;

    // 点击查看我的奖品
    $('#myGift').on('click', function( e ){
      ajax.get('/event/eventLottery!queryUserBoxPrize.action', {}, function(res){

        // 未登录 未验证 暂时没有奖品 有奖品(点击后会跳转到修改地址处)
        var code = res.errorCode;
        // 未登录
        if(code == 9999) {
          modal = show(template(tpl_box_login)());
        }
        // 未认证
        else if(code == 3000){
          modal = show( template(tpl_box_verify)() );
        }
        // 暂无获奖
        // 有：展示对应的奖品
        // 无：展示提示弹框告诉用户暂无奖品
        else if(code == 1002){
          modal = show( template(tpl_box_tips)({"tip": "暂无奖品<br>快投资参加我们的活动吧"}));
        }
        // 返回成功后，继续判断lotteryResult字段情况
        else if(code == 0){
          var boxCode = res.data.boxCode;
          // 不同宝箱对应的奖品名称
          var lotteryName = res.data.lotteryName;
          // 弹出宝箱的图片
          var boxSrc = "/static/huodong/widget/raffle/assets/baoxiang_02.png";
          if (boxCode == "goldbox") {
            boxSrc = "/static/huodong/widget/raffle/assets/baoxiang_04.png";
          } else if(boxCode == "diamondbox") {
            boxSrc = "/static/huodong/widget/raffle/assets/baoxiang_06.png";
          }

          // 点击宝箱后弹出的中奖信息弹框
          modal = show( template(tpl_box_reward)({
            "data": {
              "name": lotteryName,
              "src": boxSrc
            }
          }));

          // 点击修改地址
          $('.raffle_big_wrap').on('click', 'span', function (e){
            var data = { "lotteryName": lotteryName };
            
            ajax.get('/event/eventLottery!queryUserAddress.action', {}, function(res){
              if( res.errorCode == 0 )
                data = $.extend(data, res.data);

              $('.raffle_big_wrap').html(" ").append(template(tpl_box_reward_change)({"data": data}));
              
              _this.checkForm();

            });
          });
          
        }
      
      });
    });
  },
  
  checkForm: function(){
    $('#confirm').on('click', function(e){
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
       ajax.post('/event/eventLottery!updateUserAddress.action', {
        "userName": $("#addrChange .userName").val(),
        "mobile": $("#addrChange .mobile").val(),
        "province": $("#addrChange .province").val(),
        "city": $("#addrChange .city").val(),
        "detailedAddress": $("#addrChange .detailedAddress").val()
       }, function(res){
        alert('修改地址成功');
         modal.hide();
         return false;
       });
    });
  }
};

module.exports = box;

define([
  'jquery', 
  'text!components/award-box/award-box.html', 
  'css!components/award-box/award-box.css',
  'ajax',
  'template',
  'modal',
  'font_scroll',
  'tpl_box_login',
  'tpl_box_verify',
  'tpl_box_tips',
  'tpl_box_reward',
  'tpl_box_reward_change'
], function ($, tpl, css, ajax, template, Modal, font_scroll, tpl_box_login, tpl_box_verify, tpl_box_tips, tpl_box_reward, tpl_box_reward_change){

  var show = initModal();
  var modal;

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
  };

  var awardBox = {

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
      // 模板异步插入
      $('#sec_07').append(tpl);

      var tpls = this.tpls();
      var _this = this;

      // ajax.get('/event/eventLottery!queryPrizeList.action', { "type": "box"}, function(res){
      ajax.get('/event/eventLottery/queryPrizeList.json', { "type": "box"}, function(res){

        $('.award_box_list').append(template(tpls)({"data": res.data}));
        
        var acount = res.data.length || 0;
        if( acount > 5 ) 
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
        // ajax.get('/five_annual/box_info', {}, function(res){
        ajax.get('/five_annual/box_info.json', {}, function(res){
          // 未登录 未验证 暂时没有奖品 有奖品(点击后会跳转到修改地址处)
          var code = res.status;
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
            modal = show( template(tpl_box_tips)({"tips": "暂无奖品<br>快投资参加我们的活动吧"}));
          }
          // 返回成功后，继续判断lotteryResult字段情况
          else if(code == 0){
            var boxCode = res.data.boxCode;
            // 不同宝箱对应的奖品名称
            var lotteryName = res.data.lotteryName;
            // 弹出宝箱的图片
            var boxSrc = "components/raffle/assets/baoxiang_02.png";
            if (boxCode == "goldbox") {
              boxSrc = "components/raffle/assets/baoxiang_04.png";
            } else if(boxCode == "diamondbox") {
              boxSrc = "components/raffle/assets/baoxiang_06.png";
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

        ajax.get('/five_annual/update_addressee', {
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
  
  awardBox.init();

});
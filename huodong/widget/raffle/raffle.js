/**
 * 开宝箱效果
 * @return {[type]} [description]
 */
module.exports = function (){

  // 点击宝箱容器
  $(".chest-close").click(function(){

    var that = this;

    // 给容器加上摇晃的效果
    $(this).addClass("shake");
    // 监听动画结束时的webkitAnimationEnd事件
    this.addEventListener("webkitAnimationEnd", function(){

      $(that).closest(".open-has").addClass("opened");

      setTimeout(function(){
        // 隐藏开宝箱前的图片
        $(that).removeClass("show");
        // 展示开宝箱后的图片
        $(that).closest(".mod-chest").find(".chest-open").addClass("show");

        setTimeout(function(){
          $(".chest-open").addClass("blur");
        },200);

      },200);

    }, false);

  });

};
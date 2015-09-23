/**
 * 开宝箱效果
 * @return {[type]} [description]
 */
module.exports = function (){
  $(".chest-close").click(function(){
    $(this).addClass("shake");
    var that=this;
    this.addEventListener("webkitAnimationEnd", function(){
      $(that).closest(".open-has").addClass("opened");
      setTimeout(function(){
        $(that).removeClass("show");
        $(that).closest(".mod-chest").find(".chest-open").addClass("show");
        setTimeout(function(){
          $(".chest-open").addClass("blur");
        },200)
      },200)
    }, false);
  })
};
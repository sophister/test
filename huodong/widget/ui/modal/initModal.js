
/**
 * 初始化Modal
 * @type {[type]}
 */
var Modal = require('huodong:widget/ui/modal/modal.js');
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
}

module.exports = initModal;

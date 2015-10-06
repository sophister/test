define([
  'jquery', 
  'components/info/info.js'
], function ($, info){
  
  var index = {

    init: function(){
      this.DOMRender();
      this.eventHandle();
    },

    DOMRender: function(){
      info.init('rank_detail');
      info.init('sec_081');
      info.init('sec_041');
    },

    eventHandle: function(){
      this.toggleHandle();
    },

    toggleHandle: function(){
      $('.huodong_info').each(function(index, item, input){
        $(item).on('click', function (e){
          $(this).siblings().toggle(500);
        });
      });
    }
  };

  index.init();
  
});
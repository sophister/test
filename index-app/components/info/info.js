define(function (require, exports, module){
  var $ = require('jquery'); 
  var tpl = require('text!components/info/info.html'); 
  var css = require('css!components/info/info.css'); 
  
  var info = {

    init: function(expression){
      this.DOMRender(expression);
    },

    DOMRender: function(ele){
      $('#' + ele).append(tpl);
    }
  };

  module.exports = info;

});
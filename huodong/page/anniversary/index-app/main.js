require.config({
  baseUrl: './',
  paths: {
    jquery: "static/lib/jquery/jquery-1.11.2",
    upload: "static/lib/upload/ajaxfileupload",
    text: "static/lib/requirejs/text",
    css: "static/lib/requirejs/css",
  },
  shim: {
    'uui':{
      deps: ["jquery"]
    },
  }
});

require([
  '../../static/lib/jquery/jquery-1.11.2', 
  '../../static/lib/knockout/knockout-3.2.0.debug',
], function($, ko) {
  

});

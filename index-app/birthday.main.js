require.config({
  baseUrl: './',
  paths: {
    jquery: "static/libs/jquery/1.11.2/jquery",
    text: "static/libs/requirejs/text",
    css: "static/libs/requirejs/css",
    ajax: "static/libs/ajax/ajax",
    modal: "static/libs/modal/modal",
    scrollbar: "static/libs/scrollbar/scrollbar",
    template: "static/libs/template/template",
    font_scroll: "static/libs/font_scroll/font_scroll",
    bridge: "static/libs/bridge/bridge",
    // card relative dialog templates
    tpl_card_login: "components/dialogs/card-login",
    tpl_card_verify: "components/dialogs/card-verify",
  },
  shim: {

  }
});

require([
  'jquery',
  './static/js/birthday.js'
], function($) { 
  // DO SOMETHING.
});

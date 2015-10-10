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
    tpl_exchange_success: "components/dialogs/exchange-success",
    tpl_card_tips: "components/dialogs/card-tips",
    tpl_card_gift: "components/dialogs/card-gift",
    tpl_check_list: "components/dialogs/check-list",
    tpl_card_word: "components/dialogs/card-word",
    // box relative dialog templates
    tpl_box_login: "components/dialogs/box-login",
    tpl_box_verify: "components/dialogs/box-verify",
    tpl_box_tips: "components/dialogs/box-tips",
    tpl_box_reward: "components/dialogs/box-reward",
    tpl_box_reward_info: "components/dialogs/box-reward-info",
    tpl_box_reward_change: "components/dialogs/box-reward-change",
  },
  shim: {

  }
});

require([
  'jquery',
  './components/card/card.js', 
  './components/rank/rank.js', 
  './components/award-box/award-box.js',
  './components/award-card/award-card.js',
  './components/word/word.js', 
  './components/raffle/raffle.js', 
  './index.js'
], function($) { 
  // DO SOMETHING.
});

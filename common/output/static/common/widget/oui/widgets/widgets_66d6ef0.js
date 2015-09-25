define('common:widget/oui/widgets/widgets', ['require', 'exports', 'module', 'common:widget/oui/widgets/captcha', 'common:widget/oui/widgets/counter', 'common:widget/oui/widgets/form', 'common:widget/oui/widgets/list', 'common:widget/oui/widgets/tab', 'common:widget/oui/widgets/slider', 'common:widget/oui/widgets/goTop', 'common:widget/oui/widgets/pswLevel'],function (require, exports, module) {

  var Widgets = {};

  Widgets.Captcha = require('common:widget/oui/widgets/captcha');
  Widgets.Counter = require('common:widget/oui/widgets/counter');
  Widgets.Form = require('common:widget/oui/widgets/form');
  Widgets.List = require('common:widget/oui/widgets/list');
  Widgets.Tab = require('common:widget/oui/widgets/tab');
  Widgets.Slider = require('common:widget/oui/widgets/slider');
  Widgets.GoTop = require('common:widget/oui/widgets/goTop');
  Widgets.pswLevel = require('common:widget/oui/widgets/pswLevel');
  module.exports = Widgets;
});

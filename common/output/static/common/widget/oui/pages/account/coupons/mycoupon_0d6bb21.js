(function() {
  define('common:widget/oui/pages/account/coupons/mycoupon', ['require', 'exports', 'module', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/common', 'common:widget/oui/widgets/widgets', 'common:widget/oui/protocol'],function(require, exports, module) {
    var $,Common,Widgets,Protocol;
    $ = require('common:widget/oui/lib/jquery/1.9.1/jquery');
    Common = require('common:widget/oui/common');
    Widgets = require('common:widget/oui/widgets/widgets');
    Protocol = require('common:widget/oui/protocol');
    initTab = function() {
      var tab;
      return tab = new Widgets.Tab({
        name: 'coupon',
        switched: function (from, to, initialized) {
          if (initialized) {
            return true;
          }
          if (to == 'usedcoupon') {
            new Widgets.List({
              name: 'usedcoupon-list',
              api: Protocol.API.getUsedCoupon,
              filter: false,
              header: true,
              pagination: true,
              hasMore: false,
              rendered: null
            }).init()._update();
          }
          if (to == 'expiredcoupon') {
            new Widgets.List({
              name: 'expiredcoupon-list',
              api: Protocol.API.getExpiredCoupon,
              filter: false,
              header: true,
              pagination: true,
              hasMore: false,
              rendered: null
            }).init()._update();
          }
          return true;
        }
      }).init();
    };
    initList = function(data) {
      var lst;
      return lst = new Widgets.List({
        name: 'unusecoupon-list',
        api: Protocol.API.getUnuseCoupon,
        filter: false,
        header: true,
        pagination: true,
        hasMore: false,
        rendered: null
      }).init(data);
    };
    ret = {
      init: function(selector) {
        initTab();
        return initList(Common.loadJSON(selector, true));
      }
    };
    return module.exports = ret;
  });
}).call(this);
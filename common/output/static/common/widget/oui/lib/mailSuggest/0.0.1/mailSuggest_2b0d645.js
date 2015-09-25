/**
 * Created by bonny on 2014-2-28.
 */
define('common:widget/oui/lib/mailSuggest/0.0.1/mailSuggest', ['require', 'exports', 'module', 'common:widget/oui/lib/jquery/1.9.1/jquery'],function (require, exports, module) {
  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery');
  var mailSuggest = function (opt) {
    this.opt = $.extend({
      domains: ['qq.com', '163.com', '126.com', 'gmail.com', '189.cn', 'sina.com', 'hotmail.com', 'sina.cn']
    }, opt);
  };
  mailSuggest.prototype = {
    run: function (email) {
      var result = {},lists =  [],arr=[];
      var domains = this.opt.domains;
      if (!/@/.test(email)) {
        result.parts = email;
        arr = domains;
      } else {
        var matches = email.match(/(.*)@(.*)/);

        $.each(domains, function (k, v) {
          var reg = new RegExp("^" + matches[2] + "");
          if (reg.test(v)) {
            arr.push(v);
          }
        });
        result.parts = matches[1];
        result.address = matches[2];
      }

      $.each(arr,function(k,v){
        lists.push({email:result.parts + '@'+v});
      });
      result.inputs = email;
      result.lists = lists;
      return result;
    }
  };
  module.exports = mailSuggest;
});

define('common:widget/oui/page', ['require', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/common'],function(require) {

  var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery');

  $(function() {
    var Common = require('common:widget/oui/common');

    /* Show server message if exists */
    var $msgr = $('#pg-server-message');
    if ($msgr.length > 0) {
      var status = $msgr.data('status'),
          message = $msgr.data('message'),
          isPop = $msgr.data('ispop'),
          data = { message: message };

      if (status !== '') {
        if (status === 0 || status === '0') {
          data.success = true;
          if(isPop+""=="true"){
            data.link = "http://www.we.com/event/catchnew_registerIndex.action";
            data.linkText = "邀请好友投资即得50元红包，多邀多得，快快";
            data.linkTextEnd = "邀请壕友";
          }
        }
        else {
          data.error = true;
        }
        Common.showMessage(data);
      }
    }

    /* about - detail.html */

    var $detail = $('#title-detail');
    var oldTitle = $('title').html();

    if($detail.length > 0){
      $('title').html($detail.html()+' -'+oldTitle);
    }

    /* Initialize pop-tips */
    Common.initPoptips();
  });
});
<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>

<div class="widget-award-card">
  <h3>『&nbsp;获奖名单&nbsp;』<span id="goAward">查看我的奖品</span></h3>
  <div id="FontScroll">
    <ul class="award_card_list"></ul>
  </div>
</div>

<fis:script>
  require(['./award-card'], function ( award ){

    award.init();

  });
</fis:script>
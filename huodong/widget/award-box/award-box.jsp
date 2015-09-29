<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>

<div class="widget-award-box">
  <h3>『&nbsp;获奖名单&nbsp;』<a href="#" id="goAward">查看我的奖品</a></h3>
  
  <div id="boxScroll">
    <ul class="award_box_list"></ul>
  </div>
</div>

<fis:script>

  require(['./award-box'], function ( award ){

    award.init();

  });
</fis:script>
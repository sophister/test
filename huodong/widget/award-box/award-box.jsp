<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>

<div class="widget-award-box">
  <h3>『&nbsp;获奖名单&nbsp;』<span id="myGift">查看我的奖品</span></h3>
  
  <div id="boxScroll">
    <ul class="award_box_list"></ul>
  </div>
</div>

<fis:script>

  require(['./award-box'], function ( box ){

    box.init();

  });
</fis:script>
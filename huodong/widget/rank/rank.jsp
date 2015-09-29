<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>

<div class="widget-rank">
  <h3>我的排名：第<strong id="myrank"></strong>名</h3>
  <ul class="left" id="left">
  </ul>
  <ul class="right" id="right">
  </ul>
</div>

<fis:script>
  require(['./rank']);
</fis:script>
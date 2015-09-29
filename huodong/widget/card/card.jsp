<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>

<div class="widget-card">
  <h3>翻欢乐卡牌&nbsp;&nbsp;&nbsp;&nbsp;享心意好礼</h3>
  <h4>每天有<strong>5</strong>次翻牌机会</h4>
  <div class="card-container">
    <div id="vertical" class="brand vertical">
      
    </div>
  </div>
</div>

<fis:script>
  require(['./card'], function (card){
    card.init();
  });
</fis:script>



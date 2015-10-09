<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>

<div class="raffle-circle">
  <div class="widget-raffle">
    <div class="open-has">
      <h4 class="title-close"></h4>
      <div class="mod-chest">
        <!-- 宝箱容器 -->
        <div class="chest-close show ">
          <div class="gift"></div>
        </div>
        <div class="chest-open"></div>
      </div>
    </div>
  </div>
</div>

<fis:script>
  require(['./raffle'], function( raffle ){
    raffle.init();
  });
</fis:script>
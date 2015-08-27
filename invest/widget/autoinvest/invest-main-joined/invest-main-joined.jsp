<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<div class="ui-tab-content p35" data-name="joined">
  <div class="text-right text-big color-red-text mb10">
          <span class="mr50">加入总人次 <em id="joined-count"></em> 人</span>
          <span class="mr10">人均月投资金额 <em id="reserve-had-pay-amount"></em> 元</span>
        </div>
  <ul id="joined-records" class="ui-list ui-list-s"></ul>
   <%--加入记录列表模板--%>
  <fis:widget name="invest:widget/ui/invest-main-joined-ui/invest-main-joined-ui.jsp"/>
</div>
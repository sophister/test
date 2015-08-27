<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<fis:extends name="common:page/layout/base.jsp">
  <fis:block name="block_body">
    <%--薪计划基础信息--%>
   <fis:widget name="invest:widget/autoinvest/invest-header-base/invest-header-base.jsp"/>
    <%--薪计划TAB内容--%>
   <fis:widget name="invest:widget/autoinvest/invest-main-tab/invest-main-tab.jsp"/>
    <%--薪计划尾部列表--%>
   <fis:widget name="invest:widget/autoinvest/invest-footer-list/invest-footer-list.jsp"/>

   <div id="pg-autoinvest-join" class="pg-details">
      <div id="pg-helper">
        <span id="pg-helper-plan-id">${ autoInvestPlan.id }</span>
        <span id="pg-helper-is-investor"><s:if test="hasRole == true">true</s:if><s:else>false</s:else></span>
        <span id="pg-helper-be-investor-message">${ message }</span>
        <span id="pg-helper-has-withdraw-password"><s:if test="isCashPwd != 'false'">true</s:if><s:else>false</s:else></span>
        <span id="pg-helper-success-hint">${ successHint }</span>
        <span id="pg-helper-fail-hint">${ failHint }</span>
        <span id="authenticated"><sec:authorize access="isAuthenticated()">true</sec:authorize><sec:authorize access="anonymous">false</sec:authorize></span>
      </div>
    </div>
    <fis:script>
             require(["invest:page/autoinvestplan/details/autoinvestplan"], function(invest){
                invest.basic();
                invest.details();
            });
    </fis:script>

    </fis:block>

    <fis:require name="./autoinvestplan.jsp" />
</fis:extends>
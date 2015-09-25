<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<fis:extends name="common:page/layout/base.jsp">
    <!-- 
    @require "common:widget/oui/oui.css"
    @require "invest:widget/static/invest-common.less"
	-->
		 <fis:block name="block_body">
			<div class="pg-uplan-main " id="pg-uplan-main">
				<div class="mt10 container_12_1080">
					    <%--U计划介绍--%>
					    <fis:widget name="invest:widget/uplan/u-head-basic/u-head-basic.jsp"/>
					    <%--u计划计算器资产介绍--%>
					    <fis:widget name="invest:widget/uplan/u-main-content/u-main-content.jsp"/>
					    <%--u计划tab--%>
					    <fis:widget name="invest:widget/uplan/u-footer-tab/u-footer-tab.jsp"/>
				</div>
			</div>
 
	    </fis:block>

    <fis:require name="./uplan.jsp" />
</fis:extends>
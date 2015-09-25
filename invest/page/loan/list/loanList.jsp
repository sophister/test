<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<fis:extends name="common:page/layout/base.jsp">
    <!-- 
    @require "common:widget/oui/oui.css"
    @require "invest:widget/static/invest-common.less"
	-->
		<fis:block name="block_body">
		    <div class="pg-loan-list" id="pg-loan-list">
				<div class="container_12 mt10">
				    <%--散标列表头部--%>
				    <fis:widget name="invest:widget/loan/loan-list-head/loan-list-head.jsp"/>
				    <%--散标列表--%>
				    <fis:widget name="invest:widget/loan/loan-list-main/loan-list-main.jsp"/>
				    <fis:script>
			             require(["invest:page/loan/list/loanList"], function(list){
			                list.getList();
			            });
		    		</fis:script>
	    		</div>
    		</div>
		</fis:block>


  
    <fis:require name="./loanList.jsp" />
</fis:extends>
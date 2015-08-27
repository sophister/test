<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
  <div class="container_12_1080" >
  	<div class="ui-box-white-bg">
	   <ul class="ui-list ui-list-m   ui-list-invest" id="loan-list"></ul>
	   <div class="mt10 mb10 pagination-box" id="loan-list-pagination"></div>   
	   		
    </div>
  </div>
<fis:widget name="invest:widget/ui/loan-list-main-ui/loan-list-main-ui.jsp"/>
<script id="loan-list-rsp" type="text/x-json">${ loanList }</script>
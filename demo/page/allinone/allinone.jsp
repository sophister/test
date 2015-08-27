<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>

	<fis:extends name="common:page/layout/base.jsp">
		<fis:block name="block_header">
			我不要头部！
		</fis:block>
		<fis:block name="block_body">
			<fis:widget name="common:widget/slideBar/slideBar.jsp"/>
			<div class="block_allinone_css">
				拖拽试试
			</div>
		</fis:block>
		
		<input type="button" id="btn" value="大按钮" />
		<fis:script>
	        require(["./allinone"], function(a){
	            a.drag($('.block_allinone_css')[0]);
	            a.list();
	        });
	    </fis:script>

		<fis:require name="./allinone.jsp" />
	</fis:extends>
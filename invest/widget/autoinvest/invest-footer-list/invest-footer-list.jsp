<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

   <div id="plan-footer" class="plan-footer mt14">
          <div class="container_12_1080" >
                <div class="ui-box-white-bg">
                	<ul class="ul-list-info fn-clear">
                		<li class="fn-left pl25 w160 h50 tetx-left text-big ">历史期数与收益</li>
                		<li class="fn-right pr25 w100 h50 text-right"><a class="text color-blue-text" href="/autoinvestplan/listPlan!listPlan.action">更多历史期数</a></li>
                	</ul>
				    <div class="ui-box-white-bg">
					    <div class="ui-tab-content fn-clear ui-tab-content-current">
					        <ul id="autoinvest-list" class="ui-list ui-list-m ui-list-invest"></ul>
					            <%--加入记录列表模板--%>
  								<fis:widget name="invest:widget/ui/invest-foot-list-ui/invest-foot-list-ui.jsp"/>
  								
					     </div>
				    </div>                    
                   
                </div>
          </div>
   </div>
   

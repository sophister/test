<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<fis:extends name="common:page/layout/base.jsp">
	<fis:block name="block_body">
		<fis:widget name="user:widget/account-header/account-header.jsp" data="${accountMenu}" />
		<div class="main-section">
			<div id="assets-tab">
				<ul class="assets-list-tab fn-clear">
					<li class="assets-tab-li active" data-name="assets-uplan">
						<a>U计划</a>
						<span>(<s:property value="%{ getText('renrendai.currency.format.amount', {financePlanUserStat.currentPlanCount }) }" />)</span>
					</li>
					<li class="assets-tab-li" data-name="assets-autoinvestplan">
						<a>薪计划</a>
						<span>(<s:property value="%{ getText('renrendai.currency.format.amount', {autoInvestPlanUserStat.currentPlanCount }) }" />)</span>
					</li>
					<li class="assets-tab-li" data-name="assets-loan">
						<a>债权</a>
						<span>(<s:property value="%{ getText('renrendai.currency.format.amount', { userLoanRecord.reCollectCount }) }" />)</span>
					</li>
				</ul>
				<div class="assets-tab-content fn-clear" data-name="assets-uplan">
					<div id="pie">
	    			</div>
	    			<div class="assets-detail">
	    				<div class="assets-title uplan-title">U计划 &nbsp;&nbsp;<span><s:if test="financePlanUserStat"><s:property value="%{ getText('renrendai.currency.format.decimal', { financePlanUserStat.assets }) }" /></s:if><s:else>0.00</s:else>元</span></div>
	    				<div class="fn-clear">
	    					<dl class="fn-left w345">
	    						<dt>已赚金额（元）</dt>
	    						<dd><s:if test="financePlanUserStat"><s:property value="%{ getText('renrendai.currency.format.decimal', { financePlanUserStat.sumPlanInterest }) }" /></s:if><s:else>0.00</s:else></dd>
	    					</dl>
	    					<dl class="fn-left w410">
	    						<dt>收益再投资金额（元）</dt>
	    						<dd><s:if test="financePlanUserStat"><s:property value="%{ getText('renrendai.currency.format.decimal', { financePlanUserStat.sumInterestReinvestedAmount }) }" /></s:if><s:else>0.00</s:else></dd>
	    					</dl>
	    				</div>
	    				<div class="fn-clear mt15">
	    					<dl class="fn-left w345">
	    						<dt>已提取金额（元）</dt>
	    						<dd><s:if test="financePlanUserStat"><s:property value="%{ getText('renrendai.currency.format.decimal', {totalCashDrawInterest}) }" /></s:if><s:else>0.00</s:else></dd>
	    					</dl>
	    					<dl class="fn-left w410">
	    						<dt>加入总金额（元）</dt>
	    						<dd><s:if test="financePlanUserStat"><s:property value="%{ getText('renrendai.currency.format.decimal', { financePlanUserStat.sumPlanAmount }) }" /></s:if><s:else>0.00</s:else></dd>
	    					</dl>
	    				</div>
	    			</div>
				</div>
				<div id="my-uplan-tab">
					<ul class="my-uplan-state fn-clear">
						<li class="assets-tab-li active" data-name="holding">
							<a href="javascript:">持有中(<s:if test="financePlanUserStat">${ financePlanUserStat.currentPlanCount }</s:if><s:else>0</s:else>)</a>
						</li>
						<li class="assets-tab-li" data-name="exiting">
							<a href="javascript:">退出中(<s:if test="financePlanUserStat">${ financePlanUserStat.exitingCount }</s:if><s:else>0</s:else>)</a>
						</li>
						<li class="assets-tab-li" data-name="exited">
							<a href="javascript:">已退出(<s:if test="financePlanUserStat">${ financePlanUserStat.exitCount }</s:if><s:else>0</s:else>)</a>
						</li>
					</ul>
                    <div class="assets-tab-content fn-clear" data-name="holding">
                    	<ul class="my-uplan-list uplan-holding-list" id="my-holding-list"></ul>
                    </div>
				</div>
			</div>
		</div>
      <fis:widget name="user:widget/ui/uplan-holding-list.jsp" />
	</fis:block>
	<fis:block name="block_body_js">
		<fis:script>
			require(["user:page/assets/uplan/index"], function(assets){
                assets.init();
            });
		</fis:script>
	</fis:block>
	<fis:require name="user:page/assets/uplan/index.jsp" />
</fis:extends>
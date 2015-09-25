<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%/*这是账户总览*/%>
<fis:extends name="common:page/layout/base.jsp">
    <fis:block name="block_body">
    	<%-- 账户总览导航 --%>
    	<fis:widget name="user:widget/account-header/account-header.jsp" data="${accountMenu}" />
    	<div class="main-section">
	    	<%-- 账户总览个人信息 --%>
	    	<div class="user-info-box fn-clear">
	    		<div class="user-avatar-container mt5 mb5">
                    <s:if test="user.userInfo.avatar == null || user.userInfo.avatar == ''">
	    			  <a href="/account/info!basicInfo.action"><img src="/static/img/account/default-avatar-96.png?__inline" /></a>
                    </s:if>
                    <s:else>
                      <a href="/account/info!basicInfo.action"><img src="${ user.userInfo.avatar }" /></a>
                    </s:else>
	    			<div class="avatar-masking"></div>
	    		</div>
	    		<div class="user-security-container mt5 mb5">
	    			<div class="user-login-info">
	    				${ user.displayName }
	    				<span>上次登录时间   <i class="num"><s:date name="user.lastLoginTime" format="yyyy-MM-dd HH:mm:ss" /></i></span>
	    			</div>
	    			<div class="user-security-box fn-clear">
	    				<span class="user-security-level">安全等级 <label id="sec-level"></label></span>
	    				<a class="safe-rank cellphone ${ user.mobilePassed ? 'light' : '' }" href="/account/info!security.action" title="绑定手机，${ user.mobilePassed ? '已绑定' : '未绑定' }"></a>
	    				<a class="safe-rank man ${ user.idPassed ? 'light' : '' }" href="/account/info!security.action" title="实名认证，${ user.idPassed ? '已设置' : '未设置' }"></a>
	    				<a class="safe-rank lock ${ user.cashPassword != null && user.cashPassword != '' ? 'light' : '' }" href="/account/info!security.action" title="交易密码，${ user.cashPassword != null && user.cashPassword != '' ? '已设置' : '未设置' }"></a>
	    				<a class="safe-rank mail ${ user.username != null && user.username != '' ? 'light' : '' }" href="/account/info!security.action" title="绑定邮箱，${ user.username != null && user.username != '' ? '已绑定' : '未绑定' }"></a>
	    			</div>
	    		</div>
	    		<div class="user-coupon-container">
	    			<dl>
	    				<dt>优惠券</dt>
	    				<dd>
	    					<i>${ unusedCouponNum  }</i> 张
	    				</dd>
	    			</dl>
	    		</div>
	    	</div>

	    	<%-- 账户总览资产 --%>
	    	<div class="user-assets-box">
		    	<ul class="recharge-wrap fn-clear">
		    		<li><a class="orange" href="/account/capital!recharge.action">充值</a></li>
		    		<li><a class="blue" href="/account/capital!withdraw.action">提现</a></li>
		    	</ul>
	    		<div id="assets-tab">
	    			<ul class="account-tab fn-clear">
	    				<li class="acc-tab-li active" data-name="total-assets">
	    					<a>账户总资产(元)</a>
	    					<span><s:property value="%{ getText('renrendai.currency.format.decimal', { financePlanUserStat.assets + autoInvestPlanUserStat.assets + userLoanRecord.lenderPrincipal - userLoanRecord.notPayPrincipal + point.availablePoints + point.frozenPoints }) }" /></span>
	    				</li>
	    				<li class="sign">
	    					=
	    				</li>
	    				<li class="acc-tab-li" data-name="financial-assets">
	    					<a>理财资产(元)</a>
	    					<span><s:property value="%{ getText('renrendai.currency.format.decimal', { financePlanUserStat.assets + autoInvestPlanUserStat.assets + userLoanRecord.lenderPrincipal }) }" /></span>
	    				</li>
	    				<li class="sign">
	    					+
	    				</li>
	    				<li class="acc-tab-li" data-name="balance">
	    					<a>余额(元)</a>
	    					<span><s:property value="%{ getText('renrendai.currency.format.decimal', { point.availablePoints + point.frozenPoints }) }" /></span>
	    				</li>
	    			</ul>
	    			<div class="account-tab-content fn-clear" id="account-tab-pie" data-name="total-assets">
	    				<div id="pie">
	    				</div>
	    			</div>
	    			<div class="account-tab-content" data-name="financial-assets">
	    				2
	    			</div>
	    			<div class="account-tab-content" data-name="balance">
	    				3
	    			</div>
	    		</div>
	    		<div class="inquire-wrap fn-clear">
	    			<div class="inquire">
	    				<a href="/account/invest!backAccount.action">回账查询</a>
	    				<span>共计 <i><s:property value="%{ getText('renrendai.currency.format.decimal', { backAll }) }" /></i></span>
	    			</div>
	    			<div class="statistics">
	    				<a href="/account/invest!statistics.action">理财统计</a>
	    				<span>已赚金额 <i><s:property value="%{ getText('renrendai.currency.format.decimal', { userLoanRecord.lenderEarned + financePlanUserStat.sumPlanInterest + autoInvestPlanUserStat.sumPlanInterest }) }" /></i></span>
	    			</div>
	    		</div>
	    	</div>
	    	<%-- 账户总览交易记录 --%>
	    	<div class="user-trading-box">
	    		<div class="trading-title">我的交易记录
	    			<ul class="fn-clear">
	    				<li><a href="/account/capital.action">全部交易记录</a></li>
	    				<li class="bl"><a href="/account/monthlyBill.action">月度对账单</a></li>
	    			</ul>
	    		</div>
	    		<!-- transanstioncondition -->
    			<ul class="ui-list ui-list-s" id="transactions"></ul>
            	<div class="fn-right mt10 ui-pagination" id="transactions-pagination"></div>
    			<!-- transanstionlist -->
    			<fis:widget name="user:widget/transactionlist/transactionlist.jsp" Logs="${pointLogs}"/>
	        	<!-- transanstionlist -->
	    	</div>
	    </div>
    </fis:block>

    <fis:block name="block_body_js">
        <script id="assets-list-template" type="text/x-handlebars-template">
	    	<div class="assers-detail fn-clear">
	    		<ul class="my-assers-list">
	    			<li class="pie-u" data-id="pie-u"><span></span> U计划  {{pie-u.percent}}  {{pie-u.amount}}元</li>
	    			<li class="pie-x" data-id="pie-x"><span></span> 薪计划   {{pie-x.percent}}  {{pie-x.amount}}元</li>
	    			<li class="pie-s" data-id="pie-s"><span></span> 散标债权   {{pie-s.percent}}  {{pie-s.amount}}元</li>
	    		</ul>
	    		<ul class="my-assers-list">
	    			<li class="pie-d" data-id="pie-d"><span></span> 冻结金额   {{pie-d.percent}}  {{pie-d.amount}}元</li>
	    			<li class="pie-k" data-id="pie-k"><span></span> 可用金额   {{pie-k.percent}}  {{pie-k.amount}}元</li>
	    			</ul>
	    	</div>
		</script>
		<fis:script>
			require(["user:page/account/index/index","user:widget/transactionlist/transactionlist.js"], function(index,transactionlist){
                index.init();
                transactionlist.listinit();
            });
		</fis:script>
        <fis:script>
            window.investAmount = {
              uplan: ${ financePlanUserStat.assets },
              autoinvestplan: ${ autoInvestPlanUserStat.assets },
              loan: ${ userLoanRecord.lenderPrincipal },
              frozen: ${ point.frozenPoints },
              available: ${point.availablePoints }
            }
        </fis:script>
    </fis:block>

    <fis:require name="./index.jsp" />
</fis:extends>
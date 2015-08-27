<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%/*这是PC首页的tpl*/%>
<fis:extends name="common:page/layout/base.jsp">
    <fis:block name="block_body">
    	<!-- user-headr -->
        <fis:widget name="user:widget/account-header/account-header.jsp" data="${accountMenu}" />
        <!-- user-headr -->

        <!-- transanstionrecord-->
        <div class="transrecord main-section">
        	<div class="transtitle fn-clear">
        		<div class="fn-left">全部交易记录</div>
        		<div class="fn-right">已提现金额<span class="n"><s:property value="%{ getText('renrendai.currency.format', { userLoanRecord.withdrawAmount }) }" /></span></div>
        		<div class="fn-right mr25">已充值金额<span class="n"><s:property value="%{ getText('renrendai.currency.format', { userLoanRecord.rechargeAmount }) }" /></span></div>
        		
        	</div>
        	<!-- transanstioncondition -->
        	<div class="condition">
        		<div class="fn-clear time mt15">
        			<div class="opt-tit">起止日期</div>
        			<div class="time-opt selected" value="ONE_MONTH">1个月以内</div>
        			<div class="time-opt" value="THREE_MONTH">3个月以内</div>
        			<div class="time-opt" value="SIX_MONTH">6个月以内</div>
        			<div class="time-opt" value="ONE_YEAR">1年以内</div>
        			<a href="#" class="more">更多 <span class="icon-down3"></span>   
                </span></a>
        		</div>
                <div id="pg-helper" style="display: none;">
                    <span id="pg-helper-year">${ currentYear }</span>
                </div>
                <div class="fn-clear time year hide">
                    <!-- <div class="time-opt" style="margin-left:81px">2014年</div>
                    <div class="time-opt">2013年</div>
                    <div class="time-opt">2012年</div>
                    <div class="time-opt">2011年</div>
                    <div class="time-opt">2010年</div> -->
                    <a href="#" class="less">收起 <span class="icon-up3"></a>
                </div>
        		<div class="fn-clear ty">
        			<div class="opt-tit">交易类型</div>
        			<div class="ty-opt sin selected" value="ALL">全部</div>
        			<div class="ty-opt sin" value="RECHARGE">充值</div>
        			<div class="ty-opt sin" value="CASHDRAW">提现</div>
        			<div class="ty-opt"><span class="text">U计划</span><span class="icon-down2"></span>
                        <div class="selectshow">
                            <ul>
                                <li data-v="UPLAN">全部</li>
                                <li data-v="JOIN_UPLAN">加入U计划</li>
                                <li data-v="CASHDRAW_UPLAN">退出U计划</li>
                            </ul>
                        </div>
                    </div>
                    <div class="ty-opt"><span class="text">薪计划</span> <span class="icon-down2"></span>
                        <div class="selectshow">
                            <ul>
                                <li data-v="AUTO_INVEST_PLAN">全部</li>
                                <li data-v="JOIN_AUTOINVESTPLAN">加入薪计划</li>
                                <li data-v="RECHARGE_AUTOINVESTPLAN">支付薪计划</li>
                            </ul>
                        </div>
                    </div>
        			<div class="ty-opt"><span class="text">债权/散标 </span><span class="icon-down2"></span>
                        <div class="selectshow">
                            <ul>
                                <li data-v="LOAN_AND_TRANSFER">全部</li>
                                <li data-v="LOAN">投资散标</li>
                                <li data-v="REPAID">回收本息</li>
                                <li data-v="IN_REPAID">提前回收债权</li>
                                <li data-v="BUY_DEBT">购买债权</li>
                                <li data-v="LOAN_TRANSFER">债权转让</li>
                            </ul>
                        </div>
                    </div>
        			<div class="ty-opt sin" value="OTHER">其它</div>
        			<a href="#" id="export" href="/account/capital!transactionExport.action" target="_blank" class="fn-right">导出查询结果</a>
        		</div>
        	</div>
        	<!-- transanstioncondition -->
            <div class="fn-clear">
                <ul class="ui-list ui-list-s" id="transactions"></ul>
                <div class="fn-right mt10 mr25px ui-pagination" id="transactions-pagination"></div>
            </div>
    		<!-- transanstionlist -->
    		<fis:widget name="user:widget/transactionlist/transactionlist.jsp" Logs="${ pointLogs }"/>
	        <!-- transanstionlist -->
    	</div>
    	<!-- transanstionrecord -->
        <fis:script>
            require(["./transactions"], function(transaction){
                transaction.init();    
            }); 
        </fis:script>
        
    	
    </fis:block>

    <fis:block name="block_body_js">
        
    </fis:block>

    <fis:require name="./transactions.jsp" />
</fis:extends>
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
        		<div class="fn-left">月度账单</div>
                <div class="dataoption"><span class="text">2015/08/01 - 2015/08/31</span><span class="icon-down2"></span>
                    <div class="selectshow">
                        <ul>
                            <li value="07">2015/07/01 - 2015/07/31</li>
                            <li value="06">2015/06/01 - 2015/06/31</li>
                            <li value="05">2015/05/01 - 2015/05/31</li>
                        </ul>
                    </div>
                </div>
        		<div class="fn-right">已提现金额<span class="n">223,333,000.00</span></div>        		
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
                    <a href="#" class="less">收起 <span class="icon-up3"></a>
                </div>
        		<div class="fn-clear ty">
        			<div class="opt-tit">交易类型</div>
        			<div class="ty-opt sin selected" value="ALL">全部</div>
        			<div class="ty-opt sin" value="RECHARGE">充值</div>
        			<div class="ty-opt sin">提现</div>
        			<div class="ty-opt"><span class="text">U计划</span><span class="icon-down2"></span>
                        <div class="selectshow">
                            <ul>
                                <li value="0">全部</li>
                                <li value="1">电影</li>
                                <li value="3">影人</li>
                                <li value="2">影院</li>
                                <li value="4">商品</li>
                            </ul>
                        </div>
                    </div>
                    <div class="ty-opt">薪计划 <span class="icon-down2"></span></div>
        			<div class="ty-opt">债权 <span class="icon-down2"></span></div>
        			<div class="ty-opt">其它 <span class="icon-down2"></span></div>
        			<a href="#" id="export" href="/account/capital!transactionExport.action" target="_blank" class="fn-right">导出查询结果</a>
        		</div>
        	</div>
        	<!-- transanstioncondition -->
            <div class="fn-clear">
                <ul class="ui-list ui-list-s" id="transactions"></ul>
                <div class="fn-right mt10 ui-pagination" id="transactions-pagination"></div>
            </div>
    		
    		<!-- transanstionlist -->
    		<fis:widget name="user:widget/transactionlist/transactionlist.jsp"/>
	        <!-- transanstionlist -->
    	</div>
    	<!-- transanstionrecord -->
        
        <script id="transactions-rsp" type="text/x-json">${ pointLogs }</script>
    	
    </fis:block>

    <fis:block name="block_body_js">
        
    </fis:block>

    <fis:require name="./monthbills.jsp" />
</fis:extends>
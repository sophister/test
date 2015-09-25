<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="s" uri="/struts-tags" %>

 <div class="loan-list-div container_12_1080 mt20 color-white-bg">
    <div class="fn-clear loan-title  pl25 pr25">
        <h3 class="ui-invest-item-title fn-left mr10 text-big">散标投资</h3>
        
        <a class="fn-right ui-cal" target="_blank" href="/lend/calculator.action?prodType=Loanplan">
        	 <span class="icon-cal">
				<span class="path1"></span><span class="path2"></span><span class="path3"></span><span class="path4"></span><span class="path5"></span><span class="path6"></span><span class="path7"></span>
			 </span> 理财计算器 
        </a>
    </div>
      <!-- 散标页黄条 -->
	 <div class="text color-orange-text loan-msg  pl25">
		    <i class="icon  icon-bill-reset "></i>
		         定时发布测试测试提示温馨提示：近期机构担保标与实地认证标发布时间一般为工作日11:00、13:30和17:00。 <a href="http://www.renrendai.com/bbs/posts/list/26966.page"  target="_blank">查看详情</a>  
	</div>
    <div class="fn-clear ui-invest-dl-info pl25 pr25"> 
        <s:if test="transactionAmount!=null">
            <dl class="fn-left   text-center pt20">
            	<dt class="text-big"><span class="cross-line"></span>&nbsp;累计成交总金额&nbsp;<span class="cross-line"></span></dt>
              	<dd class="text-big"><em class="mr10 font-36px color-orange-text">${ transactionAmount}</em><em class="unit">亿元</em></dd>

            </dl>
            <dl class="fn-left    text-center pt20">
               	<dt class="text-big"><span class="cross-line pr3"></span>&nbsp;累计成交总笔数&nbsp;<span class="cross-line"></span></dt>
              	<dd class="text-big"><em class="mr10 font-36px color-orange-text">${ transactionCount}</em><em class="unit">笔</em></dd>

            </dl>
            <dl class="fn-left    text-center pt20">
              	<dt class="text-big"><span class="cross-line"></span>&nbsp;为用户累计赚取&nbsp;<span class="cross-line"></span></dt>
              	<dd class="text-big"><em class="mr10 font-36px color-orange-text">${ earnAmount}</em><em class="unit">万元</em></dd>

            </dl>
          </s:if>
    </div>
<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="s" uri="/struts-tags" %>

    <div class="pg-uplan-product color-white-bg">
        <div class="fn-clear pg-uplan-product-list text-l mt15 pl40 pr40">
          <div class="fn-left pg-uplan-product-item border-right-gray">
            <dl class="border-bottom-gray">
              <dt>U计划 A</dt>
              <dd>
                <span class="mr20 text-big ">预期年收益</span>
                <span class="nian color-orange-text"><em class="num-family"><s:property value="%{ getText('renrendai.currency.format.amount', {financePlanVoA.expectedYearRateDigt}) }" /></em>％</span>
              </dd>
              <dd>
                <span class="mr20 text-big  ">锁定期限</span>
                <span><em class="num-family">${financePlanVoA.lockPeriod}</em>个月</span>
              </dd>
              <dd>
                <span class="mr20 text-big  ">起投金额</span>
                <span><em class="num-family"><s:property value="%{ getText('renrendai.currency.format.amount', { financePlanVoA.minRegisterAmount }) }" /></em>元</span>
              </dd>
              <dd class="basic-progress">
                <span class="mr20 text-big ">进度</span>
                <span class="process">
                <s:if test="financePlanVoA.processRatio > 0">
                 <div class="basic-progress-bg ho"> <b class="basic-percent" style="width:${financePlanVoA.processRatio}%"></b></div><span><em>${financePlanVoA.processRatio}</em>%</span>
              	</s:if>
              	<s:else>
              	<div class="basic-progress-bg"> <b class="basic-percent" style="width:${financePlanVoA.processRatio}%"></b></div><span><em>${financePlanVoA.processRatio}</em>%</span>
              	</s:else>
                </span>
              </dd>
            </dl>
            <p class="J_click_p" data="${financePlanVoA.id}" data1="${financePlanVoA.status}">
            	<s:if test="financePlanVoA.status == 4 ">
            	    	<a href="/financeplan/listPlan!detailPlan.action?financePlanId=${financePlanVoA.id}">立即加入</a>
            	</s:if>
            	<s:elseif test="financePlanVoA.status == 3">
				    <a id="J_count_time_a" data1="${financePlanVoA.waitTime}" data2="${financePlanVoA.status}" class="text" href="/financeplan/listPlan!detailPlan.action?financePlanId=${financePlanVoA.id}">等待加入</a></s:elseif>
            	<s:else><a href="/financeplan/listPlan!detailPlan.action?financePlanId=${financePlanVoA.id}">查看详情</a></s:else>
            </p>
          </div>
          <div class="fn-left pg-uplan-product-item ">
            <dl>
              <dt class="ub">U计划 B</dt>
              <dd>
                <span class="mr20 text-big ">预期年收益</span>
                <span class="nian color-orange-text"><em class="num-family"><s:property value="%{ getText('renrendai.currency.format.amount', {financePlanVoB.expectedYearRateDigt}) }" /></em>％</span>
              </dd>
              <dd>
                <span class="mr20 text-big ">锁定期限</span>
                <span><em class="num-family">${financePlanVoB.lockPeriod}</em>个月</span>
              </dd>
              <dd>
                <span class="mr20 text-big ">起投金额</span>
                <span><em class="num-family"><s:property value="%{ getText('renrendai.currency.format.amount', { financePlanVoB.minRegisterAmount }) }" /></em>元</span>
              </dd>
              <dd class="basic-progress">
                <span class="mr20 text-big ">进度</span>
                <span class="process">
                <s:if test="financePlanVoB.processRatio > 0">
                 <div class="basic-progress-bg ho"> <b class="basic-percent" style="width:${financePlanVoB.processRatio}%"></b></div><span><em>${financePlanVoB.processRatio}</em>%</span></span>
              	</s:if>
              	<s:else>
              	<div class="basic-progress-bg"> <b class="basic-percent" style="width:${financePlanVoB.processRatio}%"></b></div><span><em>${financePlanVoB.processRatio}</em>%</span></span>
              	</s:else>
              </dd>
            </dl>
            <p class="J_click_p" data="${financePlanVoB.id}" data1="${financePlanVoB.status}">
            	<s:if test="financePlanVoB.status == 4 ">
            	    	<a href="/financeplan/listPlan!detailPlan.action?financePlanId=${financePlanVoB.id}">立即加入</a>
            	</s:if>
            	<s:elseif test="financePlanVoB.status == 3">
				    <a id="J_count_time_b" data1="${financePlanVoB.waitTime}" data2="${financePlanVoB.status}" class="text" href="/financeplan/listPlan!detailPlan.action?financePlanId=${financePlanVoB.id}">等待加入</a></s:elseif>
            	<s:else><a href="/financeplan/listPlan!detailPlan.action?financePlanId=${financePlanVoB.id}">查看详情</a></s:else>
            </p>
          </div>
          <div class="fn-left pg-uplan-product-item hover border-right-gray">
            <dl>
              <dt>U计划 C</dt>
              <dd>
                <span class="mr20 text-big ">预期年收益</span>
                <span class="nian color-orange-text"><em class="num-family"><s:property value="%{ getText('renrendai.currency.format.amount', {financePlanVoC.expectedYearRateDigt}) }" /></em>%</span>
              </dd>
              <dd>
                <span class="mr20 text-big ">锁定期限</span>
                <span><em class="num-family">${financePlanVoC.lockPeriod}</em>个月</span>
              </dd>
              <dd>
                <span class="mr20 text-big ">起投金额</span>
                <span><em class="num-family"><s:property value="%{ getText('renrendai.currency.format.amount', { financePlanVoC.minRegisterAmount }) }" /></em>元</span>
              </dd>
              <dd class="basic-progress">
                <span class="mr20 text-big ">进度</span>
                <span class="process">
                <s:if test="financePlanVoC.processRatio > 0">
                 <div class="basic-progress-bg ho"> <b class="basic-percent" style="width:${financePlanVoC.processRatio}%"></b></div><span><em>${financePlanVoC.processRatio}</em>%</span>
              	</s:if>
              	<s:else>
              	<div class="basic-progress-bg"> <b class="basic-percent" style="width:${financePlanVoC.processRatio}%"></b></div><span><em>${financePlanVoC.processRatio}</em>%</span>
              	</s:else>
                </span>
              </dd>
            </dl>
             <p class="J_click_p" data="${financePlanVoC.id}" data1="${financePlanVoC.status}">
             	<s:if test="financePlanVoC.status == 4 ">
            	    	<a href="/financeplan/listPlan!detailPlan.action?financePlanId=${financePlanVoC.id}">立即加入</a>
            	</s:if>
            	<s:elseif test="financePlanVoC.status == 3">
				    <a id="J_count_time_c" data1="${financePlanVoC.waitTime}" data2="${financePlanVoC.status}" class="text" href="/financeplan/listPlan!detailPlan.action?financePlanId=${financePlanVoC.id}">等待加入</a></s:elseif>
            	<s:else><a href="/financeplan/listPlan!detailPlan.action?financePlanId=${financePlanVoC.id}">查看详情</a></s:else>
            </p>
          </div>
        </div>

        <div class="fn-right text ui-box-text">
            <a target="_blank" href="/financeplan/listPlan!listPlan.action">查看U计划列表 ></a>
          </div>
      </div>
 
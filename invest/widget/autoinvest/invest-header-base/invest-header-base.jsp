<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
    <s:if test="%{ planStatus == 0 || planStatus == 1">
		<s:set name="_planAvailableAmount">
			<s:property value="%{ getText('renrendai.currency.format.amount', {financeLeftAmount}) }" />
		</s:set>
	</s:if>

	<%-- FIXME: 现在暂不支持加入/追加的起始或倍数金额不一致的情况 --%>
	<%-- 加入/追加起始金额 --%>
	<s:set name="_planMinRegFigure"><s:property value="%{ getText('renrendai.currency.format.figure', { autoInvestPlan.minRechargeAmount }) }" /></s:set>
	<s:set name="_planMinRegAmount"><s:property value="%{ getText('renrendai.currency.format.amount', { autoInvestPlan.minRechargeAmount }) }" /></s:set>
	<%-- 加入/追加倍数金额 --%>
	<s:set name="_planMulRegFigure"><s:property value="%{ getText('renrendai.currency.format.figure', { autoInvestPlan.registerMultipleAmount }) }" /></s:set>
	<s:set name="_planMulRegAmount"><s:property value="%{ getText('renrendai.currency.format.amount', { autoInvestPlan.registerMultipleAmount }) }" /></s:set>
	<%-- 投资金额上限 --%>
	<s:set name="_planMaxRegFigure"><s:property value="%{ getText('renrendai.currency.format.figure', { autoInvestPlan.maxRechargeAmount }) }" /></s:set>
	<s:set name="_planMaxRegAmount"><s:property value="%{ getText('renrendai.currency.format.amount', { autoInvestPlan.maxRechargeAmount }) }" /></s:set>
	<%-- 用户已投金额 --%>
	<s:set name="_userInvestedFigure"><s:property value="%{ getText('renrendai.currency.format.figure', { financePlanAmount }) }" /></s:set>
	<s:set name="_userInvestedAmount"><s:property value="%{ getText('renrendai.currency.format.amount', { financePlanAmount }) }" /></s:set>
	<%-- 用户账户余额 --%>
	<s:set name="_userAvailableNumber"><s:property value="%{ getText('renrendai.currency.format.number', { avaliablePoint }) }" /></s:set>
	<s:set name="_userAvailableDecimal"><s:property value="%{ getText('renrendai.currency.format.decimal', { avaliablePoint }) }" /></s:set>
<div id="autoinvest-basic">
  <div class="container_12_1080  mt10 pg-details" id="autoinvest-basic-panel">
		<%-- LEFT SIDE: INFO --%>
		<div class="ui-box-white-bg fn-clear">
			<div class="ui-box-title fn-clear">
				<h3 class="fn-left fn-text-overflow text-big">${ autoInvestPlan.name.replaceAll("(\\d+期|\\d+-\\d+期)", "<span class='text-big'>&nbsp;$1</span>") }</h3>
				<div class="fn-right text ui-box-text">
					<a id="autoinvest-basic-contract" href="javascript:void(0)"
						onclick="javascript:window.open('/autoinvestplan/autoInvestPlanContract.action?autoInvestPlanId=${ autoInvestPlan.id }', '_blank', 'height=768, width=1024,toolbar=no,scrollbars=yes,menubar=no,status=no')">${ autoInvestPlan.name }协议（范本）</a>
				<!--	<a class="icon icon-calculator ml10" title="年利率计算器" target="_blank"
						href="/lend/calculator.action?prodType=Fixed"></a>-->
				</div>
			</div>
            <input type="hidden" id="invest-type" value="AUTOINVEST" /> 
            <input type="hidden" id="hasSameDate" value="${existingAutoInvestPlanId}" />
			<div class="pl25  pr25 pd20 fn-clear">
				<div class="fn-left planinfo">
					<div class="fn-clear pt10 mb25">
                         <dl class="fn-left w260">
                            <dd class="text-xxxl color-orange-text    basic-all">
                                <span class=" num-family">${autoInvestPlan.expectedRate}</span><span class="text-30px">%</span>
                            </dd>
                            <dt>预期年化收益</dt>
                        </dl>
                        <dl class="fn-left w240">
                            <dd class="text-xxxl color-dark-text h56   basic-all">
                                <span id="lockPeriod" data-lockPeriod="${autoInvestPlan.lockPeriod}" class="num-family ">${autoInvestPlan.lockPeriod}</span><span class="text-big basic-text">个月</span>
                            </dd>
                            <dt>锁定期</dt>
                        </dl>

                        <dl class="fn-left w200">
							<dd class="text-xxxl color-dark-text h56    basic-all">
								<span class="num-family ">${ (autoInvestPlan.subpointCountPlan-autoInvestPlan.subpointCountActual) < 0 ? 0 : (autoInvestPlan.subpointCountPlan-autoInvestPlan.subpointCountActual) }</span><span class="text-xxxl color-gray-text num-family ">/<span class="text-36px">${ autoInvestPlan.subpointCountPlan }</span></span><span class="text-big color-gray-text basic-text">人</span>
							</dd>
                            <dt>剩余名额</dt>
						</dl>

					</div>
					<ul>
                        <li class="fn-clear">
                        <span class="hide" id="autoinvest-basic-products" data-products="${ productStr }"></span>
                            <span class="fn-left basic-label">保障方式</span>
                            <span class="fn-left basic-value">本金+利息 <a id="tips_0" class="iconfont" href="/help/security/security!detail.action?flag=bjbz" target="_blank">&#xF046;</a></span>
                             <span class="fn-left basic-label">退出日期</span>
                            <span class="fn-left basic-value"><s:date
                             name="autoInvestPlan.endLockingTime" format="yyyy-MM-dd " /></span>
                        </li>
						<li class="fn-clear">
                          <span class="fn-left basic-label">每月投资金额</span>
                          <span class="fn-left basic-value">
                          <s:property value="%{ getText('renrendai.currency.format.amount', { autoInvestPlan.minRechargeAmount }) }" />
                          ~
                          <s:property value="%{ getText('renrendai.currency.format.amount', { autoInvestPlan.maxRechargeAmount }) }" />元
                          <a id="tips_1" class="iconfont" href="javascript:">&#xF046;</a>
                          </span>

                          <span class="fn-left basic-label">收益处理方式</span>
						  <span class="fn-left basic-value">收益再投</span> 

						</li>

					</ul>
					<div id="tipCon_0" class="ui-poptip fn-hide" data-widget-cid="widget-2" style="width:156px;z-index: 99; position: absolute; left: 264.5px; top: 330.5px; display: none;">
                  <div class="ui-poptip-shadow">
                      <div class="ui-poptip-container">
                          <div class="ui-poptip-arrow ui-poptip-arrow-10" style="left:-21px;top:7px;">
                              <em></em>
                              <span></span>
                          </div>
                          <div data-role="content" class="ui-poptip-content">
                              详情参见<a target="_blank" href="/help/security/security!detail.action?flag=bjbz">本金保障计划</a>
                          </div>
                      </div>
                  </div>
              </div>
          <div id="tipCon_1" class="ui-poptip fn-hide" data-widget-cid="widget-2" style="width:156px;z-index: 99; position: absolute; left: 264.5px; top: 330.5px; display: none;">
                  <div class="ui-poptip-shadow">
                      <div class="ui-poptip-container">
                          <div class="ui-poptip-arrow ui-poptip-arrow-10" style="left:-21px;top:7px;">
                              <em></em>
                              <span></span>
                          </div>
                          <div data-role="content" class="ui-poptip-content">
                              加入时确定，后续月份不可修改
                          </div>
                      </div>
                  </div>
              </div>

				<div class="stamp">
					<s:if test="%{ planStatus == 2}">
                        <em class="INCOME"></em>
					</s:if>
				</div>
      </div>

			<s:if test="%{ planStatus == 0 || planStatus == 1}">

				<div class="fn-right ui-box-gray-bg ui-term-box" id="investment-terminal">

					<dl class="pd15">
						<dt>
							每月投资日  <em class="color-orange-text "><em class="num-xl">${ rechargeDay }</em>日</em> 
						</dt>
						<dd>
				              <s:if test="%{ rechargeDay == 31}">
				              (当月无31日默认为当月最后一日)
				              </s:if>
				              <s:if test="%{ rechargeDay == 30}">
				              (当月无30日默认为当月最后一日)
				              </s:if>
				              <s:if test="%{ rechargeDay == 29}">
				              (当月无29日默认为当月最后一日)
				              </s:if>
						</dd>
					</dl>

				<!-- 加入 已登录-->
				<s:if test="%{ planStatus == 1}">
					<div class="ui-term-content">
						<sec:authorize access="anonymous">
							<p>
								可用金额 <a href="/loginPage.action">登录</a>后可见
							</p>
						</sec:authorize>
						<sec:authorize access="isAuthenticated()">
							<p class="mb4">
							<a href="/account/capital!recharge.action" target="_blank" style="float: right;">充值</a>
							<span style="display:none" id="fee-rate" data-fee-rate="${ financePlan.buyInRate }"></span>
								<span class="mr10">可用金额</span> <em id="max-account"
									data-account="${ _userAvailableNumber }">${ _userAvailableDecimal }</em>元

							</p>
						</sec:authorize>
						<form class="ui-term-form ui-form" autocomplete="off">
							<div class="ui-term-field invest">
                                <s:if test="%{ joinStatus == 1}">
                                  <div class="ui-term-input ui-input ui-input-text" type="text"></div>
                                </s:if>
                                <s:else>
								<input class="ui-term-input ui-input ui-input-text" type="text">
                                </s:else>
								<p class="ui-term-placeholder">输入月投资金额，为${ _planMulRegAmount }元的整数倍</p>
								<p id="share-amount" data-share-amount="${ _planMulRegFigure }" style="display: none;"></p>
                                <p id="max-amount-1" data-amount="${ autoInvestPlan.maxRechargeAmount }" style="display: none;"></p>
                                <p id="min-amount-1" data-amount="${ autoInvestPlan.minRechargeAmount }" style="display: none;"></p>
								<p class="ui-term-inputunit">元 <span class="ui-term-eq share" style="display:none;"></span></p>
                                <s:if test="%{ joinStatus == 1}">
								<p class="rrdcolor-red-text">
									  您已经成功加入本次薪计划
								</p>
                                </s:if>
                                <s:else>
								<p class="mt5 ui-term-gain">
									  本计划共投资<span class="J_totalMyInvest">0</span>元
								</p>
                                </s:else>
								<p class="ui-term-error" style="display: none; padding: 0px;"></p>
							</div>
                            <s:if test="%{ joinStatus == 1}">
							<button class="ui-term-button ui-button ui-button-rect-mid ui-button-blue plan-button HASJOINED disabled"
								type="submit">
                            </s:if>
                            <s:else>
							<button class="ui-term-button ui-button ui-button-rect-mid ui-button-blue plan-button"
								type="submit">
                            </s:else>
								<span class="ui-button-text">加入</span>
							</button>
						</form>
					</div>
				</s:if>

				<!-- 等待加入 已登录-->
				<s:if test="%{ planStatus == 0}">
					<div class="ui-term-content">
						<sec:authorize access="anonymous">
							<p>
								<a href="/loginPage.action">登录</a>后可见
							</p>
						</sec:authorize>
						<sec:authorize access="isAuthenticated()">
							<p class="mb4">
							<a href="/account/capital!recharge.action" target="_blank" style="float: right;">充值</a>
								<span class="mr10">可用金额</span> <em id="max-account"
									data-account="${ _userAvailableNumber }">${ _userAvailableDecimal }</em>元

							</p>
						</sec:authorize>
						<form class="ui-term-form ui-form" autocomplete="off">
							<div class="ui-term-field invest">
								<div class="ui-term-input ui-input ui-input-text" type="text"></div>
					<p id="share-amount" data-share-amount="${ _planMulRegFigure }" style="display: none;"></p>
								<p class="ui-term-placeholder">输入月投资金额，为${ _planMulRegAmount }元的整数倍</p>
								<p class="ui-term-inputunit">
									元 <span class="ui-term-eq share" style="display:none;"></span>
								</p>
								<p class="ui-term-error" style="display: none;"></p>
							</div>
							<br>
							<button class="ui-term-button ui-button ui-button-rect-mid ui-button-blue plan-button ui-button-gray disabled"  disabled="disabled" type="submit">
								<span class="ui-button-text" style="padding-left:0px;" data="${planStatus}" data1="${financeDetailWaitTime}" id="J_WAIT_BUTTON">等待加入</span>
							</button>
						</form>
					</div>
				</s:if>
			</div>
			</s:if>

			<!-- 收益中 -->
			<s:if test="%{ planStatus == 2}">
				<div class="fn-right plan-status plan-income">
					<div class="box">
						<em>已获收益（元）</em><span><s:property
								value="%{ getText('renrendai.currency.format.amount', {earnInterest})}" /></span>
					</div>
					<div class="hr"></div>
					<div class="box">
                        <s:if test="%{ nextRechargeDays !=-1 }">
                        <em>距下次支付还有</em><span>${nextRechargeDays}天</span>
                        </s:if>
                        <s:else>
						<em>距退出还有</em><span>${quitWaitTime}天</span>
                        </s:else>
					</div>
				</div>
			</s:if>

		</div>
	</div>
</div>
<script id="autoinvest-basic-products-template" type="text/x-handlebars-template">
  {{# each products }}<span class="fn-left ui-loantype {{ product }}" title="{{ productName }}"></span>{{/ each }}
  </script>
<script id="select-bank-accounts-template" type="text/x-handlebars-template">
  {{# each accounts }}<option value="{{ userBankId }}">{{ bankType }} {{ dealCardId }}</option>{{ else }}<option value="">请先添加银行卡</option>{{/ each }}
  </script>
<div id="buyType">${bugType}</div>
<s:if test="buyType == 'APPEND'">
<p id="append-action" style="display: none;">!appendFinance</p>
</s:if>
</div>



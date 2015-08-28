<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%/*这是充值页面*/%>
<fis:extends name="common:page/layout/base.jsp">
    <fis:block name="block_body">
        <%-- 账户总览导航 --%>
        <fis:widget name="user:widget/account-header/account-header.jsp" data="${accountMenu}" />

        <div class="main-section">
            
            
            <!--copy 代码-->
        <div id="pg-account-recharge" class="pg-account fn-clear">
          <div>
              <div class="withdraw-wrap color-white-bg fn-clear">
                  <form data-name="recharge"  method="post" id="regchargeForm" name="checkinForm" target="_blank"  action="/account/userCheckin.action">
                    <div class="withdraw-title fn-clear">充值</div>
                      <div class="bankList" id="bankList">
                        <dl class="clearfix">
            
                        </dl>
                        <dl class="clearfix">
            
                        </dl>
                        <dl class="clearfix">
            
                        </dl>
                        <label for="bank" class="error errorforbank" style="display:none"></label>
                      </div>

                      <div class="withdrawInputs">
                        <div class="inputbox">
                          <div >
                            <div id="rechargeWay">
                              <div class="recharge-title J_recharge-title">
                                <ul class="fn-clear">
                                  <li data-way="e-banks" class="active">网银充值</li>
                                  <li data-way="c-banks">渠道充值</li>
                                </ul>
                              </div>
                              <div class="recharge-banks">
                                <div class="e-banks-list">
                                </div>
                                <div class="c-banks-list fn-hide">
                                </div>
                                <div class="banks-limit-table">
                                  <table class="ICBC-table" cellpadding="1" cellspacing="1" width="100%">
                                    <thead>
                                      <tr>
                                         <th width="18%">卡种</th>
                                         <th width="18%">单笔限额(元)</th>
                                         <th width="18%">每日限额(元)</th>
                                         <th width="46%">必要条件</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>储蓄卡</td>
                                        <td>
                                          <p>1000万</p>
                                          <p class="last">200</p>
                                        </td>
                                        <td>
                                          <p>无限额</p>
                                          <p class="last">500</p>
                                        </td>
                                        <td>
                                          <p>工行网银U盾用户</p>
                                          <p class="last">电子银行口令卡及手机短信认证</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table class="ABC-table" cellpadding="1" cellspacing="1" width="100%">
                                    <thead>
                                      <tr>
                                         <th width="18%">卡种</th>
                                         <th width="18%">单笔限额(元)</th>
                                         <th width="18%">每日限额(元)</th>
                                         <th width="46%">必要条件</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>储蓄卡</td>
                                        <td>
                                          <p>100万</p>
                                          <p>50万</p>
                                          <p class="last">1000</p>
                                        </td>
                                        <td>
                                          <p>500万</p>
                                          <p>100万</p>
                                          <p class="last">3000</p>
                                        </td>
                                        <td>
                                          <p>开通2代K宝证书</p>
                                          <p>开通1代K宝证书</p>
                                          <p class="last">开通动态口令卡，IE浏览器证书</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table class="CMB-table" cellpadding="1" cellspacing="1" width="100%">
                                    <thead>
                                      <tr>
                                         <th width="18%">卡种</th>
                                         <th width="18%">单笔限额(元)</th>
                                         <th width="18%">每日限额(元)</th>
                                         <th width="46%">必要条件</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>储蓄卡</td>
                                        <td>
                                          <p>1000万</p>
                                          <p class="last">5000</p>
                                        </td>
                                        <td>
                                          <p>无限额</p>
                                          <p class="last">5000</p>
                                        </td>
                                        <td>
                                          <p>开通专业版UKey</p>
                                          <p class="last">网上或柜台开通大众版</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table class="BOC-table" cellpadding="1" cellspacing="1" width="100%">
                                    <thead>
                                      <tr>
                                         <th width="18%">卡种</th>
                                         <th width="18%">单笔限额(元)</th>
                                         <th width="18%">每日限额(元)</th>
                                         <th width="46%">必要条件</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>储蓄卡</td>
                                        <td>
                                          <p class="last">5万</p>
                                        </td>
                                        <td>
                                          <p class="last">10万</p>
                                        </td>
                                        <td>
                                          <p class="last">开通网银</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table class="CCB-table" cellpadding="1" cellspacing="1" width="100%">
                                    <thead>
                                      <tr>
                                         <th width="18%">卡种</th>
                                         <th width="18%">单笔限额(元)</th>
                                         <th width="18%">每日限额(元)</th>
                                         <th width="46%">必要条件</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>储蓄卡</td>
                                        <td>
                                          <p>50万</p>
                                          <p>1000</p>
                                          <p class="last">5000</p>
                                        </td>
                                        <td>
                                          <p>50万</p>
                                          <p>1000</p>
                                          <p class="last">5000</p>
                                        </td>
                                        <td>
                                          <p>网银盾</p>
                                          <p>动态口令卡、短信动态口令</p>
                                          <p class="last">无需开通、使用账号支付</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table class="GDB-table" cellpadding="1" cellspacing="1" width="100%">
                                    <thead>
                                      <tr>
                                         <th width="18%">卡种</th>
                                         <th width="18%">单笔限额(元)</th>
                                         <th width="18%">每日限额(元)</th>
                                         <th width="46%">必要条件</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>储蓄卡</td>
                                        <td>
                                          <p>30万</p>
                                          <p class="last">3000</p>
                                        </td>
                                        <td>
                                          <p>30万</p>
                                          <p class="last">3000</p>
                                        </td>
                                        <td>
                                          <p>开通数字证书及Key盾</p>
                                          <p class="last">开通通用版（银行网站在线申请）</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table class="CIB-table" cellpadding="1" cellspacing="1" width="100%">
                                    <thead>
                                      <tr>
                                         <th width="18%">卡种</th>
                                         <th width="18%">单笔限额(元)</th>
                                         <th width="18%">每日限额(元)</th>
                                         <th width="46%">必要条件</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>储蓄卡</td>
                                        <td>
                                          <p class="last">5000</p>
                                        </td>
                                        <td>
                                          <p class="last">5000</p>
                                        </td>
                                        <td>
                                          <p class="last">开通网银</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table class="BCOM-table" cellpadding="1" cellspacing="1" width="100%">
                                    <thead>
                                      <tr>
                                         <th width="18%">卡种</th>
                                         <th width="18%">单笔限额(元)</th>
                                         <th width="18%">每日限额(元)</th>
                                         <th width="46%">必要条件</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>储蓄卡</td>
                                        <td>
                                          <p>100万</p>
                                          <p class="last">5000</p>
                                        </td>
                                        <td>
                                          <p>100万</p>
                                          <p class="last">5000</p>
                                        </td>
                                        <td>
                                          <p>开通证书版</p>
                                          <p class="last">开通短信密码</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table class="PSBC-table" cellpadding="1" cellspacing="1" width="100%">
                                    <thead>
                                      <tr>
                                         <th width="18%">卡种</th>
                                         <th width="18%">单笔限额(元)</th>
                                         <th width="18%">每日限额(元)</th>
                                         <th width="46%">必要条件</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>储蓄卡</td>
                                        <td>
                                          <p>100万</p>
                                          <p>10万</p>
                                          <p class="last">1万</p>
                                        </td>
                                        <td>
                                          <p>100万</p>
                                          <p>10万</p>
                                          <p class="last">1万</p>
                                        </td>
                                        <td>
                                          <p>办理UKey+开通银行短信服务</p>
                                          <p>电子令牌</p>
                                          <p class="last">手机短信</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table class="SPDB-table" cellpadding="1" cellspacing="1" width="100%">
                                    <thead>
                                      <tr>
                                         <th width="18%">卡种</th>
                                         <th width="18%">单笔限额(元)</th>
                                         <th width="18%">每日限额(元)</th>
                                         <th width="46%">必要条件</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>储蓄卡</td>
                                        <td>
                                          <p>5000</p>
                                          <p class="last">5000</p>
                                        </td>
                                        <td>
                                          <p>无限额</p>
                                          <p class="last">5万</p>
                                        </td>
                                        <td>
                                          <p>数字证书版</p>
                                          <p class="last">动态密码版</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table class="CMBC-table" cellpadding="1" cellspacing="1" width="100%">
                                    <thead>
                                      <tr>
                                         <th width="18%">卡种</th>
                                         <th width="18%">单笔限额(元)</th>
                                         <th width="18%">每日限额(元)</th>
                                         <th width="46%">必要条件</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>储蓄卡</td>
                                        <td>
                                          <p>50万</p>
                                          <p>5000</p>
                                          <p class="last">300</p>
                                        </td>
                                        <td>
                                          <p>50万</p>
                                          <p>5000</p>
                                          <p class="last">300</p>
                                        </td>
                                        <td>
                                          <p>开通网银u宝</p>
                                          <p>开通网银贵宾版</p>
                                          <p class="last">开通网银大众版</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table class="CEB-table" cellpadding="1" cellspacing="1" width="100%">
                                    <thead>
                                      <tr>
                                         <th width="18%">卡种</th>
                                         <th width="18%">单笔限额(元)</th>
                                         <th width="18%">每日限额(元)</th>
                                         <th width="46%">必要条件</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>储蓄卡</td>
                                        <td>
                                          <p>50万</p>
                                          <p class="last">5000</p>
                                        </td>
                                        <td>
                                          <p>50万</p>
                                          <p class="last">5000</p>
                                        </td>
                                        <td>
                                          <p>开通令牌或阳光网盾</p>
                                          <p class="last">开通手机动态密码</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table class="CITIC-table" cellpadding="1" cellspacing="1" width="100%">
                                    <thead>
                                      <tr>
                                         <th width="18%">卡种</th>
                                         <th width="18%">单笔限额(元)</th>
                                         <th width="18%">每日限额(元)</th>
                                         <th width="46%">必要条件</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>储蓄卡</td>
                                        <td>
                                          <p>100万</p>
                                          <p class="last">1000</p>
                                        </td>
                                        <td>
                                          <p>100万</p>
                                          <p class="last">5000</p>
                                        </td>
                                        <td>
                                          <p>开通Key证书默认额度（可修改）</p>
                                          <p class="last">开通文件证书</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table class="SDB-table" cellpadding="1" cellspacing="1" width="100%">
                                    <thead>
                                      <tr>
                                         <th width="18%">卡种</th>
                                         <th width="18%">单笔限额(元)</th>
                                         <th width="18%">每日限额(元)</th>
                                         <th width="46%">必要条件</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>储蓄卡</td>
                                        <td>
                                          <p class="last">5万</p>
                                        </td>
                                        <td>
                                          <p class="last">5万</p>
                                        </td>
                                        <td>
                                          <p class="last">开通网银</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                  <table class="HXB-table" cellpadding="1" cellspacing="1" width="100%">
                                    <thead>
                                      <tr>
                                         <th width="18%">卡种</th>
                                         <th width="18%">单笔限额(元)</th>
                                         <th width="18%">每日限额(元)</th>
                                         <th width="46%">必要条件</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>储蓄卡</td>
                                        <td>
                                          <p>5万</p>
                                          <p>1000</p>
                                          <p class="last">300</p>
                                        </td>
                                        <td>
                                          <p>10万</p>
                                          <p>5000</p>
                                          <p class="last">1000</p>
                                        </td>
                                        <td>
                                          <p>开通数字证书</p>
                                          <p>开通手机动态密码</p>
                                          <p class="last">开通网银大众版</p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <label>账户余额</label>
                            <em class="value" id="rechargeRemain">￥<!--账户余额代码占位坑-->100</em>元
                          </div>
                            <div class="ui-form-item">
                              <label class="ui-label mt10">充值金额</label>
                              <input class="ui-input" type="text" name="amount" maxlength="9" id="rechargeAmount" data-is="isAmount" value="">
                              <i class="unit">元</i>
                            </div>
                            <!--
                            <div>
                              <label>充值费用</label>
                              <em class="value" id="rechargePoundage">￥0.00</em>元
                              <i id="tips" class="iconfont tips">&#xF046;</i>
                              <div class="ui-poptip fn-hide" id="tipCon">
                        <div class="ui-poptip-shadow">
                        <div class="ui-poptip-container">
                          <div class="ui-poptip-arrow ui-poptip-arrow-10">
                            <em></em>
                            <span></span>
                          </div>
                            <div class="ui-poptip-content" data-role="content">
                              <ol>
                                           充值费用按充值金额的0.5%由第三方平台收取，上限100元，超出部分由人人贷承担。
                              </ol>
                              </div>
                            </div>
                            </div>
                          </div>
                            </div>
                            -->
                            <!--代金卷判断代码占位坑-->
                            <!--
                              <div class="ui-form-item">
                              <label class="ui-label">实际金额</label>
                              <em class="value" id="rechargePay">￥0.00</em>元
                            </div>
                            -->
                            <input type="hidden" value="" id="payFeeType" />
                            <input type="hidden" name="bankId" id="bankId" />
                            <input type="hidden" name="paytype" id="paytype">
                            <div class="ui-form-item widthdrawBtBox">
                              <input id="sub-recharge" type="submit" value="充 值">
                      </div>
                           </div>
                        </div>
                      <div class="worm-tips">
                        <div class="tips-title"><span class="icon"></span>温馨提示</div>
                        <ol>
                          <li>1.为了您的账户安全，请在充值前进行身份认证、手机绑定以及交易密码设置。</li>
                          <li>2.您的账户资金将通过第三方平台进行充值。 </li>
                          <li>3.请注意您的银行卡充值限制，以免造成不便。 </li>
                          <li>4.禁止洗钱、信用卡套现、虚假交易等行为，一经发现并确认，将终止该账户的使用。</li>
                          <li>5.如果充值金额没有及时到账，请联系客服，400-090-6600。</li>
                        </ol>
                      </div>

                  </form>
              <div class="hide">
                  <div id="afterSub" class="afterSub">
                  <h3>请您在新打开的网上银行页面上完成付款</h3>
                  <p>付款完成前请不要关闭此窗口。</p>
                  <p>完成付款后请根据您的情况点击下面的按钮：</p>
                  <a class="ui-button ui-button-mid ui-button-green" id="finishRecharge">已完成付款</a> <a class="ui-button ui-button-mid ui-button-green" id="troubleRecharge">付款遇到问题</a>
                  </div>
              </div>



              </div>
            </div>
             <script id="rechargeBank-list-template" type="text/x-handlebars-template">
          <ul class="fn-clear">
          {{#each rows}}
          <li class="{{className}}" data-value="{{code}}" data-type="{{payChannelStr}}" >
            <img alt="{{fullName}}" src="{{logo}}">
            <a title="{{fullName}}" class="mark-blue" href="javascript:"></a>
            <i class="rt"></i>
          </li>
          {{/each}}
          </ul>
           </script>

           <!--模板数据占位坑-->
           <script id="rechargeBank-list-rsp" type="text/x-json">

              {
                "status": 0,
                "message": "okay",
                "data": {
                    "totalPage": 15,
                    "pageIndex": 0,
                    "rows": [
                        {
                            "bankInfoId": 1,
                            "displayName": "工商银行",
                            "fullName": "中国工商银行",
                            "code": "ICBC",
                            "orderFeild": 10,
                            "logo": "/static/user/page/account/recharge/assets/banks/code_102.png",
                            "isenable": true,
                            "payChannel": "QUICKPAY",
                            "payChannelStr": "QUICKPAY"
                        },
                        {
                            "bankInfoId": 2,
                            "displayName": "农业银行",
                            "fullName": "中国农业银行",
                            "code": "ABC",
                            "orderFeild": 20,
                            "logo": "/static/user/page/account/recharge/assets/banks/code_103.png",
                            "isenable": true,
                            "payChannel": "TENPAY",
                            "payChannelStr": "TENPAY"
                        },
                        {
                            "bankInfoId": 5,
                            "displayName": "招商银行",
                            "fullName": "招商银行",
                            "code": "CMB",
                            "orderFeild": 30,
                            "logo": "/static/user/page/account/recharge/assets/banks/code_308.png",
                            "isenable": true,
                            "payChannel": "QUICKPAY",
                            "payChannelStr": "QUICKPAY"
                        },
                        {
                            "bankInfoId": 3,
                            "displayName": "中国银行",
                            "fullName": "中国银行",
                            "code": "BOC",
                            "orderFeild": 40,
                            "logo": "/static/user/page/account/recharge/assets/banks/code_104.png",
                            "isenable": true,
                            "payChannel": "TENPAY",
                            "payChannelStr": "TENPAY"
                        },
                        {
                            "bankInfoId": 4,
                            "displayName": "建设银行",
                            "fullName": "中国建设银行",
                            "code": "CCB",
                            "orderFeild": 50,
                            "logo": "/static/user/page/account/recharge/assets/banks/code_105.png",
                            "isenable": true,
                            "payChannel": "TENPAY",
                            "payChannelStr": "TENPAY"
                        },
                        {
                            "bankInfoId": 15,
                            "displayName": "广发银行",
                            "fullName": "广东发展银行",
                            "code": "GDB",
                            "orderFeild": 60,
                            "logo": "/static/user/page/account/recharge/assets/banks/code_306.png",
                            "isenable": true,
                            "payChannel": "QUICKPAY",
                            "payChannelStr": "QUICKPAY"
                        },
                        {
                            "bankInfoId": 8,
                            "displayName": "兴业银行",
                            "fullName": "兴业银行",
                            "code": "CIB",
                            "orderFeild": 70,
                            "logo": "/static/user/page/account/recharge/assets/banks/code_309.png",
                            "isenable": true,
                            "payChannel": "QUICKPAY",
                            "payChannelStr": "QUICKPAY"
                        },
                        {
                            "bankInfoId": 9,
                            "displayName": "交通银行",
                            "fullName": "交通银行",
                            "code": "BCOM",
                            "orderFeild": 80,
                            "logo": "/static/user/page/account/recharge/assets/banks/code_301.png",
                            "isenable": true,
                            "payChannel": "QUICKPAY",
                            "payChannelStr": "QUICKPAY"
                        },
                        {
                            "bankInfoId": 7,
                            "displayName": "邮储银行",
                            "fullName": "中国邮政储蓄银行",
                            "code": "PSBC",
                            "orderFeild": 90,
                            "logo": "/static/user/page/account/recharge/assets/banks/code_403.png",
                            "isenable": true,
                            "payChannel": "QUICKPAY",
                            "payChannelStr": "QUICKPAY"
                        },
                        {
                            "bankInfoId": 12,
                            "displayName": "浦发银行",
                            "fullName": "上海浦东发展银行",
                            "code": "SPDB",
                            "orderFeild": 100,
                            "logo": "/static/user/page/account/recharge/assets/banks/code_310.png",
                            "isenable": true,
                            "payChannel": "QUICKPAY",
                            "payChannelStr": "QUICKPAY"
                        },
                        {
                            "bankInfoId": 17,
                            "displayName": "民生银行",
                            "fullName": "中国民生银行",
                            "code": "CMBC",
                            "orderFeild": 110,
                            "logo": "/static/user/page/account/recharge/assets/banks/code_305.png",
                            "isenable": true,
                            "payChannel": "QUICKPAY",
                            "payChannelStr": "QUICKPAY"
                        },
                        {
                            "bankInfoId": 6,
                            "displayName": "光大银行",
                            "fullName": "中国光大银行",
                            "code": "CEB",
                            "orderFeild": 120,
                            "logo": "/static/user/page/account/recharge/assets/banks/code_303.png",
                            "isenable": true,
                            "payChannel": "QUICKPAY",
                            "payChannelStr": "QUICKPAY"
                        },
                        {
                            "bankInfoId": 10,
                            "displayName": "中信银行",
                            "fullName": "中信银行",
                            "code": "CITIC",
                            "orderFeild": 130,
                            "logo": "/static/user/page/account/recharge/assets/banks/code_302.png",
                            "isenable": true,
                            "payChannel": "QUICKPAY",
                            "payChannelStr": "QUICKPAY"
                        },
                        {
                            "bankInfoId": 16,
                            "displayName": "平安银行",
                            "fullName": "平安银行",
                            "code": "SDB",
                            "orderFeild": 140,
                            "logo": "/static/user/page/account/recharge/assets/banks/code_307.png",
                            "isenable": true,
                            "payChannel": "QUICKPAY",
                            "payChannelStr": "QUICKPAY"
                        },
                        {
                            "bankInfoId": 11,
                            "displayName": "华夏银行",
                            "fullName": "华夏银行",
                            "code": "HXB",
                            "orderFeild": 200,
                            "logo": "/static/user/page/account/recharge/assets/banks/code_304.png",
                            "isenable": true,
                            "payChannel": "QUICKPAY",
                            "payChannelStr": "QUICKPAY"
                        }
                    ]
                }
            }

           </script>

        </div>

        
        <!--copy 代码-->

        <fis:script>
            require(["user:page/account/recharge/recharge"], function(){
                
            });
        </fis:script>
    </fis:block>
    
    <fis:require name="./recharge.jsp" />
</fis:extends>
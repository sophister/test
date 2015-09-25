<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib uri="/fis" prefix="fis"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<div class="wdg-second-header">
    <div class="main-section">
        <a href="/" class="brand-logo mt15"></a>
        <ul class="site-nav">
            <li class="user-item fn-clear">
                <sec:authorize access="anonymous">
                    <div class="user-name fn-clear">
                        <a href="/loginPage.action">我的账户</a>
                    </div>
                </sec:authorize>
                <sec:authorize access="isAuthenticated()">
                    <div class="user-avatar-container fn-left">
                        <img id="he-userAvatar" src="/static/img/account/default-avatar-96.png?__inline"  />
                        <div class="avatar-masking"><a href="/account/index.action"></a></div>
                        <a href="/account/comm!mail.action" class="msgcount-icon" id="header-msgcount"></a>
                    </div>
                    <div class="user-name fn-clear">
                        <a href="/account/index.action">我的账户</a>
                    </div>
                </sec:authorize>
            </li>
            <li class="channel-item"><a href="/">首页</a></li>
            <li class="channel-item"><a href="/financeplan/listPlan.action">U计划</a></li>
            <li class="channel-item"><a href="/autoinvestplan/listPlan!detailPlan.action">薪计划</a></li>
            <%--<li class="channel-item"><a href="/lend/loanList.action">散标</a></li>--%>
            <%--<li class="channel-item"><a href="/transfer/transferList.action">债权转让</a></li>--%>
            <li class="channel-item"><a href="/lend/loanList.action">债权</a></li>
            <li class="channel-item"><a href="/lend/loanList!newComerLoan.action">新手专区</a></li>
            <li class="channel-item"><a href="/about/about.action?flag=intro">关于我们</a></li>
        </ul>
    </div>
</div>
<div id="header-helper" style="display: none;">
    <span id="header-helper-authenticated">
      <sec:authorize access="isAuthenticated()">true</sec:authorize>
      <sec:authorize access="anonymous">false</sec:authorize>
    </span>
</div>
<fis:script>
    require(["common:widget/second-header/second-header"], function(header){
        header.init();
    });
</fis:script>
<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

<div class="wdg-top-header">
    <div class="main-section">
        <span class="tel-phone"><i class="icon-phone"></i>客服电话: 400-090-6600</span>
        <ul class="site-nav">
            <li class="nav-item"><i class="icon-mobile3"></i><a href="/event/app.action">移动客户端</a></li>
            <li class="nav-item-split"></li>
            <li class="nav-item"><a href="/help/index.action">帮助中心</a></li>
            <li class="nav-item-split"></li>
            <li class="nav-item">理财论坛</li>
            <li class="nav-item-split"></li>
            <sec:authorize access="anonymous">
                <li class="nav-item"><a href="/loginPage.action">登录</a></li>
                <li class="nav-item-split"></li>
                <li class="nav-item"><a href="/regPage.action?registerSource=web_top">注册</a></li>
            </sec:authorize>
            <sec:authorize access="isAuthenticated()">
                <li class="nav-item"><a href="/j_spring_security_logout">退出</a></li>
            </sec:authorize>
        </ul>
    </div>
</div>

<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%--新手专享卡片--%>
<div class="main-section content-section index-card">
    <div class="card-caption">

    </div>
    <div class="card-detail">
        <div class="we-table">
            <div class="we-head">
                <span class="we-cell we-cell-title">借款标题</span>
                <span class="we-cell we-cell-level">信用等级</span>
                <span class="we-cell we-cell-year-rate">年利率</span>
                <span class="we-cell we-cell-min-money">起投金额</span>
                <span class="we-cell we-cell-duration">期限</span>
                <span class="we-cell we-cell-select"></span>
            </div>
            <c:forEach var="obj" items="${data}">
                <div class="we-row">
                    <span class="we-cell we-cell-title">${obj.title}</span>
                    <span class="we-cell we-cell-level">${obj.level}</span>
                    <span class="we-cell we-cell-year-rate">${obj.rate}</span>
                    <span class="we-cell we-cell-min-money">${obj.minMoney}元</span>
                    <span class="we-cell we-cell-duration">${obj.durationMonth}月</span>
                    <span class="we-cell we-cell-select">
                        <c:choose>
                            <c:when test="${obj.isIn}">
                                <span class="we-btn we-btn-small">已投标</span>
                            </c:when>
                            <c:otherwise>
                                <a href="##" class="we-btn we-btn-small">投标</a>
                            </c:otherwise>
                        </c:choose>
                    </span>
                </div>
            </c:forEach>
        </div>
    </div>
</div>

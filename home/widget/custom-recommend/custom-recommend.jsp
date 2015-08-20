<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%--新手专享卡片--%>
<div class="main-section content-section index-card">
    <div class="card-caption">

    </div>
    <div class="card-detail">
        <div class="index-table">
            <div class="index-list-head">
                <span class="index-cell w178">借款标题</span>
                <span class="index-cell w142">信用等级</span>
                <span class="index-cell w166">年利率</span>
                <span class="index-cell w142">起投金额</span>
                <span class="index-cell w118">期限</span>
                <span class="index-cell w154"></span>
            </div>
            <c:forEach var="obj" items="${data}">
                <div class="index-row">
                    <span class="index-cell w178">${obj.title}</span>
                    <span class="index-cell w142">${obj.level}</span>
                    <span class="index-cell w166">${obj.rate}</span>
                    <span class="index-cell w142">${obj.minMoney}元</span>
                    <span class="index-cell w118">${obj.durationMonth}月</span>
                    <span class="index-cell w154">
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

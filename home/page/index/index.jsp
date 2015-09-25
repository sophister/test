<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%/*这是PC首页的tpl*/%>
<fis:extends name="common:page/layout/base.jsp">

    <fis:block name="block_body">
        <%--顶部大的banner图片--%>
        <div class="index-banner content-section">

        </div>
        <%--banner图片下面的三个特色--%>
        <div class="main-section content-section clearfix info-con">
            <a class="info-item item-0" href="http://www.renrendai.com/guide/investSecurity.action" target="_blank">
                <h2>安全保障</h2>
                <p>所有投资标的100%适用本金保障计划</p>
                <p>人人贷风险金账户已被民生银行托管</p>
                <p>有效保障理财人的本金安全</p>
            </a>
            <a class="info-item item-1" href="http://www.renrendai.com/guide/invest.action" target="_blank">
                <h2>投资理财</h2>
                <p>成为理财人，通过主动投标、加入U计划或</p>
                <p>薪计划将资金进行投资，最高获得12-14%</p>
                <p>的预期年化收益。</p>
            </a>
            <a class="info-item item-2" href="http://www.renrendai.com/guide/invest.action" target="_blank">
                <h2>成交额超过96亿</h2>
                <p>已为用户赚取74,151万元</p>
                <p>累计交易776万人次</p>
            </a>
        </div>

        <%--通知条--%>
        <div class="main-section content-section border-box notice-con">
            <a class="notice-link" href="${notice.url}" target="_blank">${notice.text}</a>
            <span class="notice-date">${notice.date}</span>
            <a class="more" href="/about/about.action?flag=notices" target="_blank">更多公告 -></a>
        </div>

        <%--新手专享--%>
        <fis:widget name="home:widget/custom-recommend/custom-recommend.jsp" data="${newUserRecommend}" />


    </fis:block>

    <fis:block name="block_body_js">

    </fis:block>

    <fis:require name="./index.jsp" />
</fis:extends>
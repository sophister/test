<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%/*这是PC首页的tpl*/%>
<fis:extends name="common:page/layout/base.jsp">
    <fis:block name="block_head_css">
        <link rel="stylesheet" href="/static/index/index.css"/>
    </fis:block>

    <fis:block name="block_body">
        <fis:widget name="common:widget/slideBar/slideBar.jsp"/>

    </fis:block>

    <fis:block name="block_body_js">

    </fis:block>

    <fis:require name="./index.jsp" />
</fis:extends>
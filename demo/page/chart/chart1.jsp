<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%/* 这里是注释 */%>

<fis:extends name="common:page/layout/base.jsp">
    
    <fis:block name="block_body">
        <canvas id="test-1" width="400" height="400"></canvas>
        <h1>chart.js demo</h1>
        <fis:widget name="demo:widget/hello/hello.jsp"></fis:widget>
    </fis:block>

    <fis:block name="block_body_js">

    </fis:block>

    <fis:script>
        require(["demo:widget/ui/chart1/app/app.js"], function(app){
            app.init();
        });
    </fis:script>

    <fis:require name="./chart1.jsp" />

</fis:extends>


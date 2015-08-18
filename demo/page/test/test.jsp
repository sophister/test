<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>


<!-- 继承common的base.jsp -->
<fis:extends name="common:page/layout/base.jsp">
    <fis:block name="block_body">
        this is block body content

        <fis:script>
            require(["./test", "demo:widget/ui/test1/test1.js"], function(a, b){
                console.log(b.name);
            });
        </fis:script>

    </fis:block>
    <!-- 每个页面都需要require自身，不要忘记 -->
    <fis:require name="./test.jsp" />
</fis:extends>


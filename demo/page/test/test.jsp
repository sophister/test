<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>



<!-- 继承common的base.jsp -->
<fis:extends name="common:page/layout/base.jsp">
    <fis:block name="block_body">
        this is block body content

        <fis:script>
            require(["./test", "demo:widget/ui/test1/test1.js"], function(a, b){
                console.log(b.name);
            });
        require(["common:widget/oui/arale/popup/1.1.2/popup", "common:widget/oui/lib/highcharts/3.0.5/highcharts"], function(popup, highcharts){
            console.log(popup);
            console.log(highcharts);
        });

        require(["common:widget/oui/widgets/widgets"], function(widgets){

        });
        </fis:script>

        <span class="icon-logo"></span>

    </fis:block>
    <!-- 每个页面都需要require自身，不要忘记 -->
    <fis:require name="./test.jsp" />
</fis:extends>


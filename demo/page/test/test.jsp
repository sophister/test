<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>



<fis:extends name="common:page/layout/base.jsp">
    
    <fis:block name="block_body">
        this is block body content
    </fis:block>


    <fis:require name="./test.jsp" />

</fis:extends>


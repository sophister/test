<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c'%>

<%/* java代码不能写到block里面 */%>

<%
    List<String>list = new ArrayList<String>();
    list.add(0, "贝贝");
    list.add(1, "晶晶");
    list.add(2, "欢欢");
    list.add(3, "莹莹");
    list.add(4, "妮妮");
    request.setAttribute("list", list);
%>

<fis:extends name="common:page/layout/base.jsp">

    <fis:block name="block_head_css">
        <style>
            #chartdiv {
                width		: 100%;
                height		: 500px;
                font-size	: 11px;
            }
            #chart-2 {
                width: 200px;
                height: 200px;
                font-size: 11px;
            }
        </style>
    </fis:block>

    <fis:block name="block_head_js">

    </fis:block>

    <fis:block name="block_body">
        <h1>am-chart demo</h1>

        <c:set var="score">94</c:set>
        <c:choose>
            <c:when test="${score>=90}">
                你的成绩为优秀！
            </c:when>
            <c:when test="${score>=70&&score<90}">
                您的成绩为良好!
            </c:when>
            <c:when test="${score>60&&score<70}">
                您的成绩为及格
            </c:when>
            <c:otherwise>
                对不起，您没有通过考试！
            </c:otherwise>
        </c:choose>



        <c:forEach var="fuwa" items="${list}">
            <c:out value="${fuwa}"/>
        </c:forEach>

    </fis:block>


    <fis:require name="demo:page/ctag/ctag.jsp" />

</fis:extends>


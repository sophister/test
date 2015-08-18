<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="/fis" prefix="fis"%>


<!DOCTYPE html>
<fis:html framework="/static/js/require.js">
    <fis:head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <%-- 360 浏览器就会在读取到这个标签后，立即切换对应的极速核 --%>
        <meta name="renderer" content="webkit">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>${title}</title>
        <link rel="shortcut icon" type="image/x-icon" href="/static/favicon.ico" />

        <link rel="stylesheet" type="text/css" href="/static/css/base.css">

        <!--header中的css-->
        <fis:block name="block_head_css"></fis:block>

        <!--[if lte IE 8]>
        <script src="/static/js/html5.js"></script>
        <![endif]-->

        <script type="text/javascript" src="/static/js/jquery/jquery.js"></script>
        
        <!--header中的js-->
        <fis:block name="block_head_js"></fis:block>

    </fis:head>

    <fis:body class="body">
        
        <!--[if lt IE 8]>
        <div style='border: 4px solid #FFF500; background: #FDFDC8; text-align: center; clear: both; height: 75px; position: absolute; z-index:999999999; right: 2px; bottom: 2px; padding:0 8px;'>
            <div style='position: absolute; right: 3px; top: 3px; font-weight: bold;z-index:999999999'><a href='#' onclick='javascript:this.parentNode.parentNode.style.display="none"; return false;'>关闭</a></div>
            <div style='width: 740px; margin: 0 auto; text-align: left; padding: 0; overflow: hidden; color: black;'>
                <div style='width: 675px; float: left;'>
                    <div style='font-size: 16px; font-weight: bold; margin-top: 12px;'>您使用的是已经过时的IE浏览器</div>
                    <div style='font-size: 13px; margin-top: 6px; line-height: 16px;'>为了让您在人人贷有最佳的使用体验，请升级到 <a href="http://windows.microsoft.com/en-US/internet-explorer/download-ie">最新版本IE浏览器</a>, 或者使用其他高级浏览器如 <a href="https://www.google.com/intl/en/chrome/browser/">Chrome(谷歌浏览器)</a> 或 <a href="http://www.mozilla.org/en-US/firefox/new">Firefox(火狐浏览器)</a></div>
                </div>
            </div>
        </div>
        <![endif]-->

        <fis:block name="block_header">
            <fis:widget name="common:widget/top-header/top-header.jsp"/>
            <fis:widget name="common:widget/second-header/second-header.jsp"/>
        </fis:block>

        <fis:block name="block_body">
            
        </fis:block>

        <fis:block name="block_footer">
            <fis:widget name="common:widget/footer/footer.jsp"/>
        </fis:block>

        <!--body里面的js-->
        <fis:block name="block_body_js">
            
        </fis:block>        

        <!--livereload-->
        <!--todo : 添加百度统计-->
    </fis:body>

    <fis:require name="./base.jsp" />
    <!-- THX FOR FIS -->
</fis:html>

<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
   <div class="mt14 ui-invest-tab">
  		<%--tab头部--%>
       <div class="container_12_1080" >
         <div class="ui-tab ui-tab-transparent invest-tab-title " id="autoinvest-tab">
          <ul class="ui-tab-items">
            <li class="ui-tab-item ui-tab-item-current" data-name="intro"><a class="ui-tab-item-link">计划介绍</a></li><li class="ui-tab-item" data-name="reserve"><a class="ui-tab-item-link">计划详情</a></li><li class="ui-tab-item" data-name="joined"><a class="ui-tab-item-link">加入记录</a></li><li class="ui-tab-item" data-name="question"><a class="ui-tab-item-link">常见问题</a></li>
          </ul>
        </div>
      </div>
    
 <div class="container_12_1080" id="autoinvest-tab-content">
        <div class="ui-box-white-bg">
            <%--计划介绍--%>
            <div class="ui-tab-content ui-tab-content-current" data-name="intro">
             <fis:widget name="invest:widget/autoinvest/invest-main-intro/invest-main-intro.jsp"/>
            </div>
           <%--计划详情--%>
            <div class="ui-tab-content p35" data-name="reserve">
             <fis:widget name="invest:widget/autoinvest/invest-main-reserve/invest-main-reserve.jsp"/>
            </div>
           <%--加入记录--%>
             <fis:widget name="invest:widget/autoinvest/invest-main-joined/invest-main-joined.jsp"/>

           <%--常见问题--%>
            <div class="ui-tab-content p35" data-name="question">
             <fis:widget name="invest:widget/autoinvest/invest-main-question/invest-main-question.jsp"/>
            </div>
        </div>
    </div>
  </div>
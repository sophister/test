 <%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
 <div class="container_12_1080 mt14 color-white-bg pl25 pr25 ui-invest-tab">
 		<%--tab头部--%>
       <div class="container_12_1080" >
         <div class="ui-tab ui-tab-transparent invest-tab-title " id="autoinvest-tab">
          <ul class="ui-tab-items">
            <li class="ui-tab-item ui-tab-item-current" data-name="ua"><a class="ui-tab-item-link">U计划A（3个月）</a></li><li class="ui-tab-item" data-name="ub"><a class="ui-tab-item-link">U计划B（6个月）</a></li><li class="ui-tab-item" data-name="joined"><a class="ui-tab-item-link">加入记录</a></li><li class="ui-tab-item" data-name="uc"><a class="ui-tab-item-link">U计划C（12个月）</a></li>
          </ul>
        </div>
      </div>
    <div class="container_12_1080" id="uplan-main-tab-content">
        <div class="ui-box-white-bg">
            <%--U计划A（3个月）--%>
            <div class="ui-tab-content ui-tab-content-current" data-name="ua">
           
            </div>
           <%---U计划B（6个月）--%>
            <div class="ui-tab-content p35" data-name="ub">
            
            </div>
           <%---U计划C（12个月）--%>
            <div class="ui-tab-content p35" data-name="uc">
            
            </div>
        </div>
    </div>
 </div>
<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles" %>
<%@ taglib prefix="s" uri="/struts-tags"%>
<%@ page import="com.renrendai.web.ContextTools,com.renrendai.model.User" %>
<%@ page import="java.util.Date" %>
<%
    User u = ContextTools.getSecurityUser();
    Date currentDate = new Date();
    request.setAttribute("currentDate", currentDate);
%>
<div class="wdg-footer">
    <div class="main-section">
        <div class="contact-con">
            <h2>联系我们</h2>
            <div>
                客服电话: <span class="tel-phone">400-090-6600</span>
            </div>
            <div>工作时间: 09:00 - 21:00 (周一至周日)</div>
            <div class="gov-con">
                <a class="beian-link" href="http://www.itrust.org.cn/Home/Index/itrust_certifi?wm=2554879344" target="_blank"></a>
                <a class="online-110" href="http://gawa.bjchy.gov.cn/websearch/" target="_blank"></a>
            </div>
        </div>
        <div class="footer-detail">
            <div class="site-links">
                <a href="/about/about.action?flag=intro" target="_blank">公司介绍</a>
                <a href="/guide/investSecurity.action" target="_blank">安全保障</a>
                <a href="/about/about.action?flag=report" target="_blank">媒体报道</a>
                <a href="/about/about.action?flag=responsibility" target="_blank">社会责任</a>
                <a href="/about/about.action?flag=invite" target="_blank">招贤纳士</a>
                <a href="/sitemap.action" target="_blank">网站地图</a>
                <a href="/help/index.action" target="_blank">帮助中心</a>
                <%--<a href="/about/about.action?flag=contact" target="_blank">联系我们</a>--%>
            </div>
            <dl class="company-links">
                <dt>友情链接</dt>
                <dd class="fn-clear">
                    <a href="http://credit.hc360.com/dk_index/hc_dk.html" target="_blank">聪慧金融</a>
                    <a href="http://www.analysys.cn/" target="_blank">易观智库</a>
                    <a href="http://www.haodai.com/" target="_blank">好贷网</a>
                    <a href="http://p2p.yinhang.com/" target="_blank">银率网</a>
                    <a href="http://bank.hexun.com/" target="_blank">和讯银行</a>
                    <a href="http://www.gome.com.cn/" target="_blank">国美在线</a>
                    <a href="http://www.cjdao.com/index.jsp" target="_blank">财经道</a>
                    <a href="http://www.siilu.com/" target="_blank">电商服务</a>
                    <a href="http://www.shopex.cn/" target="_blank">ShopEx</a>
                    <a href="http://bj.58.com/danbaobaoxiantouzi/" target="_blank">58投资担保</a>
                    <a href="http://www.p2peye.com/" target="_blank">网贷天眼</a>
                    <a href="http://www.wangdaizhijia.com/" target="_blank">网贷之家</a>
                    <a href="http://bbs.wacai.com/" target="_blank">挖财社区</a>
                    <a href="http://www.feidee.com/money/" target="_blank">随手记</a>
                    <a href="http://www.rong360.com/licai/" target="_blank">融360理财</a>
                </dd>
            </dl>
            <dl class="custom-service">
                <dt>客户服务</dt>
                <dd>
                    <a class="service-item service-sina" href="http://e.weibo.com/renrendai?ref=http%3A%2F%2Fwww.renrendai.com%2F">

                    </a>
                    <a href="aaa">

                    </a>
                    <a href="aaa">

                    </a>
                    <a href="aaa">

                    </a>
                </dd>
            </dl>
        </div>
        <div class="copy-right">
            <span>&copy;2015 人人贷 All rights reserved</span>
            <span>人人贷商务顾问(北京)有限公司</span>
            <span>京ICP证 100953</span>
            <span>京公网安备 11010502020657</span>
            <span>京ICP备 12025643号-1</span>
        </div>
    </div>
</div>
<ul class="fixed-download-goBack">
  <li class="fixed-calculator">
    <a class="fixed-icon" href="/lend/calculator.action?prodType=Loanplan"></a>
  </li>
  <li class="fixed-service">
    <a class="fixed-icon" href="javascript:" onclick="online_service();"></a>
  </li>
  <script type="text/javascript">
    function online_service() {
        <%
            if(u==null){
        %>
        window.open('http://chat.looyuoms.com/chat/chat/p.do?c=20000293&f=10042100&g=10048378&site=5372&r=%23params%3A姓名%2C游客', '_blank', 'height=544, width=644,toolbar=no,scrollbars=no,menubar=no,status=no');
        <%
          }else{
        %>
        window.open('http://chat.looyuoms.com/chat/chat/p.do?c=20000293&f=10042100&g=10048378&site=5372&r=%23params%3AuserId%2C<%=u.getUserId()%>%2C姓名%2C<%=u.getDisplayName()%>', '_blank', 'height=544, width=644,toolbar=no,scrollbars=no,menubar=no,status=no');
        <%
          }
        %>
    }
  </script>
  <li class="fixed-download">
    <a class="fixed-icon" href="javascript:"></a>
  </li>
  <li class="fixed-goTop">
    <a class="fixed-icon" href="javascript:"></a>
  </li>
</ul>

<fis:script>
    require(["common:widget/footer/footer"], function(){});
</fis:script>
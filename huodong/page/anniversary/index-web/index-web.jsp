<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%/*这是PC首页的tpl*/%>
<fis:extends name="common:page/layout/huodong-base.jsp">
    <fis:require id="/static/ui/scrollbar/scrollbar.css" />
    <fis:block name="block_body">
      <div class="index-web">
        <div class="section_common section_01">
        
        </div>
        <div class="section_common section_02">
          <div class="main">
            <fis:widget name="huodong:widget/card/card.jsp" data="${data['info_list']}" />
          </div>
        </div>
        <div class="section_common section_03">
          
        </div>
        <div class="section_common section_04">
          <div class="main">
            <div class="word_wrap">
              <fis:widget name="huodong:widget/word/word.jsp"/>
            </div>
            <div class="award_wrap">
              <fis:widget name="huodong:widget/award/award.jsp"/>
            </div>
            <div class="huodong_info_wrap">
              <fis:widget name="huodong:widget/info/info.jsp"/>
            </div>
          </div>
        </div>
        <div class="section_common section_05">
          <div class="main tips">
            <h3>理财开宝箱&nbsp;&nbsp;好礼拿不停</h3>
            <p>您已累计投资<strong>15,000</strong>元</p>
          </div>
          <div class="main raffle_wrap">
            <fis:widget name="huodong:widget/raffle/raffle.jsp" />
          </div>
          
        </div>
        <div class="section_common section_06">
          
        </div>
        <div class="section_common section_07">
          <div class="main baoxiang_msg">
            <div class="word_wrap">
              <fis:widget name="huodong:widget/level/level.jsp"/>
            </div>
            <div class="award_wrap">
              <fis:widget name="huodong:widget/award/award.jsp"/>
            </div>
            <div class="huodong_info_wrap">
              <fis:widget name="huodong:widget/info/info.jsp"/>
            </div>
          </div>
        </div>
        <div class="section_common section_08">
          
        </div>
        <div class="rank_info">
          <div class="main rank_detail">
            <h1>收益排行有惊喜&nbsp;&nbsp;心意好礼为你准备</h1>
            <img src="./assets/rank.png" alt="">
            <fis:widget name="huodong:widget/rank/rank.jsp"/>
            <fis:widget name="huodong:widget/info/info.jsp"/>
          </div>
        </div>
      </div>

    </fis:block>

    <fis:block name="block_body_js">
        <script src="/static/ui/scrollbar/scrollbar.js"></script>
    </fis:block>

    <fis:script>
      require(['./index-web.js'], function (index) {
        index.init();
      });
    </fis:script>
    <fis:require name="./index-web.jsp" />
</fis:extends>
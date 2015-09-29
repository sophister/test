<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>

<fis:extends name="common:page/layout/huodong-base.jsp">
    <fis:require id="/widget/ui/scrollbar/scrollbar.js" />
    <fis:require id="/widget/ui/font_scroll/font_scroll.js" />
    <fis:require id="/widget/ui/scrollbar/jquery.mousewheel.js" />
    <fis:block name="block_body">
      <div class="index-web">
        <div class="section_common section_01">
        
        </div>
        <div class="section_common section_02">
          <div class="main">
            <fis:widget name="huodong:widget/card/card.jsp" />
          </div>
        </div>
        <div class="section_common section_03">
          
        </div>
        <div class="section_common section_04">
          <div class="main word_box_position">
            <div class="word_wrap">
              <fis:widget name="huodong:widget/word/word.jsp"/>
            </div>
            <div class="award_wrap">
              <fis:widget name="huodong:widget/award-card/award-card.jsp" />
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
              <fis:widget name="huodong:widget/award-box/award-box.jsp"/>
            </div>
            
          </div>
        </div>
        <div class="section_08">
          <div class="main huodong_info_wrap">
              <fis:widget name="huodong:widget/info/info.jsp"/>
            </div>
        </div>
        <div class="section_09">
          
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

    <fis:require name="./index-web.jsp" />
</fis:extends>
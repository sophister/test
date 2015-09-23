<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%/*这是PC首页的tpl*/%>
<fis:extends name="common:page/layout/base.jsp">

    <fis:block name="block_body">
      <div class="index-web">
        <div class="section_common section_01">
          
        </div>
        <div class="section_common section_02">
          <div class="main">
            <fis:widget name="huodong:widget/card/card.jsp"/>
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
          </div>
        </div>
        <div class="section_common section_08">
          
        </div>
        <div class="rank_info">
          <div class="main rank_detail">
            <h1>收益排行有惊喜&nbsp;&nbsp;心意好礼为你准备</h1>
            <img src="./assets/rank.png" alt="">
            <fis:widget name="huodong:widget/rank/rank.jsp"/>
            <div class="rules">
              <h3>『&nbsp;活动说明&nbsp;』</h3>
              <ul>
                <li>活动时间：2015年10月13日——2015年10月30日；</li>
                <li>活动期间累计投资金额前五名的用户会获得相应的礼品；</li>
                <li>“富”布斯排行榜统计范围包括U计划、新计划、散标、债权；</li>
                <li>奖品邮寄时间会根据采购情况而定，我司会在奖品到货后第一时间安排邮寄；</li>
                <li>礼品奖项：第一名获得旅游基金5000元、第二名获得旅游基金4000元、第三名获得乐视TV一台、第四名活动Ipad mini 2一台、第五名获得kindle一台（奖品以实物发放为准）。</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </fis:block>

    <fis:script>
      require(["huodong:widget/card/card.js"], function( turn ){
      
        // 水平翻转参数
        var verticalOpts = [{'width':0},{'width':'210px'}];

        turn($('#vertical'),100,verticalOpts);

      });
    </fis:script>
    
    <fis:require name="./index-web.jsp" />
</fis:extends>
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
        </div>
        <div class="section_common section_06">
          
        </div>
        <div class="section_common section_07">
          
        </div>
        <div class="section_common section_08">
          
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
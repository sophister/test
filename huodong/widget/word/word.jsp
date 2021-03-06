<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>

<div class="widget-word">
  <h3>『&nbsp;集幸运文字&nbsp;&nbsp;得心意礼包&nbsp;』</h3>
  <ul>
    <li>
      <div class="line1"></div>
      <div class="line2"></div>
      <span class="word" id="word_1">从</span>
    </li>
    <li>
      <div class="line1"></div>
      <div class="line2"></div>
      <span class="word" id="word_2">心</span>
    </li>
    <li>
      <div class="line1"></div>
      <div class="line2"></div>
      <span class="word" id="word_3">开</span>
    </li>
    <li>
      <div class="line1"></div>
      <div class="line2"></div>
      <span class="word" id="word_4">始</span>
    </li>
    <li>
      <div class="line1"></div>
      <div class="line2"></div>
      <span class="word" id="word_5">见</span>
    </li>
    <li>
      <div class="line1"></div>
      <div class="line2"></div>
      <span class="word" id="word_6">证</span>
    </li>
    <li>
      <div class="line1"></div>
      <div class="line2"></div>
      <span class="word" id="word_7">未</span>
    </li>
    <li>
      <div class="line1"></div>
      <div class="line2"></div>
      <span class="word" id="word_8">来</span>
    </li>
  </ul>
  <button>立即兑换</button>
</div>


<fis:script>
  require(['./word'], function (word){
    word.init();
  });
</fis:script>
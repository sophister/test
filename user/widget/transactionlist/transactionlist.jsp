<%@ page contentType="text/html;charset=utf-8" %>
<script id="transactions-template" type="text/x-handlebars-template">
  <li class="ui-list-header text fn-clear">
    <span class="ui-list-title w180 text-center fn-left time pl25">交易时间</span>
    <span class="ui-list-title w180 pl140 fn-left type">交易类型</span>
    <span class="ui-list-title w180 text-right fn-left pr90 credit">金额</span>
    <span class="ui-list-title w220 text-right fn-left pr10 balance pr25">结余</span>

  </li>
  {{# each pointLogs }}
  <li class="ui-list-item fn-clear">
    <span class="ui-list-field text-center w180 fn-left number dar">{{ date }} <span class="light">{{ time }}</span></span>
    <span class="ui-list-field w180 pl140 text-left fn-left fn-text-overflow dar">{{ type }}{{# if loanId }}<em class="text-small">（<a href="{{ loanLink }}" target="_blank">{{ loanId }}</a>）</em>{{/ if }}</span>
    <span class="ui-list-field text-right num-s w220 pr50 fn-left number">{{# if credit }}<span class="icon-plus plus"></span><em class="value-small plus">{{ credit }}</em>{{/ if }}{{# if debit }}<i class="minus"/><em class="value-small minus">{{ debit }}</em>{{/ if }}<span class="icon-info info"></span></span>
    <span class="ui-list-field text-right num-s w220 pr10 fn-left number "><em class="value-small light">{{ balance }}</em></span>
  </li>
  {{ else }}
  <li class="ui-list-status">
    <p class="color-gray-text">{{# if _message }}{{ _message }}{{ else }}没有记录{{/ if }}</p>
  </li>
  {{/ each }}
</script>
<script id="transactions-rsp" type="text/x-json">${ Logs }</script>
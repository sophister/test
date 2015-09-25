<%@ page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="/fis" prefix="fis"%>
<script id="dialog-message" type="text/x-handlebars-template">
<div class="ui-message-content j-result-dialog">
    <div class="h50"></div>
  {{# if info }}
  <div class="j-dialog-result-icon j-dialog-icon-info" title="提示"></div>
  {{/ if }}
  {{# if success }}
    <div class="j-dialog-result-icon j-dialog-icon-success" title="成功"></div>
  {{/ if }}
  {{# if warning }}
    <div class="j-dialog-result-icon j-dialog-icon-warn" title="警告"></div>
  {{/ if }}
  {{# if error }}
    <div class="j-dialog-result-icon j-dialog-icon-error" title="错误"></div>
  {{/ if }}
  <div class="fn-clear">
    <%--<div class="ui-message-icon fn-left">--%>
      <%--{{# if info }}--%>
      <%--<i class="iconfont fn-left info" title="提示">&#xF046;</i>--%>
      <%--{{/ if }}--%>
      <%--{{# if success }}--%>
      <%--<i class="iconfont fn-left success" title="成功">&#xF049;</i>--%>
      <%--{{/ if }}--%>
      <%--{{# if warning }}--%>
      <%--<i class="iconfont fn-left warning" title="警告">&#xF047;</i>--%>
      <%--{{/ if }}--%>
      <%--{{# if error }}--%>
      <%--<i class="iconfont fn-left error" title="错误">&#xF045;</i>--%>
      <%--{{/ if }}--%>
    <%--</div>--%>
    <div class="j-dialog-message ">
      {{# if title }}
      <h3>{{ title }}</h3>
      {{/ if }}
      <p class="text-big j-result-text">{{{ message }}}</p>
      {{# if link }}
      <p class="text-center">{{ linkText }}<a href="{{ link }}">{{ linkTextEnd }}</a>。</p>
      {{/ if }}
    </div>
  </div>
  <div class="ui-message-operation text-center">
    <a class="ui-button   ui-message-close-button j-btn j-btn-orange j-dialog-small" {{# if button }}href="{{ button.link }}"{{/ if }}>{{# if button }}{{ button.text }}{{ else }}关 闭{{/ if }}</a>
  </div>
</div>
</script>
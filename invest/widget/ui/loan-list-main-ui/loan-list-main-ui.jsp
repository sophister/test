<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<script id="loan-list-template" type="text/x-handlebars-template">
{{# if _hasHeader }}
<table  class="ui-table ui-table-center"  style="width:100%">
	<thead>
	 <tr class="ui-list-header" id="loan-list-header">
	  <th class="ui-list-title  pl25" width="25%">借款标题</th>
	  <th class="ui-list-title  text-right   ui-list-title-sortable ui-list-title-sortable-2 pr15"  width="10%" name="INTEREST" next="desc">年利率<em></em></th>
	  <th class="ui-list-title  text-right" width="18%">金额</th>
	  <th class="ui-list-title  text-right   ui-list-title-sortable ui-list-title-sortable-3 pr15" width="15%"  name="MONTH" next="desc">期限<em></em></th>
	  <th class="ui-list-title  text-right   ui-list-title-sortable ui-list-title-sortable-4 pr15"  width="18%" name="FINISHEDRATIO" next="desc">进度<em></em></th>
	  <th class="ui-list-title  text-right    pr25 ui-list-title-sortable ui-list-title-refresh"   width="14% " name="REFRESH">刷新</th>
  </tr>
</thead>
{{/ if }}
{{# each loans }}
<tr class="ui-list-item   {{ itemLast }} ">
  <td class="ui-list-field  text-big   ">
  	<div class="pl25">
  		<em class="ui-loantype {{ loanType }}" title="{{ loanTypeText }}"></em><a class="w210 rrd-dimgray fn-text-overflow" href="{{ link }}" target="_blank" title="{{ title }}">{{{ title }}}</a>
  	</div>
  
  </td>
  <td class="ui-list-field  text-right   color-orange-text">
  		<div class="pr10">
  			<em class="value">{{ interest }}</em>%
  	  </div>
  </td>
  <td class="ui-list-field  text-right  ">
  	<div >
  		<em class="value">{{ amount }}</em>元
  	</div>
  </td>
  <td class="ui-list-field  text-right  ">
  	<div class="pr10">
  		<em class="value">{{ term }}</em>个月
  	</div>
  </td>
  <td class="ui-list-field  text-right ">
  	<div class="pl105">
	  	<span class="ui-process-long  fn-clear">   
	            <span class="basic-progress-bg fn-left"> 
	            		<b class="basic-percent fn-left" style="width:{{ progress }}%"></b>
	            </span>
	  			<span class="basic-text fn-left text-right"><em>{{ progress }}</em>%</span>            
	    </span>
    </div>
  </td>
  <td class="ui-list-field   text-right">
  	<div class="pr25">
	    <a class="ui-button ui-button-rect-mid  ui-button-orange  ui-list-invest-button ui-list-invest-button-{{ status }}" {{# if buttonLink }}href="{{ buttonLink }}" target="_blank"{{/ if }}>
	      <span class="OPEN">投标</span>
	      <span class="READY FIRST_READY">已满标</span>
	      <span class="IN_PROGRESS">还款中</span>
	    </a>
    </div>
  </td>
</tr>
{{ else }}
<tr class="ui-list-status">
  <td colspan="5" class="ui-list-field  color-lightgray-text text-center ">{{# if _message }}{{ _message }}{{ else }}没有可投资项目{{/ if }}</td>
</tr>
{{/ each }}
{{# if _hasMore }}
{{# if loans }}
<tr class="ui-list-more">
	<td colspan="5" class="ui-list-field   text-center"> <a class="color-lightgray-text" href="/lend/loanList.action" target="_blank">查看更多投资理财项目</a></td>
 </tr>
</table>
{{/ if }}
{{/ if }}
</script>
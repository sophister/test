<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
 <script id="joined-template" type="text/x-handlebars-template">

<table class="ui-table ui-table-blue" style="width:100%">
          <thead>
            <tr class="ui-list-header">
              <th width="14%" class="ui-list-title"><span class="pl45">序号</span></th>
              <th width="25%" class="ui-list-title"><span class="pl45">理财人</span></th>
              <th width="20%" class="ui-list-title"><span class="text-right pr40">月投资金额</span></th>
              <th width="15%" class="ui-list-title"><span class="text-center">来源</span></th>
              <th><span class="text-center" class="ui-list-title">加入时间</span></th>
            </tr>
          </thead>
          <tbody>
{{# each jsonList }}
            <tr class="{{ itemStyle }} ui-list-item">
              <td><div class="ui-list-field  ui-td-bg pl45">{{ id }}</div></td>
              <td><div class="ui-list-field  ui-td-bg pl45"><a class="inline-block fn-text-overflow w200" href="/account/myInfo.action?userId={{userId}}" target="_blank">{{ investor }}</a></div></td>
              <td><div class="ui-list-field  ui-td-bg text-right pr40">{{ amount }}元</div></td>
              <td><div class="ui-list-field  ui-td-bg text-center">
					{{#if mobileUsed }}
					 <a title="手机加入" target="_blank" href="http://www.renrendai.com/event/app.action"><i class="icon-u icon-u-mobile"></i></a>
					{{/ if }}
					{{#if webUsed}}
					 <a title="网页加入" target="_blank" href="#" onclick="javascript:return false;"><i class="icon-u icon-u-web"></i></a>
					{{/ if}}
					</div></td>
              <td class="ui-list-field "><div class="ui-td-bg text-center">{{ date }}</div></td>
            </tr>
{{ else }}
<tr class="ui-list-item">
 <td colspan="5" class="color-gray-text ui-list-field text-center"style="font-size:24px; padding-top:50px;">{{# if _message }}{{ _message }}{{ else }}暂无加入记录{{/ if }}</td>
</tr>
{{/ each }}
  </tbody>
        </table>
</script>
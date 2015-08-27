<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<script id="autoinvest-list-template" type="text/x-handlebars-template">
 <table class="ui-table ui-table-blue ui-table-center" style="width:100%">
        <thead>
          <tr class="ui-list-header ">
            <th class="text-left  ui-list-title" style="font-size:14px;" width="16%"><span class="pl25">薪计划</span></th>
            <th class="text-right ui-list-title" style="font-size:14px;" width="14%"><span class="pr40">加入人数</span></th>
            <th class="text-right ui-list-title" style="font-size:14px;" width="20%"><span class="pr30">已加入金额</span></th>
            <th class="text-right ui-list-title" style="font-size:14px;" width="15%"><span class="pr20">预期年化收益</span></th>
            <th class="text-right ui-list-title" style="font-size:14px;" width="20%"><span class="pr40"> 累计收益</span></th>
            <th class="text-right ui-list-title" style="font-size:14px;" width="15%"><span class="pr25 last">状态</span></th>
          </tr>
        </thead>
 <tbody>
{{# each plans }}
          <tr class="{{itemStyle}} ui-list-item">
            <td class="ui-list-field text-left ">
              <div class="ui-td-bg pl25 ">
                <a href="{{ link }}" target="_blank">{{ name }}</a>
              </div>
            </td>
            <td class="ui-list-field text-right">
              <div class="ui-td-bg pr40 ">
              {{ subpointCountActual }}
              </div>
            </td>
            <td class=" ui-list-field text-right">
              <div class="ui-td-bg  pr30">
               {{ amount }}元
              </div>
            </td>
            <td class="ui-list-field text-right">
              <div class="ui-td-bg pr20 ">
                {{expectedYearRate}}%
              </div>
            </td>
            <td class="ui-list-field text-right">
              <div class="ui-td-bg pr40 ">
              {{ earnInterest }}元
              </div>
            </td>
            <td class="ui-list-field text-right">
               <div class="ui-td-bg   color-orange-text pr25">
				{{{ statusinfo }}}
				</div>
            </td>
          </tr>
{{ else }}
<tr>
 <td colspan="6" class="color-gray-text text-center"style="font-size:24px; padding-top:50px;">{{# if _message }}{{ _message }}{{ else }}薪计划没有数据{{/ if }}</td>
</tr>
{{/ each }}
    </tbody>
      </table>
</script>
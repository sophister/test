<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%/* 这里是注释 */%>

<fis:extends name="common:page/layout/base.jsp">

    <fis:block name="block_head_js">

        <script src="/static/lib/highchart/highcharts-custom.js"></script>

    </fis:block>
    
    <fis:block name="block_body">
        <div id="container" style="width: 400px; height: 400px; margin: 0 auto"></div>

    </fis:block>

    <fis:block name="block_body_js">

    </fis:block>

    <fis:script>
        // Create the chart
        chart = new Highcharts.Chart({
        credits : {
            enabled : false
        },
        chart: {
        renderTo: 'container',
        type: 'pie'
        },
        title: {
        text: 'Browser market share, April, 2011'
        },
        yAxis: {
        title: {
        text: 'Total percent market share'
        }
        },
        plotOptions: {
        pie: {
        shadow: false,
        allowPointSelect: true
        }
        },
        tooltip: {
        formatter: function() {
        return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
        }
        },
        series: [{
        name: 'Browsers',
        data: [["Firefox",6],["MSIE",4],["Chrome",7]],
        size: '60%',
        innerSize: '20%',
        showInLegend:true,
        dataLabels: {
        enabled: false
        }
        }]
        });
    </fis:script>

    <fis:require name="./high-chart.jsp" />

</fis:extends>


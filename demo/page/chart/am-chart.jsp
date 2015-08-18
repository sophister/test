<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%/* 这里是注释 */%>

<fis:extends name="common:page/layout/base.jsp">

    <fis:block name="block_head_css">
        <style>
            #chartdiv {
                width		: 100%;
                height		: 500px;
                font-size	: 11px;
            }
            #chart-2 {
                width: 200px;
                height: 200px;
                font-size: 11px;
            }
        </style>
    </fis:block>

    <fis:block name="block_head_js">
        <%--<script src="http://www.amcharts.com/lib/3/amcharts.js"></script>--%>
        <%--<script src="http://www.amcharts.com/lib/3/pie.js"></script>--%>
        <%--<script src="http://www.amcharts.com/lib/3/themes/light.js"></script>--%>

        <script src="/static/lib/amchart/amcharts.js"></script>
        <script src="/static/lib/amchart/pie.js"></script>
        <script src="/static/lib/amchart/themes/light.js"></script>

    </fis:block>

    <fis:block name="block_body">
        <h1>am-chart demo</h1>
        <div id="chartdiv"></div>
        <div id="chart-2"></div>
        
    </fis:block>

    <fis:script>
        !function(){
        var chart = AmCharts.makeChart( "chartdiv", {
        "type": "pie",
        "theme": "light",
        startDuration : 0,
        "dataProvider": [ {
        "title": "New",
        "value": 4852
        }, {
        "title": "Returning",
        "value": 9899
        } ],
        "titleField": "title",
        "valueField": "value",
        "labelRadius": 5,

        "radius": "42%",
        "innerRadius": "60%",
        "labelText": "[[title]]",
        "export": {
        "enabled": true
        }
        } );

        chart.addListener('clickSlice', function(e){
        console.log(e);
        });

        window.chart1 = chart;

        }();
    </fis:script>

    <fis:script>
        !function(){
        var chart = AmCharts.makeChart("chart-2", {
        "type": "pie",
        "startDuration": 0,
        colorField : 'color',
        "theme": "none",
        "addClassNames": true,
        /*
        "legend":{
        "position":"bottom",
        "marginRight":100,
        "autoMargins":false
        },
        */
        "innerRadius": "30%",
        "defs": {
        "filter": [{
        "id": "shadow",
        "width": "200%",
        "height": "200%",
        "feOffset": {
        "result": "offOut",
        "in": "SourceAlpha",
        "dx": 0,
        "dy": 0
        },
        "feGaussianBlur": {
        "result": "blurOut",
        "in": "offOut",
        "stdDeviation": 5
        },
        "feBlend": {
        "in": "SourceGraphic",
        "in2": "blurOut",
        "mode": "normal"
        }
        }]
        },
        "dataProvider": [{
        color : '#000000',
        "country": "Lithuania",
        "litres": 501.9
        }, {
        "country": "Czech Republic",
        "litres": 301.9
        }, {
        "country": "Ireland",
        "litres": 201.1
        }, {
        "country": "Germany",
        "litres": 165.8
        }, {
        "country": "Australia",
        "litres": 139.9
        }, {
        "country": "Austria",
        "litres": 128.3
        }, {
        "country": "UK",
        "litres": 99
        }, {
        "country": "Belgium",
        "litres": 60
        }, {
        "country": "The Netherlands",
        "litres": 50
        }],
        "valueField": "litres",
        "titleField": "country",
        labelText : '',
        "export": {
        "enabled": true
        }
        });


        var currentSlice;
        chart.addListener("pullOutSlice", function(e) {
            if(currentSlice && currentSlice.pulled && currentSlice !== e.dataItem ){
                chart.clickSlice(currentSlice);
            }
            currentSlice = e.dataItem;
            console.log(e);
        });

        window.chart2 = chart;

        }();
    </fis:script>

    <fis:require name="./am-chart.jsp" />

</fis:extends>


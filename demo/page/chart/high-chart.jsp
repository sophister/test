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
        <div id="con-2" style="width:400px;height: 400px; margin: 100px auto;"></div>
    </fis:block>

    <fis:block name="block_body_js">
        <script>
            jQuery(function(){

                // Create the chart
                window.chart = new Highcharts.Chart({
                    credits : {
                        enabled : false
                    },
                    chart: {
                        renderTo: 'container',
                        type: 'pie',
                        width: 300,
                        height:300
                    },
                    title: {
                        text: ''
                    },
                    yAxis: {
                        title: {
                            text: ''
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

                window.chart2 = new Highcharts.Chart({
                    credits : {
                        enabled : false
                    },
                    chart: {
                        renderTo: 'con-2',
                        type: 'pie',
                        width: 300,
                        height:300
                    },
                    title: {
                        text: ''
                    },
                    yAxis: {
                        title: {
                            text: ''
                        }
                    },
                    plotOptions: {
                        pie: {
                            shadow: false,
                            allowPointSelect: true
                        },
                        series : {
                            point : {
                                events : {
                                    select : function(){
                                        console.log( this );
                                    }
                                }
                            }
                        }
                    },
                    tooltip: {
                        formatter: function() {
                            return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
                        }
                    },
                    series: [{
                        name: 'Browsers',
//                        data: [["Firefox",6],["MSIE",4],["Chrome",7]],
                        data : [
                            {
                                name : 'firefox',
                                color : 'red',
                                y : 6
                            },
                            {
                                name : 'msie',
                                color : 'green',
                                y : 4
                            },
                            {
                                name : 'chrome',
                                color : 'blue',
                                y : 7
                            }
                        ],
                        size: '60%',
                        innerSize: '20%',
                        showInLegend:true,
                        dataLabels: {
                            enabled: false
                        }
                    }]
                });

            });
        </script>
    </fis:block>


    <fis:require name="./high-chart.jsp" />

</fis:extends>


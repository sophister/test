<%@ page contentType="text/html;charset=utf-8" %>
<%@ taglib uri="/fis" prefix="fis"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<%/* 这里是注释 */%>

<fis:extends name="common:page/layout/base.jsp">

    <fis:block name="block_head_js">


    </fis:block>
    
    <fis:block name="block_body">
        <div id="container" style="width: 400px; height: 400px; margin: 0 auto"></div>
    </fis:block>

    <fis:block name="block_body_js">
        <fis:script>
            require(['common:widget/ui/donut/donut.js'], function(Donut){

                window.demoChart = new Donut({
                    container : document.getElementById('container'),
                    //圆环的宽度
                    width : 200,
                    //圆环的高度
                    height:200,
                    data : [
                        {
                            //每个数据项,都应该包含一个 惟一的  ID
                            id : 'id-0',
                            //该数据项显示的颜色
                            color : '#ff0000',
                            //该数据项的值大小
                            y : 20
                        },
                        {
                            id : 'id-1',
                            color : 'green',
                            y : 6
                        },
                        {
                            id : 'id-2',
                            color : 'blue',
                            y : 33
                        },{
                            id : 'id-3',
                            color : 'gray',
                            y : 50
                        }
                    ]
                });

                //选中某一项的事件
                demoChart.on('select', function( conf ){
                    // conf 包含上述 data[i] 中某一项的所有数据
                    console.log( conf );
                } );
                //取消选中某一项的事件
                demoChart.on('unselect', function(conf){
                    // conf 包含上述 data[i] 中某一项的所有数据
                    console.log( conf );
                } );

                //监听点击某个 point
                demoChart.on('click', function(conf){
                    console.log('click', conf);
                } );

                //根据 data[] 中的 ID 来选中某个 point
                demoChart.selectPointById('id-2');
            } );
        </fis:script>
    </fis:block>


    <fis:require name="./high-chart-2.jsp" />

</fis:extends>


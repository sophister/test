/**
 * 基于 Highcharts 封装的 圆环组件
 * Created by jess on 15/8/24.
 */



var $ = window.jQuery;
var EventEmitter = require('common:widget/ui/lib/eventEmitter.js');
var Highcharts = require('common:widget/ui/lib/highcharts.src.js');


/**
 * 圆环图封装类
 * @param args {Object}
 * @param args.container {Element} 圆环将要渲染的DOM容器
 * @param args.width {Number} 圆环区域宽度
 * @param args.height {Number} 圆环区域高度
 * @param args.data {Array} [ { id : '惟一ID', name: '', color : '#xxx', y : '' }  ]  圆环显示的数据
 * @constructor
 */
function Donut( args ){
    if( ! args.container ){
        throw new Error('Donut 构造函数,必须传递  container  DOM引用');
    }

    var that = this;

    this.chart = new Highcharts.Chart({
        credits : {
            enabled : false
        },
        chart: {
            //animation : false,
            renderTo: args.container,
            type: 'pie',
            width: args.width || 300,
            height: args.height || 300,
            spacing : [0,0,0,0]
        },
        title:{
            text : null
        },
        tooltip : {
            enabled: false
        },
        plotOptions: {
            pie: {
                shadow: false,
                allowPointSelect: false
            },
            series : {
                animation : false,
                point : {
                    events : {
                        click : function(){
                            that.trigger('click', this.options );
                            return false;
                        },
                        mouseOver : function(){
                            this.select(true);
                        },
                        mouseOut : function(){
                            this.select( false );
                        },
                        select : function(){
                            //console.log( this );
                            that.trigger('select', this.options);
                        },
                        unselect : function(){
                            that.trigger('unselect', this.options);
                        }
                    }
                }
            }
        },
        series : [
            {
                name : null,
                data : args.data,
                //调整内部空心的大小
                innerSize: '40%',
                dataLabels: {
                    enabled: false
                }
            }
        ]
    });

}

$.extend( Donut.prototype, EventEmitter.prototype );
$.extend( Donut.prototype, {

    destroy : function(){
        if( this.chart ){
            this.chart.destroy();
            this.chart = null;
        }
    },
    //根据 data 配置中,某一项的 ID 值,来选中 该点
    selectPointById : function( id ){
        var point = this.chart.get( id );
        if( point ){
            point.select(true);
        }
    },
    //根据 data 配置中,某一项的 ID 值,来取消选中 该点
    unselectPointById : function(id){
        var point = this.chart.get( id );
        if( point ){
            point.select(false);
        }
    }
} );


module.exports = Donut;
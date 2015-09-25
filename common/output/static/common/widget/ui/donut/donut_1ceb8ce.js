define('common:widget/ui/donut/donut', ['require', 'exports', 'module', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/ui/lib/eventEmitter', 'common:widget/oui/lib/highcharts/3.0.5/highcharts'],function(require, exports, module) {
/**
 * 基于 Highcharts 封装的 圆环组件
 * Created by jess on 15/8/24.
 */



var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery');
var EventEmitter = require('common:widget/ui/lib/eventEmitter');
var Highcharts = require('common:widget/oui/lib/highcharts/3.0.5/highcharts');


//如果所有的数据值都 <=0 ,那么给每个一个默认的值
function translateData( data ){
    data = data || [];
    var out = [];
    var isAllZero = true;
    for( var i = 0, len = data.length; i < len; i++ ){
        var obj = $.extend(true, {}, data[i]);
        if( obj.y <= 0 ){
            obj.y = 0;
        }else{
            isAllZero = false;
        }
        out[i] = obj;
    }

    if( isAllZero ){
        for( var i = 0, len = out.length; i < len; i++ ){
            var obj = out[i];
            obj.y = 88;
            obj.color = '#d6d6d6';
        }
    }

    return out;
}


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

    var data = translateData( args.data );

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
                data : data,
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
        return this;
    },
    //根据 data 配置中,某一项的 ID 值,来取消选中 该点
    unselectPointById : function(id){
        var point = this.chart.get( id );
        if( point ){
            point.select(false);
        }
        return this;
    },
    //简单的触发某个point的点击事件,根据 id
    clickPointById : function( id ){
        var point = this.chart.get( id );
        if( point ){
            this.trigger('click', point.options );
        }
        return this;
    }
} );


module.exports = Donut;
});
var path = require('path');

var namespace = 'invest';

fis.config.merge({
    namespace: namespace
});

fis.config.set('modules.parser.less', 'less');

// --------------------------------
// 支持 amd 设置
// --------------------------------
fis.config.set('modules.postprocessor.vm', 'amd');
fis.config.set('modules.postprocessor.js', 'amd');
fis.config.set('modules.postprocessor.jsp', 'amd');


// 使用 depscombine 是因为，在配置 pack 的时候，命中的文件其依赖也会打包进来。
fis.config.set('modules.packager', 'depscombine');

fis.config.set('pack', {
    'pkg/invest_widget.js' : [
        /widget\/(.*?).js$/
    ],
    'pkg/invest_widget.css' : [
        /widget\/(.*?).css$/,
        /widget\/(.*?).less$/
    ]
});


fis.config.set('roadmap.path', [
    {
        reg: 'doc/**.md',
        release: false
    }
].concat(fis.config.get('roadmap.path', [])));


// js 模板支持
fis.config.set('modules.parser.tmpl', 'utc');
// fis.config.set('roadmap.ext.tmpl', 'js');

fis.config.merge({
    deploy : {
        local : [
            {
                from : '/static',
                to : '../../'
            },
            {
                form : '/WEB-INF',
                to : '../../'
            }
        ]
    }
});

fis.config.merge({
    settings: {
        postprocessor: {
            amd: {
                paths: {
                    // 相对于  baseUrl
                    // 如果是绝对路径则相对与 root.
                    // base 的值可以是字符串，也可以是数组，会按顺序超找。
                    'asyncSlider': 'common:widget/oui/lib/asyncSlider/1.0.0/asyncSlider.js',
                    'city': 'common:widget/oui/lib/city/1.0.0/city.js',
                    'new-city': 'common:widget/oui/lib/city/1.0.1/new-city.js',
                    'counter': 'common:widget/oui/lib/counter/0.0.1/jquery.counter.js',
                    'easing': 'common:widget/oui/lib/easing/1.3.0/easing.js',
                    'flash': 'common:widget/oui/lib/flash/1.0.1/jquery.flash.js',
                    'handlebars': 'common:widget/oui/lib/handlebars/1.0.0/handlebars.js',
                    'highcharts': 'common:widget/oui/lib/highcharts/3.0.5/highcharts.js',
                    'jquery': 'common:widget/oui/lib/jquery/1.9.1/jquery.js',
                    'queue': 'common:widget/oui/lib/plupload/1.5.7/jquery.plupload.queue',
                    'simplePagination': 'common:widget/oui/lib/simplePagination/1.5.0/simplePagination.js',
                    'validate': 'common:widget/oui/lib/validation/1.11.1/jquery.validate.js',
                    'mailSuggest':'common:widget/oui/lib/mailSuggest/0.0.1/mailSuggest.js',
                    'rsa': 'common:widget/oui/rsa/index.js',
                    'base': 'common:widget/oui/arale/base/1.1.1/base.js',
                    'class': 'common:widget/oui/arale/class/1.1.0/class.js',
                    'events': 'common:widget/oui/arale/events/1.1.0/events',
                    'widget': 'common:widget/oui/arale/widget/1.1.1/widget.js',
                    'popup': 'common:widget/oui/arale/popup/1.1.2/popup.js',
                    'tip': 'common:widget/oui/arale/tip/1.1.4/tip.js',
                    'overlay': 'common:widget/oui/arale/overlay/1.1.2/overlay.js',
                    'mask': 'common:widget/oui/arale/overlay/1.1.2/mask.js',
                    'iframe-shim': 'common:widget/oui/arale/shim/1.0.2/iframe-shim.js',
                    'position': 'common:widget/oui/arale/position/1.0.1/position.js',
                    'dialog': 'common:widget/oui/arale/dialog/1.3.3/dialog.js',
                    'confirmbox': 'common:widget/oui/arale/dialog/1.3.3/confirmbox.js',
                    'templatable': 'common:widget/oui/arale/templatable/0.9.1/templatable.js',
                    'calendar': 'common:widget/oui/arale/calendar/0.9.0/calendar.js',
                    'moment': 'common:widget/oui/arale/moment/2.1.0/moment.js',
                    'sticky':'common:widget/oui/arale/sticky/1.2.1/sticky.js',
     
                    'dialog': 'common:widget/oui/arale/dialog/1.3.3/dialog.js',
                    'components': 'common:widget/oui/components/components.js',
                    'widgets': 'common:widget/oui/widgets/widgets.js',
                    'common': 'common:widget/oui/common.js',
                    'protocol': 'common:widget/oui/protocol.js'
                }
            }
        }
    }
});

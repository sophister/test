var path = require('path');

var namespace = 'common';

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
    
});


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
                    'asyncSlider': './widget/oui/lib/asyncSlider/1.0.0/asyncSlider.js',
                    'city': './widget/oui/lib/city/1.0.0/city.js',
                    'new-city': './widget/oui/lib/city/1.0.1/new-city.js',
                    'counter': './widget/oui/lib/counter/0.0.1/jquery.counter.js',
                    'easing': './widget/oui/lib/easing/1.3.0/easing.js',
                    'flash': './widget/oui/lib/flash/1.0.1/jquery.flash.js',
                    'handlebars': './widget/oui/lib/handlebars/1.0.0/handlebars.js',
                    'highcharts': './widget/oui/lib/highcharts/3.0.5/highcharts.js',
                    'jquery': './widget/oui/lib/jquery/1.9.1/jquery.js',
                    'queue': './widget/oui/lib/plupload/1.5.7/jquery.plupload.queue',
                    'simplePagination': './widget/oui/lib/simplePagination/1.5.0/simplePagination.js',
                    'validate': './widget/oui/lib/validation/1.11.1/jquery.validate.js',
                    'mailSuggest':'./widget/oui/lib/mailSuggest/0.0.1/mailSuggest.js',
                    'rsa': './widget/oui/rsa/index.js',
                    'base': './widget/oui/arale/base/1.1.1/base.js',
                    'class': './widget/oui/arale/class/1.1.0/class.js',
                    'events': './widget/oui/arale/events/1.1.0/events',
                    'widget': './widget/oui/arale/widget/1.1.1/widget.js',
                    'popup': './widget/oui/arale/popup/1.1.2/popup.js',
                    'tip': './widget/oui/arale/tip/1.1.4/tip.js',
                    'overlay': './widget/oui/arale/overlay/1.1.2/overlay.js',
                    'mask': './widget/oui/arale/overlay/1.1.2/mask.js',
                    'iframe-shim': './widget/oui/arale/shim/1.0.2/iframe-shim.js',
                    'position': './widget/oui/arale/position/1.0.1/position.js',
                    'dialog': './widget/oui/arale/dialog/1.3.3/dialog.js',
                    'confirmbox': './widget/oui/arale/dialog/1.3.3/confirmbox.js',
                    'templatable': './widget/oui/arale/templatable/0.9.1/templatable.js',
                    'calendar': './widget/oui/arale/calendar/0.9.0/calendar.js',
                    'moment': './widget/oui/arale/moment/2.1.0/moment.js',
                    'sticky':'./widget/oui/arale/sticky/1.2.1/sticky.js',
                    'ui-counter': './widget/oui/lib/counter/0.0.1/jquery.counter-analog.css',
                    'ui-poptip': './widget/oui/alice/poptip/1.1.1/poptip.css'
                }
            }
        }
    }
});

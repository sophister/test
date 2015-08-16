var path = require('path');

var namespace = 'common';

fis.config.merge({
    namespace: namespace
});

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


fis.config.set('roadmap.path', [
    {
        reg: 'doc/**.md',
        release: false
    },
    {
        reg: /^\/static\/libs\/(.*\.js)$/i,
        isMod: true,
        release: '${statics}/${namespace}/libs/$1'
    }
].concat(fis.config.get('roadmap.path', [])));


// js 模板支持
fis.config.set('modules.parser.tmpl', 'utc');
// fis.config.set('roadmap.ext.tmpl', 'js');




define('common:widget/oui/arale/overlay/1.1.2/mask', ['require', 'exports', 'module', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/oui/arale/overlay/1.1.2/overlay'],function(require, exports, module) {

    var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery'),
        Overlay = require('common:widget/oui/arale/overlay/1.1.2/overlay'),

        ua = (window.navigator.userAgent || "").toLowerCase(),
        isIE6 = ua.indexOf("msie 6") !== -1,

        body = $(document.body),
        doc = $(document);


    // Mask
    // ----------
    // 全屏遮罩层组件

    var Mask = Overlay.extend({

        attrs: {
            width: isIE6 ? doc.outerWidth(true) : '100%',
            height: isIE6 ? doc.outerHeight(true) : '100%',

            className: 'ui-mask',
            opacity: .2,
            backgroundColor: '#000',
            style: {
                position: isIE6 ? 'absolute' : 'fixed',
                top: 0,
                left: 0
            },

            align: {
                // undefined 表示相对于当前可视范围定位
                baseElement: isIE6 ? body : undefined
            }
        },

        show: function() {
            if (isIE6) {
                this.set('width', doc.outerWidth(true));
                this.set('height', doc.outerHeight(true));
            }
            return Mask.superclass.show.call(this);
        },

        setup: function() {
            // 加载 iframe 遮罩层并与 overlay 保持同步
            this._setupShim();
        },

        _onRenderBackgroundColor: function(val) {
            this.element.css('backgroundColor', val);
        },

        _onRenderOpacity: function(val) {
            this.element.css('opacity', val);
        }
    });

    // 单例
    module.exports = new Mask();

});

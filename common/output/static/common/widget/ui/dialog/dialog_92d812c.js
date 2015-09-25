define('common:widget/ui/dialog/dialog', ['require', 'exports', 'module', 'common:widget/oui/lib/jquery/1.9.1/jquery', 'common:widget/ui/lib/eventEmitter', 'common:widget/ui/mask/mask'],function(require, exports, module) {
/**
 * 全站通用的对话框
 * Created by jess on 15/8/31.
 */



var $ = require('common:widget/oui/lib/jquery/1.9.1/jquery');
var EventEmitter = require('common:widget/ui/lib/eventEmitter');
var Mask = require('common:widget/ui/mask/mask');


var DIALOG_TPL = '<div class="j-dialog" style="display: none;">' +
        '<header class="j-dialog-title-con">' +
            '<h1 class="j-dialog-title"></h1>' +
            '<span class="j-dialog-close-btn">&times;</span>' +
        '</header>' +
        '<div class="j-dialog-header"></div>' +
        '<div class="j-dialog-content"></div>' +
        '<div class="j-dialog-btn-con"></div>' +
        '<div class="j-dialog-footer"></div>' +
    '</div>';


//iframe 对话框的默认高度
var DEFAULT_HEIGHT = '300px';
//title 栏高度
var TITLE_HEIGHT = 50;


var $win = $(window);

/**
 * 对话框构造函数
 * @param args {Object}
 * @param args.title {String} 对话框的title
 * @param args.header {HTMLElement} 对话框的header部分内容
 * @param args.content {HTMLElement} 对话框的主体区域内容
 * @param args.btnContainer {HTMLElement} 对话框的按钮区域内容
 * @param args.footer {HTMLElement} 对话框的footer内容元素
 * @param args.cssClass {String} 整个对话框上的自定义css class
 * @param args.zIndex {Int} 整个对话框的 z-index
 * @constructor
 */
function Dialog(args){
    this.config = $.extend( {
        title : '',
        header : '',
        content : '',
        btnContainer : '',
        footer : '',
        cssClass : '',
        //盒子 content 的宽度
        width : '700px',
        zIndex : 9999,
        autoInit : true
    }, args || {} );
    this.$el = null;
    this.$closeBtn = null;
    this._destroyed = false;

    if( this.config.autoInit ){
        this.init();
    }
}

$.extend( Dialog.prototype, EventEmitter.prototype );

$.extend( Dialog.prototype, {

    init : function(){
        if( this.$el ){
            return this;
        }

        var that = this;

        var $el = $( DIALOG_TPL );
        var $title = $el.find('.j-dialog-title');
        var $closeBtn = $el.find('.j-dialog-close-btn');
        var $header = $el.find('.j-dialog-header');
        var $content = $el.find('.j-dialog-content');
        var $btnCon = $el.find('.j-dialog-btn-con');
        var $footer = $el.find('.j-dialog-footer');

        var conf = this.config;


        this.onCloseClick = function(){
            that.trigger('close.click');
        };
        $closeBtn.on('click', this.onCloseClick);

        if( conf.header ){
            $header.append( conf.header );
        }else{
            $header.hide();
        }

        if( conf.content ){
            $content.append( conf.content );
        }else{
            $content.hide();
        }

        if( conf.btnContainer ){
            $btnCon.append( conf.btnContainer );
        }else{
            $btnCon.hide();
        }

        if( conf.footer ){
            $footer.append( conf.footer );
        }else{
            $footer.hide();
        }

        if( ! conf.title ){
            conf.title = ( $content.find('.data-dialog-title').html() );
        }
        $title.html( conf.title );

        if( conf.cssClass ){
            $el.addClass( conf.cssClass );
        }
        var style = {
            width : conf.width,
            'z-index' : conf.zIndex
        };
        if( conf.height ){
            style.height = conf.height;
        }
        $el.css( style ).appendTo( document.body );

        this.$title = $title;
        this.$el = $el;
        this.$closeBtn = $closeBtn;
    },

    show : function(){
        if( this._destroyed ){
            return this;
        }
        if( ! this.$el ){
            this.init();
        }
        this.trigger('before.show');
        this.center();
        this.$el.show();
        this.trigger('after.show');
        return this;
    },

    center : function(){
        if( ! this._destroyed && this.$el ){
            var $el = this.$el;
            var isHide = true;
            if( $el.css('display') === 'block' ){
                isHide = false;
            }else{
                $el.css({
                    display : 'block',
                    visibility : 'hidden'
                });
            }
            var scrollTop = $win.scrollTop();
            var viewWidth = $win.width();
            var viewHeight = $win.height();
            var dialogWidth = $el.width();
            var dialogHeight = $el.height();
            var top = scrollTop + Math.max( ( viewHeight - dialogHeight ) / 2, 50 );
            var left = ( viewWidth - dialogWidth ) / 2;
            if( isHide ){
                $el.css({
                    display : 'none'
                });
            }
            $el.css({
                visibility : 'visible',
                top : top + 'px',
                left : left + 'px'
            });
        }

        return this;
    },

    hide : function(){
        if( this.$el ){
            this.trigger('before.hide');
            this.$el.hide();
            this.trigger('after.hide');
        }
        return this;
    },

    resize : function( offset ){
        if( ! offset || ! this.$el ){
            return this;
        }
        var conf = {};
        if( offset.width ){
            conf.width = offset.width;
        }
        if( offset.height ){
            conf.height = offset.height;
        }
        this.$el.css( conf );
        return this;
    },

    setTitle : function( title ){
        if( this.$title ){
            this.$title.text( title );
        }
        return this;
    },

    destroy : function(){
        if( this.$el ){
            this.$closeBtn.off('click', this.onCloseClick);
            this.onCloseClick = null;
            this.off();
            this.$closeBtn = null;
            this.$el.remove();
            this.$el = null;
            this.config = null;
            this._destroyed = true;
        }
    }
} );


var Mixins = {};

//before
Mixins.before = function( eventName, callback ){
    this.on( 'before.' + eventName, callback, this);
    return this;
};
//增加  after  方法
Mixins.after = function( eventName, callback ){
    this.on( 'after.' + eventName, callback, this);
    return this;
};



////////////////不带按钮的模态对话框   /////////

function ModalDialog(args){
    this.config = $.extend( true, {
        zIndex : 9999,
        autoInit : true,
        //点击遮罩是否关闭
        clickMaskHide : true,
        maskConfig : {

        }
    }, args || {} );

    this._dialog = null;
    this._mask = null;
    this._destroyed = false;

    if( this.config.autoInit ){
        this.init();
    }
}

$.extend( ModalDialog.prototype, EventEmitter.prototype, Mixins );

$.extend( ModalDialog.prototype, {
    init : function(){
        var that = this;
        var conf = this.config;

        var zIndex = parseInt( conf.zIndex, 10 );
        if( zIndex > 0 && ! conf.maskConfig.zIndex ){
            conf.maskConfig.zIndex = zIndex - 1;
        }

        this._dialog = new Dialog($.extend( {}, conf));

        this._dialog.init();

        this.onCloseClick = function(){
            that.hide();
        };

        this._dialog.on('close.click', this.onCloseClick);

        this._mask = new Mask( conf.maskConfig );

        this.onMaskClick = function(){
            if( that.config.clickMaskHide ){
                that.hide();
            }
        };
        this._mask.on('click', this.onMaskClick);
    },

    resize : function( offset ){
        this._dialog.resize( offset );
        return this;
    },

    setTitle : function(title){
        if( this._dialog ){
            this._dialog.setTitle( title );
        }
        return this;
    },

    show : function(){
        if( this._destroyed ){
            return this;
        }
        if( ! this._dialog ){
            this.init();
        }
        this.trigger('before.show');
        this._dialog.show();
        this._mask.show();
        this.trigger('after.show');
        return this;
    },
    hide : function(){
        if( this._destroyed ){
            return this;
        }
        this.trigger('before.hide');
        if( this._dialog ){
            this._dialog.hide();
            this._mask.hide();
        }

        this.trigger('after.hide');
        return this;
    },

    destroy : function(){
        if( this._dialog ){

            this._dialog.off('close.click', this.onCloseClick);
            this.onCloseClick = null;
            this._mask.off('click', this.onMaskClick);
            this.onMaskClick = null;

            this._dialog.destroy();
            this._mask.destroy();
            this._dialog = null;
            this._mask = null;
            this.config = null;
            this._destroyed = true;
        }
    }
} );



var factory = {};

////// 工厂函数 ////

//不带 按钮 的模态对话框
factory.modalDialog = function( conf ){
    if( conf.url ){
        return factory.iframeDialog( conf );
    }
    return new ModalDialog( conf );
};

//内部是iframe的 模态对话框
factory.iframeDialog = function(conf){

    var config = $.extend( {}, conf );

    var iframeHeight = '100%';
    var dialogHeight = parseInt( config.height, 10 );
    if( dialogHeight > 0 ){
        iframeHeight = dialogHeight - TITLE_HEIGHT + 'px';
    }

    var $iframe = $('<iframe></iframe>', {
        src: 'javascript:\'\';',
        scrolling: 'no',
        frameborder: 'no',
        allowTransparency: 'true',
        css: {
            border: 'none',
            width: '100%',
            display: 'block',
            height: iframeHeight,
            overflow: 'hidden'
        }
    });

    config.content = $iframe;

    var dialog = new ModalDialog(config);

    var iframeInited = false;
    var timer;
    var errCount = 0;
    var destroy = dialog.destroy;
    var lastHeight = '';

    dialog.syncHeight = function(){
        var h;
        try {

            h = getIframeHeight( $iframe[0]) + 'px';
        } catch (err) {
            // 页面跳转也会抛错，最多失败6次
            errCount = (errCount || 0) + 1;
            if (errCount >= 6) {
                // 获取失败则给默认高度 300px
                // 跨域会抛错进入这个流程
                h = DEFAULT_HEIGHT;
                clearInterval( timer);
            }
        }
        if( lastHeight === h ){
            clearInterval( timer );
            return;
        }
        lastHeight = h;
        $iframe.css({
            height : lastHeight
        });
        dialog.resize({
            height : 'auto'
        });
    };

    var _resize = dialog.resize;
    dialog.resize = function( conf ){
        if( this._dialog && $iframe ){
            if( conf.height ){
                $iframe.css( conf );
            }
            _resize.call( this, conf );
        }
        return this;
    };

    function initIframe(){
        if( iframeInited ){
            return;
        }

        iframeInited = true;
        $iframe.attr('src', config.url );

        dialog.off('before.show', initIframe);

        $iframe.one('load', function() {

            // 绑定自动处理高度的事件
            if ( ! config.height ) {
                clearInterval( timer );
                timer = setInterval(function() {
                    dialog.syncHeight();
                }, 300);

                dialog.syncHeight();
            }
        });

    }
    dialog.on('before.show', initIframe);

    dialog.destroy = function(){
        clearInterval( timer );
        $iframe.attr('src', null );
        $iframe = null;
        destroy.call( dialog );
        dialog = null;
    };

    return dialog;
};

//单个确认按钮的对话框
factory.alertDialog = function(conf){
    var config = $.extend( true, {
        okText : '确 认',
        autoInit : true
    }, conf || {} );

    //生成按钮
    var $okBtn = $('<span class="j-btn j-btn-orange j-btn-big">' + conf.okText + '</span>');

    var $btnCon = $('<div class="btns-con-inner"></div>').append( $okBtn );

    //生成对话框
    config.btnContainer = $btnCon;

    var dialog = factory.modalDialog(config);

    var onOKClick = function(){
        dialog.hide();
        dialog.trigger('ok');
    };
    $okBtn.on('click', onOKClick );
    $btnCon = null;

    var destroy = dialog.destroy;

    dialog.destroy = function(){
        $okBtn.off('click', onOKClick);
        onOKClick = null;
        destroy.call( dialog );
        dialog = null;
    };


    return dialog;
};




// 获取 iframe 内部的高度
function getIframeHeight(iframe) {
    var D = iframe.contentWindow.document;
    if (D.body.scrollHeight && D.documentElement.scrollHeight) {
        return Math.min(
            D.body.scrollHeight,
            D.documentElement.scrollHeight
        );
    } else if (D.documentElement.scrollHeight) {
        return D.documentElement.scrollHeight;
    } else if (D.body.scrollHeight) {
        return D.body.scrollHeight;
    }
}


module.exports = factory;



});
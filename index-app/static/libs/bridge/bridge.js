/**
 * JS和Native桥接
 * @param  {[type]} require   [description]
 * @param  {[type]} exports   [description]
 * @return {[type]}           [description]
 */
define(function(require, exports, module){
    var Bridge;
    function init(){
        initWebViewBridge(WebViewbridgeCallback);

    };
    function initWebViewBridge(callback) {
        if (window['WebViewJavascriptBridge']) {
            return callback(WebViewJavascriptBridge);
        } else {
            return document.addEventListener('WebViewJavascriptBridgeReady', function() {
                return callback(WebViewJavascriptBridge);
            }, false);
        }
    };
    function WebViewbridgeCallback(bridge) {
        Bridge = bridge;
    };
    function getParams (){
        var result=[],len;
        len = arguments.length;
        for(var i =0; i < len; i++){
            result.push(arguments[i]);
        }
        return result;
    };
    //注册
    function webviewRegister() {
        try {
            return Bridge.callHandler('clientRegister');
        } catch (_error) {}
    };

    function webviewLogin() {
        try {
            return Bridge.callHandler('clientLogin');
        } catch (_error) {}
    }

    module.exports = {
        webviewRegister : webviewRegister,
        webviewLogin : webviewLogin
    }
});
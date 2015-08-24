/**
 * 可监听和派发事件的基类
 * Created by jess on 14-8-20.
 */


function EventEmitter(){}

EventEmitter.prototype.on = function( eventName, fn, context){
    if( ! this._listeners ){
        this._listeners = {};
    }
    if( ! this._listeners[eventName] ){
        this._listeners[eventName] = [];
    }
    //不允许同一个function被多次绑定到同一个事件上
    var canBind = true;
    var fnArray = this._listeners[eventName];
    for( var i = 0, len = fnArray.length; i < len; i++ ){
        var fnObj = fnArray[i];
        if( fnObj.fn === fn){
            canBind = false;
            break;
        }
    }
    if( canBind ){
        fnArray.push({
            fn : fn,
            context : context ? context : null
        });
    }
    return canBind;
};

EventEmitter.prototype.off = function( eventName, fn){
    if( ! this._listeners ){
        return false;
    }
    var fnArray = this._listeners[eventName];
    if( ! fnArray || fnArray.length < 1 ){
        return false;
    }
    for( var i = 0, len = fnArray.length; i < len; i++ ){
        var fnObj = fnArray[i];
        if( fnObj.fn === fn){
            fnArray.splice( i, 1);
            return true;
        }
    }
    return false;
};

EventEmitter.prototype.trigger = function( eventName, args ){
    if( ! this._listeners ){
        return ;
    }
    var fnArray = this._listeners[eventName];
    if( ! fnArray || fnArray.length < 1 ){
        return;
    }
    for( var i = 0, len = fnArray.length; i < len; i++ ){
        var fnObj = fnArray[i];
        if( typeof fnObj.fn === 'function'){
            fnObj.fn.call( fnObj.context, args);
        }
    }
};

//全局事件中心
EventEmitter.eventCenter = new EventEmitter();


module.exports = EventEmitter;

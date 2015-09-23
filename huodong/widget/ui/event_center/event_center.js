var token = {},
    slice = Array.prototype.slice;

var deferred = function() {
        this.pending = [];
        this.afterStack = [];
        this.beforeStack = [];
        this.status = 0;
        this._lock = false;
        this.eventCache = null;
    };

$.extend(deferred.prototype, {
    _empty: function() {},
    then: function(success, failure) {
        success = success || this._empty;
        failure = failure || this._empty;
        this.pending.push({
            resolve: success,
            reject: failure
        });

        if (this.status === 1) {
            this.resolve(this.eventCache);
        };
        if (this.status === 2) {
            this.reject();
        };
        return this;
    },
    _iterator: function(stack, result) {
        for (var i = 0, j = stack.length; i < j; i++) {
            $.isFunction(stack[i]) && stack[i](result);
        }
    },
    _fire: function(type, result) {
        var value;
        this.eventCache = result;
        if (this._lock) return;
        if (this.pending[0]) {
            try {
                this.status = 1;
                this._iterator(this.beforeStack, result);
                value = $.isFunction(this.pending[0][type]) && this.pending[0][type](result);
                this._iterator(this.afterStack, result);
            } catch (e) {
                this.status = 2;
                type = 'reject';
                result = e;
                $.isFunction(this.pending[0][type]) && this.pending[0][type](result);
            }
            this.pending.shift();

        };
        if (this.isDeferred(value)) {
            this._pipe(value, this)
        } else if (this.pending[0]) {
            this._fire(type, result);
        };
        return this;
    },
    _pipe: function(prev, next) {
        if (prev && prev.then) {
            prev.then(function() {
                next.resolve(slice.call(arguments));
            }, function() {
                next.reject(slice.call(arguments));
            });
        }
        return prev;
    },
    resolve: function(result) {
        this.status = 1;
        this._fire('resolve', result);
    },
    reject: function(result) {
        this.status = 2;
        this._fire('reject', result);
    },
    _getToken: function() {
        return token;
    },
    isDeferred: function(obj) {
        return typeof obj === 'object' && $.isFunction(obj._getToken) && obj._getToken() === token;
    },
    wait: function(num) {

        return this.then(function() {
            var d = new deferred(),
                t = new Date;
            setTimeout(function() {
                d.resolve((new Date).getTime() - t.getTime());
            }, num * 1000)
            return d;
        })
    },
    start: function() {
        this.resolve.apply(this, arguments);
    },
    parallel: function(dl) {
        dl = $.isArray(dl) ? dl : slice.call(arguments);
        var p = new deferred(),
            resultArg = [],
            i = 0,
            r = 0,
            l = dl.length,
            me = this,
            fn, send;
        p._count = p._count || dl.length;

        function done(num) {
            return function(result) {
                if (!send) {
                    resultArg[num] = result;
                };
                if (++r === p._count) {
                    send = true;
                    p._count = 0;
                    p.resolve.call(p, resultArg);
                };
            };
        };
        for (; i < l; i++) {
            fn = dl[i];
            if ($.isFunction(fn) && !me.isDeferred(fn)) {
                fn = fn();
            };
            if (me.isDeferred(fn)) {
                fn.then(done(i), done(i));
            } else {
                done(i)(fn);
            };
        };
        return p;
    },
    lock: function() {
        this._lock = true;
        return this;
    },
    unlock: function() {
        this._lock = false;
        this.resolve.apply(this, arguments);
        return this;
    },
    error: function(fn) {
        return this.then(false, fn);
    },
    any: function(num) {
        this._count = 1;
        return this;
    },
    some: function(num) {
        this._count = num;
        return this;
    },
    when: function() {
        return this.parallel.apply(this, slice.call(arguments));
    },
    clear: function() {
        this.pending.length = 0;
        return this;
    },
    after: function() {
        this.afterStack = this.afterStack.concat(slice.call(arguments));
        return this;
    },
    before: function() {
        this.beforeStack = this.beforeStack.concat(slice.call(arguments));
        return this;
    }
});

var custEvent = function() {
    this.listeners = {};
    deferred.apply(this, slice.call(arguments));
};

$.extend(custEvent, deferred);
$.extend(custEvent.prototype, deferred.prototype);

$.extend(custEvent.prototype, {
    /**
     * 绑定事件。
     *
     * `callback`方法在执行时，arguments将会来源于fire的时候携带的参数。如
     * ```javascript
     * var obj = {};
     *
     * obj.on( 'customEventA', function( arg1, arg2 ) {
     *     console.log( arg1, arg2 ); // => 'arg1', 'arg2'
     * });
     *
     * obj.fire( 'customEventA', 'arg1', 'arg2' );
     * ```
     *
     * 如果`callback`中，某一个方法`return false`了，则后续的其他`callback`都不会被执行到。
     * 切会影响到`fire`方法的返回值，为`false`。
     *
     * `on`还可以用来添加一个特殊事件`all`, 这样所有的事件触发都会响应到。同时此类`callback`中的arguments有一个不同处，
     * 就是第一个参数为`type`，记录当前是什么事件在触发。此类`callback`的优先级比脚低，会再正常`callback`执行完后触发。
     * ```javascript
     * obj.on( 'all', function( type, arg1, arg2 ) {
     *     console.log( type, arg1, arg2 ); // => 'customEventA', 'arg1', 'arg2'
     * });
     * ```
     *
     * @method on
     * @grammar on( events, callback[, context] ) => self
     * @param  {String}   events     事件名，支持多个事件用空格隔开
     * @param  {Function} callback 事件处理器
     * @param  {Object}   [context]  事件处理器的上下文。
     * @return {self} 返回自身，方便链式
     * @chainable
     * @class Mediator
     */
    on: function(events, callback, context) {
        if (!events || !callback) {
            return false;
        };

        if (!this.listeners[events]) {
            this.listeners[events] = [];
        };
        if (this._isUnique(events, callback, context)) {
            this.listeners[events].push([callback, context]);
        };
        return this;
    },
    _findEvent: function(events, callback, context) {
        var ev = this.listeners[events],
            i = 0,
            l = ev.length;
        for (; i < l; i++) {
            if (ev[i][0] === callback && ev[i][1] === context) {
                return ev[i];
            };
        };
        return null;
    },
    _isUnique: function(events, callback, context) {
        return this._findEvent(events, callback, context) === null ? true : false;
    },
    /**
     * 解除事件绑定
     * @method off
     * @grammar off( [events[, callback[, context] ] ] ) => self
     * @param  {String}   [events]     事件名
     * @param  {Function} [callback] 事件处理器
     * @param  {Object}   [context]  事件处理器的上下文。
     * @return {self} 返回自身，方便链式
     * @chainable
     */
    off: function(events, callback, context) {
        var ev = this.listeners[events],
            i = 0,
            l = ev.length;
        if (!callback) {
            ev.length = 0;
            return;

        };
        for (; i < l; i++) {
            if (ev[i][0] === callback && ev[i][1] === context) {
                ev.splice(i, 1);
            };
        };
        return this;
    },
    /**
     * 触发事件
     * @method fire
     * @grammar fire( events[, args...] ) => self
     * @param  {String}   type     事件名
     * @param  {*} [...] 任意参数
     * @return {Boolean} 如果handler中return false了，则返回false, 否则返回true
     */
    fire: function(events, options) {
        var l = this.listeners[events] ? this.listeners[events].length : 0,
            i = 0,
            p = new deferred(),
            me = this,
            result;
        options = options || {};
        options.promise = p;
        for (; i < l; i++) {
            this._iterator(this.beforeStack, options); //增加after\before
            var o = this.listeners[events][i];
            result = this.listeners[events][i][0].call(this.listeners[events][i][1] || this,  options);
            this._iterator(this.afterStack, options);

        }
        return result;
    },
    when: function(events) {
        var i = 0,
            list = [],
            j, ev;
            
        if( !$.isArray(events)){
            events = slice.call(arguments);
        }

        for (j = events.length; i < j; i++) {
            ev = $.isArray(events[i]) ? events[i] : [events[i]];
            list.push(this.fire.apply(this, ev));
        }
        return this.parallel(list);
    },
    /**
     * 绑定事件，且当handler执行完后，自动解除绑定。
     * @method once
     * @grammar once( events, callback[, context] ) => self
     * @param  {String}   events     事件名
     * @param  {Function} callback 事件处理器
     * @param  {Object}   [context]  事件处理器的上下文。
     * @return {self} 返回自身，方便链式
     * @chainable
     */
    once: function(events, callback, context) {
        var me = this;

        function once() {
            callback.apply(context, slice.call(arguments));
            me.off(events, once, context);
        }
        this.on(events, once, context);
        return this;
    }
}, true);

module.exports.deferred = deferred;
module.exports.meditor = custEvent;
module.exports.eventCenter = new custEvent();

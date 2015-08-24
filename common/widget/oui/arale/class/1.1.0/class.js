define(function(require, exports, module) {

  // Class
  // -----------------
  // Thanks to:
  //  - http://mootools.net/docs/core/Class/Class
  //  - http://ejohn.org/blog/simple-javascript-inheritance/
  //  - https://github.com/ded/klass
  //  - http://documentcloud.github.com/backbone/#Model-extend
  //  - https://github.com/joyent/node/blob/master/lib/util.js
  //  - https://github.com/kissyteam/kissy/blob/master/src/seed/src/kissy.js


  // The base Class implementation.
  function Class(o) {
    // Convert existed function to Class.
    if (!(this instanceof Class) && isFunction(o)) {
      return classify(o)
    }
  }

  module.exports = Class


  // Create a new Class.
  //
  //  var SuperPig = Class.create({
  //    Extends: Animal,
  //    Implements: Flyable,
  //    initialize: function() {
  //      SuperPig.superclass.initialize.apply(this, arguments)
  //    },
  //    Statics: {
  //      COLOR: 'red'
  //    }
  // })
  //
  Class.create = function(parent, properties) {
    if (!isFunction(parent)) {
      //第一个参数parent不是函数，就把第一个参数parent赋值给properties
      properties = parent
      //parent重设值为null
      parent = null
    }

    //如果properties is undefined 就把properties ={}，否则不变
    properties || (properties = {})
    //如果parent为null，就把parent设为properties.Extends或 Class本身
    //这时的parent实际已为一个函数
    parent || (parent = properties.Extends || Class)
    //继续把properties.Extends设为parent
    properties.Extends = parent

    // The created class constructor
    //Class.create()的实际构造函数为SubClass
    function SubClass() {
      //arguments为实例传递的参数 如：var dog = new Dog('Jack'); 中的"Jack"
      //arguments参数传递给父类
      // Call the parent constructor.
      parent.apply(this, arguments)

     // console.dir(this.constructor)
      // Only call initialize in self constructor.
      if (this.constructor === SubClass && this.initialize) {
        this.initialize.apply(this, arguments)
      }
    }

    // Inherit class (static) properties from parent.
    if (parent !== Class) {
      //这里好像是把parent中的extend,implement,superclass方法复制到SubClass
      mix(SubClass, parent, parent.StaticsWhiteList)
    }

    //把properties中的属性和方法挂到SubClass.prototype上
    // Add instance properties to the subclass.
    implement.call(SubClass, properties)

    //其实这里可以直接 return SubClass，返回classify(SubClass)只是为SubClass添加extend和implement属性
    // Make subclass extendable.
   return classify(SubClass)
  }

  //implement的作用是把properties对象中的属性和方法复制到另一(更改this指向的)对象的原型prototype上去
  //实现继承的核心
  function implement(properties) {
    var key, value

    for (key in properties) {
      value = properties[key]

      //检查key是否是Class.Mutators中的Extends,Implements,Statics
      if (Class.Mutators.hasOwnProperty(key)) {
        //执行Class.Mutators[key]中的方法
        Class.Mutators[key].call(this, value)
      } else {
        this.prototype[key] = value
      }
    }
  }

  //Class中的静态方法，可以方便实现Class.create
  // Create a sub Class based on `Class`.
  Class.extend = function(properties) {
    properties || (properties = {})
    properties.Extends = this

    return Class.create(properties)
  }


  function classify(cls) {
    //添加extend和implement属性
    cls.extend = Class.extend
    cls.implement = implement
    return cls
  }


  // Mutators define special properties.
  Class.Mutators = {

    'Extends': function(parent) {
      var existed = this.prototype
      var proto = createProto(parent.prototype)

      // Keep existed properties.
      mix(proto, existed)

      // Enforce the constructor to be what we expect.
      proto.constructor = this

      // Set the prototype chain to inherit from `parent`.
      this.prototype = proto

      // Set a convenience property in case the parent's prototype is
      // needed later.
      this.superclass = parent.prototype
    },

    //
    'Implements': function(items) {
      // items是一个数组或字符串，这里如果是字符串，把期放入新建的一个数组中
      isArray(items) || (items = [items])
      //proto指向绑定的对象的prototype上
      var proto = this.prototype, item

      while (item = items.shift()) {
        //如果item.prototype存在，则复制其prototype上的属性，否则复制item本身到指定对象的prototype上,实现继承
        mix(proto, item.prototype || item)
      }
    },

    'Statics': function(staticProperties) {
     //可以单独复制Statics中的静态属性和方法复制到对象本身上面
      mix(this, staticProperties)
    }
  }


  // Shared empty constructor function to aid in prototype-chain creation.
  function Ctor() {
  }

  //chrome firfox是有__proto__属性的，并且在开发者工具中已暴露了此属性，
  //实例的__proto__指向构造函数的prototype上
  //其它浏览器若没有__proto__则 新建一个空函数，然后把空函数的prototype指向proto参数，重新new一下模拟实现，效率要慢些
  // See: http://jsperf.com/object-create-vs-new-ctor
  var createProto = Object.__proto__ ?
      function(proto) {
        return { __proto__: proto }
      } :
      function(proto) {
        Ctor.prototype = proto
        return new Ctor()
      }


  // Helpers
  // ------------

  function mix(r, s, wl) {
    // Copy "all" properties including inherited ones.
    for (var p in s) {
      if (s.hasOwnProperty(p)) {
        if (wl && indexOf(wl, p) === -1) continue

        // 在 iPhone 1 代等设备的 Safari 中，prototype 也会被枚举出来，需排除
        if (p !== 'prototype') {
          r[p] = s[p]
        }
      }
    }
  }


  var toString = Object.prototype.toString

  var isArray = Array.isArray || function(val) {
      return toString.call(val) === '[object Array]'
  }

  var isFunction = function(val) {
    return toString.call(val) === '[object Function]'
  }

  var indexOf = Array.prototype.indexOf ?
      function(arr, item) {
        return arr.indexOf(item)
      } :
      function(arr, item) {
        for (var i = 0, len = arr.length; i < len; i++) {
          if (arr[i] === item) {
            return i
          }
        }
        return -1
      }
})

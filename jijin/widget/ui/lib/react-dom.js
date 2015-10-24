
define('jijin:widget/ui/lib/react-dom', ['require', 'exports', 'module', 'jijin:widget/ui/lib/react'], function(require, exports, module){


/**
 * ReactDOM v0.14.0
 *
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
// Based off https://github.com/ForbesLindesay/umd/blob/master/template.js
;(function(f) {
  // CommonJS
  
    window.ReactDOM = f(window.React);

})(function(React) {
  return React.__SECRET_DOM_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
});


module.exports = window.ReactDOM;

});




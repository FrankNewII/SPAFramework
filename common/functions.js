;(function (window) {
  "use strict";

  window.common = window.common || {};
  var functions = window.common.functions = window.common.functions || {};

  functions.array = {};
  functions.array.forEach = forEach;
  functions.array.extend = extend;
  /*Additional function for inside use or use in users application
  * In Additional functions will be most common function, like foreach, extend, recursion forEach, etc.
  * */

  function forEach(obj, fn) {
    if(obj || obj === null) {
      if(typeof (obj) == 'function') {
        for (var k in obj) {
          if(k !== 'prototype') fn.call(null, obj[k], k);
        }
      }
      else {
        for (var k in obj) {
          fn.call(null, obj[k], k);
        }
      }
    } else {
      throw new Error('This argument can\'t be iterated', obj);
    }
  }

  function extend(obj1, obj2) {
    forEach(obj2, function (v, k) {
      obj1[k] = v;
    });
  }

})(window)
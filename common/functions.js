;(function (window) {
  "use strict";

  window.common = window.common || {};
  var functions = window.common.functions = window.common.functions || {};

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

})(window)
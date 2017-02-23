;(function (window) {
  "use strict";

  window.common = window.common || {};
  var events = window.common.events = window.common.events || {};

  events.emit = up;
  events.broadcast = down;
  events.on = on;

  function up(name, object, data) {
    if(!object.parent) return;

    var parent = object.parent;

    while(parent) {
      if(parent._listeners[name]) {
        for(var a = 0; a < parent._listeners[name].length; a++) {
          parent._listeners[name][a](data);
        }
      }

      parent = parent.parent;
    }
  }

  function down(name, object, data) {
    if(object._listeners && object._listeners[name]) {
      for(var i = 0; i < object._listeners[name].length; i++) {
        object._listeners[name][i](data);
      }
    }

    if(object._childrens) {
      for(var i = 0; i < object._childrens.length; i++) {
        down(name, object._childrens[i], data);
      }
    }
  }

  function on(name, object, cb) {
    if(!object._listeners) {
      Object.defineProperty(object, '_listeners', {
        enumerable: false,
        value: {}
      });
    }

    if(!object._listeners[name]) {
      object._listeners[name] = [];
    }

    object._listeners[name].push(cb);
  }

})(window)
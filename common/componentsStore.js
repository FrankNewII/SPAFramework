;(function (window) {
  "use strict";

  window.common = window.common || {};
  var components = window.common.components = window.common.components || {};

  var availableComponents = {};

  components.add = add;
  components.init = init;

  function init(name, element, parentComponent) {

    var applyArguments = [null];
    var args = Array.apply(null, arguments);

    args.shift(1);

    applyArguments.push.apply(applyArguments, args);

    if(!availableComponents[name]) {
      throw new Error("Component is not available:" + name);
    }

    return new availableComponents[name](element, parentComponent);
  }

  function add(name, fn) {
    if(availableComponents[name]) {
      console.warn("Reset component: "+ name);
      return;
    }

    availableComponents[name] = fn;
  }

  function upEvent(name, data, obj) {
    if(!obj.parent) return;

    var parent = obj.parent;

    while(parent) {
      if(parent.events._listeners[name]) {
        for(var a = 0; a < parent.events._listeners[name].length; a++) {
          parent.events._listeners[name][a](data);
        }
      }

      parent = parent.parent;
    }
  }

  function downEvent(name, data, object) {
    if(object.events._listeners && object.events._listeners[name]) {
      for(var i = 0; i < object.events._listeners[name]; i++) {
        object.events._listeners[name][i](data);
      }
    }

    if(object._childrens) {
      for(var i = 0; i < object._childrens.length; i++) {
        downEvent(name, data, object._childrens[i]);
      }
    }
  }

  function modifyObject(obj) {

    Object.defineProperties(a, {
      'nonwritable': {
        value: {},
        enumerable: false,
        configurable: false,
        writable: false
      }});

    obj.prototype._listeners = [];
    obj.prototype.on = function (name, cb) {
      this._listeners[name].push(cb);
    }

    obj.prototype.events.up = function (name, data, obj) {
      upEvent(name, data, obj);
    }

    obj.prototype.events.down = function (name, data, obj) {
      upEvent(name, data, obj);
    }
  }

})(window)
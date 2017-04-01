;(function () {
  "use strict";

  window.common = window.common || {};
  var events = window.common.events = window.common.events || {};

  /* This is function which i use to send event message
   * They cycled in current object and try to find object listeners with method which we set by params @name
   * When current _listeners object is overed, they are try to find links to children or parent.
   * And repeat all whose functions in next object
   *
   * 'down' function - try to find childrens in current object
   * 'up' function - try to find parent;
   *
   * 'on' function - append object '_listeners' to current object if they is not exist
   * and pushed callback in stack of callbacks.
   *
   * @params name - name of event
   * @params object - current object for found or append event
   * @params data - which will set by argument in callback
   *
   * This is simple EventEmmiter
   * */

  events.emit = up;
  events.broadcast = down;
  events.on = on;

  function up(name, object, data) {
      if (!object._parent) return;

      var parent = object._parent;

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

})();
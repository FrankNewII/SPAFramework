;(function (window) {
  "use strict";

  window.common = window.common || {};
  var components = window.common.components = window.common.components || {};

  var availableComponents = {};

  components.add = add;
  components.get = get;

  function get(name, element, parentComponent) {

    var component = new availableComponents[name](element, parentComponent)

    addChildrens(component, parentComponent);

    if(!availableComponents[name]) {
      throw new Error("Component is not available:" + name);
    }

    return component;
  }

  function add(name, fn) {
    if(availableComponents[name]) {
      console.warn("Reset component: "+ name);
      return;
    }

    availableComponents[name] = fn;
  }

  function addChildrens(object, parent) {
    Object.defineProperty(object, '_childrens', {
      enumerable: false,
      value: []
    });

    if(parent) parent._childrens.push(object);
  }

})(window)
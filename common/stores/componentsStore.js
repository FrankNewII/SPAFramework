;(function (window) {
  "use strict";

  window.common = window.common || {};
  var components = window.common.components = window.common.components || {};

  /*Component store - most important class, Factory of component, which will return
  * example of component class with additional functions
  * */
  var availableComponents = {};

  components.add = add;
  components.get = get;



  function get(name, element, parentComponent) {

    var component = new availableComponents[name](element, parentComponent);

    addChildrensToParent(component, parentComponent);

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

  function addChildrensToParent(object, parent) {

    Object.defineProperty(object, '_childrens', {
      enumerable: false,
      value: []
    });

    if(parent) parent._childrens.push(object);
  }

})(window)
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
    name = name.replace(/[A-Z]/g, function (v, i) {
      return i ? '-' + v.toLowerCase() : v.toLowerCase();
    });

    var component = new availableComponents[name](element, parentComponent);

    addChildrensToParent(component, parentComponent);

    if (!availableComponents[name]) {
      throw new Error("Component is not available:" + name);
    }

    return component;
  }

  function add(name, fn) {

    name = name.replace(/[A-Z]/g, function (v, i) {
      return i ? '-' + v.toLowerCase() : v.toLowerCase();
    });

    if (availableComponents[name]) {
      console.warn("You try to reset component: " + name);
      return;
    }

    document.registerElement(name, {
      prototype: Object.create(HTMLDivElement.prototype, {
        createdCallback: {
          value: function () {
            console.log('[CALLBACK] created: ', this);
          }
        },
        attachedCallback: {
          value: function () {
            console.log('[CALLBACK] attached: ', this);
          }
        }
      })
    });

    availableComponents[name] = fn;
  }

  function addChildrensToParent(object, parent) {
    Object.defineProperty(object, '_childrens', {
      enumerable: false,
      value: []
    });

    if (parent) parent._childrens.push(object);
  }

})(window)
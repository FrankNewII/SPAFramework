;(function (window) {
  "use strict";
  window.common = window.common || {};
  var models = window.common.models = window.common.models || {};

  /*Store of services, in the future i wont to make it like DI, but now i don't understand why i need him*/
  var availableModels = {};

  models.add = add;
  models.get = get;

  function get(name) {
    if(!availableModels[name]) {
      throw new Error("Model is not available:" + name);
    }

    return availableModels[name];
  }

  function add(name, fn) {
    if(availableModels[name]) {
      console.warn("Reset model: "+ name);
      return;
    }

    availableModels[name] = fn;
  }
})(window)
;(function () {
  "use strict";

  window.common = window.common || {};
  var models = window.common.models = window.common.models || {};

    /*
     * Store of services
     * */
  var availableModels = {};

  models.add = add;
  models.get = get;

  function get(name) {
      if (!availableModels[name]) {
          throw new Error("Model is not available: " + name);
      }

      return availableModels[name];
  }

  function add(name, fn) {
      if (availableModels[name]) {
          console.warn("Reset model: " + name);
      }

    availableModels[name] = fn;
  }
})();
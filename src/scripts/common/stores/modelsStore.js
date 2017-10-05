;(function () {
  "use strict";

  window.common = window.common || {};
  var models = window.common.models = window.common.models || {};

    /*
     * Store of services
     * */
  var availableModels = {};
    var exemplars = {};
  models.add = add;
  models.get = get;

  function get(name) {
      if (!availableModels[name]) {
          throw new Error("Model is not available: " + name);
      }

      if (availableModels[name].type === 'singleton') {
          return (availableModels[name].instance);
      }
      return availableModels[name].instance;
  }

    /**
     * config: {
   *    type: 'singleton' | 'factory' ,
   *    instance: Class,
   *    name: string
   * }*/
    function add(config) {
        if (availableModels[config.name]) {
          console.warn("Reset model: " + name);
      }
        availableModels[config.name] = config;
  }
})();
(function (window) {
  "use strict";
  window.common = window.common || {};
  var components = window.common.components = window.common.components || {};
  var availableComponents = {};

  components.add = add;
  components.get = get;

  function get(name) {

    var applyArguments = [null];
    var args = Array.apply(null, arguments);

    args.shift(1);

    applyArguments.push.apply(applyArguments, args);

    if(!availableComponents[name]) {
      throw new Error("Component is not available:" + name);
    }

    return new (Function.prototype.bind.apply(availableComponents[name], applyArguments));
  }

  function add(name, fn) {
    if(availableComponents[name]) {
      console.warn("Reset component: "+ name);
      return;
    }

    availableComponents[name] = fn;
  }
  

})(window)
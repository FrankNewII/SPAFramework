;(function (window) {
    "use strict";

    window.common = window.common || {};
    var DI = window.common.DI = window.common.DI || {};
    DI.get = get;

    var getModel = window.common.models.get;
    var forEach = common.functions.array.forEach;

    function get(name) {
        if (arguments.length == 1) {


            if (!availableModels[name]) {
                throw new Error("Model is not available:" + name);
            }

            return availableModels[name];
        }
        else if (arguments.length > 1) {
            var dependencies = [];

            forEach(arguments, function (dependencyName) {
                dependencies.push(getModel(dependencyName))
            });

            return dependencies;
        }
    }

})(window);
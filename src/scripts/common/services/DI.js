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
                //TODO: обдумать это решение. Не уверен, что так делать нормально и это точно очень не явно
                if (typeof dependencyName === 'string') {
                    dependencies.push(getModel(dependencyName));
                }
                else if (typeof dependencyName === 'function') {
                    dependencies.push(dependencyName);
                }

            });

            return dependencies;
        }
    }

})(window);
;(function () {
    "use strict";

    window.common = window.common || {};
    var DI = window.common.DI = window.common.DI || {};
    DI.get = get;

    var getModel = window.common.models.get;
    var forEach = common.functions.array.forEach;

    function get(dependencies, element, parent) {
        var result = [];
        forEach(dependencies, function (dependencyName) {
            if (typeof dependencyName === 'string') {
                result.push(getModel(dependencyName)(element, parent));
            }
            else {
                result.push(dependencyName);
            }
        });

        return result;
    }

})();
;(function () {
    "use strict";

    window.common = window.common || {};
    var functions = window.common.functions = window.common.functions || {};

    functions.object = {};
    functions.object.extend = extend;

    var forEach = functions.array.forEach;

    function extend(obj1, obj2) {
        var newObject = {};
        forEach(obj1, function (v, k) {
            if (functions.types.isArray(v) || functions.types.isObject(v)) {
                newObject[k] = extend(newObject[k], v);

            } else {
                newObject[k] = v;
            }

        });
        forEach(obj2, function (v, k) {
            if (functions.types.isArray(v) || functions.types.isObject(v)) {
                newObject[k] = extend(newObject[k], v);

            } else {
                newObject[k] = v;
            }

        });

        return newObject;
    }

})();

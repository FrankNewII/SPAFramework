;(function (window) {
    "use strict";

    window.common = window.common || {};
    var functions = window.common.functions = window.common.functions || {};

    functions.object = {};
    functions.object.extend = extend;

    var forEach = functions.array.forEach;

    function extend(obj1, obj2) {
        forEach(obj2, function (v, k) {
            obj1[k] = v;
        });
    }

})(window);

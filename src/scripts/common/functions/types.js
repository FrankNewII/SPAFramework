;(function () {
    "use strict";

    window.common = window.common || {};
    var functions = window.common.functions = window.common.functions || {};

    functions.types = {};
    functions.types.isNumber = isNumber;

    ['Boolean', 'String', 'RegExp', 'Undefined', 'Date', 'Arguments', 'Function', 'Null', 'Array'].forEach(function (v) {
        functions.types['is' + v] = function (obj) {
            return Object.prototype.toString.call(obj) === '[object ' + v + ']';
        }
    });

    function isNumber(v) {
        return typeof(v) == 'number' && !isNaN(v) && isFinite(v);
    }

})();

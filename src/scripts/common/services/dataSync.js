;(function () {
    "use strict";

    window.common = window.common || {};

    var sync = window.common.sync = window.common.sync = {};

    sync.setWatcher = setWatchers;

    var forEach = common.functions.array.forEach;
    var watchedObjects = {};

    //TODO: cut this after testing
    window.watchedObjects = {};

    var objectId = 0;

    function setWatchers(object) {
        forEach(object, function (v, k) {
            if (typeof v !== "function") {
                console.log(v);
                Object.defineProperty(object, '__' + k, {
                    enumerable: false,
                    value: v,
                    writable: true
                });

                Object.defineProperty(object, k, {
                    set: function (v) {
                        if (v !== this['__' + k]) {
                            this['__changedVariables'].push({
                                name: k,
                                oldValue: this[k],
                                newValue: v
                            });
                            this['__' + k] = v;
                        }
                    },
                    get: function () {
                        return this['__' + k];
                    }
                })
            }
        });

        Object.defineProperty(object, '__changedVariables',
            {
                value: [],
                enumerable: false
            }
        );
        window.watchedObjects[objectId++] = object;
    }

})();
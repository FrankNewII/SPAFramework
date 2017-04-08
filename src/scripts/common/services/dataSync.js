;(function () {
    "use strict";

    window.common = window.common || {};

    var sync = window.common.sync = window.common.sync = {};

    sync.setWatcher = setWatchers;
    sync.appendListener = appendListener;

    var forEach = common.functions.array.forEach;
    var watchedObjects = {};

    //TODO: cut this after testing
    window.watchedObjects = {};

    var objectId = 0;

    function setWatchers(object) {
        forEach(object, function (v, k) {
            if (typeof v !== "function") {
                if (!object.__vars) {
                    Object.defineProperty(object, '__vars', {
                        enumerable: false,
                        value: {},
                        writable: true
                    });
                }

                Object.defineProperty(object.__vars, k, {
                    enumerable: false,
                    value: {},
                    writable: true
                });

                Object.defineProperty(object.__vars[k], 'value', {
                    enumerable: false,
                    value: v,
                    writable: true
                });

                Object.defineProperty(object.__vars[k], 'listeners', {
                    enumerable: false,
                    value: [],
                    writable: true
                });

                Object.defineProperty(object, k, {
                    set: function (v) {
                        if (v !== this['__' + k]) {

                            updateViews(this.__vars[k], v);

                            this.__vars[k].value = v;
                        }
                    },
                    get: function () {
                        return this.__vars[k].value;
                    }
                });
            }
        });

        window.watchedObjects[objectId++] = object;
    }

    function updateViews(object, value) {
        if (object.listeners) {
            forEach(object.listeners, function (v) {
                console.log(v);
                v.update(value);
            });
        }
    }

    function appendListener(valueFrom, view, key) {
        valueFrom.__vars[key].listeners.push(view);
    }

})();
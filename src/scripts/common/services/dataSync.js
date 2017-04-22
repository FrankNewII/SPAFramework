;(function () {
    "use strict";

    window.common = window.common || {};

    var sync = window.common.sync = window.common.sync = {};

    sync.setWatcher = setWatchers;
    sync.appendListener = appendListener;

    var forEach = common.functions.array.forEach;

    var typing = common.functions.types;
    var watchedObjects = {};

    //TODO: cut this after testing
    window.watchedObjects = {};

    var objectId = 0;

    function setWatchers(object) {
        forEach(object, function (v, k) {
            if (!typing.isFunction(v)) {
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

                Object.defineProperty(object.__vars[k], 'listeners', {
                    enumerable: false,
                    value: [],
                    writable: true
                });

                Object.defineProperty(object.__vars[k], 'value', {
                    enumerable: false,
                    value: v,
                    writable: true
                });

                appendWatchersToRef(object, k, v);
            }
        });

        window.watchedObjects[objectId++] = object;
    }

    /*
     * Это функция обновления подписчиков на перемную. Здесь я вызываю все функции прослушек и передаю им два параметра
     * Новое значение и имя ключа. В принципе я бы смог справится с одним значением. Но ключ мне надо для прослушек,
     * которые следят за целыми объектами.
     * Мне нет мысла для каждой переменной объекта создавать отдельную функцию обновления.
     *
     * Я сейчас подумал о том, что в случае с прослушкой массива - я нарушу работу оптимизатора, который попытается оптимизировать
     * массив. Как вариант - прийдется использовать новый класс наследник от массива.
     * Но я пока незнаю...
     * */

    function updateListeners(object, value, key) {
        if (object.listeners) {
            forEach(object.listeners, function (v) {
                v.__update(value, key);
            });
        }
    }

    function appendListener(valueFrom, view, key) {
        valueFrom.__vars[key].listeners.push(view);
        view.__update(valueFrom.__vars[key].value);
    }

    function appendWatchersToRef(object, k) {
        Object.defineProperty(object, k, {
            set: function (v) {
                if (v !== this.__vars[k]) {

                    updateListeners(this.__vars[k], v, k);

                    this.__vars[k].value = v;
                }
            },
            get: function () {
                return this.__vars[k].value;
            }
        });
    }

    function ArrayModifyChecker(args, currentObject) {
        if (args && args.length) {

        }
    }

    ArrayModifyChecker.prototype = Object.create(Array.prototype);

})();
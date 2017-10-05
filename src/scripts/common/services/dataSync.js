;(function () {
    "use strict";

    window.common = window.common || {};

    var sync = window.common.sync = window.common.sync = {};

    sync.setWatcher = setWatchers;
    sync.appendListener = appendListener;

    var forEach = common.functions.array.forEach;

    var typing = common.functions.types;

    var arrayObserve = window.common.observe.array;
    /*Объект со списком всех наблюдаемых переменных.
     * После инитиализации имеет следуюющий вид:
     * watchedObjects: {
     *      0: {
     *           __vars: {
     *               firstVar: {
     *                   value: 10,
     *                   listeners: [
     *                       //Функции прослушек, которые будут вызваны для перегенерации html
     *                       function one(newValue, key) {},
     *                       function two(newValue, key) {}
     *                   ]
     *               }
     *          }
     *      },
     *      1: {
     *           __vars: {
     *               firstArray: {
     *                   value: ArrayModifyChecker[1, 2, 3, 4],
     *                   listeners: [
     *                       function one(newValue, key) {},
     *                       function two(newValue, key) {}
     *                   ]
     *               }
     *          }
     *      }
     * }
     * */
    var watchedObjects = {};

    //TODO: cut this after testing
    window.watchedObjects = {};

    var objectId = 0;

    function setWatchers(object) {
        forEach(object, function (v, k) {
            if (v === undefined || !typing.isFunction(v) && !v.__DONT_WATCH) {
                if (!object.__vars) {
                    Object.defineProperty(object, '__vars', {
                        enumerable: false,
                        value: {},
                        writable: true,
                        removable: true
                    });
                }
                if (object.__objectIndex === undefined) {
                    Object.defineProperty(object, '__objectIndex', {
                        enumerable: false,
                        value: objectId++,
                        writable: false
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


                Object.defineProperty(object, k, {
                    set: function (v) {
                        if (v !== this.__vars[k].value) {

                            this.__vars[k].value = v;
                            updateListeners(this, k, v);

                        }
                    },
                    get: function () {
                        return this.__vars[k].value;
                    }
                });
                /*if (typing.isArray) {
                 arrayObserve(updateListeners)

                 } else {


                 }*/

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

    function updateListeners(valueFrom, key, value) {
        if (valueFrom.beforeUpdateListeners) {
            valueFrom.beforeUpdateListeners(key, value, valueFrom);
        }

        if (valueFrom.__vars[key].listeners) {
            forEach(valueFrom.__vars[key].listeners, function (v) {

                if (v.onChangeValues) {
                    v.onChangeValues(key, value);
                }

                v.__update(value, key, valueFrom);

                if (v.afterUpdateValues) {
                    v.afterUpdateValues(key, value, valueFrom);
                }
            });
        }

        if (valueFrom.afterUpdateListeners) {
            valueFrom.afterUpdateListeners(key, value, valueFrom);
        }

    }

    function appendListener(valueFrom, view, key) {
        try {
            if (valueFrom.beforeAppendListeners) {
                valueFrom.beforeAppendListeners(valueFrom, view, key);
            }
            try {
                valueFrom.__vars[key].listeners.push(view);
            } catch (e) {
                console.log('appendListener', arguments, e);
            }

            if (valueFrom.afterAppendListeners) {
                valueFrom.afterAppendListeners(valueFrom, view, key);
            }
            /*Вызываем обновление значения у только-что привязаного элемента*/

            if (view.onChangeValues) {
                view.onChangeValues(key, value);
            }
            setTimeout(function () {
                view.__update(key, valueFrom[key], valueFrom);

                if (view.afterUpdateValues) {
                    view.afterUpdateValues(key, value, valueFrom);
                }
            });

        } catch (e) {
            console.log(arguments);
            throw e;
        }
    }

})();
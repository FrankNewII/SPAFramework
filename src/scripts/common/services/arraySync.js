;(function () {
    "use strict";

    window.common = window.common || {};

    var observe = window.common.observe = window.common.observe = {};

    observe.array = ArrayObserve;

    var forEach = common.functions.array.forEach;

    var typing = common.functions.types;


    function ArrayObserve(updateFn) {
        /*
         * Это класс, который является наблюдателем над массивом.
         * Смысл заключается в том, что-бы сделать прослойку между методами
         * кастомного класса и стандарной реализацией массива.
         *
         * Каждый раз, когда пользователь будет обращаться к стандартным методам, как ему должно будет показаться,
         * Класс будет перекладывать ответственность на стандартный метод, после которого
         * будет вызывать функцию обновления подписчиков(DOM елементов),
         *
         * На данный момент, этот класс будет использоваться только в dataSync.
         * */
        function ArrayModifyChecker(args) {
            this.push.apply(this, args);
        }

        ArrayModifyChecker.prototype = Object.create(Array.prototype);

        ArrayModifyChecker.prototype.constructor = ArrayModifyChecker;


        forEach(['push', 'pop', 'shift', 'unshift', 'slice', 'splice'], function (v) {

            Object.defineProperty(ArrayModifyChecker.prototype, v, {
                enumerable: false,
                value: function () {
                    Array.prototype[v].apply(this, arguments);
                    console.log(this);
                    updateFn(this);
                }
            });
        });


        /*ArrayModifyChecker.prototype.pop = function () {
         Array.prototype.pop.apply(this, arguments);
         console.log(this);
         };

         ArrayModifyChecker.prototype.shift = function () {
         Array.prototype.shift.apply(this, arguments);
         console.log(this);
         };

         ArrayModifyChecker.prototype.unshift = function () {
         Array.prototype.unshift.apply(this, arguments);
         console.log(this);
         };
         ArrayModifyChecker.prototype.slice = function () {
         Array.prototype.slice.apply(this, arguments);
         console.log(this);
         };
         ArrayModifyChecker.prototype.splice = function () {
         Array.prototype.splice.apply(this, arguments);
         console.log(this);
         };*/

        ArrayModifyChecker.prototype.setValue = function (k, v) {
            if (typing.isNumber(k)) {
                for (var i = 0; i < k; i++) {
                    if (!this[i]) {
                        if (i != k) {
                            Array.prototype.splice.apply(this, [k, 1, undefined]);
                        } else {
                            Array.prototype.splice.apply(this, [k, 1, v]);
                        }
                    }
                }

            } else {
                throw new Error('You try to use not number type for array. Current version support only number.');
            }
        };

        return ArrayModifyChecker;
    }


})();
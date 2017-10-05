;(function () {
    "use strict";

    window.common = window.common || {};
    var DI = window.common.DI = window.common.DI || {};
    DI.get = get;
    DI.inject = inject;

    var getModel = window.common.models.get;
    var forEach = common.functions.array.forEach;

    function get(dependencies) {
        var result = [];
        forEach(dependencies, function (dependencyName) {
            if (typeof dependencyName === 'string') {
                var dependency = getModel(dependencyName);

                dependency = inject(dependency);
                result.push(dependency);
            } else {
                result.push(dependencyName);
            }

        });

        return result;
    }

    /**
     * На данный момент я передаю сюда ссылку на елемент и родительский компонент.
     * Это моя ошибка с которой мне надо справится.
     * */
    function inject(instance) {

        var dependencies = get(instance.inject || []);
        dependencies.unshift(null);
        var newExemplar = new (Function.prototype.bind.apply(instance, dependencies));

        Object.defineProperty(newExemplar, '__DONT_WATCH', {
            enumerable: false,
            configurable: false,
            value: true
        });

        return newExemplar;
    }

})();
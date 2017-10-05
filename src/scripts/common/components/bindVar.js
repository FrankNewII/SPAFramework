;(function (common) {
    "use strict";

    common.components.add({
        name: 'BindVar'
    }, BindVar);

    var appendListener = window.common.sync.appendListener;
    var forEach = common.functions.array.forEach;

    BindVar.inject = ['element', 'parentComponent'];

    function getValueByString(path, object) {
        var lastVal = object;
        path = path.split('.');

        forEach(path, function (v) {
            lastVal = lastVal[v];
        });

        return lastVal;
    }

    function BindVar(element, parentCtrl) {
        /*
         * Здесь происходит отложенная инициализация bind-var.
         * Отложенна для уменьшения приоритета инициализации.
         * На данный момент - это решение, но если вдруг появитс ещё дальше оттянуть приоритет -
         * прийдется придумаю, что-то по приоритетам. Чтобы внутрение директивы можно было инициализировать
         * в определённом порядке...
         * */

        var key = element.getAttribute('var-name');
        if (!key) {
            throw new Error('Attribute with binded variable name missed. You miss "var-name" attribute ');
        }
        this.__update = function (k, value) {
            element.setHtml(getValueByString(key, parentCtrl.component));
        };
        appendListener(parentCtrl, this, key.split('.')[0]);

    }
})(common);
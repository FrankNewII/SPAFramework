;(function (common) {
    "use strict";

    common.components.add({name: 'BindImg'}, BindImg);
    var appendListener = window.common.sync.appendListener;
    var forEach = common.functions.array.forEach;

    BindImg.inject = ['element', 'parentComponent'];

    function getValueByString(path, object) {
        var lastVal = object;
        path = path.split('.');

        forEach(path, function (v) {
            lastVal = lastVal[v];
        });

        return lastVal;
    }

    function BindImg(element, parentCtrl) {
        /*
         * Здесь происходит отложенная инициализация bind-var.
         * Отложенна для уменьшения приоритета инициализации.
         * На данный момент - это решение, но если вдруг появитс ещё дальше оттянуть приоритет -
         * прийдется придумаю, что-то по приоритетам. Чтобы внутрение директивы можно было инициализировать
         * в определённом порядке...
         * */

        var data = element.getData();
        if (!data.varName) {
            throw new Error('Attribute with binded variable name missed. You miss "var-name" attribute ');
        }

        this.__update = function () {
            element.setHtml('<img src="' +
                getValueByString(data.varName, parentCtrl.component) + '"' +
                ' width="' + data.width + '" ' +
                ' height="' + data.height + '" ' +
                '/>');
        };

        appendListener(parentCtrl.component, this, data.varName.split('.')[0]);


    }
})(common);
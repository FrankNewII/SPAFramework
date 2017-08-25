;(function (common) {
    "use strict";

    common.components.add('BindVar', BindVar);
    var appendListener = window.common.sync.appendListener;
    var forEach = common.functions.array.forEach;

    BindVar.inject = ['element', 'parentComponent'];

    function BindVar(elem, parent) {
        setTimeout(function () {
            var element = elem();
            var parentCtrl = parent();
            var key = element.getAttribute('var-name');
            if (!key) {
                throw new Error('Attribute with binded variable name missed. You miss "var-name" attribute ');
            }
            this.__update = function (k, value) {
                console.log(value, parentCtrl);
                element.setHtml(getValueByString(key, parentCtrl));
            };
            console.log(this, element, elem, parentCtrl, parent);
            appendListener(parentCtrl, this, key.split('.')[0]);

            function getValueByString(path, object) {
                var lastVal = object;
                path = path.split('.');

                forEach(path, function (v) {
                    lastVal = lastVal[v];
                });

                return lastVal;

            }
        }.bind(this));
    }
})(common);
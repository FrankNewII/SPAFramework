;(function (common) {
    "use strict";

    common.components.add('BindVar', BindVar);
    var appendListener = window.common.sync.appendListener;
    BindVar.inject = ['element', 'parentComponent'];

    function BindVar(elem, parent) {
        var element = elem();
        var parentCtrl = parent();
        var key = element.getAttribute('var-name');
        if (!key) {
            throw new Error('Attribute with binded variable name missed. You miss "var-name" attribute ');
        }
        this.__update = function (value) {
            console.log(value, parentCtrl);
            element.setHtml(value);
        };

        appendListener(parentCtrl, this, key);
    }
})(common);
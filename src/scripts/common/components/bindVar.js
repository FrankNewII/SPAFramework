;(function (common) {
    "use strict";

    common.components.add('BindVar', BindVar);
    var appendListener = window.common.sync.appendListener;
    BindVar.inject = ['element', 'parentComponent'];

    function BindVar(elem, parent) {
        var element = elem();

        var key = element.getAttribute('var-name');
        if (!key) {
            throw new Error('Attribute with binded variable name missed. You miss "var-name" attribute ');
        }
        this.update = (function (element) {
            return function (value) {
                element.setHtml(value.toString());
            }
        })(element);

        appendListener(parent(), this, key);
    }
})(common);
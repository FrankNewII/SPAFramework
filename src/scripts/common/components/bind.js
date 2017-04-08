;(function (common) {
    "use strict";

    common.components.add('BindVar', BindVar);
    var appendListener = window.common.sync.appendListener;
    BindVar.inject = ['element', 'parentComponent'];

    function BindVar(elem, parent) {
        console.log(arguments);
        var key = elem().getAttribute('var-name');
        if (!key) {
            throw new Error('Attribute with binded variable name missed. You miss "var-name" attribute ');
        }
        appendListener(parent(), this, key);
        this.update = (function (elem) {
            return function (value) {
                elem.setHtml(value);
            }
        })(elem);
    }
})(common);
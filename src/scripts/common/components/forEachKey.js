;(function (common) {
    "use strict";

    common.components.add('ForEachKey', ForEachKey);
    var appendListener = window.common.sync.appendListener;
    ForEachKey.inject = ['element', 'parentComponent'];

    function ForEachKey(elem, parent) {

        var element = elem();
        var parentComponent = parent();
        var key = element.getAttribute('key-name');
        var index = element.getAttribute('for-each-index');
        this[key] = parentComponent[index];

        this.__update = function (k, value) {
            this[key] = value;
        };

        appendListener(parentComponent, this, index);
    }
})(common);
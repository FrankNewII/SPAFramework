;(function (common) {
    "use strict";

    common.components.add({name: 'ForEachKey'}, ForEachKey);
    var appendListener = window.common.sync.appendListener;
    var appendWatchers = common.sync.setWatcher;

    ForEachKey.inject = ['element', 'parentComponent'];

    function ForEachKey(elem, parent) {

        var element = elem;
        var parentComponent = parent.component;
        var key = element.getAttribute('key-name');
        var index = element.getAttribute('for-each-index');
        this[key] = parentComponent[index];

        this.__update = function (k, value) {
            this[key] = value;
        };
        appendWatchers(this);
        appendListener(parentComponent, this, index);
    }
})(common);
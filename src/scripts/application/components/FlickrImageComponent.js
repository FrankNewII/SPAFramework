;(function (common) {
    "use strict";

    common.components.add('FlickrImageComponent', FlickrImageComponent);
    var appendListener = window.common.sync.appendListener;
    var forEach = common.functions.array.forEach;
    var appendWatchers = common.sync.setWatcher;

    FlickrImageComponent.inject = ['element', 'parentComponent'];

    function FlickrImageComponent(elem, parent) {

        var element = elem();
        var parentCtrl = parent();
        var data = element.getData();
        var lastVal;

        if (!data.varName) {
            throw new Error('Attribute with binded variable name missed. You miss "var-name" attribute ');
        }
        this.src = "";
        element.setHtml('');
        this.__update = function (k, value) {
            this.src = '//c1.staticflickr.com/' + value.farm + '/' + value.server + '/' + value.id + '_' + value.secret + '_m.jpg' + '"';
            element.setHtml('<bind-img data-var-name="src" data-width="100px"  height="200px" />');
        };
        appendWatchers(this);
        appendListener(parentCtrl, this, data.varName.split('.')[0]);

    }
})(common);
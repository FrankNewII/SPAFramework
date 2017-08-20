;(function () {
    "use strict";
    window.common = window.common || {};
    var templates = window.common.templates = window.common.templates || {};

    /*
     * Template store - this is template loader which will use to load templates of component
     * loadedTemplates - this is cached templates (HTMLElements), with key like url and all time then i will try to load some
     * resource i will check his in loadedTemplates object.
     * If template was loaded before - so return HTMLElement
     * else - load html string? convert this to HTMLElement, and set in cache
     * */

    var loadedTemplates = {};

    /*namespaces*/

    var loadTemplate = common.xhr.get;
    templates.add = add;
    templates.get = get;

    function get(url, cb) {
        if (!loadedTemplates[name]) {
            loadTemplate(url, {}, add.bind(null, url, cb), reject)
        }

        cb(loadedTemplates[name]);
    }

    function add(url, cb, data) {
        var tmp = document.createElement('div');

        tmp.innerHTML = data;

        cb(loadedTemplates[name] = tmp.childNodes);
    }

    function reject() {
        throw new Error('Template is not loaded, fuck your self.');
    }
})();
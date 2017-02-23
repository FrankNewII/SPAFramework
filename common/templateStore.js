;(function (window) {
  "use strict";
  window.common = window.common || {};
  var templates = window.common.templates = window.common.templates || {};
  var loadedTemplates = {};

  /*namespaces*/

  var loadTemplate = common.xhr.get;
  templates.add = add;
  templates.get = get;

  function get(url, cb) {
    if(!loadedTemplates[name]) {
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
})(window)
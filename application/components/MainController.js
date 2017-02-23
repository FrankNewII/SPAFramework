;(function (common) {
  "use strict";

  common.components.add('MainController', MainController);

  var flickr = common.models.get('flickr')();

  function MainController(elem) {
    this.element = common.element.select.one(elem);
  }

  MainController.prototype.flickSearch = function (v, cb) {
    flickr.search(v, this.showSearched.bind(this, cb));
  };

  MainController.prototype.showSearched = function (cb, params) {
    cb(params);
  };

  MainController.prototype.chooseImage = function (params, cb) {
    cb(params);
  };
})(common);
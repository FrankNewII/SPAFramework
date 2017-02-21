(function (common) {
  "use strict";

  common.components.add('MainController', MainController);


  function MainController(elem) {
    this.element = common.element.select.one(elem);
    this.flickModel = common.models.get('flickr')();
  }

  MainController.prototype.flickSearch = function (v, cb) {
    this.flickModel.search(v, this.showSearched.bind(this, cb));
  };

  MainController.prototype.showSearched = function (cb, params) {
    cb(params);
  };

  MainController.prototype.chooseImage = function (params, cb) {
    cb(params);
  };
})(common);
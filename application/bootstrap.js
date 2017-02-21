(function (common) {
  "use strict";

  var main = common.components.get('MainController', '#mainController');
  common.components.get('SearchComponent', '#searchComponent', main);
  common.components.get('FlickrResultComponent', '#flickrResultComponent', main);
})(common);
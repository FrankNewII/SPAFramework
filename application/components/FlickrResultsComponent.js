;(function (common) {
  "use strict";

  common.components.add('FlickrResultComponent', FlickrResultComponent);

  function FlickrResultComponent(elem, parentComponent) {
    this.element = common.element.select.one(elem);
    this.parent = parentComponent;
    this.element.addListener('click', this.addToChoosed.bind(this));
    this.pictures = [];
  }

  FlickrResultComponent.prototype.addToChoosed = function (e) {
    var picturesPosition = this.photos.indexOf(e.target);
    var target = e.target;

    if(~picturesPosition) {
      this.parent.choose(target.getAttribute('src'), this.deletePhotoFromViewedInResults.bind(this));
    }
  }

  FlickrResultComponent.prototype.deletePhotoFromViewedInResults = function () {}

  FlickrResultComponent.prototype.show = function (photos) {
    var result = document.createDocumentFragment();
    this.pictures = [];
    var img;

    for (var photo in photos) {
      img = new Image;
      img.src = "https://c1.staticflickr.com/1/"+photo.server+"/"+photo.id+"_"+ photo.secret+"_n.jpg";
      result.appendChild(img);
      this.pictures.push(img);
    }

    this.element.innerHTML = result.innerHTML;
  }
})(common);
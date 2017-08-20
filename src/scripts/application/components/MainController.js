;(function (common) {
    "use strict";

    common.components.add('MainController', MainController);

    var flickr = common.models.get('flickr')();
    var events = common.events;

    MainController.inject = ['element'];
    function MainController(elem) {
        this.element = elem();
        this.test = 23;

        this.testForeach = Array(232, 4, 353, 5, 3, 43);
        var i = 0;

        var self = this;
        for (var b = 0; b < this.testForeach; b++) {
            this.testForeach[b] = b;
        }

        this.photos = undefined;

        events.on('sell', this, function (photos) {
            console.log(this, photos, this.photos);

            this.photos = photos;
        }.bind(this));

        this.element.addListener('click', this.randomize.bind(this));

    }

    MainController.prototype.flickSearch = function (v, cb) {
        flickr.search(v, cb);
    };

    MainController.prototype.chooseImage = function (params, cb) {
        cb(params);
    };

    MainController.prototype.randomize = function () {
        var nArr = [];
        for (var i in this.testForeach) {
            nArr.push(Math.ceil(Math.random() * 100));
        }

        this.testForeach = nArr;
    };
})(common);
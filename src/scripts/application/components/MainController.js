;(function (common) {
    "use strict";

    common.components.add('MainController', MainController);

    var flickr = common.models.get('flickr')();
    var events = common.events;

    function MainController(elem) {
        this.element = common.element.select.one(elem);
        this.test = 23;

        this.testForeach = Array(232, 4, 353, 5, 3, 43, 4, 5, 34, 5, 34, 6, 346, 3, 46, 5, 4, 56, 4, 57, 45, 6, 34, 53, 4, 45, 6, 34, 53, 45, 34, 7, 3, 55, 34, 3
            , 74);
        var i = 0;

        var self = this;
        for (var b = 0; b < this.testForeach; b++) {
            this.testForeach[b] = b;
        }

        events.on('sell', this, function () {
            console.log(arguments);
        });
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
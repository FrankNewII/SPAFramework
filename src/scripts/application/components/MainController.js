;(function (common) {
    "use strict";

    common.components.add('MainController', MainController);

    var flickr = common.models.get('flickr')();
    var events = common.events;

    function MainController(elem) {
        this.element = common.element.select.one(elem);
        this.test = 23;

        this.testForeach = {a: 1, b: 2, c: 3};
        events.on('sell', this, function () {
            console.log(arguments);
        });
    }

    MainController.prototype.flickSearch = function (v, cb) {
        flickr.search(v, this.showSearched.bind(this, cb));
    };

    MainController.prototype.showSearched = function (cb, params) {
        console.log('huylo');
        cb(params);
    };

    MainController.prototype.chooseImage = function (params, cb) {
        cb(params);
    };
})(common);
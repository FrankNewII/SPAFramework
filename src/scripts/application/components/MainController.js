;(function (common) {
    "use strict";

    common.components.add('AppComponent', AppComponent);

    var events = common.events;
    var currIndex = 0;
    AppComponent.inject = ['element', 'flickr'];
    function AppComponent(elem, flickr) {
        this.flickrService = flickr();
        this.element = elem();
        this.test = 23;

        this.testForeach = Array(232, 4, 353, 5, 3, 43);
        var i = 0;

        var self = this;

        this.photos = undefined;
        // Test EventListener.
        events.on('SearchComponent::flickrRespond', this, function (photos) {
            this.photos = photos;
        }.bind(this));

        // autoupdate view test
        this.element.addListener('click', this.randomize.bind(this));

    }

    AppComponent.prototype.flickSearch = function (v, cb) {
        //cb('{"photos": {"photo": [{"src": "/sdsd/sd.s","w": ' + currIndex++ + '},{"src": "/sdsd/sd.s","w": 13},{"src": "/sdsd/sd.s","w": 14}]}}');
        this.flickrService.search(v, cb);
    };

    AppComponent.prototype.chooseImage = function (params, cb) {
        cb(params);
    };

    AppComponent.prototype.randomize = function () {
        // autoupdate view test
        var nArr = [];
        for (var i in this.testForeach) {
            nArr.push(Math.ceil(Math.random() * 100));
        }

        this.testForeach = nArr;
    };
})(common);
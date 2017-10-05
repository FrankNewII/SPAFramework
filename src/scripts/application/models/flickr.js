;(function (common) {
    "use strict";

    common.models.add({
        name: 'flickr',
        instance: Flickr,
        type: 'singleton'
    });

    var getRequest = common.xhr.get;

    Flickr.inject = [{
        method: 'flickr.photos.search',
        name: 'value',
        api_key: 'b54580f369a7eeebecb2004dc429d08f',
        tags: null,
        format: 'json',
        per_page: 5,
        nojsoncallback: 1
    }];

    function Flickr(params) {
        this._params = params;
    }

    Flickr.prototype.search = function search(v, cb) {
        this._params.tags = v;
        getRequest('https://api.flickr.com/services/rest/', this._params, cb);
    }

})(common);
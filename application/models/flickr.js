(function (common) {
  "use strict";

  common.models.add('flickr', flickr);

  var getRequest = common.xhr.get;
  var url = 'https://api.flickr.com/services/rest/';
  var methods = {
    search: search
  };

  function search(v, cb) {
    getRequest(url, {
      method: 'flickr.photos.search',
      name: 'value',
      api_key: 'b54580f369a7eeebecb2004dc429d08f',
      tags: v,
      format:'json',
      nojsoncallback: 1
    }, cb);
  }

  function flickr() {
    return methods;
  }

})(common);
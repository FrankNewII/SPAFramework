;(function (common) {
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
            format: 'json',
            nojsoncallback: 1
        }, cb);
    }

    function flickr() {
        return methods;
    }

})(common);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZsaWNrci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYXBwbGljYXRpb24ubW9kZWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiOyhmdW5jdGlvbiAoY29tbW9uKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBjb21tb24ubW9kZWxzLmFkZCgnZmxpY2tyJywgZmxpY2tyKTtcblxuICAgIHZhciBnZXRSZXF1ZXN0ID0gY29tbW9uLnhoci5nZXQ7XG4gICAgdmFyIHVybCA9ICdodHRwczovL2FwaS5mbGlja3IuY29tL3NlcnZpY2VzL3Jlc3QvJztcbiAgICB2YXIgbWV0aG9kcyA9IHtcbiAgICAgICAgc2VhcmNoOiBzZWFyY2hcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2VhcmNoKHYsIGNiKSB7XG4gICAgICAgIGdldFJlcXVlc3QodXJsLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdmbGlja3IucGhvdG9zLnNlYXJjaCcsXG4gICAgICAgICAgICBuYW1lOiAndmFsdWUnLFxuICAgICAgICAgICAgYXBpX2tleTogJ2I1NDU4MGYzNjlhN2VlZWJlY2IyMDA0ZGM0MjlkMDhmJyxcbiAgICAgICAgICAgIHRhZ3M6IHYsXG4gICAgICAgICAgICBmb3JtYXQ6ICdqc29uJyxcbiAgICAgICAgICAgIG5vanNvbmNhbGxiYWNrOiAxXG4gICAgICAgIH0sIGNiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmbGlja3IoKSB7XG4gICAgICAgIHJldHVybiBtZXRob2RzO1xuICAgIH1cblxufSkoY29tbW9uKTsiXX0=

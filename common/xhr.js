;(function (window) {
  "use strict";
  window.common = window.common || {};
  var xhr = window.common.xhr = window.common.xhr || {};

  xhr.get = get;

  function get(url, data, resolve, reject) {

    var xhr = new XMLHttpRequest();
    var requestBody = "?";

    for (var k in data) {
      requestBody += k + "=" + encodeURIComponent(data[k]) + "&";
    }

    requestBody = requestBody.substr(0, requestBody.length - 1);

    xhr.open('GET', url+requestBody, true);

    xhr.onreadystatechange = function (e) {
      if(e.currentTarget.status == 200) {
        e.currentTarget.readyState == 4 && resolve !== undefined && resolve(e.currentTarget.response);
      } else {
        e.currentTarget.readyState == 4 && reject !== undefined && reject(e.currentTarget.response);
      }
    };

    xhr.send();
  }
})(window)
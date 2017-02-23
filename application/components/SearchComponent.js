;(function (common) {
  "use strict";

  common.components.add('SearchComponent', SearchComponent);
  /*namespaces*/
  var events = common.events;

  var template = common.templates.get('application/templates/galleryPicture.html', function (d) {
    template = d;
  });
  function SearchComponent(elem, parentComponent) {
    this.element = common.element.select.one(elem);
    this.parent = parentComponent;
    events.on('huy', this, function () {
      console.log(arguments);
    });
    this.element.addListener('click', this.search.bind(this));
  }

  SearchComponent.prototype.search = function (e) {
    if(e.target.getAttribute('role') === 'button') {
      var query = this.element.searchIn('[role=query]').getValue();
      events.emit('huy', this, {value: 1111});
      this.parent.flickSearch(query, function () {
        
      });
    }
  }
})(common);
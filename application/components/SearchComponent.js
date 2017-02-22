;(function (common) {
  "use strict";

  common.components.add('SearchComponent', SearchComponent);

  function SearchComponent(elem, parentComponent) {
    this.element = common.element.select.one(elem);
    this.parent = parentComponent;
    this.element.addListener('click', this.search.bind(this));
  }

  SearchComponent.prototype.search = function (e) {
    if(e.target.getAttribute('role') === 'searchButton') {
      var query = this.element.searchIn('[role=searchQuery]').getValue();
      this.parent.flickSearch(query, console.log);
    }
  }
})(common);
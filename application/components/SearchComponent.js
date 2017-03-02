(function (common) {
  "use strict";

  common.components.add('SearchComponent', SearchComponent);
  SearchComponent.inject = ['element', 'parent'];
  function SearchComponent(element, parent) {
    this.element = elem;
    this.element.addListener('click', this.search.bind(this));
  }

  SearchComponent.prototype.search = function (e) {
    if (e.target.getAttribute('role') === 'button') {
      var query = this.element.searchIn('[role=query]').getValue();
      this.parent.flickSearch(query, console.log);
    }
  }

})(common);
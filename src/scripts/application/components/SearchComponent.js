(function (common) {
    "use strict";

    common.components.add('SearchComponent', SearchComponent);

    SearchComponent.inject = ['element', 'parentComponent'];

    var events = common.events;

    function SearchComponent(element, parent) {
        console.log(arguments);
        this.element = element();
        this.parent = parent();
        this.element.addListener('click', this.search.bind(this));
    }

    SearchComponent.prototype.search = function (e) {

        if (e.target.getAttribute('role') === 'button') {
            var query = this.element.searchIn('[role=query]').getValue();
            this.parent.flickSearch(query, console.log);
        }
        events.emit('sell', this);
    }

})(common);
(function (common) {
    "use strict";

    common.components.add({name: 'SearchComponent'}, SearchComponent);

    SearchComponent.inject = ['element', 'parentComponent'];

    var events = common.events;

    function SearchComponent(element, parent) {
        this.element = element;
        this.parent = parent;
        this.element.addListener('click', this.search.bind(this));
        this.element.addListener('keyup', this.change.bind(this));
    }

    SearchComponent.prototype.search = function (e) {

        if (e.target.getAttribute('role') === 'button') {
            var query = this.element.searchIn('[type=text]').getValue();
            this.parent.component.flickSearch(query, function (res) {

                var response = JSON.parse(res);

                // Test EventEmitter
                events.emit('SearchComponent::flickrRespond', this, response.photos.photo);
            }.bind(this));
        }
    }

    SearchComponent.prototype.change = function (e) {
        this.parent.component.test = this.element.searchIn('[type=text]').getValue();
    }

})(common);
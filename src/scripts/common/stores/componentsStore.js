;(function (window) {
    "use strict";

    window.common = window.common || {};
    var components = window.common.components = window.common.components || {};
    /*
     * Component store - most important class, Factory of component, which will return
     * example of component class with additional functions
     * */
    var availableComponents = {};
    components.add = add;
    components.get = get;

    var DI = common.DI.get;
    function get(name, element, parentComponent) {
        name = name.replace(/[A-Z]/g, function (v, i) {
            return i ? '-' + v.toLowerCase() : v.toLowerCase();
        });

        var component = new availableComponents[name](element, parentComponent);

        addChildrensToParent(component, parentComponent);

        if (!availableComponents[name]) {
            throw new Error("Component is not available:" + name);
        }

        return component;
    }

    function add(name, fn) {

        name = name.replace(/[A-Z]/g, function (v, i) {
            return i ? '-' + v.toLowerCase() : v.toLowerCase();
        });

        if (availableComponents[name]) {
            console.warn("You try to reset component with name: " + name);
            return;
        }

        /*TODO: Set polyfill*/
        document.registerElement(name, {
            prototype: Object.create(HTMLDivElement.prototype, {
                attachedCallback: {
                    value: function () {

                        var parent = this.parentNode;
                        var isParentFound = false;
                        var dependencies = availableComponents[name].inject ? DI.apply(null, availableComponents[name].inject) : [];
                        while (parent) {
                            if (parent.nodeName.toLowerCase() in availableComponents) {
                                isParentFound = true;
                                break;
                            } else {
                                parent = parent.parentNode;
                            }
                        }

                        var component = {};
                        component.element = common.element.select.one(this);
                        component.parent = isParentFound ? parent._component : undefined;

                        component = new (Function.prototype.bind.apply(availableComponents[name], dependencies));
                        Object.defineProperty(this, '_component', {
                            enumerable: false,
                            value: component
                        });

                        addChildrensToParent(component, isParentFound ? parent._component : undefined);
                    }
                }
            })
        });

        availableComponents[name] = fn;
    }

    function addChildrensToParent(object, parent) {
        Object.defineProperty(object, '_childrens', {
            enumerable: false,
            value: []
        });

        if (parent) parent._childrens.push(object);
    }

})(window)
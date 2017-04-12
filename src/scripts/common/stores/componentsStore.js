;(function () {
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
    var appendWatchers = common.sync.setWatcher;

    function get(name, element, parentComponent) {
        name = name.replace(/[A-Z]/g, function (v, i) {
            return i ? '-' + v.toLowerCase() : v.toLowerCase();
        });

        if (!availableComponents[name]) {
            throw new Error("Component is not available:" + name);
        }

        return availableComponents[name];
    }

    function add(name, fn) {

        name = name.replace(/[A-Z]/g, function (v, i) {
            return i ? '-' + v.toLowerCase() : v.toLowerCase();
        });

        if (availableComponents[name]) {
            console.warn("You try to reset component with name: " + name);
            return;
        }
        console.log(name);
        /*TODO: Set polyfill*/
        document.registerElement(name, {
            prototype: Object.create(HTMLDivElement.prototype, {
                attachedCallback: {
                    value: function () {

                        var parent = this.parentNode;
                        var isParentFound = false;
                        var dependencies;
                        var component;
                        while (parent) {
                            if (parent.nodeName.toLowerCase() in availableComponents) {
                                isParentFound = true;
                                break;
                            } else {
                                parent = parent.parentNode;
                            }
                        }

                        dependencies = availableComponents[name].inject ? DI.call(null, availableComponents[name].inject, this, isParentFound ? parent._component : undefined) : [];
                        dependencies.unshift(null);

                        component = new (Function.prototype.bind.apply(availableComponents[name], dependencies));

                        Object.defineProperty(this, '_component', {
                            enumerable: false,
                            value: component
                        });

                        buildChildrensChain(component, isParentFound ? parent._component : undefined);
                        appendWatchers(component);

                        console.log(component);
                    }
                }
            })
        });

        availableComponents[name] = fn;
    }

    function buildChildrensChain(object, parent) {
        Object.defineProperty(object, '_childrens', {
            enumerable: false,
            value: []
        });

        if (parent) {
            Object.defineProperty(object, '_parent', {
                enumerable: false,
                value: parent
            });
        }


        if (parent) parent._childrens.push(object);
    }

})();
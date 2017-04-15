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

    function get(name) {
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

        /*
         * Это механизм по добавлению к элементам конструкторов компонентов
         * На регистрации элемента - вызываем конструктор компонента, с описаными зависимостями в инжекторе
         *
         * Ну и добавляем связь родительских компонентов и вложеных.
         * На данный момент - я использую эту связь для работы с событиями, по этой цепочке я ганяю события.
         * Но в принципе, возможен вариант, что я начну использовать эту цепочку для передачи параметров между
         * компонентами...
         *
         * Но я пока сомневаюсь в этой идее... Мне не нравится, что часть связи я отправлю к htmlБ а другую к коду JS
         * Надо подумать о варианте с работой исключительно JS...
         *
         * Может это лучшая идея, чем дают современные подходы... Как вариан - можно вообще всё завязать на событиях
         * с одного компонента на другие...
         *
         * Например - работать только с событиями... Такое-себе реактивное программирование...
         * */
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

                        if (component.onInit) {
                            component.onInit();
                        }

                        Object.defineProperty(this, '_component', {
                            enumerable: false,
                            value: component
                        });

                        buildChildrensChain(component, isParentFound ? parent._component : undefined);
                        appendWatchers(component);
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
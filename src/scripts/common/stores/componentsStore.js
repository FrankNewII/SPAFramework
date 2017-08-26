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

        /*TODO: Set polyfill*/

        /*
         * Это механизм по добавлению к элементам конструкторов компонентов
         * На регистрации элемента - вызываем конструктор компонента, с описаными зависимостями в инжекторе
         *
         * Ну и добавляем связь родительских компонентов и вложеных.
         * На данный момент - я использую эту связь для работы с событиями, по этой цепочке я гоняю события.
         * Но в принципе, возможен вариант, что я начну использовать эту цепочку для передачи параметров между
         * компонентами...
         *
         * Но я пока сомневаюсь в этой идее... Мне не нравится, что часть связи я отправлю к htmlБ, а другую к коду JS
         * Надо подумать о варианте с работой исключительно JS...
         *
         * Может это лучшая идея, чем дают современные подходы... Как вариант - можно вообще всё завязать на событиях
         * с одного компонента на другие...
         *
         * Есть ещё одна идея. Сделать следующий интерфейс у всех компонентов:
         * this.getParentDataComponent('main-component'); //Но вообще, я бы предпочел избегать такой связи.
         * У нас ведь есть связь родителя с детьми просто из html. Кажется, что не стоит делать ещё одну связку.
         * this.getChildrens(deep) -> [childComponent, childComponent, childComponent]
         * Я понимаю, что подобное решение приведёт к более тугой завязаности компонентов, так как теперь. мои дети будут
         * зависить от значения у родителя. Но я однако добавлю это в список вариантов.
         *
         * Ещё, мы получаем ещё один канал связи, помимо событий. Хотя... Чем принциписально это будет отличаться от событий???
         * - Тем что мы запрашиваемы данные, а не ждём их. Также у нас появляется возможность манипулировать детьми. Мы можем вызывать разные их методы.
         * Механизм будет похож на ViewChildren в angular2.
         *
         *
         * */
        console.log(HTMLDivElement.prototype);
        document.registerElement(name, {
            prototype: Object.create(HTMLDivElement.prototype, {
                attachedCallback: {
                    value: function () {
                        var elm = this;

                        var parent = elm.parentNode;
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

                        dependencies = availableComponents[name].inject ? DI.call(null, availableComponents[name].inject, elm, isParentFound ? parent._component : undefined) : [];
                        dependencies.unshift(null);

                        component = new (Function.prototype.bind.apply(availableComponents[name], dependencies));

                        //lifecycle hook as in Angular2
                        if (component.onInit) {
                            component.onInit();
                        }

                        Object.defineProperty(elm, '_component', {
                            enumerable: false,
                            value: component,
                            writable: true
                        });

                        Object.defineProperty(component, '_view', {
                            enumerable: false,
                            value: elm
                        });
                        //lifecycle hook as in Angular2
                        if (component.beforeAppendChild) {
                            component.beforeAppendChild();
                        }

                        buildChildrensChain(component, isParentFound ? parent._component : undefined);
                        if (component.afterAppendChild) {
                            component.afterAppendChild();
                        }

                        if (component.beforeAppendWatchers) {
                            component.beforeAppendWatchers();
                        }

                        appendWatchers(component);

                        if (component.afterAppendWatchers) {
                            component.afterAppendWatchers();
                        }


                    }
                },
                detachedCallback: function () {
                    /*
                     * Планируется использовать это каллбек на удалении тега из документа,
                     * Чтобы чистить прослушки в родителе этого элемента.
                     * Реализация. Было несколько вариантов, но не готово...
                     * */
                    console.log(this._component);
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
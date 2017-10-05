;(function () {
    "use strict";

    common.models.add({
        name: 'parentComponent',
        instance: ParentComponent,
        type: 'factory'
    });



    /*
     * Почему так - все просто, на данный момент мой контроллер на елементе не знает об елементе(DOM),
     * я вынужден вызывать эту зависимость в момент инициализации контроллера
     * на компоненте (место, где мне пока известен элемент)
     * и для того, чтобы конечному пользователю все зависимости использовать одинаково
     * - я вынужден принять такое решение
     * */
    function ParentComponent(element, parentComponent) {
        this.component = parentComponent;
        this.element = element;
    }

})();
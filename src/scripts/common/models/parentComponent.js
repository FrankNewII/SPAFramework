;(function () {
    "use strict";

    common.models.add('parentComponent', parent);



    /*
     * Почему так - все просто, на данный момент мой контроллер на елементе не знает об елементе(DOM),
     * я вынужден вызывать эту зависимость в момент инициализации контроллера
     * на компоненте (место, где мне пока известен элемент)
     * и для того, чтобы конечному пользователю все зависимости использовать одинаково
     * - я вынужден принять такое решение
     * */
    function parent(element, parentComponent) {
        return function () {
            return parentComponent;
        };
    }

})();
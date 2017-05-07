;(function (common) {
    "use strict";

    common.components.add('ForEach', ForEach);
    var appendListener = window.common.sync.appendListener;
    var appendWatchers = common.sync.setWatcher;
    var forEach = common.functions.array.forEach;
    var isArray = window.common.functions.types.isArray;

    ForEach.inject = ['element', 'parentComponent'];
    /*
     * Надо сделать обновление хтмл при изменении родительского значения
     *
     * Я думаю, что стоит перенести просмотраиваемые значения в какую-нибудь переменную
     *
     * Также стоит не забыть об удалени переменной при удалении элементов, чтобы не засорять оперативку ненужными
     * прослушками.
     *
     * */

    function ForEach(elem, parent) {
        var element = elem();
        var parentComponent = parent();
        var key = element.getAttribute('key-name');
        var parentVar = element.getAttribute('var-in');

        var html = element.getHtml();
        var newHtml = "";
        var listenKeys = [];
        var isReady = false;
        if (!isArray(parentComponent[parentVar])) {
            throw new Error('For-each works only with array.');
        }

        appendWatchers(parentComponent[parentVar]);

        this.__update = function (v, k) {
            if (isReady) {
                var self = this;
                var newHtml = "";
                listenKeys.forEach(function (val, key) {
                    delete self[key];
                });

                forEach(parentComponent[parentVar], (function (v, k) {
                    this[k] = parentComponent[parentVar][k];
                    listenKeys.push(k);
                    newHtml += '<for-each-key key-name="' + key + '" for-each-index="' + k + '">' + html + '</for-each-key>';
                }).bind(this));

                element.setHtml(newHtml);
            }
        };

        forEach(parentComponent[parentVar], (function (v, k) {
            this[k] = parentComponent[parentVar][k];
            listenKeys.push(k);
            newHtml += '<for-each-key key-name="' + key + '" for-each-index="' + k + '">' + html + '</for-each-key>';
            appendListener(parentComponent[parentVar], this, k);
        }).bind(this));

        isReady = !isReady;
        /*
         * Я делаю временное удаление хтмл, так как на момент попытки привязать значение к
         * переменной цикла - у меня нет родительского готового элемента (этого контекста,
         * он на моменте инитиализации)
         *
         * Я был вынужден отложить инициализацию компонента for-each-key
         * путем немедленного таймаута
         * */


        /*
         * Todo: надо сделать переписовку компонента при изменении массива родителя.
         * Вопрос, как это сделать?
         * */
        /*element.setHtml('');

        setTimeout((function () {
            element.setHtml(newHtml);
         }).bind(this));*/
    }
})(common);
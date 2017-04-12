;(function (common) {
    "use strict";

    common.components.add('ForEach', ForEach);
    var appendListener = window.common.sync.appendListener;
    ForEach.inject = ['element', 'parentComponent'];

    function ForEach(elem, parent) {
        var element = elem();
        var parentComponent = parent();
        var key = element.getAttribute('key-name');
        var parentVar = element.getAttribute('var-in');

        var html = element.getHtml();
        var newHtml = "";

        for (var k in parentComponent[parentVar]) {
            this[k] = parentComponent[parentVar][k];

            newHtml += '<for-each-key key-name="' + key + '" for-each-index="' + k + '">' + html + '</for-each-key>';
        }

        /*
         * Я делаю временное удаление хтмл, так как на момент попытки привязать значение к
         * переменной цикла - у меня нет родительского готового элемента (этого контекста,
         * он на моменте инитиализации)
         *
         * Я был вынужден отложить инициализацию компонента for-each-key
         * путем немедленного таймаута
         * */
        element.setHtml('');

        setTimeout((function () {
            element.setHtml(newHtml);
        }).bind(this), 0);


    }
})(common);
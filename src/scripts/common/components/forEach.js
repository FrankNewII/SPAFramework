;(function () {
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
     * TODO:
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
        /*
         *
         * На данный момент здесь идет на данный момент прямое связывание имени своства с его
         * значением в родителе. Но в будущем, надо добавить возможность идти в глубину, как это сделано
         * в bindVar
         * Ех:
         * <for-each var-in="path.inside.parent">
         *
         * */
        var self = this;
        if (!isArray(parentComponent[parentVar]) && parentComponent[parentVar] !== undefined) {
            throw new Error('For-each works only with array.');
        }

        // appendWatchers(parentComponent[parentVar]);

        this.__update = function () {
            if (isReady) {
                var newHtml = "";
                forEach(listenKeys, function (val, key) {
                    delete self[key];
                });

                if (parentComponent[parentVar] !== undefined) {
                    forEach(parentComponent[parentVar], function (v, k) {
                        self[k] = parentComponent[parentVar][k];
                        listenKeys.push(k);
                        newHtml += '<for-each-key key-name="' + key + '" for-each-index="' + k + '">' + html + '</for-each-key>';
                    });

                    /*
                     * Я перевызываю установку ватчеров в данном месте, так как иногда бывает, что массив в компоненте родителя
                     * изначально равен undefined
                     * Потом происходит переприсвоение этого свойства и появлятся значения у которых будут свои
                     * прослушки из детских компонентов.
                     * В принципе, возможно разумно в этом-же месте вызывать и чистку предварительно установленых прослушек, так как по идее
                     * При переписовке елементов в этом компоненте, на данный момент не происходит переустановки прослушек, а добавляются новые
                     * */
                    console.log(this);
                    appendWatchers(this);
                }
                element.setHtml(newHtml);
            }
        };
        if (parentComponent[parentVar] !== undefined) {
            forEach(parentComponent[parentVar], function (v, k) {
                self[k] = parentComponent[parentVar][k];
                listenKeys.push(k);
                newHtml += '<for-each-key key-name="' + key + '" for-each-index="' + k + '">' + html + '</for-each-key>';
                // appendListener(parentComponent[parentVar], self, k);
            });
        }

        appendListener(parentComponent, this, parentVar);
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
        element.setHtml('');

        setTimeout(function () {
            if (parentComponent[parentVar] !== undefined) {
                element.setHtml(newHtml);
            }
        });
    }
})();
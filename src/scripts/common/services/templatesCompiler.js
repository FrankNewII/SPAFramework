;(function () {
    "use strict";

    window.common = window.common || {};
    var templateCompiler = window.common.templateCompiler = window.common.templateCompiler || {};
    templateCompiler.compile = compile;

    var compiledElement = [];

    function compile(template, variables) {

        if (!template instanceof HTMLElement) {
            throw new Error(template + ' is not element');
        }

        //TODO: как правильно ходить по дереву в поисках заветных переменных, которые надо туда вставить??? Как лучше это сохранять?
        //TODO: Надо ли вообще эта муть? Или может лучше запускать компиляцию в момент добавления нового компонента, а там строить связи элементов и значений?
        //TODO: Или лучше запускать эту муть в момент смены значения в объекте variables?
        //TODO: Как сделать вынимание данных с DOM или вообще не надо этого?

        return template;
    }

})();
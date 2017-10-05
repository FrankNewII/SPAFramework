;(function () {
    "use strict";

    var SelectOne = common.element.select.one;

    common.models.add({
        name: 'element',
        instance: SelectOne,
        type: 'factory'
    });

})();
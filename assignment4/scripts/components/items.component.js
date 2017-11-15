(function () {
    'use strict';

    angular.module('MenuApp')
        .component('itemsList', {
            templateUrl: 'views/items.template.html',
            bindings: {
                items: '<'
            }
    });

})();
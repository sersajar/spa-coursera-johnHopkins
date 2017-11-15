(function () {
    'use strict';

    angular.module('MenuApp')
        .component('categoriesList', {
            templateUrl: 'views/categories.template.html',
            bindings: {
                items: '<'
            }
        });

})();
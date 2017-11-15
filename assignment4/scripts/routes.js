(function () {
    'use strict';

    angular.module('MenuApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {

        // Redirect to home page if no other URL matches
        $urlRouterProvider.otherwise('/');

        // *** Set up UI states ***
        $stateProvider

        // Home page
            .state('home', {
                url: '/',
                templateUrl: 'views/home.template.html'
            })

            .state('categories', {
                url: '/categories',
                templateUrl: 'views/categories.template.html',
                controller: 'CategoriesController as categories',
                resolve: {
                    items: ['MenuDataService', function (MenuDataService) {
                        return menuDataService.getAllCategories();
                    }]
                }
            })

            .state('items', {
                url: '/items/{itemname}',
                templateUrl: 'views/items.template.html',
                controller: 'ItemsController as items',
                resolve: {
                    item: ['$stateParams', 'MenuDataService',
                        function ($stateParams, MenuDataService) {
                            return MenuService.getItemsForCategory($stateParams.itemname);
                        }]
                }
            });
    }

})();
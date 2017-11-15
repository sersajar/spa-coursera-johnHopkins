(function () {
    'use strict';

    angular.module('MenuApp')
        .service('MenuDataService', MenuDataService)
        .constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');
    
    MenuDataService.$inject = ['$http', 'ApiBasePath'];
    function MenuDataService($http, ApiBasePath) {
        var menuDataService = this;
        
        menuDataService.getAllCategories = function() {
            return $http({
                methd: "GET",
                url: (ApiBasePath + "/categories.json")
            }).then(function(response) {
                // console.log('response: ' + response);
                // console.log('response: ' + response.data);
                var items = response.data;
                console.log('items in getAllCategories: ' + items.length);
                return items;
            }).catch(function(error) {
                console.log('Something went terribly wrong.');
            });
        };
        
        menuDataService.getItemsForCategory = function(categoryShortName) {
            return $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json?category=,"),
                params: {
                    category: categoryShortName
                }
            }).then(function(response) {
                var items = angular.fromJson(response.data.menu_items);
                console.log('items in getItemsForCategory: ' + items.length);
                return items;
            }).catch(function(error) {
                console.log('Something went terribly wrong.');
            }); 
        };
    }
})();
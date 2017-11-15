(function (){
    'use strict';
    
    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems)
        .directive('itemsLoaderIndicator', ItemsLoaderIndicator)
        .filter('menuItems', MenuItemsFilter)
        .constant('ApiURL', 'https://davids-restaurant.herokuapp.com/menu_items.json');
    
    
    /*NarrowItDownController*/
    
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController (MenuSearchService) {
        var narrowItDown = this;
        
        narrowItDown.initialSearch = true;
        narrowItDown.isLoading = false;
        
        narrowItDown.searchTerm = '';
        narrowItDown.found = [];

        narrowItDown.searchMenu = function (searchTerm) {
            
            narrowItDown.searchTerm = searchTerm;

            if (searchTerm.trim() === '') {
                narrowItDown.initialSearch = false;
                narrowItDown.found = [];
            } else {
                narrowItDown.isLoading = true;
                
                var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
                
                promise.then(function (response) {
                    narrowItDown.initialSearch = false;
                    narrowItDown.found = Array.from(response);
                }).catch(function (error) {
                    console.log(error);
                }).finally(function () {
                    narrowItDown.isLoading = false;
                });
            }
        };

        narrowItDown.getItems = function () {
            return narrowItDown.found;
        };

        narrowItDown.removeItem = function (index) {
            narrowItDown.found.splice(index, 1);
        };

        narrowItDown.nothingFound = function () {
            var nothingFound = (!narrowItDown.initialSearch && 
                                narrowItDown.searchTerm !== '' && narrowItDown.found.length === 0) 
                                            ||
                                (!narrowItDown.initialSearch &&
                                narrowItDown.searchTerm === '' &&
                                narrowItDown.found.length === 0);
            return nothingFound;
        };

        narrowItDown.searchQuery = function () {
            var searchQuery = narrowItDown.searchTerm || narrowItDown.found.length;
            return searchQuery;
        };

    }
    
    /*MenuSearchService*/
    MenuSearchService.$inject = ['$http', 'menuItemsFilter', 'ApiURL'];
    function MenuSearchService ($http, menuItemsFilter, ApiURL) {
        var service = this;

        service.getMatchedMenuItems = function (searchTerm) {
            var items = $http({
                method: 'GET',
                url: (ApiURL),
                cache: true
            }).then(
            function (response) {
              return menuItemsFilter(response.data.menu_items, searchTerm);
            });
            return items;
        };
    }
    
    /*MenuItemsFilter*/
    
    MenuItemsFilter.$inject = ['$filter'];
    function MenuItemsFilter ($filter) {
        return function (items, query) {
            var filteredMenuItems = [];
            var term = $filter('lowercase')(query);

            for (var i = 0; i < items.length; i++) {
                var itemName = $filter('lowercase')(items[i].name);
                var itemDescription = $filter('lowercase')(items[i].description);

                if (itemName.includes(term) || itemDescription.includes(term)) {
                    filteredMenuItems.push(items[i]);
                }
            }
            return filteredMenuItems;
        };
    }
    
    /*FoundItems Directive*/
    
    function FoundItems () {
        var ddo = {
            restrict: 'E',
            scope: {
                searchTerm: '@',
                found: '<',
                onRemove: '&',
                searchQuery: '&',
                nothingFound: '&'
            },
            templateUrl: 'foundItems.html',
            controller: FoundItemsController,
            controllerAs: 'items',
            bindToController: true
        };
        return ddo;
      }
    function FoundItemsController () {
        var items = this;
    }

    
    /*ItemsLoaderIndicator directive description*/
    
    function ItemsLoaderIndicator () {
        var ddo = {    
            restrict: 'E',
            scope: {
                isLoading: '='
            },
            templateUrl: 'loader/itemsloaderindicator.template.html',
            controller: ItemsLoaderIndicatorController,
            controllerAs: 'itemsLoaderIndicator',
            bindToController: true,
            link: itemsLoaderLink
        };
        return ddo;
    }
    function ItemsLoaderIndicatorController () {
        var itemsLoaderIndicator = this;    
    }

    function itemsLoaderLink(scope, element, attrs, controller) {

        scope.$watch('itemsLoaderIndicator.isLoading', function (newValue, oldValue) {

            if (newValue) {
                showLoader();
            }
            else {
                hideLoader();
            }
        });

        function showLoader() {
            var loaderElem = element.find("div");
            loaderElem.css("display", "block");
        }

        function hideLoader() {
            var loaderElem = element.find("div");
            loaderElem.css("display", "none");
        }

    }

})();

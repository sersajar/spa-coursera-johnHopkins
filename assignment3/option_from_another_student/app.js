(function () {
'use strict';

angular.module('NarrowItDownApp', [])

.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', foundItemsDirective)
.directive('itemsLoader', itemsLoaderDirective)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");

MenuSearchService.$inject = ['$http', 'ApiBasePath'];

function MenuSearchService ($http, ApiBasePath) {
  var menu = this;

  menu.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: ApiBasePath + "/menu_items.json"
    }).then(function (result) {
        // process result and only keep items that match
        var foundItems = [];

        if (searchTerm.length !== 0) {
          for (var i = 0; i < result.data.menu_items.length; i++) {
            if (result.data.menu_items[i].description.indexOf(searchTerm) > -1) {
              foundItems.push(result.data.menu_items[i]);
            }
          }
        }

        // return processed items
        return foundItems;
    });
  };
}

NarrowItDownController.$inject = ['MenuSearchService'];

function NarrowItDownController (MenuSearchService) {
  var narrowItDown = this;

  narrowItDown.clicked = false;

  narrowItDown.ajaxStart = false;

  narrowItDown.searchTerm = "";

  narrowItDown.found = [];

  narrowItDown.getMatchedMenuItems = function () {

    narrowItDown.ajaxStart = true;

    var MenuSearchServicePromise = MenuSearchService.getMatchedMenuItems(narrowItDown.searchTerm);

    MenuSearchServicePromise.then(function (response) {
      narrowItDown.found = response;
      narrowItDown.clicked = true;
      narrowItDown.ajaxStart = false;
    });

  }

  narrowItDown.onRemove = function(index) {
    narrowItDown.found.splice(index, 1);
  }
}

function foundItemsDirective () {
  var ddo = {
    templateUrl: 'loader/founditems.template.html',
    scope: {
      items: '<',
      onRemove: '&',
      clicked: '='
    },
    controller: foundItemsController,
    controllerAs: 'foundItems',
    bindToController: true
  }

  return ddo;
}

function foundItemsController () {
  var foundItems = this;

  foundItems.hasItems = function () {
    if (foundItems.items.length > 0) {
      return true;
    }
    else {
      return false;
    }
  }
}

function itemsLoaderDirective () {
  var ddo = {
    templateUrl: 'loader/itemsloaderindicator.template.html',
    scope: {
      ajaxStart: '='
    },
    controller: itemsLoaderController,
    controllerAs: 'itemsLoader',
    bindToController: true,
    link: itemsLoaderLink
  }

  return ddo;
}

function itemsLoaderController () {
  var itemsLoader = this;
}

function itemsLoaderLink(scope, element, attrs, controller) {

  scope.$watch('itemsLoader.ajaxStart', function (newValue, oldValue) {

    if (newValue === true) {
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

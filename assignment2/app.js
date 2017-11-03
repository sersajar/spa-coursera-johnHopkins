(function () {
  'use strict';

  angular.module('ShoppingListCheckOffApp',[])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.showErrorMessage = false;
    toBuy.items = ShoppingListCheckOffService.getToBuyItems();

    toBuy.buyItem = function(itemIndex){
      ShoppingListCheckOffService.buyItem(itemIndex);
      if (toBuy.items.length <= 0) {
        toBuy.showErrorMessage = true;
      }
    };
  }

  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;
    alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();
  }

  function ShoppingListCheckOffService() {
    var listService = this;
      
    // declare 1 empty array for alreadyBought list
    var boughtItems = [];
    listService.getBoughtItems = function(){
      return boughtItems;
    };
    
    // initial array for toBuy list
    var toBuyItems = [
        {name: "Eggs", quantity: 6},
        {name: "Chocolate Cookies", quantity: 4},
        {name: "Chicken Wings", quantity: 12},
        {name: "Cereal Bars", quantity: 10},
        {name: "Beer Bottles", quantity: 6}
    ];
    listService.getToBuyItems = function(){
      return toBuyItems;
    };

    //Function to add the item to boughtItems and remove from toBuyItems.
    listService.buyItem = function(itemIndex){
      boughtItems.push(toBuyItems[itemIndex]);
      toBuyItems.splice(itemIndex, 1);
    };
  }

})();
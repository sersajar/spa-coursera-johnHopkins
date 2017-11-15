(function(){
  'use strict';
  var app =  angular.module('Asgn02App',[]);
  app.controller('ToBuyController',ToBuyController);
  app.controller('AlreadyBoughtController',AlreadyBoughtController);
  app.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService){
    var buy = this;
    buy.GetItems = ShoppingListCheckOffService.GetBuyItems();
    buy.errorMsg = ShoppingListCheckOffService.ErrorMsg;
    buy.AddToBoughtList = function (index){
      //try{
         ShoppingListCheckOffService.AddToBoughtList(index);
         buy.errorMsg = ShoppingListCheckOffService.ErrorMsg;
      // }catch(ex){
      //     buy.errorMsg =ex.message;
      // }
    };

  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;
    bought.GetItems = ShoppingListCheckOffService.GetBoughtItems();
    bought.errorMsg = function(){
      if(bought.GetItems.length > 0)
      return "";
      else
      return "Nothing is bought yet.";
    };
  }

  function ShoppingListCheckOffService(){
    var service = this;
    var BuyItemList = [];
    var BoughtItemList = [];
    var ErrorMsg = "";
    service.GetBuyItems = function(){
      BuyItemList.push(new Item('Biscuits',10));
      BuyItemList.push(new Item('Cookies',11));
      BuyItemList.push(new Item('Eggs',60));
      BuyItemList.push(new Item('Apples',50));
      BuyItemList.push(new Item('Banana',12));
      return BuyItemList;
    };
    service.AddToBoughtList = function(index){
      BoughtItemList.push(BuyItemList[index]);
      BuyItemList.splice(index,1);
      if(BuyItemList.length <= 0 )
       service.ErrorMsg= "Everything is bought!";

    };
    service.GetBoughtItems = function(){
      return BoughtItemList;
    };


  }

  function Item(name,quantity){
    this.name = name ;
    this.quantity =quantity;
  }

})();

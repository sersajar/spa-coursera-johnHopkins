(function () {
'use strict';
angular.module ('ShoppingListCheckOff',[])
.controller ('ToBuyController', ToBuyController)
.controller ('AlreadyBoughtController', AlreadyBoughtController)
.service ("ShoppingListCheckOffService", ShoppingListCheckOffService)

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController (ShoppingListCheckOffService) {
var toBuy = this;
toBuy.items = ShoppingListCheckOffService.getItems1();
toBuy.message1 = ShoppingListCheckOffService.message1();
toBuy.message2 = ShoppingListCheckOffService.message2();
toBuy.moveItem = function (itemIndex) {
  ShoppingListCheckOffService.moveItem (itemIndex);
  toBuy.message1 = ShoppingListCheckOffService.message1();
  toBuy.message2 = ShoppingListCheckOffService.message2();
  };
};

AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
function AlreadyBoughtController (ShoppingListCheckOffService) {
var bought = this;
bought.items = ShoppingListCheckOffService.getItems2();
};

function ShoppingListCheckOffService () {
var service = this;

var toBuyItems = [{name:"Apples",quantity:"2 kg"},
  {name:"Oranges", quantity:"3 kg"},
  {name:"Bananas", quantity:"1 kg"},
  {name:"Peaches", quantity:"5 kg"},
  {name:"Grapes", quantity:"4 kg"}
];
var boughtItems = [];


service.moveItem = function (itemIndex) {

  var item = toBuyItems.splice(itemIndex, 1);
  var newItem = {name:item[0].name, quantity: item[0].quantity};
  boughtItems.push(newItem);
  };

service.getItems1 = function () {
  return toBuyItems;
};

service.getItems2 = function () {
  return boughtItems;
};

service.message1 = function () {
 if (boughtItems.length==0 ) {
 return "Nothing is bought yet"}

 };

 service.message2 = function () {
  if (toBuyItems.length==0) {
  return "Everything is bought!"}
  };
}
})();

var numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log("Number array: ", numberArray);

// same as 4 next lines
//var filteredNumberArray = numberArray.filter(function (value) {
//    return value > 5;
//});

function above5filter(value) {
    return value > 5;
}
var filteredNumberArray = numberArray.filter(above5filter);
console.log("Filtered number array: ", filteredNumberArray);

var shoppingList = [
        "Milk", "donuts", "Cookies", "Chocolate Bismol", "Peanut Butter", "CocaCola", "Pepito Bismol", "Oranges"
    ];
console.log("Shopping List: ", shoppingList);

var searchValue = "Bismol";
function containsFilter(value) {
    return value.indexOf(searchValue) !== -1;
}
var searchedShoppingList = shoppingList.filter(containsFilter);
console.log("Searched Shopping List: ", searchedShoppingList);

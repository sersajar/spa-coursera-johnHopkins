(function (){
    'use strict';
    
    angular.module('LunchCheck', [])
            .controller('LunchCheckController', LunchCheckController);
    
            LunchCheckController.$inject = ['$scope'];
            function LunchCheckController($scope) {
                $scope.message = "You have not press the button yet";
                $scope.listOfItems = '';
                $scope.checkIfTooMuch = function () {
                    // method to create an array from a string, using comas as separator
                    // trim() removes white-spaces and split() makes an array from a string
                    var item = $scope.listOfItems.trim().split(',');
                    // console.log(item);
                    if (item[0] === '') {
                        
                        $scope.message = "Please enter data first";
                        
                    } else if (item.length < 4) {
                        
                        $scope.message = "Enjoy!";
                        
                    } else {
                        
                        $scope.message = "Too much!!";
                        
                    }
                };
                
            }
})();
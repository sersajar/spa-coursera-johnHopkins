(function () {
'use strict';
    
    angular.module('myFirstApp', [])
            // angular convention uses CamelCase for controller names
            .controller('MyFirstController', function ($scope) {
                $scope.name = "Sergi";
                $scope.sayHello = function () {
                    return "Hello Coursera!"
                };
            })
    
            // this controller is for the calculator
            .controller('NameCalculatorController', function ($scope) {
                $scope.name = "";
                $scope.totalValue = 0;

                $scope.displayNumeric = function () {
                    var totalNameValue = calculateNumericForString($scope.name);
                    $scope.totalValue = totalNameValue;
                };

                function calculateNumericForString(string) {
                    
                    var totalStringValue = 0;
                    for (var i = 0; i < string.length; i++) {
                        totalStringValue += string.charCodeAt(i);
                    };
                    
                    return totalStringValue;
                };
            });   
})();

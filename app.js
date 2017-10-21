(function () {
'use strict';
    
    angular.module('myFirstApp', [])
            // angular convention uses CamelCase for controller names
            .controller('MyFirstController', function ($scope) {
                $scope.name = "Sergi";
                $scope.sayHello = function () {
                    return "Hello Coursera!"
                };
            });
    
})();

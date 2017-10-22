(function () {
    'use strict';

    angular.module('MsgApp', [])
        .controller('MsgController', MsgController)
        // custom filter factories
        .filter('loves', LovesFilter)
        .filter('truth', TruthFilter); // not injected cause only used in html

        MsgController.$inject = ['$scope', '$filter', 'lovesFilter'];
        function MsgController($scope, $filter, lovesFilter) {
            $scope.name = "Sergi";
            $scope.stateOfBeing = "hungry";
            $scope.cookieCost = 0.45;

            $scope.sayMessage = function () {
                var msg = $scope.name + " likes to eat healthy snacks at night!";
                var output = $filter('uppercase')(msg);
                return output;
            };
            
            $scope.sayLovesMessage = function () {
                var msg = $filter('uppercase')($scope.name) + " likes to eat healthy snacks at night!";
                msg = lovesFilter(msg);
                return msg;
            };

        $scope.feedYaakov = function () {
            $scope.stateOfBeing = "fed";
            };
        }
        
        function LovesFilter() {
            return function (input) {
                input = input || "";
                input = input.replace("likes", "loves");
                return input;
            };
        }
        
        function TruthFilter() {
            return function (input, target, replace) {
                input = input || "";
                input = input.replace(target, replace);
                return input;
            };
        }    
    
})();
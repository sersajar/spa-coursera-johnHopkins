(function () {
    'use strict';

    angular.module('MsgApp', [])
            .controller('MsgController', MsgController);

            MsgController.$inject = ['$scope'];
            function MsgController($scope) {
                $scope.name = "Sergi";
                $scope.stateOfBeing = "hungry";

                $scope.sayMessage = function () {
                    return "Sergi likes to smoke healthy crack at night";
                };
                
                $scope.smokeSergi = function () {
                    $scope.stateOfBeing = "fed";
                };
            }
    
})();

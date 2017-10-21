/*(function () {
    'use strict';

    angular.module('DIApp', [])
        .controller('DIController', DIController);
        
    DIController.$inject = ['$scope', '$filter'];
    function DIController($scope, $filter) {

        $scope.name = "Yaakov";

        $scope.upper = function () {
            var upCase = $filter('uppercase');
            $scope.name = upCase($scope.name);
        };
    };
})();*/

//(function(){
//    'use strict';
//// inline injection, hard to read, same functionallity as above
//    angular.module('DIApp', [])
//            .controller('DIController', ['$scope', '$filter', function ($scope, $filter) {
//                
//                $scope.name = "Yaakov";
//                
//                $scope.upper = function () {
//                    var upCase = $filter('uppercase');
//                    $scope.name = upCase($scope.name);
//                }; 
//            }]);
//// same inline injection different written accepts minification
//
///*'use strict';
//    
//    angular.module('DIApp', [])
//            .controller('DIController', ['$scope', '$filter', DIController]);
//                        
//            function DIController($scope, $filter) {
//                
//                $scope.name = "Yaakov";
//                
//                $scope.upper = function () {
//                    var upCase = $filter('uppercase');
//                    $scope.name = upCase($scope.name);
//                }; 
//            };*/
//})();

!function(){"use strict";angular.module("DIApp",[]).controller("DIController",["$scope","$filter",function(e,n){e.name="Yaakov",e.upper=function(){var o=n("uppercase");e.name=o(e.name)}}])}();
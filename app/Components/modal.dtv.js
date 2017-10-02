/**
 * Created by KevTS on 1/10/17.
 */


(function () {


    angular.module("ShowApp").directive("modal", [ function () {

        return {
            restrict: "E",
            scope: {
                "modalurl": "=",
                "show": "="
            },
            templateUrl: "app/Components/modal.html",
            controller: ["$scope","appConfig", "$localStorage", function ($scope, appConfig, $localStorage){



            }]
        };

    }]);


})();
/**
 * Created by KevTS on 1/10/17.
 */

(function () {

    angular.module("ShowApp").directive("card", [function () {


        return {
            restrict: "E",
            scope: {
                "datalist": "="
            },
            templateUrl: "app/Components/card.html",
            controller: ["$scope", "appConfig", "$localStorage", "MovieSrv", "SerieSrv", function ($scope, appConfig, $localStorage, MovieSrv, SerieSrv) {

                $scope.trailer = {show: false};

                $localStorage.$default({favList: []});
                $scope.apiImageUrl = appConfig.apiImageUrl;

                $scope.saveToFav = function (item) {
                    $localStorage.favList.push({item_id: item.id, item_type: item.type});
                    console.log($localStorage.favList);
                };

                $scope.showTrailer = function (item) {

                    var w = 3;
                    switch (item.type.toString().toLowerCase()) {

                        case "m":

                            MovieSrv.getVideo(item.id).then(function (response) {
                                if (response.results.length > 0) {
                                    showModal(response.results[0].key);
                                }
                                else {
                                    alert("Este articulo no tiene trailers");
                                }
                            });

                            break;
                        case "s":
                            SerieSrv.getVideo(item.id).then(function (response) {
                                if (response.results.length > 0) {
                                    showModal(response.results[0].key);
                                }
                                else {
                                    alert("Este articulo no tiene trailers");
                                }
                            });
                            break;

                    }
                };


                var showModal = function (video_key) {
                    $scope.trailer.url = appConfig.youtubeUrl + video_key;
                    $scope.trailer.show = true;
                };

            }]
        };

    }]);

})();



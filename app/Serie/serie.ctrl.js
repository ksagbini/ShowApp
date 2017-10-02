/**
 * Created by KevTS on 30/09/17.
 */


(function () {

    angular.module("ShowApp").controller("SerieCtrl", ["$scope", "SerieSrv", "appConfig", "$rootScope", function ($scope, SerieSrv, appConfig, $rootScope) {

        $rootScope.title = "Series";
        $rootScope.active = "seriesPage";

        $scope.apiImageUrl = appConfig.apiImageUrl;
        $scope.years = appConfig.year();
        $scope.search = {};
        $scope.series = [];
        $scope.genres = [];
        $scope.page = 1;
        $scope.trailer = {};


        $scope.init = function () {

            SerieSrv.getSeries().then(function (response) {
                getSerieDetails(response.results);
            });

            SerieSrv.getGenre().then(function (response) {
                $scope.genres = response.genres;
            });

        };

        $scope.search = function () {
            SerieSrv.search($scope.searchFrm.text, $scope.searchFrm.page, $scope.searchFrm.year).then(function (response) {
                $scope.series = response.results;
                getSerieDetails($scope.series);
            });
        };

        $scope.getSerie = function (serie) {
            $scope.series = [];
            SerieSrv.getSerie(serie.id).then(function (response) {
                var item = {};
                item.id = response.id;
                item.title = response.original_name;
                item.vote_average = response.vote_average;
                item.overview = response.overview.length > 100 ? response.overview.substr(0, 100) + "..." : response.overview;
                item.img = appConfig.apiImageUrl + response.poster_path;
                item.type = "s"; //serie
                item.info1 = "Episodios: " + response.number_of_episodes;
                var country = response.origin_country.length > 0 ? "(" + response.origin_country[0] + ")" : "";
                item.info2 = "Temporadas " + response.number_of_seasons + " " + country;
                item.info3 = appConfig.genresInfo(response.genres);
                $scope.series.push(item);
            });
        };

        var getSerieDetails = function (series) {
            series.forEach(function (serie) {
                $scope.getSerie(serie);
            });
        };


    }]);


})();

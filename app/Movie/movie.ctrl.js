/**
 * Created by KevTS on 29/09/17.
 */


(function () {
    angular.module("ShowApp").controller("MovieCtrl", ["$scope", "MovieSrv", "appConfig", "$rootScope", "$filter", function ($scope, MovieSrv, appConfig, $rootScope, $filter) {


        $rootScope.title = "Películas";
        $rootScope.active = "moviesPage";

        $scope.apiImageUrl = appConfig.apiImageUrl;
        $scope.years = appConfig.year();
        $scope.searchFrm = {page: 1};
        $scope.movies = [];
        $scope.genres = [];
        $scope.page = 1;
        $scope.trailer = {};


        $scope.init = function () {

            MovieSrv.getMovies().then(function (response) {
                getMovieDetails(response.results);
            });

            MovieSrv.getGenre().then(function (response) {
                $scope.genres = response.genres;
            });

        };


        $scope.search = function () {
            MovieSrv.search($scope.searchFrm.text, $scope.searchFrm.page, $scope.searchFrm.year).then(function (response) {
                // $scope.movies = response.results;
                getMovieDetails(response.results);
            });
        };

        $scope.getMovie = function (movie) {

            $scope.movies = [];

            MovieSrv.getMovie(movie.id).then(function (response) {
                var item = {};
                item.id = response.id;
                item.title = response.original_title;
                item.vote_average = response.vote_average;
                item.overview = response.overview.length > 100 ? response.overview.substr(0,100) + "..." : response.overview;
                item.img = appConfig.apiImageUrl + response.poster_path;
                item.type = "m"; //movie
                item.info1 = appConfig.timeFormat(response.runtime);
                var country = response.production_countries.length > 0? "(" + response.production_countries[0].name + ")" : "";
                item.info2 = $filter('date')(response.release_date,'d MMM y') + " (" + country ;
                item.info3 = appConfig.genresInfo(response.genres);
                $scope.movies.push(item);
            });

        };

        var getMovieDetails = function (movies) {
            movies.forEach(function(movie){
                $scope.getMovie(movie);
            });
        };

    }]);
})();
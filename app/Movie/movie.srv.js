/**
 * Created by KevTS on 29/09/17.
 */

(function () {

    angular.module("ShowApp").factory("MovieSrv", ["$http", "appConfig", function ($http, appConfig) {

        var srv = {};

        srv.getMovies = function () {
            return $http.get(appConfig.apiUrl + "discover/movie", {params: {api_key: appConfig.apiKey}}).then(function (response) {
                return response.data;
            });
        };

        srv.getMovie = function (movie_id) {
            var path = "movie/" + movie_id
            return $http.get(appConfig.apiUrl + path, {params: {api_key: appConfig.apiKey}}).then(function(response){
                return response.data;
            });
        };

        srv.getGenre = function () {
            return $http.get(appConfig.apiUrl + "genre/movie/list", {params: {api_key: appConfig.apiKey}}).then(function (response) {
                return response.data;
            });
        };

        srv.getVideo = function (movie_id) {
            var path = "movie/" + movie_id + "/videos";
            return $http.get(appConfig.apiUrl + path, {params: {api_key: appConfig.apiKey}}).then(function (response) {
                return response.data;
            });
        };

        srv.search = function (query, page, year) {

            var params = {
                api_key: appConfig.apiKey,
                query: query,
                page: page,
                year: year
            };

            return $http.get(appConfig.apiUrl + "search/movie", {params: params}).then(function (response) {
                return response.data;
            });

        };

        return srv;
    }]);

})();
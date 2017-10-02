/**
 * Created by KevTS on 30/09/17.
 */


(function () {

    angular.module("ShowApp").factory("SerieSrv", ["$http", "appConfig", function ($http, appConfig) {

        var srv = {};

        srv.getSeries = function () {
            return $http.get(appConfig.apiUrl + "discover/tv", {params: {api_key: appConfig.apiKey}}).then(function (response) {
                return response.data;
            });
        };

        srv.getSerie = function (serie_id) {
            var path = "tv/" + serie_id;
            return $http.get(appConfig.apiUrl + path, {params: {api_key: appConfig.apiKey}}).then(function(response){
                return response.data;
            });
        };

        srv.getGenre = function () {
            return $http.get(appConfig.apiUrl + "genre/tv/list", {params: {api_key: appConfig.apiKey}}).then(function (response) {
                return response.data;
            });
        };

        srv.getVideo = function (video_id) {
            var path = "tv/" + video_id + "/videos";
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

            return $http.get(appConfig.apiUrl + "search/tv", {params: params}).then(function (response) {
                return response.data;
            });

        };

        return srv;

    }]);

})();
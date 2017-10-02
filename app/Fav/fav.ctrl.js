/**
 * Created by KevTS on 1/10/17.
 */



(function () {


    angular.module("ShowApp").controller("FavCtrl", ["$scope", "$localStorage", "MovieSrv", "SerieSrv", "appConfig", "$filter", "$rootScope", function ($scope, $localStorage, MovieSrv, SerieSrv, appConfig, $filter, $rootScope) {

        $rootScope.title = "Favoritos";
        $rootScope.active = "favsPage";
        $scope.favs = [];


        $scope.init = function () {


            $localStorage.favList.forEach(function(item){


                switch(item.item_type){

                    case "m":

                        MovieSrv.getMovie(item.item_id).then(function (response) {
                            var movie = {};
                            movie.id = response.id;
                            movie.title = response.original_title;
                            movie.vote_average = response.vote_average;
                            movie.overview = response.overview.length > 100 ? response.overview.substr(0,100) + "..." : response.overview;
                            movie.img = appConfig.apiImageUrl + response.poster_path;
                            movie.type = "m"; //movie
                            movie.info1 = appConfig.timeFormat(response.runtime);
                            var country = response.production_countries.length > 0? "(" + response.production_countries[0].name + ")" : "";
                            movie.info2 = $filter('date')(response.release_date,'d MMM y') + " (" + country ;
                            movie.info3 = appConfig.genresInfo(response.genres);
                            movie.favHide = true;
                            $scope.favs.push(movie);
                        });

                        break;
                    case "s":

                        SerieSrv.getSerie(item.item_id).then(function(response){
                            var serie = {};
                            serie.id = response.id;
                            serie.title = response.original_name;
                            serie.vote_average = response.vote_average;
                            serie.overview = response.overview.length > 100 ? response.overview.substr(0, 100) + "..." : response.overview;
                            serie.img = appConfig.apiImageUrl + response.poster_path;
                            serie.type = "s"; //serie
                            serie.info1 = "Episodios: " + response.number_of_episodes;
                            var country = response.origin_country.length > 0 ? "(" + response.origin_country[0] + ")" : "";
                            serie.info2 = "Temporadas " + response.number_of_seasons + " " + country;
                            serie.info3 = appConfig.genresInfo(response.genres);
                            serie.favHide = true;
                            $scope.favs.push(serie);
                        });


                        break;

                }

            });
        };




    }]);


})();
/**
 * Created by KevTS on 29/09/17.
 */

(function () {

    angular.module("ShowApp").config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/", {redirectTo: "/movies"})
            .when("/movies", {templateUrl: "app/Movie/movie.html", title: "Movies", controller: "MovieCtrl"})
            .when("/series", {templateUrl: "app/Serie/serie.html", title: "Series", controller: "SerieCtrl"})
            .when("/fav", {templateUrl: "app/Fav/fav.html", title: "Series", controller: "FavCtrl"})
            .otherwise({redirectTo: "/movies"});
    }]);


    angular.module("ShowApp").constant("appConfig", {
        apiUrl: "https://api.themoviedb.org/3/",
        apiImageUrl: "https://image.tmdb.org/t/p/w500",
        apiKey: "74269a6e8151e5186477299b29f41494",
        youtubeUrl: "https://www.youtube.com/watch?v=",
        // youtubeUrl: "https://www.youtube.com/embed/",
        year: function () {
            var array = [];
            var start = 1960;
            for(var i = 0; i<=2018 - start; i++){
                array.push(start + i);
            }
            return array;
        },
        timeFormat: function(minutes){
            var hour = Math.floor(minutes/60);
            var min = minutes%60;
            return hour + "h " + min + "min";
        },
        genresInfo: function (genres) {
            var str = "";
            genres.forEach(function(genre){
                str += genre.name + ", ";
            });
            return str.substr(0,str.length - 2);
        }
    });




})();

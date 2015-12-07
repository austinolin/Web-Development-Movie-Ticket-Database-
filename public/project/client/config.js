"use strict";

(function() {
	angular
		.module("FlandangoProject")
		.config(function($routeProvider) {
			$routeProvider
				.when("/home", {
					templateUrl: "views/home/home.view.html",
					controller: "HomeController as model"
				})
				.when("/login", {
					templateUrl: "views/login/login.view.html",
					controller: "LoginController as model"
				})
				.when("/profile", {
					templateUrl: "views/profile/profile.view.html",
					controller: "ProfileController as model"
				})
				.when("/register", {
					templateUrl: "views/register/register.view.html",
					controller: "RegisterController as model"
				})
				.when("/myTickets", {
					templateUrl: "views/myTickets/myTickets.view.html",
					controller: "myTicketsController as model"
				})
				.when("/movies", {
					templateUrl: "views/movies/movies.view.html",
					controller: "MoviesController as model"
				})
				.when("/movieSearch/:movieName", {
					templateUrl: "views/movieSearch/movieSearch.view.html",
					controller: "MovieSearchController as model"
				})
				.when("/theaterSearch/:theaterName", {
					templateUrl: "views/theaterSearch/theaterSearch.view.html",
					controller: "TheaterSearchController as model"
				})
				.when("/theaters", {
					templateUrl: "views/theaters/theaters.view.html",
					controller: "TheatersController as model"
				})
				.when("/theater/:theaterId", {
					templateUrl: "views/theater/theater.view.html",
					controller: "TheaterController as model"
				})
				.when("/theater/:theaterId/showtime/:showtimeId", {
					templateUrl: "views/checkout/checkout.view.html",
					controller: "CheckoutController as model"
				})
				.otherwise({
					redirectTo: "/home"
				})
		})
})();
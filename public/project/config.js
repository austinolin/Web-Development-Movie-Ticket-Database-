"use strict";

(function() {
	angular
		.module("FlandangoProject")
		.config(function($routeProvider) {
			$routeProvider
				.when("/home", {
					templateUrl: "home/home.view.html"
				})
				.when("/login", {
					templateUrl: "login/login.view.html"
				})
				.when("/profile", {
					templateUrl: "profile/profile.view.html"
				})
				.when("/register", {
					templateUrl: "register/register.view.html"
				})
				.when("/myTickets", {
					templateUrl: "myTickets/myTickets.view.html"
				})
				.when("/movies", {
					templateUrl: "movies/movies.view.html"
				})
				.when("/theaters", {
					templateUrl: "theaters/theaters.view.html"
				})
				.when("/theater", {
					templateUrl: "theater/theater.view.html"
				})
				.when("/checkout", {
					templateUrl: "checkout/checkout.view.html"
				})
				.otherwise({
					redirectTo: "/home"
				})
		})
})();
"use strict";
(function() 
{
	angular
		.module("FormBuilderApp")
		.controller("LoginController", LoginController);
		
	function LoginController($scope, $location, UserService, $rootScope) {

		$scope.login = login;

		// Will search for username and password in database
		function login() {
			UserService.findUserByUsernameAndPassword($scope.username, $scope.password, loginCallback);
		}
		
		// If user does exist, will open their profile
		// Otherwise, nothing changes on the page
		function loginCallback(user) {
			if (user != null) {
				// Set that user as the overall user in the rootscope
				$rootScope.user = user;
				// Load their profile page
				$location.url("/profile");
			} else {
				// Error
				console.log("User does not exist!");
			}
		}
	}
	
})();
"user strict";
(function() 
{
	angular
		.module("FormBuilderApp")
		.controller("RegisterController", RegisterController);
		
	function RegisterController($scope, $location, UserService, $rootScope) {
		$scope.register = register;
		// Will register a new user into the database
		function register() {
			// Creates new user with password, username, and email
			var user = {
				username : $scope.username, 
				password : $scope.password, 
				email : $scope.email
			};
			// Add them into the array of users
			UserService.createUser(user, registerCallback);
		}
		
		// Callback function
		// If User is valid, then will set them as rootScope user
		// and load profile page
		// else nothing happens
		function registerCallback(user) {
			// Is Valid
			if (user != null) {
				$rootScope.user = user;
				$location.url("/profile");
			} else {
				// Error
				console.log("Registration failed!");
			}
		}
	}
})();
"use strict";
(function() 
{
	angular
		.module("FormBuilderApp")
		.controller("ProfileController", ProfileController);
		
	function ProfileController($scope, UserService, $rootScope) {
		// Creates user's profile information
		var user = $rootScope.user;
		$scope.username = user.username;
		$scope.password = user.password;
		$scope.email = user.email;
		$scope.first_name = user.first_name;
		$scope.last_name = user.last_name;
		$scope.update = update;

		// Updates the user's information upon clicking Update button
		function update() {
			user.username = $scope.username;
			user.password = $scope.password;
			user.email = $scope.email;
			user.first_name = $scope.first_name;
			user.last_name = $scope.last_name;
			// Update rootScope user
			$rootScope.user = user;
			// Update user information in stored database of users
			UserService.updateUser(user.id, user, updateCallback)
		}
		// Callback function, does nothing when called
		function updateCallback(user){
			// Do nothing
		}
	}
})();
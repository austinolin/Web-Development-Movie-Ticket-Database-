"use strict";
(function() 
{
	angular
		.module("FormBuilderApp")
		.controller("ProfileController", ProfileController);
		
	function ProfileController(UserService, $rootScope) {
		// Creates user's profile information
		var model = this;
		// get the user data
		var user = $rootScope.user;
		model.update = update;
		model.username = user.username;
		model.firstName = user.firstName;
		model.lastName = user.lastName;
		model.password = user.password;
		model.email = user.email;

		// Updates the user's information upon clicking Update button
		function update() {
			user.username = model.username;
			user.firstName = model.firstName;
			user.lastName = model.lastName;
			user.password = model.password;
			user.email = model.email;
			// Update rootScope user
			$rootScope.user = user;
			// Update user information in stored database of users
			UserService.updateUser(user.id, user)
		}
		
	}
})();
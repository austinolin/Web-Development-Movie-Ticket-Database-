"use strict";
(function() 
{
	angular
		.module("FlandangoProject")
		.controller("LoginController", LoginController);
		
	function LoginController($scope, $location, UserService, $rootScope) 
	{
		var model = this;
		model.login = login;
		//$scope.login = login;

		// Will search for user with the username and password in database
		function login() 
		{
			UserService.findUserByUsernameAndPassword(model.username, model.password)
			.then(function(response)
			{
				// test if user exists
				if (response != null) {
					// set rootscope to the user
					$rootScope.user = response;
					// redirect to profile page
					$location.url("/profile");
				} else {
					console.log("User not found!");
				}
			});
		}
		
	}
	
})();
"user strict";
(function() 
{
	angular
	.module("FlandangoProject")
	.controller("RegisterController", RegisterController);

	function RegisterController($scope, $location, UserService, $rootScope) 
	{
		var model = this;
		model.register = register;


		
		// Will register a new user into the database
		function register() 
		{
			if (model.isAdmin == "Yes") {
				var admin = true;
			} else {
				var admin = false;
			}
			// Creates new user with password, username, and email
			var user = 
			{
				username : model.username, 
				password : model.password, 
				email : model.email, 
				isAdmin: admin
			};



			// Add them into the array of users
			UserService.createUser(user).then(function(response)
			{
				// get user we just made to set the rootscope to that user, and
				// then redirect to profile page
				UserService.findUserByUsernameAndPassword(user.username, user.password)
				.then(function(response)
				{
					$rootScope.user = response;
					$location.url("/profile");
				});
			});
		}	
	}
})();
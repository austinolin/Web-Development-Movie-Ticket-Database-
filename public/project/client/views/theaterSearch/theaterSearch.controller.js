"use strict";
(function() 
{
	angular
		.module("FlandangoProject")
		.controller("TheaterSearchController", TheaterSearchController);
		
	function TheaterSearchController(TheaterService, $rootScope, $routeParams) 
	{
		var model = this;
		// Initial value for empty form
		// Get user information from the rootscope
		var user = $rootScope.user;
		model.user = user;
		model.theaterName = $routeParams.theaterName;
		console.log(model.theaterName);

		// will get the list of all theaters
		TheaterService.getTheaterByName(model.theaterName).then(function(response)
		{
			model.theater = response;
		});
	}
		

})();
"use strict";
(function() 
{
	angular
		.module("FlandangoProject")
		.controller("MovieSearchController", MovieSearchController);
		
	function MovieSearchController(MovieService, $rootScope, $routeParams) 
	{
		var model = this;

		model.movieIndex = null;
		
		var user = $rootScope.user;
		model.user = user;
		model.movieName = $routeParams.movieName;
		console.log(model.movieName);

	
		MovieService.getMovieByName(model.movieName).then(function(response)
		{
			model.movie = response;
		});
	}
		

})();
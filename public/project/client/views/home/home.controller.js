"use strict";
(function() 
{
  angular
    .module("FlandangoProject")
    .controller("HomeController", HomeController);
    
  function HomeController($scope, $location) 
  {
		var model = this;
		model.searchMovies = function()
		{
			var url = "/movieSearch/" + model.movieName;
			$location.url(url);
		}

		model.searchTheaters = function()
		{
			var url = "/theaterSearch/" + model.theaterName;
			$location.url(url);
		}
		
	}
})();
"use strict";
(function() 
{
  angular
    .module("FlandangoProject")
    .controller("SidebarController", SidebarController);
    
  function SidebarController($scope, $location) 
  {
  	$scope.$location = $location;
		var model = this;
		model.search = function()
		{
			var url = "/movies/" + model.movieName;
			$location.url(url);
		}
		
	}
})();
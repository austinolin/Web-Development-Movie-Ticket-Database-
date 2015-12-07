"use strict";
(function() 
{
  angular
    .module("FlandangoProject")
    .controller("HeaderController", HeaderController);
    
  function HeaderController($scope, $location, $rootScope) {
  	$scope.$location = $location;
    var model = this;

  	model.logout = logout;
	function logout() {
		$rootScope.user = null;
		$location.url("/home");
	}
  }


})();
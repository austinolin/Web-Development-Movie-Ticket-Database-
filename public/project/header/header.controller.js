"use strict";
(function() 
{
  angular
    .module("FlandangoProject")
    .controller("HeaderController", HeaderController);
    
  function HeaderController($scope, $location) {
  	$scope.$location = $location;
  }
})();
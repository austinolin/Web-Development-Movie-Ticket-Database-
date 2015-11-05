"use strict";
(function() 
{
  angular
    .module("FlandangoProject")
    .controller("SidebarController", SidebarController);
    
  function SidebarController($scope, $location) {
  	$scope.$location = $location;
  }
})();
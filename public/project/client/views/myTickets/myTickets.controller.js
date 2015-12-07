"use strict";
(function() 
{
	angular
		.module("FlandangoProject")
		.controller("myTicketsController", myTicketsController);
		
	function myTicketsController(TicketService, $rootScope) 
	{
		var model = this;

		var user = $rootScope.user;
		model.user = user;

		
		TicketService.findAllTicketsForUser(user._id).then(function(response)
		{
			model.tickets = response;
		});


	}

})();
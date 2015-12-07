"use strict";
(function() 
{
	angular
		.module("FlandangoProject")
		.controller("CheckoutController", CheckoutController);
		
	function CheckoutController(ShowtimeService, TheaterService, TicketService, $location, $rootScope, $routeParams) 
	{
		var model = this;
		var theaterID = $routeParams.theaterId;
		var showtimeID = $routeParams.showtimeId;
		// Initial value for empty form
		// Get user information from the rootscope
		var user = $rootScope.user;
		model.user = user;

		// will get the list of all theaters
		ShowtimeService.getShowtimeForTheater(theaterID, showtimeID).then(function(response)
		{
			model.showtime = response;
		});

		TheaterService.getTheaterById(theaterID).then(function(response)
		{
			model.theater = response;
		});

		model.addTicket = addTicket;

		// Adds new theater to array of theaters
		function addTicket() {
			if (typeof user == 'undefined') {
				alert("Please log in to purchase tickets.");
			} else {
			var newTicket = 
			{
				userId : model.user._id,
				title : model.showtime.movie.title,
				theatername : model.theater.name,
				rating : model.showtime.movie.rating,
				time : model.showtime.time
			};


			if (model.ticketsBought <= model.showtime.ticketCount) {
				for (var i = 0; i < model.ticketsBought; i++) {

					TicketService.createTicketForUser(user._id, newTicket).then(function(response)
				{
					var newCount = model.showtime.ticketCount - model.ticketsBought;
					var updatedShowtime = 
					{
						ticketCount : newCount,
						time : model.showtime.time,
						price : model.showtime.price,
						movie : model.showtime.movie

					}
					// get the new updated list of theaters 
					ShowtimeService.updateShowtime(theaterID, showtimeID, updatedShowtime).then(function(response)
					{
						ShowtimeService.getShowtimeForTheater(theaterID, showtimeID).then(function(response)
						{
							model.showtime = response;
							$location.url("/myTickets");
						});
					});
				});
				}
			} else {
				alert("Not enough tickets in stock.");
			}
		}
		}
	}

})();
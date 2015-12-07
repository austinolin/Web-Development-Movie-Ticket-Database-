"use strict";
(function() 
{
	angular
		.module("FlandangoProject")
		.controller("TheaterController", TheaterController);
		
	function TheaterController(ShowtimeService, $rootScope, $routeParams) 
	{
		var model = this;
		var theaterID = $routeParams.theaterId;
		model.theaterId = theaterID;
		// Initial value for empty form
		model.showtimeIndex = null;
	
		var user = $rootScope.user;
		model.user = user;

		
		ShowtimeService.getShowtimesForTheater(theaterID).then(function(response)
		{
			model.showtimes = response;
		});

		model.addShowtime = addShowtime;
		model.updateShowtime = updateShowtime;
		model.deleteShowtime = deleteShowtime;
		model.selectShowtime = selectShowtime;
		

		function addShowtime() {
			var newMovie = 
			{
				title : model.title,
				year : model.year,
				rating : model.rating,
				director : model.director,
				actors : model.actors
			};
			var newShowtime = 
			{
				ticketCount : model.ticketCount,
				time : model.time,
				price : model.price,
				movie : newMovie

			};
		
			ShowtimeService.createShowtimeForTheater(theaterID, newShowtime).then(function(response)
			{
				
				ShowtimeService.getShowtimesForTheater(theaterID).then(function(response)
				{
					model.showtimes = response;
				});
				// will de-select the form
				model.title = "";
				model.year = "";
				model.rating = "";
				model.director = "";
				model.actors = "";
				model.ticketCount = "";
				model.time = "";
				model.price = "";
				model.showtimeIndex = null;
			});
		}

	
		function updateShowtime() {
			
			var originalShowtime = model.showtimes[model.showtimeIndex];
		
			originalShowtime.ticketCount = model.ticketCount;
			originalShowtime.time = model.time;
			originalShowtime.price = model.price;
			var newMovie = 
			{
				title : model.title,
				year : model.year,
				rating : model.rating,
				director : model.director,
				actors : model.actors
			};
			originalShowtime.movie = newMovie;
			ShowtimeService.updateShowtime(theaterID, originalShowtime._id, originalShowtime).then(function(response)
			{
			
				ShowtimeService.getShowtimesForTheater(theaterID).then(function(response)
				{
					model.showtimes = response;
					model.title = "";
					model.year = "";
					model.rating = "";
					model.director = "";
					model.actors = "";
					model.ticketCount = "";
					model.time = "";
					model.price = "";
					model.showtimeIndex = null;
				});
				// will de-select the form
			});
		}
		
		function deleteShowtime(index) {

			ShowtimeService.deleteShowtimeFromTheater(theaterID, model.showtimes[index]._id).then(function(response)
			{
				
				ShowtimeService.getShowtimesForTheater(theaterID).then(function(response)
				{
					model.showtimes = response;
				});
			});
		}
		
	
		function selectShowtime(index) {
			model.showtimeIndex = index;
			model.title = model.showtimes[index].movie.title;
			model.year = model.showtimes[index].movie.year;
			model.rating = model.showtimes[index].movie.rating;
			model.director = model.showtimes[index].movie.director;
			model.actors = model.showtimes[index].movie.actors;
			model.ticketCount = model.showtimes[index].ticketCount;
			model.time = model.showtimes[index].time;
			model.price = model.showtimes[index].price;

		}
	}

})();
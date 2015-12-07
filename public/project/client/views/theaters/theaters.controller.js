"use strict";
(function() 
{
	angular
		.module("FlandangoProject")
		.controller("TheatersController", TheatersController);
		
	function TheatersController(TheaterService, $rootScope) 
	{
		var model = this;
		// Initial value for empty form
		model.theaterIndex = null;
		// Get user information from the rootscope
		var user = $rootScope.user;
		model.user = user;

		// will get the list of all theaters
		TheaterService.findAllTheaters().then(function(response)
		{
			model.theaters = response;
		});

		model.addTheater = addTheater;
		model.updateTheater = updateTheater;
		model.deleteTheater = deleteTheater;
		model.selectTheater = selectTheater;
		
		// Adds new theater to array of theaters
		function addTheater() {
			var newTheater = 
			{
				name : model.name,
				city : model.city,
				state : model.state,
				country : model.country,
				zipcode : model.zipcode

			};
			// create a new theater
			TheaterService.createTheater(newTheater).then(function(response)
			{
				// get the new updated list of theaters 
				TheaterService.findAllTheaters().then(function(response)
				{
					model.theaters = response;
				});
				// will de-select the form
				model.name = "";
				model.city = "";
				model.state = "";
				model.country = "";
				model.zipcode = "";
				model.theaterIndex = null;
			});
		}

		// Updates a theater in the array of theaters
		function updateTheater() {
			// get original form out of list
			var originalTheater = model.theaters[model.theaterIndex];
			// update its title
			originalTheater.name = model.name;
			originalTheater.city = model.city;
			originalTheater.state = model.state;
			originalTheater.country = model.country;
			originalTheater.zipcode = model.zipcode;
			TheaterService.updateTheaterById(originalTheater._id, originalTheater).then(function(response)
			{
				// get the new updated list of theaters
				TheaterService.findAllTheaters().then(function(response)
				{
					model.theaters = response;
				});
				// will de-select the form
				model.name = "";
				model.city = "";
				model.state = "";
				model.country = "";
				model.zipcode = "";
				model.theaterIndex = null;
			});
		}
		
		//deletes a theater from the array of theaters
		function deleteTheater(index) {
			// delete the theater
			TheaterService.deleteTheaterById(model.theaters[index]._id).then(function(response)
			{
				// get the new updated list of theaters
				TheaterService.findAllTheaters().then(function(response)
				{
					model.theaters = response;
				});
			});
		}
		
		// selects a theater
		function selectTheater(index) {
			model.theaterIndex = index;
			model.name = model.theaters[index].name;
			model.city = model.theaters[index].city;
			model.state = model.theaters[index].state;
			model.country = model.theaters[index].country;
			model.zipcode = model.theaters[index].zipcode;

		}
	}

})();
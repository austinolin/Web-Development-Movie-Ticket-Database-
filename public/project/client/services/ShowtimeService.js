"use strict";

(function() 
{
	angular
		.module("FlandangoProject")
		.factory("ShowtimeService", ShowtimeService);
		
	function ShowtimeService($http, $q) 
	{
		// List of methods the ShowtimeService has
		var service = 
		{
			createShowtimeForTheater: createShowtimeForTheater,
			getShowtimesForTheater: getShowtimesForTheater,
			getShowtimeForTheater: getShowtimeForTheater,
			deleteShowtimeFromTheater: deleteShowtimeFromTheater,
			updateShowtime: updateShowtime
		};
		return service;
		
		// creates a showtime for a specific theater
		function createShowtimeForTheater(id, showtime)
		{
			var deferred = $q.defer();		
			// POST the new showtime into the given form
			$http.post("/api/project/theater/" + id + "/showtime", showtime)
			.success(function(response)
			{
				deferred.resolve(response);
			});

			return deferred.promise;
		}
		
		// gets the showtimes for a specific theater
		function getShowtimesForTheater(id)
		{
			var deferred = $q.defer();
			// GET the showtimes from the theater that matches the id
			$http.get("/api/project/theater/" + id + "/showtime")
			.success(function(response) 
			{
				deferred.resolve(response);
			});

			return deferred.promise;
		}
		
		// gets a specific showtime from a specific theater
		function getShowtimeForTheater(theaterId, showtimeId)
		{
			var deferred = $q.defer();
			// GET the specified showtime from the specified theater
			$http.get("/api/project/theater/" + theaterId + "/showtime/" + showtimeId)
			.success(function(response)
			{
				deferred.resolve(response);
			});

			return deferred.promise;
		}
		
		// deletes a specific showtime from a specific theater
		function deleteShowtimeFromTheater(theaterId, showtimeId)
		{
			var deferred = $q.defer();
			// DELETE the specified showtime from the specified theater
			$http.delete("/api/project/theater/" + theaterId + "/showtime/" + showtimeId)
			.success(function(response) 
			{
				deferred.resolve(response);
			});

			return deferred.promise;
		}
		
		// updates a given showtime in a specific theater
		function updateShowtime(theaterId, showtimeId, showtime)
		{
			var deferred = $q.defer();	
			// PUT the updated showtime information in the specified showtime in the
			// specified theater
			$http.put("/api/project/theater/" + theaterId + "/showtime/" + showtimeId, showtime)
			.success(function(response) 
			{
				deferred.resolve(response);
			});

			return deferred.promise;
		}	

		// Generates unique id (CREDIT: from Piazza post)
	    function guid() 
	    {
	      function s4() 
	      {
	        return Math.floor((1 + Math.random()) * 0x10000)
	        .toString(16)
	        .substring(1);
	      }
	      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	        s4() + '-' + s4() + s4() + s4();
	    }
	}
})();
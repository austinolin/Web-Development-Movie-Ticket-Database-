
var q = require('q');

module.exports = function(mongoose, db) 
{
	
	var TheaterSchema = require('./theater.schema.js')(mongoose);
	var ShowtimeSchema = require('./showtime.schema.js')(mongoose);
	//var MovieSchema = require('./movie.schema.js')(mongoose);

	var TheaterModel = mongoose.model('Theater', TheaterSchema);
	var ShowtimeModel = mongoose.model('Showtime', ShowtimeSchema);
	//var MovieModel = mongoose.model('Movie', MovieSchema);

	var api = 
	{
		createTheater: createTheater,
		findAllTheaters: findAllTheaters,
		findTheaterById: findTheaterById,
		updateTheater: updateTheater,
		deleteTheater: deleteTheater,
		findTheaterByName: findTheaterByName,
		findMovieTheaters: findMovieTheaters,
		getShowtimesInTheater: getShowtimesInTheater,
		addShowtime: addShowtime,
		deleteShowtime: deleteShowtime,
		getShowtimeInTheater: getShowtimeInTheater,
		updateShowtime: updateShowtime,
		findTheaterByName: findTheaterByName
	};
	return api;
	

	// Will take in a theater instance, give it a unique id,
	// and then add it to the array of theaters 
	function createTheater(theater) 
	{
		var deferred = q.defer();
		// give form an empty list of fields
		theater.showtimes = [];
		// create the new form
		TheaterModel.create(theater, function(err, res)
		{
			// get the updated list of theaters
			TheaterModel.find(function(err, theaters)
			{
				deferred.resolve(theaters);
			})
		})

		return deferred.promise;
	}
	
	// Will return the entire list of theaters
	function findAllTheaters() 
	{
		var deferred = q.defer();
		// get the list of theaters
		TheaterModel.find(function(err, res)
		{
			deferred.resolve(res);
		});

		return deferred.promise;
	}
	
	// given a theater's id, will iterate through list of theater
	// if match is found, will return that theater
	// else return null
	function findTheaterById(id) 
	{
		var deferred = q.defer();
		// get the form using the id and return it
		TheaterModel.find(
			{ _id : id}, 
			function(err, res)
			{
				deferred.resolve(res[0]);
			}
		);

		return deferred.promise;
	}
	
	// given a theater's id and an updated theater, 
	// will iterate through list of theaters
	// if match is found, will update that theater with the new information
	function updateTheater(id, updatedTheater) 
	{

		var deferred = q.defer();
		// updated the given theater id with the updated theater information
		TheaterModel.update(
			{ _id : id},
			{
				name: updatedTheater.name,
				city: updatedTheater.city,
				state: updatedTheater.state,
				country: updatedTheater.country,
				zipcode: updatedTheater.zipcode,
				showtimes: updatedTheater.showtimes
			}, 
			function(err, res){
				// return the list of theaters
				TheaterModel.find(function(err, theaters)
				{
					deferred.resolve(theaters);
				}
			);
			});

		return deferred.promise;
	}
	
	// given a theater's id, will iterate through list of theaters
	// if match is found, will remove that theater from list of theaters
	function deleteTheater(id) 
	{

		var deferred = q.defer();
		// remove the theater with the given id from the list
		TheaterModel.remove({ _id : id}, function(err, res)
		{
			// get the list of theater
			TheaterModel.find(function(err, theaters)
			{
				deferred.resolve(theaters);
			});
		});

		return deferred.promise;
	}
	
	// given a name of a theater, will iterate through theaters
	// if names's match, will return that theater, else return null
	function findTheaterByName(name) 
	{

		var deferred = q.defer();
		// get the theater using the name
		TheaterModel.find({ name : name}, function(err, res)
		{
			deferred.resolve(res[0]);
		});

		return deferred.promise;
	}
	


	// given a movie's id, will iterate through list of theaters,
	// and return all that have the given movie as a showtime
	function findMovieTheaters(id) 
	{
		var deferred = q.defer();
		// get the theater using the movie's id
		TheaterModel.find({ movieId : id}, function(err, res)
		{
			deferred.resolve(res);
		});

		return deferred.promise;
	}
	
	// given a theater's id, will iterate through list of theaters
	// if matches id, return the theater's showtimes
	// else return null
	function getShowtimesInTheater(id) 
	{
		var deferred = q.defer();
		// get the Theater that matches the id
		TheaterModel.find({ _id : id}, function(err, res)
		{
			// return the showtimes of that theater
			deferred.resolve(res[0].showtimes);
		});

		return deferred.promise;
	}

	// Given an id for a theater and a showtime instance,
	// will give the showtime a unique id and then add it
	// to that theater's showtime list
	function addShowtime(id, showtime) 
	{
		var deferred = q.defer();

		// Will transfer the showtime information into a showtime model
		var addedShowtime = new ShowtimeModel();
		// Update label, type, placeholder, and options
		addedShowtime.ticketCount = showtime.ticketCount;
		addedShowtime.time = showtime.time;
		addedShowtime.price = showtime.price;
		addedShowtime.movie = showtime.movie;
		// var addedMovie = new MovieMode();
		// addedMovie.title = showtime.movie.title;
		// addedMovie.year = showtime.movie.year;
		// addedMovie.rating = showtime.movie.rating;
		// addedMovie.director = showtime.movie.director;
		// addedMovie.actors = showtime.movie.actors;
		// addedShowtime.movie = addedMovie;

		// find correct theater
		TheaterModel.findById(id, function(err, theater)
		{
			// add showtime to its showtimes
			theater.showtimes.push(addedShowtime);
			// save the theater
			theater.save(function(err, theater)
			{
				deferred.resolve(theater);
			});
		});

		return deferred.promise;
	}

	// Given a theater's id and the showtime's id, will
	// iterate through the list of theaters.
	// if the ids match, then will iterate through the
	// showtimes for that theater. if the showtime ids match, 
	// will remove that showtime from the list of showtimes
	function deleteShowtime(theaterId, showtimeId) 
	{
		var deferred = q.defer();
		// find the theater that matches the id
		TheaterModel.findById(theaterId, function(err, theater)
		{
			// remove the showtime that matches the id
			theater.showtimes.id(showtimeId).remove();
			// save it
			theater.save(function(err, theater)
			{
				deferred.resolve(theater);
			});
		});

		return deferred.promise;
	}
	
	// Given a theater's id and the showtime's id, will
	// iterate through the list of theaters.
	// if the ids match, then will iterate through the
	// showtimes for that theater. if the showtime ids match, 
	// will return that showtime
	// else return null
	function getShowtimeInTheater(theaterId, showtimeId) 
	{
		var deferred = q.defer();
		// find the theater using the id
		TheaterModel.findById(theaterId, function(err, theater)
		{
			// return the showtime using its id
			deferred.resolve(theater.showtimes.id(showtimeId));
		});
		
		return deferred.promise;
	}
	

	
	// // Given a theater's id, the showtime's id and an updated showtime, will
	// iterate through the list of theaters.
	// if the ids match, then will iterate through the
	// showtimes for that theater. if the showtime ids match, 
	// will replace the showtime info with the updated showtime
	function updateShowtime(theaterId, oldShowtimeId, updatedShowtime) 
	{
		var deferred = q.defer();
		// find the theater using its id
		TheaterModel.findById(theaterId, function(err, theater)
		{
			// update the old showtime with the updated information
			var oldShowtime = theater.showtimes.id(oldShowtimeId);
			oldShowtime.ticketCount = updatedShowtime.ticketCount;
			oldShowtime.time = updatedShowtime.time;
			oldShowtime.price = updatedShowtime.price;
			oldShowtime.movie = updatedShowtime.movie;

			// Save the form
			theater.save(function(err, theater)
			{
				deferred.resolve(theater);
			});
		});
		return deferred.promise;
	}

	function findTheaterByName(name) 
	{
		var deferred = q.defer();
		// get the form using the id and return it
		TheaterModel.find(
			{ name : name}, 
			function(err, res)
			{
				deferred.resolve(res[0]);
			}
		);

		return deferred.promise;
	}
};
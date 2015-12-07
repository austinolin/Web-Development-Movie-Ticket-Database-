
var q = require('q');

module.exports = function(mongoose, db) 
{
	
	var MovieSchema = require('./movie.schema.js')(mongoose);

	var MovieModel = mongoose.model('Movie', MovieSchema);

	var api = 
	{
		createMovie: createMovie,
		getAllMovies: getAllMovies,
		findMovieById: findMovieById,
		updateMovie: updateMovie,
		deleteMovie: deleteMovie,
		findMovieByName: findMovieByName
	};
	return api;
	

	
	function createMovie(movie) 
	{
		var deferred = q.defer();
		
		MovieModel.create(movie, function(err, res)
		{
			
			MovieModel.find(function(err, movies)
			{
				deferred.resolve(movies);
			})
		})

		return deferred.promise;
	}
	

	function getAllMovies() 
	{
		var deferred = q.defer();
		
		MovieModel.find(function(err, res)
		{
			deferred.resolve(res);
		});

		return deferred.promise;
	}
	
	
	function findMovieById(id) 
	{
		var deferred = q.defer();
		
		MovieModel.find(
			{ _id : id}, 
			function(err, res)
			{
				deferred.resolve(res[0]);
			}
		);

		return deferred.promise;
	}
	

	function updateMovie(id, updatedMovie) 
	{

		var deferred = q.defer();
		
		MovieModel.update(
			{ _id : id},
			{
				title: updatedMovie.name,
				year: updatedMovie.year,
				rating: updatedMovie.rating,
				director: updatedMovie.director,
				actors: updatedMovie.actors
			}, 
			function(err, res){
				
				MovieModel.find(function(err, movies)
				{
					deferred.resolve(movies);
				}
			);
			});

		return deferred.promise;
	}
	

	function deleteMovie(id) 
	{

		var deferred = q.defer();
		
		MovieModel.remove({ _id : id}, function(err, res)
		{
			
			MovieModel.find(function(err, movies)
			{
				deferred.resolve(movies);
			});
		});

		return deferred.promise;
	}
	

	function findMovieByName(name) 
	{

		var deferred = q.defer();
		
		MovieModel.find({ title : name}, function(err, res)
		{
			deferred.resolve(res[0]);
		});

		return deferred.promise;
	}
	

};
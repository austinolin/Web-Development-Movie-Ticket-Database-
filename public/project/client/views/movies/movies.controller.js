"use strict";
(function() 
{
	angular
		.module("FlandangoProject")
		.controller("MoviesController", MoviesController);
		
	function MoviesController(MovieService, $rootScope) 
	{
		var model = this;
		model.movieIndex = null;
		var user = $rootScope.user;
		model.user = user;

		MovieService.getAllMovies().then(function(response)
		{
			model.movies = response;
		});

		model.addMovie = addMovie;
		model.updateMovie = updateMovie;
		model.deleteMovie = deleteMovie;
		model.selectMovie = selectMovie;
		
	
		function addMovie() {
			var newMovie = 
			{
				title : model.title,
				year : model.year,
				rating : model.rating,
				director : model.director,
				actors : model.actors
			};
			
			MovieService.createMovie(newMovie).then(function(response)
			{
			
				MovieService.getAllMovies().then(function(response)
				{
					model.movies = response;
				});
			
				model.title = "";
				model.year = "";
				model.rating = "";
				model.director = "";
				model.actors = "";
				model.movieIndex = null;
			});
		}

		
		function updateMovie() {
		
			var originalMovie = model.movies[model.movieIndex];
		
			
			originalMovie.title = model.title;
			originalMovie.year = model.year;
			originalMovie.rating = model.rating;
			originalMovie.director = model.director;
			originalMovie.actors = model.actors;
			MovieService.updateMovieById(originalMovie._id, originalMovie).then(function(response)
			{
			
				MovieService.getAllMovies().then(function(response)
				{
					model.movies = response;
				});
			
				model.title = "";
				model.year = "";
				model.rating = "";
				model.director = "";
				model.actors = "";
				model.movieIndex = null;
			});
		}
		
	
		function deleteMovie(index) {
	
			MovieService.deleteMovieById(model.movies[index]._id).then(function(response)
			{
		
				MovieService.getAllMovies().then(function(response)
				{
					model.movies = response;
				});
			});
		}
		

		function selectMovie(index) {
			model.movieIndex = index;
			model.title = model.movies[index].title;
			model.year = model.movies[index].year;
			model.rating = model.movies[index].rating;
			model.director = model.movies[index].director;
			model.actors = model.movies[index].actors;

		}
	}

})();
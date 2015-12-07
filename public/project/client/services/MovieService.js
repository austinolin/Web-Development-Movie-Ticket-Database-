"use strict";
(function() 
{
  angular
    .module("FlandangoProject")
    .factory("MovieService", MovieService);
  
  function MovieService($http, $q) 
  {
    // List of methods the TheaterService has
    var service = {
      createMovie : createMovie,
      getAllMovies : getAllMovies,
      deleteMovieById : deleteMovieById,
      updateMovieById : updateMovieById,
      getMovieByName : getMovieByName
    };
    return service;
    
    // Creates a theater
    function createMovie(movie) 
    {
      var deferred = $q.defer();
      $http.post("/api/project/movie", movie)
      .success(function(response) 
      {
        deferred.resolve(response);
      });

      return deferred.promise;
    }
    
    function getAllMovies() 
    {
      var deferred = $q.defer();
      $http.get("/api/project/movie/")
      .success(function(response) 
      {
        deferred.resolve(response);
      });

      return deferred.promise;
    }

    
    function deleteMovieById(id) 
    {
      var deferred = $q.defer();
      $http.delete("/api/project/movie/" + id)
      .success(function(response) 
      {
        deferred.resolve(response);
      });

      return deferred.promise;
    }
    
    function updateMovieById(id, newMovie) 
    {
      var deferred = $q.defer();
      $http.put("/api/project/movie/" + id, newMovie)
      .success(function(response) 
      {
        deferred.resolve(response);
      });
      
      return deferred.promise;
    }

    function getMovieByName(name) 
    {
      var deferred = $q.defer();
      $http.get("/api/project/movie/" + name)
      .success(function(response) 
      {
        deferred.resolve(response);
      });

      return deferred.promise;
    }

     // Generates unique id
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

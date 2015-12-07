"use strict";
(function() 
{
  angular
    .module("FlandangoProject")
    .factory("TheaterService", TheaterService);
  
  function TheaterService($http, $q) 
  {
    // List of methods the TheaterService has
    var service = {
      createTheater : createTheater,
      findAllTheaters : findAllTheaters,
      deleteTheaterById : deleteTheaterById,
      getTheaterById : getTheaterById,
      getTheaterByName : getTheaterByName,
      updateTheaterById : updateTheaterById
    };
    return service;
    
    // Creates a theater
    function createTheater(theater) 
    {
      var deferred = $q.defer();
      // POST the form under the user that matches the id
      $http.post("/api/project/theater", theater)
      .success(function(response) 
      {
        deferred.resolve(response);
      });

      return deferred.promise;
    }
    
    // Will return all the theaters for a given movie id
    function findAllTheatersForMovie(id) 
    {
      var deferred = $q.defer();
      // GET the forms from the user that match the id
      $http.get("/api/project/theater/", id)
      .success(function(response) 
      {
        deferred.resolve(response);
      });

      return deferred.promise;
    }

    // Will return all the theaters 
    function findAllTheaters() 
    {
      var deferred = $q.defer();
      // GET the theaters
      $http.get("/api/project/theater/")
      .success(function(response) 
      {
        deferred.resolve(response);
      });

      return deferred.promise;
    }
    
    // Will delete a given theater
    function deleteTheaterById(id) 
    {
      var deferred = $q.defer();
      // DELETE the theater that matches the given id
      $http.delete("/api/project/theater/" + id)
      .success(function(response) 
      {
        deferred.resolve(response);
      });

      return deferred.promise;
    }
    
     // Will delete a given theater
    function getTheaterById(id) 
    {
      var deferred = $q.defer();
      // DELETE the theater that matches the given id
      $http.get("/api/project/theater/" + id)
      .success(function(response) 
      {
        deferred.resolve(response);
      });

      return deferred.promise;
    }

    function getTheaterByName(name) 
    {
      var deferred = $q.defer();
      // DELETE the theater that matches the given id
      $http.get("/api/project/theaterSearch/" + name)
      .success(function(response) 
      {
        deferred.resolve(response);
      });

      return deferred.promise;
    }

    // Updates a given theater
    function updateTheaterById(id, newTheater) 
    {
      var deferred = $q.defer();
      // PUT the new theater info into the theater that matches the id
      $http.put("/api/project/theater/" + id, newTheater)
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

"use strict";
(function() 
{
  angular
    .module("FlandangoProject")
    .factory("UserService", UserService);
    
  function UserService($http, $q)
  {
    // List of functions of the UserService
    var service = 
    {
      findUserByUsernameAndPassword : findUserByUsernameAndPassword,
      findAllUsers : findAllUsers,
      createUser : createUser,
      deleteUserById : deleteUserById,
      updateUser : updateUser
    };
    return service;

    // Will find a user using a username and a password 
    function findUserByUsernameAndPassword(username, password) 
    {
      var deferred = $q.defer();
      // GET user that matches the username and password
      $http.get("/api/project/user?username=" + username + "&password=" + password)
      .success(function(response) 
      {
        deferred.resolve(response);
      });

      return deferred.promise;
    }

    // returns list of users
    function findAllUsers() 
    {
      var deferred = $q.defer();
      // GET all the users
      $http.get("/api/project/user")
      .success(function(response) 
      {
        deferred.resolve(response);
      });  

      return deferred.promise;
    }

    // Creates a new user and adds it to array
    function createUser(user) 
    {
      var deferred = $q.defer();
      // POST the new user
      $http.post("/api/project/user", user)
      .success(function(response)
      {
        deferred.resolve(response);
      });    

      return deferred.promise;
    }

    // Deletes a user from the array
    function deleteUserById(id) 
    {
      var deferred = $q.defer();
      // DELETE the user that matches the given id
      $http.delete("/api/project/user/" + id)
      .success(function(response) 
      {
        deferred.resolve(response);
      });    

      return deferred.promise;
    }

    // Updates a user in the array
    function updateUser(id, updatedUser) 
    {
      var deferred = $q.defer();
      // PUT the update user info in the user that matches the id
      $http.put("/api/project/user/" + id, updatedUser)
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
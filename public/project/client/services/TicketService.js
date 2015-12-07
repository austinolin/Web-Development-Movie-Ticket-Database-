"use strict";
(function() 
{
  angular
    .module("FlandangoProject")
    .factory("TicketService", TicketService);
  
  function TicketService($http, $q) 
  {
    // List of methods the FormService has
    var service = {
      createTicketForUser : createTicketForUser,
      findAllTicketsForUser : findAllTicketsForUser
    };
    return service;
    
    // Creates a form for a specific user
    function createTicketForUser(id, ticket) 
    {
      var deferred = $q.defer();
      // POST the form under the user that matches the id
      $http.post("/api/project/user/" + id + "/ticket", ticket)
      .success(function(response) 
      {
        deferred.resolve(response);
      });

      return deferred.promise;
    }
    
    // Will return all the forms that the given user has
    function findAllTicketsForUser(id) 
    {
      var deferred = $q.defer();
      // GET the forms from the user that match the id
      $http.get("/api/project/user/" + id + "/ticket")
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

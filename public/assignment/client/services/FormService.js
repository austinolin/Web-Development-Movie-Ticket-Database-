"use strict";
(function() 
{
  angular
    .module("FormBuilderApp")
    .factory("FormService", FormService);
  
  function FormService($http, $q) 
  {
    // List of methods the FormService has
    var service = {
      createFormForUser : createFormForUser,
      findAllFormsForUser : findAllFormsForUser,
      deleteFormById : deleteFormById,
      updateFormById : updateFormById
    };
    return service;
    
    // Creates a form for a specific user
    function createFormForUser(id, form) 
    {
      var deferred = $q.defer();
      form.userId = id;
      // POST the form under the user that matches the id
      $http.post("/api/assignment/user/" + id + "/form", form)
      .success(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    }
    
    // Will return all the forms that the given user has
    function findAllFormsForUser(id) 
    {
      var deferred = $q.defer();
      // GET the forms from the user that match the id
      $http.get("/api/assignment/user/" + id + "/form")
      .success(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    }
    
    // Will delete a given form 
    function deleteFormById(id) 
    {
      var deferred = $q.defer();
      // DELETE the form that matches the given id
      $http.delete("/api/assignment/form/" + id)
      .success(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    }
    
    // Updates a given form 
    function updateFormById(id, newForm) 
    {
      var deferred = $q.defer();
      // PUT the new form info into the form that matches the id
      $http.put("/api/assignment/form/" + id, newForm)
      .success(function(response) {
        deferred.resolve(response);
      });
      return deferred.promise;
    }

     // Generates unique id
    function guid() 
    {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }
}
})();

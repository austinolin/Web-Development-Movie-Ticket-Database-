"use strict";
(function() 
{
  angular
    .module("FormBuilderApp")
    .factory("FormService", FormService);
  
  function FormService() {
    // Empty list of forms
    var forms = [];
    // List of methods the FormService has
    var service = {
      createFormForUser : createFormForUser,
      findAllFormsForUser : findAllFormsForUser,
      deleteFormById : deleteFormById,
      updateFormById : updateFormById
    };
    return service;
    
    // Creates a form for a specific user
    function createFormForUser(userId, form, callback) {
      form.userid = userId;
      form.id = guid();
      forms.push(form);
      // Callback function
      callback(form);
    }
    
    // Will return all the forms that the given user has
    function findAllFormsForUser(userId, callback) {
      // Initial empty form list for user's forms
      var formsByUser = [];
      // Iterate through forms
      for (var i = 0; i < forms.length; i++) {
        var form = forms[i];
        // If matches user, add to list
        if (form.userid == userId) {
          formsByUser.push(form);
        }
      }
      // Callback function
      callback(formsByUser);
    }
    
    // Will delete a given form 
    function deleteFormById(formId, callback) {
      // Iterate through forms
      for (var i = 0; i < forms.length; i++) {
        // If it matches form id, delete and end loop
        // since only one form per id
        if (forms[i].id == formId) {
          forms.splice(i, 1);
          break;
        }
      }
      // Callback function
      callback(forms);
    }
    
    // Updates a given form 
    function updateFormById(formId, newForm, callback) {
      // Iterates through forms
      for (var i = 0; i < forms.length; i++) {
        // Grabs the unchanged form from list
        var form = forms[i];
        // If matches id, then replaces the old with the new
        // then stops looking since only one would be updated
        if (form.id == formId) {
          newForm.id = form.id;
          newForm.userid = form.userid;
          forms[i] = newForm;
          // Callback function
          callback(newForm);
          break;
        }
      }
    }
    // Generates unique id (CREDIT: from Piazza post)
    function guid() {
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

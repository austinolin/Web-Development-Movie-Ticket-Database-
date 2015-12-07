"use strict";

(function() 
{
	angular
		.module("FormBuilderApp")
		.factory("FieldService", FieldService);
		
	function FieldService($http, $q) 
	{
		// List of methods the FieldService has
		var service = 
		{
			createFieldForForm: createFieldForForm,
			getFieldsForForm: getFieldsForForm,
			getFieldForForm: getFieldForForm,
			deleteFieldFromForm: deleteFieldFromForm,
			updateField: updateField
		};
		return service;
		
		// creates a field for a specific form
		function createFieldForForm(id, field)
		{
			var deferred = $q.defer();		
			// POST the new field into the given form
			$http.post("/api/assignment/form/" + id + "/field", field)
			.success(function(response)
			{
				deferred.resolve(response);
			});

			return deferred.promise;
		}
		
		// gets the fields for a specific form
		function getFieldsForForm(id)
		{
			var deferred = $q.defer();
			// GET the fields from the form that matches the id
			$http.get("/api/assignment/form/" + id + "/field")
			.success(function(response) 
			{
				deferred.resolve(response);
			});

			return deferred.promise;
		}
		
		// gets a specific field from a specific form
		function getFieldForForm(formId, fieldId)
		{
			var deferred = $q.defer();
			// GET the specified field from the specified form
			$http.get("/api/assignment/form/" + formId + "/field/" + fieldId)
			.success(function(response)
			{
				deferred.resolve(response);
			});

			return deferred.promise;
		}
		
		// deletes a specific field from a specific form
		function deleteFieldFromForm(formId, fieldId)
		{
			var deferred = $q.defer();
			// DELETE the specified field from the specified form
			$http.delete("/api/assignment/form/" + formId + "/field/" + fieldId)
			.success(function(response) 
			{
				deferred.resolve(response);
			});

			return deferred.promise;
		}
		
		// updates a given field in a specific form
		function updateField(formId, fieldId, field)
		{
			var deferred = $q.defer();	
			// PUT the updated field information in the specified field in the
			// specified form
			$http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field)
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
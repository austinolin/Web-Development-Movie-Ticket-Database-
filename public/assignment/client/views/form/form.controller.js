"use strict";
(function() 
{
	angular
		.module("FormBuilderApp")
		.controller("FormController", FormController);
		
	function FormController(FormService, $rootScope) 
	{
		var model = this;
		// Initial value for empty form
		model.formIndex = null;
		// Get user information from the rootscope
		var user = $rootScope.user;
		model.user = user;

		// will get the list of all forms created by the given user
		FormService.findAllFormsForUser(user.id).then(function(response)
		{
			model.forms = response;
		});

		model.addForm = addForm;
		model.updateForm = updateForm;
		model.deleteForm = deleteForm;
		model.selectForm = selectForm;
		
		// Adds new form to array of forms
		function addForm() {
			var newForm = {title : model.title};
			// create a new form
			FormService.createFormForUser(user.id, newForm).then(function(response)
			{
				// get the new updated list of forms by the user
				FormService.findAllFormsForUser(user.id).then(function(response)
				{
					model.forms = response;
				});
				// will de-select the form
				model.title = "";
				model.formIndex = null;
			});
		}

		// Updates a form in the array of forms
		function updateForm() {
			// get original form out of list
			var originalForm = model.forms[model.formIndex];
			// update its title
			originalForm.title = model.title;
			FormService.updateFormById(originalForm.id, originalForm).then(function(response)
			{
				// get the new updated list of forms by the user
				FormService.findAllFormsForUser(user.id).then(function(response)
				{
					model.forms = response;
				});
				// will de-select the form
				model.title = "";
				model.formIndex = null;
			});
		}
		
		//deletes a form from the array of forms
		function deleteForm(index) {
			// delete the form
			FormService.deleteFormById(model.forms[index].id).then(function(response)
			{
				// get the new updated list of forms by the user
				FormService.findAllFormsForUser(user.id).then(function(response)
				{
					model.forms = response;
				});
			});
		}
		
		// selects a form from the array of forms
		function selectForm(index) {
			model.formIndex = index;
			model.title = model.forms[index].title;
		}
	}

})();
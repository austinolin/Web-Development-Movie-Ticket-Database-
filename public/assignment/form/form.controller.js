"use strict";
(function() 
{
	angular
		.module("FormBuilderApp")
		.controller("FormController", FormController);
		
	function FormController($scope, FormService, $rootScope) {
		// Initial value for empty form
		$scope.formIndex = null;
		// Get user information from the rootscope
		var user = $rootScope.user;


		FormService.findAllFormsForUser(user.id, findAllFormsForUserCallback)
		$scope.addForm = addForm;
		$scope.updateForm = updateForm;
		$scope.deleteForm = deleteForm;
		$scope.selectForm = selectForm;
		
		// Adds new form to array of forms
		function addForm() {
			var newForm = {form_title : $scope.form_title};
			FormService.createFormForUser(user.id, newForm, addFormCallback)
		}

		// Updates a form in the array of forms
		function updateForm() {
			var originalForm = $scope.forms[$scope.formIndex];
			var updatedForm = {form_title : $scope.form_title};
			FormService.updateFormById(originalForm.id, updatedForm, updateFormCallback);
		}
		
		//deletes a form from the array of forms
		function deleteForm(index) {
			FormService.deleteFormById($scope.forms[index].id, deleteFormCallback);
		}
		
		// selects a form from the array of forms
		function selectForm(index) {
			$scope.formIndex = index;
			$scope.form_title = $scope.forms[index].form_title;
		}


		// CALLBACK FUNCTIONS

		// Returns the list of forms
		function findAllFormsForUserCallback(forms) {
			$scope.forms = forms;
		}
		// Returns list of forms with new form added
		function addFormCallback(form) {
			$scope.forms.push(form);
			// Refresh displayed forms
			FormService.findAllFormsForUser(user.id, findAllFormsForUserCallback);
			// Resets the form box to be empty
			$scope.form_title = "";
		}
		// Returns list of forms with specific form deleted
		function deleteFormCallback(forms) {
			$scope.forms = forms;
			// Refresh displayed forms
			FormService.findAllFormsForUser(user.id, findAllFormsForUserCallback);
		}
		// Returns updated list of forms
		function updateFormCallback(form) {
			// will update the displayed forms to account for the update
			FormService.findAllFormsForUser(user.id, findAllFormsForUserCallback);
			// Resets the form box to be empty
			$scope.form_title = "";
			// Resets the index so that the update button won't continue to
			// update that specific form afterwards
			$scope.formIndex = null;
		}
	}

})();
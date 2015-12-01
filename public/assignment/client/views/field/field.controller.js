"use strict";

(function() 
{
	angular
		.module("FormBuilderApp")
		.controller("FieldController", FieldController);
		
	function FieldController($scope, FieldService, $routeParams) 
	{
		var model = this;
		// get the user information and the form information from
		// the params
		var userId = $routeParams.userId;
		var formId = $routeParams.formId;
		model.addField = addField;
		model.deleteField = deleteField;


		FieldService.getFieldsForForm(formId).then(function(response) 
		{
			model.fields = response;
		});


		// given a type for the field, will create a new field
		// json object and add it to the specified form
		function addField(fieldType) 
		{
			if (fieldType == 'TEXT') {
				var field = 
				{
					"id": null, 
					"label": "New Text Field", 
					"type": "TEXT", 
					"placeholder": "new Field"
				};
			} else if (fieldType == 'TEXTAREA') {
				var field = 
				{
					"id": null, 
					"label": "New Text Field", 
					"type": "TEXTAREA", 
					"placeholder": "New Field"
				};
			} else if (fieldType == 'DATE') {
				var field = 
				{
					"id": null, 
					"label": "New Date Field", 
					"type": "DATE"
				};
			} else if (fieldType == 'OPTIONS') {
				var field = 
				{
					"id": null, 
					"label": "New Dropdown", 
					"type": "OPTIONS", 
					"options": [
						{"label": "Option 1", "value": "OPTION_1"},
						{"label": "Option 2", "value": "OPTION_2"},
						{"label": "Option 3", "value": "OPTION_3"}
					]
				};
			} else if (fieldType == 'CHECKBOXES') {
				var field = 
				{
					"id": null, 
					"label": "New Checkboxes", 
					"type": "CHECKBOXES", 
					"options": [
						{"label": "Option A", "value": "OPTION_A"},
						{"label": "Option B", "value": "OPTION_B"},
						{"label": "Option C", "value": "OPTION_C"}
					]
				};
			} else if (fieldType == 'RADIOS') {
				var field = 
				{
					"id": null, 
					"label": "New Radio Buttons", 
					"type": "RADIOS", 
					"options": [
						{"label": "Option X", "value": "OPTION_X"},
						{"label": "Option Y", "value": "OPTION_Y"},
						{"label": "Option Z", "value": "OPTION_Z"}
					]
				};
			}
			// create the field in the form
			FieldService.createFieldForForm(formId, field).then(function(response) 
			{
				// get the updated fields for the form
				FieldService.getFieldsForForm(formId).then(function(response) 
				{
					model.fields = response;
				});
			});
		}
		
		// given an index for a field, will delete that field from
		// the form
		function deleteField(field) 
		{
			// delete the field from the form using the form id and the field id
			FieldService.deleteFieldFromForm(formId, model.fields[field]._id).then(function(response) 
			{
				// get the updated list of fields from the form
				FieldService.getFieldsForForm(formId).then(function(response) 
				{
					model.fields = response;
				});
			});
		}
	}
})();

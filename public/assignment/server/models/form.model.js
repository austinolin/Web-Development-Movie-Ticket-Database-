var forms = require('./form.mock.json');

module.exports = function(node_uuid) 
{
	var api = 
	{
		createForm: createForm,
		findAllForms: findAllForms,
		findFormById: findFormById,
		updateForm: updateForm,
		deleteForm: deleteForm,
		findFormByTitle: findFormByTitle,
		findUserForms: findUserForms,
		getFieldsInForm: getFieldsInForm,
		addField: addField,
		deleteField: deleteField,
		getFieldInForm: getFieldInForm,
		updateField: updateField
	};
	return api;
	

	// Will take in a form instance, give it a unique id,
	// and then add it to the array of forms for the given
	// user id
	function createForm(form, userId) {
		// assign the form's userid
		form.userId = userId;
		// give form unique id using node-uuid
		form.id = node_uuid.v1();
		// give form an empty list of fields
		form.fields = [];
		// adds form to list of forms
		forms.push(form);
	}
	
	// Will return the entire list of forms
	function findAllForms() {
		return forms;
	}
	
	// given a form's id, will iterate through list of forms
	// if match is found, will return that form
	// else return null
	function findFormById(id) {
		// iterate through list of forms
		for (var i = 0; i < forms.length; i++) {
			// tests if id's match
			if (forms[i].id == id) {
				// return the form
				return forms[i];
			}
		}
		// form not found
		return null;
	}
	
	// given a form's id and an updated form, 
	// will iterate through list of forms
	// if match is found, will update that form with the new information
	function updateForm(id, updatedForm) {
		// iterates through form list
		for (var i = 0; i < forms.length; i++) {
			// tests if id's match
			if (forms[i].id == id) {
				// updates form to match new form
				forms[i] = updatedForm;
				break;
			}
		}
	}
	
	// given a form's id, will iterate through list of forms
	// if match is found, will remove that form from list of forms
	function deleteForm(id) {
		// iterates through list of forms
		for (var i = 0; i < forms.length; i++) {
			// tests if id's match
			if (forms[i].id == id) {
				// delete that form
				forms.splice(i, 1);
				break;
			}
		}
	}
	
	// given a title of a form, will iterate through forms
	// if title's match, will return that form, else return null
	function findFormByTitle(title) {
		// iterate through list of forms
		for (var i = 0; i < forms.length; i++) {
			// tests if title's match
			if (forms[i].title == title) {
				// return form
				return forms[i];
			}
		}
		// form not found
		return null;
	}
	


	// given a user's id, will iterate through list of forms,
	// and return all that belong the the user that matches the
	// id
	function findUserForms(id) {
		// initial list of user's forms
		var formsByUser = [];
		// iterate through list of forms
		for (var i = 0; i < forms.length; i++) {
			// tests if id's match
			if (forms[i].userId == id) {
				// adds form to list of forms by the user
				formsByUser.push(forms[i]);
			}
		}
		// returns list of user's forms
		return formsByUser;
	}
	
	// given a form's id, will iterate through list of forms
	// if matches id, return the form's fields
	// else return null
	function getFieldsInForm(id) {
		// iterates through list of forms
		for (var i = 0; i < forms.length; i++) {
			// tests if id's match
			if (forms[i].id == id) {
				return forms[i].fields;
			}
		}
		return null;
	}

	// Given an id for a form and a field instance,
	// will give the field a unique id and then add it
	// to that form's field list
	function addField(id, field) {
		// give field a unique id using node-uuid
		field.id = node_uuid.v1();
		// iterate through list of forms
		for (var i = 0; i < forms.length; i++) {
			// tests if id's match
			if (forms[i].id == id) {
				// adds the field to that form's
				// list of fields
				forms[i].fields.push(field);
				break;
			}
		}
	}

	// Given a form's id and the field's id, will
	// iterate through the list of forms.
	// if the ids match, then will iterate through the
	// fields for that form. if the field ids match, 
	// will remove that field from the list of fields
	function deleteField(formId, fieldId) {
		// iterates through list of forms
		for (var i = 0; i < forms.length; i++) {
			// tests if the form ids match
			if (forms[i].id == formId) {
				// get that form's fields
				var formFields = forms[i].fields;
				// iterate through the fields
				for (var j = 0; j < formFields.length; j++) {
					// tests to see if field ids match
					if (formFields[j].id == fieldId) {
						// remove the field from the list
						forms[i].fields.splice(j, 1);
						break;
					}
				}
			}
		}
	}
	
	// Given a form's id and the field's id, will
	// iterate through the list of forms.
	// if the ids match, then will iterate through the
	// fields for that form. if the field ids match, 
	// will return that field
	// else return null
	function getFieldInForm(formId, fieldId) {
		// iterates through list of forms
		for (var i = 0; i < forms.length; i++) {
			// tests if form ids match
			if (forms[i].id == formId) {
				// get the fields for that form
				var formFields = forms[i].fields;
				// iterate through the fields
				for (var j = 0; j < formFields.length; j++) {
					// if the field's ids match
					if (fields[j].id == fieldId) {
						// return the field
						return fields[j];
					}
				}
			}
		}
		// field/form not found
		return null;
	}
	

	
	// // Given a form's id, the field's id and an updated field, will
	// iterate through the list of forms.
	// if the ids match, then will iterate through the
	// fields for that form. if the field ids match, 
	// will replace the field info with the updated field
	function updateField(formId, oldFieldId, updatedField) {
		// iterates through list of forms
		for (var i = 0; i < forms.length; i++) {
			// tests if form ids match
			if (forms[i].id == formId) {
				// get the fields for that form
				var formFields = forms[i].fields;
				// iterate over the fields
				for (var j = 0; j < formFields.length; j++) {
					// if the field ids match
					if (fields[j].id == oldFieldId) {
						// replace the information in the old field with the
						// updated field information
						forms[i].fields[j] = updatedField;
						break; 
					}
				}
			}
		}
	}
};
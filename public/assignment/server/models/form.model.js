//var forms = require('./form.mock.json');
var q = require('q');

module.exports = function(mongoose, db) 
{
	
	var FormSchema = require('./form.schema.js')(mongoose);
	var FieldSchema = require('./field.schema.js')(mongoose);

	var FormModel = mongoose.model('Form', FormSchema);
	var FieldModel = mongoose.model('Field', FieldSchema);

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
	function createForm(form, userId) 
	{
		var deferred = q.defer();
		// assign the form's userid
		form.userId = userId;
		// give form an empty list of fields
		form.fields = [];
		// create the new form
		FormModel.create(form, function(err, res)
		{
			// get the updated list of forms
			FormModel.find(function(err, forms)
			{
				deferred.resolve(forms);
			})
		})

		return deferred.promise;
	}
	
	// Will return the entire list of forms
	function findAllForms() 
	{
		var deferred = q.defer();
		// get the list of forms
		FormModel.find(function(err, res)
		{
			deferred.resolve(res);
		});

		return deferred.promise;
	}
	
	// given a form's id, will iterate through list of forms
	// if match is found, will return that form
	// else return null
	function findFormById(id) 
	{
		var deferred = q.defer();
		// get the form using the id and return it
		FormModel.find(
			{ _id : id}, 
			function(err, res)
			{
				deferred.resolve(res[0]);
			}
		);

		return deferred.promise;
	}
	
	// given a form's id and an updated form, 
	// will iterate through list of forms
	// if match is found, will update that form with the new information
	function updateForm(id, updatedForm) 
	{

		var deferred = q.defer();
		// updated the given form id with the updated form information
		FormModel.update(
			{ _id : id},
			{
				title: updatedForm.title,
				userId: updatedForm.userId,
				fields: updatedForm.fields
			}, 
			function(err, res){
				// return the list of forms
				FormModel.find(function(err, forms)
				{
					deferred.resolve(forms);
				}
			);
			});

		return deferred.promise;
	}
	
	// given a form's id, will iterate through list of forms
	// if match is found, will remove that form from list of forms
	function deleteForm(id) 
	{

		var deferred = q.defer();
		// remove the form with the given id from the list
		FormModel.remove({ _id : id}, function(err, res)
		{
			// get the list of forms
			FormModel.find(function(err, forms)
			{
				deferred.resolve(forms);
			});
		});

		return deferred.promise;
	}
	
	// given a title of a form, will iterate through forms
	// if title's match, will return that form, else return null
	function findFormByTitle(title) 
	{

		var deferred = q.defer();
		// get the form using the title
		FormModel.find({ title : title}, function(err, res)
		{
			deferred.resolve(res[0]);
		});

		return deferred.promise;
	}
	


	// given a user's id, will iterate through list of forms,
	// and return all that belong the the user that matches the
	// id
	function findUserForms(id) 
	{
		var deferred = q.defer();
		// get the form using the user's id
		FormModel.find({ userId : id}, function(err, res)
		{
			deferred.resolve(res);
		});

		return deferred.promise;
	}
	
	// given a form's id, will iterate through list of forms
	// if matches id, return the form's fields
	// else return null
	function getFieldsInForm(id) 
	{
		var deferred = q.defer();
		// get the form that matches the id
		FormModel.find({ _id : id}, function(err, res)
		{
			// return the fields of that form
			deferred.resolve(res[0].fields);
		});

		return deferred.promise;
	}

	// Given an id for a form and a field instance,
	// will give the field a unique id and then add it
	// to that form's field list
	function addField(id, field) 
	{
		var deferred = q.defer();

		// Will transfer the field information into a field model
		var addedField = new FieldModel();
		// Update label, type, placeholder, and options
		addedField.label = field.label;
		addedField.fieldType = field.type;
		addedField.placeholder = field.placeholder;
		addedField.options = field.options;

		// find correct form
		FormModel.findById(id, function(err, form)
		{
			// add field to its fields
			form.fields.push(addedField);
			// save the form
			form.save(function(err, form)
			{
				deferred.resolve(form);
			});
		});

		return deferred.promise;
	}

	// Given a form's id and the field's id, will
	// iterate through the list of forms.
	// if the ids match, then will iterate through the
	// fields for that form. if the field ids match, 
	// will remove that field from the list of fields
	function deleteField(formId, fieldId) 
	{
		var deferred = q.defer();
		// find the form that matches the id
		FormModel.findById(formId, function(err, form)
		{
			// remove the field that matches the id
			form.fields.id(fieldId).remove();
			// save it
			form.save(function(err, form)
			{
				deferred.resolve(form);
			});
		});

		return deferred.promise;
	}
	
	// Given a form's id and the field's id, will
	// iterate through the list of forms.
	// if the ids match, then will iterate through the
	// fields for that form. if the field ids match, 
	// will return that field
	// else return null
	function getFieldInForm(formId, fieldId) 
	{
		var deferred = q.defer();
		// find the form using the id
		FormModel.findById(formId, function(err, form)
		{
			// return the field using its id
			deferred.resolve(form.fields.id(fieldId));
		});
		
		return deferred.promise;
	}
	

	
	// // Given a form's id, the field's id and an updated field, will
	// iterate through the list of forms.
	// if the ids match, then will iterate through the
	// fields for that form. if the field ids match, 
	// will replace the field info with the updated field
	function updateField(formId, oldFieldId, updatedField) 
	{
		var deferred = q.defer();
		// find the form using its id
		FormModel.findById(formId, function(err, form)
		{
			// update the old field with the updated information
			var oldField = form.fields.id(oldFieldId);
			// update the label, fieldtype, placeholder, and options
			oldField.label = updatedField.label;
			oldField.fieldType = updatedField.type;
			alert(updatedField.type);
			oldField.placeholder = updatedField.placeholder;
			oldField.options = updatedField.options;

			// Save the form
			form.save(function(err, form)
			{
				deferred.resolve(form);
			});
		});
		return deferred.promise;
	}
};
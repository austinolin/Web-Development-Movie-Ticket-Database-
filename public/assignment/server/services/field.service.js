module.exports = function(app, formModel) 
{
	
	// returns an array of fields belonging to a form object 
	// whose id is equal to the formId path parameter
	app.get("/api/assignment/form/:formId/field", function(req, res) 
	{
		// get the form's id from the request params
		// get all fields in that form
		res.json(formModel.getFieldsInForm(req.params.formId));
	});
	
	// returns a field object whose id is equal to the fieldId path parameter 
	// and belonging to a form object whose id is equal to the formId path parameter
	app.get("/api/assignment/form/:formId/field/:fieldId", function(req, res) 
	{
		// get field's id from the params
		// get form's id from the params
		// will get that field from the given form
		res.json(formModel.getFieldInForm(req.params.formId, req.params.fieldId));
	});
	
	// removes a field object whose id is equal to the fieldId path parameter and 
	// belonging to a form object whose id is equal to the formId path parameter
	app.delete("/api/assignment/form/:formId/field/:fieldId", function(req, res) 
	{
		// get field id from params
		// get form id from params
		// delete that field from the given form
		res.json(formModel.deleteField(req.params.formId, req.params.fieldId));
	});
	
	// creates a new field whose properties are the same as the field object embedded 
	// in the request's body and the field belongs to a form whose id is equal to the 
	// formId path parameter. The field object's id is initially null since it is a new record. 
	app.post("/api/assignment/form/:formId/field", function(req, res) 
	{
		// get the field from the request body
		// get the form id from the params
		// add the field to the given form
		res.json(formModel.addField(req.params.formId, req.body));
	});
	
	// updates a field object whose id is equal to the fieldId path parameter and belonging 
	// to a form object whose id is equal to the formId path parameter so that its 
	// properties are the same as the property values of the field object embedded in the 
	// request's body
	app.put("/api/assignment/form/:formId/field/:fieldId", function(req, res) 
	{
		// get the field object from the body
		// get the field id from the params
		// get the form id from the params
		// replace the field info that matches the field id with the
		// field object in the given form
		res.json(formModel.updateField(req.params.formId, req.params.fieldId, req.body));
	});
}
module.exports = function(app, formModel) 
{
	
	// returns an array of forms belonging to a user whose id is equal to the userId path parameter
	app.get("/api/assignment/user/:userId/form", function(req, res) 
	{
		// pulls the user's id from the params
		// finds the forms by that user
		formModel.findUserForms(req.params.userId).then(function(response)
		{
			res.json(response);
		});
		// res.json(formModel.findUserForms(req.params.userId));
	});
	
	// returns a form object whose id is equal to the formId path parameter
	app.get("/api/assignment/form/:formId", function(req, res) 
	{
		// pulls the form's id from the params
		// finds that form and returns it
		formModel.findFormById(req.params.formId).then(function(response)
		{
			res.json(response);
		});
		//res.json(formModel.findFormById(req.params.formId));
	});
	
	// removes a form object whose id is equal to the formId path parameter
	app.delete("/api/assignment/form/:formId", function(req, res) 
	{
		// pulls the form's id from the params
		// deletes that form from the list of forms
		formModel.deleteForm(req.params.formId).then(function(response)
		{
			res.json(response);
		});
		//res.json(formModel.deleteForm(req.params.formId));
	});
	
	// creates a new form whose properties are the same as the form object embedded 
	// in the HTTP request's body and the form belongs to a user whose id is equal to 
	// the userId path parameter. The form object's id is initially null since it is a 
	// new record. 
	app.post("/api/assignment/user/:userId/form", function(req, res) 
	{
		// pulls the form information from the body of the request
		// pulls the user's id from the params
		// will add that form to the list of forms for that user
		formModel.createForm(req.body, req.params.userId).then(function(response)
		{
			res.json(response);
		});
		//res.json(formModel.createForm(req.body, req.params.userId));
	});
	
	// updates a form object whose id is equal to the formId path 
	// parameter so that its properties are the same as the property values of the 
	// form object embedded in the request's body
	app.put("/api/assignment/form/:formId", function(req, res) 
	{
		// pulls the form information from the body of the request
		// pulls the form's id from the params
		// will replace the form information for the form that matches the
		// id with the new form
		formModel.updateForm(req.params.formId, req.body).then(function(response)
		{
			res.json(response);
		});
		//res.json(formModel.updateForm(req.params.formId, req.body));
	});

}
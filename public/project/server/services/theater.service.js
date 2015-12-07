module.exports = function(app, theaterModel) 
{
	


	// returns an array of theaters that are showing a given movie id
	app.get("/api/project/theater", function(req, res) 
	{
		
		// finds the theaters 
		theaterModel.findAllTheaters().then(function(response)
		{
			res.json(response);
		});
		// res.json(formModel.findUserForms(req.params.userId));
	});
	
	// returns a theater object whose id is equal to the theaterId path parameter
	app.get("/api/project/theater/:theaterId", function(req, res) 
	{
		// pulls the theater's id from the params
		// finds that theater and returns it
		theaterModel.findTheaterById(req.params.theaterId).then(function(response)
		{
			res.json(response);
		});
		//res.json(formModel.findFormById(req.params.formId));
	});
	
	app.get("/api/project/theaterSearch/:name", function(req, res) 
	{
		// pulls the theater's id from the params
		// finds that theater and returns it
		theaterModel.findTheaterByName(req.params.name).then(function(response)
		{
			res.json(response);
		});
		//res.json(formModel.findFormById(req.params.formId));
	});

	// removes a theater object whose id is equal to the theaterId path parameter
	app.delete("/api/project/theater/:theaterId", function(req, res) 
	{
		// pulls the theater's id from the params
		// deletes that theater from the list of theaters
		theaterModel.deleteTheater(req.params.theaterId).then(function(response)
		{
			res.json(response);
		});
		//res.json(formModel.deleteForm(req.params.formId));
	});

	// app.delete("/api/project/theater/:theaterId", function(req, res) 
	// {
	// 	// pulls the theater's id from the params
	// 	// deletes that theater from the list of theaters
	// 	theaterModel.findTheaterById(req.params.theaterId).then(function(response)
	// 	{
	// 		res.json(response);
	// 	});
	// 	//res.json(formModel.deleteForm(req.params.formId));
	// });
	
	// creates a new theater whose properties are the same as the theater object embedded 
	// in the HTTP request's body. The theater object's id is initially null since it is a 
	// new record. 
	app.post("/api/project/theater", function(req, res) 
	{
		// pulls the theater information from the body of the request
		// will add that theater to the list of forms for that user
		theaterModel.createTheater(req.body).then(function(response)
		{
			res.json(response);
		});
		//res.json(formModel.createForm(req.body, req.params.userId));
	});
	
	// updates a theater object whose id is equal to the theaterId path 
	// parameter so that its properties are the same as the property values of the 
	// theater object embedded in the request's body
	app.put("/api/project/theater/:theaterId", function(req, res) 
	{
		// pulls the theater information from the body of the request
		// pulls the theater's id from the params
		// will replace the theater information for the theater that matches the
		// id with the new theater
		theaterModel.updateTheater(req.params.theaterId, req.body).then(function(response)
		{
			res.json(response);
		});
		//res.json(formModel.updateForm(req.params.formId, req.body));
	});

}
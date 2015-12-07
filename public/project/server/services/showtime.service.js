module.exports = function(app, theaterModel) 
{
	
	// returns an array of showtimes belonging to a theater object 
	// whose id is equal to the theaterId path parameter
	app.get("/api/project/theater/:theaterId/showtime", function(req, res) 
	{
		// get the theater's id from the request params
		// get all showtimes for that theater
		theaterModel.getShowtimesInTheater(req.params.theaterId).then(function(response)
		{
			res.json(response);
		});
		//res.json(formModel.getFieldsInForm(req.params.formId));
	});
	
	// returns a showtime object whose id is equal to the showtimeId path parameter 
	// and belonging to a theater object whose id is equal to the theaterId path parameter
	app.get("/api/project/theater/:theaterId/showtime/:showtimeId", function(req, res) 
	{
		// get showtime's id from the params
		// get theater's id from the params
		// will get that showtime from the given form
		theaterModel.getShowtimeInTheater(req.params.theaterId, req.params.showtimeId).then(function(response)
		{
			res.json(response);
		});
		//res.json(formModel.getFieldInForm(req.params.formId, req.params.fieldId));
	});
	
	// removes a showtime object whose id is equal to the showtimeId path parameter and 
	// belonging to a theater object whose id is equal to the theaterId path parameter
	app.delete("/api/project/theater/:theaterId/showtime/:showtimeId", function(req, res) 
	{
		// get showtime id from params
		// get theater id from params
		// delete that showtime from the given theater
		theaterModel.deleteShowtime(req.params.theaterId, req.params.showtimeId).then(function(response)
		{
			res.json(response);
		});
		//res.json(formModel.deleteField(req.params.formId, req.params.fieldId));
	});
	
	// creates a new showtime whose properties are the same as the showtime object embedded 
	// in the request's body and the showtime belongs to a theater whose id is equal to the 
	// theaterId path parameter. The showtime object's id is initially null since it is a new record. 
	app.post("/api/project/theater/:theaterId/showtime", function(req, res) 
	{
		// get the field from the request body
		// get the form id from the params
		// add the field to the given form
		theaterModel.addShowtime(req.params.theaterId, req.body).then(function(response)
		{
			res.json(response);
		});
		//res.json(formModel.addField(req.params.formId, req.body));
	});
	
	// updates a showtime object whose id is equal to the showtimeId path parameter and belonging 
	// to a theater object whose id is equal to the theaterId path parameter so that its 
	// properties are the same as the property values of the showtime object embedded in the 
	// request's body
	app.put("/api/project/theater/:theaterId/showtime/:showtimeId", function(req, res) 
	{
		// get the showtime object from the body
		// get the showtime id from the params
		// get the theater id from the params
		// replace the showtime info that matches the showtime id with the
		// showtime object in the given theater
		theaterModel.updateShowtime(req.params.theaterId, req.params.showtimeId, req.body).then(function(response){
			res.json(response);
		});
		//res.json(formModel.updateField(req.params.formId, req.params.fieldId, req.body));
	});
}
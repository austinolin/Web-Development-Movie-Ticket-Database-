module.exports = function(app, movieModel) 
{
	


	
	app.get("/api/project/movie", function(req, res) 
	{
		
		
		movieModel.getAllMovies().then(function(response)
		{
			res.json(response);
		});
		// res.json(formModel.findUserForms(req.params.userId));
	});
	

	
	app.delete("/api/project/movie/:movieId", function(req, res) 
	{
		
		movieModel.deleteMovie(req.params.movieId).then(function(response)
		{
			res.json(response);
		});
		//res.json(formModel.deleteForm(req.params.formId));
	});
	
	
	app.post("/api/project/movie", function(req, res) 
	{
		
		movieModel.createMovie(req.body).then(function(response)
		{
			res.json(response);
		});
		//res.json(formModel.createForm(req.body, req.params.userId));
	});
	
	
	app.put("/api/project/movie/:movieId", function(req, res) 
	{
		
		movieModel.updateMovie(req.params.movieId, req.body).then(function(response)
		{
			res.json(response);
		});
		//res.json(formModel.updateForm(req.params.formId, req.body));
	});

	app.get("/api/project/movie/:name", function(req, res) 
	{
		
		// finds the theaters 
		movieModel.findMovieByName(req.params.name).then(function(response)
		{
			res.json(response);
		});
		// res.json(formModel.findUserForms(req.params.userId));
	});

}
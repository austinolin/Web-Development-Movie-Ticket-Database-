module.exports = function(app, ticketModel) 
{
	
	app.get("/api/project/user/:userId/ticket", function(req, res) 
	{
		
		ticketModel.findUserTickets(req.params.userId).then(function(response)
		{
			res.json(response);
		});
		// res.json(formModel.findUserForms(req.params.userId));
	});
	
	
	
	app.post("/api/project/user/:userId/ticket", function(req, res) 
	{
		
		ticketModel.createTicket(req.body, req.params.userId).then(function(response)
		{
			res.json(response);
		});
		//res.json(formModel.createForm(req.body, req.params.userId));
	});
	

}
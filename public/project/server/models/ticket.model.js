
var q = require('q');

module.exports = function(mongoose, db) 
{
	
	var TicketSchema = require('./ticket.schema.js')(mongoose);

	var TicketModel = mongoose.model('Ticket', TicketSchema);

	var api = 
	{
		createTicket: createTicket,
		findUserTickets: findUserTickets
	};
	return api;
	

	
	function createTicket(ticket, userId) 
	{
		var deferred = q.defer();
		TicketModel.create(ticket, function(err, res)
		{
			TicketModel.find(function(err, tickets)
			{
				deferred.resolve(tickets);
			})
		})

		return deferred.promise;
	}
	


	function findUserTickets(id) 
	{
		var deferred = q.defer();
		// get the form using the user's id
		TicketModel.find({ userId : id}, function(err, res)
		{
			deferred.resolve(res);
		});

		return deferred.promise;
	}
	

};
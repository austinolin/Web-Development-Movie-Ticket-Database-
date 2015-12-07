module.exports = function(mongoose) 
{
	var TicketSchema = mongoose.Schema(
	{
		"userId" : String,
		// string value representing name of the theater
		"title": String,
		// string value that represents the id of the user the form was created by
		"theatername": String,
		"rating": String,
		"time": String,
		"zipcode": String
	}, 
	{
		collection: "cs5610.project.ticket"
	});
	return TicketSchema;
};
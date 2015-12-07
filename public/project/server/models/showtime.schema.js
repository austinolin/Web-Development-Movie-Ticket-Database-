module.exports = function(mongoose) 
{
	var MovieSchema = require('./movie.schema.js')(mongoose);
	var ShowtimeSchema = mongoose.Schema(
	{
		
		"ticketCount": Number,
		"time": String, 
		"price": String,
		"movie": MovieSchema
	}, 
	{
		collection: "cs5610.project.showtime"
	});
	return ShowtimeSchema;
};
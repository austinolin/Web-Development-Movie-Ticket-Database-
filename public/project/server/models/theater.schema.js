module.exports = function(mongoose) 
{
	var ShowtimeSchema = require('./showtime.schema.js')(mongoose);
	var TheaterSchema = mongoose.Schema(
	{
		// string value representing name of the theater
		"name": String,
		// string value that represents the id of the user the form was created by
		"city": String,
		"state": String,
		"country": String,
		"zipcode": String,
		// an array of the showtimes the theater is showing
		"showtimes": [ShowtimeSchema]
	}, 
	{
		collection: "cs5610.project.theater"
	});
	return TheaterSchema;
};
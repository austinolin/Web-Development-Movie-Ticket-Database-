// Schema for a field object within a form

module.exports = function(mongoose) 
{
	var Movie = mongoose.Schema(
	{
		// the label to display above the field
		"title": String,
		"year": String,
		"rating": String,
		"director": String,
		"actors": String
	}, 
	{
		collection: "cs5610.project.movies"
	});
	return Movie;
};
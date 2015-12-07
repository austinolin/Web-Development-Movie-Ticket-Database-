module.exports = function(mongoose) 
{
	var FieldSchema = require('./field.schema.js')(mongoose);
	var FormSchema = mongoose.Schema(
	{
		// string value representing title of form
		"title": String,
		// string value that represents the id of the user the form was created by
		"userId": String,
		// an array of the fields in the form
		"fields": [FieldSchema]
	}, 
	{
		collection: "cs5610.assignment.form"
	});
	return FormSchema;
};
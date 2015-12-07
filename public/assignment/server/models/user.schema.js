module.exports = function(mongoose) 
{
	var User = mongoose.Schema(
	{
		// string value representing the user's first name
		"firstName": String, 
		// string value representing the user's last name
		"lastName": String,
		// string value representing the user's username
		"username": String,
		// string value representing the user's password
		"password": String,
		// string value representing the user's email
		"email": String
	}, 
	{
		collection: "cs5610.assignment.user"
	});
	return User;
};
module.exports = function(mongoose) 
{
	var User = mongoose.Schema(
	{
		// string value representing the user's name
		"name": String, 
		// string value representing the user's username
		"username": String,
		// string value representing the user's password
		"password": String,
		// string value representing the user's email
		"email": String,
		// date value representing the user's birthdate
		"birthdate": Date,
		"isAdmin": {type: Boolean, default: false}
	}, 
	{
		collection: "cs5610.project.user"
	});
	return User;
};

module.exports = function(app, userModel) 
{
	
	// creates a new user embedded in the body of the 
	// request, and responds with an array of all users
	app.post("/api/assignment/user", function(req, res) 
	{
		// pull user out of the request body
		// create the user and put it into the array,
		// then return the array of all users
		res.json(userModel.createUser(req.body));
	});
	
	// Will find user based on either username and password, just the username,
	// or will return all users if neither are provided
	app.get("/api/assignment/user", function(req, res) 
	{
		//tests to see if request has a username and password
		if (req.query.username && req.query.password) {
			// responds with a single user whose username property is 
			// equal to the username path parameter and its password is equal 
			// to the password path parameter
			var userCredentials = {
				"username":req.query.username, 
				"password":req.query.password
			};
			// find the user using the username and password credentials
			res.json(userModel.findUserByCredentials(userCredentials));

			// tests to see if the request has the username supplied
		} else if (req.query.username) {
			// responds with a single user whose username property is equal to the 
			// username path parameter
			// finds the user with the given username
			res.json(userModel.findUserByUsername(req.query.username));

			// neither username or password supplied, so return all users
		} else {
			// responds with an array of all users
			res.json(userModel.findAllUsers());
		}
	});
	
	// responds with a single user whose id property is equal to the id path parameter
	app.get("/api/assignment/user/:id", function(req, res) 
	{
		// pull user's id from params
		// find the user with that id in the array
		res.json(userModel.findUserById(req.params.id));
	});
	
	// updates an existing user whose id property is equal to the id path parameter. 
	// The new properties are set to the values in the user object embedded in the HTTP request. 
	// Responds with an array of all users
	app.put("/api/assignment/user/:id", function(req, res) 
	{
		// Pulls user information out from request body
		// pulls user id out from the params
		// will update the user with that id to match the new user info
		res.json(userModel.updateUser(req.params.id, req.body));
	});
	
	// removes an existing user whose id property is equal to the id path parameter. 
	// Responds with an array of all users
	app.delete("/api/assignment/user/:id", function(req, res) 
	{
		// pulls user id from the params
		// will delete the user with that id from the array
		res.json(userModel.deleteUser(req.params.id));		
	});
}
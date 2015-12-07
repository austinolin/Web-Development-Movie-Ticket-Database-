var q = require('q');

module.exports = function(mongoose, db) 
{

	var UserSchema = require('./user.schema.js')(mongoose);
	var UserModel = mongoose.model('User', UserSchema);

	var api = {
		createUser: createUser,
		findAllUsers: findAllUsers,
		findUserById: findUserById,
		updateUser: updateUser,
		deleteUser: deleteUser,
		findUserByUsername: findUserByUsername,
		findUserByCredentials: findUserByCredentials
	};
	return api;
	
	// Will take in a user instance, give it a unique id,
	// and then add it to the array of users
	function createUser(user) 
	{
		var deferred = q.defer();
		// create a new user
		UserModel.create(user, function(err, result)
		{
			// return the list of users
			UserModel.find(function(err, users)
			{
				deferred.resolve(users);
			});
		});

		return deferred.promise;
	}
	
	// returns the list of Users
	function findAllUsers() 
	{
		var deferred = q.defer();
		//  return the list of users
		UserModel.find(function(err, result)
		{
			deferred.resolve(result);
		});

		return deferred.promise;
	}
	
	// Given a user's id, will iterate through the list of users.
	// if a match is found, it will return the user
	// else, returns null
	function findUserById(id) 
	{
		var deferred = q.defer();
		// find the user using its id
		UserModel.find({ _id : id}, function(err, result)
		{
			deferred.resolve(result[0]);
		});

		return deferred.promise;
	}
	
	// given a user's id and the updated version of it,
	// will iterate through list of users until id match is found
	// if found, will replace the old user information with new user.
	// then return updated list of users
	function updateUser(id, updatedUser) 
	{
		var deferred = q.defer();
		// update a user that matches the given id
		UserModel.update(
			{ _id : id},
			{
				// Update the user's name, username, password, and email
				name: updatedUser.name,
				username: updatedUser.username,
				password: updatedUser.password,
				email: updatedUser.email,
				birthdate: updatedUser.birthdate,
				isAdmin: updatedUser.isAdmin 
			}, 
			function(err, result)
			{
				// return the list of users
				UserModel.find(function(err, results)
				{
					deferred.resolve(results);
				});
			});

		return deferred.promise;
	}
	
	// given a user's id, will iterate through the list of users
	// if a match is found, it will remove that user from the list
	// then return the updated list of users
	function deleteUser(id) 
	{
		var deferred = q.defer();
		// remove the user that matches the id
		UserModel.remove({ _id : id}, function(err, res)
		{
			// return the list of users
			UserModel.find(function(err, results)
			{
				deferred.resolve(results);
			});
		});

		return deferred.promise;
	}
	
	// given a username, will iterate through list of users
	// if a match is found, will return that user
	// else returns null
	function findUserByUsername(username) 
	{
		var deferred = q.defer();
		// return the user that matches the username
		UserModel.find({username : username}, function(err, res)
		{
			deferred.resolve(res[0]);
		});

		return deferred.promise;
	}
	
	// give the credentials of a user (username, password)
	// will iterate through the list of users
	// if a match is found, return that user
	// else return null
	function findUserByCredentials(credentials) 
	{
		var deferred = q.defer();
		// return the user that matches the username and password credentials
		UserModel.find(
		{ 
			username : credentials.username, 
			password : credentials.password
		},
			function(err, res)
			{
				deferred.resolve(res[0]);
			});

		return deferred.promise;
	}
};
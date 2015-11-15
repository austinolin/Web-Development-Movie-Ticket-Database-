var users = require('./user.mock.json');
module.exports = function(node_uuid) 
{
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
		// use node-uuid to generate a unique id
		user.id = node_uuid.v1();
		// push to list of users
		users.push(user);
		// return the updated list of users
		return users;
	}
	
	// returns the list of Users
	function findAllUsers() 
	{
		return users;
	}
	
	// Given a user's id, will iterate through the list of users.
	// if a match is found, it will return the user
	// else, returns null
	function findUserById(id) 
	{
		// iterate through the list of users
		for (var i = 0; i < users.length; i++) {
			// tests for an id match
			if (users[i].id == id) {
				// returns the user
				return users[i];
			}
		}
		// user not found
		return null;
	}
	
	// given a user's id and the updated version of it,
	// will iterate through list of users until id match is found
	// if found, will replace the old user information with new user.
	// then return updated list of users
	function updateUser(id, updatedUser) 
	{
		// iterate through list of users
		for (var i = 0; i < users.length; i++) {
			// tests for id match
			if (users[i].id == id) {
				// updates the user information
				users[i] = updatedUser;
				break;
			}
		}
		// return updated user list
		return users;
	}
	
	// given a user's id, will iterate through the list of users
	// if a match is found, it will remove that user from the list
	// then return the updated list of users
	function deleteUser(id) 
	{
		// iterate through list of users
		for (var i = 0; i < users.length; i++) {
			// tests for id match
			if (users[i].id == id) {
				// remove the user from the list
				users.splice(i, 1);
				break;
			}
		}
		// return updated user list
		return users;
	}
	
	// given a username, will iterate through list of users
	// if a match is found, will return that user
	// else returns null
	function findUserByUsername(username) 
	{
		// iterate through list of users
		for (var i = 0; i < users.length; i++) {
			// tests if usernames match
			if (users[i].username == username) {
				// return user
				return users[i];
			}
		}
		// user not found
		return null;
	}
	
	// give the credentials of a user (username, password)
	// will iterate through the list of users
	// if a match is found, return that user
	// else return null
	function findUserByCredentials(credentials) 
	{
		// iterate through list of users
		for (var i = 0; i < users.length; i++) {
			// if the username and password matches the user's
			if (users[i].username == credentials.username && 
				users[i].password == credentials.password) {
				// return user
				return users[i];
			}
		}
		// user not found 
		return null;
	}
};
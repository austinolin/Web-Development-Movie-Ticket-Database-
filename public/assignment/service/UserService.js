"use strict";
(function() 
{
  angular
    .module("FormBuilderApp")
    .factory("UserService", UserService);
    
  function UserService()
  {
    // Initial Array of Users
     var users = [];
    // List of functions of the UserService
    var service = {
      findUserByUsernameAndPassword : findUserByUsernameAndPassword,
      findAllUsers : findAllUsers,
      createUser : createUser,
      deleteUserById : deleteUserById,
      updateUser : updateUser
    };
    return service;

    // Will find a user using a username and a password 
    function findUserByUsernameAndPassword(username, password, callback) {
      // Iterate through list of users
      for (var i = 0; i < users.length; i++) {
        var user = users[i];
        // If the username and password matches, return user and end
        // loop
        if (user.username == username && user.password == password) {
          // Callback function
          callback(user);
          break;
        }
      }
      // Callback function
      // User not found, return null
      callback(null);
    }

    // returns list of users
    function findAllUsers(callback) {
      // Callback function
      callback(users);
    }

    // Creates a new user and adds it to array
    function createUser(user, callback) {
      //Generates new user id
      user.id = guid();
      // Adds it to array
      users.push(user);
      // Callback function
      callback(user);
    }

    // Deletes a user from the array
    function deleteUserById(id, callback) {
      // Iterate through list of users
      for (var i = 0; i < users.length; i++) {
        // If matches id, remove from array and
        // end loop since it was found
        if(users[i].id == id) {
          users.splice(i, 1);
          break;
        }
      }
      // Callback function
      callback(users);
    }

    // Updates a user in the array
    function updateUser(id, updatedUser, callback) {
      // Iterate through array of users
      for (var i = 0; i < users.length; i++) {
        // If ids match, replace old with new
        // then end loop
        if (users[i].id == id) {
          // Gives updated the same id, then replaces
          // "user" with updatedUser
          updatedUser.id = users[i].id;
          users[i] = updatedUser;
          // Callback function
          callback(users[i]);
          break;
        }
      }
    }

    // Generates unique id
    function guid() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }
    
  }
})();
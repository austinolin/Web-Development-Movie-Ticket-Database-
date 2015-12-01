// Will create models and pass them to the services
module.exports = function(app) 
{
	// node-uuid
	// var node_uuid = require('node-uuid');

	var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost/cs5610');
	var db = mongoose.connection;

	// Models
	var formModel = require('./models/form.model.js')(mongoose, db);
	var userModel = require('./models/user.model.js')(mongoose, db);

	// Services
	require('./services/field.service.js')(app, formModel);
	require('./services/user.service.js')(app, userModel);
	require('./services/form.service.js')(app, formModel);
};


// Will create models and pass them to the services
module.exports = function(app) 
{
	// node-uuid
	// var node_uuid = require('node-uuid');

	var mongoose = require('mongoose');
	// mongoose.connect('mongodb://localhost/cs5610');

	var connection = 'mongodb://127.0.0.1:27017/cs5610';

	if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
	    connection = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
	        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
	        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
	        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
	        process.env.OPENSHIFT_APP_NAME;
	}

	mongoose.connect(connection);
	var db = mongoose.connection;

	// Models
	var formModel = require('./models/form.model.js')(mongoose, db);
	var userModel = require('./models/user.model.js')(mongoose, db);

	// Services
	require('./services/field.service.js')(app, formModel);
	require('./services/user.service.js')(app, userModel);
	require('./services/form.service.js')(app, formModel);

	
};


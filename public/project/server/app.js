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

	// STILL NEED TO INCORPORATE MODELS/SERVICES (Movie, Theater = form, User, Ticket?)

	// Models
	var theaterModel = require('./models/theater.model.js')(mongoose, db);
	var userModel = require('./models/user.model.js')(mongoose, db);
	var movieModel = require('./models/movie.model.js')(mongoose, db);
	var ticketModel = require('./models/ticket.model.js')(mongoose, db);
	//var showtimeModel = require('./models/showtime.model.js')(mongoose, db);

	// Services
	require('./services/showtime.service.js')(app, theaterModel);
	require('./services/movie.service.js')(app, movieModel);
	require('./services/user.service.js')(app, userModel);
	require('./services/theater.service.js')(app, theaterModel);
	require('./services/ticket.service.js')(app, ticketModel);
};

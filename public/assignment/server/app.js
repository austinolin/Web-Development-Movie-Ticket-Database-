// Will create models and pass them to the services
module.exports = function(app) 
{
	// node-uuid
	var node_uuid = require('node-uuid');

	// Models
	var formModel = require('./models/form.model.js')(node_uuid);
	var userModel = require('./models/user.model.js')(node_uuid);

	// Services
	require('./services/field.service.js')(app, formModel);
	require('./services/user.service.js')(app, userModel);
	require('./services/form.service.js')(app, formModel);
};
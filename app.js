/*eslint-env node*/
//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------
var express = require('express'), 
    storage = require('./routes/Storage'), 
    media = require('./routes/Media'),
    security = require('./routes/Security'),
    http = require('http'), 
    cfenv = require('cfenv');

var app = express();

var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var logger = require('morgan');
var errorHandler = require('errorhandler');

// all environments
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// development only
if ('development' == app.get('env')) {
	app.use(errorHandler());
}

app.use('/api', storage);
app.use('/media', media);
app.use('/auth', security);

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});

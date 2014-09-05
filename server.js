// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/app'));

var port = process.env.PORT || 8080; 		// set our port

// ROUTES
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
	// do logging
	next();
});

// home page route
router.get('/', function(req, res) {
	res.sendFile(__dirname + '/app/index.html')	;
});

// routes for our API will happen here

var api = require('./api.js');
var request = require('request');

function createRequestUrl(baseUrl, params){
	var url = baseUrl + '?';
	for(p in params){
		url += p + '=' + params[p] + '&';
	}
	return url;
}

router.route('/psf/airports')
	.post(function(req, res){

		var params = {api_key: api.psf.key};
		var requestURL = createRequestUrl(api.psf.url+'airports', params);
		request(requestURL, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		    res.json(body);
		  }
		})

	})

router.route('/apr/airports')
	.post(function(req, res){

		var params = {key: api.apr.key};
		var requestURL = createRequestUrl(api.apr.url+'airports', params);
		request(requestURL, function (error, response, body) {
		  if (!error && response.statusCode == 200) {
		    res.json(body);
		  }
		})

	})

// router.route('/apr/search')
// 	.post(function(req, res){

// 		var requestURL = url + 'airports' + '?key=' + key;
// 		request(requestURL, function (error, response, body) {
// 		  if (!error && response.statusCode == 200) {
// 		    res.json(body);
// 		  }
// 		})
		
// 	})

// REGISTER OUR ROUTES -------------------------------
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
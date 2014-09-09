// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express'); 		// call express
var app        = express(); 				// define our app using express
var bodyParser = require('body-parser');

var env = process.env.NODE_ENV || 'DEVELOPMENT';

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var appFolder = (env == 'LIVE') ? '/build' : '/app';
app.use(express.static(__dirname + appFolder));
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
	res.sendFile(__dirname + appFolder + '/index.html')	;
});

// routes for our API will happen here

var api = require('./api.js');
var request = require('request');

function createRequestUrl(baseUrl, params){
	return baseUrl + '?' + createParamString(params);
}

function createParamString(params){
	var paramString = '';
	for(p in params){
		if(params[p] && params[p] != ''){
			paramString += p + '=' + encodeURIComponent(params[p]) + '&';	
		}
	}
	return paramString;
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

router.route('/psf/search')
	.post(function(req, res){

		var params = req.body;
		params.api_key = api.psf.key;
		params.airport_id = params.id;

		request.post({
			headers: {'content-type' : 'application/x-www-form-urlencoded'},
			url: api.psf.url+'search',
			body: createParamString(params)
		},
		function(error, response, body){
			var bodyData = JSON.parse(body);
			var searchID = bodyData.data.search_id;
			getResults(searchID);
			return;
		});

		function getResults(search_id){
			var newParams = {
				search_id: search_id,
				api_key: api.psf.key
			}

			request.post({
				headers: {'content-type' : 'application/x-www-form-urlencoded'},
				url: api.psf.url+'airport_hotels',
				body: createParamString(newParams)
			},
			function(error, response, body){
				res.json(body);
			})
		}

	})

router.route('/apr/search')
	.post(function(req, res){

		var params = req.body;
		params.key = api.apr.key;
		params.airport_id = params.code;

		request.post({
			headers: {'content-type' : 'application/x-www-form-urlencoded'},
			url: api.apr.url+'search',
			body: createParamString(params)
		},
		function(error, response, body){
			res.json(body);
		});

	})

// REGISTER OUR ROUTES -------------------------------
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
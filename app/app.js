angular.module('searchApp', ['ngRoute', 'aprLibrary', 'psfLibrary', 'ui.date', 'ui.bootstrap'])

	.config(['$routeProvider', function($routeProvider){

		$routeProvider
			.when('/', {
			    templateUrl : './views/home.html',
			    controller: 'SearchCtrl',
			    resolve: {
			    	psfAirportInfo: ['psfAirports', function(psfAirports){
			    		return psfAirports();
			    	}],
			    	aprAirportInfo: ['aprAirports', function(aprAirports){
			    		return aprAirports();
			    	}],
			    }
			})
			.when('/search', {
			    templateUrl : './views/search.html',
			    controller: 'ResultCtrl',

			})
			.when('/error', {
			    template : '<p>Error Page: Not Found</p>'
			})
			.otherwise({
			  redirectTo : '/error'
		  });

	}])

	.factory('SearchData', ['$rootScope', function($rootScope){
		var yo = "wtf"
		var searchData = {
			data: {},
			changeyo:function(){
				yo = "XXX";
			},
			c: function(){
				console.log(yo);
			}
		}
		return searchData;
	}])

	.controller('SearchCtrl', ['$scope', '$location', 'SearchData', 'aprAirportInfo', 'psfAirportInfo',
		function($scope, $location, SearchData, aprAirportInfo, psfAirportInfo){

			SearchData.c();
			SearchData.changeyo();

			// if(a === 'undefined') a = 400;
			b = (typeof b === 'undefined') ? 'default' : b


			// a = {
			// 	b: c || 'd'
			// }

			function getAirports(psf, apr){
				var airportsObjects = [];
				var airportsList = {};

				var whitelistedCountries = ["United States", "Canada"];
				var psfObject = createObject(psf).data;
				var psfCountriesLength = psfObject.length;
				for(var i=0; i<psfCountriesLength; i++){
					if(whitelistedCountries.indexOf(psfObject[i].country) != -1){
						var airports = psfObject[i].airports;
						var airportLength = airports.length;
						for(var j=0; j<airportLength; j++){
							airportsObjects.push(airports[j]);
							airportsList[airports[j].code] = "";
						}
					}					
				}

				var aprObject = createObject(apr).data;
				var aprLength = aprObject.length;
				for(var i=0; i<aprLength; i++){
					var singleAprAirport = aprObject[i];
					if(airportsList[singleAprAirport.code] == undefined){
						airportsObjects.push(singleAprAirport);
					}
				}

				airportsObjects.sort(function(a,b){
					var x = a.name;
					var y = b.name;

					if(typeof x == "string"){
						x = x.toLowerCase();
						y = y.toLowerCase();
					}

					 return ((x < y) ? -1 : ((x > y) ? 1 : 0));
				});

				return airportsObjects;
			}

			$scope.airports = getAirports(psfAirportInfo, aprAirportInfo);

			$scope.formSubmit = function(){
				console.log("YO");
				$location.path('/search');
			}

			function createObject(o){
				return (JSON.parse(JSON.parse(o)));
			}

	}])

	.controller('ResultCtrl', ['$scope', 'SearchData',
		function($scope, SearchData){

			SearchData.c();

	}])
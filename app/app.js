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
			    resolve: {
			    	aprSearchInfo: ['SearchData', 'aprSearch', function(SearchData, aprSearch){
			    		return aprSearch(SearchData);
			    	}],
			    	psfSearchInfo: ['SearchData', 'psfSearch', function(SearchData, psfSearch){
			    		return psfSearch(SearchData);
			    	}],

			    }

			})
			.when('/error', {
			    template : '<p>Error Page: Not Found</p>'
			})
			.otherwise({
			  redirectTo : '/error'
		  });

	}])

	.factory('SearchData', ['$rootScope', function($rootScope){
		return {};
	}])

	.controller('SearchCtrl', ['$scope', '$location', 'SearchData', 'aprAirportInfo', 'psfAirportInfo',
		function($scope, $location, SearchData, aprAirportInfo, psfAirportInfo){

			var datePickers = function(){
				function beginningDateSelected(){
					initEndDatePicker();
				}

				function defaultEndingDate(){
					return function(){
						var endDate = (typeof $scope.checkin === 'undefined') ? new Date() : new Date($scope.checkin);
						endDate.setDate(endDate.getDate() + 1);
						return endDate;
					}();					
				}

				function initBeginDatePicker(){
					$scope.beginningDate = {
						minDate: new Date(),
						onSelect: beginningDateSelected
					};
				}

			 	function initEndDatePicker(){
					$scope.endDate = {
						minDate: defaultEndingDate(),
					}
				}

				return function(){
					initBeginDatePicker();
					initEndDatePicker();
				}()
			}();



			function getAirports(psf, apr){
				var airportsObjects = [];
				var airportsList = {};

				var whitelistedCountries = ["United States", "Canada"];
				var psfObject = JSON.parse(JSON.parse(psf)).data;
				var psfCountriesLength = psfObject.length;
				for(var i=0; i<psfCountriesLength; i++){
					if(whitelistedCountries.indexOf(psfObject[i].country) != -1){
						var airports = psfObject[i].airports;
						var airportLength = airports.length;
						for(var j=0; j<airportLength; j++){
							var sAirport = airports[j];
							sAirport.full_name = sAirport.name + " (" + sAirport.code + ")";
							airportsObjects.push(sAirport);
							airportsList[sAirport.code] = "";
						}
					}					
				}

				var aprObject = JSON.parse(JSON.parse(apr)).data;
				var aprLength = aprObject.length;
				for(var i=0; i<aprLength; i++){
					var singleAprAirport = aprObject[i];
					if(airportsList[singleAprAirport.code] == undefined){
						var sAirport = singleAprAirport;
						sAirport.full_name = sAirport.name + " (" + sAirport.code + ")";
						airportsObjects.push(sAirport);
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

				if(!$scope.location){
					alert("Please select a location");
					return;
				}

				SearchData.location = $scope.location;
				SearchData.checkinDate = $scope.checkin;
				SearchData.checkoutDate = $scope.checkout;
				$location.path('/search');
			}

	}])

	.controller('ResultCtrl', ['$scope', 'aprSearchInfo', 'psfSearchInfo', '$sce',
		function($scope, aprSearchInfo, psfSearchInfo, $sce){
			var allResults = [];

			var aprSearchResults = JSON.parse(JSON.parse(aprSearchInfo));
			var aprLength = aprSearchResults.data.length;
			for(var i=0; i<aprLength; i++){
				var o = aprSearchResults.data[i];
				var n = {};
				n.source = "AirportParkingReservations";
				n.name = o.name;
				n.daily_rate = o.daily_rate;
				n.distance_to_airport = o.distance_to_airport;
				n.shuttle = o.avg_shuttle_wait_time;
				n.rating = o.average_rating;
				n.logo = o.logo;
				n.latitude = o.information.latitude;
				n.longitude = o.information.longitude;
				n.information = $sce.trustAsHtml('<p>' + o.information.airport_transportation + '</p><p>' + o.information.arrival_information + '</p><p>' + o.information.operation_hours + '</p>');

				allResults.push(n);
			}

			var psfSearchResults = JSON.parse(JSON.parse(psfSearchInfo));
			var psfLength = psfSearchResults.data.hotels.length;
			for(var i=0; i<psfLength; i++){
				var o = psfSearchResults.data.hotels[i];
				var n = {};
				n.source = "ParkSleepFly";
				n.name = o.name;
				n.daily_rate = o.overview.avg_price;
				n.distance_to_airport = o.overview.distance_to_airport;
				n.shuttle = o.overview.avg_shuttle_wait_time;
				n.rating = o.overview.average_rating;
				n.logo = o.info.logo;
				n.latitude = o.address.latitude;
				n.longitude = o.address.longitude;
				n.information = $sce.trustAsHtml('<p>' + o.info.description + '</p><p>' + o.info.directions + '</p><p>' + o.info.parking_description + '</p>');

				allResults.push(n);
			}

			$scope.parkingData = allResults;

			$scope.active = '';
			$scope.setActive = function(s){
				$scope.active = s;
			}

			$scope.order = {'label':'', 'sort':'', 'order':''};
			$scope.orders = [
				{'label': 'Name', 'sort': 'name'},
				{'label': 'Daily Rate', 'sort': 'daily_rate'},
				{'label': 'Distance to Airport', 'sort': 'distance_to_airport'},
				{'label': 'Rating', 'sort': 'rating', 'order':true}
			];

			$scope.aprSearchResults = aprSearchResults.data;
			$scope.psfSearchResults = psfSearchResults.data.hotels;

	}])
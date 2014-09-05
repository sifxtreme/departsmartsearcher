angular.module('searchApp', ['ngRoute', 'uberLibrary', 'aprLibrary', 'psfLibrary', 'ui.date'])

	.config(['$routeProvider', function($routeProvider){

		$routeProvider
			.when('/', {
			    templateUrl : './views/home.html',
			    controller: 'HomeCtrl'
			})
			.when('/countries', {
			    templateUrl : './views/countries.html',
			    controller : 'CountriesCtrl',
			    resolve: {
			    	countries: ['ccCountries', function(ccCountries){
			    		return ccCountries();
			    	}]
			    }
			})
			.when('/countries/:country', {
			    templateUrl : './views/country.html',
			    controller : 'CountryCtrl',
			    resolve: {
			    	countryInfo: ['$route', 'ccCountry', function($route, ccCountry){
			    		return ccCountry($route.current.params.country);
			    	}]
			    }
			})
			.when('/error', {
			    template : '<p>Error Page: Not Found</p>'
			})
			.otherwise({
			  redirectTo : '/error'
		  });

	}])

	.controller('UberSearchCtrl', ['$scope', 'uberProducts', 'uberPrice', 'uberTime',
		function($scope, uberProducts, uberPrice, uberTime){	

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position){
			  $scope.$apply(function(){
			    $scope.coordinates = position.coords;
			    callUberFunctions();
			  });
			});
		}

		function callUberFunctions(){
			var latitude = $scope.coordinates.latitude;
			var longitude = $scope.coordinates.longitude;
			var laxLat = "33.9425";
			var laxLong = "-118.4081";

			uberProducts(latitude, longitude).then(function(data){
				$scope.productData = data;
				console.log(data);
			});

			uberPrice(latitude, longitude, laxLat, laxLong).then(function(data){
				$scope.priceData = data;
				console.log(data);
			});

			uberTime(latitude, longitude).then(function(data){
				$scope.timeData = data;
				console.log(data);
			});

		}

	}])

	.controller('AprSearchCtrl', ['$scope', 'aprAirports',
		function($scope, aprAirports){	

		function callAprFunction(){

			aprAirports().then(function(data){
				console.log(data);
			});

		}

		callAprFunction();


	}])

	.controller('PsfSearchCtrl', ['$scope', 'psfAirports',
		function($scope, psfAirports){	

		function callPsfFunction(){

			psfAirports().then(function(data){
				var returnedData = data;
				var dataObject = JSON.parse(returnedData);
				console.log(JSON.parse(dataObject));
			});

		}

		callPsfFunction();


	}])


	<!-- <div class="container" ng-controller="UberSearchCtrl">
	<div ng-if="coordinates">
		<p>LATITUDE: {{coordinates.latitude}}</p>
		<p>LONGITUDE: {{coordinates.longitude}}</p>
	</div>

	<div ng-if="productData">
		<h2>Products</h2>
		<div ng-repeat="p in productData.products">
			<p><img ng-src="{{p.image}}"/></p>
			<p>Display Name: {{p.display_name}}</p>
			<p>Description: {{p.description}}</p>
			<p>Capacity: {{p.capacity}}</p>
		</div>
	</div>

	<div ng-if="priceData">
		<h2>Prices</h2>
		<div ng-repeat="p in priceData.prices">
			<p>{{p.display_name}}: {{p.estimate}}</p>
		</div>
	</div>

	<div ng-if="timeData">
		<h2>Times</h2>
		<div ng-repeat="t in timeData.times">
			<p>{{t.display_name}}: {{t.estimate/60 | number:1}}</p>
		</div>
	</div>
</div> -->
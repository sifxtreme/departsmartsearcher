angular.module('searchApp', ['uberLibrary', 'aprLibrary', 'psfLibrary', 'ui.date'])

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
				console.log(data);
			});

		}

		callPsfFunction();


	}])
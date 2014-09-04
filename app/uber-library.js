angular.module('uberLibrary', [])
	.constant('UBER_URL', 'https://api.uber.com/v1/')
	.constant('UBER_SERVER', 'xx')
	.factory('uberCall', ['$http', '$q', 'UBER_URL', 'UBER_SERVER',
						    function($http,   $q,   UBER_URL,   UBER_SERVER){
		
		return function(endpoint, params){
			var params = params || {};
			params.server_token = UBER_SERVER;
			params.type = 'JSON';
			var defer = $q.defer();
			$http({
					url: UBER_URL + endpoint,
					method: 'GET',
					cache: true,
					params: params,
				})
				.success(function(data){
					defer.resolve(data);
				})
				.error(function(data, status){
					defer.resolve({});
				})
				return defer.promise;
			}

			
	}])

	.factory('uberProducts', ['uberCall',
								    function(uberCall){
		return function(latitude, longitude){
			return uberCall('products', {latitude: latitude, longitude: longitude});
		}		
	}])

	.factory('uberPrice', ['uberCall',
								 function(uberCall){
		return function(start_lat, start_long, end_lat, end_long){
			return uberCall('estimates/price', {start_latitude: start_lat, start_longitude: start_long, end_latitude: end_lat, end_longitude: end_long});
		}		
	}])

	.factory('uberTime', ['uberCall',
								    function(uberCall){
		return function(latitude, longitude){
			return uberCall('estimates/time', {start_latitude: latitude, start_longitude: longitude});
		}		
	}])
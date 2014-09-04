angular.module('aprLibrary', [])
	.constant('APR_URL', 'http://apitest.airportparkingreservations.com/v4/')
	.constant('APR_KEY', 'xx')
	.factory('aprCall', ['$http', '$q', 'APR_URL', 'APR_KEY',
						   function($http,   $q,   APR_URL,   APR_KEY){
		
		return function(endpoint, params){
			var params = params || {};
			params.key = APR_KEY;
			params.type = 'JSON';
			var defer = $q.defer();
			$http({
					url: APR_URL + endpoint,
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

	.factory('aprAirports', ['aprCall',
								   function(aprCall){
		return function(){
			return aprCall('airports');
		}		
	}])
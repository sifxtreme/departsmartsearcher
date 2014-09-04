angular.module('psfLibrary', [])
	.constant('PSF_URL', 'https://parksleepfly.com/api/v1/')
	.constant('PSF_KEY', 'xx')
	.factory('psfCall', ['$http', '$q', 'PSF_URL', 'PSF_KEY',
						   function($http,   $q,   PSF_URL,   PSF_KEY){
		
		return function(endpoint, params){
			var params = params || {};
			params.api_key = PSF_KEY;
			params.type = 'JSON';
			var defer = $q.defer();
			$http({
					url: PSF_URL + endpoint,
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

	.factory('psfAirports', ['psfCall',
								   function(psfCall){
		return function(){
			return psfCall('airports');
		}		
	}])
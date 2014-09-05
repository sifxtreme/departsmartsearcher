angular.module('psfLibrary', [])
	.factory('psfCall', ['$http', '$q',
						   function($http,   $q){
		
		return function(endpoint, params){
			var params = params || {};
			var defer = $q.defer();
			$http({
					url: '/psf/' + endpoint,
					method: 'POST',
					cache: true,
					data: params,
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
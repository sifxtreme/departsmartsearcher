angular.module('aprLibrary', [])
	.factory('aprCall', ['$http', '$q',
						   function($http,   $q){
		
		return function(endpoint, params){
			var params = params || {};
			var defer = $q.defer();
			$http({
					url: '/apr/' + endpoint,
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

	.factory('aprAirports', ['aprCall',
								   function(aprCall){
		return function(){
			return aprCall('airports');
		}		
	}])

	.factory('aprSearch', ['aprCall', function(aprCall){
		return function(data){
			return aprCall('search', data);
		} 
	}])	
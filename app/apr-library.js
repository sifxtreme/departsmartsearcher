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
			var dataToSend = {};
			
			var startDate = new Date();
			var endDate = new Date();
			startDate.setDate(startDate.getDate() + 1);
			endDate.setDate(endDate.getDate() + 2);
			dataToSend.checkindate = data.checkinDate || startDate.toLocaleDateString();
			dataToSend.checkoutdate = data.checkoutDate || endDate.toLocaleDateString();

			dataToSend.checkintime = '12:00';
			dataToSend.checkouttime = '12:00';

			dataToSend.code = (data.location) ? data.location.code : 'LAX';

			return aprCall('search', dataToSend);
		} 
	}])	
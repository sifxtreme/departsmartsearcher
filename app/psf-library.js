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

	.factory('psfSearch', ['psfCall', function(psfCall){
		return function(data){
			var dataToSend = {};
			
			var startDate = new Date();
			var endDate = new Date();
			startDate.setDate(startDate.getDate() + 1);
			endDate.setDate(endDate.getDate() + 2);
			dataToSend.date1 = data.checkinDate || startDate.toLocaleDateString();
			dataToSend.date2 = data.checkoutDate || endDate.toLocaleDateString();

			dataToSend.package_type = 'PSF';
			dataToSend.guests = 2;
			dataToSend.rooms = 1;
			
			dataToSend.id = (data.location) ? data.location.airport_id : 7;

			return psfCall('search', dataToSend);
		} 
	}])	
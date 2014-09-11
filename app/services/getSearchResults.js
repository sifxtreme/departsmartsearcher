angular.module('searchApp')
	.factory('getSearchResults', ['$sce', function($sce){
		return function(apr, psf){
			var allResults = [];

			var aprSearchResults = convertToJSON(apr).data || {};
			var aprLength = aprSearchResults.length;
			for(var i=0; i<aprLength; i++){
				var o = aprSearchResults[i];
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

			var psfSearchResults = convertToJSON(psf).data || {};
			psfSearchResults = psfSearchResults.hotels || {};
			var psfLength = psfSearchResults.length;
			for(var i=0; i<psfLength; i++){
				var o = psfSearchResults[i];
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

			return allResults;
		};
	}])
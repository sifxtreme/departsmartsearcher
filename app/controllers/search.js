angular.module('searchApp')
	.controller('ResultCtrl', ['$scope', 'getSearchResults', 'aprSearchInfo', 'psfSearchInfo',
		function($scope, getSearchResults, aprSearchInfo, psfSearchInfo){

			$scope.parkingData = getSearchResults(aprSearchInfo, psfSearchInfo);

			$scope.active = '';
			$scope.setActive = function(s){
				$scope.active = s;
			}

			$scope.order = {'label':'', 'sort':'', 'order':''};
			$scope.orders = [
				{'label': 'Name', 'sort': 'name'},
				{'label': 'Daily Rate', 'sort': 'daily_rate'},
				{'label': 'Distance to Airport', 'sort': 'distance_to_airport'},
				{'label': 'Rating', 'sort': 'rating', 'order':true}
			];

	}])
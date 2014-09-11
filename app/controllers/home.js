angular.module('searchApp')
	.controller('SearchCtrl', ['$scope', '$location', 'SearchData', 'getAirports', 'aprAirportInfo', 'psfAirportInfo',
		function($scope, $location, SearchData, getAirports, aprAirportInfo, psfAirportInfo){

			$scope.airports = getAirports(aprAirportInfo, psfAirportInfo);
			
			var datePickers = function(){
				function beginningDateSelected(){
					initEndDatePicker();
				}

				function defaultEndingDate(){
					var endDate = (typeof $scope.checkin === 'undefined') ? new Date() : new Date($scope.checkin);
					endDate.setDate(endDate.getDate() + 1);
					return endDate;					
				}

				function initBeginDatePicker(){
					$scope.beginningDate = {
						minDate: new Date(),
						onSelect: beginningDateSelected
					};
				}

			 	function initEndDatePicker(){
					$scope.endDate = {
						minDate: defaultEndingDate(),
					}
				}

				return function(){
					initBeginDatePicker();
					initEndDatePicker();
				}()
			}();

			$scope.formSubmit = function(){

				if(!$scope.location){
					alert("Please select a location");
					return;
				}

				SearchData.location = $scope.location;
				SearchData.checkinDate = $scope.checkin;
				SearchData.checkoutDate = $scope.checkout;
				$location.path('/search');
			}

	}])
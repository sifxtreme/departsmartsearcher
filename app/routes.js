angular.module('searchApp')
	.run(['$rootScope', '$location', '$timeout', function($rootScope, $location, $timeout) {
	    $rootScope.$on('$routeChangeError', function() {
	        $location.path("/error");
	    });
	    $rootScope.$on('$routeChangeStart', function() {
	        $rootScope.isLoading = true;
	    });
	    $rootScope.$on('$routeChangeSuccess', function() {
	      $timeout(function() {
	        $rootScope.isLoading = false;
	      }, 1000);
	    });
	}])
	.config(['$routeProvider', function($routeProvider){

		$routeProvider
			.when('/', {
			    templateUrl : './views/home.html',
			    controller: 'SearchCtrl',
			    resolve: {
			    	psfAirportInfo: ['psfAirports', function(psfAirports){
			    		return psfAirports();
			    	}],
			    	aprAirportInfo: ['aprAirports', function(aprAirports){
			    		return aprAirports();
			    	}],
			    }
			})
			.when('/search', {
			    templateUrl : './views/search.html',
			    controller: 'ResultCtrl',
			    resolve: {
			    	aprSearchInfo: ['SearchData', 'aprSearch', function(SearchData, aprSearch){
			    		return aprSearch(SearchData);
			    	}],
			    	psfSearchInfo: ['SearchData', 'psfSearch', function(SearchData, psfSearch){
			    		return psfSearch(SearchData);
			    	}],

			    }

			})
			.when('/error', {
			    template : '<p>Error Page: Not Found</p>'
			})
			.otherwise({
			  redirectTo : '/error'
		  });

	}])
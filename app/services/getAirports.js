angular.module('searchApp')
	.factory('getAirports', [function(){
		return function(apr, psf){

			var airportsObjects = [];
			var airportsList = {};

			var whitelistedCountries = ["United States", "Canada"];
			var psfObject = convertToJSON(psf).data || {};
			var psfCountriesLength = psfObject.length;
			for(var i=0; i<psfCountriesLength; i++){
				if(whitelistedCountries.indexOf(psfObject[i].country) != -1){
					var airports = psfObject[i].airports;
					var airportLength = airports.length;
					for(var j=0; j<airportLength; j++){
						var sAirport = airports[j];
						sAirport.full_name = sAirport.name + " (" + sAirport.code + ")";
						airportsObjects.push(sAirport);
						airportsList[sAirport.code] = "";
					}
				}					
			}

			var aprObject = convertToJSON(apr).data || {};
			var aprLength = aprObject.length;
			for(var i=0; i<aprLength; i++){
				var singleAprAirport = aprObject[i];
				if(airportsList[singleAprAirport.code] == undefined){
					var sAirport = singleAprAirport;
					sAirport.full_name = sAirport.name + " (" + sAirport.code + ")";
					airportsObjects.push(sAirport);
				}
			}

			airportsObjects.sort(function(a,b){
				var x = a.name;
				var y = b.name;

				if(typeof x == "string"){
					x = x.toLowerCase();
					y = y.toLowerCase();
				}

				 return ((x < y) ? -1 : ((x > y) ? 1 : 0));
			});

			return airportsObjects;	
		};
	}])
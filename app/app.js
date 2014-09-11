angular.module('searchApp', ['ngRoute', 'aprLibrary', 'psfLibrary', 'ui.date', 'ui.bootstrap'])

	.factory('SearchData', [function(){
		return {};
	}])

	function convertToJSON(string){
		var isJSON = true;
		var o = {};
		var s = string;

		while(isJSON == true){
			try {
				o = JSON.parse(s)
				s = o;
			} catch(e){
				isJSON = false;
			}
		}
		return o;
	}